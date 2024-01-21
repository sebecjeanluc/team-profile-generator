const Employee = require('./Employee')
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
	constructor(id, name, email, github) {
		super(id, name, email, 'Enginner')
		this.github = github
	}

	getGithub() {
		return this.github
	}

	getRole() {
		return Engineer
	}
}

module.exports = Engineer
