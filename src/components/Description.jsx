import React from 'react';
import {Typography, Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles ((theme) => ({
  slogan: {
    fontWeight: "bold",
    fontSize: "small",
    marginBottom: "10px"
  },
  description: {
    fontSize: "small",
  }
}));

const Description = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} id="sloganItem">
        {props.currentProduct ?
          <Typography id="slogan" className={classes.slogan}>
            {props.currentProduct.slogan}
          </Typography>
          : <span id="noSlogan">no current slogan</span>
        }
      </Grid>
      <Grid item id="description" xs={12}>
        {props.currentProduct ?
          <Typography className={classes.description}>
            {props.currentProduct.description}
          </Typography>
          : <span>no current description</span>
        }
      </Grid>
    </Grid>
  );
}

export default Description;