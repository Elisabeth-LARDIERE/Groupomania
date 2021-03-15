// APPLICATION

//imports
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
import ProtectedRoute from "react-protected-route-component";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.guardFunction = this.guardFunction.bind(this);
    }

    guardFunction() { // fonction d'authentification de l'utilisateur
        const token = localStorage.getItem('token'); // récupération du token dans le localstorage
        if(token){ // si présence du token : accès accepté
            return true;
        } else { // si pas de token : accès refusé
            alert("Accès refusé. Veuillez vous connecter !");
            localStorage.clear();
            return false;
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <ProtectedRoute path="/home" redirectRoute="/" guardFunction={this.guardFunction} component={Home}/>
                    <ProtectedRoute path="/displayOnePost" redirectRoute="/" guardFunction={this.guardFunction} component={DisplayOnePost}/>
                    <ProtectedRoute path="/terms" redirectRoute="/" guardFunction={this.guardFunction} component={Terms}/>
                    <ProtectedRoute path="/createNewPost" redirectRoute="/" guardFunction={this.guardFunction} component={CreateNewPost}/>
                    <ProtectedRoute path="/userAccount" redirectRoute="/" guardFunction={this.guardFunction} component={UserAccount}/>
                    <ProtectedRoute path="/userPosts" redirectRoute="/" guardFunction={this.guardFunction} component={UserPosts}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
