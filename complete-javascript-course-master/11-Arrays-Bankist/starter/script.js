'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ""

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type} ">${i+1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function (account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov)
  labelSumIn.textContent = `${incomes}€`
  
  const out = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
  labelSumOut.textContent = `${Math.abs(out)}€`
  
  const interest = account.movements.filter(mov => mov > 0).map(deposit => deposit * account.interestRate / 100).filter(int => int >= 1).reduce((acc, int) => acc + int)
  labelSumInterest.textContent = `${interest}€`
}

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
  })
}
createUserNames(accounts);

const updateInterface = function (acc) {
      // Display movements
      displayMovements(acc.movements)

      // Display balance__value
      calcDisplayBalance(acc)
      
      // Display summary
      calcDisplaySummary(acc)
}

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateInterface(currentAccount)
  }
})

btnTransfer.addEventListener("click", function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  console.log(receiverAcc, amount);

  if (amount > 0 && currentAccount.balance >= amount && receiverAcc && receiverAcc.username !== currentAccount.username) {
    // Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the interface
    updateInterface(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
})

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update the interface
    updateInterface(currentAccount);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
})

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
})

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////

// const arr = ["a", "b", "c", "d", "e"]

// // SLICE - doesn't mutate
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));

// // SPLICE - mutates og array
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(1, 2));
// console.log(arr);




// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i+1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// })

// currencies.forEach(function (value, key, map) {
//   console.log(key, value, map);
// })


// const currenciesUnique = new Set(["USD", "EUR", "GBP"])
// currenciesUnique.forEach(function (value, key, set) {
//   console.log(key, value, set);
// })

// Coding Challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.

// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// �
// ")
// 4. Run the function for both test datasets

// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// Hints: Use tools from all lectures in this section so far �

// GOOD LUCK �

// const julie1 = [3, 5, 2, 12, 7];
// const kate1 = [4, 1, 15, 8, 3];

// const julie2 = [9, 16, 6, 8, 3];
// const kate2 = [10, 5, 6, 1, 4];

// const checkDogs = function(julie, kate) {
//   const julieCopy = julie.slice(1, -2);
//   const allDogs = julieCopy.concat(kate);

//   allDogs.forEach(function(age, i) {
//     const isAdult = age >= 3
//     console.log(isAdult ? `Dog number ${i+1}
//     is an adult, and is ${age} years old` : `Dog number ${i+1} is still a puppy
//     �
//     `);
//   })
// }

// checkDogs(julie1, kate1);
// checkDogs(julie2, kate2);


// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.

// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK �

const data1 = [5, 2, 4, 1, 15, 8, 3]
const data2 = [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  function calcAge(age) {
    return age <= 2 ? 2 * age : 16 + 4 * age;
  }

  const humanAges = ages.map(x => calcAge(x))
  const adults = humanAges.filter(x => x >= 18)

  return adults.reduce((acc, x) => acc + x) / adults.length;
}

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2));


// Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK �

const calcAverageHumanAge2 = ages => {
  function calcAge(age) {
    return age <= 2 ? 2 * age : 16 + 4 * age;
  }
  
  return ages.map(calcAge).filter(x => x >= 18).reduce((acc, age, _, arr) => acc + age / arr.length, 0)
}

console.log(calcAverageHumanAge2(data1));
console.log(calcAverageHumanAge2(data2));


// Coding Challenge #4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).

// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)

// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.

// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

// Create recommended food attributes for the dog objects
dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));

// Helper function to check if the dog eats the right amount
// 1 --> too much, -1 --> too little, 0 --> the right amount
const foodAmount = function(obj) {
  if (obj.curFood >= 1.1 * obj.recommendedFood) {
    return 1;
  } else if (obj.curFood <= 0.9 * obj.recommendedFood) {
    return -1;
  } else {
    return 0;
  }
}

// Find Sarah's dog and log if he's eating too much or too little
const sarah = dogs.find(dog => dog.owners.includes("Sarah"));
const sarahFoodAmount = foodAmount(sarah);
if (sarahFoodAmount === 1) {
  console.log(`Sarah's dog eats too much`);
} else if (sarahFoodAmount === -1) {
  console.log(`Sarah's dog eats too little`);
} else {
  console.log(`Sarah's dog eats the right amount`);
}

// Arrays for owners whose dogs eat too much and little
const ownersTooMuch = dogs.filter(dog => foodAmount(dog) === 1)?.flatMap(dog => dog.owners)
const ownersTooLittle = dogs.filter(dog => foodAmount(dog) === -1)?.flatMap(dog => dog.owners)

// Log whose dogs eat too much whose too little
const logOwners = function (owners, amount) {
  console.log(`${owners.join(" and ")}'s dog eat too ${amount}!`);
}
logOwners(ownersTooMuch, "much");
logOwners(ownersTooLittle, "little");

// Log if anyone is eating the right amount
const anyEatingRightAmount = dogs.some(dog => dog.recommendedFood === dog.curFood);
console.log(`Statement - At least one of the dogs is eating the right amount: ${anyEatingRightAmount}`);

// Log if anyone is eating an okay amount
const anyEatingOkayAmount = dogs.some(dog => foodAmount(dog) === 0);
console.log(`Statement - At least one of the dogs is eating an okay amount: ${anyEatingOkayAmount}`);

// Create an array for dogs that are eating an okay amount of food
const dogsEatingRight = dogs.filter(dog => foodAmount(dog) === 0);
console.log(dogsEatingRight);

// Create a shallow copy of the dogs and sort the array by their recommended food amounts in ascending order
const sortedDogs = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood)
console.log(sortedDogs);






// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUSD = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUSD);
// console.log(movements);
// console.log(movementsUSD);

// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawals);

// const balance = movements.reduce(function(acc, cur, i, arr) {
//   return acc + cur
// }, 100)
// console.log(balance);

// // Maximum value
// const max = movements.reduce((acc, curr) => acc = Math.max(acc, curr))
// console.log(max);

// const totalDepositsUDS = movements.filter(mov => mov > 0).map(mov => mov * eurToUSD).reduce((acc, mov) => acc + mov);
// console.log(totalDepositsUDS);


// // ARRAY EXERCISES
// const randomDices = Array.from({length: 100}, () => Math.trunc(Math.random() * 6 + 1))
// console.log(randomDices);

// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
// console.log(bankDepositSum);

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, curr) => curr >= 1000 ? ++count : count, 0)
// console.log(numDeposits1000);

// const sums = accounts.flatMap(acc => acc.movements).reduce((sum, mov) => {
//   sum[mov > 0 ? 'deposits' : 'withdrawals'] += mov
//   return sum
// }, {deposits: 0, withdrawals: 0})
// console.log(sums);

// const convertTitleCase = function(title) {
//   const capitalize = word => word[0].toUpperCase() + word.slice(1)

//   const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

//   const words = title.toLowerCase().split(" ");
//   const titleCase = words.map(word => exceptions.includes(word) ? word : capitalize(word))
//   titleCase[0] = capitalize(titleCase[0])

//   return titleCase.join(" ")
// }
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('AND this is ALso A very nice senTEnce'));