// BARRE DE TRI / FILTRES

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

                <select className="filterOptions" value={this.props.value} // récupération des props du parent pour affichage différent en fonction de la valeur de la barre de tri
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
