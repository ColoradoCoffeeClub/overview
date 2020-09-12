import React from "react";
import { Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import App from "./App.jsx";

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'p',
  productionPrefix: 'o'
});

const AppContainer = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route
          path='/:productId'
          render={props => {
            const { productId } = props.match.params || { productId: 1 };
            return (<App productId={productId} />)
          }} />
      </Switch>
    </StylesProvider>
  );
};

export default AppContainer;