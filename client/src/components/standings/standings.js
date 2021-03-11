import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./standings.css";
//images
import localImg from "./local.png";
import globalImg from "./global.png";
//route
import Graph from "../standingsgraph/Standingsgraph";

export class standings extends Component {
  constructor() {
    super();
    this.state = {
      topActive: [],
      topDeaths: [],
      topConfirmed: [],
      topRecovered: [],
    };
  }
  commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return val;
  }
  componentDidMount() {
    fetch("/express/topactive")
      .then((res) => res.json())
      .then((topActive) =>
        this.setState({ topActive }, () =>
          console.log("data fetched:", topActive)
        )
      );
    fetch("/express/topdeaths")
      .then((res) => res.json())
      .then((topDeaths) =>
        this.setState({ topDeaths }, () =>
          console.log("data fetched:", topDeaths)
        )
      );
    fetch("/express/topconfirmed")
      .then((res) => res.json())
      .then((topConfirmed) =>
        this.setState({ topConfirmed }, () =>
          console.log("data fetched: top confirmed", topConfirmed)
        )
      );
    fetch("/express/toprecovered")
      .then((res) => res.json())
      .then((topRecovered) =>
        this.setState({ topRecovered }, () =>
          console.log("data fetched:", topRecovered)
        )
      );
  }

  renderRowAct(data, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data["state"]}</td>
        <td>{this.commaSeparateNumber(data["activeCases"])}</td>
      </tr>
    );
  }
  renderRowDth(data, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data["state"]}</td>
        <td>{this.commaSeparateNumber(data["deaths"])}</td>
      </tr>
    );
  }
  renderRowCon(data, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data["state"]}</td>
        <td>{this.commaSeparateNumber(data["confirmedCases"])}</td>
        <td>{data["tests"]}</td>
      </tr>
    );
  }
  renderRowRec(data, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data["state"]}</td>
        <td>{this.commaSeparateNumber(data["recoveredCases"])}</td>
      </tr>
    );
  }
  Tablepage = () => {
    return (
      <div className="standingcards">
        <div className="eachtable">
          <table>
            <thead>
              <th>&nbsp; # &nbsp;</th>
              <th>State</th>
              <th>Active Cases</th>
            </thead>
            <tbody>
              {this.state.topActive.map((row, index) =>
                this.renderRowAct(row, index)
              )}
            </tbody>
          </table>
        </div>
        <div className="eachtable">
          <table>
            <thead>
              <th>&nbsp; # &nbsp;</th>
              <th>State</th>
              <th>Deaths</th>
            </thead>
            <tbody>
              {this.state.topDeaths.map((row, index) =>
                this.renderRowDth(row, index)
              )}
            </tbody>
          </table>
        </div>
        <div className="eachtable">
          <table>
            <thead>
              <th>&nbsp; # &nbsp;</th>
              <th>State</th>
              <th>Confirmed</th>
              <th>Tests</th>
            </thead>
            <tbody>
              {this.state.topConfirmed.map((row, index) =>
                this.renderRowCon(row, index)
              )}
            </tbody>
          </table>
        </div>
        <div className="eachtable">
          <table>
            <thead>
              <th>&nbsp; # &nbsp;</th>
              <th>State</th>
              <th>Recovered</th>
            </thead>
            <tbody>
              {this.state.topRecovered.map((row, index) =>
                this.renderRowRec(row, index)
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  render() {
    return (
      <Router>
        <div className="heading">
          <h1>Standings</h1>
        </div>
        <div className="topcards">
          <div className="images">
            <Link to="/standings">
              <img src={localImg} alt="" srcset="" />
            </Link>
            <Link to="/standingsgraph">
              <img src={globalImg} alt="" srcset="" />
            </Link>
          </div>
          <Switch>
            <Route path="/standingsgraph" component={Graphpage} />
            <Route path="/standings" component={this.Tablepage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const Graphpage = () => (
  <Fragment>
    <Graph />
  </Fragment>
);

export default standings;
