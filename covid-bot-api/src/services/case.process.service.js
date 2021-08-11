const Response = require("../entities/response");
const ResponseStatus = require("../entities/response.status");

const CSV = require('csv-string');

const db = require("../models");
const Case = db.cases;

const HEADER = "\"id_evento_caso\",\"sexo\",\"edad\",\"edad_años_meses\",\"residencia_pais_nombre\",\"residencia_provincia_nombre\",\"residencia_departamento_nombre\",\"carga_provincia_nombre\",\"fecha_inicio_sintomas\",\"fecha_apertura\",\"sepi_apertura\",\"fecha_internacion\",\"cuidado_intensivo\",\"fecha_cui_intensivo\",\"fallecido\",\"fecha_fallecimiento\",\"asistencia_respiratoria_mecanica\",\"carga_provincia_id\",\"origen_financiamiento\",\"clasificacion\",\"clasificacion_resumen\",\"residencia_provincia_id\",\"fecha_diagnostico\",\"residencia_departamento_id\",\"ultima_actualizacion\"";
const GENDER_POSITION = 1; // column: sexo
const AGE_POSITION = 2; // column: edad
const AGE_YEARS_MONTHS_POSITION = 3; // column: edad_años_meses
const STATE_POSITION = 5; // column: residencia_provincia_nombre
const SYMPTOMS_START_DATE_POSITION = 8; // column: fecha_inicio_sintomas
const DEATH_DATE_POSITION = 15; // column: fecha_fallecimiento

const AgeYearMonths = Object.freeze({
    Years: 'years',
    Months: 'months',
});

const CaseProcessService = {
    /**
     * @description Load new cases
     * @returns {Response}
     */
    loadNewCases: () => {
        const fs = require('fs')
            , es = require('event-stream');

        const s = fs.createReadStream('Covid-test.csv')
            .pipe(es.split())
            .pipe(es.mapSync(function(line){
                // pause the readstream
                s.pause();

                // process line here and call s.resume() when rdy
                // function below was for logging memory usage
                //logMemoryUsage(lineNr);
                this.processLine(line);

                // resume the readstream, possibly from a callback
                s.resume();
            })
            .on('error', function(err){
                console.log('Error while reading file.', err);
                return new Response(ResponseStatus.Error, {message: err.message || "Some error occurred while processing new cases."});
            })
            .on('end', function(){
                console.log('Read entire file.')
                return new Response(ResponseStatus.Success, {});
            })
        );
    },

    /***---- Auxiliary functions ----***/

    /**
     * @description Process a line
     * @param {String} line     The line
     * @returns {*}
     */
    processLine: function (line) {
        if (!line) {
            return;
        }

        if (line === HEADER) {
            return;
        }

        const rows = CSV.parse(line);
        console.log(rows);

        // Create a Case
        const oneCase = this.toCase(rows);

        // Save Case in the database
        Case.save(oneCase)
            .catch(err => {
                console.log("Linea con error: ", line)
                console.log("Some error occurred while creating the Case.", err);
                console.log(err.message);
            });
    },

    /**
     * @description rows to Case
     * @param {string[][]} rows     The rows
     * @returns {Case}
     */
    toCase: function (rows) {
        return new Case({
            state: rows[STATE_POSITION] ? (rows[STATE_POSITION]).toUpperCase() : null,
            gender: rows[GENDER_POSITION] ? (rows[GENDER_POSITION]).toUpperCase() : null, //todo
            age: this.loadAge(rows[AGE_POSITION], rows[AGE_YEARS_MONTHS_POSITION]),
            symptoms_start_date: rows[SYMPTOMS_START_DATE_POSITION] ? rows[SYMPTOMS_START_DATE_POSITION] : null, // todo revisar q la fecha este bien
            death_date: rows[DEATH_DATE_POSITION] ? rows[DEATH_DATE_POSITION] : null, // todo revisar que la fecha este bien
        });
    },

    loadAge: function (age, ageYearsMonths) {
        if (!age || !ageYearsMonths) {
            return null;
        }

        if (ageYearsMonths.toLowerCase() === AgeYearMonths.Months.valueOf()) {
            return 0;
        }

        return age;
    },

}

module.exports = CaseProcessService;