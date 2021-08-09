const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
});

const AgeYearMonths = Object.freeze({
    Years: 'years',
    Months: 'months',
});

// create case schema & model
const CaseSchema = new Schema({
    province: {
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
    age_years_months: {
        type: String,
        enum: Object.values(AgeYearMonths),
        default: AgeYearMonths.Years,
    },
    symptoms_start_date: {
        type: Date,
        default: Date.now,
    },
    death_date: {
        type: Date,
    },
    last_update_system_external: {
        type: Date,
        default: Date.now,
    },
});

Object.assign(CaseSchema.statics, {
    Genders,
    AgeYearMonths,
});

const Case = mongoose.model('case', CaseSchema);

module.exports = Case;