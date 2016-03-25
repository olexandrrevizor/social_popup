/**
 * Main javascript module
 *
 * @module RS
 * @package main
 */

"use strict";

var AS = AS || {};

AS.namespace = function(ns_string){
    var parts = ns_string.split('.'),
        parent = AS,
        i;
    // strip redundant leading global
    if(parts[0] === "AS"){
        parts = parts.slice(1);
    }
    for(i = 0; i < parts.length; i += 1){
        // create a property if it doesn't exist
        if(typeof parent[parts[i]] === "undefined"){
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

AS.namespace('system');

AS.system = (function(document, $) {
    var autoload = [],

        autoLoad = function(){
            var count = autoload.length,
                counter;

            if(count > 0){
                for(counter = 0; counter < count; counter +=1){
                    if(typeof autoload[counter].function === 'function'){
                        if(autoload[counter].params === null) {
                            autoload[counter].function.apply(window);
                        }else{
                            autoload[counter].function.apply(window, autoload[counter].params);
                        }
                    }
                }
            }

            return this;
        },
        addOnLoad = function(func, params){
            var params_array = params || null;
            if(typeof func === 'function'){
                autoload.push({'function':func, 'params': params_array});
            }
            return this;
        },
        onLoad = function(){
            $(document).ready(function(){
                autoLoad();
                return this;
            });
        };

    return {
        onLoad: onLoad,
        addAutoLoad: addOnLoad
    }

})(document, jQuery || $);

AS.system.onLoad();
