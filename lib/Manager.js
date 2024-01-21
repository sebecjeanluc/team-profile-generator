const Employee = require('./Employee')
// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee {
	constructor(id, name, email, officeNumber) {
		super(id, name, email, 'Manager')
		this.officeNumber = officeNumber
	}
	getRole() {
		return Manager
	}
}

module.exports = Manager
