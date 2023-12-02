import { WebComponent } from 'WebComponent'

customElements.define('instance-name', class extends WebComponent {
	get template() {
		return `${window.localStorage.getItem('instanceName')}`
	}
})