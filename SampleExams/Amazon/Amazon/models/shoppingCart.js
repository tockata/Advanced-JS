var models = models || {};

(function(models) {
    function ShopingCart() {
        this._items = [];
    }

    ShopingCart.prototype.addItem = function(item) {
        this._items.push(item);
    }

    ShopingCart.prototype.getTotalPrice = function() {
        var totalPrice = 0;
        this._items.forEach(function(i) {
            totalPrice += i._price;
        });

        return totalPrice;
    }

    models.getShoppingCart = function() {
        return new ShopingCart();
    }
}(models))