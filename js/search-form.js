import { WebComponent } from 'WebComponent'

customElements.define('search-form', class extends WebComponent {
	static properties = ['index', 'input', 'on']

	afterViewInit() {
		this.searchInput = this.querySelector(`${this.props.input}`)

		if (!this.props.index) {
			this.searchInput.toggleAttribute('disabled', false)
		}


		if (this.searchInput && client) {
			let searchHandler = event => {
				if (!this.props.index) {
					throw new Error('No Index Selected')
				}

				client
				.index(this.getAttribute('index'))
				.search(this.searchInput.value)
				.then(r => r)
				.then(response => {
					this.querySelector('search-results')?.setResult(response)
				})
			}

			// listen on all supplied event triggers
			let eventTriggers = (this.props.on || 'input').split(' ')
			eventTriggers.forEach(trigger => {
				this.searchInput.addEventListener(trigger, searchHandler)
			})
		}
	}

	render() {}
})