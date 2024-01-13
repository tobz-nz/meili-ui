import { WebComponent } from 'WebComponent'

customElements.define('instance-size', class extends WebComponent {
    static props = { size: '0 B' }

    onInit() {
        this.closest('meili-instance')?.client.getStats()
            .then(r => this.props.size = this.humanFileSize(r.databaseSize))
            .catch(e => {
                this.props.size = '0 B'
            })
    }

    get template() {
        return `${this.props.size || this.humanFileSize(1)}`
    }

    humanFileSize(size, si) {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    };
})
