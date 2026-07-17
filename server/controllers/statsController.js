const SiteStats = require("../models/SiteStats");
const incrementVisit = async (req, res) => {
    try {
        let stats = await SiteStats.findOne();

        if (!stats) {
            stats = await SiteStats.create({
                totalVisits: 1,
            });
        } else {
            stats.totalVisits += 1;
            await stats.save();
        }

        res.status(200).json({
            message: "Visit counted",
            totalVisits: stats.totalVisits,
        });

    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getStats = async (req, res) => {
    try {

        let stats = await SiteStats.findOne();

        if(!stats){
            return res.status(200).json({
                totalVisits:0
            });
        }

        res.status(200).json(stats);

    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


module.exports = {
    incrementVisit,
    getStats
};