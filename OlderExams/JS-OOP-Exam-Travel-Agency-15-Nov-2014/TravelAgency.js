function processTravelAgencyCommands(commands) {
    'use strict';

    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    }

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var Models = (function () {
        var Destination = (function () {
            function Destination(location, landmark) {
                this.setLocation(location);
                this.setLandmark(landmark);
            }

            Destination.prototype.getLocation = function () {
                return this._location;
            }

            Destination.prototype.setLocation = function (location) {
                if (location === undefined || location === "") {
                    throw new Error("Location cannot be empty or undefined.");
                }
                this._location = location;
            }

            Destination.prototype.getLandmark = function () {
                return this._landmark;
            }

            Destination.prototype.setLandmark = function (landmark) {
                if (landmark === undefined || landmark == "") {
                    throw new Error("Landmark cannot be empty or undefined.");
                }
                this._landmark = landmark;
            }

            Destination.prototype.toString = function () {
                return this.constructor.name + ": " +
                    "location=" + this.getLocation() +
                    ",landmark=" + this.getLandmark();
            }

            return Destination;
        }());

        var Travel = (function () {
            function Travel(name, startDate, endDate, price) {
                if (this.constructor === Travel) {
                    throw new Error('Cannot instantiate abstract class Travel.');
                }
                this.setName(name);
                this.setStartDate(startDate);
                this.setEndDate(endDate);
                this.setPrice(price);
            }

            Travel.prototype.getName = function () {
                return this._name;
            }

            Travel.prototype.setName = function (name) {
                if (name === undefined || name === "") {
                    throw new Error("Travel name cannot be empty or undefined.");
                }
                this._name = name;
            }

            Travel.prototype.getStartDate = function () {
                return this._startDate;
            }

            Travel.prototype.setStartDate = function (startDate) {
                if (typeof (startDate) != 'object' || !(startDate instanceof Date)) {
                    throw new Error("Start date should be a Date object. Invalid value: " + startDate);
                }
                this._startDate = startDate;
            }

            Travel.prototype.getEndDate = function () {
                return this._endDate;
            }

            Travel.prototype.setEndDate = function (endDate) {
                if (typeof (endDate) != 'object' || !(endDate instanceof Date)) {
                    throw new Error("Start date should be a Date object. Invalid value: " + endDate);
                }
                this._endDate = endDate;
            }

            Travel.prototype.getPrice = function () {
                return this._price;
            }

            Travel.prototype.setPrice = function (price) {
                if (typeof (price) != 'number' || price < 0 || isNaN(price)) {
                    throw new Error("Travel price should be positive number. Invalid value: " + price);
                }
                this._price = price;
            }

            Travel.prototype.toString = function () {
                var startDate = this.getStartDate().getDate() + '-' +
                        monthNames[this.getStartDate().getMonth()] + '-' +
                        this.getStartDate().getFullYear();
                var endDate = this.getEndDate().getDate() + '-' +
                        monthNames[this.getEndDate().getMonth()] + '-' +
                        this.getEndDate().getFullYear();

                return " * " + this.constructor.name + ": " +
                    "name=" + this.getName() +
                    ",start-date=" + startDate +
                    ",end-date=" + endDate +
                    ",price=" + this.getPrice().toFixed(2);
            }

            return Travel;
        }());

        var Excursion = (function () {
            function Excursion(name, startDate, endDate, price, transport) {
                Travel.call(this, name, startDate, endDate, price);
                this.setTransport(transport);
                this._destinations = [];
            }

            Excursion.extends(Travel);

            Excursion.prototype.getTransport = function () {
                return this._transport;
            }

            Excursion.prototype.setTransport = function (transport) {
                if (transport === undefined || transport === "") {
                    throw new Error("Transport name cannot be empty or undefined.");
                }
                this._transport = transport;
            }

            Excursion.prototype.getDestinations = function () {
                return this._destinations;
            }

            Excursion.prototype.addDestination = function (destination) {
                if (!(destination instanceof Destination)) {
                    throw new Error('Parameter is not of type Destination.');
                }

                this._destinations.push(destination);
            }

            Excursion.prototype.removeDestination = function (destination) {
                if (this._destinations.indexOf(destination) == -1) {
                    throw new Error('Destination does not exists.');
                }
                this._destinations = this._destinations.filter(function (dest) {
                    return dest !== destination;
                });
            }

            Excursion.prototype.toString = function () {
                var dest = " ** Destinations: ";
                if (!this._destinations.length) {
                    dest += "-";
                }

                return Travel.prototype.toString.call(this) +
                    ",transport=" + this.getTransport() + "\n" + dest + this._destinations.join(";");
            }

            return Excursion;
        }());

        var Vacation = (function () {
            function Vacation(name, startDate, endDate, price, location, accommodation) {
                Travel.call(this, name, startDate, endDate, price);
                this.setLocation(location);
                this.setAccommodation(accommodation);
            }

            Vacation.extends(Travel);

            Vacation.prototype.getLocation = function () {
                return this._location;
            }

            Vacation.prototype.setLocation = function (location) {
                if (location === undefined || location === "") {
                    throw new Error("Location name cannot be empty or undefined.");
                }
                this._location = location;
            }

            Vacation.prototype.getAccommodation = function () {
                return this._accommodation;
            }

            Vacation.prototype.setAccommodation = function (accommodation) {
                if (!(accommodation === undefined) && !(accommodation === null)) {
                    this._accommodation = accommodation;
                } else {
                    delete Vacation._accommodation;
                }
            }

            Vacation.prototype.toString = function () {
                var accomodation = this.getAccommodation() ? ",accommodation=" + this.getAccommodation() : "";

                return Travel.prototype.toString.call(this) +
                    ",location=" + this.getLocation() +
                     accomodation;
            }

            return Vacation;
        }());

        var Cruise = (function () {
            function Cruise(name, startDate, endDate, price, startDock) {
                Excursion.call(this, name, startDate, endDate, price, 'cruise liner');
                this.setStartDock(startDock);
            }

            Cruise.extends(Excursion);

            Cruise.prototype.getStartDock = function () {
                return this._startDock;
            }

            Cruise.prototype.setStartDock = function (startDock) {
                if (!(startDock === undefined) && !(startDock === null)) {
                    this._startDock = startDock;
                } else {
                    delete Cruise._startDock;
                }
            }

            return Cruise;
        }());

        return {
            Destination: Destination,
            Excursion: Excursion,
            Vacation: Vacation,
            Cruise: Cruise
        }
    }());

    var TravellingManager = (function () {
        var _travels;
        var _destinations;

        function init() {
            _travels = [];
            _destinations = [];
        }

        var CommandProcessor = (function () {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "excursion":
                        object = new Models.Excursion(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["transport"]);
                        _travels.push(object);
                        break;
                    case "vacation":
                        object = new Models.Vacation(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["location"], command["accommodation"]);
                        _travels.push(object);
                        break;
                    case "cruise":
                        object = new Models.Cruise(command["name"], parseDate(command["start-date"]), parseDate(command["end-date"]),
                            parseFloat(command["price"]), command["start-dock"]);
                        _travels.push(object);
                        break;
                    case "destination":
                        object = new Models.Destination(command["location"], command["landmark"]);
                        _destinations.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.constructor.name + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index,
                    destinations;

                switch (command["type"]) {
                    case "destination":
                        object = getDestinationByLocationAndLandmark(command["location"], command["landmark"]);
                        _travels.forEach(function (t) {
                            if (t instanceof Models.Excursion && t.getDestinations().indexOf(object) !== -1) {
                                t.removeDestination(object);
                            }
                        });
                        index = _destinations.indexOf(object);
                        _destinations.splice(index, 1);
                        break;
                    case "excursion":
                    case "vacation":
                    case "cruise":
                        object = getTravelByName(command["name"]);
                        index = _travels.indexOf(object);
                        _travels.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.constructor.name + " deleted.";
            }

            function processListCommand(command) {
                return formatTravelsQuery(_travels);
            }

            function processAddDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.addDestination(destination);

                return "Added destination to " + travel.getName() + ".";
            }

            function processRemoveDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(command["location"], command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }
                travel.removeDestination(destination);

                return "Removed destination from " + travel.getName() + ".";
            }

            function getTravelByName(name) {
                var i;

                for (i = 0; i < _travels.length; i++) {
                    if (_travels[i].getName() === name) {
                        return _travels[i];
                    }
                }
                throw new Error("No travel with such name exists.");
            }

            function getDestinationByLocationAndLandmark(location, landmark) {
                var i;

                for (i = 0; i < _destinations.length; i++) {
                    if (_destinations[i].getLocation() === location
                        && _destinations[i].getLandmark() === landmark) {
                        return _destinations[i];
                    }
                }
                throw new Error("No destination with such location and landmark exists.");
            }

            function formatTravelsQuery(travelsQuery) {
                var queryString = "";

                if (travelsQuery.length > 0) {
                    queryString += travelsQuery.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }

            function processFilterTravelsCommand(commandArgs) {
                var type = commandArgs['type'],
                    minPrice = parseFloat(commandArgs['price-min']),
                    maxPrice = parseFloat(commandArgs['price-max']),
                    filteredTravels = [];

                filteredTravels = _travels.filter(function (t) {
                    if (type === 'all') {
                        return t.getPrice() >= minPrice && t.getPrice() <= maxPrice;
                    } else {
                        switch (type) {
                            case 'excursion':
                                return (t instanceof Models.Excursion && !(t instanceof Models.Cruise)) &&
                                    t.getPrice() >= minPrice &&
                                    t.getPrice() <= maxPrice;
                            case 'vacation':
                                return (t instanceof Models.Vacation) &&
                                    t.getPrice() >= minPrice &&
                                    t.getPrice() <= maxPrice;
                            case 'cruise':
                                return (t instanceof Models.Cruise) &&
                                    t.getPrice() >= minPrice &&
                                    t.getPrice() <= maxPrice;
                            default:
                                break;
                        }
                    }
                });

                filteredTravels = filteredTravels.sort(function (a, b) {
                    return a.getName() > b.getName();
                });

                filteredTravels = filteredTravels.sort(function (a, b) {
                    return a.getStartDate() > b.getStartDate();
                });
                
                return formatTravelsQuery(filteredTravels);
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAddDestinationCommand: processAddDestinationCommand,
                processRemoveDestinationCommand: processRemoveDestinationCommand,
                processFilterTravelsCommand: processFilterTravelsCommand
            }
        }());

        var Command = (function () {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches = [],
                    pattern = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "add-destination":
                    output = CommandProcessor.processAddDestinationCommand(commandArgs);
                    break;
                case "remove-destination":
                    output = CommandProcessor.processRemoveDestinationCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "filter":
                    output = CommandProcessor.processFilterTravelsCommand(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

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

    var output = "";
    TravellingManager.init();

    commands.forEach(function (cmd) {
        var result;
        if (cmd != "") {
            try {
                result = TravellingManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
            }
            output += result;
        }
    });

    return output;
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
            console.log(processTravelAgencyCommands(arr));
        });
    }
})();
