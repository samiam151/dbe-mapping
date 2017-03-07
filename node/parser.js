var fs = require('fs');
var cheerio = require('cheerio');

fs.readFile("./python/actual_data.html", (err, file) => {
    if (err) console.log(err)
    
    let $ = cheerio.load(file);
    let tr = $('#pnlLsdbeReport table').find('td.BORDER-BOTTOM')

    
    let trs_business = []
    tr.each((i, tr) => {
        if (everyFour(i)){
            trs_business.push(tr)
        }
    })


    // trying to group every two groups into a group, which makes a business
    let businesses = []
    let arr = []
    trs_business.forEach((tr, i) => {
        arr.push(tr)
        if (everyTwo(i)){
            arr.push(tr) 
            businesses.push(arr)
            arr = []
        }
    })


    let groups = []
    businesses.forEach((item, index_trs) => {
        let obj = {}
        let spans = $(item).find('span') 
        spans.each((index_span, span) => {
            // let spans = $(span).find('span')
            obj[`span_${index_trs}`] = span
            groups.push(obj)
        })  
    })
    businesses = groups

    let EXAMPLE = businesses[0].span_0;
    console.log(businesses.length)
    console.log(EXAMPLE.attribs.id)
    console.log($(EXAMPLE).text())
})

function everyFour(i){
    if ((i - 1) % 4 === 0 || i % 4 === 0){
        return true
    }
    return false;
}

function everyTwo(i){
    if (i % 2 === 0){
        return true
    }
    return false;
}