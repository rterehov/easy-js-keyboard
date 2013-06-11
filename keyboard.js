// Easy-js-keyboard 1.0 

var easy_js_keyboard;
if (!easy_js_keyboard) easy_js_keyboard = {};

easy_js_keyboard.Keyboard = function (kbname, el, text) {
    this.el = el;
    this.kbname = kbname;
    this.text1 = text;
    this.text1.keyboard = this; 
    this.alfabet = 'abv';
    this.shift = 0;
    this.caps = 0;
    this.abv = 0;
    this.on = 0;

    this.browser = "ie";
    this.isOpera = false;
    this.isChrome = false;
    
    if (this.text1.addEventListener) {
        this.browser = "firefox";
        if (typeof window.opera !== "undefined") {
            this.isOpera = true;
            this.browser = "opera";
        }    
        if (typeof window.chrome !== "undefined") {
            this.isChrome = true;
            this.browser = "chrome";
        }    
    }

    this.joined = {
        0: {'eng': this.keys['eng'].join(" ")},
        1: {'ENG': this.keys['ENG'].join(" ")}        
    }
}

easy_js_keyboard.Keyboard.VERSION = '1.0';

easy_js_keyboard.Keyboard.prototype.layout = function() {
    var p = {"rus": "abv", "RUS": "ABV", "abv": "rus", "ABV": "RUS"}
    this.genKeyboard(p[this.alfabet]);
};

// Alphabets
easy_js_keyboard.Keyboard.prototype.keys = {
    'eng': "` 1 2 3 4 5 6 7 8 9 0 - = q w e r t y u i o p [ ] \\ a s d f g h j k l ; ' z x c v b n m , . /".split(' '),
    'rus': "ё 1 2 3 4 5 6 7 8 9 0 - = й ц у к е н г ш щ з х ъ \\ ф ы в а п р о л д ж э я ч с м и т ь б ю .".split(' '),
    'ENG': "~ ! @ # $ % ^ & * ( ) _ + Q W E R T Y U I O P { } | A S D F G H J K L : \" Z X C V B N M < > ?".split(' '),
    'RUS': "Ё ! \" № ; % : ? * ( ) _ + Й Ц У К Е Н Г Ш Щ З Х Ъ / Ф Ы В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю ,".split(' '),
    'abv': "ё 1 2 3 4 5 6 7 8 9 0 - = а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я \\ .".split(' '),
    'ABV': "Ё ! \" № ; % : ? * ( ) _ + А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я / ,".split(' ')
};

// Keyboard configuration
easy_js_keyboard.Keyboard.prototype.lines = {
    1: [[], 13, ["backspace"]],
    2: [["tab"], 13, []],
    3: [["caps"], 11, ["enter"]],
    4: [["layout"], 10, ["shift"]],
    5: [["on_off","space","alt","ctrl"], 0, []]
};

// Additional buttons
easy_js_keyboard.Keyboard.prototype.speckeys = {
    "backspace": {'val': "Bksp", "hint": ''},
    "tab": {'val': "TAB"}, 
    "caps": {'val': "Cap L"},
    "enter": {'val': "Enter"},
    "layout": {'val': {0: "<span class='red'>ру</span>/абв", 1: "ру/<span class='red'>абв</span>"}, 'hint': 'Переключение раскладки'},
    "shift": {'val': "Shift"},
    "ctrl": {'val': "Ctrl"},
    "alt": {'val': "Alt"},
    "space": {'val': " "},
    "on_off": {'val': {1: "<span class='red'>Вкл</span>/Выкл", 0: "Вкл/<span class='red'>Выкл</span>"}, 'hint': "Режим перехвата реальной клавиатуры. Подменяет анлийские символы с реальной клавиатуры их русскими аналогами с виртуальной клавиатуры."}
}

// Key codes

// Additional checks required
easy_js_keyboard.Keyboard.prototype.keycodes = {
        0: {
            45: 'none', // ins
            46: 'del',
            188: 'б',
            190: 'ю',
            192: 'ё',
            18: '.',
            222: 'э',
            186: 'ж',
            189: '-',
            187: '=',
            219: 'х',
            221: 'ъ',
            220: '\\'
        },
        1: {
            18: '/',
            187: '+',
            188: 'б',
            189: '_',
            190: 'ю',
            191: ',',
            192: 'ё',
            186: 'ж',
            222: 'э',
            219: 'х',
            221: 'ъ'
        }
    }

// Additional checks don't required
easy_js_keyboard.Keyboard.prototype.change = {
        0: {
            //18: 47,
            32: 'space',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            8: 'backspace',
            40: 'down',
            16: 'none', // shift
            17: 'none', // ctrl
            38: 'none', 
            40: 'none',
            33: 'none',
            34: 'none'
        },
        1: {
            32: 'space',
            16: 'none'
        }
    }

