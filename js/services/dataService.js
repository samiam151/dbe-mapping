export class DataService {
    constructor() {}

    static getData() {
        console.log('Getting...')
        return $.get('data/data_new.json');
    }
}