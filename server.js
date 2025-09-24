const express = require("express");
const path = require("path");

const app = express();
app.use(express.json())

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

app.post("/api/bookletCalculation", (req, res) => {
    const { numberBooklets, pagesPerBooklet, bookletSizeWidth, bookletSizeHeight} = req.body

    // Validations
    if (typeof numberBooklets !== "number" || typeof pagesPerBooklet !== "number" ||  typeof bookletSizeWidth !== "number" || typeof bookletSizeHeight !== "number") {
        return res.status(400).json({ error: "Inputs must be numbers" });
      }

    if (numberBooklets < 10) return res.status(400).json({error: "Number of booklets must be at least 10"})
    if (numberBooklets > 10000) return res.status(400).json({error: "Number of booklets must be less than 10000"})
    if (pagesPerBooklet < 8) return res.status(400).json({error: "Number of booklets must be at least 8 pages"})
    if (pagesPerBooklet > 64) return res.status(400).json({error: "Number of booklets must be less than 64 pages"})
    if (bookletSizeWidth < 4 || bookletSizeHeight < 4) return res.status(400).json({error: "Width and Height must be greater than 4in"})
    if (bookletSizeWidth > 12 || bookletSizeHeight > 12) return res.status(400).json({error: "Width and Height must be less than 12in"})
    if (pagesPerBooklet > 48) console.log(res.status(400).json({error: "Thick booklets may not lay flat"}))
    
    // Calculations
    let sheetsPerBooklet = Math.ceil(pagesPerBooklet/4)
    const blankPagesAdded = (4 - (pagesPerBooklet % 4)) % 4  
    
    let totalSheets = sheetsPerBooklet * numberBooklets
    let sheetWidth = bookletSizeWidth * 2
    
    
        const result = {
            "sheetsPerBooklet": sheetsPerBooklet,
            "totalSheets": totalSheets,
            "sheetWidth": sheetWidth,
            "sheetHeight": bookletSizeHeight,
            "blankPagesAdded": blankPagesAdded
        }
  
      return res.json(result)
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
});

app.listen(process.env.PORT || 8080, () => console.log(`Server running`))