import { WebComponent } from 'WebComponent'

customElements.define('instance-size', class extends WebComponent {
	static properties = ['size']

	onInit() {
		if (client) {
			client.getStats().then(r => this.props.size = this.humanFileSize(r.databaseSize))
		}

	}

	get template() {
		return `${this.props.size}`
	}

	humanFileSize(size, si) {
		var i = Math.floor(Math.log(size) / Math.log(1024));
	    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	};
})