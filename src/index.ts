import { v4 as uuidv4 } from 'uuid';

class Item {
  private _id: string;
  private _name: string;
  private _price: number;
  private _description: string;

  constructor(name: string, price: number, description: string) {
    this._id = uuidv4();
    this._name = name;
    this._price = price;
    this._description = description;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get description(): string {
    return this._description;
  }
}

class User {
  private _id: string;
  private _name: string;
  private _age: number;
  private _cart: Item[];

  constructor(name: string, age: number) {
    this._id = uuidv4();
    this._name = name;
    this._age = age;
    this._cart = [];
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get age(): number {
    return this._age;
  }

  get cart(): Item[] {
    return this._cart;
  }

  addToCart(item: Item): void {
    this._cart.push(item);
  }

  removeFromCart(item: Item): void {
    this._cart = this._cart.filter((cartItem) => cartItem.id !== item.id);
  }

  removeQuantityFromCart(item: Item, quantity: number): void {
    const itemIndex = this._cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex !== -1) {
      this._cart.splice(itemIndex, quantity);
    }
  }
  
  

  cartTotal(): number {
    let total = 0;
    for (const item of this._cart) {
      total += item.price;
    }
    return total;
  }

  printCart(): void {
    console.log(`User ${this._name}'s Cart:`);
    for (const item of this._cart) {
      console.log(`- ${item.name}: $${item.price}`);
    }
  }
}

class Shop {
  private _items: Item[];

  constructor() {
    this._items = [
      new Item('Item 1', 10, 'Description 1'),
      new Item('Item 2', 20, 'Description 2'),
      new Item('Item 3', 30, 'Description 3'),
    ];
  }

  get items(): Item[] {
    return this._items;
  }
}


const shop = new Shop();
const user = new User('Cynthia', 18);

user.addToCart(shop.items[0]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[2]);

user.printCart(); 

user.removeFromCart(shop.items[1]); 

user.removeQuantityFromCart(shop.items[0], 2);

console.log(`Cart Total: $${user.cartTotal()}`);


