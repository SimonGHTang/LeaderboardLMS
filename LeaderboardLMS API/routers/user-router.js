const UserController = require("../controllers/user-controller");

module.exports = function(app) {
    app.get("/user/:term", UserController.getUser);
    app.post("/user/:user_id", UserController.updateUser);
}