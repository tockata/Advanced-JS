define(['section', 'containers'], function(section, containers) {
    var Item = (function() {
        function Item(content) {
            this._content = content;
            this._status = false;
        }

        Item.prototype = (function() {
            var addToDom,
                changeStatus;

            addToDom = function(itemsDiv, container, section, item) {
                var paragraph,
                    checkBox,
                    content,
                    contentText,
                    parent;

                paragraph = document.createElement('p');
                paragraph.style.borderBottom = '1px solid gray';
                paragraph.style.marginLeft = '10px';
                paragraph.style.width = '440px';

                checkBox = document.createElement('input');
                checkBox.setAttribute('type', 'checkbox');
                checkBox.setAttribute('id', (this._content + item));
                checkBox.addEventListener('click', function (ev) {
                    require(['containers'], function (containers) {
                        containers[containers.length - 1]
                            .sections[section]
                            .items[item]
                            .changeStatus(ev.target.nextSibling, container, section, item);
                    });
                });
                paragraph.appendChild(checkBox);

                content = document.createElement('label');
                content.setAttribute('for', (this._content + item));
                content.setAttribute('id', 'item-' + this._content + item);
                contentText = document.createTextNode(this._content);
                content.appendChild(contentText);
                paragraph.appendChild(content);
                parent = itemsDiv.parentNode;

                parent.insertBefore(paragraph, itemsDiv);
            };

            changeStatus = function(itemTochange, container, section, item) {
                if (containers[container].sections[section].items[item]._status) {
                    itemTochange.style.backgroundColor = 'white';
                    containers[container].sections[section].items[item]._status = false;
                } else {
                    itemTochange.style.backgroundColor = 'green';
                    containers[container].sections[section].items[item]._status = true;
                }
            };

            return {
                addToDom: addToDom,
                changeStatus: changeStatus
            };
        }());

        return Item;
    }());

    return Item;
});
