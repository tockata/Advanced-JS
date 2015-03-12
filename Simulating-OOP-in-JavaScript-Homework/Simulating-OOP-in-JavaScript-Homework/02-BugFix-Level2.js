function Person(firstName, lastName) {
    this.fName = firstName;
    this.lName = lastName;
    this.wholeName = this.fName + " " + this.lName;

    Person.prototype.getFirstName = function() {
        return this.fName;
    };

    Person.prototype.setFirstName = function(firstName) {
        this.fName = firstName;
        this.wholeName = firstName + " " + this.lastName;
    };

    Person.prototype.getLastName = function() {
        return this.lName;
    };

    Person.prototype.setLastName = function(lastName) {
        this.lName = lastName;
        this.wholeName = this.fName + " " + lastName;
    };

    Person.prototype.getFullName = function() {
        return this.wholeName;
    };

    Person.prototype.setFullName = function(fullName) {
        this.wholeName = fullName;
        var names = fullName.split(" ");
        this.fName = names[0];
        this.lName = names[1];
    };

    Object.defineProperty(this, "firstName", {
        get: function () {
            return this.getFirstName();
        },
        set: function(firstName) {
             this.setFirstName(firstName);
        }
    });

    Object.defineProperty(this, "lastName", {
        get: function() {
             return this.getLastName();
        },
        set: function(lastName) {
             this.setLastName(lastName);
        }
    });

    Object.defineProperty(this, "fullName", {
        get: function() {
             return this.getFullName();
        },
        set: function(fullName) {
             this.setFullName(fullName);
        }
    });
}

var person = new Person("Peter", "Jackson");

// Getting values:
console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName);

// Changing values:
person.firstName = "Michael";
console.log(person.firstName);
console.log(person.fullName);
person.lastName = "Williams";
console.log(person.lastName);
console.log(person.fullName);

// Changing full name changes first and last names:
person.fullName = "Alan Marcus";
console.log(person.fullName);
console.log(person.firstName);
console.log(person.lastName);
