// ASIDE

// imports
import React, {Fragment} from "react";
import './Aside.css';
import Filter from "../Filter/Filter";
import Support from "../Support/Support";


class Aside extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const renderAside = () => {
        if (this.props.location.pathname === '/home') {
            return (
                <Filter/>
            )
        } else {
            return null
        }
    }
        return (
            <aside className="aside">
                {renderAside()}

                <Support/>

                <div className="termsLink">
                    <a href="http://localhost:3000/terms">
                        <button className="termsButton button">Mentions légales</button>
                    </a>
                </div>
            </aside>
        )
    }
}

export default Aside;
