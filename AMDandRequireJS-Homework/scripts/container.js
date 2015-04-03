define(['section', 'containers'], function(Section, containers) {
    var Container = (function() {
        var sections = [];

        function Container(name) {
            this._name = name;
        }

        Container.prototype = (function() {
            var addToDom,
                addSection;

            addToDom = function() {
                var div,
                    title,
                    sectionsDiv,
                    inputForNewSectionTitle,
                    createSectionButton,
                    parent;

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
                createSectionButton.addEventListener('click', function () {
                    require(['containers'], function (containers) {
                        containers[containers.length - 1]
                                    .addSection(document.getElementById('section-name-' + (containers.length - 1)).value,
                                    document.getElementById('sections-div-' + containers.length));
                    });
                });

                div.appendChild(title);
                div.appendChild(sectionsDiv);
                div.appendChild(inputForNewSectionTitle);
                div.appendChild(createSectionButton);

                parent = document.getElementById('wrapper');
                parent.appendChild(div);
            };

            addSection = function(title, sectionsDiv) {
                var newSection = new Section(title);
                newSection.addToDom(sectionsDiv, sections.length);
                sections.push(newSection);
            };

            return {
                addToDom: addToDom,
                addSection: addSection,
                sections: sections
            };
        }());

        return Container;
    }());

    return Container;
});
