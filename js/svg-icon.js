import { WebComponent } from 'WebComponent'

export class SvgIcon extends WebComponent {
    static props = {
        icon: '',
        width: '',
        height: '',
        src: '/images/icons.svg'
    }

    get template() {
        let iconPath = this.props.icon ? '#' + this.props.icon : ''
        return `<svg width="${this.props.width || 20}" height="${this.props.height || 20}">
			<use href="${this.props.src}${iconPath}"></use>
		</svg>`
    }
}

customElements.define('svg-icon', SvgIcon)
