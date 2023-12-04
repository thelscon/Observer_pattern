// - Створіть інтерфейс Observer з методом update(data: any): void.
// - Створіть клас Subject, який буде володіти списком об'єктів, які слухають його зміни. 
//     Має методи subscribe(observer: Observer): void і unsubscribe(observer: Observer): void.
// - В класі Subject додайте метод notify(data: any): void, який викликає метод update для всіх підписаних об'єктів.
// - Створіть клас, який реалізує інтерфейс Observer і має внутрішній стан. 
//     Наприклад, StockObserver зі змінною stockPrice.
// -Перевірте роботу, підписавши об'єкти на зміни в Subject і спостерігаючи, як вони отримують оновлення.

interface IObserver {
    update : (data : any) => void
}
class StockObserver implements IObserver{
    public stockPrice : number = 0

    update (data : any) {
        this.stockPrice = data
        console.log (this.stockPrice)
    }
}

interface ISubject {
    readonly subscribe : (observer : IObserver) => void
    readonly unsubscribe : (observer : IObserver) => void
    readonly notify : (data : any) => void
}

abstract class Subject implements ISubject {
    private readonly observers : IObserver[] = []

    subscribe (observer : IObserver) {
        if (!this.observers.includes (observer)) {
            this.observers.push (observer)
        }
    }
    unsubscribe (observer : IObserver) {
        const observerIndex = this.observers.indexOf (observer)
        if (observerIndex >= 0) {
            this.observers.splice (observerIndex , 1)
        }
    }
    notify (data : any) {
        this.observers.forEach (observer => observer.update (data))
    }
}

class RandomNumberService extends Subject {
    private get randomNumber () : number{
        return Math.floor (Math.random () * 1000)
    }

    constructor () {
        super ()

        setInterval (() => {
            this.notify (this.randomNumber)
        } , 1000)
        // или вызываем notify() на экземпляре
    }
}

const observerA = new StockObserver ()
const observerB = new StockObserver ()
const observerC = new StockObserver ()
const randomNumberServise = new RandomNumberService ()

randomNumberServise.subscribe (observerA)
randomNumberServise.subscribe (observerB)
setTimeout (() => {
    randomNumberServise.subscribe (observerC)
} , 4000)
// рассылка начинаеться автоматически
// или вызываем randomNumberServise.notify (RandomNumberService.randomNumber) 