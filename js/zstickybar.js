/*!
 * zStickyBar
 * Copyright (c) 2014 Zon Saja - zonsaja@gmail.com - http://inimu.com
 * You may use zStickyBar under the terms of the MIT license.
 * Basically that means you are free to use zStickyBar as long as
 * the credit line in HTML code and this header are left intact.
 */

/*!
 * zStickyBar version 1.0
 * zStickyBar is a beautifully designed, yet highly configurable
 * fixed position top/bottom bar widget for website/blog,
 * complete with custom menu, follow box, and page scrolling button.
 * For installation, visit: http:inimu.com/widget/zstickybar
 */







/******************************************************************
 * VARIABLE *
 ******************************************************************/


/* SCRIPT/RESOURCES PATH
 *******************************/
/* PATH DETECTION begin
 * To avoid the following (unnecessary and unreliable) paths detection,
 * it is better to set the default path variables to the actual,
 * hard-coded full paths (where this app is hosted), e.g.:
 * var ZSB_APP_PATH = ZSB_APP_PATH || 'http://zstickybar.googlecode.com/svn/trunk/js/zstickybar.js';
 * var ZSB_APP_ROOT_PATH = ZSB_APP_ROOT_PATH || 'http://zstickybar.googlecode.com/svn/trunk/';
 * var ZSB_APP_JS_PATH = ZSB_APP_JS_PATH || 'http://zstickybar.googlecode.com/svn/trunk/js/';
 * var ZSB_APP_CSS_PATH = ZSB_APP_CSS_PATH || 'http://zstickybar.googlecode.com/svn/trunk/css/';
 * var ZSB_APP_IMG_PATH = ZSB_APP_IMG_PATH || 'http://zstickybar.googlecode.com/svn/trunk/img/';
 */
var ZSB_APP_PATH = ZSB_APP_PATH || (function(){
	var APPURL = '', APPID = 'zsb-app', APPFILENAME = 'zstickybar.js', APPCHECKSTR = 'zStickyBar version 1.0 (2014.04)';
	if (document.getElementById('zsb-app')) {
		APPURL = document.getElementById(APPID).src;
	} else if (document.currentScript) {
		APPURL = document.currentScript.src;
	} else {
		var DOCSCRIPTS = document.getElementsByTagName('script');
		var i, SCRIPT;
		for (i = 0; SCRIPT = DOCSCRIPTS[i]; i++) {
			if (SCRIPT.src) {
				try {
					var REQUEST = new XMLHttpRequest();
					REQUEST.open('GET', SCRIPT.src, false);
					REQUEST.send(null);
					if (REQUEST.responseText.indexOf(APPCHECKSTR)) {
						APPURL = SCRIPT.src;
						break;
					}
				} catch (ZSBERR) {
					var REGEX = new RegExp(APPFILENAME);
					if (SCRIPT.src.match(REGEX)) {
						APPURL = SCRIPT.src;
						break;
					}
				}
			}
		}
	}
	return APPURL.split('?')[0];
})();
var ZSB_APP_ROOT_PATH = ZSB_APP_ROOT_PATH || ZSB_APP_PATH.split('/').slice(0, -1).join('/')+'/../';
var ZSB_APP_JS_PATH = ZSB_APP_JS_PATH || ZSB_APP_ROOT_PATH + 'js/';
var ZSB_APP_CSS_PATH = ZSB_APP_CSS_PATH || ZSB_APP_ROOT_PATH + 'css/';
var ZSB_APP_IMG_PATH = ZSB_APP_IMG_PATH || ZSB_APP_ROOT_PATH + 'img/';
/* PATH DETECTION end */


/* GENERAL OPTIONS
 *******************************/

var ZSB_COLOR_THEME = ZSB_COLOR_THEME || 'light';

var ZSB_FONT_SIZE = ZSB_FONT_SIZE || '14px';
var ZSB_FONT_WEIGHT = ZSB_FONT_WEIGHT || 'normal';

var ZSB_FACEBOOK_URL_ID = ZSB_FACEBOOK_URL_ID || ''; /* 'inimucom'; */
var ZSB_TWITTER_URL_ID = ZSB_TWITTER_URL_ID || ''; /* 'inimu'; */
var ZSB_GOOGLE_URL_ID = ZSB_GOOGLE_URL_ID || ''; /* '+inimu'; */
var ZSB_FEEDBURNER_URL_ID = ZSB_FEEDBURNER_URL_ID || ''; /* 'inimucom'; */


/* DETAILED OPTIONS
 *******************************/
/* bar */
var ZSB_BODY_SPACE_RESERVED = ZSB_BODY_SPACE_RESERVED || '';

var ZSB_BAR_DEFAULT_HIDDEN = ZSB_BAR_DEFAULT_HIDDEN || '';

var ZSB_BAR_WIDTH = ZSB_BAR_WIDTH || '100%'; /* '1000px'; */
var ZSB_BASE_WIDTH = ZSB_BASE_WIDTH || '100%'; /* '1024px'; */

var ZSB_OPACITY = ZSB_OPACITY || '1.0';
var ZSB_BORDER_RADIUS = ZSB_BORDER_RADIUS || '0'; /* '3px'; */
var ZSB_BOXSHADOW_COLOR = ZSB_BOXSHADOW_COLOR || 'none'; /* 'rgba(0,0,0,0.25)'; */

if (ZSB_COLOR_THEME == 'dark') {
	var ZSB_TEXT_COLOR = ZSB_TEXT_COLOR || '#ccc';
	var ZSB_LINK_COLOR = ZSB_LINK_COLOR || '#fff';
	var ZSB_BACKGROUND_COLOR = ZSB_BACKGROUND_COLOR || '#666';
	var ZSB_BACKGROUND_IMAGE = ZSB_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #647684 0%,#383f32 100%)'; */
	var ZSB_BORDER_COLOR = ZSB_BORDER_COLOR || '#333';
} else {
	var ZSB_TEXT_COLOR = ZSB_TEXT_COLOR || '#555';
	var ZSB_LINK_COLOR = ZSB_LINK_COLOR || '#333';
	var ZSB_BACKGROUND_COLOR = ZSB_BACKGROUND_COLOR || '#eee';
	var ZSB_BACKGROUND_IMAGE = ZSB_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%)'; */
	var ZSB_BORDER_COLOR = ZSB_BORDER_COLOR || '#bbb';
}

/* menubar */
if (ZSB_COLOR_THEME == 'dark') {
	var ZSB_MENUBAR_TEXT_COLOR = ZSB_MENUBAR_TEXT_COLOR || ZSB_TEXT_COLOR;
	var ZSB_MENUBAR_LINK_COLOR = ZSB_MENUBAR_LINK_COLOR || ZSB_LINK_COLOR;
	var ZSB_MENUBAR_LINK_BACKGROUND_COLOR = ZSB_MENUBAR_LINK_BACKGROUND_COLOR || 'transparent';
	var ZSB_MENUBAR_LINK_BACKGROUND_IMAGE = ZSB_MENUBAR_LINK_BACKGROUND_IMAGE || 'none';
	var ZSB_MENUBAR_LINK_BORDER_COLOR = ZSB_MENUBAR_LINK_BORDER_COLOR || 'transparent';
} else {
	var ZSB_MENUBAR_TEXT_COLOR = ZSB_MENUBAR_TEXT_COLOR || ZSB_TEXT_COLOR;
	var ZSB_MENUBAR_LINK_COLOR = ZSB_MENUBAR_LINK_COLOR || ZSB_LINK_COLOR;
	var ZSB_MENUBAR_LINK_BACKGROUND_COLOR = ZSB_MENUBAR_LINK_BACKGROUND_COLOR || 'transparent';
	var ZSB_MENUBAR_LINK_BACKGROUND_IMAGE = ZSB_MENUBAR_LINK_BACKGROUND_IMAGE || 'none';
	var ZSB_MENUBAR_LINK_BORDER_COLOR = ZSB_MENUBAR_LINK_BORDER_COLOR || 'transparent';
}

var ZSB_MENUBAR_ITEM_BORDER_RADIUS = ZSB_MENUBAR_ITEM_BORDER_RADIUS || ZSB_BORDER_RADIUS;

if (ZSB_COLOR_THEME == 'dark') {
	var ZSB_MENUBAR_TEXT_HOVER_COLOR = ZSB_MENUBAR_TEXT_HOVER_COLOR || '#ddd';
	var ZSB_MENUBAR_LINK_HOVER_COLOR = ZSB_MENUBAR_LINK_HOVER_COLOR || '#fff';
	var ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR || '#555';
	var ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #333 0%,#444 50%,#555 100%)'; */
	var ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR || '#333';
	var ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = 'none'; /* 'linear-gradient(to bottom, #555 0%,#666 50%,#777 100%)'; */
} else {
	var ZSB_MENUBAR_TEXT_HOVER_COLOR = ZSB_MENUBAR_TEXT_HOVER_COLOR || '#555';
	var ZSB_MENUBAR_LINK_HOVER_COLOR = ZSB_MENUBAR_LINK_HOVER_COLOR || '#333';
	var ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR || '#fff';
	var ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #d0d0d0 0%,#e5e5e5 50%,#ffffff 100%)'; */
	var ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR || '#ddd'; /* '#bcd'; */
	var ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = 'none'; /* 'linear-gradient(to bottom, #ffffff 0%,#e5e5e5 50%,#d0d0d0 100%)'; */
}

