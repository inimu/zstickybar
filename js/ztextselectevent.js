/*!
 * zTextSelectionEvent
 * Copyright (C) 2010 -2014 - Zon Saja - zonsaja@gmail.com - http://inimu.com
 * Released under the Creative Commons Attribution-Share Alike 3.0  License
 * See the license at http://creativecommons.org/licenses/by-sa/3.0/
 * Basically that means you are free to use zTextSelectionEvent as long as
 * you give proper hyperlink to the author URL above on your website
 * and credit line on the header in your code.
 */

/*!
 * zTextSelectionEvent version 2.0 (2014.04)
 * zTextSelectionEvent is Javascript library to set event listener
 * to select all text inside an element just by clicking the element.
 * The text selection functions can be attached to specific element(s)
 * using element ID or set to specific HTML tag(s).
 * Example: After loading this script, put this function on you script:
 * window.onload = ztse_TextSelectOnClickByTagName('pre');
 * The code will add onclick event listener to all PRE tags on your page
 * so that when user click a PRE element, the text inside it will be
 * automatically selected (without user have to hold and drag mouse to
 * select all text inside).
 */




function ztse_DeselectAllText() {
	if (document.selection) {
		document.selection.empty();
	} else if (window.getSelection) {
		window.getSelection().removeAllRanges();
	}
}
function ztse_SelectTextInElement(ELEMENT) {
	ztse_DeselectAllText();
	if ((ELEMENT.type == 'text') || (ELEMENT.type == 'password') || (ELEMENT.type == 'textarea')) {
		ELEMENT.select();
	} else {
		if (document.selection) {
			var RANGE = document.body.createTextRange();
			RANGE.moveToElementText(ELEMENT);
			RANGE.select();
		} else if (window.getSelection) {
			var RANGE = document.createRange();
			RANGE.selectNode(ELEMENT);
			window.getSelection().addRange(RANGE);
		}
	}
}
function ztse_SelectTextInElementById(ID) {
	ztse_SelectTextInElement(document.getElementById(ID));
}

/* SET CLICK EVENT */
function ztse_TextSelectOnClick(ELEMENT) {
	OLDTITLE = ELEMENT.title || '';
	ELEMENT.title = OLDTITLE + ' - Click to select text - ';
	var ONCLICK = ELEMENT.getAttribute('onclick');
	if (typeof ONCLICK != 'function') {
		ONCLICK = ONCLICK || '';
		ELEMENT.setAttribute('onclick','ztse_SelectTextInElement(this);' + ONCLICK);
	} else {
		ELEMENT.onclick = function() {
			select();
			ONCLICK();
		};
	}
}
function ztse_TextSelectOnClickById(ID) {
	ztse_TextSelectOnClick(document.getElementById(ID));
}
function ztse_TextSelectOnClickByTagName(TAGNAME) {
	for (var i = 0, ELEMENT; ELEMENT = document.getElementsByTagName(TAGNAME)[i]; i++) {
		ztse_TextSelectOnClick(ELEMENT);
	}
}

