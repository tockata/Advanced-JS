var domModule = (function() {
    function appendChild(child, parent) {
        if (parent[0] === ".") {
            var className = parent.substr(1);
            var parentNode = document.getElementsByClassName(className);
            console.log(parent.substr(1));
            parentNode[0].appendChild(child);
        } else if (parent[0] === "#") {
            var parentNode = document.getElementById(parent.substr(1));
            parentNode.appendChild(child);
        }
    }
    function removeChild(parent, child) {
        var parentNode = document.querySelector(parent);
        var childNode = parentNode.querySelector(child);
        parentNode.removeChild(childNode);
    }
    function addHandler(element, eventType, eventHandler) {
        var targetElements = document.querySelectorAll(element);
        var eventStr = "on" + eventType;
        for (var i = 0; i < targetElements.length; i++) {
            targetElements[i].setAttribute(eventStr, eventHandler);
        }
    }
    function retrieveElements(selector) {
        var elements = document.querySelectorAll(selector);
        return elements;
    }
    return {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements
    };
})();

var liElement = document.createElement("li");
domModule.appendChild(liElement, ".birds-list");
domModule.removeChild("ul.birds-list","li:first-child");
domModule.addHandler("li.bird", 'click', function(){ alert("I'm a bird!")});

var elements = domModule.retrieveElements(".bird");
for (var i = 0; i < elements.length; i++) {
    console.log(elements[i]);
}
