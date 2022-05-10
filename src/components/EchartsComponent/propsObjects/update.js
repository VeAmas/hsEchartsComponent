const fs = require('fs');

const indexCode = String(fs.readFileSync('./index.js'));

const main = {};
const evalCode = indexCode.replace(/export const /g, 'main.');

// eslint-disable-next-line no-eval
eval(evalCode);

const typeFile =
  `import { PropOptions } from 'vue';

` +
  Object.keys(main).map(v => {
    return (
      `export type ${v.replace(/^\w/, char => char.toUpperCase())} = {
  [key in
    | ` +
      Object.keys(main[v]).map(x => `'${x}'`).join(`
    | `) +
      `]: PropOptions<any>;
};`
    );
  }).join(`

`) +
  '\n';

fs.writeFileSync('./type.d.ts', typeFile);
