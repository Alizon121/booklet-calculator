import AbstractView from "./AbstractView.js"

export default class Dashboard extends AbstractView{
    constructor() {
        super()
        this.setTitle("Dashboard")
    }

    async getHtml() {
        return `
        <div class="container mt-5">
                <div class="card shadow-sm text-center">
                    <div class="card-body">
                        <h1 class="card-title text-primary">Welcome to the Booklet Calculator Dashboard</h1>
                            <p class="card-text text-center mt-4">
                                <a href="/calculator" data-link class="btn btn-success">Visit Calculator</a>
                            </p>
                    </div>
                </div>
        </div>
        `
    }
}