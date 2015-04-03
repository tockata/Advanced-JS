require.config({
    paths: {
        factory: 'factory',
        container: 'container',
        section: 'section',
        item: 'item',
        containers: 'containers'
    }
});

require(['factory', 'containers'], function (factory, containers) {
    var button = document.getElementById('new-container');
    button.addEventListener('click', function() {
        var name = document.getElementById('container-name').value;
        var container = factory('container', name);
        document.body.innerHTML = '<div id="wrapper"></div>' +
            '<script src="libs/require.js" data-main="scripts/app"></script>';
        containers.push(container);
        container.addToDom();
    });
});