// Conflicts
easy_js_keyboard.Keyboard.prototype.opera = {
    46: 'ю', // del
    39: 'э'
}

    
easy_js_keyboard.Keyboard.prototype.genKeyboard = function(a) {
    var kbtext = "";
    var rr = 0;
    var ll = -1;
    var left;
    var right;
    
    if (a) {
        this.alfabet = a;
    }
    for (var l in this.lines) {
        rr = rr + this.lines[l][1];
        kbtext += "<div class='line' id='line"+ l +"'>";
        left = 0
        if (this.lines[l][left].length>0) {
            for (var symbol in this.lines[l][left]) {kbtext += this.getButtonCode(l, symbol, 1, left)}
        }
        if (this.keys['eng']) {
            for (var i in this.keys['eng']) {
                if ((i > ll) && (i < rr)) {kbtext += this.getButtonCode(l, i, 0, this.alfabet)}}
        }
        right = 2
        if (this.lines[l][right].length>0) {
            for (var symbol in this.lines[l][right]) {kbtext += this.getButtonCode(l, symbol, 1, right)}
        }
        kbtext += "</div>";
        ll = rr - 1;
    };
    this.el.innerHTML = kbtext;
    this.text1.focus();
}

// Generate button html-code
easy_js_keyboard.Keyboard.prototype.getButtonCode = function (line, symbol, spec, pos) {
    var val = '';
    var name = '';
    var pressed = '';
    var id = '';
    var _class = '';
    var title = '';
    var a;
       
    if (spec) {
        val = this.lines[line][pos][symbol];
        if (this.speckeys[val]) {
            symbol = val;
            if (symbol == 'layout' || symbol == 'on_off') {
                symbol == 'layout' ? a = this.abv : a = this.on;
                name = this.speckeys[val]['val'][a];
            } else {
                name = this.speckeys[val]['val'];
            }
            title = this.speckeys[val]['hint'] ? this.speckeys[val]['hint'] : '';
        } else {
            return '';
        }
    } else {
        if (!this.keys[pos][symbol]) {
            return '';
        }
        val = this.keys[pos][symbol];
        name = val;
    }

    val = escape(val);
    if ((symbol == 'caps' && this.caps) || (symbol == 'shift' && this.shift)) {
        pressed = " press";
    }
    id = "key_" + symbol;
    _class = "key" + pressed;
    return "<a href='javascript:void(0);' title='"+title+"' class='"+_class+"' id='"+id+"' onClick='"+this.kbname+".typeLetter("+'"'+val+'","'+this.text1.id+'","'+this.el.id+'","'+id+'"'+")'>"+name+"</a>";
}

    /* Press button handler
        - letter        keyboard symbol
        - text_id       text container on html page
        - el_id         keyboard ID
    */
easy_js_keyboard.Keyboard.prototype.typeLetter = function (letter, text_id, el_id, key_id) {
        var pos;
        var local_text = document.getElementById(text_id);
        var el = document.getElementById(el_id);
/*
    TODO реализовать отображение нажатия кнопок через setTimeout()
*/                
        var letter = unescape(letter);
        var backspace = 0;
        var tmp = '';
        switch (letter) {
            case "none": return;
            case "space": letter = " "; break;
            case "backspace": backspace = 1; letter = ""; break;
            case "enter": letter = "\n"; break;
            case "tab": letter = "\t"; break;
            case "caps": if (this.caps) {this.caps = 0} else {this.caps = 1}; this.capsLock(); return;
            case "layout": if (this.abv) {this.abv = 0} else {this.abv = 1}; this.layout(); return;
            case "shift": if (this.shift) {this.shift = 0} else (this.shift = 1); this.capsLock(); return;
            case "left": this.setCaretPos(local_text, this.getCaretPos(local_text)-1); return;
            case "right": this.setCaretPos(local_text, this.getCaretPos(local_text)+1); return;
            case "home": this.setCaretPos(local_text, 0); return;
            case "end": this.setCaretPos(local_text, local_text.value.length); return;
            case "del": if (getCaretPos(local_text) !== local_text.value.length) {this.setCaretPos(local_text, this.getCaretPos(local_text)+1); this.typeLetter('backspace');} return;
            case "on_off": this.on ? this.russian_keypad_off() : this.russian_keypad_on(); return;
            case "ctrl": return;
            case "alt": return;
        }

        tmp = local_text.value;
        pos = this.getCaretPos(local_text);
        tmp = tmp.substr(0, pos - backspace) + letter + tmp.substr(pos, tmp.length - pos);
        local_text.value = tmp;
        pos = pos + 1;
        if (backspace) {
            pos = pos - backspace - 1;
        }
        this.setCaretPos(local_text, pos);

        if (this.shift) {
           this.shift = 0;
           this.capsLock(); 
        }
        local_text.focus();
    };

    // caps lock
