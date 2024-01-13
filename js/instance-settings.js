import { WebComponent } from 'WebComponent'

customElements.define('instance-settings', class extends WebComponent {
    static props = { errorMessage: '' }

    onInit() {
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
                if (event.target == button && nameInput.reportValidity() && hostInput.reportValidity() && keyInput.reportValidity()) {
                    window.localStorage.setItem('instanceName', nameInput.value)
                    window.localStorage.setItem('instanceHost', hostInput.value)
                    window.localStorage.setItem('instanceKey', keyInput.value)

                    let client = this.closest('meili-instance').client

                    client?.getIndexes()
                        .then(indexes => {
                            this.closest('dialog').close()
                            window.location.reload()
                        })
                        .catch(e => {
                            let errorMessage = this.closest('dialog')?.querySelector('error-message')
                            console.log(errorMessage);
                            if (errorMessage) {
                                errorMessage.innerText = e.message
                            }
                        })
                }
            })
        }
    }

    // afterViewInit() {}
    render() { }
})
