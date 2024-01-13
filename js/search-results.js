import { WebComponent } from "WebComponent";

customElements.define(
    "search-results",
    class extends WebComponent {
        static props = {};

        results = [];

        setResult(searchResult) {
            this.results = searchResult;
            this.render();
        }

        get template() {
            let results = [];

            if (this.results.hits?.length) {
                this.results.hits.forEach((hit) => {
                    // console.log(hit)

                    let article = '<article tabindex="0"><dl>';
                    Object.keys(hit)
                        .filter((prop) => {
                            // filter out meta data
                            return prop[0] !== "_";
                        })
                        .forEach((prop) => {
                            if (new RegExp(/^[0-9\.]+$/).test(hit[prop])) {
                                hit[prop] = Number(hit[prop]);
                            }

                            let pre = "",
                                post = "";

                            if (prop === "loader") {
                                console.log(hit[prop], JSON.stringify(hit[prop], null, 2));
                            }

                            if (typeof hit[prop] === "object" && hit[prop] !== null) {
                                hit[prop] = JSON.stringify(hit[prop], null, 2);
                            }

                            if (typeof hit[prop] !== "string") {
                                pre = `<code class="${hit[prop] === null ? "null" : typeof hit[prop]}">`;
                                post = `</code>`;
                            }

                            article += `<dt>${prop}:</dt>`;
                            article += `<dd>${pre}${hit._formatted[prop] || hit[prop]}${post}</dd>`;
                        });
                    article += "</dl></article>";

                    results.push(article);
                });
            }

            return results.join("\n");
        }
    },
);
