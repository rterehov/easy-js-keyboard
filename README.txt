Easy-js-keyboard 1.0 is the very easy javascript keyboard with hardware keyboard interceptor

Installation

Copy easy-js-keyboard folder into you javascript folder.

How to use

<link rel="stylesheet" type="text/css" href="/js/easy-js-keyboard/keyboard.css">
<script type="text/javascript" language="Javascript" src="/js/easy-js-keyboard/keyboard.js"></script>

...

<input type=text id="example_text" name="example" />

<p><div id="keyboard_div"></div>

<script type='text/javascript'>
    var keyboard_div = document.getElementById("keyboard_div");
    var text_field = document.getElementById("example_text");
    var kb = keyboard(keyboard_div, text_field);
</script>