easy_js_keyboard.Keyboard.prototype.capsLock = function() {
        var p = {"rus": 'RUS', "RUS": 'rus', "abv": 'ABV', "ABV": 'abv'}
        this.genKeyboard(p[this.alfabet]);
    };


// Caret position working
easy_js_keyboard.Keyboard.prototype.getCaretPos = function(obj) {
    obj.focus();
    if (obj.selectionStart+1) return obj.selectionStart; // other browsers
    else if (document.selection) { // IE
        var search_str = '@@@@@';
        var backup = String(obj.value);
        var sel = document.selection.createRange();
        var txt = sel.text;
        document.selection.createRange().text=search_str;
        pos = obj.value.search(search_str);
        obj.value = backup;
        return pos;
     }
     return 0;
}

easy_js_keyboard.Keyboard.prototype.setCaretPos = function (obj, pos) {
    if (obj.selectionStart+1) { // Other browsers
        obj.focus();
        obj.setSelectionRange(pos, pos);
        obj.selectionStart = pos;
        obj.selectionEnd = pos;
    } else {                    // IE
        if(obj.createTextRange) {
            var range = obj.createTextRange();
            range.move('character', pos);
            range.select();
        } else {
            obj.focus();
        }
    }
}

easy_js_keyboard.Keyboard.reg_event = function(ev) {
    keyboard = this.keyboard;
    if (keyboard.on) {
        keyboard.pressKey(ev, keyboard.text1);
        if (keyboard.isOpera) {
            ev.preventDefault();
        }
        keyboard.text1.focus();
        return false;
    }  
    return true;
}

easy_js_keyboard.Keyboard.prototype.russian_keypad_on = function() {
    var text = this.text1;
    if (text.addEventListener) { // Other browsers
        if (this.isChrome) {
            text.addEventListener('keydown', easy_js_keyboard.Keyboard.reg_event, false);
            text.onkeypress = function(){return false;};            
        } else {
            text.addEventListener('keypress', easy_js_keyboard.Keyboard.reg_event, false);
        }
    } else {
        if (text.attachEvent) { // IE
            text.attachEvent('onkeydown', easy_js_keyboard.Keyboard.reg_event);
            text.onkeypress = function(){return false;};
        }
    }
    text.onkeydown = function(){return false;};
    text.onkeyup = function(){return false;};
    this.on = 1;
    this.genKeyboard();
}

easy_js_keyboard.Keyboard.prototype.russian_keypad_off = function() {
    var text = this.text1;
    if (text.addEventListener) { // Other browsers
        text.addEventListener('keypress', function(){return true}, true);
    } else {
        if (text.attachEvent) { // IE
            text.attachEvent('onkeydown', function(){return true});
            text.onkeypress = function(){return true;};
        }
    }
    text.onkeydown = function(){return true;};
    text.onkeyup = function(){return true;};
    this.on = 0;
    this.genKeyboard();
}


// Hardware keyboard handler
easy_js_keyboard.Keyboard.prototype.pressKey = function(keyboard_event, text) {
    var keyboard_layout;
    var changed;
    var letter;
    var position;
    var ke = keyboard_event;
    var shift_status = ke.shiftKey ? 1 : 0;
    var keycode = ke.keyCode ? ke.keyCode : ke.charCode ? ke.charCode : ke.which ? ke.which : 0;
    if (!keycode) {
        return true;
    }
    if (this.change[shift_status] && this.change[shift_status][keycode] && (!this.isOpera || (this.isOpera && !this.opera[keycode]))) {
        letter = this.change[shift_status][keycode];
    } else {
        letter = String.fromCharCode(keycode);
        try {
            position = this.joined[0]['eng'].search(letter) / 2;
        } 
        catch(ex) {
            position = -1;
        } 
        if (((!keyboard_event.charCode && !this.isOpera) || (!keyboard_event.keyCode && this.isOpera)) && this.keycodes[shift_status][keycode]) {
            letter = this.keycodes[shift_status][keycode];
            //if (keycode > 100) {
            letter = shift_status ? letter.toUpperCase() : letter;
            changed = 1;
            //}
        }

        // Opera conflicts
        if (this.isOpera && this.opera[keycode]) {
            letter = this.opera[keycode];
        }
        
        if (!changed) {
            var curr_alfabet;
            for (i in this.joined[shift_status]) {
                var tmp = this.joined[shift_status][i].toLowerCase();
                num = tmp.indexOf(letter.toLowerCase());
                if (num > -1) {
                    keyboard_layout = i;
                    break;
                }
            }
        }

        if (keyboard_layout) {
            var tmp;
            switch (keyboard_layout) {
                case 'eng': tmp = this.alfabet.toLowerCase(); break;
                case 'ENG': tmp = this.alfabet.toUpperCase(); break;
            }
            letter = this.keys[tmp][num / 2];
        }             
    }
    this.typeLetter(escape(letter), text.id, NaN, 'key_'+position);
    return false;
}