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
* @todo Create way to style iframe
* @todo Close btn only hide, in case user wants to reopen
**/
(function ($) {

    "use strict";

    var defaults = {
            url: 'http://www.fabionolasco.com/',
            loading_text: "Loading...",
            ownsite_width: "70%",
            ownsite_container: ".all",
            reference_width: "30%",
            iframe_border: "0",
            iframe_css: {
                "width": "100%",
                "height": "100%",
                "padding": "20px"
            },
            resizable: "yes",
            resize_bar_css: {
                "background-color": "#777",
                "height": "100%",
                "position": "absolute",
                "width": "3px",
                "cursor": "col-resize",
                "top": "0px",
                "left": "0px"
            },
            resize_icon: "yes",
            resize_icon_css: {
                "top": "50%",
                "opacity": "0.5"
            },
            close_btn: "no",
            close_btn_css: {
                "display": "block",
                "width": "18px",
                "line-height": "24px",
                "background-color": "#777",
                "font-size": "11px",
                "font-weight": "bold",
                "color": "#fff",
                "cursor": "pointer",
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "text-align": "center"
            },
            close_bar: "yes",
            close_bar_text: "CLOSE",
            close_bar_css: {
                "display": "block",
                "width": "100%",
                "line-height": "30px",
                "background-color": "#777",
                "font-size": "11px",
                "font-weight": "bold",
                "color": "#fff",
                "cursor": "pointer",
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "text-align": "center"
            },
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

    // Return original state of linked elements
    function clearAll(clickelement) {
        // If another instace was already running, remove it
        $('.slidereference[data-active="yes"]').each(function () {
            if (clickelement !== $(this)) {
                $(this).text($(this).attr('data-originaltext'));
                $(this).attr('data-active', 'no');
            }
        });
    }

    // >> Slidereference event handler
    function AddEventHandler(element) {

        $(element).find(".slidereference").bind("click", function () {

            var clickelement = $(this),
                options;

            // Optional
            // Toggle Btn Text
            if ($(this).attr('data-active') === 'yes') {

                $(this).attr('data-active', 'no');
                $(this).text($(this).attr('data-originaltext'));

            } else {

                // If another instace was already running, remove it
                clearAll(clickelement);

                // Make button active
                $(this).attr('data-active', 'yes');

                if ($(this).attr('data-clicktext')) {
                    $(this).text($(this).attr('data-clicktext'));
                } else {
                    $(this).text('Deactivate');
                }

                // Clear previews
                $('#slidereference_div').remove();

            }

            // Create new slide
            $('<div/>')
                .prop('id', 'slidereference_div')
                .appendTo('body');

            // Option
            // Data-url is passed, use it
            if ($(this).attr('data-url')) {
                options  = {'url' : $(this).attr('data-url')};
            }
            // Data-options is passed, use it instead
            if ($(this).attr('data-options')) {
                options  = $(this).attr('data-options');
            }

            // Run plugin
            $('#slidereference_div').slidereference(options);

        });
    }
    // << Slidereference event handler

    function Slidereference(element, options) {
        if (options.length > 0) {
            options = options.replace(/\'/g, '"');
            options = $.parseJSON(options);
        }
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
                resizable_bar,
                resizable_bar_icon,
                close_btn,
                iframe,
                dragging = false,
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

            // Resizable Bar
            if (this.config.resizable === 'yes') {

                resizable_bar = $('<div />').prop("id", "slidereference_dragbar").css(this.config.resize_bar_css);

                // If resize bar has icon
                if (this.config.resize_icon === 'yes') {

                    // Thanks to http://one-div.com/
                    resizable_bar_icon = $('<div />', {
                        "class": "slidereference_hamburger"
                    })
                        .css(this.config.resize_icon_css)
                        .html('<style>.slidereference_hamburger{position:relative;font-size:10px;width:3.3em;height:3.3em;background:#383b3e;border-radius:.3em;top: 50%;font-size:5px;height:30px}.slidereference_hamburger:before{border-top:.3em solid #efefef;content:"";position:absolute;width:1.9em;height:1em;margin:auto;border-bottom:.3em solid #efefef;top:1em;left:.7em;border-radius:.1em}.slidereference_hamburger:after{display:block;content:"";position:absolute;top:1.6em;width:1.9em;height:.3em;background:#efefef;left:.7em;border-radius:.1em}</style>')
                        .appendTo(resizable_bar);

                }
            }

            // Create iframe
            iframe = $('<iframe />', {
                id: "slidereference_iframe",
                src: this.config.url,
                frameborder: this.config.iframe_border,
                css: this.config.iframe_css
            });


            // Create Slide with iframe
            $(slide)
                .prop("id", "slidereference")
                .append(iframe)
                .append(resizable_bar)
                .css(this.config.css)
                .appendTo(this.element);

            // Close Btn
            if (this.config.close_btn === 'yes') {

                close_btn = $("<div />", {
                    id: "slidereference_close"
                })
                    .html('X')
                    .css(this.config.close_btn_css);

                $('#slidereference').append(close_btn);
                $("#slidereference_close")
                    .click(function () {
                        clearAll();
                        $("#slidereference").remove();
                        $('#slidereference_div').remove();
                        $(ownsite_container).css({"width" : "100%"});
                    });
            }

            // Close BAR
            if (this.config.close_bar === 'yes') {

                close_btn = $("<div />", {
                    id: "slidereference_close"
                })
                    .html(this.config.close_bar_text)
                    .css(this.config.close_bar_css);

                $('#slidereference').append(close_btn);
                $("#slidereference_close")
                    .click(function () {
                        clearAll();
                        $("#slidereference").remove();
                        $('#slidereference_div').remove();
                        $(ownsite_container).css({"width" : "100%"});
                    });

                $("#slidereference_iframe").css({"padding-top": $("#slidereference_close").css("line-height")});
            }

            // Prevent Document to Scroll if iframe is been scrolled
            $('#slidereference').bind('mousewheel DOMMouseScroll', function (e) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                e.preventDefault();
            });

            // Remove loading after content is loaded
            $("#slidereference_iframe").bind("load", function () {

                // Slide iframe to page
                window.setTimeout(function () { changeCss('#slidereference', "margin-left", '-' + w); }, 1);

                // Remove loading scren
                window.setTimeout(function () { $("#slidereference_loading").fadeOut(5000).remove(); }, 1);

            });

            // >> Resizable
            if (this.config.resizable === 'yes') {

                $('#slidereference_dragbar').mousedown(function (e) {

                    e.preventDefault();
                    dragging = true;

                    var main = $("#slidereference"),
                        coverall = $('<div />', {
                            id: 'slidereference_coverall',
                            css: {
                                "position": "fixed",
                                "width": "100%",
                                "height": "100%",
                                "opacity": "0",
                                "z-index": "999991"
                            }
                        }),
                        ghostbar = $('<div />', {
                            id: 'slidereference_ghostbar',
                            css: {
                                "height": main.outerHeight(),
                                "top": main.offset().top,
                                "left": main.offset().left,
                                "width": "3px",
                                "background-color": "#000",
                                "opacity": "1",
                                "position": "absolute",
                                "cursor": "col-resize",
                                "z-index": "999999"
                            }
                        });

                    $(ghostbar).appendTo($('body'));
                    $(coverall).appendTo($('body'));

                    $(document).mousemove(function (e) {
                        ghostbar.css("left", e.pageX + 2);
                    });

                });

                $(document).mouseup(function (e) {
                    var width_right,
                        xpos;
                    if (dragging) {
                        xpos = e.pageX + 2;
                        width_right = $(window).width() - xpos;
                        $(ownsite_container).css({"float": "left", "width": xpos  + 'px'});
                        $("#slidereference").css({"left": xpos + "px", "width": width_right  + 'px', "margin-left": "0px"});
                        $('#slidereference_ghostbar').remove();
                        $('#slidereference_coverall').remove();
                        $(document).unbind('mousemove');
                        dragging = false;
                    }
                });

            }
            // << Resizable

        }

    }

    // Plugin
    $.fn.slidereference = function (options) {

        if (options == 'start'){

            // Add event handlers based on scope
            new AddEventHandler(this);
            return;

        } else {

            // Run Plugin
            new Slidereference(this.first(), options);
            return this.first();
        }

    };

}(jQuery, $));