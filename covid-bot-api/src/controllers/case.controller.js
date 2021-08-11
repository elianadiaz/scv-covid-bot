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

        const result = await caseReportService.getTotalCases(casesSearch);

        return res
            .status(result.toHttpStatus())
            .statusCode(result.toHttpStatusCode())
            .json(result.result);
    },

    /**
     * @description Gets total deaths
     * @param query params (date_from, date_to, age_from, age_to, gender, state)
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, result: *}>}
     */
    getTotalDeaths: async (req, res) => {
        const casesSearch = new CasesSearch(req.query.date_from, req.query.date_to, req.query.age_from,
            req.query.age_to, req.query.gender, req.query.state);

        const result = await caseReportService.getTotalDeaths(casesSearch);

        return res
            .status(result.toHttpStatus())
            .statusCode(result.toHttpStatusCode())
            .json(result.result);
    },


    getInformationLoad: async (req, res) => {
        const result = await caseReportService.getInformationLoad();

        return res
            .status(result.toHttpStatus())
            .statusCode(result.toHttpStatusCode())
            .json(result.result);
    },

    loadNewCases: async (req, res) => {
        const result = caseProcessService.loadNewCases();

        return res
            .status(result.toHttpStatus())
            .statusCode(result.toHttpStatusCode())
            .json(result.result);
    },

}

module.exports = caseController;