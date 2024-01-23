const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, 'output')
const outputPath = path.join(OUTPUT_DIR, 'team.html')

const render = require('./src/page-template.js')

// Ask manager question
// Show the options
// Ask the options choices of Engineer, Intern, or end the quetsion.
// Continues of the choices
// Show the options
// Generate the answers to html

const firstQuestion = [
	{
		type: 'input',
		name: 'nameManager',
		message: "Type a manager' name",
		default: 'Taro Yamada',
	},
	{
		type: 'number',
		name: 'id',
		message: 'Input your employee ID number',
		default: 1,
		validate: function (number) {
			const done = this.async()
			setTimeout(function () {
				if (typeof number !== 'number') {
					done('Type only a number')
				} else {
					done(null, true)
				}
			}, 1000)
		},
	},
	{
		type: 'input',
		name: 'email',
		message: "Write the manager's email address",
		default: 'sample@sample.com',
	},
	{
		type: 'number',
		name: 'officeNumber',
		message: 'What is your office number?',
		default: 1,
		validate: function (number) {
			const done = this.async()
			setTimeout(function () {
				if (typeof number !== 'number') {
					done('Type only a number')
				} else {
					done(null, true)
				}
			}, 1000)
		},
	},
]
const optionsQuestion = {
	type: 'list',
	name: 'mainmenu',
	message: 'Main menu: ',
	choices: [
		new inquirer.Separator(),
		'Add an engineer',
		'Add an intern',
		'Finish building the team',
	],
}
const enginnerQuestion = [
	{
		type: 'input',
		name: 'nameEngineer',
		message: "Type your engineer's name",
		default: 'Enginner Smith',
	},
	{
		type: 'input',
		name: 'idEngineer',
		message: 'Type your engineer ID',
		default: 'sebecjeanluc',
	},
	{
		type: 'input',
		name: 'emailEngineer',
		message: "Type your engineer's email address",
		default: 'engineer@test.com',
	},
	{
		type: 'input',
		name: 'github',
		message: "Type the engineer's github ID",
		default: 'sebecjeanluc',
		// when: (answers) => answers.mainmenu === 'Add an engineer',
	},
]
const internQuestion = [
	{
		type: 'input',
		name: 'nameIntern',
		message: "Write the intern's name",
		default: 'Intern Smith',
	},
	{
		type: 'input',
		name: 'idIntern',
		message: "Write the intern's ID",
		default: '1',
	},
	{
		type: 'input',
		name: 'emailIntern',
		message: "Write the intern's email address",
		default: 'intern@sample.com',
	},
	{
		type: 'input',
		name: 'school',
		message: "Write the intern's school name",
		default: 'The University of Liverpool',
	},
]

const answersList = []

function writeToFile(content) {
	fs.writeFile(outputPath, content, (err) =>
		err ? console.log(err) : console.log('Success!')
	)
}

function initialQuestions() {
	firstQuestion.push(optionsQuestion)
	return inquirer.prompt(firstQuestion)
}

function optionQuestion() {
	return inquirer.prompt(optionsQuestion)
}

function routeQuestion(answers) {
	if (answers.mainmenu === 'Add an engineer') {
		console.log('Running Enginner Question')
		return inquirer.prompt(enginnerQuestion).then((enginnerAnswers) => {
			answersList.push(enginnerAnswers)
			console.log(answersList)
			return optionQuestion().then(routeQuestion)
		})
	} else if (answers.mainmenu === 'Add an intern') {
		console.log('Running Intern Question')
		return inquirer.prompt(internQuestion).then((internAnswers) => {
			answersList.push(internAnswers)
			console.log(answersList)
			return optionQuestion().then(routeQuestion)
		})
	} else {
		console.log('Question ended')
	}
}

initialQuestions()
	.then(routeQuestion)
	.catch((error) => {
		console.log(error)
	})
