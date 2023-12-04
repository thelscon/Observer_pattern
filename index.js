"use strict";
// - Створіть інтерфейс Observer з методом update(data: any): void.
// - Створіть клас Subject, який буде володіти списком об'єктів, які слухають його зміни. 
//     Має методи subscribe(observer: Observer): void і unsubscribe(observer: Observer): void.
// - В класі Subject додайте метод notify(data: any): void, який викликає метод update для всіх підписаних об'єктів.
// - Створіть клас, який реалізує інтерфейс Observer і має внутрішній стан. 
//     Наприклад, StockObserver зі змінною stockPrice.
// -Перевірте роботу, підписавши об'єкти на зміни в Subject і спостерігаючи, як вони отримують оновлення.
class StockObserver {
    stockPrice = 0;
    update(data) {
        this.stockPrice = data;
        console.log(this.stockPrice);
    }
}
class Subject {
    observers = [];
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    unsubscribe(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex >= 0) {
            this.observers.splice(observerIndex, 1);
        }
    }
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
class RandomNumberService extends Subject {
    get randomNumber() {
        return Math.floor(Math.random() * 1000);
    }
    constructor() {
        super();
        setInterval(() => {
            this.notify(this.randomNumber);
        }, 1000);
        // или вызываем notify() на экземпляре
    }
}
const observerA = new StockObserver();
const observerB = new StockObserver();
const observerC = new StockObserver();
const randomNumberServise = new RandomNumberService();
randomNumberServise.subscribe(observerA);
randomNumberServise.subscribe(observerB);
setTimeout(() => {
    randomNumberServise.subscribe(observerC);
}, 4000);
// рассылка начинаеться автоматически
// или вызываем randomNumberServise.notify (RandomNumberService.randomNumber) 
