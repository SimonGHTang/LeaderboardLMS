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

    Courses.setUserAsStudent = async function(course_id, user_id, models) {
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

        await role.updateAttributes({ rank: "student" });
        return await this.findOne({ where: { course_id: course_id }});
    };

    Courses.kickUser = async function(course_id, user_id, models) {
        const t = await sequelize.transaction();
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

        const destroyed = await models.Roles.destroy({
            where: {
                role_id: role.id
            }
        });
        if(destroyed != 1) {
            t.rollback();
            return null;
        } else {
            t.commit();
        }

        return user;
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

    Courses.insertCourse = async function(user_id, email, name, description, coordinator, pictureLink, allowInvitations, models) {
        const courseDetails = {
            name: name,
            description: description,
            coordinator: coordinator,
            pictureLink: pictureLink,
            allowInvitations: allowInvitations
        };

        const t = await sequelize.transaction();
        const user = await models.Users.findOne({ where: Sequelize.or({ user_id: user_id }, { email: email }) });
        if(!user) {
            t.rollback();
            throw new Error("This user could not be found.");
        }

        const course = await this.create(courseDetails, {transaction: t});
        if (!course){ 
            t.rollback();
            throw new Error("Course could not be created."); 
        }

        const roleDetails = {
            course_id: course.id,
            user_id: user.id,
            rank: "admin"
        }
        
        const Role = await models.Roles.create(roleDetails, {transaction: t}).catch(e => {
            console.log(e);
            t.rollback();
        });

        if (Role){ t.commit(); }
        return course;
    }

    return Courses;
}
