//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import {entry, File, Dir} from "justo-fs";

/**
 * Task operation.
 */
export default function op(params) {
  var cmd, args = [], files;

  //(1) arguments
  if (params.length >= 1) params = Object.assign({}, params[0]);

  if (!params.files) params.files = [];
  if (typeof(params.src) == "string") params.files.push({src: params.src, format: params.format, dst: params.dst});

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "soffice.exe";
  else cmd = "soffice";

  if (params.path) cmd = path.join(params.path, cmd);

  //(3) run
  files = [];

  for (let file of params.files) {
    if (typeof(file.src) == "string") file.src = [file.src];

    for (let item of file.src) {
      item = entry(item);

      if (item instanceof Dir) addDirToFiles(item.path, file.dst, file.format);
      else if (item instanceof File) addFileToFiles(item.path, file.dst, file.format);
    }
  }

  //(4) return
  return convert(files);

  //helper
  function addFileToFiles(src, dst, format) {
    if (dst.endsWith("/")) dst = path.join(dst, path.dirname(src));
    files.push({src, dst, format});
  }

  function addDirToFiles(dir, dst, format) {
    dir = new Dir(dir);

    for (let entry of dir.entries) {
      if (entry instanceof File && entry.ext == ".odt") addFileToFiles(entry.path, dst, format);
      else if (entry instanceof Dir) addDirToFiles(entry.path, dst, format);
    }
  }

  function convert(files) {
    var res;
    for (let file of files) {
      let aa = args.concat([]);
      aa.push("--headless");
      aa.push("--convert-to");
      aa.push(file.format || "pdf");
      aa.push(file.src);
      aa.push("--outdir");
      aa.push(file.dst);

      res = child_process.spawnSync(cmd, aa);
    }

    return res.status;
  }
}
