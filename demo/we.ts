
class Vehicle {
  name: string;

  constructor(name: string,) {
    this.name = name;
  }

  vehicle1(): string {
    return `Hi, my name is ${this.name} and I am years old.`;
  }

  
  vehicle2(): string {
    return `Hi, my name is ${this.name} and I am } years old.`;
  }
}


class Car {
  name: string;
  age: number;

  constructor(name: string) {
    this.name = name;
    this.age = 29;
  }

  method1(): Vehicle {
    return new Vehicle(this.name);
  }

  
  method2(): string {
    return `Hi, my name is ${this.name} and I am } years old.`;
  }
}

// Define a class
export class Student {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }

  
  greet1(): Car {
    //let x:Car = new Car(this.name);
    //return x;
    return new Car("Toyoto");
  }

    greet2(): string {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }
}
import { Student } from '../we';

console.log('This is a demo file for browser environment.');







// Declare a variable of type Student
let student1: Student;


// Create an instance of the class
student1 = new Student("Prabhu", 35);


let r:string = new Student("Prabhu", 35).greet1().method1().vehicle2();

student1.greet1().method1().vehicle2();

let a:Car = student1.greet1();
let b:Vehicle = a.method1();
b.vehicle2();






console.log(student1.greet());
// Output: Hi, my name is Prabhu and I am 35 years old.
let y:Car = student1.greet1()
y.method1()
y.method2()
student1.greet().concat(' Hello!');
student1.greet1().method1()