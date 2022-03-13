const path = require("path");
const fs = require("fs");
const fs_extra = require("fs-extra");

class SubItem {
    constructor(name, url) {
        this.name = name
        this.url = url
    }
}

class SiteItem {
    constructor(name, siteUrl, subList) {
        this.name = name
        this.siteUrl = siteUrl
        this.sub = subList
        this.expireTimestamp = Date.now()
        this.price = 0.0
        this.note = ""
    }
}

class DataController {
    constructor(dataFileDirPath) {
        this.dataFilePath = path.join(dataFileDirPath, "sub.json")
        fs_extra.ensureFileSync(this.dataFilePath)
        this.data = []
        this.loadFromFile()
    }

    loadFromFile() {
        try {
            let d = JSON.parse(fs.readFileSync(this.dataFilePath));
            this.parseJSONToObject(d);
        } catch (error) {
            console.log(this.dataFilePath, "is not exist or is blank");
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.dataFilePath, JSON.stringify(this.data, null, 4))
        } catch (err) {
            console.error(err)
        }
    }

    parseJSONToObject(jsonArray) {
        try {
            let dd = [];
            jsonArray.forEach(e => {
                let siteItem = new SiteItem(e.name, e.siteUrl, []);
                e.sub.forEach(ee => {
                    let subItem = new SubItem(ee.name, ee.url);
                    siteItem.sub.push(subItem);
                });
                dd.push(siteItem);
            });
            this.data = dd;
        } catch (error) {
            console.log("parseJSONToObject", error);
        }
    }
}

module.exports = {
    DataController,
    SiteItem,
    SubItem
}