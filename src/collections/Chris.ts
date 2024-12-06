export class Chris {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hey, I'm ${this.name} and I'm ${this.age} years old!`;
    }
}
