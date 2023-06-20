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

  clearCart(): void {
    this._cart = [];
  }

  cartTotal(): number {
    let total = 0;
    for (const item of this._cart) {
      total += item.price;
    }
    return total;
  }

  printCart(): void {
    console.log('Cart Items:');
    for (const item of this._cart) {
      console.log(`- ${item.name}: $${item.price}`);
    }
    console.log(`Cart Total: $${this.cartTotal()}`);
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

// instance of the Shop class
const shop = new Shop();
const user = new User('Cynthia', 18);

function addToCart(name: string, price: number): void {
  const item = shop.items.find((item) => item.name.toLowerCase() === name.toLowerCase() && item.price <= price);
  if (item) {
    user.addToCart(item);
    console.log(`Added ${item.name} to cart. Cart Total: $${user.cartTotal()}`);
  } else {
    console.log(`Item not found in the shop.`);
  }
}
//remove from cart function
function removeFromCart(name: string, price: number): void {
  const item = user.cart.find((item) => item.name.toLowerCase() === name.toLowerCase() && item.price <= price);
  if (item) {
    user.removeFromCart(item);
    console.log(`Removed ${item.name} from cart. Cart Total: $${user.cartTotal()}`);
  } else {
    console.log(`Item not found in the cart.`);
  }
}
//checkout
function checkout(): void {
  console.log(`Checking out...`);
  user.printCart();
  user.clearCart();
  console.log(`Cart cleared.`);
}




