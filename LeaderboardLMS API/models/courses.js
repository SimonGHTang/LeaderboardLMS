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
        }

    }, {underscored: true });

    Courses.getCourse = async function(course_id) {
        return await this.findOne({
            where: { course_id: course_id }
        });
    };

    Courses.updateCourse = async function(course_id, name, description, coordinator, pictureLink) {
        const updateCourseValues = {
            name: name,
            description: description,
            coordinator: coordinator,
            pictureLink: pictureLink
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
