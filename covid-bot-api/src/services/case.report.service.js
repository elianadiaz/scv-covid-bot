const Response = require("../entities/response");
const ResponseStatus = require("../entities/response.status");

const db = require("../models");
const Case = db.cases;

const CaseReportService = {

    // todo
    // https://www.freecodecamp.org/espanol/news/aprende-javascript-imports-exports-let-const-promisas-es6/

    /**
     * @description Gets total cases by filters
     * @param {CasesSearch} casesSearch     The filters
     * @returns {Response}
     */
    getTotalCases: (casesSearch) => {
        const filters = this.loadTotalCasesFilters(casesSearch);

        Case.find(filters)
            .then(data => {
                return new Response(ResponseStatus.Success, {total_cases_registers: data ? data.length : 0});
            })
            .catch(err => {
                return new Response(ResponseStatus.Error, {message: err.message
                    || "Some error occurred while retrieving cases."});
            });
    },

    /**
     * @description Gets total deaths by filters
     * @param {CasesSearch} casesSearch     The filters
     * @returns {Response}
     */
    getTotalDeaths: (casesSearch) => {
        const filters = this.loadDeathsCasesFilters(casesSearch);

        Case.find(filters)
            .then(data => {
                return new Response(ResponseStatus.Success, {total_cases_registers: data ? data.length : 0});
            })
            .catch(err => {
                return new Response(ResponseStatus.Error, {message: err.message
                    || "Some error occurred while retrieving total deaths."});
            });
    },

    /**
     * @description Gets information about last load
     * @returns {Response} if success, return date and quantity registers had been loaded
     */
    getInformationLoad: () => {
        Case.find().sort({creation_date: -1}).limit(1) // for MAX date
            .then(dataMax => {
                Case.count({creation_date: dataMax.creation_date}) // for count registers
                    .then(dataCount => {
                        return new Response(ResponseStatus.Success,
                            {
                                last_load: dataMax.creation_date,
                                registers: dataCount
                            });
                    })
                    .catch(err => {
                        return new Response(ResponseStatus.Error, {message: err.message
                            || "Some error occurred while retrieving counting last registers loaded."});;
                    });

                return new Response(ResponseStatus.Success, {total_cases_registers: data ? data.length : 0});
            })
            .catch(err => {
                return new Response(ResponseStatus.Error, {message: err.message
                        || "Some error occurred while retrieving information about load."});
            });

    },

    /***---- Auxiliary functions ----***/

    /**
     * @description Load filters to query by total cases
     * @param {CasesSearch} casesSearch     The filters
     * @returns {*}
     */
    loadTotalCasesFilters: function (casesSearch) {
        const filters = {};
        // Date: from - to
        if (casesSearch.dateFrom) {
            filters.symptoms_start_date.$gte = casesSearch.dateFrom;
        }
        if (casesSearch.dateTo) {
            filters.symptoms_start_date.$lte = casesSearch.dateTo;
        }
        this.loadGeneralFilters(casesSearch, filters);

        return filters;
    },

    /**
     * @description Load filters to query by deaths
     * @param {CasesSearch} casesSearch     The filters
     * @returns {*}
     */
    loadDeathsCasesFilters: function (casesSearch) {
        const filters = {};
        // Date: from - to
        if (casesSearch.dateFrom) {
            filters.death_date.$gte = casesSearch.dateFrom;
        }
        if (casesSearch.dateTo) {
            filters.death_date.$lte = casesSearch.dateTo;
        }
        this.loadGeneralFilters(casesSearch, filters);

        return filters;
    },

    /**
     * @description Load filters to query
     * @param {CasesSearch} casesSearch     The filters
     * @param {*}   The rest of filters to query
     * @returns {*}
     */
    loadGeneralFilters: function (casesSearch, filters) {
        // Age: from - to
        if (casesSearch.ageFrom) {
            filters.age.$gte = casesSearch.ageFrom;
        }
        if (casesSearch.ageTo) {
            filters.age.$lte = casesSearch.ageTo;
        }
        // Gender
        if (casesSearch.gender) {
            filters.gender = casesSearch.gender;
        }
        // State
        if (casesSearch.state) {
            filters.state = casesSearch.state;
        }
    },

}

module.exports = CaseReportService;