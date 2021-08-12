const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
});

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
        default: Date.now,
    },
    death_date: {
        type: Date,
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
});

Object.assign(CaseSchema.statics, {
    Genders,
});

const Case = mongoose.model('case', CaseSchema);

module.exports = Case;
module.exports = Genders;