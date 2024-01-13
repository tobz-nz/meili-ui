import { WebComponent } from "WebComponent";
import { MeiliSearch } from "MeiliSearch"

customElements.define(
    "meili-instance",
    class extends WebComponent {
        static props = {
            host: 'http://localhost:7700',
            key: ''
        }

        onInit() {
            this.client = new MeiliSearch({
                host: window.localStorage.getItem('instanceHost'),
                apiKey: window.localStorage.getItem('instanceKey')
            })
        }

        afterViewInit() {}

        onChanges(changes) {}

        render() {}
    }
)