/* menubox */
if (ZSB_COLOR_THEME == 'dark') {
	var ZSB_MENUBOX_TEXT_COLOR = ZSB_MENUBOX_TEXT_COLOR || ZSB_MENUBAR_TEXT_COLOR;
	var ZSB_MENUBOX_LINK_COLOR = ZSB_MENUBOX_LINK_COLOR || ZSB_MENUBAR_LINK_COLOR;
	var ZSB_MENUBOX_BACKGROUND_COLOR = ZSB_MENUBOX_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
	var ZSB_MENUBOX_BACKGROUND_IMAGE = ZSB_MENUBOX_BACKGROUND_IMAGE || 'none';
	var ZSB_MENUBOX_BORDER_COLOR = ZSB_MENUBOX_BORDER_COLOR || ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR;
	var ZSB_MENUBOX_ACCENT_BORDER_COLOR = ZSB_MENUBOX_ACCENT_BORDER_COLOR || ZSB_MENUBOX_BACKGROUND_COLOR;
} else {
	var ZSB_MENUBOX_TEXT_COLOR = ZSB_MENUBOX_TEXT_COLOR || ZSB_MENUBAR_TEXT_COLOR;
	var ZSB_MENUBOX_LINK_COLOR = ZSB_MENUBOX_LINK_COLOR || ZSB_MENUBAR_LINK_COLOR;
	var ZSB_MENUBOX_BACKGROUND_COLOR = ZSB_MENUBOX_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
	var ZSB_MENUBOX_BACKGROUND_IMAGE = ZSB_MENUBOX_BACKGROUND_IMAGE || 'none';
	var ZSB_MENUBOX_BORDER_COLOR = ZSB_MENUBOX_BORDER_COLOR || ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR;
	var ZSB_MENUBOX_ACCENT_BORDER_COLOR = ZSB_MENUBOX_ACCENT_BORDER_COLOR || ZSB_MENUBOX_BACKGROUND_COLOR;
}
var ZSB_MENUBOX_ACCENT_BORDER_WIDTH = ZSB_MENUBOX_ACCENT_BORDER_WIDTH || '1px';

var ZSB_MENUBOX_PADDING = ZSB_MENUBOX_PADDING || '0.5em';
var ZSB_MENUBOX_BORDER_RADIUS = ZSB_MENUBOX_BORDER_RADIUS || ZSB_BORDER_RADIUS;
var ZSB_MENUBOX_BOXSHADOW_COLOR = ZSB_MENUBOX_BOXSHADOW_COLOR || ZSB_BOXSHADOW_COLOR;
var ZSB_MENUBOX_OPACITY = ZSB_MENUBOX_OPACITY || '1.0';

var ZSB_MENUBOX_ITEM_BORDER_RADIUS = ZSB_MENUBOX_ITEM_BORDER_RADIUS || ZSB_MENUBAR_ITEM_BORDER_RADIUS;

if (ZSB_COLOR_THEME == 'dark') {
	var ZSB_MENUBOX_TEXT_HOVER_COLOR = ZSB_MENUBOX_TEXT_HOVER_COLOR || '#ddd';
	var ZSB_MENUBOX_LINK_HOVER_COLOR = ZSB_MENUBOX_LINK_HOVER_COLOR || '#fff';
	var ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR || '#777'; /* '#6f777f'; */
	var ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #7b7d7f 0%,#6d757f 47%,#5f6d7f 100%)'; */
	var ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR || '#555'; /* '#345'; */
} else {
	var ZSB_MENUBOX_TEXT_HOVER_COLOR = ZSB_MENUBOX_TEXT_HOVER_COLOR || '#444';
	var ZSB_MENUBOX_LINK_HOVER_COLOR = ZSB_MENUBOX_LINK_HOVER_COLOR || '#222';
	var ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR || '#f4f4f4'; /* '#eff7ff'; */
	var ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE || 'none'; /* 'linear-gradient(to bottom, #fbfdff 0%,#edf5ff 47%,#dfedff 100%)'; */
	var ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR || '#ddd'; /* '#bdf'; */
}


/* DETAILED TOP BAR OPTIONS
 *******************************/
/* bar */
var ZSB_TOP_BAR_DEFAULT_HIDDEN = ZSB_TOP_BAR_DEFAULT_HIDDEN || ZSB_BAR_DEFAULT_HIDDEN;
var ZSB_TOP_HIDDEN = ZSB_TOP_BAR_DEFAULT_HIDDEN;
if ( (ZSB_TOP_HIDDEN == 'yes') || (ZSB_TOP_HIDDEN == 'true') || (ZSB_TOP_HIDDEN == true) ) { ZSB_TOP_HIDDEN = true; } else { ZSB_TOP_HIDDEN = false };

var ZSB_TOP_BODY_SPACE_RESERVED = ZSB_TOP_BODY_SPACE_RESERVED || ZSB_BODY_SPACE_RESERVED;
var ZSB_TOP_RSV = ZSB_TOP_BODY_SPACE_RESERVED;
if ( (ZSB_TOP_RSV == 'yes') || (ZSB_TOP_RSV == 'true') || (ZSB_TOP_RSV == true) ) { ZSB_TOP_RSV = true; } else { ZSB_TOP_RSV = false };

var ZSB_TOP_BAR_WIDTH = ZSB_TOP_BAR_WIDTH || ZSB_BAR_WIDTH;
var ZSB_TOP_BASE_WIDTH = ZSB_TOP_BASE_WIDTH || ZSB_BASE_WIDTH;

var ZSB_TOP_TEXT_COLOR = ZSB_TOP_TEXT_COLOR || ZSB_TEXT_COLOR;
var ZSB_TOP_LINK_COLOR = ZSB_TOP_LINK_COLOR || ZSB_LINK_COLOR;
var ZSB_TOP_BASE_BACKGROUND_COLOR = ZSB_TOP_BASE_BACKGROUND_COLOR || ZSB_BACKGROUND_COLOR;
var ZSB_TOP_BASE_BACKGROUND_IMAGE = ZSB_TOP_BASE_BACKGROUND_IMAGE || ZSB_BACKGROUND_IMAGE;
var ZSB_TOP_BASE_BORDER_COLOR = ZSB_TOP_BASE_BORDER_COLOR || ZSB_BORDER_COLOR;
var ZSB_TOP_BASE_BORDER_RADIUS = ZSB_TOP_BASE_BORDER_RADIUS || ZSB_BORDER_RADIUS;
var ZSB_TOP_BASE_BOXSHADOW_COLOR = ZSB_TOP_BASE_BOXSHADOW_COLOR || ZSB_BOXSHADOW_COLOR;
var ZSB_TOP_BASE_OPACITY = ZSB_TOP_BASE_OPACITY || ZSB_OPACITY;

/* menubar */
var ZSB_TOP_MENUBAR_TEXT_COLOR = ZSB_TOP_MENUBAR_TEXT_COLOR || ZSB_MENUBAR_TEXT_COLOR;
var ZSB_TOP_MENUBAR_LINK_COLOR = ZSB_TOP_MENUBAR_LINK_COLOR || ZSB_MENUBAR_LINK_COLOR;
var ZSB_TOP_MENUBAR_LINK_BACKGROUND_COLOR = ZSB_TOP_MENUBAR_LINK_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_BACKGROUND_COLOR;
var ZSB_TOP_MENUBAR_LINK_BACKGROUND_IMAGE = ZSB_TOP_MENUBAR_LINK_BACKGROUND_IMAGE || ZSB_MENUBAR_LINK_BACKGROUND_IMAGE;
var ZSB_TOP_MENUBAR_LINK_BORDER_COLOR = ZSB_TOP_MENUBAR_LINK_BORDER_COLOR || ZSB_MENUBAR_LINK_BORDER_COLOR;

var ZSB_TOP_MENUBAR_ITEM_BORDER_RADIUS = ZSB_TOP_MENUBAR_ITEM_BORDER_RADIUS || ZSB_MENUBAR_ITEM_BORDER_RADIUS;

var ZSB_TOP_MENUBAR_TEXT_HOVER_COLOR = ZSB_TOP_MENUBAR_TEXT_HOVER_COLOR || ZSB_MENUBAR_TEXT_HOVER_COLOR;
var ZSB_TOP_MENUBAR_LINK_HOVER_COLOR = ZSB_TOP_MENUBAR_LINK_HOVER_COLOR || ZSB_MENUBAR_LINK_HOVER_COLOR;
var ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
var ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE;
var ZSB_TOP_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSB_TOP_MENUBAR_LINK_HOVER_BORDER_COLOR || ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR;

