import { WebComponent } from 'WebComponent'

customElements.define('instance-indexes', class extends WebComponent {
	static properties = ['selected']

	indexes = []

	afterViewInit() {
		if (client) {
			// get list of indexes
			client.getIndexes().then(r => r.results).then(indexes => {
				this.indexes = indexes

				// then get index stats and merge the numberOfDocuments
				client.getStats().then(r => r.indexes).then(indexStats => {
					Object.keys(indexStats).forEach(indexName => {
						let indexNumber = this.indexes.findIndex(index => index.uid == indexName)
						this.indexes[indexNumber].numberOfDocuments = indexStats[indexName].numberOfDocuments
					})

					this.render()
					this.dispatchEvent(new CustomEvent('load'))
				})
			})
		}

		this.addEventListener('click', event => {
			this.props.selected = event.target.textContent

			const newEvent = new CustomEvent('change', {
				detail: { index: event.target.textContent },
				bubbles: true,
				cancelable: false
			})

			this.dispatchEvent(newEvent)
		})
	}

	isSelected(index) {
		return index === this.props.selected ? 'selected' : ''
	}

	get template() {
		let indexList = []
		
		this.indexes.forEach(index => {
			let selected = ''
			if (index.uid === this.props.selected) {
				selected = 'selected'
			}

			indexList.push(`<index-item tabindex="0" name="${index.uid}" primary="${index.primaryKey}" documents="${index.numberOfDocuments}" ${this.isSelected(index.uid)}>${index.uid}</index-item>`)
		})

		return indexList.join("\n")
	}
})