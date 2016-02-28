# classjs
JS class implementation

Demo: [https://jsfiddle.net/andunai/uuak7cgh/](https://jsfiddle.net/andunai/uuak7cgh/)

# Example

### JavaScript

```js
var Animal = new Class({
    $name: 'Animal',

    name: 'Unknown',
    age: 0,
    
    $constructor: function(name, age) {
        this.name = name;
        this.age = age;
    },
    
    getName: function() {
        return 'An animal named ' + this.name;
    }
});

var Cat = new Class(Animal, {
    $name: 'Cat',
    
    getName: function() {
        return 'A cat named ' + this.name;
    }
});

var Dog = new Class(Animal, {
    $name: 'Dog',
    
    aggression: null,
    
    $constructor: function(name, age, aggression) {
        this.parent.$constructor.call(this, name, age);
        this.aggression = aggression;
    },
    
    getName: function() {
        return (
            this.aggression ? 'An aggressive dog' : 'A dog'
        ) + ' named ' + this.name;
    }

});

var cat1 = new Cat('Joey', 5);
var cat2 = new Cat('Mandriva', 3);
var dog1 = new Dog('Bob', 8, false);
var dog2 = new Dog('Mary', 6, true);
var turtle = new Animal('Zoey', 42);

console.log(cat1.getName());
console.log(cat2.getName());
console.log(dog1.getName());
console.log(dog2.getName());
console.log(turtle.getName());

console.log('cat1 instanceof Cat =', cat1 instanceof Cat);
console.log('cat1 instanceof Animal =', cat1 instanceof Animal);
console.log('cat1 instanceof Dog =', cat1 instanceof Dog);
console.log('turtle instanceof Animal =', turtle instanceof Animal);
console.log('Dog instanceof Class =', Dog.class instanceof Animal);

console.log('cat1.$chain() =', cat1.$chain());
console.log('cat1.$dump():');
cat1.$dump();

```

### Output

```
A cat named Joey
A cat named Mandriva
A dog named Bob
An aggressive dog named Mary
An animal named Zoey
cat1 instanceof Cat = true
cat1 instanceof Animal = true
cat1 instanceof Dog = false
turtle instanceof Animal = true
Dog instanceof Class = false
cat1.$chain() = [object Object],[object Object],[object Object]
cat1.$dump():
Cat <- Animal <- [object Object]
```
