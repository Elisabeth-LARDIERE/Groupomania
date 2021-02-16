// FILTER

// imports
import React from "react";
import './Filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className="filter">
                <p className="filterTitle">Trier les publications</p>

                <hr className="separator"/>

                <select className="filterOptions" value={this.props.value}
                        onChange={this.props.onChangeFilter}>

                    <option className="filterNews">
                        Les plus récentes
                    </option>

                    <option className="filterLikes">
                        Les plus populaires
                    </option>

                    <option className="filterDateOld">
                        Les plus anciennes
                    </option>
                </select>
            </div>
        )
    }
}

export default Filter;
