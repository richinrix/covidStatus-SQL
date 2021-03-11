// import { listenerCount } from "mysql2/typings/mysql/lib/Pool";

import React, { Component, Fragment } from "react";
// import { tableData } from "../../../../server";
import "./homepage.css";

export class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      tableActiveAsc: [],
      tableActiveDesc: [],
      tableConfirmedAsc: [],
      tableConfirmedDesc: [],
      tableRecoveredAsc: [],
      tableRecoveredDesc: [],
      tableDeathsAsc: [],
      tableDeathsDesc: [],
      tableNewStrain: [],
      displayMenu: false,
      tableOpt: 0,
      sortingOrder: [0, 0, 0, 0],
    };
  }
  componentDidMount() {
    fetch("/express/newstrain")
      .then((res) => res.json())
      .then((tableNewStrain) =>
        this.setState({ tableNewStrain }, () =>
          console.log("data fetched: , tableNewStrain", tableNewStrain)
        )
      );
    fetch("/express/db")
      .then((res) => res.json())
      .then((tableData) =>
        this.setState({ tableData }, () =>
          console.log("data fetched: , tableData")
        )
      );
    fetch("/express/active")
      .then((res) => res.json())
      .then((tableActiveAsc) =>
        this.setState({ tableActiveAsc }, () =>
          console.log("data fetched: , tableActiveAsc")
        )
      );
    fetch("/express/activedesc")
      .then((res) => res.json())
      .then((tableActiveDesc) =>
        this.setState({ tableActiveDesc }, () =>
          console.log("data fetched: , tableActiveDesc")
        )
      );
    fetch("/express/confirmed")
      .then((res) => res.json())
      .then((tableConfirmedAsc) =>
        this.setState({ tableConfirmedAsc }, () =>
          console.log("data fetched: , tableConfirmedAsc")
        )
      );
    fetch("/express/confirmeddesc")
      .then((res) => res.json())
      .then((tableConfirmedDesc) =>
        this.setState({ tableConfirmedDesc }, () =>
          console.log("data fetched: , tableConfirmedDesc")
        )
      );
    fetch("/express/recovered")
      .then((res) => res.json())
      .then((tableRecoveredAsc) =>
        this.setState({ tableRecoveredAsc }, () =>
          console.log("data fetched: , tableRecoveredAsc")
        )
      );
    fetch("/express/recovereddesc")
      .then((res) => res.json())
      .then((tableRecoveredDesc) =>
        this.setState({ tableRecoveredDesc }, () =>
          console.log("data fetched: , tableRecoveredDesc")
        )
      );
    fetch("/express/deaths")
      .then((res) => res.json())
      .then((tableDeathsAsc) =>
        this.setState({ tableDeathsAsc }, () =>
          console.log("data fetched: , tableDeathsAsc")
        )
      );
    fetch("/express/deathsdesc")
      .then((res) => res.json())
      .then((tableDeathsDesc) =>
        this.setState({ tableDeathsDesc }, () =>
          console.log("data fetched: tableDeathsDesc")
        )
      );
  }
  sortingSta = () => {
    this.setState({ tableOpt: 0 });
  };
  sortingAct = () => {
    if (this.state.sortingOrder[0] === 0) {
      this.setState({ sortingOrder: [1, 0, 0, 0] });
      this.setState({ tableOpt: 1 });
    } else {
      console.log("active des");
      this.setState({ sortingOrder: [0, 0, 0, 0] });
      this.setState({ tableOpt: 10 });
    }
  };
  sortingConf = () => {
    if (this.state.sortingOrder[1] === 0) {
      this.setState({ sortingOrder: [0, 1, 0, 0] });
      this.setState({ tableOpt: 2 });
    } else {
      console.log("confirm des");
      this.setState({ sortingOrder: [0, 0, 0, 0] });
      this.setState({ tableOpt: 20 });
    }
  };
  sortingRec = () => {
    if (this.state.sortingOrder[2] === 0) {
      this.setState({ sortingOrder: [0, 0, 1, 0] });
      this.setState({ tableOpt: 3 });
    } else {
      console.log("rec des");
      this.setState({ sortingOrder: [0, 0, 0, 0] });
      this.setState({ tableOpt: 30 });
    }
  };
  sortingDea = () => {
    if (this.state.sortingOrder[3] === 0) {
      this.setState({ sortingOrder: [0, 0, 0, 1] });
      this.setState({ tableOpt: 4 });
    } else {
      console.log("active des");
      this.setState({ sortingOrder: [0, 0, 0, 0] });
      this.setState({ tableOpt: 40 });
    }
  };
  commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return val;
  }
  decide(choice) {
    if (choice === 0) {
      console.log("normal sorting");
      return this.state.tableData.map((area) => this.renderTable(area));
    } else if (choice === 1) {
      console.log("ascending");
      return this.state.tableActiveAsc.map((area) => this.renderTable(area));
    } else if (choice === 2) {
      return this.state.tableConfirmedAsc.map((area) => this.renderTable(area));
    } else if (choice === 3) {
      return this.state.tableRecoveredAsc.map((area) => this.renderTable(area));
    } else if (choice === 4) {
      return this.state.tableDeathsAsc.map((area) => this.renderTable(area));
    } else if (choice === 10) {
      return this.state.tableActiveDesc.map((area) => this.renderTable(area));
    } else if (choice === 20) {
      return this.state.tableConfirmedDesc.map((area) =>
        this.renderTable(area)
      );
    } else if (choice === 30) {
      return this.state.tableRecoveredDesc.map((area) =>
        this.renderTable(area)
      );
    } else if (choice === 40) {
      return this.state.tableDeathsDesc.map((area) => this.renderTable(area));
    } else {
      return this.state.tableData.map((area) => this.renderTable(area));
    }
  }
  renderTable = (area) => {
    return (
      <tr key={area["state"]} className="tablerows ">
        <td>{area["state"]}</td>

        <td>{this.commaSeparateNumber(area["activeCases"])}</td>
        <td>{this.commaSeparateNumber(area["confirmedCases"])}</td>

        <td>{this.commaSeparateNumber(area["recoveredCases"])}</td>
        <td>{this.commaSeparateNumber(area["deaths"])}</td>
        <td>{area["total"]}</td>
        <td>{area["deathPerc"]}</td>
        <ul></ul>
      </tr>
    );
  };
  renderNewstrain = (area, index) => {
    return (
      <tr key={area["state"]} className="tablerows ">
        <td>{index + 1}</td>
        <td>{area["country"]}</td>
        <td>{area["dateDetected"]}</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="table">
        {/* new strain */}
        <div className="newstrainContainer">
          <h3>- - - Sars Covid Affected Countries - - -</h3>
          <div className="tableNewStrain">
            {/* table1 of new strain */}
            <table className="newstrain1">
              <thead>
                <tr className="tableHeader">
                  <th>#</th>
                  <th>Country</th>
                  <th>Detected Date</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {this.state.tableNewStrain
                  .slice(0, 11)
                  .map((area, index) => this.renderNewstrain(area, index))}
              </tbody>
            </table>
            <table className="newstrain2">
              <thead>
                <tr className="tableHeader">
                  <th>#</th>
                  <th>Country</th>
                  <th>Detected Date</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {this.state.tableNewStrain
                  .slice(11, 22)
                  .map((area, index) => this.renderNewstrain(area, index + 11))}
              </tbody>
            </table>
            <table className="newstrain3">
              <thead>
                <tr className="tableHeader">
                  <th>#</th>
                  <th>Country</th>
                  <th>Detected Date</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {this.state.tableNewStrain
                  .slice(22)
                  .map((area, index) => this.renderNewstrain(area, index + 22))}
              </tbody>
            </table>
          </div>
        </div>
        {/* indian cases */}
        {/* <h3>- - INDIA - -</h3> */}
        <div className="india">
          <span className="india1">_I</span>
          <span className="india2">N</span>
          <span className="india4">D</span>
          <span className="india2">I</span>
          <span className="india3">A_</span>
        </div>
        <table>
          <thead>
            <tr className="tableHeader">
              <th onClick={this.sortingSta}>States</th>
              <th onClick={this.sortingAct}>Active</th>
              <th onClick={this.sortingConf}>Confirmed</th>
              <th onClick={this.sortingRec}>Recovered</th>
              <th onClick={this.sortingDea}>Deaths</th>

              <th>Tested</th>
              <th>Death Percentage</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {this.decide(this.state.tableOpt)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Homepage;
