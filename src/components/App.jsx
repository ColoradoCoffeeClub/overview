import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import randomColor from 'randomcolor';
import Header from './Header.jsx';
import Announcement from './Announcement.jsx';
import Images from './Images.jsx';
import Reviews from './Reviews.jsx';
import Name from './Name.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToBag from './AddToBag.jsx';
import Share from './Share.jsx';
import Description from './Description.jsx';
import Details from './Details.jsx';


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
    padding: '0px',
  },
  details: {
    marginLeft: '20px'
  },
  reviews: {
    marginTop: "10px",
    marginBottom: "10px"
  },
}));

const App = () => {
  const classes = useStyles();
  const [productId, setProductId] = useState(1);

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Announcement />
      </Grid>
      <Grid item xs={7} style={{background:randomColor()}}>
        <Images />
      </Grid>
      <Grid container className={classes.details} item xs={4}>
        <Grid item xs={12} className={classes.reviews}>
          <Reviews productId={productId}/>
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <Name />
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <StyleSelector />
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <AddToBag />
        </Grid>
        <Grid item xs={12} style={{background:randomColor()}}>
          <Share />
        </Grid>
      </Grid>
      <Grid container item xs={12} style={{background:randomColor()}}>
        <Grid item xs={7} style={{background:randomColor()}}>
          <Description />
        </Grid>
        <Grid item xs={5} style={{background:randomColor()}}>
          <Details />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App;