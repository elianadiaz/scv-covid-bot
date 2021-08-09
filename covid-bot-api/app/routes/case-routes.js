module.exports = app => {
    const cases = require("../controllers/case-controller.js");

    const router = require("express").Router();

    // Retrieve total cases
    router.get("/total", cases.getTotalCases);

    // Retrieve total deaths
    router.get("/deaths", cases.getTotalDeaths);

    // Retrieve information load
    router.get("/update", cases.getInformationLoad);

    // Load new cases
    router.post("/update", cases.updateCases);

    app.use('/covid', router);
};