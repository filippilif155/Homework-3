// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// CHALLENGE 1

function sumFunc(arr) {
  // YOUR CODE HERE
	let i = 0;
  for(let x = 0; x < arr.length; x++){
    i+=arr[x];
  }
  return i;
}

// Uncomment the lines below to test your work
//const array = [1, 2, 3, 4];
//console.log(sumFunc(array)); // -> should log 10

function returnIterator(arr) {
  var iterator = 0;
	var len = arr.length;
  return () => arr[iterator++];
  
  
}

// Uncomment the lines below to test your work
// const array2 = ['a', 'b', 'c', 'd'];
// const myIterator = returnIterator(array2);
// console.log(myIterator()); // -> should log 'a'
// console.log(myIterator()); // -> should log 'b'
// console.log(myIterator()); // -> should log 'c'
// console.log(myIterator()); // -> should log 'd'



// CHALLENGE 2

function nextIterator(arr) {
	let i = 0;
  return {
    next: () => arr[i++]
  }
  
}

// Uncomment the lines below to test your work
//const array3 = [1, 2, 3];
//const iteratorWithNext = nextIterator(array3);
//console.log(iteratorWithNext.next()); // -> should log 1
//console.log(iteratorWithNext.next()); // -> should log 2
//console.log(iteratorWithNext.next()); // -> should log 3


// CHALLENGE 3

function sumArray(arr) {
  // YOUR CODE HERE
  // use your nextIterator function
  let x = 0;
  const iterate = nextIterator(arr);
  for (let i = 0; i < arr.length; i++) {
    x += iterate.next();
  }
  return x;

}

// Uncomment the lines below to test your work
//const array4 = [1, 2, 3, 4];
//console.log(sumArray(array4)); // -> should log 10



// CHALLENGE 4

function setIterator(set) {
  // YOUR CODE HERE
	let i = set.values();
  
  return {
    next: () => i.next().value
  };
}

// Uncomment the lines below to test your work
//const mySet = new Set('hey');
//const iterateSet = setIterator(mySet);
// console.log(iterateSet.next()); // -> should log 'h'
// console.log(iterateSet.next()); // -> should log 'e'
// console.log(iterateSet.next()); // -> should log 'y'



// CHALLENGE 5

function indexIterator(arr) {
  // YOUR CODE HERE
  let i = 0;
  return {
    next: () => [i++, arr[i]]
  }
}

// Uncomment the lines below to test your work
// const array5 = ['a', 'b', 'c', 'd'];
// const iteratorWithIndex = indexIterator(array5);
// console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
// console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
// console.log(iteratorWithIndex.next()); // -> should log [2, 'c']



// CHALLENGE 6

function Words(string) {
  this.str = string;
  return this.str.split(" ");
}

Words.prototype[Symbol.iterator] = function() {
  // YOUR CODE HERE
	let i = 0;
  return {
    next: () => this[i++]
  };
}

// Uncomment the lines below to test your work
//const helloWorld = new Words('Hello World');
//for (let word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'


// CHALLENGE 7

function valueAndPrevIndex(array){
    let x = 0;
    return {
      sentence: () => {
        if(x === 0){
          return  `${array[x++]} is the first element`
        }
        else{
          return `${array[x++]} was found after index ${x-2}`
        }
      }
    }
  
  }
  
  //const returnedSentence = valueAndPrevIndex([4,5,6])
  //console.log(returnedSentence.sentence());
  //console.log(returnedSentence.sentence());
  //console.log(returnedSentence.sentence());
  
//CHALLENGE 8

function* createConversation(str) {
	let x;
  if (str === "english") {
    x = "hello there";
  } else {
    x = "gibberish";
  }
  
	yield setInterval(() => console.log(x), 3000);
}

//createConversation('english').next();



//CHALLENGE 9
function waitForVerb(noun) {
  let x = " toys";
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(noun + x), 3000);
  })
}

async function f(noun) {
  const data = await waitForVerb(noun);
  console.log(data);
}
//test
//f("dog");


