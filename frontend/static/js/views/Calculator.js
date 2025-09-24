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
        console.log("Calculation result:", data.result);
        return data.result;
    }

    async onMounted() {
        const form = document.getElementById("calcForm");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            const numberBooklets = parseInt(document.getElementById("numBooklets").value, 10);
            const pagesPerBooklet = parseInt(document.getElementById("pagesPerBooklet").value, 10);
            const bookletSize = document.getElementById("bookletSize").value;
    
            let bookletSizeWidth, bookletSizeHeight;
            if (bookletSize === "letter") {
                bookletSizeWidth = 8.5;
                bookletSizeHeight = 11;
            } else if (bookletSize === "half") {
                bookletSizeWidth = 5.5;
                bookletSizeHeight = 8.5;
            } else {
                bookletSizeWidth = 0;
                bookletSizeHeight = 0;
            }
    
            const result = await this.calculate(numberBooklets, pagesPerBooklet, bookletSizeWidth, bookletSizeHeight);
            document.getElementById("calcResult").innerText = `Result: ${result}`;
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
                                        <label for="numBooklets" class="form-label">Number of Booklets</label>
                                        <input type="number" class="form-control" id="numBooklets" placeholder="Enter quantity">
                                    </div>
    
                                    <div class="mb-3">
                                        <label for="pagesPerBooklet" class="form-label">Pages per Booklet</label>
                                        <input type="number" class="form-control" id="pagesPerBooklet" placeholder="Enter page count">
                                    </div>
    
                                    <div class="mb-3">
                                        <label for="bookletSize" class="form-label">Booklet Size</label>
                                        <select class="form-select" id="bookletSize">
                                            <option selected disabled>Select a size</option>
                                            <option value="letter">8.5 x 11 (Letter)</option>
                                            <option value="half">5.5 x 8.5 (Half Letter)</option>
                                            <option value="custom">Custom</option>
                                        </select>
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