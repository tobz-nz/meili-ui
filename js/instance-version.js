import { WebComponent } from 'WebComponent'
import client from './meilisearch-client.js'

customElements.define('instance-version', class extends WebComponent {
	static properties = ['version']

	onInit() {
		client.getVersion()
			.then(r => this.props.version = r.pkgVersion)
			.catch(e => {
				this.props.version = '0.0.0'
				
				this.dispatchEvent(new CustomEvent('error', {
					detail: { message: e.message },
					bubbles: true,
					cancelable: false
				}))
			})
	}

	get template() {
		return `version: ${this.props.version}`
	}
})