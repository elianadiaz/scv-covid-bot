import React from 'react';

import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Result from "../result/Result";

import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: null,
            dateTo: null,
            ageFrom: '',
            ageTo: '',
            gender: '',
            state: '',
            message:"",
            result:{},
        };

        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleAgeFromChange = this.handleAgeFromChange.bind(this);
        this.handleAgeToChange = this.handleAgeToChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const queryParams = this.getQueryParams();
        // Fetch total registered cases and total deaths
        axios.all([this.getTotalRegisteredCases(queryParams), this.getTotalDeaths(queryParams), this.getInformationAboutLastSync()])
            .then(axios.spread((...responses) => {
                const responseTotalCases = responses[0];
                const responseDeaths = responses[1];
                const responseLastSync = responses[2];

                if (responseTotalCases.status === 200 && responseDeaths.status === 200) {
                    this.setState({message: ""});
                    this.setState({
                        result: {
                            registeredCases: responseTotalCases.data.total_registered_cases,
                            deaths: responseDeaths.data.total_deaths,
                            lastImport: responseLastSync.status === 200
                                    ? (responseLastSync.data.last_load + " (registers: " + responseLastSync.data.registers + ")")
                                    : "-"},
                    });

                    /*return (
                        <Result
                            registeredCases={responseTotalCases.data.total_registered_cases}
                            deaths={responseDeaths.data.total_deaths}
                            lastImport={responseLastSync.status === 200
                                ? (responseLastSync.data.last_load + " (registers: " + responseLastSync.data.registers + ")")
                                : "-"}
                        />
                    );*/
                }
                this.setState({message: "Ocurrió un problema, intente más tarde."});
            })).catch(errors => {
            // react on errors.
            console.log("An error occurred getting the totals", errors);
        });
    }

    handleSubmit() {
        this.setState({message: "Cargando información..."});

    }

    handleDateFromChange(value) {
        this.setState({dateFrom: value});
    }

    handleDateToChange(value) {
        this.setState({dateTo: value});
    }

    handleAgeFromChange(event) {
        this.setState({ageFrom: event.target.value});
    }

    handleAgeToChange(event) {
        this.setState({ageTo: event.target.value});
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value});
    }

    handleStateChange(event) {
        this.setState({state: event.target.value});
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.formControl} onSubmit={() => this.handleSubmit()}>
                <div>
                    <FormLabel component="legend">Date</FormLabel>
                </div>
                <div>
                    <Grid container justifyContent="space-around">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="date-from"
                                label="From"
                                value={this.state.dateFrom}
                                onChange={this.handleDateFromChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="date-to"
                                label="To"
                                value={this.state.dateTo}
                                onChange={this.handleDateToChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </div>
                <br />
                <div>
                    <FormLabel component="legend">Age</FormLabel>
                </div>
                <div>
                    <Grid container justifyContent="space-around">
                        <TextField
                            id="age-from"
                            label="From"
                            type="number"
                            InputProps={{ inputProps: { min: "0" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.ageFrom}
                            onChange={this.handleAgeFromChange}
                        />
                        <TextField
                            id="age-to"
                            label="To"
                            type="number"
                            InputProps={{ inputProps: { min: "0" } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.ageTo}
                            onChange={this.handleAgeToChange}
                        />
                    </Grid>
                </div>
                <br />
                <div>
                    <Grid container justifyContent="space-around">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                value={this.state.gender}
                                onChange={this.handleGenderChange}
                            >
                                <MenuItem value="male">Hombre</MenuItem>
                                <MenuItem value="female">Mujer</MenuItem>
                                <MenuItem value="other">Otro</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                value={this.state.state}
                                onChange={this.handleStateChange}
                            >
                                <MenuItem value="CABA">CABA</MenuItem>
                                <MenuItem value="BSAS">Provincia de Buenos Aires</MenuItem>
                                <MenuItem value="CORDOBA">Córdoba</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </div>
                <br />
                <br />
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        Filter
                    </Button>
                </div>

            </form>
        );
    }

    /***---- Auxiliary functions ----***/
    getTotalRegisteredCases(queryParams) {
        return axios.get("http://localhost:8080/covid/total", {params: queryParams});
    }

    getTotalDeaths(queryParams) {
        return axios.get("http://localhost:8080/covid/deaths", {params: queryParams});
    }

    getInformationAboutLastSync() {
        return axios.get("http://localhost:8080/covid/update");
    }

    getQueryParams() {
        let query = this.state.dateFrom ? "date_from="
            + (this.state.dateFrom.getFullYear() + "/" + this.state.dateFrom.getMonth() + "/"
                + this.state.dateFrom.getDay()) : "";
        if (this.state.dateTo) {
            query += this.addAnd(query);
            query += this.state.dateTo ? "date_to="
                + (this.state.dateTo.getFullYear() + "/" + (this.state.dateTo.getMonth() + 1)
                    + "/" + this.state.dateTo.getDay()) : "";
        }
        if (this.state.ageFrom && this.state.ageFrom.length > 0) {
            query += this.addAnd(query);
            query += this.state.ageFrom ? "age_from=" + this.state.ageFrom : "";
        }
        if (this.state.ageTo && this.state.ageTo.length > 0) {
            query += this.addAnd(query);
            query += this.state.ageTo ? "age_to=" + this.state.ageTo : "";
        }
        if (this.state.gender && this.state.gender.length > 0) {
            query += this.addAnd(query);
            query += this.state.gender ? "gender=" + this.state.gender : "";
        }
        if (this.state.state && this.state.state.length > 0) {
            query += this.addAnd(query);
            query += this.state.state ? "state=" + this.state.state : "";
        }

        return query;
    }

    addAnd(query) {
        if (query.length > 0) {
            return "&";
        }

        return "";
    }

}

export default withStyles(useStyles)(Form);