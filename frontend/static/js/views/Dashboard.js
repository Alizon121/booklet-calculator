import AbstractView from "./AbstractView.js"

export default class Dashboard extends AbstractView{
    constructor() {
        super()
        this.setTitle("Dashboard")
    }

    async getHtml() {
        return `
            <h1>Welcome to the Booklet Calculator Dashboard</h1>
            <p>
                <a href="/calculator" data-link>Visit Calculator</a>
            </p>
        `
    }
}