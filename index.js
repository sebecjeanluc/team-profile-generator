const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, 'output')
const outputPath = path.join(OUTPUT_DIR, 'team.html')

const render = require('./src/page-template.js')

const olivia = new Manager(1, 'olivia', 'olivia@sample.com', 1)
console.log(olivia)
let role = olivia.getRole()
console.log(role)

const questions = [
	{
		type: 'input',
		name: 'name',
		message: 'Type your full name',
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
		message: 'Write your email address',
		default: 'sample@sample.com',
	},
	{
		type: 'list',
		name: 'role',
		message: 'Choose your role',
		choices: ['manager', 'engineer', 'intern'],
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
		when: (answers) => answers.role === 'manager',
	},
	{
		type: 'input',
		name: 'github',
		message: 'Type your github ID',
		default: 'sebecjeanluc',
		when: (answers) => answers.role === 'engineer',
	},
	{
		type: 'input',
		name: 'school',
		message: 'Write your school name',
		default: 'The University of Liverpool',
		when: (answers) => answers.role === 'intern',
	},
]

function writeToFile(fileName, data) {
	fs.writeFile(`./export/${fileName}.html`, data, (err) =>
		err ? console.log(err) : console.log('Success!')
	)
}

function generateQuestions() {
	const questionList = []
	questions.forEach((question) => {
		questionList.push(question)
	})
	return questionList
}

function init() {
	inquirer
		.prompt(generateQuestions())

		.then((answers) => {
			switch (answers.role) {
				case 'manager':
					// const managerContent = render()
					// const managerContent = generateTeam('manager')
					console.log(answers)
					// console.log(render(answersArray))
					break
				case 'engineer':
					break
				case 'intern':
					break
				default:
					break
			}

			// const content = generateMarkdown(answers)
			// console.log(answers)
			// writeToFile('team.html', content)
		})

		.catch((error) => {
			console.log(error)
		})
}

// init()
