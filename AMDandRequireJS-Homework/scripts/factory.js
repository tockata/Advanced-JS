define(['container', 'section', 'item'], function(Container, Section, Item) {
    function getObject (type, name) {
        switch(type) {
            case 'container':
                return new Container(name);
            case 'section':
                return new Section(name);
            case 'item':
                return new Item(name);
            default:
                throw new Error('This type is not supported!');
        }
    }

    return getObject;
});
