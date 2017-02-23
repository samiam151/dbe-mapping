export static class DataService {
    constructor() {}

    static getData() {
        return $.get('data/data_fix.json');
    }
}