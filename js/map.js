class Map {
    constructor(name) {
        this.name = name;
        this.new = "new";
    }

    test() {
        console.log(this.new + "is more more!");
    }
}

module.exports = Map;