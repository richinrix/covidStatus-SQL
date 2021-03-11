import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
//routes
import Homepage from "./components/homepage/homepage";
import Infocard from "./components/infocards/infocards";
import LoginPage from "./components/login/login";
import AdminPage from "./components/adminpage/adminpage";
import Standings from "./components/standings/standings";
import Newsletter from "./components/newsletter/newsletter";
//images
import coronaimg from "./images/coronavirus.gif";
import homeimg from "./images/homewhite.png";
import adminwhite from "./images/newsl.png";
import standingswhite from "./images/standingswhite.png";

function App() {
  return (
    <Router>
      <main draggable={true}>
        <div className="area">
          <ul className="circles">
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
            <li className="ani"></li>
          </ul>
        </div>
        <div className="App">
          <header>
            <div class="header">
              <h1 class="logo">Covid19 Status</h1>
            </div>

            <nav>
              <ul class="pages">
                <li>
                  <Link to="/" class="homelogo">
                    <img src={homeimg} />
                  </Link>
                </li>
                <li>
                  <Link to="/standings" className="standing">
                    <img src={standingswhite} />
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="adminlogo">
                    <img src={adminwhite} />
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <img className="coronaimg" src={coronaimg} alt="" />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/newsletter" component={News} />
            <Route path="/standings" component={Standing} />
          </Switch>
          <footer></footer>
        </div>
      </main>
    </Router>
  );
}
const Home = () => (
  <Fragment>
    <Infocard />
    <Homepage />
  </Fragment>
);
const Login = () => (
  <Fragment>
    <LoginPage />
  </Fragment>
);
const Admin = () => (
  <Fragment>
    <AdminPage />
  </Fragment>
);
const News = () => (
  <Fragment>
    <Newsletter />
  </Fragment>
);
const Standing = () => (
  <Fragment>
    <Standings />
  </Fragment>
);
export default App;
