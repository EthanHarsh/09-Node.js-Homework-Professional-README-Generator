// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const inq = require('inquirer');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is the name of your super awesome project?',
        name: 'title',
        suffix: ' - '
    },
    {
        type: 'input',
        message: `How would you describe your project to someone who has never seen it?`,
        name: 'desc',
        suffix: ' - ',
    },
    {
        type: 'input',
        message: `How would you teach someone to install your project? (Seperate steps with comma.  Ex: Step1, Step2)`,
        name: 'install',
        suffix: ' - ',
    },
    {
        type: 'input',
        message: `What steps should someone take to use your super awesome project? (Seperate steps with comma.  Ex: Step1, Step2)`,
        name: 'instruct',
        suffix: ' - ',
    },
    {
        type: 'input',
        message: `How can someone contribute to your project? (Seperate steps with comma.  Ex: Step1, Step2)`,
        name: 'contribute',
        suffix: ' - ',
    },
    {
        type: 'input',
        message: `How might one test this project? (Add steps in an array.  Ex: Step1, Step2)`,
        name: 'test',
        suffix: ' - ',
    },
    {
        type: 'list',
        message: `Do you know how fast you were going? I'm going to need to see your license please 😂`,
        name: 'license',
        suffix: ' - ',
        choices: ['MIT','GNU GPLv3', 'None']
    },
    {
        type: 'input',
        message: `What's your Gihub URL?`,
        name: 'github',
        suffix: ' - ',
    },
    {
        type: 'input',
        message: `mmmmkay. Now what's your email?`,
        name: 'email',
        suffix: ' - ',
    },
    {
        type: 'list',
        message: `Aaaand what's the best way for people to reach you?`,
        name: 'best',
        suffix: ' - ',
        choices: ['GitHub', 'Email']
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fileName = './output/' + fileName;
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log('Something went wrong writing the file 🥲')
            console.log(`This is what the computer said...`)
            console.error(err);
            return
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    console.log(`Welcome to my little ol' README generator!`);
    console.log(`I hope you enjoy making super awesome READMEs with it 😁👍`);
    console.log(`Let's begin...`)
    inq
        .prompt(questions)
        .then((answers) => {
            console.log(`answer =`)
            console.log(answers)
            buildFile(answers);
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(`Oh no, the prompt couldn't be rendered in this environment. 🥲`)
            } else {
                console.log(`Something went wrong with the questions 🥲`)
                console.log(`This is what the computer said...`)
                console.log(error);
            }
        })
}

function buildFile(answers) {
    let title = `# ${answers.title}\n`;
    let badge = `![License Badge](https://img.shields.io/badge/License-${answers.license}-green)\n\n`;
    let desc = `## Description\n${answers.desc}\n\n`;
    let table = `## Table of Contents\n${tableBuilder()}\n\n`;
    let license = `## License\n${answers.license}\n\n`
    let install = `## Installation\n${createSteps(answers.install)}\n\n`;
    let instruct = `## Usage Instructions\n${createSteps(answers.instruct)}\n\n`;
    let contribute = `## Contribute\n${createSteps(answers.contribute)}\n\n`;
    let test = `## Test\n${createSteps(answers.test)}\n\n`;
    let questions = `## Questions?\n- [GitHub](${answers.github})\n- Email: ${answers.email}\n - It is best to get ahold of me with ${answers.best}`


    let output = title + badge + desc + table + license + install + instruct + contribute + test + questions;
    writeToFile('README.md', output);
}

function tableBuilder() {
    let places = ['license', 'install', 'usage-instructions', 'contribute', 'test']
    let output = ``;
    places.forEach(el => {
        let cap = el[0].toUpperCase(); 
        cap = cap.replace('-', ' ');
        for(let c = 1; c < el.length; c++) {
            cap = cap + el[c];
        }
        output = `${output}- [${cap}](#${el})\n`
    });
    return output;
}

function createSteps(steps) {
    let i = 1;
    let output = ``;
    steps = steps.split(', ');
    steps.forEach(el => {
        output = `${output}- ${i}. ${el}\n`;
        i++;
    })
    return output
}



// Function call to initialize app
init();