import React from 'react';
import {ListItem} from "@material-ui/core";

const IngredientItem = ({text}) => {
  return (
    <ListItem>{text}</ListItem>
  );
};

export default IngredientItem;