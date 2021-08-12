const CSV = require('csv-string');

/*const db = require("../models");
const Case = db.cases;*/

const CaseModel = require("../models/case");

const Genders = require("../models/case");
const Case = require("../models/case");

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
     * @returns general message
     */
    loadNewCases: () => {
        return new Promise(function (resolve, reject) {
            const fs = require('fs')
                , es = require('event-stream');

            const s = fs.createReadStream('Covid-test.csv')
                .pipe(es.split())
                .pipe(es.mapSync(function(line){
                        // pause the readstream
                        s.pause();

                        // process line here and call s.resume()
                        CaseProcessService.processLine(line);

                        // resume the readstream, possibly from a callback
                        s.resume();
                    })
                        .on('error', function(err){
                            console.log('Error while reading file.', err);
                            reject({message: err.message || "Error while reading file."});
                        })
                        .on('end', function(){
                            console.log('Read entire file.')
                            resolve({message: 'fin'});
                        })
                );
        });
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
        const oneCase = CaseProcessService.toCase(rows[0]);



        // Save Case in the database
        Case({
            state: rows[STATE_POSITION] ? (rows[STATE_POSITION]).toUpperCase() : null,
            gender: CaseProcessService.getGender(rows[GENDER_POSITION]),
            age: CaseProcessService.getAge(rows[AGE_POSITION], rows[AGE_YEARS_MONTHS_POSITION]),
            symptoms_start_date: rows[SYMPTOMS_START_DATE_POSITION] ? rows[SYMPTOMS_START_DATE_POSITION] : null, // todo revisar q la fecha este bien
            death_date: rows[DEATH_DATE_POSITION] ? rows[DEATH_DATE_POSITION] : null, // todo revisar que la fecha este bien
        }).save()
        .catch(err => {
            console.log("Linea con error: ", line)
            console.log("Some error occurred while creating the Case.", err);
            console.log(err.message);
        });
    },

    /**
     * @description rows to Case
     * @param {string[]} rows     The rows
     * @returns {*}
     */
    toCase: function (rows) {
        return {
            state: rows[STATE_POSITION] ? (rows[STATE_POSITION]).toUpperCase() : null,
            gender: CaseProcessService.getGender(rows[GENDER_POSITION]),
            age: CaseProcessService.getAge(rows[AGE_POSITION], rows[AGE_YEARS_MONTHS_POSITION]),
            symptoms_start_date: rows[SYMPTOMS_START_DATE_POSITION] ? rows[SYMPTOMS_START_DATE_POSITION] : null, // todo revisar q la fecha este bien
            death_date: rows[DEATH_DATE_POSITION] ? rows[DEATH_DATE_POSITION] : null, // todo revisar que la fecha este bien
        };
    },

    /**
     * @description If field is M, else return Male. If field is F, else return Female; else Other.
     * @param field
     * @returns {Genders}
     */
    getGender: function (field) {
        if (!field) {
            return Genders.Other;
        }

        if (field.toUpperCase() === 'M') {
            return Genders.Male;
        }

        if (field.toUpperCase() === 'F') {
            return Genders.Female;
        }

        return Genders.Other;
    },

    /**
     * @description get age. If ageYearsMonths is months, age is 0, else return age.
     * @param age
     * @param ageYearsMonths
     * @returns {Number}
     */
    getAge: function (age, ageYearsMonths) {
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