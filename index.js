const path = require("path");
const fs = require("fs");
const fs_extra = require("fs-extra");

let dataFilePath = "";

const setDataFileDirPath = (dirPath) => {
    dataFilePath = path.join(dirPath, "sub.json")
    fs_extra.ensureFileSync(dataFilePath);

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
        console.log(dataFilePath, "is not exist or is blank");
    }
}


const dataItem = (
    siteUrl = "",
    sub = {}
) => {
    return { siteUrl, sub }
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

const initModule = (dataFileDirPath) => {
    setDataFileDirPath(dataFileDirPath);
    loadFromFile();
}

module.exports = {
    initModule, // setDataFilePath and load data from file
    saveToFile, // save json to file
    dataItem, // create one new data
    setData, // add or modify dataItem in memory
    getData, // get data by name or blank object
    deleteData, // delete data by name
    getDataAllData // get all data list by name
}