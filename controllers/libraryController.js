const responces = require("../general/responces");
const db = require("../models/index");
const library = db.library;

// Create Library
exports.reglib = async (req, res) => {
  const { lName, lAssist, lAddress } = req.body;
  const existingLib = await library.findOne({ where: { lName: lName } });
  try {
    if (existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.FORBIDDEN).json({
        status: responces.HTTP_STATUS_CODES.FORBIDDEN,
        message: responces.messages.exist,
        data: {},
      });
    }
    const newLibrary = await library.create({
      lName: lName,
      lAssist: lAssist,
      lAddress: lAddress,
    });

    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      status: responces.HTTP_STATUS_CODES.CREATED,
      message: responces.messages.library.create_success,
      data: { newLibrary },
    });
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};

// Retrive Library - using libId
exports.retlibid = async (req, res) => {
  const libId = req.params.libId;
  const existingLib = await library.findOne({ where: { id: libId } });
  try {
    if (!existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.library.not_found,
        data: {},
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.SUCCESS,
        message: responces.messages.library.retrieve_success,
        data: existingLib,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};

// Retrive Library - ALL
exports.retliball = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  try {
    const totalCount = await library.count();
    const totalPage = Math.ceil(totalCount / pageSize); 
    const existingLib = await library.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    if (!existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.library.not_found,
        data: {},
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.SUCCESS,
        message: responces.messages.library.retrieve_success,
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPage: totalPage,
        data: existingLib,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};

// Update library
exports.updatelib = async (req, res) => {
  try {
    const libId = req.params.libId;
    const libData = req.body;
    const existingLib = await library.findOne({ where: { id: libId } });
    if (!existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.library.not_found,
        data: {},
      });
    }
    await library.update(libData, { where: { id: libId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.library.update_success,
      data: { libData },
    });
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete library - libId
exports.deletelibid = async (req, res) => {
  try {
    const libId = req.params.libId;
    const existingLib = await library.findOne({ where: { id: libId } });
    if (!existingLib) {
      return res
        .status(responces.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ 
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND, 
          message: responces.messages.library.not_found, 
          data: {} });
    }
    await library.destroy({ where: { id: libId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.library.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};

// Delete library - ALL
exports.deleteliball = async (req, res) => {
  try {
    const existingLibs = await library.findAll();
    if (!existingLibs) {
      return res
        .status(responces.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ 
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND, 
          message: responces.messages.library.not_found, 
          data: {} });
    }
    await library.destroy();
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.library.delete_success,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: responces.messages.server_error,
      data: {},
    });
  }
};
