import { WebComponent } from "WebComponent";

customElements.define(
    "instance-indexes",
    class extends WebComponent {
        static props = {
            selected: ''
        };

        indexes = [];

        afterViewInit() {
            this.client = this.closest('meili-instance').client

            // get list of indexes
            this.client?.getIndexes()
                .then((r) => r.results)
                .then((indexes) => {
                    this.indexes = indexes;

                    // then get index stats and merge the numberOfDocuments
                    this.client
                        .getStats()
                        .then((r) => r.indexes)
                        .then((indexStats) => {
                            Object.keys(indexStats).forEach((indexName) => {
                                let indexNumber = this.indexes.findIndex((index) => index.uid == indexName);
                                this.indexes[indexNumber].numberOfDocuments = indexStats[indexName].numberOfDocuments;
                                this.indexes[indexNumber].isIndexing = indexStats[indexName].isIndexing;
                            });

                            this.render();
                            // console.log("indexes loaded");
                            this.dispatchEvent(new CustomEvent("load"));
                        });
                });

            this.addEventListener("click", (event) => {
                this.props.selected = event.target.textContent;

                const newEvent = new CustomEvent("change", {
                    detail: { index: event.target.textContent },
                    bubbles: true,
                    cancelable: false,
                });

                this.dispatchEvent(newEvent);
            });

            setInterval(() => {
                this.client
                    .getStats()
                    .then((r) => r.indexes)
                    .then((indexStats) => {
                        Object.keys(indexStats).forEach((indexName) => {
                            let indexElement = this.querySelector(`#${indexName}`);
                            indexElement.setAttribute("documents", indexStats[indexName].numberOfDocuments);
                            indexElement.toggleAttribute("is-indexing", indexStats[indexName].isIndexing);
                        });
                    });
            }, 5000);
        }

        isSelected(index) {
            let currentIndex = window.localStorage.getItem("index");
            return index === (this.props.selected || currentIndex) ? "selected" : "";
        }

        get template() {
            let indexList = [];

            this.indexes.forEach((index) => {
                indexList.push(
                    `<index-item
                        tabindex="0"
                        id="${index.uid}"
                        primary="${index.primaryKey}"
                        documents="${index.numberOfDocuments}"
                        ${index.isIndexing ? "is-indexing" : ""}
                        ${this.isSelected(index.uid)}>${index.uid}</index-item>`,
                );
            });

            return indexList.join("\n");
        }
    },
);
