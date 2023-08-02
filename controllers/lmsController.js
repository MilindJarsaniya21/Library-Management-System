const { author } = require("../models");
const { library } = require("../models");
const { book } = require("../models");
const { user } = require("../models");
const { bookAuthor } = require("../models");
const { userBookHistory } = require("../models");
const userbookhistory = require("../models/userBookHistory");

// Add new Library
exports.reglib = async (req, res) => {
  const { lName, lAssist, lAddress } = req.body;
  const existingLib = await library.findOne({ where: { lName: lName } });
  try {
    if (existingLib) {
      return res.status(400).json({
        status: 400,
        message: "Library already exists!",
      });
    }
    const newLibrary = await library.create({
      lName: lName,
      lAssist: lAssist,
      lAddress: lAddress,
    });

    res.status(201).json({
      status: 201,
      message: "Library created",
      newLibrary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "It's not you, It's us",
    });
  }
};

// Add new book
exports.regbook = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Content can't be empty!");
    }
    const { bName, bType, libraryId, isAvailable, aName, aEmail } = req.body;

    const existingBook = await book.findOne({ where: { bName: bName } });
    const existingLib = await library.findByPk(libraryId);
    if (!existingLib) {
      return res
        .status(400)
        .json({ status: 404, message: "Library not found" });
    }
    if (existingBook) {
      return res.json({
        statuscode: 400,
        message: "Book already exists",
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
      res.status(200).json({
        staus: 201,
        message: "New Book Added!",
        data: newBook,
      });
    }
  } catch (err) {
    if (err) {
      res.status(500).json({
        status: 500,
        message: "It's not you, It's us",
        data: err,
      });
    }
  }
};

// Create Author
exports.regauthor = async (req, res) => {
  const { aName, aEmail } = req.body;
  try {
    const authExist = await author.findOne({ where: { aName: aName } });
    if (authExist) {
      return res.status(400).json({ error: "Author already exists" });
    }
    const newAuthor = await author.create({
      aName: aName,
      aEmail: aEmail,
    });
    res.status(200).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "It's not you it's us!" });
  }
};

// create user - Registeration
exports.reguser = async (req, res) => {
  try {
    const { uName, uEmail, uPhone, uAddress } = req.body;
    const userExist = await user.findOne({ where: { uName: uName } });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await user.create({
      uName: uName,
      uEmail: uEmail,
      uPhone: uPhone,
      uAddress: uAddress,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "It's not you it's us!" });
  }
};

// Retrieve BOOKS by libraryId
exports.retbooks = async (req, res) => {
  const libraryId = req.params.libraryId;
  try {
    const libBooks = await library.findByPk(libraryId, {
      attributes: ["lName", "lAssist", "lAddress"],
      include: {
        model: book,
        attributes: ["bName", "bType", "isAvailable"],
      },
    });
    if (!libBooks) {
      return res
        .status(400)
        .json({ status: 404, message: "Library not found!" });
    }
    // const allBooks = library.books;
    res.status(200).json({ status: 200, libBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "It's not you it's us!" });
  }
};

// Book Issuing
exports.bookissue = async (req, res) => {
  const { userId, bookIde, libraryId, assignedDate, dueDate, returnDate } =
    req.body;
  console.log(bookIde, "bookIde");
  try {
    const existingUser = await user.findByPk(userId); // ({where: {id: userId}});
    const existingBook = await book.findOne({ where: { id: bookIde } }); // ({where: {id: bookIde}});
    if (!existingUser) {
      return res
        .status(400)
        .json({ statuscode: 404, message: "User doesn't exist!", data: {} });
    } else if (!existingBook) {
      return res
        .status(400)
        .json({ statuscode: 404, message: "Book doesn't exist!", data: {} });
    } else {
      console.log("Entered in else");
      const data = await userBookHistory.create({
        userId: userId,
        bookIde: bookIde,
        libraryId: libraryId,
        assignedDate: assignedDate,
        dueDate: dueDate,
        returnDate: returnDate,
      });
      res.status(201).json({
        status: 201,
        message: "UserBookHistory created",
        data: data,
      });
      console.log("Processes completed");
    }
  } catch (error) {
    console.log("Entered in cache");
    res.status(500).json({
      status: 500,
      message: "It's not you, It's us",
      data: error,
    });
    console.log("Cache ended");
  }
};

// Retrive data of USER, BOOK and LIBRARY using "USERID"
exports.retuid = async (req, res) => {
  try {
    const userId = await req.params.userId;
    // const existingUser = await userBookHistory.findOne({where: {id:userId}}, { 
    const existingUser = await user.findByPk(userId, { // {where: {id:userId}},
      include: {
        model: userBookHistory,
        // attributes: ['uName', 'uEmail', 'uPhone', 'uAddress'],
      },
      include: {
        model: book,
        // attributes: ['bName', 'bType']
      },
      include: {
        model: library,
        // attributes: ['lName', 'lAssist', 'lAddress']
      },
    })
    if (!existingUser) {
      return res
        .status(400)
        .json({ statuscode: 404, message: "User not found", data: {} });
    } else {
      res
        .status(200)
        .json({
          statuscode: 200,
          message: "User Information",
          data: existingUser,
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statuscode: 500, message: "It's not you it's us!", data: {} });
  }
};

// Retrive "ALL" data of USER, BOOK and LIBRARY
exports.retuhall = async (req, res) => {
  try {
    // const userId = await req.params.userId;
    const existingUser = await userBookHistory.findAll({ //{where: {id:userId}}, 
      include: {
        model: user,
        attributes: ["uName", "uEmail", "uPhone", "uAddress"],
      },
      include: {
        model: book,
        attributes: ["bName", "bType", "isAvailable"],
        include: {
          model: library,
          attributes: ["lName", "lAssist", "lAddress"],
        },
      },
    });
    if (!existingUser) {
      return res
        .status(400)
        .json({ statuscode: 404, message: "User not found", data: {} });
    } else {
      res
        .status(200)
        .json({
          statuscode: 200,
          message: "User Information",
          data: existingUser,
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statuscode: 500, message: "It's not you it's us!", data: {} });
  }
};

// // Retrieve USERS by libraryId
// exports.retuserid = async (req, res) => {
//   const libraryId = req.params.libraryId;
//   try {
//     const libUser = await library.findByPk(libraryId, {
//       include: ["users"],
//     });
//     if (!libUser) {
//       return res.status(400).json("Library not found!");
//     }
//     // const allBooks = library.books;
//     res.status(200).json(libUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "It's not you it's us!" });
//   }
// };

// // Retrieve BOOKS by userId
// exports.retbooksuid = async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const userData = await user.findByPk(userId, {
//             include: ["books"]
//         })
//         if(!userData){
//             return res.status(400).json({message: "User not found"});
//         }
//         res.status(200).json(userData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "It's not you it's us!" });
//       }
// }

// Update
// exports.update = (req, res) => {
//     const id = req.params.id;
//     const {name, email} = req.body; // Object Destructuring.
//     try {
//       const existingData = CRUD.findByPk(id);
//       if(existingData){
//         if(newId !== id){
//           CRUD.destroy({where: {id}});
//         }
//         CRUD.create({id: newId, name, email});
//         res.send({
//           message: "User updated successfully"
//         })
//       }
//       else{
//         res.json({
//           message: "User not found"
//         })
//       }
//     } catch (error) {
//       console.error(error);
//       res.send({
//         message: "Error occurred while updating the data."
//       })
//     }
//   }


