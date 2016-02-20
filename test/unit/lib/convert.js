//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const op = require("../../../dist/es5/nodejs/justo-plugin-soffice/lib/convert").default;

//suite
suite("#convert()", function() {
  const DATA = "test/unit/data";
  var DST_DIR, DST;

  init("*", function() {
    DST_DIR = Dir.createTmpDir();
    DST = DST_DIR.path;
  });

  fin("*", function() {
    DST_DIR.remove();
  });

  test("convert(config) - src is dir", function() {
    op([{
      path: "C:\\Program Files (x86)\\LibreOffice 5\\program",
      format: "pdf",
      src: path.join(DATA),
      dst: DST + "/"
    }]).must.be.eq(0);

    file(DST, "test/unit/data/doc1.pdf").must.exist();
    file(DST, "test/unit/data/doc2.pdf").must.exist();
  });

  test("convert(config) - src is file", function() {
    op([{
      path: "C:\\Program Files (x86)\\LibreOffice 5\\program",
      format: "pdf",
      src: path.join(DATA, "doc1.odt"),
      dst: DST + "/"
    }]).must.be.eq(0);

    file(DST, "test/unit/data/doc1.pdf").must.exist();
  });
})();
