const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const generate = require("csv-stringify/lib/sync");

const [_prc, _trg, fn1, fn2] = process.argv;

const f1 = fs.readFileSync(fn1);
const f2 = fs.readFileSync(fn2);

const csv1 = parse(f1, { columns: true }).map((i) => i.email);
const csv2 = parse(f2, { columns: true }).map((i) => i.email);

const diff = [];
csv1.forEach((email) => {
  if (!csv2.includes(email)) {
    diff.push({ email, msg: `in ${fn1}` });
  }
});

csv2.forEach((email) => {
  if (!csv1.includes(email)) {
    diff.push({ email, msg: `in ${fn2}` });
  }
});

fs.writeFileSync("./output.csv", generate(diff));
