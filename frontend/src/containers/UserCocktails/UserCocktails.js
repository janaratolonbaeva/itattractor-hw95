import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import Title from "../../components/Title/Title";
import {Grid} from "@material-ui/core";
import CocktailItem from "../../components/CocktailItem/CocktailItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserCocktailsRequest} from "../../store/actions/cocktailsActions";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";

const Home = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const loading = useSelector(state => state.cocktails.cocktailsLoading);

  useEffect(() => {
    dispatch(fetchUserCocktailsRequest());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Cocktails</title>
      </Helmet>
      <Title>Cocktails</Title>
      <Grid container justify="space-between">
        {loading ? (
          <ProgressBar/>
        ) : cocktails && cocktails.map(item => (
          <CocktailItem
            key={item._id}
            title={item.title}
            image={item.image}
            published={item.published}
            id={item._id}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;