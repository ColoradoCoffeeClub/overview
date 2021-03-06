import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core';

const Reviews = (props) => {

  function objectValueSum(obj) {
    return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0);
  }

  function totalStarsSum(obj) {
    let total = 0;

    for (let el in obj) {
      total += parseFloat(el) * obj[el];
    }

    return total;
  }

  let averageRating;
  if (!props.ratings) {
    averageRating = "no average rating available"
  } else {
    averageRating = totalStarsSum(props.ratings) / objectValueSum(props.ratings)
  }

  return (
    <div id="ratingsContainer">
      {props.ratings ?
        <Rating
          name="read-only"
          id="ratings"
          value={averageRating}
          readOnly
          precision={0.25}
          size="small"
        /> : <span id="noRatings">no ratings right now</span>}
    </div>
  );
}

export default Reviews;
