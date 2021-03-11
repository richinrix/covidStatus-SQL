const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;
//sql connxn
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "covid_data",
};
var con = mysql.createConnection(config);
con.connect((err) => {
  if (err) throw err;
  console.log("connected");
});
//---sql data saving
//data from sql
let data = [];
let dataActive = [];
let dataActiveDesc = [];
let dataConfirmed = [];
let dataConfirmedDesc = [];
let dataRecovered = [];
let dataRecoveredDesc = [];
let dataDeaths = [];
let dataDeathsDesc = [];
let topActive = [];
let topConfirmed = [];
let topRecovered = [];
let topDeaths = [];
let topCountries = [];
let newsletterData = [];
let subscriptions = [];
let newStrainData = [];
let loggedInUser = [];
//taking sql data and saving
const savingData = () => {
  con.query("select * from raw_info ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 33; j++) {
      data[j] = {};
      data[j]["state"] = this.tableData[j].state;
      data[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      data[j]["activeCases"] = this.tableData[j].active_cases;
      data[j]["deaths"] = this.tableData[j].deaths;
      data[j]["recoveredCases"] = this.tableData[j].recovered_cases;
      data[j]["total"] = this.tableData[j].total_cases;

      let ratio = (
        this.tableData[j].deaths / this.tableData[j].confirmed_cases
      ).toPrecision(2);
      data[j]["deathPerc"] = (ratio * 100).toPrecision(2);
      // parseInt(this.tableData[j].deaths) /
      // parseInt(this.tableData[j].confirmedCases);
      // console.log(ratio.toPrecision(3));
      con.query(
        `call categorizing('${this.tableData[j].state}',${ratio * 100})`,
        (err, res) => {
          if (err) throw err;
        }
      );
    }
  });

  // newstrain of virus data
  con.query("select * from newstrain ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j < result.length; j++) {
      newStrainData[j] = {};
      newStrainData[j]["country"] = this.tableData[j].country;
      newStrainData[j]["dateDetected"] = this.tableData[j].date_detected;
      // newStrainData[j][this.tableData[j].country] = this.tableData[j].date_detected;
    }
  });
  // news letter user info
  con.query("select * from newsletter ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j < result.length; j++) {
      newsletterData[j] = {};
      // newsletterData[j]["emailid"] = this.tableData[j].emailid;
      // newsletterData[j]["username"] = this.tableData[j].username;
      newsletterData[j][this.tableData[j].emailid] = this.tableData[j].username;
    }
  });
  // subscription user data
  con.query("select * from subscriptions ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j < result.length; j++) {
      subscriptions[j] = {};
      subscriptions[j]["emailid"] = this.tableData[j].emailid;
      subscriptions[j]["username"] = this.tableData[j].username;
    }
  });
  //sorting by active cases
  con.query("select * from raw_info order by active_cases", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 33; j++) {
      dataActive[j] = {};
      dataActive[j]["state"] = this.tableData[j].state;
      dataActive[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      dataActive[j]["activeCases"] = this.tableData[j].active_cases;
      dataActive[j]["deaths"] = this.tableData[j].deaths;
      dataActive[j]["recoveredCases"] = this.tableData[j].recovered_cases;
      dataActive[j]["total"] = this.tableData[j].total_cases;
      let ratio = this.tableData[j].category;
      dataActive[j]["deathPerc"] = (ratio * 1).toPrecision(2);
    }
  });
  //active descending
  con.query(
    "select * from raw_info order by active_cases desc",
    (err, result) => {
      if (err) throw err;
      this.tableData = result;
      for (let j = 0; j <= 33; j++) {
        dataActiveDesc[j] = {};
        dataActiveDesc[j]["state"] = this.tableData[j].state;
        dataActiveDesc[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
        dataActiveDesc[j]["activeCases"] = this.tableData[j].active_cases;
        dataActiveDesc[j]["deaths"] = this.tableData[j].deaths;
        dataActiveDesc[j]["recoveredCases"] = this.tableData[j].recovered_cases;
        dataActiveDesc[j]["total"] = this.tableData[j].total_cases;

        let ratio = this.tableData[j].category;
        dataActiveDesc[j]["deathPerc"] = (ratio * 1).toPrecision(2);
      }
    }
  );
  //confirmed cases
  con.query(
    "select * from raw_info order by confirmed_cases",
    (err, result) => {
      if (err) throw err;
      this.tableData = result;
      for (let j = 0; j <= 33; j++) {
        dataConfirmed[j] = {};
        dataConfirmed[j]["state"] = this.tableData[j].state;
        dataConfirmed[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
        dataConfirmed[j]["activeCases"] = this.tableData[j].active_cases;
        dataConfirmed[j]["deaths"] = this.tableData[j].deaths;
        dataConfirmed[j]["recoveredCases"] = this.tableData[j].recovered_cases;
        dataConfirmed[j]["total"] = this.tableData[j].total_cases;

        let ratio = this.tableData[j].category;
        dataConfirmed[j]["deathPerc"] = (ratio * 1).toPrecision(2);
      }
    }
  );
  //confirmed descending
  con.query(
    "select * from raw_info order by confirmed_cases desc",
    (err, result) => {
      if (err) throw err;
      this.tableData = result;
      for (let j = 0; j <= 33; j++) {
        dataConfirmedDesc[j] = {};
        dataConfirmedDesc[j]["state"] = this.tableData[j].state;
        dataConfirmedDesc[j]["confirmedCases"] = this.tableData[
          j
        ].confirmed_cases;
        dataConfirmedDesc[j]["activeCases"] = this.tableData[j].active_cases;
        dataConfirmedDesc[j]["deaths"] = this.tableData[j].deaths;
        dataConfirmedDesc[j]["recoveredCases"] = this.tableData[
          j
        ].recovered_cases;
        dataConfirmedDesc[j]["total"] = this.tableData[j].total_cases;

        let ratio = this.tableData[j].category;
        dataConfirmedDesc[j]["deathPerc"] = (ratio * 1).toPrecision(2);
      }
    }
  );
  //recovered cases
  con.query(
    "select * from raw_info order by recovered_cases",
    (err, result) => {
      if (err) throw err;
      this.tableData = result;
      for (let j = 0; j <= 33; j++) {
        dataRecovered[j] = {};
        dataRecovered[j]["state"] = this.tableData[j].state;
        dataRecovered[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
        dataRecovered[j]["activeCases"] = this.tableData[j].active_cases;
        dataRecovered[j]["deaths"] = this.tableData[j].deaths;
        dataRecovered[j]["recoveredCases"] = this.tableData[j].recovered_cases;
        dataRecovered[j]["total"] = this.tableData[j].total_cases;

        let ratio = this.tableData[j].category;
        dataRecovered[j]["deathPerc"] = (ratio * 1).toPrecision(2);
      }
    }
  );
  //recovered descending
  con.query(
    "select * from raw_info order by recovered_cases desc",
    (err, result) => {
      if (err) throw err;
      this.tableData = result;
      for (let j = 0; j <= 33; j++) {
        dataRecoveredDesc[j] = {};
        dataRecoveredDesc[j]["state"] = this.tableData[j].state;
        dataRecoveredDesc[j]["confirmedCases"] = this.tableData[
          j
        ].confirmed_cases;
        dataRecoveredDesc[j]["activeCases"] = this.tableData[j].active_cases;
        dataRecoveredDesc[j]["deaths"] = this.tableData[j].deaths;
        dataRecoveredDesc[j]["recoveredCases"] = this.tableData[
          j
        ].recovered_cases;
        dataRecoveredDesc[j]["total"] = this.tableData[j].total_cases;

        let ratio = this.tableData[j].category;
        dataRecoveredDesc[j]["deathPerc"] = (ratio * 1).toPrecision(2);
      }
    }
  );
  //deaths
  con.query("select * from raw_info order by deaths", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 33; j++) {
      dataDeaths[j] = {};
      dataDeaths[j]["state"] = this.tableData[j].state;
      dataDeaths[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      dataDeaths[j]["activeCases"] = this.tableData[j].active_cases;
      dataDeaths[j]["deaths"] = this.tableData[j].deaths;
      dataDeaths[j]["recoveredCases"] = this.tableData[j].recovered_cases;
      dataDeaths[j]["total"] = this.tableData[j].total_cases;

      let ratio = this.tableData[j].category;
      dataDeaths[j]["deathPerc"] = (ratio * 1).toPrecision(2);
    }
  });
  //deaths descending
  con.query("select * from raw_info order by deaths desc", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 33; j++) {
      dataDeathsDesc[j] = {};
      dataDeathsDesc[j]["state"] = this.tableData[j].state;
      dataDeathsDesc[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      dataDeathsDesc[j]["activeCases"] = this.tableData[j].active_cases;
      dataDeathsDesc[j]["deaths"] = this.tableData[j].deaths;
      dataDeathsDesc[j]["recoveredCases"] = this.tableData[j].recovered_cases;
      dataDeathsDesc[j]["total"] = this.tableData[j].total_cases;

      let ratio = this.tableData[j].category;
      dataDeathsDesc[j]["deathPerc"] = (ratio * 1).toPrecision(2);
    }
  });
  // -------standings------------
  //top 10 active cases
  con.query("select * from topactive", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 9; j++) {
      topActive[j] = {};
      topActive[j]["state"] = this.tableData[j].state;
      topActive[j]["activeCases"] = this.tableData[j].active_cases;
    }
  });
  //deaths
  con.query("select * from topdeaths", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 9; j++) {
      topDeaths[j] = {};
      topDeaths[j]["state"] = this.tableData[j].state;
      topDeaths[j]["deaths"] = this.tableData[j].deaths;
    }
  });
  //confirmed
  con.query("select * from topconfirmed", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 9; j++) {
      topConfirmed[j] = {};
      topConfirmed[j]["state"] = this.tableData[j].state;
      topConfirmed[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      topConfirmed[j]["tests"] = this.tableData[j].total_cases;
    }
  });
  //recovered
  con.query("select * from toprecovered", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 9; j++) {
      topRecovered[j] = {};
      topRecovered[j]["state"] = this.tableData[j].state;
      topRecovered[j]["recoveredCases"] = this.tableData[j].recovered_cases;
    }
  });
  //country
  con.query("select * from worldinfo", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j <= 9; j++) {
      topCountries[j] = {};
      topCountries[j]["state"] = this.tableData[j].state;
      topCountries[j]["activeCases"] = this.tableData[j].active_cases;
      topCountries[j]["recoveredCases"] = this.tableData[j].recovered_cases;
      topCountries[j]["confirmedCases"] = this.tableData[j].confirmed_cases;
      topCountries[j]["deaths"] = this.tableData[j].deaths;
    }
  });
};
savingData();

