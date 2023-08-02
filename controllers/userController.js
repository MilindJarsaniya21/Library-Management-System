// const { READPAST } = require("sequelize/types/table-hints");
const fs = require("fs");
const path = require("path");
const responces = require("../general/responces");
const db = require("../models/index");
const validator = require("validator");
// const multer = require("multer");
const user = db.user;

// Create user
exports.reguser = async (req, res) => {
  try {
    const { uName, uEmail, uPhone, uAddress } = req.body;
    const userExist = await user.findOne({ where: { uName: uName } });
    // if (userExist) {
    //   return res
    //     .status(400)
    //     .json({ statuscode: 400, error: "User already exists", data: {} });
    // }
    const newUser = await user.create({
      uName: uName,
      uEmail: uEmail,
      uPhone: uPhone,
      uAddress: uAddress,
    });
    return res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.user.create_success,
      data: { newUser },
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Retrive user - userId
exports.retuserid = async (req, res) => {
  const userId = req.params.userId;
  const existingUser = await user.findOne({ where: { id: userId } });
  try {
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.CREATED,
        message: responces.messages.retrieved,
        data: existingUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Retrieve user - ALL
exports.retuserall = async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 3;
  // Pagination
  try {
    const totalCount = await user.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const existingUsers = await user.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    if (!existingUsers) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.CREATED,
        message: responces.messages.retrieved,
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
        data: existingUsers,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

//Update user
exports.updateuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await user.findOne({ where: { id: userId } });
    const userData = req.body;
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    await user.update(userData, {
      where: { id: userId },
    });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.user.update_success,
      data: { userData },
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete user - userId
exports.deleteuserid = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await user.findOne({ where: { id: userId } });
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    await user.destroy({ where: { id: userId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.user.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete user - ALL
exports.deleteuserall = async (req, res) => {
  try {
    const existingUsers = await user.findAll();
    if (!existingUsers) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: "Users not found",
        data: {},
      });
    }
    await user.destroy();
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.user.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Upload a file
exports.upload = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await user.findOne({ where: { id: userId } });
    const { file } = req; // or const file = req.file
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.BAD_REQUEST,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    await existingUser.update({ userProfilePic: file.filename });
    console.log(req.file);
    return res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: "filename uploaded successfully!",
      data: file.fileName,
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete a file
exports.deleteData = async (req, res) => {
  // const fs = require("fs");
  const filename = req.params.filename;
  const filePath = path.join("uploads", filename);
  const existingData = await user.findOne({
    where: { userProfilePic: filename },
  });

  fs.unlink(filePath, (err) => {
    try {
      if (!filePath) {
        return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
          message: responces.messages.not_found + " on the device.",
          data: {},
        });
      }
      if (!existingData) {
        return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
          message: responces.messages.not_found + " on the database.",
          data: {},
        });
      }
      user.update(
        { userProfilePic: null },
        { where: { userProfilePic: filename } }
      );
      return res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
        message: "File removed successfully",
        data: {},
      });
    } catch (error) {
      console.log("Error removing file: ", err);
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.BAD_REQUEST,
        message: responces.messages.server_error,
        data: {},
      });
    }
  });
};

// Upload multiple files
exports.uploadMultipleData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await user.findOne({ where: { id: userId } });
    const { files } = req;
    if (!existingUser) {
      res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    const fileNames = files.map((file) => file.filename);
    // The map function is called on the files array.
    // For each element in the files array, the provided callback function (file) => file.filename is executed.
    // The filename value is added to a new array called fileNames.
    // The map function returns a new array containing the values returned by the callback function for each element in the original array.
    //  The resulting array, fileNames, will contain the extracted file names from the files array.
    const userProfilePic = fileNames.join(", ");
    // For example, if fileNames is ['file1.jpg', 'file2.jpg', 'file3.jpg'],
    // calling fileNames.join(",") will result in the string 'file1.jpg,file2.jpg,file3.jpg'.
    // The elements of the array are joined together with the comma as the delimiter.
    await existingUser.update({ userProfilePic });
    return res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: "File uploaded successfully!",
      data: fileNames,
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete multiple files
exports.deleteMultipleData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingUser = await user.findOne({ where: { id: userId } });
    const { file } = req;
    if (!existingUser) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.user.not_found,
        data: {},
      });
    }
    await existingUser.update({ userProfilePic: null });
    return res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: "Data deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statuscode: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: responces.messages.server_error,
      data: {},
    });
  }
};