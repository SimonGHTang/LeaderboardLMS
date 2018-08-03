module.exports = function(sequelize, Sequelize) {
    const Rankings = sequelize.define("Rankings", {
        id: {
            autoIncrement:true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_id"
        },

        mark: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        note: {
            type: Sequelize.STRING
        }
    }, {underscored: true});

    Rankings.getRankingIncludingAnonymousSetting = async function(ranking_id, models) {

        return await this.findOne({
            where: { ranking_id: ranking_id },
            include: [
                {model: models.RankingSecionEntires },
                {model: models.AnonymitySettings },
                {model: models.Users }
            ]
        });
    }

    Rankings.editRanking = async function(ranking_id, mark, note) {
        const updatedRankingValues = {
            mark: mark,
            note: note
        }

        const t = await sequelize.transaction();
        const currentRanking = await this.findOne({
            where: { ranking_id: ranking_id }
        }, {transaction: t});

        const updatedRanking = await currentRanking.updateAttributes(updatedRankingValues, {transaction: t});
        t.commit();
        return updatedRanking;
    }

    Rankings.insertRanking = async function(leaderboard_id, user_id, mark, note, models) {
        const ranking = {
            mark: mark,
            note: note,
            user_id: user_id,
            leaderboard_id: leaderboard_id
        };

        var newRanking = await this.create(ranking);

        models.AnonymitySettings.insertAnonymitySetting(newRanking.id, false, false);

        return await newRanking;
    }

    Rankings.deleteRanking = async function(ranking_id, models) {
        const t = await sequelize.transaction();

        await models.AnonymitySettings.destroy({
            where: { ranking_id: ranking_id }
        }, {transaction: t});

        var numberOfRankingsDeleted = await this.destroy({
            where: { ranking_id: ranking_id }
        }, {transaction: t});
        t.commit();

        return numberOfRankingsDeleted;
    }

    return Rankings;
}