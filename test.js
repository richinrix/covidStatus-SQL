const mysql = require("mysql2");

//sql connxn
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "covid_data",
};
data = [
  "Uttar Pradesh",
  "5,79,982",
  "16,159",
  "5,55,544",
  "8,279",
  "2.3Cr",
  "Bihar",
  "2,49,976",
  "5,347",
  "2,43,255",
  "1,373",
  "1.8Cr",
  "Tamil Nadu",
  "8,12,142",
  "9,129",
  "7,90,965",
  "12,048",
  "1.4Cr",
  "Karnataka",
  "9,14,488",
  "13,508",
  "8,88,917",
  "12,044",
  "1.4Cr",
  "Maharashtra",
  "19,13,382",
  "56,823",
  "18,06,298",
  "49,129",
  "1.2Cr",
  "Andhra Pradesh",
  "8,80,430",
  "3,861",
  "8,69,478",
  "7,091",
  "1.2Cr",
  "Gujarat",
  "2,40,105",
  "10,531",
  "2,25,306",
  "4,268",
  "93.3L",
  "Delhi",
  "6,21,439",
  "7,267",
  "6,03,758",
  "10,414",
  "82.1L",
  "Kerala",
  "7,32,085",
  "64,032",
  "6,64,951",
  "2,931",
  "76.1L",
  "West Bengal",
  "5,44,755",
  "14,749",
  "5,20,470",
  "9,536",
  "69L",
  "Odisha",
  "3,27,867",
  "2,583",
  "3,23,378",
  "1,906",
  "68L",
  "Telangana",
  "2,84,074",
  "6,839",
  "2,75,708",
  "1,527",
  "66.6L",
  "Assam",
  "2,15,836",
  "3,422",
  "2,11,378",
  "1,033",
  "58.7L",
  "Rajasthan",
  "3,03,732",
  "11,700",
  "2,89,375",
  "2,657",
  "51.3L",
  "Jharkhand",
  "1,13,954",
  "1,587",
  "1,11,351",
  "1,016",
  "47.1L",
  "Madhya Pradesh",
  "2,36,400",
  "10,461",
  "2,22,403",
  "3,536",
  "44.8L",
  "Haryana",
  "2,60,153",
  "4,750",
  "2,52,545",
  "2,858",
  "43.9L",
  "Punjab",
  "1,64,821",
  "4,707",
  "1,54,845",
  "5,269",
  "37.9L",
  "Jammu and Kashmir",
  "1,19,628",
  "3,414",
  "1,14,353",
  "1,861",
  "36.7L",
  "Chhattisgarh",
  "2,73,279",
  "14,759",
  "2,55,257",
  "3,263",
  "33.6L",
  "Uttarakhand",
  "88,844",
  "5,510",
  "80,738",
  "1,463",
  "17L",
  "Himachal Pradesh",
  "54,058",
  "4,347",
  "48,774",
  "890",
  "7.2L",
  "Tripura",
  "33,222",
  "184",
  "32,634",
  "381",
  "5.7L",
  "Manipur",
  "27,943",
  "1,352",
  "26,247",
  "344",
  "4.7L",
  "Puducherry",
  "37,914",
  "349",
  "36,936",
  "629",
  "4.7L",
  "Goa",
  "50,534",
  "980",
  "48,826",
  "728",
  "3.9L",
  "Arunachal Pradesh",
  "16,678",
  "168",
  "16,454",
  "56",
  "3.8L",
  "Meghalaya",
  "13,369",
  "294",
  "12,940",
  "135",
  "2.9L",
  "Mizoram",
  "4,178",
  "134",
  "4,036",
  "8",
  "1.8L",
  "Chandigarh",
  "19,345",
  "345",
  "18,686",
  "314",
  "1.7L",
  "Andaman and Nicobar Islands",
  "4,912",
  "69",
  "4,781",
  "62",
  "1.7L",
  "Nagaland",
  "11,895",
  "274",
  "11,413",
  "77",
  "1.2L",
  "Ladakh",
  "9,355",
  "210",
  "9,019",
  "126",
  "1L",
  "Sikkim",
  "5,685",
  "418",
  "5,048",
  "125",
  "67.6K",
  "Dadra and Nagar Haveli and Daman and Diu",
  "3,358",
  "12",
  "3,315",
  "2",
  "-",
];

