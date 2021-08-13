const db = require("../models");
const Case = db.cases;

const CaseReportService = {

    /**
     * @description Gets total cases by filters
     * @param {CasesSearch} casesSearch     The filters
     * @returns cases
     */
    getTotalCases: (casesSearch) => {
        const filters = CaseReportService.loadTotalCasesFilters(casesSearch);

        return Case.find(filters);
    },

    /**
     * @description Gets total deaths by filters
     * @param {CasesSearch} casesSearch     The filters
     * @returns cases
     */
    getTotalDeaths: (casesSearch) => {
        const filters = CaseReportService.loadDeathsCasesFilters(casesSearch);

        return Case.find(filters);
    },

    /**
     * @description Gets information about last load
     * @returns {*} if success, return date and quantity registers had been loaded
     */
    getInformationLoad: () => {
        return new Promise(function (resolve, reject) {
            Case.find().sort({creation_date: -1}).limit(1) // for MAX date
                .then(dataMax => {
                    if (!dataMax) {
                        resolve({
                            last_load: null,
                            registers: 0
                        });
                    } else {
                        // for count registers
                        Case.countDocuments({creation_date: dataMax[0].creation_date}, function (err, count) {
                            console.log("Number of documents:", count);

                            if (err) {
                                console.log("error contando: ", err);
                                reject({message: err.message || "Some error occurred while retrieving counting last registers loaded."});
                            } else {
                                resolve({
                                    last_load: dataMax && dataMax.length == 1 ? dataMax[0].creation_date : null,
                                    registers: count
                                });
                            }
                        });
                    }
                });
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
        CaseReportService.loadGeneralFilters(casesSearch, filters);

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
        CaseReportService.loadGeneralFilters(casesSearch, filters);

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