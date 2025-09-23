import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor() {
        super()
        this.setTitle("Calculator")
    }

    async getHtml() {
        return `
            <h1>Booklet Calculator</h1>
            <input>Number of Booklets</input>
            <input>Pages per Booklet</input>
            <input>Booklet Size</input>
            <div>
                <button type=submit>Submit</button>
                <button type=discard>Cancel</button>
            </div>
        `
    }
}