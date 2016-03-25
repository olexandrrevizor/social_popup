<?php
/*
Plugin Name: Social Popup
Plugin URI: mailto:olexandrevizor@gmail.com
Description: Social popup. Display social popup on index and single page. Popup show if users don't have cookie
Author: Olexandr Revizor
Author mailto:olexandrevizor@gmail.com
Version: 1.0
*/


class SocialPopup
{
    protected static $instance = null;

    public static function get_popups_instance()
    {
        if (self::$instance == null) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function add_scripts()
    {
        wp_enqueue_script('jquery-modal', plugins_url('/js/build/jquery.modal.min.js', __FILE__), array(), '1.0.0', true);

        wp_enqueue_script('popups-system', plugins_url('/js/build/system.min.js', __FILE__), array(), '1.0.0', true);

        wp_enqueue_script('modal-template', plugins_url('/js/build/modal-template.min.js', __FILE__), array(), '1.0.0', true);

        wp_enqueue_script('js-functions', plugins_url('/js/build/site-functions.min.js', __FILE__), array(), '1.0.0', true);

        wp_enqueue_script('popups-handler', plugins_url('/js/build/popup-handler.min.js', __FILE__), array(), '1.0.0', true);

        wp_enqueue_style('popups-style', plugins_url('css/build/social-popup.min.css', __FILE__));

        if(is_single()) {
            global $post;
            $cat = get_the_category($post->ID);
            $number_cat = count($cat);
            $cat_name = array();
            if($number_cat > 1) {
                for ($i = 0; $i < $number_cat; $i++) {
                    $cat_name[$i]= $cat[$i]->category_nicename;
                }
            }
            else {
                 $cat_name[0] = $cat[0]->category_nicename;
            }
            $post_array = array(
                'post_category' => $cat_name
            );

            wp_localize_script('popups-handler', 'single_about', $post_array );
        }

    }

    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'add_scripts'));
        add_action('wp_footer', array($this, 'facebook_modal_template'));
    }

    public function facebook_modal_template() {
        echo '<script type="text/html" id="fb_template">
                <div id="facebook_${id}" class="modal">
                    <div class="modal-logo">
                        <img src="/wp-content/uploads/general/fb_popup.png">
                    </div>
                    <p class="modal-text">${popupText}</p>
                    <div class="modal-hr"> <hr/> </div>
                    <div class="fb-like" data-href="https://www.facebook.com/${url}" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
                    <div class="modal-bottom">
                        <a href="#" onclick="$.modal.close(); return false;">${afterText}</a>
                    </div>
                </div>
            </script>';
    }

}

if (class_exists('SocialPopup')) {
    // instantiate the plugin class
    add_action('plugins_loaded', array('SocialPopup', 'get_popups_instance'));
}
