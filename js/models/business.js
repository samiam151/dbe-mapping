export class Business {
    constructor(business) {
        let info = business.info;

        this.name = info.CompanyName;
        this.address = info.BusinessAddress1;
        this.owner = info.PrincipalOwner;
        this.contact = info.ContactName
        this.email = info.BusinessEMail;
        this.phone = info.BusinessPhone;
        this.website = info.BusinessWebsite;
        this.description = info.Description;
        this.dateEstablished = info.DateEstablished;
        this.ward = info.Ward;
        this.points = info.RefPoints.replace('/[\n\t]/g', "");

        this.address = business.address;
        this.types = business.types;
        this.coords = business.Coordinates;
    }
}