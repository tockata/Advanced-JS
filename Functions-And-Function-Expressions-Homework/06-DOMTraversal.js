var selector = ".birds";
traverse(selector);

function traverse(selector) {
    var selectorStr = selector.substr(1);
    var node;
    switch(selector[0]) {
        case ".":
        node = document.getElementsByClassName(selectorStr);

        for (var i = 0; i < node.length; i++) {
            traverseNode(node[i], '');
        }
            break;
        case "#":
        node = document.getElementById(selectorStr);
        traverseNode(node, '');
            break;
        default:
            break;
    }

    function traverseNode(node, spacing) {
        spacing = spacing || '  ';
        var nodeAtributtes = node.attributes;
        var nodeResult = spacing + node.nodeName.toLowerCase() + ": ";

        for (var i = 0; i < nodeAtributtes.length; i++) {
            if (i === 0) {
            nodeResult += nodeAtributtes[i].name + "=\"" + nodeAtributtes[i].value + "\"";
            } else {
                nodeResult += ", " + nodeAtributtes[i].name + "=\"" + nodeAtributtes[i].value + "\"";
            }
        }

        console.log(nodeResult);
        for (var i = 0, len = node.childNodes.length; i < len; i += 1) {
            var child = node.childNodes[i];
            if (child.nodeType === document.ELEMENT_NODE) {
                traverseNode(child, spacing + '  ');
            }
        }
    }
}
