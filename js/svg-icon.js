import { WebComponent } from 'WebComponent'

customElements.define('svg-icon', class extends WebComponent {
	static properties = ['icon', 'width', 'height', 'path']

	// afterViewInit() {}

	get template() {
		return `<svg width="${this.props.width || 20}" height="${this.props.height || 20}">
			<use href="${this.props.path || '/images/icons.svg'}#${this.props.icon || ''}"></use>
		</svg>`
	}
})