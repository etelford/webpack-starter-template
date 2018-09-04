class Form {
	constructor() {
		console.log('I am form')
	}

	tryme() {
		console.log([5, 10, 15].map(num => num * 5))
	}
}

let f = new Form()
f.tryme()
