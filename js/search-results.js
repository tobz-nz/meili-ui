import { WebComponent } from 'WebComponent'

customElements.define('search-results', class extends WebComponent {
	static properties = []

	results = []

	setResult(searchResult) {
		this.results = searchResult
		this.render()
	}

	get template() {
		let results = []
		
		if (this.results.hits?.length) {
			this.results.hits.forEach(hit => {
				// console.log(hit)
				
				let article = '<article><dl>'
				Object.keys(hit).forEach(prop => {
					if (hit[prop] === null) {
						hit[prop] = 'null'
					}
					if (hit[prop] === false) {
						hit[prop] = 'false'
					}

					article += `<dt>${prop}:</dt>` 
					article += `<dd>${hit[prop]}</dd>`
				})
				article += '</dl></article>'

				results.push(article)
			})
		}

		return results.join("\n")
	}
})