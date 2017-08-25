#slidereference
==============

https://github.com/fabionolasco/slidereference

Ultra simple jQuery plugin that helps you link two websites. 
It adds a sidebar to your page, with an iframe, so you can bring external 
content (like Dictionaries, Wikipedia, etc) without using annoying popups nor 
making your visitors leave the page.

Suppose that you have a website with long texts and difficult terminology. 
Now you want to offer a way for your users to look those terms on Wikipedia. 
To solve that problem, many people use popups, modal windows or tooltips. 
But according to some UX specialists those popups and modal windows are too 
blocking, and cause bad user experience. You could use tooltips, but often 
that is not enough.

Slide-reference jQuery plugin is a non-obstructive option that allows you 
to bring any content you want to your website. The sidebar have draggable 
border, so you can make it smaller or bigger. It can certain profit for 
code refactory, since it was my first attempt with JQuery plugin development. 
But I will wait for change requests on GitHub before working with 
this old project.


## Usage

1. Add jQuery to page
2. Add slide-reference JS to page
3. Add attributes to the elements that you desire to use to activate the plugin
    - class = "slidereference"
    - data-url = "YourURL"
    - (optional) data-originaltext = "ElementText"
    - (optional) data-clicktext = "ElementTextAfterClicked"
    - (optional) data-options = "{JS Object Will All Options for Slider}"
4. Execute plugin after page loads

```html
<html>
<head></head>
<body>
    <div class="container">
        <h1>Main Content</>
        <a href="javascript:void(0)"
            class="slidereference"
            data-originaltext="OriginalText"
            data-clicktext="ClickedText"
            data-url="http://en.m.wikipedia.org/wiki/example">Example</a>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="jquery.slidereference.js"></script>
    <script>
        $(function(){
            $(document).slidereference('start');
            // This command will look for the element with the class .slidereference
            // and add functionality to it. In this case it is an A tag.
            // If you want to add it to a specific container, you can do this:
            // $('.container').slidereference('start');
        });
    </script>
</body>
</html>
```
