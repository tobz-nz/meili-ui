import { MeiliSearch } from "MeiliSearch"

export default new MeiliSearch({
    host: window.localStorage.getItem('instanceHost'),
    apiKey: window.localStorage.getItem('instanceKey')
})
