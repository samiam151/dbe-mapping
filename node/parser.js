var fs = require('fs');
var cheerio = require('cheerio');
var Geocoder = require('node-geocoder');

// var googlemaps = require('@google/maps').createClient({
//   key: 'AIzaSyC-MUe6SUZKtBb-rCXYimGzNA_BZdKsArY'
// });

var full_businesses = [];

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


    // Filter out for DBE's
    businesses = businesses.filter(business => {
        return business.info.RefPoints.includes("DBE");
    })

    // Geocode the addresses
    businesses = businesses.map((business, index) => {        
        let address1 = business.info['BusinessAddress1'].split(",")[0],
            address2 = business.info['BusinessAddress1'].split(",")[1],
            address3 = business.info['BusinessAddress1'].split(",")[3]
        
        business['address'] = {}
        business['address']['firstLine'] = address1
        business['address']['secondLine'] = address2
        business['address']['thirdLine'] = address3

        // geocoder.geocode(business.info['BusinessAddress1'], (err, res) => {
        //     if (err) console.log(err);

        //     console.log(business.info['BusinessAddress1'], res)
        // })

        // let address = business.info['BusinessAddress1']
        // googlemaps.geocode({
        //     address: address
        // }, (err, res) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     // console.log(address)
        //     // console.log(res)
        // })

        console.log(`${businesses.length - index} left...`)
        return business
    })

    data = JSON.stringify(businesses, null, '\t')
    fs.writeFile("./data/data_node.json", data, (err) => err)
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