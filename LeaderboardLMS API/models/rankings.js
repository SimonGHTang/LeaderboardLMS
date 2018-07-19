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
        }
    });

    Rankings.getRanking = async function(ranking_id) {

        return await this.findOne({
            where: { ranking_id: ranking_id }
        });
    }

    Rankings.editRanking = async function(ranking_id, mark) {
        const updatedRankingValues = {
            mark: mark,
        }

        const t = await sequelize.transaction();
        const currentRanking = await this.findOne({
            where: { ranking_id: ranking_id }
        }, {transaction: t});

        const updatedRanking = await currentRanking.updateAttributes(updatedRankingValues, {transaction: t});
        t.commit();
        return updatedRanking;
    }

    Rankings.insertRanking = async function(leaderboard_id, mark) {
        const Ranking = {
            mark: mark,
            leaderboard_id: leaderboard_id
        };

        return await this.create(Ranking);
    }

    return Rankings;
}