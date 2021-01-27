//importations
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from "./pages/Home/Home";
import DisplayOnePost from "./pages/DisplayOnePost/DisplayOnePost";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/home" component={Home}/>
            <Route path="/displayOnePost" component={DisplayOnePost}/>
        </Switch>
      </Router>
  );
}

export default App;