/* menubox */
var ZSB_TOP_MENUBOX_TEXT_COLOR = ZSB_TOP_MENUBOX_TEXT_COLOR || ZSB_MENUBOX_TEXT_COLOR;
var ZSB_TOP_MENUBOX_LINK_COLOR = ZSB_TOP_MENUBOX_LINK_COLOR || ZSB_MENUBOX_LINK_COLOR;
var ZSB_TOP_MENUBOX_BACKGROUND_COLOR = ZSB_TOP_MENUBOX_BACKGROUND_COLOR || ZSB_MENUBOX_BACKGROUND_COLOR;
var ZSB_TOP_MENUBOX_BACKGROUND_IMAGE = ZSB_TOP_MENUBOX_BACKGROUND_IMAGE || ZSB_MENUBOX_BACKGROUND_IMAGE;
var ZSB_TOP_MENUBOX_BORDER_COLOR = ZSB_TOP_MENUBOX_BORDER_COLOR || ZSB_MENUBOX_BORDER_COLOR;
var ZSB_TOP_MENUBOX_PADDING = ZSB_TOP_MENUBOX_PADDING || ZSB_MENUBOX_PADDING;
var ZSB_TOP_MENUBOX_BORDER_RADIUS = ZSB_TOP_MENUBOX_BORDER_RADIUS || ZSB_MENUBOX_BORDER_RADIUS;
var ZSB_TOP_MENUBOX_ACCENT_BORDER_COLOR = ZSB_TOP_MENUBOX_ACCENT_BORDER_COLOR || ZSB_MENUBOX_ACCENT_BORDER_COLOR;
var ZSB_TOP_MENUBOX_ACCENT_BORDER_WIDTH = ZSB_TOP_MENUBOX_ACCENT_BORDER_WIDTH || ZSB_MENUBOX_ACCENT_BORDER_WIDTH;
var ZSB_TOP_MENUBOX_BOXSHADOW_COLOR = ZSB_TOP_MENUBOX_BOXSHADOW_COLOR || ZSB_MENUBOX_BOXSHADOW_COLOR;
var ZSB_TOP_MENUBOX_OPACITY = ZSB_TOP_MENUBOX_OPACITY || ZSB_MENUBOX_OPACITY;

var ZSB_TOP_MENUBOX_ITEM_BORDER_RADIUS = ZSB_TOP_MENUBOX_ITEM_BORDER_RADIUS || ZSB_MENUBOX_ITEM_BORDER_RADIUS;

var ZSB_TOP_MENUBOX_TEXT_HOVER_COLOR = ZSB_TOP_MENUBOX_TEXT_HOVER_COLOR || ZSB_MENUBOX_TEXT_HOVER_COLOR;
var ZSB_TOP_MENUBOX_LINK_HOVER_COLOR = ZSB_TOP_MENUBOX_LINK_HOVER_COLOR || ZSB_MENUBOX_LINK_HOVER_COLOR;
var ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR || ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
var ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE || ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
var ZSB_TOP_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSB_TOP_MENUBOX_LINK_HOVER_BORDER_COLOR || ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR;


/* DETAILED BOTTOM BAR OPTIONS
 *******************************/
/* bar */
var ZSB_BOTTOM_BAR_DEFAULT_HIDDEN = ZSB_BOTTOM_BAR_DEFAULT_HIDDEN || ZSB_BAR_DEFAULT_HIDDEN;
var ZSB_BOTTOM_HIDDEN = ZSB_BOTTOM_BAR_DEFAULT_HIDDEN;
if ( (ZSB_BOTTOM_HIDDEN == 'yes') || (ZSB_BOTTOM_HIDDEN == 'true') || (ZSB_BOTTOM_HIDDEN == true) ) { ZSB_BOTTOM_HIDDEN = true; } else { ZSB_BOTTOM_HIDDEN = false };

var ZSB_BOTTOM_BODY_SPACE_RESERVED = ZSB_BOTTOM_BODY_SPACE_RESERVED || ZSB_BODY_SPACE_RESERVED;
var ZSB_BOTTOM_RSV = ZSB_BOTTOM_BODY_SPACE_RESERVED;
if ( (ZSB_BOTTOM_RSV == 'yes') || (ZSB_BOTTOM_RSV == 'true') || (ZSB_BOTTOM_RSV == true) ) { ZSB_BOTTOM_RSV = true; } else { ZSB_BOTTOM_RSV = false };

var ZSB_BOTTOM_BAR_WIDTH = ZSB_BOTTOM_BAR_WIDTH || ZSB_BAR_WIDTH;
var ZSB_BOTTOM_BASE_WIDTH = ZSB_BOTTOM_BASE_WIDTH || ZSB_BASE_WIDTH;

var ZSB_BOTTOM_TEXT_COLOR = ZSB_BOTTOM_TEXT_COLOR || ZSB_TEXT_COLOR;
var ZSB_BOTTOM_LINK_COLOR = ZSB_BOTTOM_LINK_COLOR || ZSB_LINK_COLOR;
var ZSB_BOTTOM_BASE_BACKGROUND_COLOR = ZSB_BOTTOM_BASE_BACKGROUND_COLOR || ZSB_BACKGROUND_COLOR;
var ZSB_BOTTOM_BASE_BACKGROUND_IMAGE = ZSB_BOTTOM_BASE_BACKGROUND_IMAGE || ZSB_BACKGROUND_IMAGE;
var ZSB_BOTTOM_BASE_BORDER_COLOR = ZSB_BOTTOM_BASE_BORDER_COLOR || ZSB_BORDER_COLOR;
var ZSB_BOTTOM_BASE_BORDER_RADIUS = ZSB_BOTTOM_BASE_BORDER_RADIUS || ZSB_BORDER_RADIUS;
var ZSB_BOTTOM_BASE_BOXSHADOW_COLOR = ZSB_BOTTOM_BASE_BOXSHADOW_COLOR || ZSB_BOXSHADOW_COLOR;
var ZSB_BOTTOM_BASE_OPACITY = ZSB_BOTTOM_BASE_OPACITY || ZSB_OPACITY;

/* menubar */
var ZSB_BOTTOM_MENUBAR_TEXT_COLOR = ZSB_BOTTOM_MENUBAR_TEXT_COLOR || ZSB_MENUBAR_TEXT_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_COLOR = ZSB_BOTTOM_MENUBAR_LINK_COLOR || ZSB_MENUBAR_LINK_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_COLOR = ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_BACKGROUND_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_IMAGE = ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_IMAGE || ZSB_MENUBAR_LINK_BACKGROUND_IMAGE;
var ZSB_BOTTOM_MENUBAR_LINK_BORDER_COLOR = ZSB_BOTTOM_MENUBAR_LINK_BORDER_COLOR || ZSB_MENUBAR_LINK_BORDER_COLOR;

var ZSB_BOTTOM_MENUBAR_ITEM_BORDER_RADIUS = ZSB_BOTTOM_MENUBAR_ITEM_BORDER_RADIUS || ZSB_MENUBAR_ITEM_BORDER_RADIUS;

var ZSB_BOTTOM_MENUBAR_TEXT_HOVER_COLOR = ZSB_BOTTOM_MENUBAR_TEXT_HOVER_COLOR || ZSB_MENUBAR_TEXT_HOVER_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_HOVER_COLOR = ZSB_BOTTOM_MENUBAR_LINK_HOVER_COLOR || ZSB_MENUBAR_LINK_HOVER_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
var ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE || ZSB_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE;
var ZSB_BOTTOM_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSB_BOTTOM_MENUBAR_LINK_HOVER_BORDER_COLOR || ZSB_MENUBAR_LINK_HOVER_BORDER_COLOR;

/* menubox */
var ZSB_BOTTOM_MENUBOX_TEXT_COLOR = ZSB_BOTTOM_MENUBOX_TEXT_COLOR || ZSB_MENUBOX_TEXT_COLOR;
var ZSB_BOTTOM_MENUBOX_LINK_COLOR = ZSB_BOTTOM_MENUBOX_LINK_COLOR || ZSB_MENUBOX_LINK_COLOR;
var ZSB_BOTTOM_MENUBOX_BACKGROUND_COLOR = ZSB_BOTTOM_MENUBOX_BACKGROUND_COLOR || ZSB_MENUBOX_BACKGROUND_COLOR;
var ZSB_BOTTOM_MENUBOX_BACKGROUND_IMAGE = ZSB_BOTTOM_MENUBOX_BACKGROUND_IMAGE || ZSB_MENUBOX_BACKGROUND_IMAGE;
var ZSB_BOTTOM_MENUBOX_BORDER_COLOR = ZSB_BOTTOM_MENUBOX_BORDER_COLOR || ZSB_MENUBOX_BORDER_COLOR;
var ZSB_BOTTOM_MENUBOX_PADDING = ZSB_BOTTOM_MENUBOX_PADDING || ZSB_MENUBOX_PADDING;
var ZSB_BOTTOM_MENUBOX_BORDER_RADIUS = ZSB_BOTTOM_MENUBOX_BORDER_RADIUS || ZSB_MENUBOX_BORDER_RADIUS;
var ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_COLOR = ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_COLOR || ZSB_MENUBOX_ACCENT_BORDER_COLOR;
var ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH = ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH || ZSB_MENUBOX_ACCENT_BORDER_WIDTH;
var ZSB_BOTTOM_MENUBOX_BOXSHADOW_COLOR = ZSB_BOTTOM_MENUBOX_BOXSHADOW_COLOR || ZSB_MENUBOX_BOXSHADOW_COLOR;
var ZSB_BOTTOM_MENUBOX_OPACITY = ZSB_BOTTOM_MENUBOX_OPACITY || ZSB_MENUBOX_OPACITY;

