import React from 'react';
import {CircularProgress, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  progress: {
    height: 200
  }
}));

const ProgressBar = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.progress}>
      <Grid item>
        <CircularProgress/>
      </Grid>
    </Grid>
  );
};

export default ProgressBar;