import { WebComponent } from 'WebComponent'

customElements.define('svg-icon', class extends WebComponent {
	static properties = ['icon', 'width', 'height', 'src']

	get template() {
		let iconPath = this.props.icon ? '#' + this.props.icon : ''
		return `<svg width="${this.props.width || 20}" height="${this.props.height || 20}">
			<use href="${this.props.src || '/images/icons.svg'}${iconPath}"></use>
		</svg>`
	}
})