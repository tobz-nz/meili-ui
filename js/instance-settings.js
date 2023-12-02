customElements.define('instance-settings', class extends HTMLElement {
	connectedCallback() {
		let nameInput = this.querySelector('[name="name"'),
			hostInput = this.querySelector('[name="host"'),
			keyInput = this.querySelector('[name="key"'),
			button = this.querySelector('button')

		if (button) {
			nameInput.value = window.localStorage.getItem('instanceName')
			hostInput.value = window.localStorage.getItem('instanceHost')
			keyInput.value = window.localStorage.getItem('instanceKey')

			if (!nameInput.value || !hostInput.value) {
				this.closest('dialog').openModal()
			}

			button.addEventListener('click', event => {
				if (nameInput.reportValidity() && hostInput.reportValidity() && keyInput.reportValidity()) {
					window.localStorage.setItem('instanceName', nameInput.value)
					window.localStorage.setItem('instanceHost', hostInput.value)
					window.localStorage.setItem('instanceKey', keyInput.value)

					this.closest('dialog').close()
				}
			})
		}
	}
})