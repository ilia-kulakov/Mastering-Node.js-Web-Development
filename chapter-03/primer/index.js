"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('----------------------------------------------------------------');
function sum(first, second) {
    if (typeof second == 'string') {
        return first + Number.parseInt(second);
    }
    else {
        return first + second;
    }
}
let result = sum(10, 10);
console.log(`Result value: ${result}, Result type: ${typeof result}`);
result = sum(10, '11');
console.log(`Result value: ${result}, Result type: ${typeof result}`);
console.log('----------------------------------------------------------------');
class Product {
    name;
    constructor(name, price, category) {
        this.name = name;
        this.name = name;
        this.price = price;
        this.category = category;
    }
    price;
    category;
    printDetails() {
        if (this.category != undefined) {
            console.log(`Name: ${this.name}, Price: ${this.price}, Category: ${this.category}`);
        }
        else {
            console.log(`Name: ${this.name}, Price: ${this.price}`);
        }
    }
}
let hat = new Product('Hat', 100);
let boots = new Product('Boots', 100, 'Snow Gear');
hat.printDetails();
boots.printDetails();
console.log(boots.name);
console.log('----------------------------------------------------------------');
const name_1 = require("./modules/name");
const weather_1 = require("./modules/weather");
let name = new name_1.Name('Bob', 'Bobovich');
let location = new weather_1.WeatherLocation('Raining', 'London');
console.log(name.nameMessage);
console.log(location.weatherMessage);
console.log('----------------------------------------------------------------');
const modules_1 = require("./modules");
let nameConsolidated = new modules_1.Name('BobConsolidated', 'BobovichConsolidated');
let locationConsolidated = new modules_1.WeatherLocation('Raining', 'Consolidated');
console.log(nameConsolidated.nameMessage);
console.log(locationConsolidated.weatherMessage);
console.log('----------------------------------------------------------------');
