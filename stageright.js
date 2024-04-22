const fs = require('fs');
const readline = require('readline');

// Variables
var stack = [];
var program;


// Define constants for commands
const LINE = "LINE";
const DELIVER = "DELIVER";
const CAST = "CAST";
const CUT = "CUT";
const ENCORE = "ENCORE";
const DUET = "DUET";
const SOLO = "SOLO";
const CHORUS = "CHORUS";
const TAKE = "TAKE";
const UNDERSTUDY = "UNDERSTUDY";
const DIVA = "DIVA";

// Functions
function readFile(filename) {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error(`Error reading file from disk: ${err}`);
        } else {
            // Regular expression so it works on Windows and Linux/mac
            program = data.split(/\r?\n/);
            await processProgram();
        }
    });
}

async function processProgram() {
    // Block-scope variables for arithmetic
    let value1;
    let value2;
    let result;
    let temp;

    // Create readline for reading/writing
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Iterate over each line in the program
    for (let index = 0; index < program.length; index++) {
        // Ignore comments (begin with //)
        if (/^\/\//.test(program[index])) {
            continue;
        }

        //console.log("For loop iteration ", index, " stack: ", stack);

        const tokens = program[index].split(" ");
        switch (tokens[0]) {
            case LINE:
                const input = await new Promise(resolve => {
                    rl.question('', resolve);
                });
                if (/^##/.test(input)) {
                    const num = input.replace(/^##/, '');
                    stack.push(num);
                } else {
                    for (const char of input) {
                        stack.push(char);
                    }
                }
                // console.log("LINE called, stack: ", stack);
                break;
            case DELIVER:
                await new Promise(resolve => {
                    rl.write('' + stack.pop());
                    resolve();
                });
                break;
            case CAST:
                if (tokens[1] != '')
                    stack.push(tokens[1]);
                else
                    stack.push(' ');
                break;
            case CUT:
                stack.pop();
                //console.log("CUT called, stack: ", stack);
                break;
            case ENCORE:
                temp = stack.pop();
                stack.push(temp);
                stack.push(temp);
                break;
            case DUET:
                value2 = parseInt(stack.pop());
                value1 = parseInt(stack.pop());

                result = value1 + value2;
                stack.push(result);
                //console.log("DUET called, stack: ", stack);
                break;
            case SOLO:
                value2 = parseInt(stack.pop());
                value1 = parseInt(stack.pop());

                result = value1 - value2;
                stack.push(result);
                //console.log("SOLO called, stack: ", stack);
                break;
            case CHORUS:
                value2 = parseInt(stack.pop());
                value1 = parseInt(stack.pop());

                result = value1 * value2;
                stack.push(result);
                //console.log("CHORUS called, stack: ", stack);
                break;
            case TAKE:
                // Get top of stack
                temp = stack.pop();
                if (!(temp === 0 || temp === '0') && tokens[1] <= program.length) {
                    // reset index to second token
                    index = tokens[1] - 2;
                }
                break;
            case UNDERSTUDY:
                if (stack.length <= 0) {
                    break;
                }
                temp = stack[0];
                for (let i = 0; i < (stack.length - 1); i++) {
                    stack[i] = stack[i + 1];
                }
                stack[stack.length - 1] = temp;
                //console.log("UNDERSTUDY called, stack: ", stack);
                break;
            case DIVA:
                if (stack.length <= 0) {
                    break;
                }
                temp = stack[stack.length - 1];
                for (let i = (stack.length - 1); i > 0; i--) {
                    stack[i] = stack[i - 1];
                }
                stack[0] = temp;
                //console.log("DIVA called, stack: ", stack);
                break;
            default:
                break;
        }
    }

    // close the readline interface
    rl.close();
}

async function processLine() {

}

// BEGIN PROGRAM

// Check if a filename was provided as an argument
if (process.argv.length < 3) {
    console.error('Please provide a filename as an argument.');
    process.exit(1);
}


// Get filename + readfile
const filename = process.argv[2] + ".txt";
readFile(filename);


