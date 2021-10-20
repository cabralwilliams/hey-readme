// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const { questionOb, questionObDefault, getTableOfContents, questionConfirm, questionChoice, } = require('./utils/helperFunctions');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input

//"Please provide a link to the application. (Required)",

const questions = [
    questionOb("title","What is the title of your project?  (Required)",true),
    questionOb("description","Please provide a description of your project.  (What was the motivation for the project?) (Required)",true),
    questionOb("installation","What are the installation steps for the project?  (Required)",true),
    questionOb("usage","What are the usage instructions for the project? (Required)",true),
    questionChoice("license","Select a license from the list below to cover this project.  If you do not wish for the project to be covered by a specific license, choose 'None'.",["GNU AGPLv3","GNU GPLv3","GNU LGPLv3","Mozilla Public License 2.0","Apache License 2.0","MIT License","Boost Software License 1.0","The Unlicense","None"],true),
    questionObDefault("contributing","Please provide guidelines for how developers should contribute to the project.","This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/)."),
    questionObDefault("tests","What tests do you want to pass on to users to help them understand the project?","This section will be completed later."),
    questionOb("username","What is your GitHub username?",true),
    questionOb("email","At what email address do you wish for users to contact you with questions about your application?",true),
    questionConfirm("deployedProject","Is the project deployed?")
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(readmeObject => {
        //console.log(readmeObject);
        if(readmeObject.deployedProject) {
            inquirer.prompt(
                [{
                    type: "input",
                    name: "deployedUrl",
                    message: "Please provide a link to the application. (Required)",
                    validate: deployedUrl => {
                        if(deployedUrl) {
                            return true;
                        } else {
                            console.log("Please provide the url for deployed application.");
                            return false;
                        }
                    }
                }]
            )
            .then(deployedUrl => {
                readmeObject.deployedUrl = deployedUrl.deployedUrl;
                //console.log(readmeObject);
                return readmeObject;
            })
            .then(readmeObject => {
                var fileData = generateMarkdown(readmeObject);
                //console.log(fileData);
                fs.writeFile("./README.md",fileData, err => {
                    console.log(err);
                });
            });
        } else {
            var fileData = generateMarkdown(readmeObject);
            //console.log(fileData);
            fs.writeFile("../README.md",fileData, err => {
                console.log(err);
            });
        }
    });
}

// Function call to initialize app
init();
