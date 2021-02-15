// ASIDE FULL POST

// imports
import React from "react";
import './AsideFullPost.css';
import LogoSphere from "../LogoSphere/LogoSphere";
import Navbar from "../NavBar/NavBar";
import Support from "../Support/Support";
import Avatar from "../Avatar/Avatar";
import Terms from "../Terms/Terms";

class AsideFullPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termsMenu: true
        };
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <aside className="asideFullPost">

                <div className="currentUser asideCurrentUser">
                    <Avatar/>

                    <p className="currentUserId asideCurrentUserId">{user.firstname} {user.lastname}</p>
                </div>

                <Navbar termsMenu={this.state.termsMenu}/>

                <LogoSphere/>

                <Support/>
            </aside>
        )
    }
}

export default AsideFullPost;
