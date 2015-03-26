var ToDoList = (function () {
    var Container,
        Section,
        Item;

    Container = (function () {
        var sections = [];

        function Container(name) {
            this._name = name;
        }

        Container.prototype = (function () {
            var addToDom,
                addSection;

            addToDom = function () {
                var div,
                    title,
                    sectionsDiv,
                    inputForNewSectionTitle,
                    createSectionButton;

                div = document.createElement('div');
                div.setAttribute('id', containers.length);
                div.style.border = '1px solid black';
                div.style.width = '500px';
                div.style.marginTop = '10px';

                title = document.createElement('h1');
                title.style.textAlign = 'center';
                var titleText = document.createTextNode(this._name + ' TODO List');
                title.appendChild(titleText);

                sectionsDiv = document.createElement('div');
                sectionsDiv.setAttribute('id', 'sections-div-' + containers.length);
                sectionsDiv.style.border = '1px solid gray';
                sectionsDiv.style.width = '480px';
                sectionsDiv.style.minHeight = '100px';
                sectionsDiv.style.marginBottom = '10px';
                sectionsDiv.style.marginLeft = '9px';

                inputForNewSectionTitle = document.createElement('input');
                inputForNewSectionTitle.setAttribute('type', 'text');
                inputForNewSectionTitle.setAttribute('id', 'section-name-' + sections.length);
                inputForNewSectionTitle.setAttribute('placeholder', 'Title...');
                inputForNewSectionTitle.style.marginLeft = '9px';
                inputForNewSectionTitle.style.marginRight = '10px';
                inputForNewSectionTitle.style.marginBottom = '10px';

                createSectionButton = document.createElement('input');
                createSectionButton.setAttribute('type', 'button');
                createSectionButton.setAttribute('id', 'new-section');
                createSectionButton.setAttribute('value', 'New Section');
                createSectionButton.setAttribute('onclick',
                    'containers[' + containers.length + ']' +
                    '.addSection(this.previousSibling.value, ' +
                    'this.previousSibling.previousSibling)');

                div.appendChild(title);
                div.appendChild(sectionsDiv);
                div.appendChild(inputForNewSectionTitle);
                div.appendChild(createSectionButton);
                document.body.appendChild(div);
            }

            addSection = function (title, sectionsDiv) {
                var newSection = new Section(title);
                newSection.addToDom(sectionsDiv, sections.length);
                sections.push(newSection);
            }

            return {
                addToDom: addToDom,
                addSection: addSection,
                sections: sections
            }
        }());

        return Container;
    }());

    Section = (function () {
        var items = [];

        function Section(title) {
            this._title = title;
        }

        Section.prototype = (function () {
            var addToDom,
                addItem;

            addToDom = function (sectionsDiv, sectionIndex) {
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
                inputForNewItemContent.setAttribute('id', 'item-' + items.length);
                inputForNewItemContent.setAttribute('placeholder', 'Add item...');
                inputForNewItemContent.style.marginLeft = '9px';
                inputForNewItemContent.style.marginRight = '10px';
                inputForNewItemContent.style.marginBottom = '10px';

                createSectionButton = document.createElement('input');
                createSectionButton.setAttribute('type', 'button');
                createSectionButton.setAttribute('id', 'new-item');
                createSectionButton.setAttribute('value', '+');
                createSectionButton.setAttribute('onclick',
                    'containers[' + (containers.length - 1) + '].sections[' + sectionIndex +
                    '].addItem(this.previousSibling.value, this.previousSibling, ' + (containers.length - 1) + ', '
                    + sectionIndex + ')');

                div.appendChild(title);
                div.appendChild(inputForNewItemContent);
                div.appendChild(createSectionButton);
                sectionsDiv.appendChild(div);
            }

            addItem = function (content, itemsDiv, container, section) {
                var newItem = new Item(content);
                newItem.addToDom(itemsDiv, container, section, items.length);
                items.push(newItem);
            }

            return {
                addToDom: addToDom,
                addItem: addItem,
                items: items
            }
        }());

        return Section;
    }());

    Item = (function () {
        function Item(content) {
            this._content = content;
            this._status = false;
        }

        Item.prototype = (function () {
            var addToDom,
                changeStatus;

            addToDom = function (itemsDiv, container, section, item) {
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
                checkBox.setAttribute('onclick', 'containers[' + container + ']' +
                    '.sections[' + section + '].items[' + item + '].changeStatus(this.id, ' + container + ', ' +
                    section + ', ' + item + ')');
                paragraph.appendChild(checkBox);

                content = document.createElement('label');
                content.setAttribute('for', (this._content + item));
                content.setAttribute('id', 'item-' + this._content + item);
                contentText = document.createTextNode(this._content);
                content.appendChild(contentText);
                paragraph.appendChild(content);
                parent = itemsDiv.parentNode;

                parent.insertBefore(paragraph, itemsDiv);
            }

            changeStatus = function (labelId, container, section, item) {
                var labelToChange = document.getElementById('item-' + labelId).parentNode;
                if (containers[container].sections[section].items[item]._status) {
                    labelToChange.style.backgroundColor = 'white';
                    containers[container].sections[section].items[item]._status = false;
                } else {
                    labelToChange.style.backgroundColor = 'green';
                    containers[container].sections[section].items[item]._status = true;
                }
            }

            return {
                addToDom: addToDom,
                changeStatus: changeStatus
            }
        }());

        return Item;
    }());

    return {
        Container: Container,
        Section: Section,
        Item: Item
    }
}());

var containers = [];
function addContainer(name) {
    var newContainer = new ToDoList.Container(name);
    newContainer.addToDom();
    containers.push(newContainer);
}