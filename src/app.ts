import fs from "fs";

let outputMessage: string = '';
const base: number = 10;
const headerMessage: string = `
===========================================================
            Tabla de multiplicar ${base}
===========================================================\n
`;

for (let index = 1; index < 10 ; index++) {
    outputMessage += `${base} x ${index} = ${base * index}\n`;
}
outputMessage = headerMessage + outputMessage;
console.log(outputMessage);
const outPath: string = 'outputs'
fs.mkdirSync(outPath, {recursive: true})
fs.writeFileSync(`${outPath}/tabla-${base}.txt`, outputMessage);
console.log('File created!');
