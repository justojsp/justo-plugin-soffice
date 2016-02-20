"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], files;


  if (params.length >= 1) params = Object.assign({}, params[0]);

  if (!params.files) params.files = [];
  if (typeof params.src == "string") params.files.push({ src: params.src, format: params.format, dst: params.dst });


  if (/^win/.test(_os2.default.platform())) cmd = "soffice.exe";else 
  cmd = "soffice";

  if (params.path) cmd = _path2.default.join(params.path, cmd);


  files = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = params.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var file = _step.value;
      if (typeof file.src == "string") file.src = [file.src];var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {

        for (var _iterator4 = file.src[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var item = _step4.value;
          item = (0, _justoFs.entry)(item);

          if (item instanceof _justoFs.Dir) addDirToFiles(item.path, file.dst, file.format);else 
          if (item instanceof _justoFs.File) addFileToFiles(item.path, file.dst, file.format);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




  return convert(files);


  function addFileToFiles(src, dst, format) {
    if (dst.endsWith("/")) dst = _path2.default.join(dst, _path2.default.dirname(src));
    files.push({ src: src, dst: dst, format: format });}


  function addDirToFiles(dir, dst, format) {
    dir = new _justoFs.Dir(dir);var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

      for (var _iterator2 = dir.entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var _entry = _step2.value;
        if (_entry instanceof _justoFs.File && _entry.ext == ".odt") addFileToFiles(_entry.path, dst, format);else 
        if (_entry instanceof _justoFs.Dir) addDirToFiles(_entry.path, dst, format);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}



  function convert(files) {
    var res;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var file = _step3.value;
        var aa = args.concat([]);
        aa.push("--headless");
        aa.push("--convert-to");
        aa.push(file.format || "pdf");
        aa.push(file.src);
        aa.push("--outdir");
        aa.push(file.dst);

        res = _child_process2.default.spawnSync(cmd, aa);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}


    return res.status;}}