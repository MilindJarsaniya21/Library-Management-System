const db = require("../models/index");
const validator = require("validator");
const user = require("../models/user");
const author = db.author;
const responce = require("../general/responces");

// Create Author
exports.regauthor = async (req, res) => {
  const { aName, aEmail } = req.body;
  try {
    const authExist = await author.findOne({ where: { aName: aName } });
    if (authExist) {
      return res.status(responce.HTTP_STATUS_CODES.FORBIDDEN).json({
        error: responce.messages.exist
      });
    }
    const newAuthor = await author.create({
      aName: aName,
      aEmail: aEmail,
    });
    res.status(responce.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responce.HTTP_STATUS_CODES.CREATED,
      message: responce.messages.author.create_success,
      data: { newAuthor },
    });
  } catch (error) {
    console.error(error);
    res.status(responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  }
};

// Retrive author
exports.retauthorid = async (req, res) => {
  const authId = req.params.authId;
  const existingAuthor = await author.findOne({ where: { id: authId } });
  try {
    if (!existingAuthor) {
      return res.status(responce.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responce.HTTP_STATUS_CODES.NOT_FOUND,
        message: responce.messages.not_found,
      });
    } else {
      res.status(responce.HTTP_STATUS_CODES.SUCCESS).json({
        status: responce.HTTP_STATUS_CODES.SUCCESS,
        message: responce.messages.author.retrieve_success,
        data: existingAuthor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  }
};

// Retrive Authors - ALL
exports.retauthorall = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  try {
    const totalCount = await author.count();
    const totalPage = Math.ceil(totalCount / pageSize);
    const existingAuthors = await author.findAll({
      limit: pageSize,
      offset: (page-1)*pageSize
    });
    if (!existingAuthors) {
      return res.status(responce.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responce.HTTP_STATUS_CODES.NOT_FOUND,
        message: responce.messages.not_found,
      });
    } else {
      res.status(responce.HTTP_STATUS_CODES.SUCCESS).json({
        status: responce.HTTP_STATUS_CODES.SUCCESS,
        message: responce.messages.author.retrieve_success,
        page:page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPage: totalPage,
        data: existingAuthors,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  }
};

// Update authors
exports.updateauthor = async (req, res) => {
  try {
    const authId = req.params.authId;
    const existingAuthor = await author.findOne({ where: { id: authId } });
    const authData = req.body;
    if (!existingAuthor) {
      return res
        .status(responce.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ statuscode: responce.HTTP_STATUS_CODES.NOT_FOUND, 
          message: responce.messages.not_found, 
          data: {} 
        });
    }
    await author.update(authData, {
      where: { id: authId },
    });
    res.status(responce.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responce.HTTP_STATUS_CODES.SUCCESS,
      message: responce.messages.author.update_success,
      data: { authData },
    });
  } catch (error) {
    console.error(error);
    res.status(responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  }
};

// Delete author - authId
exports.deleteauthorid = async (req, res) => {
  try {
    const authId = req.params.authId;
    const existingAuthor = await author.findOne({ where: { id: authId } });
    if (!existingAuthor) {
      return res
        .status(responce.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ statuscode: responce.HTTP_STATUS_CODES.NOT_FOUND, 
          message: responce.messages.not_found, 
          data: {} 
        });
    }
    await author.destroy({ where: { id: authId } });
    res.status(responce.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responce.HTTP_STATUS_CODES.SUCCESS,
      message: responce.messages.author.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  }
};

// Delete author - ALL
exports.deleteauthorall = async (req, res) => {
  try {
    const existingAuthors = await author.findAll();
    if (!existingAuthors) {
      return res
        .status(400)
        .json({ statuscode: responce.HTTP_STATUS_CODES.NOT_FOUND, 
          message: responce.messages.not_found, 
          data: {} });
    }
    await author.destroy();
    res.status(200).json({
      statuscode: responce.HTTP_STATUS_CODES.CREATED,
      message: responce.messages.author.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: responce.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responce.messages.server_error,
      data: {},
    });
  } 
}