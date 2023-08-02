const responces = require("../general/responces");
const db = require("../models/index");
const book = db.book;
const library = db.library;

// Create Book
exports.regbook = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Content can't be empty!");
    }
    const { bName, bType, libraryId, isAvailable, aName, aEmail } = req.body;

    const existingBook = await book.findOne({ where: { bName: bName } });
    const existingLib = await library.findByPk(libraryId);
    if (!existingLib) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.library.not_found,
        data: {},
      });
    }
    if (existingBook) {
      return res.json({
        statuscode: responces.HTTP_STATUS_CODES.BAD_REQUEST,
        message: responces.messages.exist,
        data: {},
      });
    } else {
      let newBook = await book.create({
        bName: bName,
        bType: bType,
        libraryId: libraryId,
        isAvailable: isAvailable,
      });
      const existingAuthor = await author.findOne({ where: { aName: aName } });
      if (existingAuthor) {
        await bookAuthor.create({
          bookId: newBook.id,
          authorId: existingAuthor.id,
        });
      } else {
        const newAuthor = await author.create({
          aName: aName,
          aEmail: aEmail,
        });
        await bookAuthor.create({
          bookId: newBook.id,
          authorId: newAuthor.id,
        });
      }
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        staus: responces.HTTP_STATUS_CODES.CREATED,
        message: responces.messages.book.create_success,
        data: newBook,
      });
    }
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};

// Retrive Book - using bookId
exports.retbookid = async (req, res) => {
  const bookId = req.params.bookId;
  const existingBook = await book.findOne({ where: { id: bookId } });
  try {
    if (!existingBook) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.book.not_found,
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.SUCCESS,
        message: responces.messages.book.retrieve_success,
        data: existingBook,
      });
    }
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};

// Retrive Books - ALL
exports.retbookall = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  try {
    const totalCount = await book.count();
    const totalPage = Math.ceil(totalCount / pageSize);
    const existingBooks = await book.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize
    });
    if (!existingBooks) {
      return res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json({
        status: responces.HTTP_STATUS_CODES.NOT_FOUND,
        message: responces.messages.book.not_found,
      });
    } else {
      res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
        status: responces.HTTP_STATUS_CODES.SUCCESS,
        message: responces.messages.book.retrieve_success,
        page: page,
        pageSize: pageSize,
        totalcount: totalCount,
        totalPage: totalPage,
        data: existingBooks,
      });
    }
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};

// Update Books
exports.updatebook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookData = req.body;
    const existingBook = await book.findOne({ where: { id: bookId } });
    if (!existingBook) {
      return res
        .status(responces.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
          message: responces.messages.book.not_found,
          data: {},
        });
    }
    await book.update(bookData, { where: { id: bookId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.book.update_success,
      data: { bookData },
    });
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};

// Delete book - bookId
exports.deletebookid = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const existingBook = await book.findOne({ where: { id: bookId } });
    if (!existingBook) {
      return res
        .status(responces.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
          message: responces.messages.book.not_found,
          data: {},
        });
    }
    await book.destroy({ where: { id: bookId } });
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.book.delete_success,
      data: {},
    });
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};

// Delete book - ALL
exports.deletebookall = async (req, res) => {
  try {
    const existingBooks = await book.findAll();
    if (!existingBooks) {
      return res
        .status(responces.HTTP_STATUS_CODES.BAD_REQUEST)
        .json({
          statuscode: responces.HTTP_STATUS_CODES.NOT_FOUND,
          message: responces.messages.book.not_found,
          data: {},
        });
    }
    await book.destroy();
    res.status(responces.HTTP_STATUS_CODES.SUCCESS).json({
      statuscode: responces.HTTP_STATUS_CODES.SUCCESS,
      message: responces.messages.book.delete_success,
      data: {},
    });
  } catch (error) {
    if (error) {
      res.status(responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: responces.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: responces.messages.server_error,
        data: error,
      });
    }
  }
};
