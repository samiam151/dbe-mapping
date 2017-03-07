var fs = require('fs');
var cheerio = require('cheerio');
var Geocoder = require('node-geocoder');

var geocoder = Geocoder({provider: 'google'});

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


   // every business is a array of all needed spans
    businesses = businesses.map((item, index_trs) => {
        let groups = []
        item.forEach(td => {
            let spans = $(td).find('span') 
            spans.each((index_span, span) => {
                let arr = []
                // let spans = $(span).find('span')
                arr.push(span.attribs.id)
                arr.push($(span).text())
                groups.push(arr)
            })
        })       
        return groups
    })


    // turn spans in to an object
    businesses = businesses.map((business, index) => {
        let infoTable = [],
            businessTypeTable = [],
            returnObj = {};

        business.forEach(span => {
            if (span[0].includes('repActivity')){
                businessTypeTable.push(span)
            } else {
                if (!span[0].includes('Span')) {
                    infoTable.push(span)
                }
            }
        })

        infoTable = infoTable.map(item => {
            let obj = {},
                id = item[0],
                value = item[1],
                length = id.split('_').length;

            let newId = id.split('_')[length - 1].slice(3)
            obj[newId] = value;
            return obj
        })

        businessTypeTable = businessTypeTable
            .filter((item, index) => index % 2 === 0)
            .map(item => item[1])
        
        // flatten info array into one object literal
        let infoObj = {}
        infoTable.forEach(table => {
            Object.keys(table).forEach(key => {
                infoObj[key] = table[key]
            })
        })

        return {
            info: infoObj,
            types: businessTypeTable
        }        
    })

    // Geocode the addresses
    businesses = businesses.map((business, index) => {
        once(index, () => { console.log(business.info[4]['BusinessAddress1']) })

        geocoder.geocode(business.info[4]['BusinessAddress1'], (err, res) => {
            console.log(res)
            business['coords'] = res || {};
        })
        return business
    })

    console.log(businesses[35])
    console.log(businesses[35].info.ContactName)
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