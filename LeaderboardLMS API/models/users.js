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

    Users.getUserIncludingPassword = async function(user_id, email, models) {
        if(isNaN(user_id)){ user_id = -1; }

        return await this.findOne({
            where: Sequelize.or({ user_id : user_id }, { email: email })
        });
    }

    Users.getUsersByUsername = async function(username) {
        return this.findAll({
            where: {
                username: {$like: "%" + username + "%" }
            }
        });
    }

    Users.getUserIncludingCourse = async function(user_id, email, course_id, models) {
        if(isNaN(user_id)){ user_id = -1; }

        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                {
                    model: models.Courses,
                    required: false,
                    where: {course_id: course_id }
                }
            ]
        });
    }

    Users.getUserIncludingCourses = async function(user_id, email, models) {
        if(isNaN(user_id)){ user_id = -1; }

        return await this.findOne({
            where: Sequelize.or({ user_id: user_id }, { email: email }),
            include: [
                { model: models.Courses }
            ]
        });
    }

    Users.insert = async function(email, username, password) {
        const user = {
            email: email,
            username: username,
            password: password
        };

        return await this.create(user);
    }

    Users.updateUser = async function (user_id, email, username, profilePictureLink) {
        const updateUserValues = {
            email: email,
            username: username,
            profilePictureLink: profilePictureLink
        }

        const t = await sequelize.transaction();
        const currentUser = await Users.findOne ({
            where: { user_id: user_id }
        }, {transaction: t});

        const updatedUser = await currentUser.updateAttributes(updateUserValues, { transaction: t});
        t.commit();
        return updatedUser;
    }

    return Users;
}