var ZSB_BOTTOM_MENUBOX_ITEM_BORDER_RADIUS = ZSB_BOTTOM_MENUBOX_ITEM_BORDER_RADIUS || ZSB_MENUBOX_ITEM_BORDER_RADIUS;

var ZSB_BOTTOM_MENUBOX_TEXT_HOVER_COLOR = ZSB_BOTTOM_MENUBOX_TEXT_HOVER_COLOR || ZSB_MENUBOX_TEXT_HOVER_COLOR;
var ZSB_BOTTOM_MENUBOX_LINK_HOVER_COLOR = ZSB_BOTTOM_MENUBOX_LINK_HOVER_COLOR || ZSB_MENUBOX_LINK_HOVER_COLOR;
var ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR || ZSB_MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
var ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE || ZSB_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
var ZSB_BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSB_BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR || ZSB_MENUBOX_LINK_HOVER_BORDER_COLOR;


/* SOCIAL MEDIA OPTIONS
 *******************************/
if (ZSB_FACEBOOK_URL_ID) {
	var ZSB_FACEBOOK_URL = 'http://www.facebook.com/'+ZSB_FACEBOOK_URL_ID+'';
	var ZSB_FACEBOOK_IFRAME_URL = '//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F'+ZSB_FACEBOOK_URL_ID+'&amp;locale=en_US&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21';
}
if (ZSB_TWITTER_URL_ID) {
	var ZSB_TWITTER_URL = 'http://twitter.com/'+ZSB_TWITTER_URL_ID+'';
	var ZSB_TWITTER_IFRAME_URL = '//platform.twitter.com/widgets/follow_button.html?screen_name='+ZSB_TWITTER_URL_ID+'&lang=en&show_screen_name=false';
}
if (ZSB_GOOGLE_URL_ID) {
	var ZSB_GOOGLE_URL = 'https://plus.google.com/'+ZSB_GOOGLE_URL_ID+'';
}
if (ZSB_FEEDBURNER_URL_ID) {
	var ZSB_FEEDBURNER_URL = 'http://feeds.feedburner.com/'+ZSB_FEEDBURNER_URL_ID+'';
	var ZSB_FEEDBURNER_MAIL_URL = 'http://feedburner.google.com/fb/a/mailverify?uri='+ZSB_FEEDBURNER_URL_ID+'';
	var ZSB_FEEDBURNER_IMAGE_URL = 'http://feeds.feedburner.com/~fc/'+ZSB_FEEDBURNER_URL_ID+'?bg=CCCCCC&amp;fg=000000&amp;anim=0';
}
var ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR = '#bbb';
var ZSB_FEEDBURNER_INPUT_BORDER_COLOR_FOCUS = '#4ae';
var ZSB_FEEDBURNER_ENTRY_COLOR_BLUR = '#888';
var ZSB_FEEDBURNER_ENTRY_COLOR_FOCUS = '#000';
var ZSB_FEEDBURNER_ENTRY_BACKGROUND_COLOR_BLUR = '#fff';
var ZSB_FEEDBURNER_ENTRY_BACKGROUND_COLOR_FOCUS = '#ffe';
var ZSB_FEEDBURNER_BUTTON_COLOR_BLUR = '#fff';
var ZSB_FEEDBURNER_BUTTON_COLOR_FOCUS = '#444';
var ZSB_FEEDBURNER_BUTTON_BACKGROUND_COLOR_BLUR = '#9ab';
var ZSB_FEEDBURNER_BUTTON_BACKGROUND_COLOR_FOCUS = '#bdf';

var ZSB_FEEDBURNER_EMAIL_INIT_VALUE = 'Enter email here';
var ZSB_FEEDBURNER_TITLE_TEXT = 'Enter your email address, and then click Follow button';


/* USER DEFINED STYLE
 *******************************/
