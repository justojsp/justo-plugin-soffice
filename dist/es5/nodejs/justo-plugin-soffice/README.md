Tasks for *Apache OpenOffice*.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-soffice
```

## Use

```
const soffice = require("justo-plugin-soffice");
```

## convert task

Convert `.odt` files to another format.

The task must be called as follows:

```
soffice(opts, config : object)
```

Configuration object:

- `path` (string). The directory where the `soffice` file is.
- `src` (string or string[]). Files to convert.
- `format` (string). The format to convert: `text` or `pdf`. Default: `pdf`.
- `dst` (string). Output directory. The files are generated with the same name but different extension.
- `files` (object[]). Files to convert:
  - `src` (string or string[]).
  - `format` (string).
  - `dst` (string).

Example:

```
const convert = require("justo-plugin-soffice").convert;

//ch01/lecture.odt -> dist/ch01/lecture.pdf
convert("Convert to PDF.", {
  path: "C:\\Program Files (x86)\\LibreOffice 5\\program",
  format: "pdf",
  src: "ch01/lecture.odt",
  dst: "dist/"
});

//ch01/*.odt -> dist/ch01/*.pdf
convert("Convert to PDF.", {
  path: "C:\\Program Files (x86)\\LibreOffice 5\\program",
  format: "pdf",
  src: "ch01/",
  dst: "dist/"
});
```
