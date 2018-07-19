module.exports = function(sequelize, Sequelize) {
    const RankingSectionEntries = sequelize.define("RankingSectionEntries", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_section_entry_id"
        },

        mark: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }

    }, {underscored: true});

    RankingSectionEntries.getRankingSectionEntries = async function(ranking_section_entry_id) {

        return await this.findOne({
            where: Sequelize.or({ ranking_section_entry_id: ranking_section_entry_id })
        });
    }

    RankingSectionEntries.editRankingSectionEntry = async function(ranking_section_entry_id, mark) {
        const updatedRankingSectionValues = {
            mark: mark
        }

        const t = await sequelize.transaction();
        const currentRankingSectionEntry = await this.findOne({
            where: { ranking_section_entry_id: ranking_section_entry_id }
        }, {transaction: t});

        const updatedRankingSectionEntry = await currentRankingSectionEntry.updateAttributes(updatedRankingSectionValues, {transaction: t});
        t.commit();
        return updatedRankingSectionEntry;
    }

    RankingSectionEntries.insertRankingSectionEntry = async function(ranking_id, ranking_section_id, user_id, mark, Models) {
        const RankingSectionEntry = {
            mark: mark,
            user_id: user_id,
            ranking_id: ranking_id,
            ranking_section_id: ranking_section_id
        };

        
        if( Models.Rankings.findOne({where:{ranking_id:ranking_id}}) && Models.RankingSections.findOne({where:{ranking_section_id:ranking_section_id}}) && Models.Users.findOne({where:{user_id:user_id}}) ) {
            return await this.create(RankingSectionEntry);
        }

        return null;
        // return await this.create(RankingSectionEntry);
        // return await (Models.Rankings.findOne({where:{ranking_id:ranking_id}}) && Models.RankingSections.findOne({where:{ranking_section_id:ranking_section_id}}) && Models.Users.findOne({where:{user_id:user_id}}) ? this.create(RankingSectionEntry) : null)
    }

    RankingSectionEntries.deleteRankingSectionEntry = async function(ranking_section_entry_id) {
        return await this.destroy ({
            where: {
                ranking_section_entry_id: ranking_section_entry_id
            }
        });
    }


    return RankingSectionEntries;
}