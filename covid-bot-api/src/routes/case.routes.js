module.exports = app => {
    const casesController = require("../controllers/case.controller.js");

    const router = require("express").Router();

    // Retrieve total cases
    router.get("/total", casesController.getTotalCases);

    // Retrieve total deaths
    router.get("/deaths", casesController.getTotalDeaths);

    // Retrieve information load
    router.get("/update", casesController.getInformationLoad);

    // Load new casesController
    router.post("/update", casesController.loadNewCases);

    app.use('/covid', router);
};