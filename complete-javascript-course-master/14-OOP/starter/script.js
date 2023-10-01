'use strict';

// const Person = function(firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }

// const me = new Person("Aleks", 1999);
// console.log(me);

// Person.prototype.calcAge = function() {
//   console.log(2037 - this.birthYear);
// }

// Person.prototype.species = "Homo Sapiens";

// me.calcAge();
// console.log(me.species);
// console.log(me.__proto__);
// console.log(me.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [1, 4, 3, 6, 8, 4, 2, 4];

// // Don't do this
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector("h1");


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function(make, speed) {
//   this.make = make;
//   this.speed = speed;
// }

// Car.prototype.accelerate = function() {
//   this.speed += 10;
//   console.log(this.speed);
// }

// Car.prototype.brake = function() {
//   this.speed -= 5;
//   console.log(this.speed);
// }

// const bmw = new Car("BMW", 120);
// bmw.brake();
// bmw.accelerate();

// const mercedes = new Car("Mercedes", 95);
// mercedes.accelerate();
// mercedes.brake();


// Class expressions
// const PersonCL = class {}

// Class declaration
// class PersonCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(" ")) this._fullName = name;
//     else alert(`${name} is not a full name!`)
//   }

//   get fullName() {
//     return this._fullName;
//   }
// }

// const jessica = new PersonCL("Jessica Johnson", 1996);
// console.log(jessica);
// jessica.calcAge();
// jessica.fullName = "Jessica Davis";
// console.log(jessica.fullName);




// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode


// const account = {
//   owner: "Aleks",
//   movements: [200, 54, 76, 123],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// }

// console.log(account.latest);
// account.latest = 68;
// console.log(account.latest);


// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
// }

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = "Steven";
// steven.birthYear = "2002";
// steven.calcAge();


///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(newSpeed) {
//     this.speed = 1.6 * newSpeed;
//   }
// }

// const porsche = new Car("Porsche", 150);
// porsche.accelerate();
// porsche.brake();
// console.log(porsche.speedUS);
// porsche.speedUS = 100;
// console.log(porsche.speedUS);


// const Person = function(firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }

// Person.prototype.calcAge = function() {
//   console.log(2037 - this.birthYear);
// }

// const Student = function(firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// }

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function() {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// }

// const mike = new Student("Mike", 2020, "Computer Science")
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__.__proto__);
// console.log(mike instanceof Student);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);



///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function(make, speed) {
//   this.make = make;
//   this.speed = speed;
// }

// Car.prototype.accelerate = function() {
//   this.speed += 10;
//   console.log(this.speed);
// }

// Car.prototype.brake = function() {
//   this.speed -= 5;
//   console.log(this.speed);
// }

// const EV = function(make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// }

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeBattery = function(chargeTo) {
//   this.charge = Math.min(100, chargeTo);
//   console.log(`Current charge: ${this.charge}%`);
// }

// EV.prototype.accelerate = function() {
//   this.speed += 20;
//   this.charge--;
//   console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
// }

// const tesla = new EV("Tesla", 120, 23);
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(50);
// tesla.accelerate();


// // Class declaration
// class PersonCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(" ")) this._fullName = name;
//     else alert(`${name} is not a full name!`)
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   static hey() {
//     console.log("Hey there!");
//   }
// }

// class StudentCL extends PersonCL {
//   constructor(fullName, birthYear, course) {
//     // Always need to be first!
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}.`);
//   }

//   calcAge() {
//     console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2047 - this.birthYear} years old.`);
//   }
// }

// const martha = new StudentCL("Martha Jones", 2012, "Industrial Engineering");
// martha.introduce();
// martha.calcAge();
// PersonCL.hey();


// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
// }

// const steven = Object.create(PersonProto);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function(firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// }

// StudentProto.introduce = function() {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// }

// const jay = Object.create(StudentProto);
// jay.init("Jay", 2010, "Data Science");
// jay.introduce();
// jay.calcAge();

// New classes
// Public / private fields
// Public / private methods

// class Account {
//   // 1) Public fields
//   locale = navigator.language;


//   // 2) Private fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     // Protected
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }


//   // 3) Public methods
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(amount) {
//     this.#movements.push(amount);
//     return this;
//   }

//   withdraw(amount) {
//     this.deposit(-amount);
//     return this;
//   }

//   requestLoan(val) {
//     // if (this.#approveLoan(val)) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved.`);
//     }
//     return this;
//   }

//   // 4) Private methods
//   // #approveLoan(val) {
//   _approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account("Aleks", "EUR", 1111);
// acc1.deposit(150);
// acc1.withdraw(70);
// acc1.requestLoan(1000);
// console.log(acc1.getMovements());
// console.log(acc1);

// acc1.deposit(500).deposit(200).withdraw(420).requestLoan(5000).withdraw(2000);

// console.log(acc1.getMovements());


///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(newSpeed) {
    this.speed = 1.6 * newSpeed;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = Math.min(100, chargeTo);
    console.log(`Current charge: ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
