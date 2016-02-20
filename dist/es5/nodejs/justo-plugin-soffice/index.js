"use strict";var _justo = require("justo");



var NS = "org.justojs.plugin.soffice";
var convert;


module.exports = { 
  get convert() {
    if (!convert) convert = (0, _justo.simple)({ ns: NS, name: "convert" }, require("./lib/convert").default);
    return convert;} };