var con = mysql.createConnection(config);
// con.connect((err) => {
//   if (err) throw err;
//   console.log("connected");
//   console.log("------------------printing-------------------");
//   let i = 0;
//   for (i; i < 6 * 35; i += 6) {
//     // sql = `update raw_info set active_cases="${parseInt(
//     //   data[i + 2]
//     // )}",confirmed_cases="${parseInt(data[i + 1])}",recovered_cases="${parseInt(
//     //   data[i + 3]
//     // )}",deaths="${parseInt(data[i + 4])}",total_cases="${
//     //   data[i + 5]
//     // }" where state="${data[i]}" `;
//     // console.log(sql);
//     // con.query(sql, (err) => {
//     //   if (err) throw err;
//     //   console.log("inserted", sql);
//     // });
//     sql = `update raw_info set active_cases=${parseInt(
//       data[i + 2].replace(/,/g, ""),
//       10
//     )},confirmed_cases=${parseInt(
//       data[i + 1].replace(/,/g, ""),
//       10
//     )},recovered_cases=${parseInt(
//       data[i + 3].replace(/,/g, ""),
//       10
//     )},deaths=${parseInt(data[i + 4].replace(/,/g, ""), 10)},total_cases="${
//       data[i + 5]
//     }" where state="${data[i]}"; `;
//     // console.log(sql);
//     // con.query(sql, (err) => {
//     //   if (err) throw err;
//     //   console.log("inserted", sql);
//     // });
//   }
// });

// function commaSeparateNumber(val) {
//   while (/(\d+)(\d{3})/.test(val.toString())) {
//     val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
//   }
//   return val;
// }
// console.log(commaSeparateNumber(165555));
// let world = [
//   ["USA", "20,906,094", "8,184,446", "358,704", "12,362,944"],
//   ["India", "10,329,971", "249,346", "149,538", "9,931,087"],
//   ["Brazil", "7,716,405", "751,243", "195,742", "6,769,420"],
//   ["Russia", "3,236,787", "	559,399", "58,506", "2,618,882"],
//   ["France", "2,643,239", "2,383,144", "64,921", "195,174"],
//   ["UK", "2,599,789", "0", "74,570", "0", "1,847"],
//   ["Turkey", "2,232,035", "84,308", "21,295", "2,126,432"],
//   ["Italy", "2,141,201", "577,062", "74,985", "1,489,154"],
//   ["Spain", "1,936,718", "0", "50,83,7", "0", "2,018"],
//   ["Germany", "1,775,935", "359,131", "34,904", "1,381,900"],
// ];
// let worldData = [];
// for (let i = 0; i < world.length; i++) {
//   worldData[i] = {};
//   worldData[i]["state"] = world[i][0];
//   worldData[i]["confirmed"] = world[i][1];
//   worldData[i]["active"] = world[i][2];
//   worldData[i]["deaths"] = world[i][3];
//   worldData[i]["recovered"] = world[i][4];
// }
function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
  }
  return val;
}
// let newStrain = [
//   ["United Kingdom", "December 14"],
//   ["South Africa", "December 18"],
//   ["Australia", "December 21"],
//   ["Netherlands", " December 22"],
//   ["Denmark", "December 23"],
//   ["Ireland", "December 23"],
//   ["Israel", "December 23"],
//   ["Italy", "December 23"],
//   ["Germany", "December 24"],
//   ["Iceland", "December 24"],
//   ["Nigeria", "December 24"],
//   ["Singapore", " December 24"],
//   ["France", "December 25"],
//   ["Japan", "December 25"],
//   ["Lebanon", "December 25"],
//   ["Canada", "December 26"],
//   ["Spain", "December 26"],
//   ["Sweden", "December 26"],
//   ["Jordan", "December 27"],
//   ["Portugal", "December 27"],
//   ["Finland", "December 28"],
//   ["Norway", "December 28"],
//   ["South Korea", " December 28"],
//   ["Chile", "December 29"],
//   ["India", "December 29"],
//   ["Pakistan", "December 29"],
//   ["Switzerland", "December 29"],
//   ["United Arab Emirates", "December 30"],
//   ["United States", "December 30"],
//   ["Malaysia", "December 31"],
//   ["China", "December 31"],
// ];

con.connect((err) => {
  if (err) throw err;
  console.log("connected");
  for (let i = 0; i < newStrain.length; i++) {
    // let sql = `insert into worldinfo (state,confirmed_cases,active_cases,deaths,recovered_cases)
    //     values ('${worldData[i]["state"]}','${worldData[i]["confirmed"]}','${worldData[i]["active"]}'
    //     ,'${worldData[i]["deaths"]}','${worldData[i]["recovered"]}');`;
    let sql = `insert into newstrain (country,date_detected) values ('${newStrain[i][0]}','${newStrain[i][1]}');`;
    console.log(sql);
    // con.query(sql,(err)=>{
    //   if(err) throw err
    // })
  }
});

// console.log(world);
// console.log(worldData);
