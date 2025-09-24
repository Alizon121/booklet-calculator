import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor() {
        super()
        this.setTitle("Calculator")
    }

    async calculate(numberBooklets, pagesPerBooklet, bookletSizeWidth, bookletSizeHeight) {
        const response = await fetch("/api/bookletCalculation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ numberBooklets, pagesPerBooklet, bookletSizeWidth, bookletSizeHeight}),
        })

        const data = await response.json();
        return data;
    }

    async onMounted() {
        const form = document.getElementById("calcForm");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            const numberBooklets = parseInt(document.getElementById("numberBooklets").value, 10);
            const pagesPerBooklet = parseInt(document.getElementById("pagesPerBooklet").value, 10);
            const bookletSizeWidth = Number(parseFloat(document.getElementById("bookletSizeWidth").value).toFixed(1));
            const bookletSizeHeight = Number(parseFloat(document.getElementById("bookletSizeHeight").value).toFixed(1));
    
            const result = await this.calculate(numberBooklets, pagesPerBooklet, bookletSizeWidth, bookletSizeHeight);
            document.getElementById("calcResult").innerHTML = `
            <div>Sheets per booklet: ${result.sheetsPerBooklet}</div>
            <div>Total sheets: ${result.totalSheets}</div>
            <div>Sheet width: ${result.sheetWidth}</div>
            <div>Sheet height: ${result.sheetHeight}</div>
            <div>Blank pages added: ${result.blankPagesAdded}</div>
        `;
        });
    }

    async getHtml() {
        return `
            <div class="container mt-5">
                <div class="col justify-content-center">
                    <div class="container">
                        <div class="card shadow-lg rounded-4">
                            <div class="card-body p-4">
                                <div class="text-center mb-4">
                                    <h1 class="h3">Booklet Calculator</h1>
                                    <p class="lead text-muted">Get a quick quote for a saddle stitch booklet</p>
                                </div>
                                
                                <form id="calcForm">
                                    <div class="mb-3">
                                        <label for="numberBooklets" class="form-label">Number of Booklets</label>
                                        <input type="number" class="form-control" id="numberBooklets" placeholder="Enter quantity of booklets">
                                    </div>
    
                                    <div class="mb-3">
                                        <label for="pagesPerBooklet" class="form-label">Pages per Booklet</label>
                                        <input type="number" class="form-control" id="pagesPerBooklet" placeholder="Enter page count">
                                    </div>
    
                                    <div class="mb-3">
                                        <label for="bookletSizeWidth" class="form-label">Booklet Width</label>
                                            <input type="float" class="form-control" id="bookletSizeWidth" placeholder="Enter booklet width">
                                    </div>
                                    
                                    
                                    <div class="mb-3">
                                        <label for="bookletSizeHeight" class="form-label">Booklet Height</label>
                                        <input type="float" class="form-control" id="bookletSizeHeight" placeholder="Enter booklet height">
                                    </div>
    
                                    <div class="d-flex justify-content-between mt-4">
                                        <button type="submit" class="btn btn-primary px-4">Submit</button>
                                        <button type="reset" class="btn btn-outline-secondary px-4">Cancel</button>
                                    </div>
                                </form>
    
                                <div id="calcResult" class="mt-3 text-center text-success fw-bold"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }    
}