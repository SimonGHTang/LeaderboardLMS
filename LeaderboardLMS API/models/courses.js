module.exports = function (sequelize, Sequelize) {
    const Courses = sequelize.define("Courses", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "course_id"
        },

        name: {
            type:Sequelize.STRING,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING
        },

        coordinator: {
            type: Sequelize.STRING
        },

        pictureLink: {
            type: Sequelize.STRING,
            defaultValue: "https://image.freepik.com/free-icon/electronic-circular-printed-circuit_318-50817.jpg"
        },

        allowInvitations: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {underscored: true });

    Courses.getCourse = async function(course_id) {
        return await this.findOne({
            where: { course_id: course_id }
        });
    };

    Courses.getCourseIncludingUser = async function (course_id, user_id, email, models) {
        return await this.findOne({
            where: {course_id: course_id },
            include: [
                {
                    model: models.Users,
                    where: Sequelize.or({ user_id: user_id }, { email: email }),
                }
            ]
        });
    };
 
    Courses.getCourseIncludingUsers = async function(course_id, models) {
        return await this.findOne ({
            where: { course_id: course_id },
            include: [
                {
                    model: models.Users,
                    attributes: ["user_id", "username", "email", "profilePictureLink"],
                    require: false,
                    through: {
                        attributes: ["id", "rank", "user_id", "course_id", "created_at"]
                    }
                }
            ]
        });
    };

    Courses.getCourseIncludingUsersAndRank = async function(course_id, rank, models) {
        return await this.findAll ({
            where: { course_id: course_id },
            include: [
                {
                    model: models.Users,
                    attributes: ["user_id", "username", "email", "profilePictureLink"],
                    require: false,
                    through: {
                        attributes: ["id", "rank", "user_id", "course_id", "created_at"],
                        where: { rank: rank }
                    }
                }
            ]
        });
    };

    Courses.setUserAsAdmin = async function(course_id, user_id, models) {
        const user = await models.Users.findOne({
            where: { user_id: user_id }
        });

        if(!user) { return null; }

        const role = await models.Roles.findOne({
            where: {
                user_id: user_id,
                course_id: course_id
            }
        });
        if(!role) { return null; }

        await role.updateAttributes({ rank: "admin" });
        return await this.findOne({ where: { course_id: course_id }});
    };

    Courses.updateCourse = async function(course_id, name, description, coordinator, pictureLink, allowInvitations) {
        const updateCourseValues = {
            name: name,
            description: description,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        }

        const t = await sequelize.transaction();
        const currentCourse = await Courses.findOne ({
            where: {course_id: course_id
            }
        }, {transaction: t});

        const updatedCourse = await currentCourse.updateAttributes(updateCourseValues, {transaction: t});
        t.commit();
        return updatedCourse;
    }

    return Courses;
}
