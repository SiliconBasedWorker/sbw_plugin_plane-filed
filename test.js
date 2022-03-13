const { SiteItem, SubItem, DataController } = require("./index");

const path = require("path");

let dataController = new DataController(path.join(__dirname, "data"));


// dataController.data.push(new SiteItem("a", "b", [new SubItem("x", "y")]))
// dataController.saveToFile();

const addSiteItem = (siteName, siteUrl, subList) => {
    dataController.data.push(new SiteItem(siteName, siteUrl, subList));
}

const createSubItem = (subName, subUrl) => {
    return new SubItem(subName, subUrl);
}

const getJson = () => {
    console.log(dataController.data);
    console.log(JSON.stringify(dataController.data));
}