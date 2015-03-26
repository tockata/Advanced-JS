function processTrainingCenterCommands(commands) {
    
    'use strict';
    
    var trainingcenter = (function () {
        
        var TrainingCenterEngine = (function () {
            
            var _trainers;
            var _uniqueTrainerUsernames;
            var _trainings;
            
            function initialize() {
                _trainers = [];
                _uniqueTrainerUsernames = {};
                _trainings = [];
            }
            
            function executeCommand(command) {
                var cmdParts = command.split(' ');
                var cmdName = cmdParts[0];
                var cmdArgs = cmdParts.splice(1);
                switch (cmdName) {
                    case 'create':
                        return executeCreateCommand(cmdArgs);
                    case 'list':
                        return executeListCommand();
                    case 'delete':
                        return executeDeleteCommand(cmdArgs);
                    default:
                        throw new Error('Unknown command: ' + cmdName);
                }
            }
            
            function executeCreateCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var createArgs = cmdArgs.splice(1).join(' ');
                var objectData = JSON.parse(createArgs);
                var trainer;
                switch (objectType) {
                    case 'Trainer':
                        trainer = new trainingcenter.Trainer(objectData.username, objectData.firstName, 
                            objectData.lastName, objectData.email);
                        addTrainer(trainer);
                        break;
                    case 'Course':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var course = new trainingcenter.Course(objectData.name, objectData.description, trainer,
                            parseDate(objectData.startDate), objectData.duration);
                        addTraining(course);
                        break;
                    case 'Seminar':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var seminar = new trainingcenter.Seminar(objectData.name, objectData.description, 
                            trainer, parseDate(objectData.date));
                        addTraining(seminar);
                        break;
                    case 'RemoteCourse':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var remoteCourse = new trainingcenter.RemoteCourse(objectData.name, objectData.description,
                            trainer, parseDate(objectData.startDate), objectData.duration, objectData.location);
                        addTraining(remoteCourse);
                        break;
                    default:
                        throw new Error('Unknown object to create: ' + objectType);
                }
                return objectType + ' created.';
            }
            
            function findTrainerByUsername(username) {
                if (!username) {
                    return undefined;
                }
                for (var i = 0; i < _trainers.length; i++) {
                    if (_trainers[i].getUsername() == username) {
                        return _trainers[i];
                    }
                }
                throw new Error("Trainer not found: " + username);
            }
            
            function addTrainer(trainer) {
                if (_uniqueTrainerUsernames[trainer.getUsername()]) {
                    throw new Error('Duplicated trainer: ' + trainer.getUsername());
                }
                _uniqueTrainerUsernames[trainer.getUsername()] = true;
                _trainers.push(trainer);
            }
            
            function addTraining(training) {
                _trainings.push(training);
            }
            
            function executeListCommand() {
                var result = '', i;
                if (_trainers.length > 0) {
                    result += 'Trainers:\n' + ' * ' + _trainers.join('\n * ') + '\n';
                } else {
                    result += 'No trainers\n';
                }
                
                if (_trainings.length > 0) {
                    result += 'Trainings:\n' + ' * ' + _trainings.join('\n * ') + '\n';
                } else {
                    result += 'No trainings\n';
                }
                
                return result.trim();
            }
            
            function executeDeleteCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var deleteArgs = cmdArgs.splice(1).join(' ');
                switch (objectType) {
                    case 'Trainer':
                        if (!_uniqueTrainerUsernames[deleteArgs]) {
                            throw new Error('Cannot delete missing trainer: ' + deleteArgs);
                        }
                        
                        delete _uniqueTrainerUsernames[deleteArgs];
                        
                        _trainers = _trainers.filter(function (trainer) {
                            return trainer.getUsername() !== deleteArgs;
                        });
                        
                        _trainings.forEach(function (training) {
                            training.setTrainer(undefined);
                        });
                        break;
                    default:
                        throw new Error('Unknown object to delete: ' + objectType);
                }
                return objectType + ' deleted.';
            }
            
            var trainingCenterEngine = {
                initialize: initialize,
                executeCommand: executeCommand
            };
            return trainingCenterEngine;
        }());
        
        Object.prototype.extends = function (parent) {
            if (!Object.create) {
                Object.create = function (proto) {
                    function F() { }                    ;
                    F.prototype = proto;
                    return newF;
                };
            }            ;
            
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        }
        
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var validators = {
            validateNonEmptyString: function (value, variableName) {
                if (typeof (value) != 'string' || !value) {
                    throw new Error(variableName + ' should be non-empty string.');
                }
            },
            validateEmail: function (email) {
                if (typeof (email) != 'string') {
                    throw new Error("Email should be a string. Invalid value: " + value);
                }
                if (email.indexOf('@') == -1) {
                    throw new Error('Email should contain @ character.');
                }
            },
            validateDate: function (date) {
                var MIN_DATE = parseDate('1-Jan-2000');
                var MAX_DATE = parseDate('31-Dec-2020');
                
                if (typeof (date) != 'object' || !(date instanceof Date)) {
                    throw new Error("Date should be a Date object. Invalid value: " + date);
                }
                if (isNaN(date.getTime())) {
                    throw new Error("Date should be a valid date. Invalid value: " + date);
                }
                
                if (date.getTime() < MIN_DATE.getTime() || MAX_DATE.getTime() < date.getTime()) {
                    throw new Error('Invalid date.');
                }
            },
            validateDuration: function (duration) {
                if (typeof (duration) != 'number') {
                    throw new Error("Duration should be a number. Invalid value: " + value);
                }
                if (duration !== parseInt(duration, 10)) {
                    throw new Error("Duration should be an integer. Invalid value: " + value);
                }
                
                if (duration < 1 || 99 < duration) {
                    throw new Error('Duration must be in range [1...99]');
                }
            },
            validateNumberOfArguments: function (args, expectedArgumentsCount, className) {
                if (args.length != expectedArgumentsCount) {
                    throw new Error(className + "`s constructor expects " + expectedArgumentsCount + 'arguments.');
                }
            },
            validateNonEmptyObject: function (value, variableName, className) {
                if (!(value instanceof className)) {
                    throw new Error(variableName + " should be a non-empty " +
                        className.prototype.constructor.name + ". Invalid value: " + value);
                }
            },
            isNullOrUndefined: function (value) {
                return (typeof (value) == 'undefined') || (value == null);
            }
        }
        
        var Trainer = (function () {
            function Trainer(username, firstName, lastName, email) {
                this.setUsername(username);
                this.setFirstName(firstName);
                this.setLastName(lastName);
                this.setEmail(email);
            }
            
            Trainer.prototype.setUsername = function (username) {
                validators.validateNonEmptyString(username, 'Username');
                this._username = username;
            };
            
            Trainer.prototype.getUsername = function () {
                return this._username;
            };
            
            Trainer.prototype.setFirstName = function (firstName) {
                if (!validators.isNullOrUndefined(firstName)) {
                    validators.validateNonEmptyString(firstName, 'First name');
                    this._firstName = firstName;
                } else {
                    delete this._firstName;
                }
            };
            
            Trainer.prototype.getFirstName = function () {
                return this._firstName;
            };
            
            Trainer.prototype.setLastName = function (lastName) {
                validators.validateNonEmptyString(lastName, 'Last name');
                this._lastName = lastName;
            };
            
            Trainer.prototype.getLastName = function () {
                return this._lastName;
            };
            
            Trainer.prototype.setEmail = function (email) {
                if (!validators.isNullOrUndefined(email)) {
                    validators.validateEmail(email);
                    this._email = email;
                } else {
                    delete this._email;
                }
            };
            
            Trainer.prototype.getEmail = function () {
                return this._email;
            };
            
            Trainer.prototype.toString = function () {
                var fName = '',
                    email = '';
                
                if (this._firstName) {
                    fName = ';first-name=' + this._firstName;
                }
                
                if (this._email) {
                    email = ';email=' + this._email;
                }
                
                return 'Trainer[username=' + this._username + fName +
                    ';last-name=' + this._lastName + email + ']';
            }
            
            return Trainer;
        }());
        
        
        var Training = (function () {
            function Training(name, description, trainer, startDate, duration) {
                if (this.constructor === Training) {
                    throw new Error("Can't instantiate Training class!");
                }
                
                this.setName(name);
                this.setDescription(description);
                this.setTrainer(trainer);
                this.setStartDate(startDate);
                this.setDuration(duration);
            }
            
            Training.prototype.setName = function (name) {
                validators.validateNonEmptyString(name, 'Training name');
                this._name = name;
            }
            
            Training.prototype.getName = function () {
                return this._name;
            }
            
            Training.prototype.setDescription = function (description) {
                if (!validators.isNullOrUndefined(description)) {
                    validators.validateNonEmptyString(description, 'Training description');
                    this._description = description;
                } else {
                    delete this._description;
                }
            }
            
            Training.prototype.getDescription = function () {
                return this._description;
            }
            
            Training.prototype.setTrainer = function (trainer) {
                if (!validators.isNullOrUndefined(trainer)) {
                    validators.validateNonEmptyObject(trainer, "trainer", Trainer);
                    this._trainer = trainer;
                } else {
                    delete this._trainer;
                }
            }
            
            Training.prototype.getTrainer = function () {
                return this._trainer;
            }
            
            Training.prototype.setStartDate = function (startDate) {
                validators.validateDate(startDate);
                this._startDate = startDate;
            }
            
            Training.prototype.getStartDate = function () {
                return this._startDate;
            }
            
            Training.prototype.setDuration = function (duration) {
                if (!validators.isNullOrUndefined(duration)) {
                    validators.validateDuration(duration);
                    this._duration = duration;
                } else {
                    delete this._duration;
                }
            }
            
            Training.prototype.getDuration = function () {
                return this._duration;
            }
            
            Training.prototype.toString = function () {
                var description = '', 
                    trainer = '', 
                    duration = '',
                    startDate = this.getStartDate().getDate() + '-' +
                        monthNames[this.getStartDate().getMonth()] + '-' +
                        this.getStartDate().getFullYear();
                
                if (this._description) {
                    description = ';description=' + this._description;
                }
                
                if (this._trainer) {
                    trainer = ';trainer=' + this._trainer;
                }
                
                if (this._duration) {
                    duration = ';duration=' + this._duration;
                }
                
                return this.constructor.name +
                    '[name=' + this.getName() + description + trainer +
                    ';start-date=' + startDate + duration;
            }
            
            return Training;
        }());
        
        
        var Course = (function () {
            function Course(name, description, trainer, startDate, duration) {
                Training.call(this, name, description, trainer, startDate, duration);
            }
            
            Course.extends(Training);
            
            Course.prototype.toString = function () {
                return Training.prototype.toString.call(this) + ']';

            }
            
            return Course;
        }());
        
        
        var Seminar = (function () {
            function Seminar(name, description, trainer, startDate) {
                Training.call(this, name, description, trainer, startDate, 1);
            }
            
            Seminar.extends(Training);
            
            Seminar.prototype.toString = function () {
                var seminar = Training.prototype.toString.call(this);
                seminar = seminar.replace('start-date', 'date');
                seminar = seminar.substring(0, seminar.length - 11);
                seminar += ']';
                
                return seminar;
            }
            
            return Seminar;
        }());
        
        
        var RemoteCourse = (function () {
            function RemoteCourse(name, description, trainer, startDate, duration, location) {
                Training.call(this, name, description, trainer, startDate, duration);
                this.setLocation(location);
            }
            
            RemoteCourse.extends(Training);
            
            RemoteCourse.prototype.setLocation = function (location) {
                validators.validateNonEmptyString(location, 'Location');
                this._location = location;
            }
            
            RemoteCourse.prototype.getLocation = function () {
                return this._location;
            }
            
            RemoteCourse.prototype.toString = function () {
                return Training.prototype.toString.call(this) +
                    ';location=' + this.getLocation() + ']';

            }
            
            return RemoteCourse;
        }());
        
        
        var trainingcenter = {
            Trainer: Trainer,
            Course: Course,
            Seminar: Seminar,
            RemoteCourse: RemoteCourse,
            engine: {
                TrainingCenterEngine: TrainingCenterEngine
            }
        };
        
        return trainingcenter;
    })();
    
    
    var parseDate = function (dateStr) {
        if (!dateStr) {
            return undefined;
        }
        var date = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
        var dateFormatted = formatDate(date);
        if (dateStr != dateFormatted) {
            throw new Error("Invalid date: " + dateStr);
        }
        return date;
    }
    
    
    var formatDate = function (date) {
        var day = date.getDate();
        var monthName = date.toString().split(' ')[1];
        var year = date.getFullYear();
        return day + '-' + monthName + '-' + year;
    }
    
    
    // Process the input commands and return the results
    var results = '';
    trainingcenter.engine.TrainingCenterEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != '') {
            try {
                var cmdResult = trainingcenter.engine.TrainingCenterEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
                //console.log(err.stack);
                results += 'Invalid command.\n';
            }
        }
    });
    return results.trim();
}


// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function () {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function (line) {
                arr.push(line);
            }).on('close', function () {
                console.log(processTrainingCenterCommands(arr));
            });
    }
})();
