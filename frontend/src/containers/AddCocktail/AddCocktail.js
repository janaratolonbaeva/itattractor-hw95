import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import FormElement from "../../components/UI/Form/FormElement";
import FileInput from "../../components/UI/Form/FileInput";
import {useDispatch} from "react-redux";
import {postCocktailRequest} from "../../store/actions/cocktailsActions";
import Title from "../../components/Title/Title";

const useStyle = makeStyles({
  row: {
    marginBottom: '20px'
  }
});

const AddCocktail = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([{title: '', amount: ''}]);
  const [cocktail, setCocktail] = useState({
    title: '',
    recipe: '',
    image: ''
  })

  const changeIngredient = (i, name, value) => {
    setIngredients(prev => {
      const ingCopy = {
        ...prev[i],
        [name]: value
      }

      return prev.map((ing, index) => {
        if (index === i) return ingCopy;

        return ingCopy;
      });
    });

    setCocktail(prev => ({
      ...prev,
      ingredients: ingredients
    }));
  };

  const addIngredient = () => {
    setIngredients(prev => [...prev, {title: '', amount: ''}]);
  };

  const deleteIngredient = (ing) => {
    const newIngredients = ingredients.filter(item => item !== ing);

    setIngredients(newIngredients);
  };

  const changeInputHandler = e => {
    const {name, value} = e.target;

    setCocktail(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setCocktail(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const submitForm = e => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(cocktail).forEach(key => {
      if(key === 'ingredients') {
        cocktail[key] = JSON.stringify(cocktail[key])
      }
      formData.append(key, cocktail[key]);
    });

    dispatch(postCocktailRequest(formData));
  };

  return (
    <>
      <Helmet>
        <title>Add new cocktail</title>
      </Helmet>
      <Title>Add new cocktail</Title>
      <Grid container component="form" onSubmit={submitForm} direction="column">
        <Grid item xs className={classes.row}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">Name: </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormElement
                type="text"
                name="title"
                value={cocktail.title}
                onChange={changeInputHandler}
              />
            </Grid>
          </Grid>
        </Grid>
        <IngredientForm
          ingredients={ingredients}
          changeIngredient={changeIngredient}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
        />
        <Grid item xs className={classes.row}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">Name: </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormElement
                multiline
                rows={3}
                type="text"
                name="recipe"
                value={cocktail.recipe}
                onChange={changeInputHandler}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs className={classes.row}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6">Name: </Typography>
            </Grid>
            <Grid item xs={8}>
              <FileInput
                name="image"
                label="Image"
                onChange={fileChangeHandler}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs={4}/>
            <Grid item xs={8}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create cocktail
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCocktail;