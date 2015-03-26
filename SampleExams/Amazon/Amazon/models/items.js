var models = models || {};

(function (models) {
    function Item(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
        this._customerReviews = [];
    }

    Item.prototype.addCustomerReview = function (customerReview) {
        this._customerReviews.push(customerReview);
    }

    Item.prototype.getCustomerReviews = function () {
        return this._customerReviews;
    }

    function UsedItem(title, description, price, condition) {
        Item.call(this, title, description, price);
        this._condition = condition;
    }

    UsedItem.extends(Item);

    models.getItem = function getItem(title, description, price) {
        return new Item(title, description, price);
    }
    models.getUsedItem = function getItem(title, description, price, condition) {
        return new UsedItem(title, description, price, condition);
    }
}(models))