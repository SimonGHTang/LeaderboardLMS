module.exports = function(sequelize, Sequelize) {
    const AnonymitySettings = sequelize.define("AnonymitySettings", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "anonymity_setting_id"
        },

        revealLeaderboardName: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        revealAnonymitySettingSections: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {underscored: true});
    
    AnonymitySettings.getAnonymitySetting = async function(anonymity_setting_id) {

        return await this.findOne({
            where: { anonymity_setting_id: anonymity_setting_id }
        });
    }

    AnonymitySettings.editAnonymitySetting = async function(ranking_id, revealLeaderboardName, revealAnonymitySettingSections) {
        const updatedAnonymitySettingValues = {
            revealLeaderboardName: revealLeaderboardName,
            revealAnonymitySettingSections: revealAnonymitySettingSections
        }

        const t = await sequelize.transaction();
        const currentAnonymitySetting = await this.findOne({
            where: { ranking_id: ranking_id }
        }, {transaction: t});

        const updatedAnonymitySetting = await currentAnonymitySetting.updateAttributes(updatedAnonymitySettingValues, {transaction: t});
        t.commit();
        return updatedAnonymitySetting;
    }

    AnonymitySettings.insertAnonymitySetting = async function(ranking_id, revealLeaderboardName, revealAnonymitySettingSections) {
        const AnonymitySetting = {
            revealLeaderboardName: revealLeaderboardName,
            revealAnonymitySettingSections: revealAnonymitySettingSections,
            ranking_id: ranking_id,
        };

        return await this.create(AnonymitySetting);
    }

    AnonymitySettings.deleteAnonymitySetting = async function(anonymity_setting_id) {
        const t = await sequelize.transaction();

        var numberOfAnonymitySettingsDeleted = await this.destroy({
            where: { anonymity_setting_id: anonymity_setting_id }
        }, {transaction: t});
        t.commit();

        return numberOfAnonymitySettingsDeleted;
    }
    
    return AnonymitySettings;
}