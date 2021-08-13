const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genders = require('./Genders')

// create case schema & model
const CaseSchema = new Schema({
    state: {
        type: String,
        required: [true, 'Province field is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender field is required'],
        enum: Object.values(Genders),
    },
    age: {
        type: Number,
        required: [true, 'Age field is required'],
    },
    symptoms_start_date: {
        type: Date,
        required: [true, 'Symptoms start date field is required'],
    },
    death_date: {
        type: Date,
    },
    creation_date: {
        type: Date,
        required: [true, 'Creation date field is required'], // otra opcion es usar: default: Date.now,
    },
});

Object.assign(CaseSchema.statics, {
    Genders,
});

const Case = mongoose.model('case', CaseSchema);

module.exports = Case;