import React, {useEffect} from 'react';
import {CardMedia, Grid, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailItemRequest} from "../../store/actions/cocktailsActions";
import imageNotAvailable from "../../assets/images/imageNotAvailable.png";
import {apiURL} from "../../config";

const useStyle = makeStyles({
  image: {
    height: '100%',
    minHeight: '300px',
    width: 'auto',
  },
  row: {
    marginBottom: '20px'
  },
  recipeText: {
    margin: '10px 0 20px'
  },
  listItem: {

  }
});

const Cocktail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const cocktail = useSelector(state => state.cocktails.cocktailItem);
  const classes = useStyle();

  let cardImage = imageNotAvailable;

  if (cocktail && cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }

  let ingredientsList = null;

  if (cocktail && cocktail.ingredients) {
    ingredientsList = cocktail.ingredients.map(item => (
    <ListItem key={item._id}>
      <Typography>{item.title} - {item.amount}</Typography>
    </ListItem> ))
  }

  useEffect(() => {
    dispatch(getCocktailItemRequest(params.id))
  }, [dispatch, params.id]);

  return (
    <>
      <Grid container justify="space-between" className={classes.row}>
        <Grid item xs={4}>
          <CardMedia
            image={cardImage}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h5">{cocktail && cocktail.title}</Typography>
          <Typography><strong>Rating</strong></Typography>
          <Typography><strong>Ingredients:</strong></Typography>
          <List>
            {ingredientsList}
          </List>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Typography><strong>Recipe: </strong></Typography>
        <div className={classes.recipeText}>
          <Typography>{cocktail && cocktail.recipe}</Typography>
        </div>
        <Typography>
          <strong>Rate: </strong>

        </Typography>
      </Grid>
    </>
  );
};

export default Cocktail;