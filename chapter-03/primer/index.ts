console.log('----------------------------------------------------------------');

function sum(first: number, second: number | string) {
    if (typeof second == 'string') {
        return first + Number.parseInt(second);
    } else {
        return first + second;
    }
}

let result = sum(10, 10);
console.log(`Result value: ${result}, Result type: ${typeof result}`);
result = sum(10, '11');
console.log(`Result value: ${result}, Result type: ${typeof result}`);

console.log('----------------------------------------------------------------');

class Product {
    constructor(public name: string, price: number, category?: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    private price: number;
    category?: string;

    printDetails() {
        if (this.category != undefined) {
            console.log(
                `Name: ${this.name}, Price: ${this.price}, Category: ${this.category}`
            );
        } else {
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

import { Name } from './modules/name';
import { WeatherLocation } from './modules/weather';

let name = new Name('Bob', 'Bobovich');
let location = new WeatherLocation('Raining', 'London');

console.log(name.nameMessage);
console.log(location.weatherMessage);
console.log('----------------------------------------------------------------');

import {
    Name as NameConsolidated,
    WeatherLocation as WeatherLocationConsolidated,
} from './modules';

let nameConsolidated = new NameConsolidated(
    'BobConsolidated',
    'BobovichConsolidated'
);
let locationConsolidated = new WeatherLocationConsolidated(
    'Raining',
    'Consolidated'
);

console.log(nameConsolidated.nameMessage);
console.log(locationConsolidated.weatherMessage);
console.log('----------------------------------------------------------------');
