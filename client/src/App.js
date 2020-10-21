import React from "react";
import { GlobalProvider } from "./context/GlobalState";
import { MainApp } from "./components/MainApp";
import { Switch, Route } from "react-router-dom";
import ButtonAppBar from "./components/Header.jsx";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import "./App.css";


function App() {
  
  return (
    // <GlobalProvider>
    <GlobalProvider>
      <ButtonAppBar />
      <Switch>
        <Route exact path="/" component={MainApp}/>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        
      </Switch>
   
    </GlobalProvider>
  );
}

export default App;
