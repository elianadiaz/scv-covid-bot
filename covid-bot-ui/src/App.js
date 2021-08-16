import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import Result from "./components/result/Result";
import Form from "./components/form/Form";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: 450
        },
    }),
);

function App() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
              <div className={classes.toolbar}>
                  <Grid container justifyContent="space-around">
                      <Typography variant="h3" gutterBottom>
                          Covid Bot
                      </Typography>
                  </Grid>
              </div>
              <div className={classes.toolbar}>
                  <Grid container spacing={1}>
                      <Grid item xs={12} sm={1}>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                          <Paper className={classes.paper}><Form /></Paper>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                          <Paper className={classes.paper}><Result /></Paper>
                      </Grid>
                      <Grid item xs={12} sm={1}>
                      </Grid>
                  </Grid>
              </div>
          </main>
      </div>
  );
}

export default App;
