const app = require("./index");

const path = require("path");

app.initModule(path.join(__dirname, "data"));

app.setData("v2tun", app.dataItem());
// app.setData("v2tun1", app.dataItem());
// app.setData("v2tun2", app.dataItem());


app.saveToFile()

let a = app.getDataAllData()
console.log(a);