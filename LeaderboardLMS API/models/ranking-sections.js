module.exports = function(sequelize, Sequelize) {
    const RankingSections = sequelize.define("RankingSections", {
        id: {
            autoIncrement:true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_section_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        }

    }, {underscored: true});

    RankingSections.getRankingSection = async function(ranking_section_id, user_id) {

        return await this.findOne({
            where: Sequelize.or({ ranking_section_id: ranking_section_id }, { user_id: user_id })
        });
    }

    RankingSections.editRankingSection = async function(ranking_section_id, name) {
        const updatedRankingSectionValues = {
            name: name
        }

        const t = await sequelize.transaction();
        const currentRankingSection = await this.findOne({
            where: { ranking_section_id: ranking_section_id }
        }, {transaction: t});

        const updatedRankingSection = await currentRankingSection.updateAttributes(updatedRankingSectionValues, {transaction: t});
        t.commit();
        return updatedRankingSection;
    }

    RankingSections.insertRankingSection = async function(leaderboard_id, name) {
        const RankingSection = {
            name: name,
            leaderboard_id: leaderboard_id
        };

        return await this.create(RankingSection);
    }

    RankingSections.deleteRankingSection = async function(ranking_section_id) {
        return await this.destroy ({
            where: {
                ranking_section_id: ranking_section_id
            }
        });
    }

    return RankingSections;
}