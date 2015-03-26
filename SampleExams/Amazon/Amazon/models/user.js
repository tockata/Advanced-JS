var models = models || {};

(function(models) {
    function User(username, fullName, balance) {
        this.username = username;
        this.fullName = fullName;
        this._balance = balance;
        this._shoppingCart = models.getShoppingCart();
    }

    User.prototype.addItemToCart = function(item) {
        this._shoppingCart.addItem(item);
    }

    models.getUser = function getUser(username, fullName, balance) {
        return new User(username, fullName, balance);
    }
}(models))