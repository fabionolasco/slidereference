;

/*jslint browser: true*/
/*jslint todo: true */

/**
* Add a slider to website containing an iframe with the URL of your choice.
* @author Fabio Gomide Nolasco
* @date 27/Oct/2014
* @param {jQuery} $
* @todo Remove CSS3 animation and add jQuery animation to make it work in older browsers
* @todo Create minified version and put on github
* @todo Add close button choice
* @todo Add resize iframe width choice
* @todo Create way to style iframe
* @todo Mode event handler attachement to plugin
**/
(function ($) {

    "use strict";

    var defaults = {
            url : 'http://www.fabionolasco.com/',
            loading_text : "Loading...",
            ownsite_width : "70%",
            ownsite_container : ".all",
            reference_width : "30%",
            css : {
                "position" : "fixed",
                "height" : "100%",
                "background-color" : "#fff",
                "border-left" : "1px solid #000",
                "top" : "0px",
                "z-index" : "1",
                "left" : "100%"
            },
            loadingcss : {
                "position" : "fixed",
                "height" : "100%",
                "background-color" : "#999",
                "border-left" : "1px solid #000",
                "top" : "0px",
                "left" : "100%",
                "line-height" : "100px",
                "font-size" : "2em",
                "font-weight" : "bold",
                "color" : "#fff",
                "text-align" : "center",
                "z-index" : "2",
                "margin-left" : "0%"
            },
            animation : {
                "-webkit-transition" : "all 150ms ease",
                "-moz-transition" : "all 150ms ease",
                "-o-transition" : "all 150ms ease",
                "-ms-transition" : "all 150ms ease",
                "transition" : "all 150ms ease"
            }
        };

    function Slidereference(element, options) {
        this.config = $.extend({}, defaults, options);
        this.element = element;
        this.init();
    }

    function changeCss(element, css_comand, css_value) {
        $(element).css(css_comand, css_value);
    }

    Slidereference.prototype.init = function () {

        if ($("#slidereference").length) {

            $("#slidereference").remove();
            // Change container to accommodate slide
            $(this.config.ownsite_container).css({"width" : "100%"});

        } else {

            // Make elements inherit Reference Width
            this.config.css.width = this.config.reference_width;
            this.config.loadingcss.width = this.config.reference_width;

            // Create Reference Container
            var slide = $('<div/>'),
                slidereference_loading = $('<div/>'),
                slidereference_bars = $('<div/>'),
                bars_style = "<style>loading{display:block;width:200px;height:200px;margin:0 auto;border:none;position:relative}.loader,.loader:after,.loader:before{background:#FFF;-webkit-animation:load1 1s infinite ease-in-out;animation:load1 1s infinite ease-in-out;width:1em;height:4em}.loader:after,.loader:before{position:absolute;top:0;content:''}.loader:before{left:-1.5em}.loader{text-indent:-9999em;margin:2em auto;position:relative;font-size:11px;-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader:after{left:1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0 #FFF;height:4em}40%{box-shadow:0 -2em #fff;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0 #FFF;height:4em}40%{box-shadow:0 -2em #fff;height:5em}}</style>",
                w = this.config.reference_width,
                ownsite_container = this.config.ownsite_container,
                ownsite_width = this.config.ownsite_width;

            // Add animation to container    
            $(this.config.ownsite_container).css(this.config.animation);

            // Loading bars
            $(slidereference_bars)
                .prop("id", "slidereference_bars")
                .html('<loading><div class="loader"></div></loading>' + bars_style)
                .css(this.config.loadingcss);

            // Loading screen
            $(slidereference_loading)
                .prop("id", "slidereference_loading")
                .html(this.config.loading_text + $(slidereference_bars).html())
                .css(this.config.loadingcss)
                .css(this.config.animation)
                .appendTo(this.element);

            // Change container to accommodate slide
            window.setTimeout(function () { changeCss(ownsite_container, "width", ownsite_width); }, 1);
            // Bring loading screen
            window.setTimeout(function () { changeCss('#slidereference_loading', "margin-left", '-' + w); }, 1);

            // Create Slide with iframe
            $(slide)
                .prop("id", "slidereference")
                .html('<iframe id="slidereference_iframe" src="' + this.config.url + '" style="width:100%;height:100%;"></iframe>')
                .css(this.config.css)
                .appendTo(this.element);

            // Remove loading after content is loaded
            $("#slidereference_iframe").bind("load", function () {

                // Slide iframe to page
                window.setTimeout(function () { changeCss('#slidereference', "margin-left", '-' + w); }, 1);

                // Remove loading scren
                window.setTimeout(function () { $("#slidereference_loading").fadeOut(5000).remove(); }, 1);

            });

        }

    }

    $.fn.slidereference = function (options) {
        new Slidereference(this.first(), options);
        return this.first();
    };

}(jQuery, $));