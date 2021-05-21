import React from 'react';
import {Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles({
  root: {
    marginBottom: '20px'
  },
  inputAmount: {
    marginRight: '20px',
  },
  inputRow: {
    marginBottom: '10px'
  },
  inputTitle: {
    paddingRight: '10px'
  }
});

const IngredientForm = ({ingredients, changeIngredient, deleteIngredient, addIngredient}) => {
  const classes = useStyle();

  return (
    <Grid item xs className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h6">Ingredients: </Typography>
        </Grid>
        <Grid item xs={8}>
          {ingredients.map((ing, i) => (
            <Grid container key={i} justify="space-between" className={classes.inputRow}>
              <Grid item xs={8} className={classes.inputTitle}>
                <FormElement
                  label="Ingredient name"
                  type="text"
                  name="title"
                  onChange={e => changeIngredient(i, 'title', e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container alignItems="center">
                  <Grid item xs className={classes.inputAmount}>
                    <FormElement
                      label="Amount"
                      type="text"
                      name="amount"
                      onChange={e => changeIngredient(i, 'amount', e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteIngredient(ing)}
                    >
                    <HighlightOffIcon fontSize="small"/>
                  </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Button
            onClick={addIngredient}
            variant="contained"
            color="primary"
          >
            Add ingredient
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IngredientForm;