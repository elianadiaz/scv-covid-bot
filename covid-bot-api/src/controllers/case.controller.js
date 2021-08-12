const CasesSearch = require("../entities/case.search");

const caseReportService = require("../services/case.report.service");
const caseProcessService = require("../services/case.process.service");

const caseController = {

    /**
     * @description Gets total cases
     * @param query params (date_from, date_to, age_from, age_to, gender, state)
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, result: *}>}
     */
    getTotalCases: async (req, res) => {
        const casesSearch = new CasesSearch(req.query.date_from, req.query.date_to, req.query.age_from,
            req.query.age_to, req.query.gender, req.query.state);

        caseReportService.getTotalCases(casesSearch)
            .then(data => {
                res
                    .status(200)
                    .json({total_cases_registers: data ? data.length : 0});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: err.message || "Some error occurred while retrieving cases."});
            });
    },

    /**
     * @description Gets total deaths
     * @param query params (date_from, date_to, age_from, age_to, gender, state)
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, result: *}>}
     */
    getTotalDeaths: async (req, res) => {
        const casesSearch = new CasesSearch(req.query.date_from, req.query.date_to, req.query.age_from,
            req.query.age_to, req.query.gender, req.query.state);

        caseReportService.getTotalDeaths(casesSearch)
            .then(data => {
                res
                    .status(200)
                    .json({total_deaths: data ? data.length : 0});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: err.message || "Some error occurred while retrieving total deaths."});
            });
    },


    getInformationLoad: async (req, res) => {
        caseReportService.getInformationLoad()
            .then(data => {
                res
                    .status(200)
                    .json(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: err.message || "Some error occurred while retrieving information about load."});
            });
    },

    loadNewCases: async (req, res) => {
        caseProcessService.loadNewCases()
            .then(data => {
                res
                    .status(200)
                    .json(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: err.message || "Some error occurred while loading cases."});
            });
    },

}

module.exports = caseController;