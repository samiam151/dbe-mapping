import { Business } from "./models/business";

export function showBusinesses(data){
    let businesses = data.map(datum => new Business(datum)),
        numBusinesses = businesses.length

    businesses.slice(0,25).forEach(n => {
        console.log(n)
    })
    console.log(numBusinesses)
}