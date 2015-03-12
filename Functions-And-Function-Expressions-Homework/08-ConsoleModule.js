var specialConsole = (function() {
    function writeLine() {
        if (arguments.length == 0) {
            console.log();
        } else if (arguments.length == 1) {
            console.log(arguments[0]);
        } else {
            validateArguments(arguments);
            var result = generateOutput(arguments);
            console.log(result);
        }
    }

    function writeError() {
        if (arguments.length == 0) {
            console.error();
        } else if (arguments.length == 1) {
            console.error(arguments[0]);
        } else {
            validateArguments(arguments);
            var result = generateOutput(arguments);
            console.error(result);
        }
    }

    function writeWarning() {
        if (arguments.length == 0) {
            console.warn();
        } else if (arguments.length == 1) {
            console.warn(arguments[0]);
        } else {
            validateArguments(arguments);
            var result = generateOutput(arguments);
            console.warn(result);
        }
    }

    function writeInfo() {
        if (arguments.length == 0) {
            console.info();
        } else if (arguments.length == 1) {
            console.info(arguments[0]);
        } else {
            validateArguments(arguments);
            var result = generateOutput(arguments);
            console.info(result);
        }
    }

    function generateOutput (arguments) {
        var result = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var placeholder = "{" + (i - 1) + "}";
            while (result.indexOf(placeholder) >= 0) {
            result = result.replace(placeholder, arguments[i]);
            }
        }

        return result;
    }

    function validateArguments (arguments) {
        var placeholdersMatches = arguments[0].match(/{\d+}/g);
        var placeholdersNumbers = [];
        for (var i = 0; i < placeholdersMatches.length; i++) {
            number =
            placeholdersMatches[i].substring(1, placeholdersMatches[i].length - 1);
            if (placeholdersNumbers.indexOf(number)) {
                placeholdersNumbers.push(number);
            }
        }

        placeholdersNumbers.sort(function(a, b){return a - b;});
        if (placeholdersNumbers[0] != 0) {
            throw "Invalid arguments!";
        }

        for (var i = 1; i < placeholdersNumbers.length; i++) {
            if (placeholdersNumbers[i] - placeholdersNumbers[i - 1] > 1) {
                throw "Invalid arguments!";
            }
        }

        if (placeholdersNumbers.length != arguments.length - 1) {
            throw "Invalid arguments!";
        }
    }

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning,
        writeInfo: writeInfo
    };
})();

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message:{1} {1} {0} {2}", "hello", "proba", "pesho");
specialConsole.writeLine("Object: {0}",
    { name: "Gosho", toString: function() { return this.name }});

specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
specialConsole.writeInfo("Info: {0}", "Hi there! Here is some info for you.");
specialConsole.writeError("Error object: {0}",
    { msg: "An error happened", toString: function() { return this.msg }});
