const inquirer = require('inquirer');

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

const questionObDefault = (questionName,questionStr,defaultVal) => {
    var output = {
        type: "input",
        name: questionName,
        message: questionStr,
        default: defaultVal
    };
    return output;
};

const questionConfirm = (questionName,questionStr) => {
    var output = {
        type: "confirm",
        name: questionName,
        message: questionStr,
        default: false
    };
    return output;
};

const questionChoice = (questionName,questionStr,choices,chooseOne) => {
    var output = {
        type: 'checkbox',
        name: questionName,
        message: questionStr,
        choices: choices
    };
    if(chooseOne) {
        output.validate = inputVal => {
            if(inputVal.length !== 1) {
                console.log(`Please select only one ${questionName} option.`);
                return false;
            } else {
                return true;
            }
        };
    }
    return output;
};

const getTableOfContents = readMeData => {
    if(!readMeData.tableOfContents) {
        readMeData.tableOfContents = [];
    }
    console.log(`
    ======================
    Select the next header
    ======================
    `);
    inquirer.prompt([
        {
            type: "input",
            name: "sectionTitle",
            message: "Please select the next section title.",
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log("The section must have a title.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "sectionContent",
            message: "Please enter the content that you wish to include in the section.",
            default: "This section will be filled in later."
        },
        {
            type: "confirm",
            name: "confirmAddSection",
            message: "Would you like to add another content section?",
            default: false
        }
    ])
    .then(contentInfo => {
        readMeData.tableOfContents.push(contentInfo);
        if(contentInfo.confirmAddSection) {
            return getTableOfContents(readMeData);
        } else {
            return readMeData;
        }
    })
    .then(readMeData => {
        console.log(readMeData);
    });
};

module.exports = { questionOb, questionObDefault, questionConfirm, questionChoice, getTableOfContents };