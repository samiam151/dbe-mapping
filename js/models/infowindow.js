export class InfoWindow {
    constructor(business) {
        this.business = business;
        this.content = `
            <div class="infowindow">
                <h3>${this.business.info.CompanyName}</h3>           
                <p>${this.business.info.BusinessPhone}</p>
                <p>${this.business.info.ContactName}</p>
                <p>${this.business.info.BusinessEMail}</p>
                <a target="_blank" href="http://${this.business.info.BusinessWebsite}">${this.business.info.BusinessWebsite}</a>
                <p>
                    <small>${this.business.info.BusinessAddress1}, </small>
                </p>
            </div>
        `
        this.selector = new google.maps.InfoWindow({
            content: this.content
        })

        window.dispatchEvent(new CustomEvent('markerCreated', {
            'detail': this
        }));
        
    }

    delete() {
        this.selector.setMap(null);
    }
        
}