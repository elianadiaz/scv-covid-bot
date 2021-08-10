import React from 'react';

import { withStyles , makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import API_URL_GET_REGISTERED_CASES from '../config/global.js';
import API_URL_GET_DEATHS from '../config/global.js';
import API_URL_POST_UPDATE from '../config/global.js';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered_cases: '-',
            deaths: '-',
            lastImport: '2021-09-10',
            isSynchronizing: false,
        }
    }

    componentDidMount() {
        // todo traer acá el armado del query param (viene de CovidForm)
        const queryParams = this.props.query_param ? "?" + this.props.query_param : "";
        // Fetch total registered cases
        fetch(API_URL_GET_REGISTERED_CASES + queryParams)
            .then(res => res.json())
            .then((data) => {
                if (data && data.total_cases_registers) {
                    this.setState({ registered_cases: data.total_cases_registers })
                }
            })
            .catch(console.log)

        // Fetch total deaths
        fetch(API_URL_GET_DEATHS + queryParams)
            .then(res => res.json())
            .then((data) => {
                if (data && data.total_deaths) {
                    this.setState({ deaths: data.total_deaths })
                }
            })
            .catch(console.log)
    }

    handleSynchronizeClick() {
        alert('Quiere sincronizar CON URL: ');

        if (!this.state.isSynchronizing) {
            this.setState({ isSynchronizing: true })
            // Synchronize
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(API_URL_POST_UPDATE, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    this.setState({
                        isSynchronizing: false,
                        lastImport: Date.now(),
                        registered_cases: data.total_cases_registers,
                        deaths: data.total_deaths
                    })
                })
                .catch(error => {
                    // this.setState({ errorMessage: error.toString() });
                    this.setState({ isSynchronizing: false });
                    console.error('There was an error!', error);
                });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h3" gutterBottom>
                    {this.state.registered_cases}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Registered Cases
                </Typography>

                <Typography variant="h3" gutterBottom>
                    {this.state.deaths}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Deaths
                </Typography>
                <br />
                <Typography variant="h6" gutterBottom>
                    Last import made on {this.state.lastImport}
                </Typography>
                <Button variant="outlined" color="primary"
                    onClick={() => this.handleSynchronizeClick()}>
                    Synchronize
                </Button>
            </div>
        );
    }
}

export default withStyles(useStyles)(Result);