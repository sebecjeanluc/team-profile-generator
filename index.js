const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Employee = require('./lib/Employee')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, 'output')
const outputPath = path.join(OUTPUT_DIR, 'team.html')

const render = require('./src/page-template.js')

// [x] Ask manager question
// [x] Show the options
// [x] Ask the options choices of Engineer, Intern, or end the quetsion.
// [x] Continues of the choices
// [x] Show the options
// [x] Run the test
// Generate the answers to html
// Write validations

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
		default: 'manager@sample.com',
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
		default: '1',
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

function writeToFile(content) {
	const renderTeamPage = render(content)
	fs.writeFile(outputPath, renderTeamPage, (err) =>
		err ? console.log(err) : console.log('Success!')
	)
}
const answersList = []

function initialQuestions() {
	firstQuestion.push(optionsQuestion)
	return inquirer.prompt(firstQuestion)
}

function optionQuestion() {
	return inquirer.prompt(optionsQuestion)
}

const testEmployee = new Employee(1, 'Alice', 'test@email.com')
console.log(testEmployee)

function routeQuestion(answers) {
	const aManager = new Manager(
		answers.id,
		answers.nameManager,
		answers.email,
		answers.officeNumber
	)
	if (!answersList.length) {
		answersList.push(aManager)
	}
	if (answers.mainmenu === 'Add an engineer') {
		console.log('Running Enginner Question')
		return inquirer.prompt(enginnerQuestion).then((engineerAnswers) => {
			const anEngineer = new Engineer(
				engineerAnswers.idEngineer,
				engineerAnswers.nameEngineer,
				engineerAnswers.emailEngineer,
				engineerAnswers.github
			)
			answersList.push(anEngineer)
			return optionQuestion().then(routeQuestion)
		})
	} else if (answers.mainmenu === 'Add an intern') {
		console.log('Running Intern Question')
		return inquirer.prompt(internQuestion).then((internAnswers) => {
			const anIntern = new Intern(
				internAnswers.idIntern,
				internAnswers.nameIntern,
				internAnswers.emailIntern,
				internAnswers.school
			)
			answersList.push(anIntern)
			return optionQuestion().then(routeQuestion)
		})
	} else {
		console.log('Completed the building team.')
		writeToFile(answersList)
	}
}

initialQuestions()
	.then(routeQuestion)
	.catch((error) => {
		console.log(error)
	})
