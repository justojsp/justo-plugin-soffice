//imports
import {simple} from "justo";

//private
const NS = "org.justojs.plugin.soffice";
var convert;

//api
module.exports = {
  get convert() {
    if (!convert) convert = simple({ns: NS, name: "convert"}, require("./lib/convert").default);
    return convert;
  }
};
