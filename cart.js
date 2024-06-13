
const Cart = function () {
  this.goods = [];
  this.totalPrice = 0;
  this.count = 0;
};

Cart.prototype = {
  getTotalPrice: function () {
    return this.totalPrice;
  },
  addGoods: function (nameProduct, priceProduct, countProduct = 1) {
    this.increaseCount(countProduct);
    return this.goods.push({nameProduct, priceProduct, countProduct});
  },
  increaseCount: function (countProduct) {
    this.count += countProduct;
  },
  calculateGoodPrice: function () {
    this.totalPrice = this.goods.reduce((acc, item) => acc + item.countProduct * item.priceProduct, 0);
  },
  clear: function () {
    this.goods = [];
    this.totalPrice = 0;
    this.count = 0;
  },
  print: function () {
    console.log('Ваша корзина:');
    const cloneItems = JSON.stringify(this.goods);
    
    // вывод в виде таблицы
    const summaryTable = JSON.parse(cloneItems);
    for (const element of summaryTable) {
      const iterableEl = Object.values(element);
      const [, priceProduct, countProduct] = iterableEl;
      element.sum = priceProduct * countProduct;
    }
    
    const nameProduct = 'Общая стоимость';
    const sum = this.getTotalPrice();
    summaryTable.push({nameProduct, sum});
    console.table(summaryTable);
  }
}

const cart = new Cart();

cart.addGoods('Телефон', 10000, 2);
cart.addGoods('Компьютер', 70000);
cart.addGoods('Телевизор', 50000);
cart.addGoods('Настольная игра', 3500, 3);

// cart.calculateGoodPrice();
//
// console.log(cart);
//
// cart.print();
//
// cart.clear();

const Goods = function (goods = [], name = '', price = 0, discount = 1) {
  this.goods = goods;
  this.name = name;
  this.price = price;
  this.discount = discount;
}

Goods.prototype = {
  addGoods: function (name, price, discount = 1, calories) {
    return this.goods.push({name, price, discount});
  },
  print: function () {
    console.log('Ваша корзина:');
    const goods = JSON.stringify(this.goods)
    console.log(goods);
  }
}

const FoodGoods = function (name, price, discount, calories) {
  Goods.apply(this, arguments);
  this.calories = calories;
}

FoodGoods.prototype = {
  addGoods: function (name, price, discount = 1, calories) {
    return this.goods.push({name, price, discount, calories});
  },
}

Object.setPrototypeOf(FoodGoods.prototype, Goods.prototype)

const ClothingGoods = function (name, price, discount, material) {
  Goods.apply(this, arguments);
  this.material = material;
}

ClothingGoods.prototype = {
  addGoods: function (name, price, discount = 1, material) {
    return this.goods.push({name, price, discount, material});
  },
}

Object.setPrototypeOf(ClothingGoods.prototype, Goods.prototype)

const TechnicsGoods = function (name, price, discount, type) {
  Goods.apply(this, arguments);
  this.material = type;
}

TechnicsGoods.prototype = {
  addGoods: function (name, price, discount = 1, type) {
    return this.goods.push({name, price, discount, type});
  },
}

Object.setPrototypeOf(TechnicsGoods.prototype, Goods.prototype)

const foodGoods = new FoodGoods()
foodGoods.addGoods('Сыр', 500, 0.8, 200)
foodGoods.print()

const clothingGoods = new ClothingGoods()
clothingGoods.addGoods('Джинсы', 500, 0.8, 'Хлопок')

clothingGoods.print()

const good = new TechnicsGoods()
good.addGoods('Телевизор', 500, 0.8, 'Видео')

good.print()