// newstrain data
app.get("/express/newstrain", (req, res) => {
  console.log("fetching data from newstrain");
  res.json(newStrainData);
});
// subscsription info
app.get("/express/subinfo", (req, res) => {
  console.log("fetching data from subscriptions");
  res.json(subscriptions);
});
// userinfo
app.get("/express/userdata", (req, res) => {
  console.log("fetching data from userinfo");
  res.json(newsletterData);
});
//statewise
app.get("/express/db", (req, res) => {
  console.log("fetching data from db");
  res.json(data);
});
// active cases sorting
app.get("/express/active", (req, res) => {
  console.log("fetching data from db sorted by active cases");
  res.json(dataActive);
});
app.get("/express/activedesc", (req, res) => {
  console.log("fetching data from db sorted by active cases in descending");
  res.json(dataActiveDesc);
});
// confirmed cases sorting
app.get("/express/confirmed", (req, res) => {
  console.log("fetching data from db sorted by confirmed cases");
  res.json(dataConfirmed);
});
app.get("/express/confirmeddesc", (req, res) => {
  console.log("fetching data from db sorted by confirmed cases");
  res.json(dataConfirmedDesc);
});
// recovered cases sorting
app.get("/express/recovered", (req, res) => {
  console.log("fetching data from db sorted by recovered cases");
  res.json(dataRecovered);
});
app.get("/express/recovereddesc", (req, res) => {
  console.log("fetching data from db sorted by recovered cases");
  res.json(dataRecoveredDesc);
});
// deaths sorting
app.get("/express/deaths", (req, res) => {
  console.log("fetching data from db sorted by deaths");
  res.json(dataDeaths);
});
app.get("/express/deathsdesc", (req, res) => {
  console.log("fetching data from db sorted by deaths");
  res.json(dataDeathsDesc);
});
//top 10
// active
app.get("/express/topactive", (req, res) => {
  console.log("fetching data from db top 10 active");
  res.json(topActive);
});
// deaths
app.get("/express/topdeaths", (req, res) => {
  console.log("fetching data from db top 10 deaths");
  res.json(topDeaths);
});
// confirmed
app.get("/express/topconfirmed", (req, res) => {
  console.log("fetching data from db top 10 confirmed");
  res.json(topConfirmed);
});
// recovered
app.get("/express/toprecovered", (req, res) => {
  console.log("fetching data from db top 10 recovered");
  res.json(topRecovered);
});
// country wise
app.get("/express/topcountries", (req, res) => {
  console.log("fetching data from db top 10 countries");
  res.json(topCountries);
});
// logging in user
app.get("/express/loggingin", (req, res) => {
  sql = `select exists(select * from subscriptions where username=${req.query.username} and emailid=${req.query.email} )`;
  console.log(sql);
  con.query(sql, (err, res) => {
    if (err) console.log(err);
    else {
      let subbed = 0;
      subbed =
        res[0][
          `exists(select * from subscriptions where username=${req.query.username} and emailid=${req.query.email} )`
        ];
      loggedInSql = `UPDATE loggedinuser  set username=${req.query.username},email=${req.query.email},subscribed=${subbed} `;
      console.log(loggedInSql);
      con.query(loggedInSql, (err, res) => {
        if (err) throw err;
        console.log("user logged in info updated");

        // loggedin userdata
      });
      // current logged in user info in newsletter
      con.query("select * from loggedinuser ", (err, result) => {
        if (err) throw err;
        this.tableData = result;

        loggedInUser = {};
        loggedInUser["username"] = this.tableData[0].username;
        loggedInUser["email"] = this.tableData[0].email;
        loggedInUser["subscribed"] = this.tableData[0].subscribed;
        app.get("/express/loggedinuser", (req, res) => {
          console.log("fetching data from logged in user", loggedInUser);
          res.json(loggedInUser);
        });
      });
    }
  });

  // res.json(loggedInUser);
});
// reading data
app.get("/express/datareading", (req, res) => {
  let email = req.query.email;
  let username = req.query.username;
  console.log(req.query.username);
  // sql inserting into newsletter
  sql = `insert into newsletter(emailid,username) values(${email},${username})`;
  con.query(sql, (err, res) => {
    if (err) throw err;
    console.log("new user added");
  });
  sql = `select * from newsletter where username=${req.query.username} and emailid=${req.query.email} `;

  // logged in username
  app.get("/express/loggedin_username", (req, res) => {
    usernamedata = [];
    usernamedata[0] = {};
    usernamedata[0]["name"] = username;
    console.log("fetching uesrnamedata");
    res.json(usernamedata);
  });
  // news letter user info
  con.query("select * from newsletter ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j < result.length; j++) {
      newsletterData[j] = {};
      // newsletterData[j]["emailid"] = this.tableData[j].emailid;
      // newsletterData[j]["username"] = this.tableData[j].username;
      newsletterData[j][this.tableData[j].emailid] = this.tableData[j].username;
    }
  });
  // subscription user data
  con.query("select * from subscriptions ", (err, result) => {
    if (err) throw err;
    this.tableData = result;
    for (let j = 0; j < result.length; j++) {
      subscriptions[j] = {};
      subscriptions[j]["emailid"] = this.tableData[j].emailid;
      subscriptions[j]["username"] = this.tableData[j].username;
    }
  });
});
app.get("/express/unsubscribe", (req) => {
  let username = req.query.username;
  let email = req.query.email;
  sql = `delete from subscriptions where username=${username} and emailid=${email}`;
  con.query(sql, (err, res) => {
    if (err) throw err;
    console.log("user unsubscribed : ", username);
  });
});
app.get("/express/subscribe", (req) => {
  let username = req.query.username;
  let email = req.query.email;
  sql = `insert into subscriptions (emailid,username) values (${email},${username})`;
  con.query(sql, (err, res) => {
    if (err) throw err;
    console.log("user subscribed : ", username);
  });
});

app.listen(port, () => console.log(`server started on port : ${port}`));
