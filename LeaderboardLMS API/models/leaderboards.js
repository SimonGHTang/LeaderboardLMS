module.exports = function(sequelize, Sequelize) {
    const Leaderboards = sequelize.define("Leaderboards", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "leaderboard_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        weighting: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        }
    }, {underscored: true});

    Leaderboards.getLeaderboard = async function(leaderboard_id) {

        return await this.findOne({
            where: { leaderboard_id: leaderboard_id }
        });
    }

    Leaderboards.getLeaderboardIncludingRankings = async function(leaderboard_id, models) {

        return await this.findOne({
            where: { leaderboard_id: leaderboard_id},
            include: [
                {
                    model: models.Rankings,
                    include: [
                        { 
                            model: models.AnonymitySettings 
                        },
                        {
                            model: models.Users,
                            attributes: [ "id", "email", "username", "profilePictureLink" ]
                        },
                        {
                            model: models.RankingSectionEntries,
                            attributes: [ "id", "mark", "ranking_section_id", "ranking_id" ]
                        }
                    ]
                },  
                {
                    model: models.RankingSections
                }
            ],
            order: [
                [ models.Rankings, "mark", "DESC" ]
            ]
        });
    }

    Leaderboards.editLeaderboard = async function(leaderboard_id, name, weighting, description) {
        const updatedLeaderboardValues = {
            name: name,
            weighting: weighting,
            description: description
        }

        const t = await sequelize.transaction();
        const currentLeaderboard = await this.findOne({
            where: { leaderboard_id: leaderboard_id }
        }, {transaction: t});

        const updatedLeaderboard = await currentLeaderboard.updateAttributes(updatedLeaderboardValues, {transaction: t});
        t.commit();
        return updatedLeaderboard;
    }

    Leaderboards.insertLeaderboard = async function(course_id, name, weighting, description, models) {
        const leaderboard = {
            name: name,
            weighting: weighting,
            description: description,
            course_id: course_id
        };

        return await this.create(leaderboard);
    }

    return Leaderboards;
}