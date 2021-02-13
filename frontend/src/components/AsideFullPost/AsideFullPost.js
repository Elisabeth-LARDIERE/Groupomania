// ASIDE FULL POST

// imports
import React from "react";
import './AsideFullPost.css';
import LogoSphere from "../LogoSphere/LogoSphere";
import Navbar from "../NavBar/NavBar";
import Support from "../Support/Support";
import Avatar from "../Avatar/Avatar";
import Terms from "../Terms/Terms";

function AsideFullPost() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <aside className="asideFullPost">

            <div className="fullPostCurrentUser currentUser">
                <Avatar/>

                <p className="fullPostCurrentUserId">{user.firstname} {user.lastname}</p>
            </div>

            <Navbar/>

            <Terms/>

            <LogoSphere/>

            <Support/>
        </aside>
    )
}

export default AsideFullPost;
