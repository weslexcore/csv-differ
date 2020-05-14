const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const stringify = require("csv-stringify/lib/sync");

const [_prc, _trg, fn1, fn2, output = "./output.csv"] = process.argv;

const f1 = fs.readFileSync(fn1);
const f2 = fs.readFileSync(fn2);

const csv1 = parse(f1, { columns: true });
const csv2 = parse(f2, { columns: true });

const diff = [];
csv1.forEach((row) => {
  if (!csv2.includes(row)) {
    diff.push({ ...row, msg: `in ${fn1}` });
  }
});

csv2.forEach((row) => {
  if (!csv1.includes(row)) {
    diff.push({ ...row, msg: `in ${fn2}` });
  }
});

fs.writeFileSync(output, stringify(diff));
