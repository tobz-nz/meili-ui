import { WebComponent } from "WebComponent";
import client from "./meilisearch-client.js";

customElements.define(
    "search-form",
    class extends WebComponent {
        static properties = ["index", "input", "on"];

        afterViewInit() {
            this.searchInput = this.querySelector(`${this.props.input}`);

            if (!this.props.index) {
                this.searchInput.toggleAttribute("disabled", false);
            }

            if (this.searchInput) {
                let searchHandler = (event) => {
                    if (!this.props.index) {
                        throw new Error("No Index Selected");
                    }

                    client
                        .index(this.getAttribute("index"))
                        .search(this.searchInput.value, {
                            matchingStrategy: this.getAttribute("matchingStrategy") || "last",
                            attributesToHighlight: ["*"],
                            facets: ["*"],
                            highlightPreTag: "<mark>",
                            highlightPostTag: "</mark>",
                        })
                        .then((r) => r)
                        .then((response) => {
                            this.querySelector("search-results")?.setResult(response);
                            this.querySelector("search-time").textContent = `${response.processingTimeMs}ms`;
                            this.querySelector("total-hits").textContent = `~${response.estimatedTotalHits} Hits`;
                        });
                };

                // listen on all supplied event triggers
                let eventTriggers = (this.props.on || "input").split(" ");
                eventTriggers.forEach((trigger) => {
                    this.searchInput.addEventListener(trigger, searchHandler);
                });
            }
        }

        render() {}
    },
);
