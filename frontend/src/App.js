import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from 'react-router-dom';
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {Helmet} from "react-helmet";
import AddCocktail from "./containers/AddCocktail/AddCocktail";
import Home from "./containers/Home/Home";
import UserCocktails from "./containers/UserCocktails/UserCocktails";
import Cocktail from "./containers/Cocktail/Cocktail";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
    <Route {...props} /> :
    <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <Helmet
        titleTemplate="%s - Cocktail App"
        defaultTitle="Cocktail App"
      />
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          component={Home}
          isAllowed={user}
          redirectTo="/login"
        />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <ProtectedRoute
          path="/cocktails/new"
          exact
          component={AddCocktail}
          isAllowed={user}
          redirectTo="/login"
        />
        <ProtectedRoute
          path='/user-cocktails'
          exact
          component={UserCocktails}
          isAllowed={user && user.role === 'user'}
          redirectTo="/"
        />
        <Route path="/cocktails/:id" exact component={Cocktail}/>
      </Switch>
    </Layout>
  );
};

export default App;
