import { WebComponent } from 'WebComponent'

customElements.define('instance-host', class extends WebComponent {
	get template() {
		return `${window.localStorage.getItem('instanceHost') || ''}`
	}
})