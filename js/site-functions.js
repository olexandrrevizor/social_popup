function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days) {

    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    var cookie = name+"="+value+expires+"; path=/";

    document.cookie = cookie;
}

function urlPopup(url, afterPopupFunction) {
    if($.modalShown())
    {
        return;
    }
    var width = 600;
    var height = 400;
    var top = (screen.height / 2) - (height / 2);
    var left = (screen.width / 2) - (width / 2);
    var popupWindow = window.open(url, '', 'toolbar=0,status=0,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
    var interval = window.setInterval(function () {
        try {
            if (popupWindow == null || popupWindow.closed) {
                window.clearInterval(interval);
                if(afterPopupFunction) {
                    afterPopupFunction();
                }
            }
        }
        catch (e) {
        }
    }, 1000);
}