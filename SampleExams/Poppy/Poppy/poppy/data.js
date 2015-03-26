var scope = scope || {};

(function (scope) {
    var DEFAULT_TIMEOUT = 4000;

    var Popup = (function () {
        function Popup(title, message, type, position, closeButton, autoHide, timeout, callback) {
            this._popupData = {
                'title': title,
                'message': message,
                'type': type,
                'autoHide': autoHide,
                'timeout': timeout,
                'closeButton': closeButton,
                'position': position,
                'callback': callback
            }
        }

        return Popup;
    }());

    var Success = (function () {
        function Success(title, message) {
            Popup.call(this, title, message, 'success', 'bottomLeft', false, false);
        }

        return Success;
    }());

    var Info = (function () {
        function Info(title, message) {
            Popup.call(this, title, message, 'info', 'topLeft', true, false);
        }

        return Info;
    }());

    var Error = (function () {
        function Error(title, message) {
            Popup.call(this, title, message, 'error', 'topRight', false, true, DEFAULT_TIMEOUT);
        }

        return Error;
    }());

    var Warning = (function () {
        function Warning(title, message, callback) {
            Popup.call(this, title, message, 'warning', 'bottomRight', false, false, 0, callback);
        }

        return Warning;
    }());

    scope._models = {
        Success: Success,
        Info: Info,
        Error: Error,
        Warning: Warning
    }
}(scope));