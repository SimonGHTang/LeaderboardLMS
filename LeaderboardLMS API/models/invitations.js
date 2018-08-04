module.exports = function(sequelize, Sequelize) {
    const Invitations = sequelize.define("Invitations", {
        id: {
            primaryKey: true,
            autoIncrement: true, 
            type: Sequelize.INTEGER,
            field: "invitation_id"
        },

        link: {
            type:Sequelize.STRING(12)
        }
    }, { underscored: true });

    Invitations.insert = async function(course_id) {
        var link = Math.random().toString(36).substring(3,12);
        const inv = { link: link, course_id: course_id};
        return await this.create(inv);
    }

    Invitations.getByLink = async function(link) {
        return await this.findOne ({
            where: { link: link }
        });
    }

    Invitations.getAllLinksForCourse = async function (course_id) {
        return await this.findAll ({
            where: { course_id: course_id }
        });
    }

    Invitations.delete = async function (course_id, invitation_id) {
        return await this.destroy ({
            where: {
                course_id: course_id,
                invitation_id: invitation_id
            }
        });
    }

    return Invitations;
}