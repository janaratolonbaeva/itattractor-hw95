import React from 'react';
import {Link} from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import imageNotAvailable from "../../assets/images/imageNotAvailable.png";
import {apiURL} from "../../config";
import {useDispatch, useSelector} from "react-redux";
import {publishedCocktailItemRequest, removeCocktailItemRequest} from "../../store/actions/cocktailsActions";

const useStyles = makeStyles({
  root: {
    marginBottom: '20px'
  },
  card: {
    height: '100%',
    width: '90%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardContent: {
    opacity: 0.5
  }
});

const CocktailItem = ({image, title, recipe, published, id}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const deleteCocktailItem = (id) => {
    dispatch(removeCocktailItemRequest(id));
  };

  const onPublishedCocktail = (id) => {
    dispatch(publishedCocktailItemRequest(id))
  }

  let btnForAdmin = null;

  if (user && user.role === 'admin') {
    btnForAdmin = (
      <>
        <Button size="small" color="primary" onClick={() => deleteCocktailItem(id)}>
          Delete
        </Button>
        {!published ? <Button size="small" color="primary" onClick={() => onPublishedCocktail(id)}>
          Published
        </Button> : null}
      </>
    );
  }

  let publishText = null;

  if (user && user.role === 'user') {
    publishText = !published ? <Typography>Your cocktail is under moderation</Typography> : null
  }

  return (
    <Grid item xs={6} md={4} className={classes.root}>
      <Card className={classes.card}>
        <div className={!published ? classes.cardContent : null}>
          <CardMedia
            className={classes.media}
            image={cardImage}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe}
            </Typography>
          </CardContent>
        </div>
        <CardActions>
          <Button size="small" color="primary" component={Link} to={"/cocktails/" + id}>
            More
          </Button>
          {btnForAdmin}
        </CardActions>
        <CardContent>
          {publishText}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CocktailItem;