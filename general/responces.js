module.exports = {
    HTTP_STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },
    messages: {
        server_error: "It's not you it's us!",
        not_found: "Not found",
        exist: "Already exists",
        retrieved: "Data retieved successfully",
        user: {
            create_success: "User created successfully",
            retrieve_success: "User(s) retrieved successfully",
            update_success: "User Updated successfully",
            delete_success: "User(s) deleted successfully",
            not_found: "User Not found",
        },
        book: {
            create_success: "Book created successfully",
            retrieve_success: "Book(s) retrieved successfully",
            update_success: "Book Updated successfully",
            delete_success: "Book(s) deleted successfully",
            not_found: "Book Not found",
        },
        author: {
            create_success: "Author created successfully",
            retrieve_success: "Author(s) retrieved successfully",
            update_success: "Author Updated successfully",
            delete_success: "Author(s) deleted successfully",
            not_found: "Author Not found",
        },
        library: {
            create_success: "Library created successfully",
            retrieve_success: "Library(s) retrieved successfully",
            update_success: "Library Updated successfully",
            delete_success: "Library(s) deleted successfully",
            not_found: "Library Not found",
        },
        bookIssuing: {
            issue_req_accepet: "Your issue request has been accepeted!",
            not_issued: "You haven't issued any book yet!",
            retrieve_success: "Book issue details:",
            delete_success: "Issue data deleted successfully"
        }
    }
}