import React from 'react';

import { withStyles , makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import axios from "axios";

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
            registeredCases: '-',
            deaths: '-',
            lastImport: '-'
        }
    }

    handleSynchronizeClick() {
        axios.post("http://localhost:8080/covid/update")
            .then(response => {
                if (response.status === 200) {
                    this.setState({last_import: Date.now()});
                } else {
                    this.setState({last_import: '-'});
                }

                console.log(response)
            }).catch(error => {
                console.err(error)
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h3" gutterBottom>
                    {this.state.registeredCases}
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