import { WebComponent } from 'WebComponent'

customElements.define('instance-version', class extends WebComponent {
	static properties = ['version']

	onInit() {
		if (client) {
			client.getVersion().then(r => this.props.version = r.pkgVersion)
		}

	}

	get template() {
		return `version: ${this.props.version}`
	}
})