var ZSB_USER_DEFINED_STYLE_STRING = ''+
	'#zsb-container {'+
		'font-size: '+ZSB_FONT_SIZE+';'+
		'font-weight: '+ZSB_FONT_WEIGHT+';'+
	'}'+
	/*top*/
	'#zsb-top-base, #zsb-top-bar {'+
		'border-radius: 0 0 '+ZSB_TOP_BASE_BORDER_RADIUS+' '+ZSB_TOP_BASE_BORDER_RADIUS+';'+
	'}'+
	'#zsb-top-base {'+
		'width: '+ZSB_TOP_BASE_WIDTH+';'+
		'min-width: '+ZSB_TOP_BAR_WIDTH+';'+
		'background-color: '+ZSB_TOP_BASE_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_TOP_BASE_BACKGROUND_IMAGE+';'+
		'box-shadow: 0 0 10px '+ZSB_TOP_BASE_BOXSHADOW_COLOR+';'+
		'border-color: '+ZSB_TOP_BASE_BORDER_COLOR+';'+
		'opacity: '+ZSB_TOP_BASE_OPACITY+';'+
	'}'+
	'#zsb-top-bar {'+
		'color: '+ZSB_TOP_TEXT_COLOR+';'+
		'width: '+ZSB_TOP_BAR_WIDTH+';'+
		'max-width: '+ZSB_TOP_BASE_WIDTH+';'+
	'}'+
	'#zsb-top-bar .zsb-box > a,'+
	'#zsb-top-bar .zsb-box > div > a,'+
	'#zsb-top-bar a,'+
	'#zsb-top-bar .zsb-menubar-item > a {'+
		'color: '+ZSB_TOP_MENUBAR_LINK_COLOR+';'+
		'background-color: '+ZSB_TOP_MENUBAR_LINK_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_TOP_MENUBAR_LINK_BACKGROUND_IMAGE+';'+
		'border-color: '+ZSB_TOP_MENUBAR_LINK_BORDER_COLOR+';'+
		'border-radius: '+ZSB_TOP_MENUBAR_ITEM_BORDER_RADIUS+' '+ZSB_TOP_MENUBAR_ITEM_BORDER_RADIUS+' 0 0;'+
	'}'+
	'#zsb-top-bar .zsb-box > a:hover,'+
	'#zsb-top-bar .zsb-box > div > a:hover,'+
	'#zsb-top-bar a:hover,'+
	'#zsb-top-bar .zsb-menubar-item > a:hover,'+
	'#zsb-top-bar .zsb-menubar-item:hover > a {'+
		'color: '+ZSB_TOP_MENUBAR_LINK_HOVER_COLOR+';'+
		'background-color: '+ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_TOP_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE+';'+
		'border-color: '+ZSB_TOP_MENUBAR_LINK_HOVER_BORDER_COLOR+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul li.zsb-menu-separator {'+
		'border-color: '+ZSB_TOP_MENUBOX_TEXT_COLOR+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul {'+
		'border-color: '+ZSB_TOP_MENUBOX_BORDER_COLOR+';'+
		'border-top-color: '+ZSB_TOP_MENUBOX_ACCENT_BORDER_COLOR+';'+
		'border-top-width: '+ZSB_TOP_MENUBOX_ACCENT_BORDER_WIDTH+';'+
		'padding: '+ZSB_TOP_MENUBOX_PADDING+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item .zsb-top-menu-list-base, #zsb-top-bar .zsb-menubar-item ul li.zsb-top-menu-list-base {'+
		'background-color: '+ZSB_TOP_MENUBOX_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_TOP_MENUBOX_BACKGROUND_IMAGE+';'+
		'box-shadow: 0 2px 10px '+ZSB_TOP_MENUBOX_BOXSHADOW_COLOR+';'+
		'opacity: '+ZSB_TOP_MENUBOX_OPACITY+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul,'+
	'#zsb-top-bar .zsb-menubar-item .zsb-top-menu-list-base,'+
	'#zsb-top-bar .zsb-menubar-item ul li.zsb-top-menu-list-base {'+
		'border-radius: 0 '+ZSB_TOP_MENUBOX_BORDER_RADIUS+' '+ZSB_TOP_MENUBOX_BORDER_RADIUS+' '+ZSB_TOP_MENUBOX_BORDER_RADIUS+';'+
	'}'+
	'#zsb-top-bar #zsb-top-right-box .zsb-menubar-item ul,'+
	'#zsb-top-bar #zsb-top-right-box .zsb-menubar-item .zsb-top-menu-list-base,'+
	'#zsb-top-bar #zsb-top-right-box .zsb-menubar-item ul li.zsb-top-menu-list-base {'+
		'border-radius: '+ZSB_TOP_MENUBOX_BORDER_RADIUS+' '+ZSB_TOP_MENUBOX_BORDER_RADIUS+' '+ZSB_TOP_MENUBOX_BORDER_RADIUS+' '+ZSB_TOP_MENUBOX_BORDER_RADIUS+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul, #zsb-top-bar .zsb-menubar-item ul .zsb-table-menu {'+
		'color: '+ZSB_TOP_MENUBOX_TEXT_COLOR+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul a, #zsb-top-bar .zsb-menubar-item ul .zsb-table-menu a {'+
		'color: '+ZSB_TOP_MENUBOX_LINK_COLOR+';'+
		'border-radius: '+ZSB_TOP_MENUBOX_ITEM_BORDER_RADIUS+';'+
	'}'+
	'#zsb-top-bar .zsb-menubar-item ul a:hover, #zsb-top-bar .zsb-menubar-item ul .zsb-table-menu a:hover {'+
		'color: '+ZSB_TOP_MENUBOX_LINK_HOVER_COLOR+';'+
		'background-color: '+ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
		'border-color: '+ZSB_TOP_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
	'}'+
	/*bottom*/
	'#zsb-bottom-base, #zsb-bottom-bar {'+
		'border-radius: '+ZSB_BOTTOM_BASE_BORDER_RADIUS+' '+ZSB_BOTTOM_BASE_BORDER_RADIUS+' 0 0;'+
	'}'+
	'#zsb-bottom-base {'+
		'width: '+ZSB_BOTTOM_BASE_WIDTH+';'+
		'min-width: '+ZSB_BOTTOM_BAR_WIDTH+';'+
		'background-color: '+ZSB_BOTTOM_BASE_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_BOTTOM_BASE_BACKGROUND_IMAGE+';'+
		'box-shadow: 0 0 10px '+ZSB_BOTTOM_BASE_BOXSHADOW_COLOR+';'+
		'border-color: '+ZSB_BOTTOM_BASE_BORDER_COLOR+';'+
		'opacity: '+ZSB_BOTTOM_BASE_OPACITY+';'+
	'}'+
	'#zsb-bottom-bar {'+
		'color: '+ZSB_BOTTOM_TEXT_COLOR+';'+
		'width: '+ZSB_BOTTOM_BAR_WIDTH+';'+
		'max-width: '+ZSB_BOTTOM_BASE_WIDTH+';'+
	'}'+
	'#zsb-bottom-bar .zsb-box > a,'+
	'#zsb-bottom-bar .zsb-box > div > a,'+
	'#zsb-bottom-bar a,'+
	'#zsb-bottom-bar .zsb-menubar-item > a {'+
		'color: '+ZSB_BOTTOM_MENUBAR_LINK_COLOR+';'+
		'background-image: '+ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_IMAGE+';'+
		'background-color: '+ZSB_BOTTOM_MENUBAR_LINK_BACKGROUND_COLOR+';'+
		'border-color: '+ZSB_BOTTOM_MENUBAR_LINK_BORDER_COLOR+';'+
		'border-radius: 0 0 '+ZSB_BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+';'+
	'}'+
	'#zsb-bottom-bar .zsb-box > a:hover,'+
	'#zsb-bottom-bar .zsb-box > div > a:hover,'+
	'#zsb-bottom-bar a:hover,'+
	'#zsb-bottom-bar .zsb-menubar-item:hover > a,'+
	'#zsb-bottom-bar .zsb-menubar-item > a:hover {'+
		'color: '+ZSB_BOTTOM_MENUBAR_LINK_HOVER_COLOR+';'+
		'background-color: '+ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE+';'+
		'border-color: '+ZSB_BOTTOM_MENUBAR_LINK_HOVER_BORDER_COLOR+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul li.zsb-menu-separator {'+
		'border-color: '+ZSB_BOTTOM_MENUBOX_TEXT_COLOR+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul {'+
		'border-color: '+ZSB_BOTTOM_MENUBOX_BORDER_COLOR+';'+
		'border-bottom-color: '+ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_COLOR+';'+
		'border-bottom-width: '+ZSB_BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH+';'+
		'padding: '+ZSB_BOTTOM_MENUBOX_PADDING+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item .zsb-bottom-menu-list-base, #zsb-bottom-bar .zsb-menubar-item ul li.zsb-bottom-menu-list-base {'+
		'background-color: '+ZSB_BOTTOM_MENUBOX_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_BOTTOM_MENUBOX_BACKGROUND_IMAGE+';'+
		'box-shadow: 0 2px 10px '+ZSB_BOTTOM_MENUBOX_BOXSHADOW_COLOR+';'+
		'opacity: '+ZSB_BOTTOM_MENUBOX_OPACITY+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul,'+
	'#zsb-bottom-bar .zsb-menubar-item .zsb-bottom-menu-list-base,'+
	'#zsb-bottom-bar .zsb-menubar-item ul li.zsb-bottom-menu-list-base {'+
		'border-radius: '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' 0;'+
	'}'+
	'#zsb-bottom-bar #zsb-bottom-right-box .zsb-menubar-item ul,'+
	'#zsb-bottom-bar #zsb-bottom-right-box .zsb-menubar-item .zsb-bottom-menu-list-base,'+
	'#zsb-bottom-bar #zsb-bottom-right-box .zsb-menubar-item ul li.zsb-bottom-menu-list-base {'+
		'border-radius: '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+' '+ZSB_BOTTOM_MENUBOX_BORDER_RADIUS+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul, #zsb-bottom-bar .zsb-menubar-item ul .zsb-table-menu {'+
		'color: '+ZSB_BOTTOM_MENUBOX_TEXT_COLOR+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul a, #zsb-bottom-bar .zsb-menubar-item ul .zsb-table-menu a {'+
		'color: '+ZSB_BOTTOM_MENUBOX_LINK_COLOR+';'+
		'border-radius: '+ZSB_BOTTOM_MENUBOX_ITEM_BORDER_RADIUS+';'+
	'}'+
	'#zsb-bottom-bar .zsb-menubar-item ul a:hover, #zsb-bottom-bar .zsb-menubar-item ul .zsb-table-menu a:hover {'+
		'color: '+ZSB_BOTTOM_MENUBOX_LINK_HOVER_COLOR+';'+
		'background-color: '+ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
		'background-image: '+ZSB_BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
		'border-color: '+ZSB_BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
	'}'+
'';


/*******************************
 * INTERNAL VARIABLE
 *******************************/

var ZSB_CONTAINER = document.getElementById('zsb-container');

var ZSB_TOP_BAR = document.getElementById('zsb-top-bar');
var ZSB_TOP_LEFT_BOX = document.getElementById('zsb-top-left-box');
var ZSB_TOP_CENTER_BOX = document.getElementById('zsb-top-center-box');
var ZSB_TOP_RIGHT_BOX = document.getElementById('zsb-top-right-box');

var ZSB_BOTTOM_BAR = document.getElementById('zsb-bottom-bar');
var ZSB_BOTTOM_LEFT_BOX = document.getElementById('zsb-bottom-left-box');
var ZSB_BOTTOM_CENTER_BOX = document.getElementById('zsb-bottom-center-box');
var ZSB_BOTTOM_RIGHT_BOX = document.getElementById('zsb-bottom-right-box');

var ZSB_BTELM = document.getElementById(unescape('%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65'));
var ZSB_BTELMREF = unescape('%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72');
var ZSB_BTELMTITLE = unescape('%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D');
var ZSB_BTELMSTR = unescape('%3C%61%20%69%64%3D%22%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65%22%20%68%72%65%66%3D%22%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72%22%3E%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D%3C%2F%61%3E');
var ZSB_MSIE8_MIN = (function(){
	var REGEX = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
	if ( (navigator.appName == 'Microsoft Internet Explorer') && (REGEX.exec(navigator.userAgent) != null) && (parseFloat(RegExp.$1) < 9.0) ) {
		return true;
	}
})();
var ZSB_BTELMATTRLEN = (function(){
	var COUNT = 0;
	for (var i=0, ATTR; ATTR=ZSB_BTELM.attributes[i]; i++) {
		if (ZSB_MSIE8_MIN) {
			if (ATTR.specified) { COUNT++; }
		} else {
			COUNT++;
		}
	}
	return COUNT;
})();
if ((ZSB_BTELM.href != ZSB_BTELMREF) || (ZSB_BTELMATTRLEN != 2)) { ZSB_CONTAINER.innerHTML = ''; }






/******************************************************************
 * FUNCTION *
 ******************************************************************/

/* GENERAL */
function zsb_GetElementsByClassName(CLASSNAME,STARTNODE) {
	if (!STARTNODE) {
		STARTNODE = document;
	}
	for (var i=0, ARRAY=[], ELEMENT; ELEMENT=STARTNODE.getElementsByTagName('*')[i]; i++) {
		if ((' '+ELEMENT.className+' ').indexOf(' '+CLASSNAME+' ') >= 0) {
			ARRAY.push(ELEMENT);
		}
	}
	return ARRAY;
}

function zsb_StyleTextEmbed(CONTENT,ID,MEDIA){
	var STYLE = document.createElement('style');
	STYLE.type = 'text/css';
	if ((!ID)||(ID == '')||(typeof ID == 'undefined')) { } else { STYLE.id = ID; }
	if ((!MEDIA)||(MEDIA == '')||(typeof MEDIA == 'undefined')) { } else { STYLE.setAttribute('media',MEDIA); }
	if (STYLE.styleSheet){
		STYLE.styleSheet.cssText = CONTENT;
	} else {
		STYLE.appendChild(document.createTextNode(CONTENT));
	}
	document.getElementsByTagName('head')[0].appendChild(STYLE);
}
function zsb_StyleLinkEmbed(CSSURL,ID,MEDIA) {
	var LINK = document.createElement('link');
	LINK.href = CSSURL;
	LINK.type = 'text/css';
	LINK.rel = 'stylesheet';
	if ((!ID)||(ID == '')||(typeof ID == 'undefined')) { } else { STYLE.id = ID; }
	if ((!MEDIA)||(MEDIA == '')||(typeof MEDIA == 'undefined')) { } else { STYLE.setAttribute('media',MEDIA); }
	document.getElementsByTagName('head')[0].appendChild(LINK);
}

function zsb_OnloadEventFunctionAdd(FUNC) {
	var OLDLOAD = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = FUNC;
	} else {
		window.onload = function() {
			if (OLDLOAD) { OLDLOAD(); }
			FUNC();
		}
	}
}

function zsb_WindowOpen(URL) {
	var ZSB_WO_OPENWIN = window.open(URL,'zsb_Window','width=1000,height=600,scrollbars=yes,menubar=no,toolbar=no');
	ZSB_WO_OPENWIN.window.focus();
}
function zsb_WindowOpenUrl(WINURL,WINNAME,WINOPT) {
	var WINURL = WINURL || '';
	var WINNAME = WINNAME || 'zsb_UrlWindow';
	var WINOPT = WINOPT || 'width=1000,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no';
	var ZSB_URL_WINDOW = window.open(WINURL,WINNAME,WINOPT);
	ZSB_URL_WINDOW.window.focus();
}
function zsb_WindowOpenWrite(WINHTML,WINTITLE,WINURL,WINNAME,WINOPT) {
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var DEFAULTWINHTML = '<!DOCTYPE html><html><head></head><body></body></html>';
	var WINHTML = (function() {
		try {
			var HTMLBOX = document.getElementById(WINHTML);
			return HTMLBOX.innerHTML;
		} catch (ZSB_ERR) {
			var HTMLCODE = WINHTML || DEFAULTWINHTML;
			return HTMLCODE;
		}
	})();
	var WINTITLE = WINTITLE || document.title;
	var WINURL = WINURL || '';
	var WINNAME = WINNAME || 'zsb_WriteWindow';
	var WINOPT = WINOPT || 'width=1000,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no';
	var ZSB_WRITE_WINDOW = window.open(WINURL,WINNAME,WINOPT);
	ZSB_WRITE_WINDOW.document.write(WINHTML);
	ZSB_WRITE_WINDOW.document.title = WINTITLE;
	ZSB_WRITE_WINDOW.window.focus();
}


/* SETUP */

/* BOX */
function zsb_LeftRightCenterBoxSetup(POS) {
	if (document.getElementById('zsb-'+POS+'-left-box') &&
		document.getElementById('zsb-'+POS+'-right-box') &&
		document.getElementById('zsb-'+POS+'-center-box')) {
		var LB = document.getElementById('zsb-'+POS+'-left-box');
		var RB = document.getElementById('zsb-'+POS+'-right-box');
		var CB = document.getElementById('zsb-'+POS+'-center-box');
		LB.className += ' zsb-box';
		RB.className += ' zsb-box';
		CB.className += ' zsb-box';
		var LRCHEIGHT = Math.max(LB.offsetHeight,RB.offsetHeight,CB.offsetHeight);
		if (LRCHEIGHT == 0) {
			LB.style.height = 0; LB.style.display = 'none';
			RB.style.height = 0; RB.style.display = 'none';
			CB.style.height = 0; CB.style.display = 'none';
		} else {
			var LRCs = ['left','right','center'];
			for (i=0; i<LRCs.length; i++) {
				var BOX = document.getElementById('zsb-'+POS+'-'+LRCs[i]+'-box');
				var SPACER = document.createElement('div');
				SPACER.id = 'zsb-'+POS+'-'+LRCs[i]+'-box-vspacer';
				SPACER.style.height = LRCHEIGHT+'px';
				if (BOX.lastChild && BOX.lastChild.nodeName.toLowerCase() != '#text') {
					BOX.insertBefore(SPACER,BOX.lastChild);
				} else if (BOX.lastChild.nodeName.toLowerCase() == '#text') {
					var L = BOX.childNodes.length;
					BOX.insertBefore(SPACER,BOX.childNodes[L-1]);
				} else {
					BOX.appendChild(SPACER);
				}
			}
			var CBWIDTH = CB.offsetWidth;
			CB.style.width = CBWIDTH+'px';
			CB.style.left = 0;
			CB.style.right = 0;
		}
	}
}

/* MENU */
function zsb_MenubarItemClassNameSetup() {
	var ROOT = document.getElementById('zsb-container');
	for (var i=0, MH; MH=zsb_GetElementsByClassName('zsb-menu-hover',ROOT)[i]; i++) {
		MH.className += ' zsb-menubar-item';
	}
	for (var i=0, MC; MC=zsb_GetElementsByClassName('zsb-menu-click',ROOT)[i]; i++) {
		MC.className += ' zsb-menubar-item';
		if (! MC.title) {
			MC.title = 'Click to open/close menu box';
		}
	}
}
function zsb_MenuListBoxSetup(POS) {
	var BAR = document.getElementById('zsb-'+POS+'-bar');
	var BARHEIGHT = BAR.offsetHeight;
	for (var i=0, MBP; MBP=zsb_GetElementsByClassName('zsb-menubar-item',BAR)[i]; i++) {
		var MBPHEIGHT = MBP.offsetHeight;
		var BOTTOM = MBPHEIGHT+(BARHEIGHT-MBPHEIGHT)/2;
		for (var u=0, UL; UL=MBP.getElementsByTagName('ul')[u]; u++) {
			if (POS == 'bottom') {
				UL.style.bottom = BOTTOM+'px';
			}
			var MBBASE = document.createElement('li');
			MBBASE.className = 'zsb-'+POS+'-menu-list-base';
			if (UL.firstChild) {
				UL.insertBefore(MBBASE,UL.firstChild);
			} else {
				UL.appendChild(MBBASE);
			}
		}
	}
}
function zsb_TableMenuTdataWidthSetup() {
	for (var i=0, TM; TM=zsb_GetElementsByClassName('zsb-table-menu')[i]; i++) {
		for (var r=0, TR; TR=TM.getElementsByTagName('tr')[r]; r++) {
			if (TR.getElementsByTagName('td').length >= 2) {
				var TDL = TR.getElementsByTagName('td').length;
				TR.getElementsByTagName('td')[TDL-1].style.textAlign = 'right';
				var TDWIDTH = 100/TDL;
				for (var d=0, TD; TD=TR.getElementsByTagName('td')[d]; d++) {
					TD.style.width = TDWIDTH+'%';
				}
			}
		}
	}
}

/* FOLLOWBOX */
function zsb_FollowBoxHtmlGenerate(){
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	if (ZSB_FACEBOOK_URL_ID) {
		var ZSB_FACEBOOK_BOX_HTML = ''+
			'<div id='+Q+'zsb-facebook-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<iframe '+
					'id='+Q+'zsb-facebook'+Q+' src='+Q+''+ZSB_FACEBOOK_IFRAME_URL+''+Q+' '+
					'allowTransparency='+Q+'true'+Q+' frameborder='+Q+'0'+Q+' scrolling='+Q+'no'+Q+' '+
					'style='+Q+'border:none; overflow:hidden; width:130px; height:20px;'+Q+'></iframe>'+
			'</div>'+
		'';
	} else {
		var ZSB_FACEBOOK_BOX_HTML = '';
	}
	if (ZSB_TWITTER_URL_ID) {
		var ZSB_TWITTER_BOX_HTML = ''+
			'<div id='+Q+'zsb-twitter-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<iframe '+
					'id='+Q+'zsb-twitter'+Q+' src='+Q+''+ZSB_TWITTER_IFRAME_URL+''+Q+' '+
					'allowtransparency='+Q+'true'+Q+' frameborder='+Q+'0'+Q+' scrolling='+Q+'no'+Q+' '+
					'style='+Q+'overflow:hidden; border:none; width:145px; height:20px;'+Q+'></iframe>'+
			'</div>'+
		'';
	} else {
		var ZSB_TWITTER_BOX_HTML = '';
	}
	if (ZSB_GOOGLE_URL_ID) {
		var ZSB_GOOGLE_BOX_HTML = ''+
			'<div id='+Q+'zsb-google-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<div '+
					'id='+Q+'zsb-google'+Q+' class='+Q+'g-follow'+Q+' '+
					'data-annotation='+Q+'bubble'+Q+' data-height='+Q+'20'+Q+' '+
					'data-href='+Q+''+ZSB_GOOGLE_URL+''+Q+' data-rel='+Q+'publisher'+Q+'></div>'+
			'</div>'+
		'';
	} else {
		var ZSB_GOOGLE_BOX_HTML = '';
	}
	if (ZSB_FEEDBURNER_URL_ID) {
		var ZSB_FEEDBURNER_BOX_HTML = ''+
			'<div id='+Q+'zsb-feedburner-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<a '+
					'id='+Q+'zsb-feedburner-counter'+Q+' class='+Q+'fb_chicklet'+Q+' '+
					'href='+Q+'http://feedburner.google.com/fb/a/mailverify?uri='+ZSB_FEEDBURNER_URL_ID+''+Q+' '+
					'title='+Q+''+ZSB_FEEDBURNER_TITLE_TEXT+''+Q+' target='+Q+'_blank'+Q+' rel='+Q+'nofollow'+Q+' '+
					'style='+Q+''+
						'background-image: url('+ZSB_FEEDBURNER_IMAGE_URL+') !important;'+
						'border-color: '+ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR+';'+
					''+Q+' '+
					'onclick='+Q+'zsb_FeedBurnerMailVerify();return false;'+Q+' '+
					'onfocus='+Q+'zsb_FeedBurnerInputBorderFocusSet();'+Q+' '+
					'onblur='+Q+'zsb_FeedBurnerInputBorderBlurSet();'+Q+'>'+
				'</a>'+
				'<form '+
					'id='+Q+'zsb-feedburner-form'+Q+''+
					'target='+Q+'zsb_FeedBurnerMailVerifyWindow'+Q+' method='+Q+'post'+Q+' '+
					'action='+Q+'https://feedburner.google.com/fb/a/mailverify'+Q+' '+
					'onsubmit='+Q+'zsb_FeedBurnerMailVerify();return true;'+Q+'>'+
					'<div '+
						'id='+Q+'zsb-feedburner-email-box'+Q+' '+
						'style='+Q+'background-color: '+ZSB_FEEDBURNER_ENTRY_BACKGROUND_COLOR_BLUR+'; border-color: '+ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR+';'+Q+'>'+
						'<input '+
							'id='+Q+'zsb-feedburner-email'+Q+' name='+Q+'email'+Q+' '+
							'type='+Q+'text'+Q+' value='+Q+''+ZSB_FEEDBURNER_EMAIL_INIT_VALUE+''+Q+' '+
							'title='+Q+''+ZSB_FEEDBURNER_TITLE_TEXT+''+Q+' '+
							'style='+Q+'color: '+ZSB_FEEDBURNER_ENTRY_COLOR_BLUR+';'+Q+' '+
							'onfocus='+Q+'zsb_FeedBurnerInputBorderFocusSet();zsb_FeedBurnerEmailValueSet();'+Q+' '+
							'onblur='+Q+'zsb_FeedBurnerInputBorderBlurSet();zsb_FeedBurnerEmailValueSet();'+Q+'>'+
						'<input name='+Q+'uri'+Q+' value='+Q+''+ZSB_FEEDBURNER_URL_ID+''+Q+' type='+Q+'hidden'+Q+'>'+
						'<input value='+Q+'en_US'+Q+' name='+Q+'loc'+Q+' type='+Q+'hidden'+Q+'>'+
					'</div>'+
					'<div '+
						'id='+Q+'zsb-feedburner-submit-box'+Q+' '+
						'style='+Q+'background-color: '+ZSB_FEEDBURNER_BUTTON_BACKGROUND_COLOR_BLUR+'; border-color: '+ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR+';'+Q+'>'+
						'<input '+
							'id='+Q+'zsb-feedburner-submit'+Q+' '+
							'type='+Q+'submit'+Q+' value='+Q+'Follow'+Q+' '+
							'title='+Q+''+ZSB_FEEDBURNER_TITLE_TEXT+''+Q+' '+
							'style='+Q+'color: '+ZSB_FEEDBURNER_BUTTON_COLOR_BLUR+';'+Q+' '+
							'onfocus='+Q+'zsb_FeedBurnerInputBorderFocusSet();'+Q+' '+
							'onblur='+Q+'zsb_FeedBurnerInputBorderBlurSet();'+Q+'>'+
					'</div>'+
				'</form>'+
			'</div>'+
		'';
	} else {
		var ZSB_FEEDBURNER_BOX_HTML = '';
	}

	if ((ZSB_FACEBOOK_URL_ID) || (ZSB_TWITTER_URL_ID) || (ZSB_GOOGLE_URL_ID) || (ZSB_FEEDBURNER_URL_ID)) {
		var ZSB_FOLLOW_BOX_VSPACER_HTML = '<div id='+Q+'zsb-follow-box-vspacer'+Q+' class='+Q+'zsb-box-vspacer'+Q+'></div>';
		var ZSB_FOLLOW_BOX_HTML = ZSB_FACEBOOK_BOX_HTML + ZSB_TWITTER_BOX_HTML + ZSB_FOLLOW_BOX_VSPACER_HTML + ZSB_GOOGLE_BOX_HTML + ZSB_FEEDBURNER_BOX_HTML;
		if (document.getElementById('zsb-follow-box')) {
			var FOLLOWBOX = document.getElementById('zsb-follow-box');
			FOLLOWBOX.style.whiteSpace = 'nowrap';
			FOLLOWBOX.innerHTML = ZSB_FOLLOW_BOX_HTML;
			if (ZSB_GOOGLE_URL_ID) {
				var po = document.createElement('script');
				po.type = 'text/javascript';
				po.src = 'https://apis.google.com/js/platform.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(po, s);
			}
		}
	}

}
/* feedburner */
function zsb_FeedBurnerEmailValueSet() {
	var INPUTBOX = document.getElementById('zsb-feedburner-email');
	if (INPUTBOX.value == ZSB_FEEDBURNER_EMAIL_INIT_VALUE) {
		INPUTBOX.value = '';
	} else if (INPUTBOX.value == '') {
		INPUTBOX.value = ZSB_FEEDBURNER_EMAIL_INIT_VALUE;
	}
}
function zsb_FeedBurnerInputBorderFocusSet() {
	var COUNTER = document.getElementById('zsb-feedburner-counter');
	var EMAIL = document.getElementById('zsb-feedburner-email');
	var EMAILBOX = document.getElementById('zsb-feedburner-email-box');
	var SUBMIT = document.getElementById('zsb-feedburner-submit');
	var SUBMITBOX = document.getElementById('zsb-feedburner-submit-box');
	COUNTER.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_FOCUS;
	EMAIL.style.color = ZSB_FEEDBURNER_ENTRY_COLOR_FOCUS;
	EMAILBOX.style.backgroundColor = ZSB_FEEDBURNER_ENTRY_BACKGROUND_COLOR_FOCUS;
	EMAILBOX.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_FOCUS;
	SUBMIT.style.color = ZSB_FEEDBURNER_BUTTON_COLOR_FOCUS;
	SUBMITBOX.style.backgroundColor = ZSB_FEEDBURNER_BUTTON_BACKGROUND_COLOR_FOCUS;
	SUBMITBOX.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_FOCUS;
}
function zsb_FeedBurnerInputBorderBlurSet() {
	var COUNTER = document.getElementById('zsb-feedburner-counter');
	var EMAIL = document.getElementById('zsb-feedburner-email');
	var EMAILBOX = document.getElementById('zsb-feedburner-email-box');
	var SUBMIT = document.getElementById('zsb-feedburner-submit');
	var SUBMITBOX = document.getElementById('zsb-feedburner-submit-box');
	COUNTER.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR;
	EMAIL.style.color = ZSB_FEEDBURNER_ENTRY_COLOR_BLUR;
	EMAILBOX.style.backgroundColor = ZSB_FEEDBURNER_ENTRY_BACKGROUND_COLOR_BLUR;
	EMAILBOX.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR;
	SUBMIT.style.color = ZSB_FEEDBURNER_BUTTON_COLOR_BLUR;
	SUBMITBOX.style.backgroundColor = ZSB_FEEDBURNER_BUTTON_BACKGROUND_COLOR_BLUR;
	SUBMITBOX.style.borderColor = ZSB_FEEDBURNER_INPUT_BORDER_COLOR_BLUR;
}
function zsb_FeedBurnerMailVerify() {
	var ZSB_FBMV_OPENWIN = window.open(ZSB_FEEDBURNER_MAIL_URL,'zsb_FeedBurnerMailVerifyWindow','width=600,height=600,scrollbars=yes,menubar=no,toolbar=no');
	ZSB_FBMV_OPENWIN.window.focus();
}

/* BAR */
function zsb_BodySpacerBarBaseFillerSetup(POS) {
	var DB = document.body||document.getElementsByTagName('body')[0];
	var ROOT = document.getElementById('zsb-container');
	var BAR = document.getElementById('zsb-'+POS+'-bar');
	/* bodyspacer */
	var BODYSPACER = document.createElement('div');
	BODYSPACER.id = 'zsb-'+POS+'-bodyspacer';
	if ( ((POS == 'top') && (ZSB_TOP_RSV)) || ((POS == 'bottom') && (ZSB_BOTTOM_RSV)) ) {
		BODYSPACER.style.height = BAR.offsetHeight+'px';
	} else {
		BODYSPACER.style.height = 0;
		BODYSPACER.style.border = 0;
	}
	if (POS == 'top') {
		DB.insertBefore(BODYSPACER,DB.firstChild);
	} else {
		DB.appendChild(BODYSPACER);
	}
	/* base */
	var BASE = document.createElement('div');
	BASE.id = 'zsb-'+POS+'-base';
	BASE.style.height = BAR.offsetHeight+'px';
	if (POS == 'top') {
		if (ZSB_TOP_BASE_WIDTH == '100%') {
			BASE.style.borderWidth = '0 0 1px 0';
		} else {
			BASE.style.borderWidth = '0 1px 1px 1px';
		}
	} else if (POS == 'bottom') {
		if (ZSB_BOTTOM_BASE_WIDTH == '100%') {
			BASE.style.borderWidth = '1px 0 0 0';
		} else {
			BASE.style.borderWidth = '1px 1px 0 1px';
		}
	}
	ROOT.insertBefore(BASE,BAR);
	/* bar-filler */
	var FILLER = document.createElement('div');
	FILLER.id = 'zsb-'+POS+'-bar-filler';
	BAR.insertBefore(FILLER,BAR.firstChild);
}
function zsb_BarShow(POS) {
	var BAR = document.getElementById('zsb-'+POS+'-bar');
	var BASE = document.getElementById('zsb-'+POS+'-base');
	var BODYSPACER = document.getElementById('zsb-'+POS+'-bodyspacer');
	if (BAR.offsetHeight == 0) {
		BAR.style.height = 0; BAR.style.display = 'none';
		BASE.style.height = 0; BASE.style.display = 'none';
		BODYSPACER.style.height = 0; BODYSPACER.style.display = 'none';
	} else {
		BAR.style.visibility = 'visible';
		BAR.style.zIndex = '1000000';
	}
}

/* SCROLLBOX */
function zsb_ScrollBoxSetup() {
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	/* var CONTAINER = document.getElementById('zsb-container'); */
	var CONTAINER = document.body;
	var ZSB_SCROLL_BOX_HTML = ''+
		'<div id='+Q+'zsb-scroll-button-box'+Q+'>'+
			'<div id='+Q+'zsb-scroll-button-top'+Q+'><span>▲</span></div>'+
			'<div id='+Q+'zsb-widget-ref'+Q+'><a href='+Q+''+ZSB_BTELMREF+''+Q+' target='+Q+'_blank'+Q+' title='+Q+''+ZSB_BTELMTITLE+''+Q+'>i</a></div>'+
			'<div id='+Q+'zsb-scroll-button-bottom'+Q+'><span>▼</span></div>'+
		'</div>'+
	'';
	var ZSB_SCROLL_BOX =	document.createElement('div');
	ZSB_SCROLL_BOX.id = 'zsb-scroll-box';
	ZSB_SCROLL_BOX.innerHTML = ZSB_SCROLL_BOX_HTML;
	CONTAINER.appendChild(ZSB_SCROLL_BOX);
}


/* EVENT */

/* MENUPOP */
function zsb_MenubarItemPopupEventBind(){
	jQuery('.zsb-menu-hover').hover(function() {
		$(this).find('ul').slideToggle('fast');
	},function() {
		$(this).find('ul').slideToggle('fast');
	});
	jQuery('.zsb-menu-click-toggler').click(function() {
		$(this).closest('.zsb-menu-click').find('ul').slideToggle();
	});
}

/* SCROLL */
function zsb_ScrollToTop(){
	jQuery(function($) {
		$('html,body').animate({scrollTop:0},1000);
	});
}
function zsb_ScrollToBottom(){
	jQuery(function($) {
		$('html,body').animate({scrollTop:$(document).height()-$(window).height()},1000);
	});
}
function zsb_ScrollEventBind(){
	jQuery('#zsb-top-base, #zsb-top-bar-filler, #zsb-scroll-button-top').prop('title', 'Scroll to top');
	jQuery('#zsb-top-base, #zsb-top-bar-filler, #zsb-scroll-button-top').on('click', function() {
		zsb_ScrollToTop();
	});
	jQuery('#zsb-bottom-base, #zsb-bottom-bar-filler, #zsb-scroll-button-bottom').prop('title', 'Scroll to bottom');
	jQuery('#zsb-bottom-base, #zsb-bottom-bar-filler, #zsb-scroll-button-bottom').on('click', function() {
		zsb_ScrollToBottom();
	});
	jQuery('#zsb-scroll-box').hover(function() {
		$(this).stop().animate({'opacity':1});
		$('#zsb-widget-ref').animate({'width':'toggle'});
	},function() {
		$(this).stop().animate({'opacity':0.5});
		$('#zsb-widget-ref').animate({'width':'toggle'});
	});
}

/* SHOWHIDEBAR */
function zsb_BarControlSetupEventBind(POS){
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var ROOT = document.getElementById('zsb-container');
	if (document.getElementById('zsb-'+POS+'-bar-control')) {
		/* controlinline */
		var CONTROL = document.getElementById('zsb-'+POS+'-bar-control');
		CONTROL.className += ' zsb-bar-control';
		CONTROL.title = 'Hide this bar';
		CONTROL.innerHTML = '<span>⊗</span>';
		jQuery('#zsb-'+POS+'-bar-control').click(function() {
			zsb_ShowHideBar(''+POS+'');
		});
		/* controlfixed */
		var CONTROLFIXED = document.createElement('div');
		CONTROLFIXED.id = 'zsb-'+POS+'-bar-control-fixed';
		CONTROLFIXED.className += ' zsb-bar-control-fixed';
		CONTROLFIXED.title = 'Show '+POS+' bar';
		if (POS == 'top') {
			CONTROLFIXED.innerHTML = '<span>▼</span>';
		} else {
			CONTROLFIXED.innerHTML = '<span>▲</span>';
		}
		ROOT.appendChild(CONTROLFIXED);
		jQuery('#zsb-'+POS+'-bar-control-fixed').hover(function() {
			$(this).stop().animate({'opacity':1});
		},function() {
			$(this).stop().animate({'opacity':0.5});
		});
		jQuery('#zsb-'+POS+'-bar-control-fixed').click(function() {
			zsb_ShowHideBar(''+POS+'');
		});
	}
}
function zsb_ShowHideBar(POS) {
	jQuery('#zsb-'+POS+'-bodyspacer, #zsb-'+POS+'-base, #zsb-'+POS+'-bar').animate({'height':'toggle'});
}
function zsb_BarDefaultHidden() {
	if (ZSB_TOP_HIDDEN) { setTimeout(function(){zsb_ShowHideBar('top')}, 3000); }
	if (ZSB_BOTTOM_HIDDEN) { setTimeout(function(){zsb_ShowHideBar('bottom')}, 3000); }
}

/* RESIZE */
function zsb_BodySpacerBarBaseResizeEventBind() {
	jQuery(window).resize(function() {
		zsb_BodySpacerBarBaseResize('top');
		zsb_BodySpacerBarBaseResize('bottom');
	});
}
function zsb_BodySpacerBarBaseResize(POS) {
	var BAR = document.getElementById('zsb-'+POS+'-bar');
	var BASE = document.getElementById('zsb-'+POS+'-base');
	var BODYSPACER = document.getElementById('zsb-'+POS+'-bodyspacer');
	BASE.style.height = BAR.offsetHeight+'px';
	if ( ((POS == 'top') && (ZSB_TOP_RSV)) || ((POS == 'bottom') && (ZSB_BOTTOM_RSV)) ) {
		BODYSPACER.style.height = BAR.offsetHeight+'px';
	}
}







/******************************************************************
 * EXECUTION *
 ******************************************************************/

zsb_StyleLinkEmbed(ZSB_APP_CSS_PATH+'zstickybar.css');
zsb_StyleTextEmbed(ZSB_USER_DEFINED_STYLE_STRING);
jQuery(window).load(function() {
	ZSB_CONTAINER.style.display = 'block';
	zsb_FollowBoxHtmlGenerate();
	zsb_MenubarItemClassNameSetup();
	zsb_BarControlSetupEventBind('top');
	zsb_BarControlSetupEventBind('bottom');
	zsb_LeftRightCenterBoxSetup('top');
	zsb_LeftRightCenterBoxSetup('bottom');
	zsb_BodySpacerBarBaseFillerSetup('top');
	zsb_BodySpacerBarBaseFillerSetup('bottom');
	zsb_MenuListBoxSetup('top');
	zsb_MenuListBoxSetup('bottom');
	zsb_TableMenuTdataWidthSetup();
	zsb_MenubarItemPopupEventBind();
	zsb_BarShow('top');
	zsb_BarShow('bottom');
	zsb_ScrollBoxSetup();
	zsb_ScrollEventBind();
	zsb_BodySpacerBarBaseResizeEventBind();
	zsb_BarDefaultHidden();
});

