import { WebComponent } from 'WebComponent'

customElements.define('input-field', class extends WebComponent {
	static properties = ['id', 'name', 'label'];

	get template() {

		let inputProps = ''
		for (let v in this.props) {
			inputProps += ` ${v}="${this.props[v]}"`
		}

		return `<label for="${this.props.id}">${this.props.label || this.props.name}</label>
		<input ${inputProps}>`
	}
})