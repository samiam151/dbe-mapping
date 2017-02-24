export class InfoWindow {
    constructor(business) {
        this.business = business;
        this.content = `
            <div class="infowindow">
                <h3>${this.business.CompanyName}</h3>           
                <p>${this.business.BusinessPhone}</p>
                <p>${this.business.ContactName}</p>
                <p>
                    <small>${this.business.BusinessAddress1}</small>
                    <small>${this.business.BusinessAddress2}</small>
                    <small>${this.business.BusinessAddress3}</small>
                </p>
            </div>
        `
        this.selector = new google.maps.InfoWindow({
            content: this.content
        })
    }
}