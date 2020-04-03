// Type JavaScript here and click "Run Code" or press Ctrl + s
//console.log('Hello, world!');


/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

/*** CHALLENGE 1 of 1 ***/

function makePerson(name, age) {
	var obj = {};
  obj["name"] = name;
  obj["age"] = age;
	return obj;

}

const vicky = makePerson('Vicky', 24);


// /********* Uncomment these lines to test your work! *********/
//console.log(vicky.name); // -> Logs 'Vicky'
//console.log(vicky.age); // -> Logs 24





/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

const personStore = {
	greet: () => console.log("hello")

};

// /********* Uncomment this line to test your work! *********/
//personStore.greet(); // -> Logs 'hello'



/*** CHALLENGE 2 of 3 ***/

function personFromPersonStore(name, age) {
	let obj = Object.create(personStore);
  obj.name = name;
  obj.age = age;
  return obj;

}

const sandra = personFromPersonStore('Sandra', 26);


// /********* Uncomment these lines to test your work! *********/
// console.log(sandra.name); // -> Logs 'Sandra'
// console.log(sandra.age); //-> Logs 26
// sandra.greet(); //-> Logs 'hello'



/*** CHALLENGE 3 of 3 ***/

// add code here
personStore.introduce = function () {
  console.log(`Hi, my name is ${this.name}`);
}


//sandra.introduce(); // -> Logs 'Hi, my name is Sandra'





/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

function PersonConstructor() {
	// add code here
  this.greet = () => console.log('hello');
}


// /********* Uncomment this line to test your work! *********/
const simon = new PersonConstructor;
//simon.greet(); // -> Logs 'hello'



/*** CHALLENGE 2 of 3 ***/

function personFromConstructor(name, age) {
	// add code here
	const person = new PersonConstructor();
  person.name = name;
  person.age = age;
  return person;

}

const mike = personFromConstructor('Mike', 30);


// /********* Uncomment these lines to test your work! *********/
// console.log(mike.name); // -> Logs 'Mike'
// console.log(mike.age); //-> Logs 30
// mike.greet(); //-> Logs 'hello'



/*** CHALLENGE 3 of 3 ***/
PersonConstructor.prototype.introduce = function() {
  console.log(`Hi, my name is ${this.name}`);
}

// mike.introduce(); // -> Logs 'Hi, my name is Mike'


/****************************************************************
                        USING ES6 CLASSES
****************************************************************/

/*** CHALLENGE 1 of 3 ***/

class PersonClass {
	
  // add code here

  constructor(name) {
    this.name = name;
  }

  // add code here

  greet() {
    console.log('hello');
  }


}


// /********* Uncomment this line to test your work! *********/
const george = new PersonClass;
// george.greet(); // -> Logs 'hello'



/*** CHALLENGE 2 of 3 ***/

// add code here
class DeveloperClass extends PersonClass {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  introduce() {
    console.log(`Hello World, my name is ${this.name}`)
  }
}


// /********* Uncomment these lines to test your work! *********/
//const thai = new DeveloperClass('Thai', 32);
//console.log(thai.name); // -> Logs 'Thai'
//thai.introduce(); //-> Logs 'Hello World, my name is Thai'
//thai.greet(); 


/****************************************************************
                      EXTENSION: SUBCLASSING
****************************************************************/

const userFunctionStore = {
  sayType: function() {
    console.log("I am a " + this.type);
  }
}

function userFactory(name, score) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

const adminFunctionStore =  Object.create(userFunctionStore, {
  sharePublicMessage: {
    value: function() {
      console.log("Welcome users!");
    }
  }
});

function adminFactory(name, score) {
  let adminDefault = userFactory.call(this, name, score);
  let admin = Object.create(adminFunctionStore, {
    name: {
      value: name
    },
    score: {
      value: score
    }
  });
  
  admin.type = "Admin";
  return admin;
}



/* Put code here for a method called sharePublicMessage*/

const adminFromFactory = adminFactory("Eva", 5);

// /********* Uncomment these lines to test your work! *********/
adminFromFactory.sayType() // -> Logs "I am a Admin"
adminFromFactory.sharePublicMessage() // -> Logs "Welcome users!"


/****************************************************************
EXTENSION: MIXINS
****************************************************************/

class Dog {
  constructor() {
    this.legs = 4;
  }
  speak() {
    console.log('Woof!');
  }
}

const robotMixin = {
  skin: 'metal',
  speak: function() { console.log(`I have ${this.legs} legs and am made of ${this.skin}`) },
}

let robotFido = new Dog();

robotFido =	Object.assign(robotFido, robotMixin);

// /********* Uncomment to test your work! *********/
robotFido.speak() // -> Logs "I am made of metal"

