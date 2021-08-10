import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import Result from "./Result";

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

export default function CovidForm() {
    // Date From
    const [dateFrom, setDateFrom] = React.useState(null);
    const handleDateFromChange = (date: Date | null) => {
        setDateFrom(date);
    };
    // Date To
    const [dateTo, setDateTo] = React.useState(null);
    const handleDateToChange = (date: Date | null) => {
        setDateTo(date);
    };
    // Age From
    const [ageFrom, setAgeFrom] = React.useState('');
    const handleAgeFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgeFrom(event.target.value);
    };

    // Age To
    const [ageTo, setAgeTo] = React.useState('');
    const handleAgeToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgeTo(event.target.value);
    };
    // Gender
    const [gender, setGender] = React.useState('');
    const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value);
    };
    // State
    const [state, setState] = React.useState('');
    const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setState(event.target.value);
    };

    // Submit
    const handleSubmit = (event) => {
        alert('Ha submiteado');
        // Pasa este armado a Result
        let query = dateFrom ? "date_from=" + dateFrom : "";
        query += dateTo ? "date_to=" + dateTo : "";
        query += ageFrom ? "age_from=" + ageFrom : "";
        query += ageTo ? "age_to=" + ageTo : "";
        query += gender ? "gender=" + gender : "";
        query += state ? "state=" + state : "";

        Result({query_param: query});

        event.preventDefault();
    }

    const classes = useStyles();
    return (
        <form className={classes.formControl} onSubmit={handleSubmit}>
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
                            value={dateFrom}
                            onChange={handleDateFromChange}
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
                            value={dateTo}
                            onChange={handleDateToChange}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ageFrom}
                        onChange={handleAgeFromChange}
                    />
                    <TextField
                        id="age-to"
                        label="To"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ageTo}
                        onChange={handleAgeToChange}
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
                            value={gender}
                            onChange={handleGenderChange}
                        >
                            <MenuItem value="H">Hombre</MenuItem>
                            <MenuItem value="M">Mujer</MenuItem>
                            <MenuItem value="O">Otro</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                            labelId="state-label"
                            id="state"
                            value={state}
                            onChange={handleStateChange}
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
