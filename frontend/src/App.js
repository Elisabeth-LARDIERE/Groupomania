//importations
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from "./pages/Home/Home";
import DisplayOnePost from "./pages/DisplayOnePost/DisplayOnePost";
import Terms from "./pages/Terms/Terms";
import CreateNewPost from "./pages/CreateNewPost/CreateNewPost";
import UserAccount from "./pages/UserAccount/UserAccount";
import UserPosts from "./pages/UserPosts/UserPosts";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/home" component={Home}/>
            <Route path="/displayOnePost" component={DisplayOnePost}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/createNewPost" component={CreateNewPost}/>
            <Route path="/userAccount" component={UserAccount}/>
            <Route path="/userPosts" component={UserPosts}/>
        </Switch>
      </Router>
  );
}

export default App;
