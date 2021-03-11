import React, { Component } from "react";
import "./adminpage.css";

export class adminpage extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }
  componentDidMount() {
    fetch("/express/db")
      .then((res) => res.json())
      .then((tableData) =>
        this.setState({ tableData }, () =>
          console.log("data fetched:", tableData)
        )
      );
  }
  applyChanges = (area) => {
    console.log("click");
    console.log(area);
  };
  refreshPage() {
    window.location.reload(false);
  }
  renderCards = (area, index) => {
    return (
      <div className="card">
        <h3>{area["state"]}</h3>
        <div className="list" key={index}>
          <div className="col1">
            <h4>Confirmed : </h4>
            <h4>Active :</h4>
            <h4>Deaths :</h4>
            <h4>Recovered :</h4>
            <h4>Total :</h4>
          </div>
          <div className="col2">
            <input
              className="input"
              type="text"
              placeholder={area["confirmedCases"]}
            />
            <input
              className="input"
              type="text"
              placeholder={area["activeCases"]}
            />
            <input className="input" type="text" placeholder={area["deaths"]} />
            <input
              className="input"
              type="text"
              placeholder={area["recoveredCases"]}
            />
            <input className="input" type="text" placeholder={area["total"]} />
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <main>
        <div class="button admin access" id="button-6">
          <div id="spin"></div>
          <a href="#">Admin Access</a>
        </div>
        <div class="buttons_container buttons">
          <button class="btn reset">
            <span className="" onClick={this.refreshPage}>
              Reset
            </span>
          </button>
          <button class="btn apply">
            <span className="">Apply</span>
          </button>
        </div>
        <div className="stateCards">
          {this.state.tableData.map((area, index) => this.renderCards(area))}
        </div>
      </main>
    );
  }
}

export default adminpage;
