import React, { Component } from "react";
import "./standingsgraph.css";
export class Standingsgraph extends Component {
  constructor() {
    super();
    this.state = {
      topCountries: [],
    };
  }
  componentDidMount() {
    fetch("/express/topcountries")
      .then((res) => res.json())
      .then((topCountries) =>
        this.setState({ topCountries }, () =>
          console.log("data fetched:", topCountries)
        )
      );
  }
  renderCountryRow(area, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{area["state"]}</td>
        <td>{area["activeCases"]}</td>
        <td>{area["confirmedCases"]}</td>
        <td>{area["recoveredCases"]}</td>
        <td>{area["deaths"]}</td>
      </tr>
    );
  }
  render() {
    return (
      <div className="countrycard">
        <table>
          <thead>
            <th>&nbsp; # &nbsp;</th>
            <th>Country</th>
            <th>Active </th>
            <th>Confirmed </th>
            <th>Recovered</th>
            <th>Deaths</th>
          </thead>
          <tbody>
            {this.state.topCountries.map((row, index) =>
              this.renderCountryRow(row, index)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Standingsgraph;
