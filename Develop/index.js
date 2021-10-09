// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
//Function to generate the question objects
const questionOb = (questionName,questionStr,isRequired) => {
    var output = {
        type: "input",
        name: questionName,
        message: questionStr
    };
    if(isRequired) {
        output.validate = requiredInput => {
            if(requiredInput) {
                return true;
            } else {
                console.log(`Please provide a(n) ${questionName} for the project.`);
                return false;
            }
        };
    }
    return output;
};

const questions = [
    "What is the title of your project? (Required)",
    "Please provide a description of your project.  (What was teh motivation for the project?) (Required)",
    "Is the project deployed?",
    "Please provide a link to the application. (Required)",
    "Do you wish to include a table of contents?"
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
