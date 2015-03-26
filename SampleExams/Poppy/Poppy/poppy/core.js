var scope = scope || {};

(function (scope) {
    var DEFAULT_CLOSE_BUTTON_FADE_SPEED = 150,
        DEFAULT_FADE_SPEED = 0.02;

    function pop(type, title, message, callback) {
        var popup;
        switch (type) {
            case 'success':
                popup = new scope._models.Success(title, message);
                break;
            case 'info':
                popup = new scope._models.Info(title, message);
                break;
            case 'error':
                popup = new scope._models.Error(title, message);
                break;
            case 'warning':
                popup = new scope._models.Warning(title, message, callback);
                break;
            default:
                break;
        }

        // generate view from view factory
        var view = scope._viewFactory.createPopupView(popup);

        processPopup(view, popup);
    }

    function processPopup(domView, popup) {
        if (popup._popupData.closeButton) {
            var element = domView.getElementsByClassName("poppy-close-button")[0];
            element.addEventListener('click', function () {
                fadeOut(domView, DEFAULT_CLOSE_BUTTON_FADE_SPEED);
            });
        }

        if (popup._popupData.autoHide) {
            var timeout = popup._popupData.timeout;
            fadeOut(domView, timeout);
        }

        if (popup._popupData.callback) {
            domView.addEventListener('click', function () {
                popup._popupData.callback();
            });
        }

        fadeIn(domView);
        document.body.appendChild(domView);
    }

    function fadeIn(element) {
        element.style.opacity = 0;

        (function fade() {
            var val = parseFloat(element.style.opacity);
            if (!((val += DEFAULT_FADE_SPEED) > 1)) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    function fadeOut(element, timeout) {
        element.style.opacity = 1;

        setInterval(function fade() {
            var val = parseFloat(element.style.opacity);
            if ((val -= DEFAULT_FADE_SPEED) > 0) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            }
        }, timeout);
    }

    scope.pop = pop;
}(scope));

