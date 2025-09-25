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

            document.getElementById("typeValidation").innerHTML = "";
            document.getElementById("validationNumberBooklets").innerHTML = "";
            document.getElementById("validationPagesPerBooklet").innerHTML = "";
            document.getElementById("validationBookletWidthSize").innerHTML = "";
            document.getElementById("validationBookletHeight").innerHTML = "";
            document.getElementById("bookletWarning").innerHTML = "";
            document.getElementById("calcResult").innerHTML = "";

            
            const numberBooklets = parseInt(document.getElementById("numberBooklets").value, 10);
            const pagesPerBooklet = parseInt(document.getElementById("pagesPerBooklet").value, 10);
            const bookletSizeWidth = Number(parseFloat(document.getElementById("bookletSizeWidth").value).toFixed(1));
            const bookletSizeHeight = Number(parseFloat(document.getElementById("bookletSizeHeight").value).toFixed(1));
            
            // Validations
            let hasError = false;
            if (isNaN(numberBooklets) || isNaN(pagesPerBooklet) ||  isNaN(bookletSizeWidth) || isNaN(bookletSizeHeight)) {
                document.getElementById("typeValidation").innerHTML = "Inputs must be numbers"
                hasError = true
              }
            if (numberBooklets < 10) {
                document.getElementById("validationNumberBooklets").innerHTML = "Number of booklets must be at least 10"
                hasError = true
            }
            if (numberBooklets > 10000) {
                document.getElementById("validationNumberBooklets").innerHTML = "Number of booklets must be less than 10000"
                hasError = true
            }
            if (pagesPerBooklet < 8) {
                document.getElementById("validationPagesPerBooklet").innerHTML = "Number of booklets must be at least 8 pages"
                hasError = true
            }
            if (pagesPerBooklet > 64) {
                document.getElementById("validationPagesPerBooklet").innerHTML = "Number of booklets must be less than 64 pages"
                hasError = true
            }
            if (bookletSizeWidth < 4 || bookletSizeWidth > 12) {
                document.getElementById("validationBookletWidthSize").innerHTML = "Width must be greater than 4in and less than 12in"
                hasError = true
            }
            if (bookletSizeHeight < 4 || bookletSizeHeight > 12) {
                document.getElementById("validationBookletHeight").innerHTML = "Height must be greater than 4in and less than 12in"
                hasError = true
            }
            if (pagesPerBooklet > 48) {
                document.getElementById("bookletWarning").innerHTML = "Thick booklets may not lay flat"
                hasError = true
            }

            if (hasError) return


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
                                    <p class="lead text-muted">Get a quick look at your saddle stitch booklets' specs</p>
                                    </div>
                                
                                <div id="typeValidation" class="mt-3 text-center text-success"></div>
                                    
                                <form id="calcForm">
                                    <div class="mb-3">
                                        <label for="numberBooklets" class="form-label">Number of Booklets</label>
                                        <input type="number" class="form-control" id="numberBooklets" placeholder="Enter quantity of booklets">
                                    </div>

                                    <div id="validationNumberBooklets" class="mt-3 text-center text-danger"></div>
    
                                    <div class="mb-3">
                                        <label for="pagesPerBooklet" class="form-label">Pages per Booklet</label>
                                        <input type="number" class="form-control" id="pagesPerBooklet" placeholder="Enter page count">
                                    </div>

                                    <div id="validationPagesPerBooklet" class="mt-3 text-center text-danger"></div>
    
                                    <div class="mb-3">
                                        <label for="bookletSizeWidth" class="form-label">Booklet Width (in)</label>
                                            <input type="float" class="form-control" id="bookletSizeWidth" placeholder="Enter booklet width">
                                    </div>
                                    
                                    <div id="validationBookletWidthSize" class="mt-3 text-center text-danger"></div>
                                    
                                    <div class="mb-3">
                                        <label for="bookletSizeHeight" class="form-label">Booklet Height (in)</label>
                                        <input type="float" class="form-control" id="bookletSizeHeight" placeholder="Enter booklet height">
                                    </div>

                                    <div id="validationBookletHeight" class="mt-3 text-center text-danger"></div>
                                    <div id="bookletWarning" class="mt-3 text-center text-danger color-red"></div>
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