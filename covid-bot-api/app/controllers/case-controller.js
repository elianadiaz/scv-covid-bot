const db = require("../models");
const Case = db.cases;

// Retrieve total Cases from the database.
exports.getTotalCases = (req, res) => {
    const filters = {};
    // Date: from - to
    if (req.query.date_from) {
        filters.symptoms_start_date.$gte = req.query.date_from;
    }
    if (req.query.date_to) {
        filters.symptoms_start_date.$lte = req.query.date_to;
    }
    // Age: from - to
    if (req.query.age_from) {
        filters.age.$gte = req.query.age_from;
    }
    if (req.query.age_to) {
        filters.age.$lte = req.query.age_to;
    }
    // Gender
    if (req.query.gender) {
        filters.gender = req.query.gender;
    }
    // Province
    if (req.query.province) {
        filters.province = req.query.province;
    }

    Case.find(filters)
        .then(data => {
            res.send({
                total_cases_registers: data ? data.length : 0
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cases."
            });
        });

    /*
    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
     */
};

// Retrieve total deaths from the database.
exports.getTotalDeaths = (req, res) => {
    const filters = {};
    // Date: from - to
    if (req.query.date_from) {
        filters.death_date.$gte = req.query.date_from;
    }
    if (req.query.date_to) {
        filters.death_date.$lte = req.query.date_to;
    }
    // Age: from - to
    if (req.query.age_from) {
        filters.age.$gte = req.query.age_from;
    }
    if (req.query.age_to) {
        filters.age.$lte = req.query.age_to;
    }
    // Gender
    if (req.query.gender) {
        filters.gender = req.query.gender;
    }
    // Province
    if (req.query.province) {
        filters.province = req.query.province;
    }

    Case.find(filters)
        .then(data => {
            res.send({
                total_deaths: data ? data.length : 0
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cases."
            });
        });
};

// mensaje
exports.getInformationLoad = (req, res) => {
    /*
    Devuelve los siguientes datos:
        1. Cuándo se realizó la última carga
        2. Cuántos nuevos registros se agregaron
     */


};

// mensaje
exports.updateCases = (req, res) => {
    // Dispara el proceso de carga de datos.
};


/*
GET /covid/total
Debe soportar los siguientes filtros:
1. Rango de Fechas (año/mes/día)
2. Rango de Edad
3. Género
4. Provincia
 */

/*

    if(req.query.type)
        filters.type = req.query.type;
    if(req.query.price)
        filter.price = req.query.price;

// you cannot know if the incoming
// price is for gt or lt, so

// add new query variable price_gt (price greater than)
    if(req.query.price_gt) {
        filter.price = filter.price || {};
        filter.price.$gt = req.query.price_gt;
    }

// add new query variable price_lt (price less than)
    if(req.query.price_lt) {
        filter.price = filter.price || {};
        filter.price.$lt = req.query.price_lt;
    }

    collection.find(filter);

 */

/*
// Route to return all articles with a given tag
app.get('/tag/:id', async function(req, res) {

    // Retrieve the tag from our URL path
    var id = req.params.id;

    let articles = await Article.findAll({tag: id}).exec();

    res.render('tag', {
        articles: articles
    });
});
 */