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
            businesses.push(arr)
            arr = []
        }
    })

   
    businesses = businesses.map((item, index_trs) => {
        // once(index_trs, () => {
        //     console.log(item)
        // })
``
        let groups = []
        item.forEach(td => {
            let spans = $(td).find('span') 
            spans.each((index_span, span) => {
                let obj = {}
                // let spans = $(span).find('span')
                obj[span.attribs.id] = $(span).text()
                groups.push(obj)
            })
        })
        
        return groups
    })

    // let EXAMPLE = businesses[0].span_0;
    console.log(businesses[0])
    console.log(businesses[1])
    console.log(businesses[2])
    console.log(businesses[3])
    // console.log(EXAMPLE.attribs.id)
    // console.log($(EXAMPLE).text())
})

function everyFour(i){
    i++
    if ((i - 1) % 4 === 0 || i % 4 === 0){
        return true
    }
    return false;
}

function everyTwo(i){
    if (i % 2 != 0){
        return true
    }
    return false;
}

function once(i, fn){
    if (i === 1){
        fn();
    }
}