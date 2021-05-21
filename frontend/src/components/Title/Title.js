import React from 'react';
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles({
  title: {
    margin: '20px 0 40px'
  }
});

const Title = ({text}) => {
  const classes = useStyle();

  return (
    <>
      <Typography variant="h3" className={classes.title}>{text}</Typography>
    </>
  );
};

export default Title;