/**
 * Popup handler
 */

AS.namespace('popup_handler');

AS.popup_handler = (function(document, $) {
    var _sys = AS.system,
        _modal_template = AS.modal_template,
        _cookieFacebook,
        _cookieDelay = getCookie('popupsDelay'),
        //Array with available categories
        _needCat = [
            {
                cat_name: 'Category name',
                url: 'Facebook url',
                cookie: 'Cookie name',
                priority: 0-5,
                name: 'Group name',
                text: 'Custom text url'
            },
            {
                cat_name: 'Category name',
                url: 'Facebook url',
                cookie: 'Cookie name',
                priority: 0-5,
                name: 'Group name',
                text: 'Custom text url'
            },
            {
                cat_name: 'Category name',
                url: 'Facebook url',
                cookie: 'Cookie name',
                priority: 0-5,
                name: 'Group name',
                text: 'Custom text url'
            }
        ],
        _need_cat_length = _needCat.length,

        /**
         * Check if post
         */
        getPostInfo = function () {
            return (typeof single_about !== 'undefined') ? single_about : 0;
        },

        /**
         * Check post category and return match index
         */
        checkPostInfo = function() {
            var post = getPostInfo(),
                match = -1;
            if(post) {
                var post_category = post.post_category,
                    post_category_length = count_properties(post_category),
                    max_priority = 1;

                for (var i = 0; i < _need_cat_length; i += 1) {
                    for (var j = 0; j < post_category_length; j += 1) {
                        if (post_category[j] == _needCat[i].cat_name) {
                            //Set index element
                            if(_needCat[i].priority > max_priority) {
                                match = i;
                                max_priority = _needCat[i].priority;
                            }
                        }
                    }
                }
            }
            return match;
        },

        /**
         * Check if isset cookie post modal and return id modal
         */
        checkCookiePostModal = function () {
          var  match = checkPostInfo(),
               idModal = -1;
            if (match != -1) {
                var _cookie = getCookie(_needCat[match].cookie);
                if (!_cookie && !_cookieDelay) {
                    idModal = match;
                }
            }
           return idModal;
        },

        /**
         * Create post Modal
         */
        createPostModal = function (idPost) {
            _modal_template.createFacebookModal(_needCat[idPost].cat_name, _needCat[idPost].url, _needCat[idPost].cookie, _needCat[idPost].text, 'Мне уже нравится «Так Просто - ' + _needCat[idPost].name + '»');
            _modal_template.showFacebookModal();
        },

        /**
         * Check cookie main Popup
         */
        initCookie = function () {
            _cookieFacebook = getCookie('fbPopupDisplayed');
        },

        /**
         * Create main popup
         */
        mainPopup = function () {
            initCookie();
            if(!_cookieFacebook && !_cookieDelay) {
                _modal_template.createFacebookModal('takprosto', 'takprosto.cc', 'fbPopupDisplayed', 'Жми <b>«Нравится»</b> и получай самые лучшие советы, рецепты и лайфхаки в Фейсбуке!', 'Мне уже нравится «Так Просто»');
                _modal_template.showFacebookModal();
            }
        },

        /**
         * Count properties object
         * @param object obj
         */
        count_properties = function (obj) {
            var count = 0;
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    ++count;
                }
            }
            return count;
        },

        /**
         * Popups handler
         */
        mainHandler = function (){
            var idModal = checkCookiePostModal();
            if (idModal != -1) {
                createPostModal (idModal);
            }
            else {
                mainPopup();
            }
        };

    _sys.addAutoLoad(mainHandler);
})(document, $ || jQuery);
