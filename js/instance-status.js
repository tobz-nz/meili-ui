import { WebComponent } from "WebComponent";
import client from "./meilisearch-client.js";

customElements.define(
    "instance-status",
    class extends WebComponent {
        static props = {
            status: 'pending',
            isHealthy: false,
        }

        onInit() {
            this.update();

            setInterval(
                () => {
                    this.update();
                },
                this.getAttribute("delay") || 5000,
            );
        }

        update() {
            client.health().then((r) => {
                this.setAttribute("status", r.status);
                this.toggleAttribute("healthy", this.props.status === "available");
            });
        }

        get template() {
            return this.getAttribute("status");
        }
    },
);
