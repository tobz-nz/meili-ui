import { WebComponent } from 'WebComponent'
import client from './meilisearch-client.js'

customElements.define('instance-status', class extends WebComponent {
	static properties = ['status', 'isHealthy']

	onInit() {
		if (client) {
			client.health().then(r => this.props.status = r.status)
			client.isHealthy().then(r => this.toggleAttribute('healthy'))
		}
	}

	get template() {
		return `${this.props.status}`
	}
})