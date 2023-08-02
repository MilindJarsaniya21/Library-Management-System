const responces = require("../general/responces");
const db = require("../models/index");
const userBookHistory = require("../models/userBookHistory");
// const userbookhistory = require("../models/userbookhistory");
const book = db.book;
const author = db.author;
const user = db.user;
const userbookhistory = db.userbookhistory;
const library = db.library;

// Issuing new book
exports.bookissue = async (req, res) => {
  try {
    const { userId, bookIde, assignedDate, dueDate, returnDate, libraryId } =
      req.body;
    const existingUser = await user.findOne({ where: { id: userId } });
    const existingBook = await user.findOne({ where: { id: bookIde } });
    const existingLib = await user.findOne({ where: { id: libraryId } });
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    if (!existingBook) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.book.not_found,
        data: {},
      });
    }
    if (!existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.library.not_found,
        data: {},
      });
    }
    const newIssue = await userbookhistory.create({
      userId: userId,
      bookIde: bookIde,
      assignedDate: assignedDate,
      dueDate: dueDate,
      returnDate: returnDate,
      libraryId: libraryId,
    });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      status: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.bookIssuing.issue_req_accepet,
      data: {},
    });
  } catch (error) {
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: error,
    });
  }
};

// Retrieve USER, BOOK and LIBRARY details - ALL
exports.ubhdataall = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  try {
    const totalCount = await userbookhistory.count();
    const totalPage = Math.ceil(totalCount / pageSize);
    // const issueId = req.params.issueId;
    const existingIssue = await userbookhistory.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,

      // { where: { id: issueId } ,
      attributes: [
        "userId",
        "bookIde",
        "assignedDate",
        "dueDate",
        "returnDate",
      ],
      include: [
        {
          model: user,
          attributes: ["uName", "uEmail", "uPhone", "uAddress"],
        },
        {
          model: book,
          attributes: ["bName", "bType", "isAvailable"],
          include: {
            model: library,
            attributes: ["lName", "lAssist", "lAddress"],
          },
        },
      ],
    });
    if (!existingIssue) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.bookIssuing.not_issued,
        data: {},
      });
    }
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.bookIssuing.retrieve_success,

      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPage: totalPage,

      data: { existingIssue },
    });
  } catch (error) {
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: error,
    });
  }
};

// Retrieve USER, BOOK and LIBRARY details - Id
exports.ubhdataid = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingIssue = await userbookhistory.findAll({
      where: { userId: userId },
      attributes: [
        "userId",
        "bookIde",
        "assignedDate",
        "dueDate",
        "returnDate",
      ],
      include: [
        {
          model: user,
          attributes: ["uName", "uEmail", "uPhone", "uAddress"],
        },
        {
          model: book,
          attributes: ["bName", "bType", "isAvailable"],
          include: {
            model: library,
            attributes: ["lName", "lAssist", "lAddress"],
          },
        },
      ],
    });
    if (!existingIssue) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.bookIssuing.not_issued,
      });
    }
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.bookIssuing.retrieve_success,
      data: { existingIssue },
    });
  } catch (error) {
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: error,
    });
  }
};

// Delete userBookHistory - Id
exports.deleteubhid = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingData = await userbookhistory.findOne({
      where: { userId: userId },
    });
    if (!existingData) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.not_found,
        data: {},
      });
    }
    await userbookhistory.destroy({ where: { userId: userId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.bookIssuing.delete_success,
      data: {},
    });
  } catch (error) {
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: error,
    });
  }
};

// Delete userBookHistory - ALL
exports.deleteubhall = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingData = await userbookhistory.findAll();
    if (!existingData) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.not_found,
        data: {},
      });
    }
    await userbookhistory.destroy();
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.bookIssuing.delete_success,
      data: {},
    });
  } catch (error) {
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: error,
    });
  }
};
