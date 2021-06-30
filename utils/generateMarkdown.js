//Build Table of Contents
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

// Create Steps
function createSteps(steps) {
  let i = 1;
  let output = ``;
  steps = steps.split(', ');
  steps.forEach(el => {
      output = `${output} ${i}. ${el}\n`;
      i++;
  })
  return output
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(answers) {
  let title = `# ${answers.title}\n`;
  let badge = `![License Badge](https://img.shields.io/badge/License-${answers.license}-green)\n\n`;
  let desc = `## Description\n${answers.desc}\n\n`;
  let table = `## Table of Contents\n${tableBuilder()}\n\n`;
  let license = `## License\n${answers.license}\n\n`
  let install = `## Installation\n${createSteps(answers.install)}\n\n`;
  let instruct = `## Usage\n${createSteps(answers.instruct)}\n\n`;
  let contribute = `## Contributing\n${createSteps(answers.contribute)}\n\n`;
  let test = `## Test\n${createSteps(answers.test)}\n\n`;
  let questions = `## Questions?\n- [GitHub](${answers.github})\n- Email: ${answers.email}\n- It is best to get ahold of me with ${answers.best}.`;


  let output = title + badge + desc + table + license + install + instruct + contribute + test + questions;
  return output;
}

module.exports = generateMarkdown;
