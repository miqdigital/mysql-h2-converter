const shell = require('shelljs');
const replace = require('replace-in-file');
var fs = require('fs');

const folder = 'h2-formatted'
const outputFile = `${folder}/formatted.sql`;

/* define sql to h2 conversion rules
*  1. `   ->
*  2. \\0 -> 0
*  3. \\1 -> 1
*  4. \u0000 -> 0
*  5. \u0001 -> 1
*  For schema conversion
*  1. bigint -> numeric
*  2. int sizes to just integer
*  3. all enums to varchars
*  4. remove all default values
*  5. remove character sets
* */
const options = {
    files: outputFile,
    from: [/`/g, /\\0/g, /\\1/g, /\\u0000/g, /\\u0001/g, /bigint/g, /double\(([^(]*)\)/g, /[^ ]*int([0-9]*)/g, /enum(.*)/g, /'DEFAULT [^\\n]*'/g,/CHARACTER SET [^ ]*/g,'/text/g',/UNIQUE KEY "[^"]*"/g],
    to: ['','0','1','0','1','numeric','double','integer','varchar(255)',',','','varchar(65535)','UNIQUE'],
};


async function format() {

    // get name of input file from argumnets' list, return error if file name is not passed
    var inputfile = process.argv[2];
    if( !inputfile ){
        return console.error('Please provide input file as argument');
    }

    // remove output directory if exists and create again
    shell.rm('-rf', folder);
    shell.mkdir(folder);

    // copy input file in output directory
    fs.copyFile( inputfile, outputFile, (err) => {
        if (err) {
            return console.error('Error occurred while parsing input sql file', err);
        }
        console.log('Input sql was parsed successfully');


        //replace in file to convert to h2 compatible format
        replace(options, (error) => {
            if (error) {
                return console.error('Error occurred while converting sql file to h2 compatible format', error);
            }
            console.log('Successfully converted sql file to h2 compatible format. Find formatted file at location : ', outputFile);
        });
    });
}

format();
