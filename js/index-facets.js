import { WebComponent } from "WebComponent";
import client from "./meilisearch-client.js";

customElements.define(
    "index-facets",
    class extends WebComponent {
        static properties = ["index"];

        facets = [];

        afterViewInit() {
            this.addEventListener("click", (event) => {});
        }

        onChanges(changes) {
            if (changes.property == "index") {
                client
                    .index(this.props.index)
                    .getFilterableAttributes()
                    .then((facets) => {
                        console.log(facets);
                        this.facets = facets;
                        this.render();
                    });
            }
        }

        get template() {
            let facetList = [];
            this.facets.forEach((facet) => {
                facetList.push(`<facet-item name="${facet}" index="${this.props.index}">${facet}</facet-item>`);
            });

            return facetList.join("\n");
        }
    },
);
