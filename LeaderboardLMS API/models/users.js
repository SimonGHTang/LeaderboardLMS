module.exports = function(sequelize, Sequelize) {
    const Users = sequelize.define("Users", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "user_id"
        },

        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.STRING
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        profilePictureLink: {
            type: Sequelize.STRING
        }
    }, {underscored: true});

    Users.getUser = async function(user_id, email) {
        return await this.findOne({
            where: Sequelize.or({ user_id : user_id }, { email: email }),
            attributes: ["id", "email", "username", "profilePictureLink", "created_at", "updated_at"]
        });
    }

    return Users;
}