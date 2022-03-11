const path = require("path");
const fs = require("fs");

let dataFilePath = "";

const setDataFilePath = (filePath) => {
    dataFilePath = filePath;
}

let data = {};

const saveToFile = () => {

    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4))
    } catch (err) {
        console.error(err)
    }

}

// load from file before normal running 
const loadFromFile = () => {
    try {
        let d = fs.readFileSync(dataFilePath);
        data = JSON.parse(d);
    } catch (error) {
        console.log(error);
    }
}


const dataItem = (
    siteUrl = "",
    sub = {}
) => {
    return {siteUrl,sub}
}

const setData = (name, dataSet) => {
    data[name] = dataSet;
    saveToFile()
}
const getData = (name) => {
    if (data.hasOwnProperty(name)) {
        return data[name];
    } else {
        return dataItem();
    }
}

const deleteData = (name) => {
    try {
        delete data[name];
    } catch (error) {
        console.log("deleteData", name, error);
    }
}

const getDataAllData = () => {
    let d = [];
    for (let k in data) {
        d.push({ name: k, sub: data[k].sub, siteUrl: data[k].siteUrl });
    }
    return d;
}

const initModule = (dataFilePath) => {
    setDataFilePath(dataFilePath);
    loadFromFile();
}

module.exports = {
    initModule, // setDataFilePath and load data from file
    saveToFile, // modify data and save json to file
    dataItem, // create one new data
    setData, // 
    getData,
    deleteData,
    getDataAllData
}