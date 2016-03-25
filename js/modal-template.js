/**
 * Module modal_template dedicated for creating modal box
 */

AS.namespace('modal_template');

AS.modal_template = (function (document, $) {

    /**
     * Variables
     */
    var _addAfter = 'body',
        _fb_template = '#fb_template',
        _poupId = '',
        _cookieName = '',

        /**
         * Constructor Modal template
         * @param string id
         * @param string cookieName
         */
        initModal = function (id, cookieName) {
            _poupId = id;
            _cookieName = cookieName;
        },
        /**
         * Method dedicated for creating facebook modal box
         * @param string _id
         * @param string _group_url
         * @param string _popupText
         * @param string _afterText
         */
        createFacebookModal = function (id, url, cookie_name, popupText, afterText) {
            initModal(id, cookie_name);
            var obj = {
                    'id': id,
                    'url': url,
                    'popupText': popupText,
                    'afterText': afterText
                },
                _content;
            _content = parseFacebookTemplate(_fb_template, obj);
            $(_addAfter).append(_content);
        },

        /**
         * Parse Template facebook modal
         * @param string id
         * @param object obj
         */
        parseFacebookTemplate = function (id, obj) {
            var tpl = $(id).text();
            return tpl.replace(/\$\{(.+)\}/g, function (match, contents) {
                return obj[contents] || '';
            });
        },
        /**
         * Set cookie
         * @param string cookie_name
         */
        setPopupCookie = function (cookie_name) {
            setCookie(cookie_name, 'true', 5);
            setCookie('popupsDelay',' true', 2);
        },

        /**
         * Show modal
         * @param string popupId
         * @param string cookie_name
         */
        showModal = function (id) {
            onCloseTimeout = setTimeout(function() {
                if (!$.modalShown()) {
                    $(id).modal({clickClose: false, escapeClose: false});
                    setPopupCookie(_cookieName);
                    FB.Event.subscribe('edge.create', function(){$.modal.close();});
                }
            }, 10000);
        },

        /**
         * Show facebook modal
         */
        showFacebookModal = function () {
            var popupId = '#facebook_' + _poupId;
            showModal(popupId);
        };

    return {
        createFacebookModal: createFacebookModal,
        showFacebookModal: showFacebookModal
    }

})(document, $ || jQuery);
