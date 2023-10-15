const Tuple = (function() {
    function Tuple() {
        // Tuple needs at least one element
        if (arguments.length < 1) {
            throw new Error('Tuple needs at least one element');
        }

        const args = { ...arguments };

        // Define a length property (equal to the number of arguments provided)
        Object.defineProperty(this, 'length', {
            value: arguments.length,
            writable: false
        });

        // Assign values to enumerable properties
        for (let i in args) {
            Object.defineProperty(this, i, {
                enumerable: true,
                get() {
                    return args[+i];
                },
                // Checking if the type of the provided value matches that of the existing value
                set(value) {
                    if (typeof value !== typeof args[+i]) {
                        throw new Error('Cannot assign ' + typeof value + ' on ' + typeof args[+i]);
                    }

                    args[+i] = value;
                }
            });
        }

        // Implementing iteration with Symbol.iterator (allows for array destructuring as well for...of loops)
        this[Symbol.iterator] = function() {
            const tuple = this;

            return {
                current: 0,
                last: tuple.length - 1,
                next() {
                    if (this.current <= this.last) {
                        let val = { done: false, value: tuple[this.current] };
                        this.current++;
                        return val;
                    } else {
                        return { done: true };
                    }
                }
            };
        };

        // Sealing the object to make sure no more values can be added to tuple
        Object.seal(this);
    }

    // check if provided object is a tuple
    Tuple.isTuple = function(obj) {
        return obj instanceof Tuple;
    };

    // Misc. for making the tuple more readable when printing to the console
    Tuple.prototype.toString = function() {
        const copyThis = { ...this };
        const values = Object.values(copyThis);
        return `(${values.join(', ')})`;
    };

    // conctat two instances of Tuple
    Tuple.concat = function(obj1, obj2) {
        if (!Tuple.isTuple(obj1) || !Tuple.isTuple(obj2)) {
            throw new Error('Cannot concat Tuple with ' + typeof (obj1 || obj2));
        }

        const obj1Copy = { ...obj1 };
        const obj2Copy = { ...obj2 };

        const obj1Items = Object.values(obj1Copy);
        const obj2Items = Object.values(obj2Copy);

        return new Tuple(...obj1Items, ...obj2Items);
    };

    return Tuple;
})();

const SNAKE_COLOR = new Tuple(0, 220, 10);

const [red, green, blue] = SNAKE_COLOR;
console.log(green); // => 220
