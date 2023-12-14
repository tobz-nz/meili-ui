import { WebComponent } from 'WebComponent'
import { MeiliSearch } from "MeiliSearch"

customElements.define('instance-settings', class extends WebComponent {
    static props = { errorMessage: '' }

    onInit() {
        // this.onInit();
        // this.render();
        // this.afterViewInit();

        let nameInput = this.querySelector('[name="name"'),
            hostInput = this.querySelector('[name="host"'),
            keyInput = this.querySelector('[name="key"'),
            button = this.querySelector('button')

        if (button) {
            nameInput.value = window.localStorage.getItem('instanceName')
            hostInput.value = window.localStorage.getItem('instanceHost')
            keyInput.value = window.localStorage.getItem('instanceKey')

            if (!nameInput.value || !hostInput.value) {
                this.closest('dialog')?.showModal()
            }

            this.addEventListener('click', event => {
                console.log('asd', event.target);
                if (event.target == button && nameInput.reportValidity() && hostInput.reportValidity() && keyInput.reportValidity()) {
                    window.localStorage.setItem('instanceName', nameInput.value)
                    window.localStorage.setItem('instanceHost', hostInput.value)
                    window.localStorage.setItem('instanceKey', keyInput.value)

                    let client = new MeiliSearch({
                        host: window.localStorage.getItem('instanceHost'),
                        apiKey: window.localStorage.getItem('instanceKey')
                    })

                    client.getIndexes()
                        .then(indexes => {
                            this.closest('dialog').close()
                            window.location.reload()
                        })
                        .catch(e => {
                            console.log(this);
                            this.props.errorMessage = e.message
                        })
                }
            })
        }
    }

    // afterViewInit() {}
    render() { }
})
