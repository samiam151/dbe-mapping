export class Business {
    constructor(business) {
        this.name = business.CompanyName;
        this.address = [
            business.BusinessAddress1,
            business.BusinessAddress2,
            business.BusinessAddress3];
        this.owner = business.ContactName;
        this.email = business.BusinessEMail;
        this.phone = business.BusinessPhone;

        if (business.LsdbeOptions){
            this.labels = business.LsdbeOptions.replace(/\s/g,'').split(',');
        }
        
        this.businessNumber = business.LsdbeNumber;
        this.coords = business.Coordinates;
    }
}