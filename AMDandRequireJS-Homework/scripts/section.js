define(['item', 'containers'], function(Item, containers) {
    var Section = (function() {
        var items = [];

        function Section(title) {
            this._title = title;
        }

        Section.prototype = (function() {
            var addToDom,
                addItem;

            addToDom = function(sectionsDiv, sectionIndex) {
                var div,
                    title,
                    titleText,
                    inputForNewItemContent,
                    createSectionButton;

                div = document.createElement('div');
                div.setAttribute('id', this._title + '-' + sectionIndex);
                div.style.border = '1px solid black';
                div.style.width = '460px';
                div.style.margin = '10px';

                title = document.createElement('h2');
                title.style.textAlign = 'right';
                title.style.marginRight = '10px';
                titleText = document.createTextNode(this._title);
                title.appendChild(titleText);

                inputForNewItemContent = document.createElement('input');
                inputForNewItemContent.setAttribute('type', 'text');
                inputForNewItemContent.setAttribute('id', 'item-' + (containers[containers.length - 1].sections.length));
                inputForNewItemContent.setAttribute('placeholder', 'Add item...');
                inputForNewItemContent.style.marginLeft = '9px';
                inputForNewItemContent.style.marginRight = '10px';
                inputForNewItemContent.style.marginBottom = '10px';

                createSectionButton = document.createElement('input');
                createSectionButton.setAttribute('type', 'button');
                createSectionButton.setAttribute('id', 'new-item-' + (containers[containers.length - 1].sections.length));
                createSectionButton.setAttribute('value', '+');
                createSectionButton.addEventListener('click', function (ev) {
                    require(['containers'], function (containers) {
                        containers[containers.length - 1]
                            .sections[sectionIndex]
                            .addItem(document.getElementById(ev.target.id.substring(4)).value,
                                ev.target.previousSibling,
                                (containers.length - 1),
                                sectionIndex);
                    });
                });

                div.appendChild(title);
                div.appendChild(inputForNewItemContent);
                div.appendChild(createSectionButton);
                sectionsDiv.appendChild(div);
            };

            addItem = function(content, itemsDiv, container, section) {
                var newItem = new Item(content);
                newItem.addToDom(itemsDiv, container, section, items.length);
                items.push(newItem);
            };

            return {
                addToDom: addToDom,
                addItem: addItem,
                items: items
            };
        }());

        return Section;
    }());

    return Section;
});
