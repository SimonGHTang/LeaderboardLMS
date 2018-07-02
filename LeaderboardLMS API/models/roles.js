module.exports = function(sequelize, Sequelize) {
    const Roles = sequelize.define("Roles", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "role_id"
        },

        rank: {
            type: Sequelize.STRING
        }
    }, {underscored: true});

    Roles.insert = async function (course_id, user_id, rank) {
        const role = {
            course_id: course_id,
            user_id: user_id,
            rank: rank
        };
        return await this.create(role);
    }

    Roles.get = async function(user_id) {
        return await this.findAll({
            where: {
                user_id: user_id
            }
        });
    }

    return Roles;
}