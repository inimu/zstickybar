/*!
 * zStickyBar 1.0 (2014.04)
 * Copyright (c) 2014 Zon Saja - zonsaja@gmail.com - http://inimu.com
 * Official page: http:inimu.com/widget/zstickybar
 * You may use zStickyBar under the terms of the MIT license.
 * Basically that means you are free to use zStickyBar as long as
 * the credit line in HTML code and this header are left intact.
 */

/*
 * zStickyBar is a beautifully designed, yet highly configurable
 * fixed position top/bottom bar widget for website/blog,
 * complete with custom menu, follow box, and page scrolling button.
 */

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */







/******************************************************************
 * VARIABLE *
 ******************************************************************/


/* SCRIPT/RESOURCES PATH
 *******************************/
var ZSB_APP_JS_FILENAME = 'zstickybar.js', ZSB_APP_CSS_FILENAME = 'zstickybar.css', ZSB_APP_IMG_FILENAME = 'zstickybar.png';
/* 
 * To avoid unnecessary and unreliable path detection,
 * it is better to set the default path variables to the actual,
 * hard-coded full paths (where this app is hosted).
 */
/*
var ZSB_APP_PATH = ZSB_APP_PATH || 'http://inimu.github.io/zstickybar/js/'+ZSB_APP_JS_FILENAME+'';
var ZSB_APP_ROOT_PATH = ZSB_APP_ROOT_PATH || 'http://inimu.github.io/zstickybar/';
var ZSB_APP_JS_PATH = ZSB_APP_JS_PATH || 'http://inimu.github.io/zstickybar/js/';
var ZSB_APP_CSS_PATH = ZSB_APP_CSS_PATH || 'http://inimu.github.io/zstickybar/css/';
var ZSB_APP_IMG_PATH = ZSB_APP_IMG_PATH || 'http://inimu.github.io/zstickybar/img/';
*/
/* PATH DETECTION begin */
var ZSB_APP_PATH = ZSB_APP_PATH || (function(){
	var APPURL = '', APPID = 'zsb-app', APPCHECKSTR = 'zStickyBar version 1.0 (2014.04)';
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
				} catch (e) {
					var REGEX = new RegExp(ZSB_APP_JS_FILENAME);
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


var ZSB_FACEBOOK_URL_ID = '';
var ZSB_TWITTER_URL_ID = '';
var ZSB_GOOGLE_URL_ID = '';
var ZSB_FEEDBURNER_URL_ID = '';

var ZSB_TOP_BASE_FULL_WIDTH = false;
var ZSB_TOP_HIDDEN = false;
var ZSB_TOP_RESERVED = false;
var ZSB_BOTTOM_BASE_FULL_WIDTH = false;
var ZSB_BOTTOM_HIDDEN = false;
var ZSB_BOTTOM_RESERVED = false;

var ZSB_APP_OPTIONS_CSS_TXT = '';

var ZSB_WDGELM_HTML = '';







/******************************************************************
 * FUNCTION *
 ******************************************************************/

function zsb_AppOptionsParse() {

	var ZSBAO = (function(){
		try { return ZSB_APP_OPTIONS; } catch(e) { return {}; }
	})();


	/* FOLLOW BUTTON
	 *******************************/

	ZSB_FACEBOOK_URL_ID = ZSBAO.Facebook_URL_ID || '';
	ZSB_TWITTER_URL_ID = ZSBAO.Twitter_URL_ID || '';
	ZSB_GOOGLE_URL_ID = ZSBAO.Google_URL_ID || '';
	ZSB_FEEDBURNER_URL_ID = ZSBAO.Feedburner_URL_ID || '';


	/* GENERAL STYLE
	 *******************************/

	var COLOR_THEME = ZSBAO.Color_Theme || 'light';

	var FONT_FAMILY = ZSBAO.Font_Family || 'Ubuntu,Lucida,Calibri,Tahoma,Arial,sans-serif';
	var FONT_WEIGHT = ZSBAO.Font_Weight || 'normal';
	var FONT_SIZE = ZSBAO.Font_Size || '14px';
	var LINE_HEIGHT = ZSBAO.Line_Height || '1.3';


	/* BAR+CONTENT STYLE OPTION
	 *******************************/
	/* bar */
	var BODY_SPACE_RESERVED = ZSBAO.Body_Space_Reserved || '';

	var BAR_DEFAULT_HIDDEN = ZSBAO.Bar_Default_Hidden || '';

	var BAR_WIDTH = ZSBAO.Bar_Width || '100%';
	var BASE_WIDTH = ZSBAO.Base_Width || '100%';

	var OPACITY = ZSBAO.Opacity || '1.0';
	var BORDER_RADIUS = ZSBAO.Border_Radius || '0';
	var BOXSHADOW_COLOR = ZSBAO.Boxshadow_Color || 'rgba(0,0,0,0.25)';

	if (COLOR_THEME == 'dark') {
		var TEXT_COLOR = ZSBAO.Text_Color || ZSBAO.Color || '#ccc';
		var LINK_COLOR = ZSBAO.Link_Color || '#fff';
		var BACKGROUND_COLOR = ZSBAO.Background_Color || '#444';
		var BACKGROUND_IMAGE = ZSBAO.Background_Image || 'none';
		var BORDER_COLOR = ZSBAO.Border_Color || '#222';
	} else {
		var TEXT_COLOR = ZSBAO.Text_Color || ZSBAO.Color || '#555';
		var LINK_COLOR = ZSBAO.Link_Color || '#333';
		var BACKGROUND_COLOR = ZSBAO.Background_Color || '#eee';
		var BACKGROUND_IMAGE = ZSBAO.Background_Image || 'none';
		var BORDER_COLOR = ZSBAO.Border_Color || '#bbb';
	}

	var LINK_PADDING = ZSBAO.Link_Padding || '6px 8px';

	/* menubar */
	if (COLOR_THEME == 'dark') {
		var MENUBAR_TEXT_COLOR = ZSBAO.Menubar_Text_Color || ZSBAO.Menubar_Color || TEXT_COLOR;
		var MENUBAR_LINK_COLOR = ZSBAO.Menubar_Link_Color || LINK_COLOR;
		var MENUBAR_LINK_BACKGROUND_COLOR = ZSBAO.Menubar_Link_Background_Color || 'transparent';
		var MENUBAR_LINK_BACKGROUND_IMAGE = ZSBAO.Menubar_Link_Background_Image || 'none';
		var MENUBAR_LINK_BORDER_COLOR = ZSBAO.Menubar_Link_Border_Color || 'transparent';
	} else {
		var MENUBAR_TEXT_COLOR = ZSBAO.Menubar_Text_Color || ZSBAO.Menubar_Color || TEXT_COLOR;
		var MENUBAR_LINK_COLOR = ZSBAO.Menubar_Link_Color || LINK_COLOR;
		var MENUBAR_LINK_BACKGROUND_COLOR = ZSBAO.Menubar_Link_Background_Color || 'transparent';
		var MENUBAR_LINK_BACKGROUND_IMAGE = ZSBAO.Menubar_Link_Background_Image || 'none';
		var MENUBAR_LINK_BORDER_COLOR = ZSBAO.Menubar_Link_Border_Color || 'transparent';
	}

	var MENUBAR_ITEM_BORDER_RADIUS = ZSBAO.Menubar_Item_Border_Radius || BORDER_RADIUS;

	if (COLOR_THEME == 'dark') {
		var MENUBAR_LINK_HOVER_COLOR = ZSBAO.Menubar_Link_Hover_Color || '#fff';
		var MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Menubar_Link_Hover_Background_Color || '#595959';
		var MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Menubar_Link_Hover_Background_Image || 'none';
		var MENUBAR_LINK_HOVER_BORDER_COLOR = ZSBAO.Menubar_Link_Hover_Border_Color || '#333';
	} else {
		var MENUBAR_LINK_HOVER_COLOR = ZSBAO.Menubar_Link_Hover_Color || '#333';
		var MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Menubar_Link_Hover_Background_Color || '#fff';
		var MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Menubar_Link_Hover_Background_Image || 'none';
		var MENUBAR_LINK_HOVER_BORDER_COLOR = ZSBAO.Menubar_Link_Hover_Border_Color || '#ccc';
	}

	/* menubox */
	if (COLOR_THEME == 'dark') {
		var MENUBOX_TEXT_COLOR = ZSBAO.Menubox_Text_Color || ZSBAO.Menubox_Color || MENUBAR_TEXT_COLOR;
		var MENUBOX_LINK_COLOR = ZSBAO.Menubox_Link_Color || MENUBAR_LINK_COLOR;
		var MENUBOX_BACKGROUND_COLOR = ZSBAO.Menubox_Background_Color || MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
		var MENUBOX_BACKGROUND_IMAGE = ZSBAO.Menubox_Background_Image || 'none';
		var MENUBOX_BORDER_COLOR = ZSBAO.Menubox_Border_Color || MENUBAR_LINK_HOVER_BORDER_COLOR;
		var MENUBOX_ACCENT_BORDER_COLOR = ZSBAO.Menubox_Accent_Border_Color || MENUBOX_BACKGROUND_COLOR;
	} else {
		var MENUBOX_TEXT_COLOR = ZSBAO.Menubox_Text_Color || ZSBAO.Menubox_Color || MENUBAR_TEXT_COLOR;
		var MENUBOX_LINK_COLOR = ZSBAO.Menubox_Link_Color || MENUBAR_LINK_COLOR;
		var MENUBOX_BACKGROUND_COLOR = ZSBAO.Menubox_Background_Color || MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
		var MENUBOX_BACKGROUND_IMAGE = ZSBAO.Menubox_Background_Image || 'none';
		var MENUBOX_BORDER_COLOR = ZSBAO.Menubox_Border_Color || MENUBAR_LINK_HOVER_BORDER_COLOR;
		var MENUBOX_ACCENT_BORDER_COLOR = ZSBAO.Menubox_Accent_Border_Color || MENUBOX_BACKGROUND_COLOR;
	}
	var MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO.Menubox_Accent_Border_Width || '1px';

	var MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO.Menubox_Link_Background_Color || 'transparent';
	var MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO.Menubox_Link_Background_Image || 'none';
	var MENUBOX_LINK_BORDER_COLOR = ZSBAO.Menubox_Link_Border_Color || 'transparent';

	var MENUBOX_PADDING = ZSBAO.Menubox_Padding || LINK_PADDING;
	var MENUBOX_BORDER_RADIUS = ZSBAO.Menubox_Border_Radius || BORDER_RADIUS;
	var MENUBOX_BOXSHADOW_COLOR = ZSBAO.Menubox_Boxshadow_Color || BOXSHADOW_COLOR;
	var MENUBOX_OPACITY = ZSBAO.Menubox_Opacity || '1.0';

	var MENUBOX_ITEM_PADDING = ZSBAO.Menubox_Item_Padding || LINK_PADDING;

	var MENUBOX_ITEM_BORDER_RADIUS = ZSBAO.Menubox_Item_Border_Radius || MENUBAR_ITEM_BORDER_RADIUS;

	if (COLOR_THEME == 'dark') {
		var MENUBOX_LINK_HOVER_COLOR = ZSBAO.Menubox_Link_Hover_Color || '#fff';
		var MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Menubox_Link_Hover_Background_Color || '#888';
		var MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Menubox_Link_Hover_Background_Image || 'none';
		var MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO.Menubox_Link_Hover_Border_Color || '#555';
	} else {
		var MENUBOX_LINK_HOVER_COLOR = ZSBAO.Menubox_Link_Hover_Color || '#222';
		var MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Menubox_Link_Hover_Background_Color || '#eee';
		var MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Menubox_Link_Hover_Background_Image || 'none';
		var MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO.Menubox_Link_Hover_Border_Color || '#dadada';
	}


	/* TOP BAR STYLE OPTION
	 *******************************/
	/* bar */
	var TOP_BAR_DEFAULT_HIDDEN = ZSBAO.Top_Bar_Default_Hidden || BAR_DEFAULT_HIDDEN;
	if ( (TOP_BAR_DEFAULT_HIDDEN == 'yes') || (TOP_BAR_DEFAULT_HIDDEN == 'true') || (TOP_BAR_DEFAULT_HIDDEN == true) ) {
		ZSB_TOP_HIDDEN = true;
	}

	var TOP_BODY_SPACE_RESERVED = ZSBAO.Top_Body_Space_Reserved || BODY_SPACE_RESERVED;
	if ( (TOP_BODY_SPACE_RESERVED == 'yes') || (TOP_BODY_SPACE_RESERVED == 'true') || (TOP_BODY_SPACE_RESERVED == true) ) {
		ZSB_TOP_RESERVED = true;
	}

	var TOP_BAR_WIDTH = ZSBAO.Top_Bar_Width || BAR_WIDTH;
	var TOP_BASE_WIDTH = ZSBAO.Top_Base_Width || BASE_WIDTH;
	if (TOP_BASE_WIDTH == '100%') {
		ZSB_TOP_BASE_FULL_WIDTH = true;
	}

	var TOP_TEXT_COLOR = ZSBAO.Top_Text_Color || ZSBAO.Top_Color || TEXT_COLOR;
	var TOP_LINK_COLOR = ZSBAO.Top_Link_Color || LINK_COLOR;
	var TOP_BASE_BACKGROUND_COLOR = ZSBAO.Top_Base_Background_Color || ZSBAO.Top_Background_Color || BACKGROUND_COLOR;
	var TOP_BASE_BACKGROUND_IMAGE = ZSBAO.Top_Base_Background_Image || ZSBAO.Top_Background_Image || BACKGROUND_IMAGE;
	var TOP_BASE_BORDER_COLOR = ZSBAO.Top_Base_Border_Color || ZSBAO.Top_Border_Color || BORDER_COLOR;
	var TOP_BASE_BORDER_RADIUS = ZSBAO.Top_Base_Border_Radius || ZSBAO.Top_Border_Radius || BORDER_RADIUS;
	var TOP_BASE_BOXSHADOW_COLOR = ZSBAO.Top_Base_Boxshadow_Color || ZSBAO.Top_Boxshadow_Color || BOXSHADOW_COLOR;
	var TOP_BASE_OPACITY = ZSBAO.Top_Base_Opacity || ZSBAO.Top_Opacity || OPACITY;

	var TOP_LINK_PADDING = ZSBAO.Top_Link_Padding || LINK_PADDING;

	/* menubar */
	var TOP_MENUBAR_TEXT_COLOR = ZSBAO.Top_Menubar_Text_Color || ZSBAO.Top_Menubar_Color || MENUBAR_TEXT_COLOR;
	var TOP_MENUBAR_LINK_COLOR = ZSBAO.Top_Menubar_Link_Color || MENUBAR_LINK_COLOR;
	var TOP_MENUBAR_LINK_BACKGROUND_COLOR = ZSBAO.Top_Menubar_Link_Background_Color || MENUBAR_LINK_BACKGROUND_COLOR;
	var TOP_MENUBAR_LINK_BACKGROUND_IMAGE = ZSBAO.Top_Menubar_Link_Background_Image || MENUBAR_LINK_BACKGROUND_IMAGE;
	var TOP_MENUBAR_LINK_BORDER_COLOR = ZSBAO.Top_Menubar_Link_Border_Color || MENUBAR_LINK_BORDER_COLOR;

	var TOP_MENUBAR_ITEM_BORDER_RADIUS = ZSBAO.Top_Menubar_Item_Border_Radius || MENUBAR_ITEM_BORDER_RADIUS;

	var TOP_MENUBAR_LINK_HOVER_COLOR = ZSBAO.Top_Menubar_Link_Hover_Color || MENUBAR_LINK_HOVER_COLOR;
	var TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Top_Menubar_Link_Hover_Background_Color || MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
	var TOP_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Top_Menubar_Link_Hover_Background_Image || MENUBAR_LINK_HOVER_BACKGROUND_IMAGE;
	var TOP_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSBAO.Top_Menubar_Link_Hover_Border_Color || MENUBAR_LINK_HOVER_BORDER_COLOR;

	/* menubox */
	var TOP_MENUBOX_TEXT_COLOR = ZSBAO.Top_Menubox_Text_Color || ZSBAO.Top_Menubox_Color || MENUBOX_TEXT_COLOR;
	var TOP_MENUBOX_LINK_COLOR = ZSBAO.Top_Menubox_Link_Color || MENUBOX_LINK_COLOR;
	var TOP_MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO.Top_Menubox_Link_Background_Color || MENUBOX_LINK_BACKGROUND_COLOR;
	var TOP_MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO.Top_Menubox_Link_Background_Image || MENUBOX_LINK_BACKGROUND_IMAGE;
	var TOP_MENUBOX_LINK_BORDER_COLOR = ZSBAO.Top_Menubox_Link_Border_Color || MENUBOX_LINK_BORDER_COLOR;
	var TOP_MENUBOX_BACKGROUND_COLOR = ZSBAO.Top_Menubox_Background_Color || MENUBOX_BACKGROUND_COLOR;
	var TOP_MENUBOX_BACKGROUND_IMAGE = ZSBAO.Top_Menubox_Background_Image || MENUBOX_BACKGROUND_IMAGE;
	var TOP_MENUBOX_BORDER_COLOR = ZSBAO.Top_Menubox_Border_Color || MENUBOX_BORDER_COLOR;
	var TOP_MENUBOX_PADDING = ZSBAO.Top_Menubox_Padding || MENUBOX_PADDING;
	var TOP_MENUBOX_BORDER_RADIUS = ZSBAO.Top_Menubox_Border_Radius || MENUBOX_BORDER_RADIUS;
	var TOP_MENUBOX_ACCENT_BORDER_COLOR = ZSBAO.Top_Menubox_Accent_Border_Color || MENUBOX_ACCENT_BORDER_COLOR;
	var TOP_MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO.Top_Menubox_Accent_Border_Width || MENUBOX_ACCENT_BORDER_WIDTH;
	var TOP_MENUBOX_BOXSHADOW_COLOR = ZSBAO.Top_Menubox_Boxshadow_Color || MENUBOX_BOXSHADOW_COLOR;
	var TOP_MENUBOX_OPACITY = ZSBAO.Top_Menubox_Opacity || MENUBOX_OPACITY;

	var TOP_MENUBOX_ITEM_PADDING = ZSBAO.Top_Menubox_Item_Padding || MENUBOX_ITEM_PADDING;

	var TOP_MENUBOX_ITEM_BORDER_RADIUS = ZSBAO.Top_Menubox_Item_Border_Radius || MENUBOX_ITEM_BORDER_RADIUS;

	var TOP_MENUBOX_LINK_HOVER_COLOR = ZSBAO.Top_Menubox_Link_Hover_Color || MENUBOX_LINK_HOVER_COLOR;
	var TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Top_Menubox_Link_Hover_Background_Color || MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
	var TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Top_Menubox_Link_Hover_Background_Image || MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
	var TOP_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO.Top_Menubox_Link_Hover_Border_Color || MENUBOX_LINK_HOVER_BORDER_COLOR;


	/* BOTTOM BAR STYLE OPTION
	 *******************************/
	/* bar */
	var BOTTOM_BAR_DEFAULT_HIDDEN = ZSBAO.Bottom_Bar_Default_Hidden || BAR_DEFAULT_HIDDEN;
	if ( (BOTTOM_BAR_DEFAULT_HIDDEN == 'yes') || (BOTTOM_BAR_DEFAULT_HIDDEN == 'true') || (BOTTOM_BAR_DEFAULT_HIDDEN == true) ) {
		ZSB_BOTTOM_HIDDEN = true;
	}

	var BOTTOM_BODY_SPACE_RESERVED = ZSBAO.Bottom_Body_Space_Reserved || BODY_SPACE_RESERVED;
	if ( (BOTTOM_BODY_SPACE_RESERVED == 'yes') || (BOTTOM_BODY_SPACE_RESERVED == 'true') || (BOTTOM_BODY_SPACE_RESERVED == true) ) {
		ZSB_BOTTOM_RESERVED = true;
	}

	var BOTTOM_BAR_WIDTH = ZSBAO.Bottom_Bar_Width || BAR_WIDTH;
	var BOTTOM_BASE_WIDTH = ZSBAO.Bottom_Base_Width || BASE_WIDTH;
	if (BOTTOM_BASE_WIDTH == '100%') {
		ZSB_BOTTOM_BASE_FULL_WIDTH = true;
	}

	var BOTTOM_TEXT_COLOR = ZSBAO.Bottom_Text_Color || ZSBAO.Bottom_Color || TEXT_COLOR;
	var BOTTOM_LINK_COLOR = ZSBAO.Bottom_Link_Color || LINK_COLOR;
	var BOTTOM_BASE_BACKGROUND_COLOR = ZSBAO.Bottom_Base_Background_Color || ZSBAO.Bottom_Background_Color || BACKGROUND_COLOR;
	var BOTTOM_BASE_BACKGROUND_IMAGE = ZSBAO.Bottom_Base_Background_Image || ZSBAO.Bottom_Background_Image || BACKGROUND_IMAGE;
	var BOTTOM_BASE_BORDER_COLOR = ZSBAO.Bottom_Base_Border_Color || ZSBAO.Bottom_Border_Color || BORDER_COLOR;
	var BOTTOM_BASE_BORDER_RADIUS = ZSBAO.Bottom_Base_Border_Radius || ZSBAO.Bottom_Border_Radius || BORDER_RADIUS;
	var BOTTOM_BASE_BOXSHADOW_COLOR = ZSBAO.Bottom_Base_Boxshadow_Color || ZSBAO.Bottom_Boxshadow_Color || BOXSHADOW_COLOR;
	var BOTTOM_BASE_OPACITY = ZSBAO.Bottom_Base_Opacity || ZSBAO.Bottom_Opacity || OPACITY;

	var BOTTOM_LINK_PADDING = ZSBAO.Bottom_Link_Padding || LINK_PADDING;

	/* menubar */
	var BOTTOM_MENUBAR_TEXT_COLOR = ZSBAO.Bottom_Menubar_Text_Color || ZSBAO.Bottom_Menubar_Color || MENUBAR_TEXT_COLOR;
	var BOTTOM_MENUBAR_LINK_COLOR = ZSBAO.Bottom_Menubar_Link_Color || MENUBAR_LINK_COLOR;
	var BOTTOM_MENUBAR_LINK_BACKGROUND_COLOR = ZSBAO.Bottom_Menubar_Link_Background_Color || MENUBAR_LINK_BACKGROUND_COLOR;
	var BOTTOM_MENUBAR_LINK_BACKGROUND_IMAGE = ZSBAO.Bottom_Menubar_Link_Background_Image || MENUBAR_LINK_BACKGROUND_IMAGE;
	var BOTTOM_MENUBAR_LINK_BORDER_COLOR = ZSBAO.Bottom_Menubar_Link_Border_Color || MENUBAR_LINK_BORDER_COLOR;

	var BOTTOM_MENUBOX_ITEM_PADDING = ZSBAO.Bottom_Menubox_Item_Padding || MENUBOX_ITEM_PADDING;

	var BOTTOM_MENUBAR_ITEM_BORDER_RADIUS = ZSBAO.Bottom_Menubar_Item_Border_Radius || MENUBAR_ITEM_BORDER_RADIUS;

	var BOTTOM_MENUBAR_LINK_HOVER_COLOR = ZSBAO.Bottom_Menubar_Link_Hover_Color || MENUBAR_LINK_HOVER_COLOR;
	var BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Bottom_Menubar_Link_Hover_Background_Color || MENUBAR_LINK_HOVER_BACKGROUND_COLOR;
	var BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Bottom_Menubar_Link_Hover_Background_Image || MENUBAR_LINK_HOVER_BACKGROUND_IMAGE;
	var BOTTOM_MENUBAR_LINK_HOVER_BORDER_COLOR = ZSBAO.Bottom_Menubar_Link_Hover_Border_Color || MENUBAR_LINK_HOVER_BORDER_COLOR;

	/* menubox */
	var BOTTOM_MENUBOX_TEXT_COLOR = ZSBAO.Bottom_Menubox_Text_Color || ZSBAO.Bottom_Menubox_Color || MENUBOX_TEXT_COLOR;
	var BOTTOM_MENUBOX_LINK_COLOR = ZSBAO.Bottom_Menubox_Link_Color || MENUBOX_LINK_COLOR;
	var BOTTOM_MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO.Bottom_Menubox_Link_Background_Color || MENUBOX_LINK_BACKGROUND_COLOR;
	var BOTTOM_MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO.Bottom_Menubox_Link_Background_Image || MENUBOX_LINK_BACKGROUND_IMAGE;
	var BOTTOM_MENUBOX_LINK_BORDER_COLOR = ZSBAO.Bottom_Menubox_Link_Border_Color || MENUBOX_LINK_BORDER_COLOR;
	var BOTTOM_MENUBOX_BACKGROUND_COLOR = ZSBAO.Bottom_Menubox_Background_Color || MENUBOX_BACKGROUND_COLOR;
	var BOTTOM_MENUBOX_BACKGROUND_IMAGE = ZSBAO.Bottom_Menubox_Background_Image || MENUBOX_BACKGROUND_IMAGE;
	var BOTTOM_MENUBOX_BORDER_COLOR = ZSBAO.Bottom_Menubox_Border_Color || MENUBOX_BORDER_COLOR;
	var BOTTOM_MENUBOX_PADDING = ZSBAO.Bottom_Menubox_Padding || MENUBOX_PADDING;
	var BOTTOM_MENUBOX_BORDER_RADIUS = ZSBAO.Bottom_Menubox_Border_Radius || MENUBOX_BORDER_RADIUS;
	var BOTTOM_MENUBOX_ACCENT_BORDER_COLOR = ZSBAO.Bottom_Menubox_Accent_Border_Color || MENUBOX_ACCENT_BORDER_COLOR;
	var BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO.Bottom_Menubox_Accent_Border_Width || MENUBOX_ACCENT_BORDER_WIDTH;
	var BOTTOM_MENUBOX_BOXSHADOW_COLOR = ZSBAO.Bottom_Menubox_Boxshadow_Color || MENUBOX_BOXSHADOW_COLOR;
	var BOTTOM_MENUBOX_OPACITY = ZSBAO.Bottom_Menubox_Opacity || MENUBOX_OPACITY;

	var BOTTOM_MENUBOX_ITEM_BORDER_RADIUS = ZSBAO.Bottom_Menubox_Item_Border_Radius || MENUBOX_ITEM_BORDER_RADIUS;

	var BOTTOM_MENUBOX_LINK_HOVER_COLOR = ZSBAO.Bottom_Menubox_Link_Hover_Color || MENUBOX_LINK_HOVER_COLOR;
	var BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO.Bottom_Menubox_Link_Hover_Background_Color || MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
	var BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO.Bottom_Menubox_Link_Hover_Background_Image || MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
	var BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO.Bottom_Menubox_Link_Hover_Border_Color || MENUBOX_LINK_HOVER_BORDER_COLOR;


	/* OUTPUT CSS TEXT
	 *******************************/
	var IdBarTop = '#zsb-bar-top';
	var IdBarBottom = '#zsb-bar-bottom';
	var ClassContent = '.zsb-content';
	var ClassMenubarItem = '.zsb-menubar-item';

	ZSB_APP_OPTIONS_CSS_TXT = ''+

		'#zsb-wrapper,#zsb-wrapper ul,#zsb-wrapper ol,#zsb-wrapper li{'+
			'font-family:'+FONT_FAMILY+';'+
			'font-weight:'+FONT_WEIGHT+';'+
			'font-size:'+FONT_SIZE+';'+
			'line-height:'+LINE_HEIGHT+';'+
		'}'+
		'.zsb-close-button:after{'+
			'line-height:'+FONT_SIZE+';'+
		'}'+

		/*top*/
		'#zsb-bar-base-top,'+IdBarTop+'{'+
			'border-radius:0 0 '+TOP_BASE_BORDER_RADIUS+' '+TOP_BASE_BORDER_RADIUS+';'+
		'}'+
		'#zsb-bar-base-top{'+
			'width:'+TOP_BASE_WIDTH+';'+
			'min-width:'+TOP_BAR_WIDTH+';'+
			'background-color:'+TOP_BASE_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_BASE_BACKGROUND_IMAGE+';'+
			'box-shadow:0 0 10px '+TOP_BASE_BOXSHADOW_COLOR+';'+
			'border-color:'+TOP_BASE_BORDER_COLOR+';'+
			'opacity:'+TOP_BASE_OPACITY+';'+
		'}'+
		''+IdBarTop+'{'+
			'color:'+TOP_TEXT_COLOR+';'+
			'width:'+TOP_BAR_WIDTH+';'+
			'max-width:'+TOP_BASE_WIDTH+';'+
		'}'+
		''+IdBarTop+' '+ClassContent+' > a,'+
		''+IdBarTop+' '+ClassContent+' > li > a,'+
		''+IdBarTop+' '+ClassContent+' > div > a,'+
		''+IdBarTop+' a,'+
		''+IdBarTop+' '+ClassMenubarItem+' > a{'+
			'color:'+TOP_MENUBAR_LINK_COLOR+';'+
			'background-color:'+TOP_MENUBAR_LINK_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_MENUBAR_LINK_BACKGROUND_IMAGE+';'+
			'border-color:'+TOP_MENUBAR_LINK_BORDER_COLOR+';'+
			'border-radius:'+TOP_MENUBAR_ITEM_BORDER_RADIUS+' '+TOP_MENUBAR_ITEM_BORDER_RADIUS+' 0 0;'+
		'}'+
		''+IdBarTop+' '+ClassContent+' > a.zsb-bar-control,'+
		''+IdBarTop+' '+ClassContent+' > li > a.zsb-bar-control,'+
		''+IdBarTop+' '+ClassContent+' > div > a.zsb-bar-control,'+
		''+IdBarTop+' a.zsb-bar-control{'+
			'border-radius:'+TOP_MENUBAR_ITEM_BORDER_RADIUS+' '+TOP_MENUBAR_ITEM_BORDER_RADIUS+' '+TOP_MENUBAR_ITEM_BORDER_RADIUS+' '+TOP_MENUBAR_ITEM_BORDER_RADIUS+';'+
		'}'+
		''+IdBarTop+' '+ClassContent+' > a,'+
		''+IdBarTop+' '+ClassContent+' > li > a,'+
		''+IdBarTop+' '+ClassContent+' > div > a,'+
		''+IdBarTop+' '+ClassMenubarItem+' > a{'+
			'padding:'+TOP_LINK_PADDING+';'+
		'}'+
		''+IdBarTop+' '+ClassContent+' > a:hover,'+
		''+IdBarTop+' '+ClassContent+' > div > a:hover,'+
		''+IdBarTop+' a:hover,'+
		''+IdBarTop+' '+ClassMenubarItem+' > a:hover,'+
		''+IdBarTop+' '+ClassMenubarItem+':hover > a{'+
			'color:'+TOP_MENUBAR_LINK_HOVER_COLOR+';'+
			'background-color:'+TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE+';'+
			'border-color:'+TOP_MENUBAR_LINK_HOVER_BORDER_COLOR+';'+
			'border-bottom-color:'+TOP_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li.zsb-menu-separator{'+
			'border-color:'+TOP_MENUBOX_TEXT_COLOR+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul{'+
			'border-color:'+TOP_MENUBOX_BORDER_COLOR+';'+
			'border-top-color:'+TOP_MENUBOX_ACCENT_BORDER_COLOR+';'+
			'border-top-width:'+TOP_MENUBOX_ACCENT_BORDER_WIDTH+';'+
			'padding:'+TOP_MENUBOX_PADDING+';'+
		'}'+
		''+IdBarTop+' .zsb-menubox-base{'+
			'background-color:'+TOP_MENUBOX_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_MENUBOX_BACKGROUND_IMAGE+';'+
			'box-shadow:0 2px 10px '+TOP_MENUBOX_BOXSHADOW_COLOR+';'+
			'opacity:'+TOP_MENUBOX_OPACITY+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul,'+
		''+IdBarTop+' .zsb-menubox-base{'+
			'border-radius:0 '+TOP_MENUBOX_BORDER_RADIUS+' '+TOP_MENUBOX_BORDER_RADIUS+' '+TOP_MENUBOX_BORDER_RADIUS+';'+
		'}'+
		''+IdBarTop+' #zsb-content-top-right '+ClassMenubarItem+' ul,'+
		''+IdBarTop+' #zsb-content-top-right .zsb-menubox-base{'+
			'border-radius:'+TOP_MENUBOX_BORDER_RADIUS+' '+TOP_MENUBOX_BORDER_RADIUS+' '+TOP_MENUBOX_BORDER_RADIUS+' '+TOP_MENUBOX_BORDER_RADIUS+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul,'+IdBarTop+' '+ClassMenubarItem+' ul .zsb-table-menu{'+
			'color:'+TOP_MENUBOX_TEXT_COLOR+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li > a,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li > div,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li .zsb-table-menu a{'+
			'padding:'+TOP_MENUBOX_ITEM_PADDING+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li > a,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li .zsb-table-menu a,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul a{'+
			'color:'+TOP_MENUBOX_LINK_COLOR+';'+
			'background-color:'+TOP_MENUBOX_LINK_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_MENUBOX_LINK_BACKGROUND_IMAGE+';'+
			'border-color:'+TOP_MENUBOX_LINK_BORDER_COLOR+';'+
			'border-radius:'+TOP_MENUBOX_ITEM_BORDER_RADIUS+';'+
		'}'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li > a:hover,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul li .zsb-table-menu a:hover,'+
		''+IdBarTop+' '+ClassMenubarItem+' ul a:hover{'+
			'color:'+TOP_MENUBOX_LINK_HOVER_COLOR+';'+
			'background-color:'+TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
			'background-image:'+TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
			'border-color:'+TOP_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
		'}'+

		/*bottom*/
		'#zsb-bar-base-bottom,'+IdBarBottom+'{'+
			'border-radius:'+BOTTOM_BASE_BORDER_RADIUS+' '+BOTTOM_BASE_BORDER_RADIUS+' 0 0;'+
		'}'+
		'#zsb-bar-base-bottom{'+
			'width:'+BOTTOM_BASE_WIDTH+';'+
			'min-width:'+BOTTOM_BAR_WIDTH+';'+
			'background-color:'+BOTTOM_BASE_BACKGROUND_COLOR+';'+
			'background-image:'+BOTTOM_BASE_BACKGROUND_IMAGE+';'+
			'box-shadow:0 0 10px '+BOTTOM_BASE_BOXSHADOW_COLOR+';'+
			'border-color:'+BOTTOM_BASE_BORDER_COLOR+';'+
			'opacity:'+BOTTOM_BASE_OPACITY+';'+
		'}'+
		''+IdBarBottom+'{'+
			'color:'+BOTTOM_TEXT_COLOR+';'+
			'width:'+BOTTOM_BAR_WIDTH+';'+
			'max-width:'+BOTTOM_BASE_WIDTH+';'+
		'}'+
		''+IdBarBottom+' '+ClassContent+' > a,'+
		''+IdBarBottom+' '+ClassContent+' > li > a,'+
		''+IdBarBottom+' '+ClassContent+' > div > a,'+
		''+IdBarBottom+' a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' > a{'+
			'color:'+BOTTOM_MENUBAR_LINK_COLOR+';'+
			'background-image:'+BOTTOM_MENUBAR_LINK_BACKGROUND_IMAGE+';'+
			'background-color:'+BOTTOM_MENUBAR_LINK_BACKGROUND_COLOR+';'+
			'border-color:'+BOTTOM_MENUBAR_LINK_BORDER_COLOR+';'+
			'border-radius:0 0 '+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+' '+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+';'+
		'}'+
		''+IdBarBottom+' '+ClassContent+' > a.zsb-bar-control,'+
		''+IdBarBottom+' '+ClassContent+' > li > a.zsb-bar-control,'+
		''+IdBarBottom+' '+ClassContent+' > div > a.zsb-bar-control,'+
		''+IdBarBottom+' a.zsb-bar-control{'+
			'border-radius:'+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+' '+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+' '+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+' '+BOTTOM_MENUBAR_ITEM_BORDER_RADIUS+';'+
		'}'+
		''+IdBarBottom+' '+ClassContent+' > a,'+
		''+IdBarBottom+' '+ClassContent+' > li > a,'+
		''+IdBarBottom+' '+ClassContent+' > div > a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' > a{'+
			'padding:'+BOTTOM_LINK_PADDING+';'+
		'}'+
		''+IdBarBottom+' '+ClassContent+' > a:hover,'+
		''+IdBarBottom+' '+ClassContent+' > li > a:hover,'+
		''+IdBarBottom+' '+ClassContent+' > div > a:hover,'+
		''+IdBarBottom+' a:hover,'+
		''+IdBarBottom+' '+ClassMenubarItem+':hover > a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' > a:hover{'+
			'color:'+BOTTOM_MENUBAR_LINK_HOVER_COLOR+';'+
			'background-color:'+BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
			'background-image:'+BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_IMAGE+';'+
			'border-color:'+BOTTOM_MENUBAR_LINK_HOVER_BORDER_COLOR+';'+
			'border-top-color:'+BOTTOM_MENUBAR_LINK_HOVER_BACKGROUND_COLOR+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li.zsb-menu-separator{'+
			'border-color:'+BOTTOM_MENUBOX_TEXT_COLOR+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul{'+
			'border-color:'+BOTTOM_MENUBOX_BORDER_COLOR+';'+
			'border-bottom-color:'+BOTTOM_MENUBOX_ACCENT_BORDER_COLOR+';'+
			'border-bottom-width:'+BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH+';'+
			'padding:'+BOTTOM_MENUBOX_PADDING+';'+
		'}'+
		''+IdBarBottom+' .zsb-menubox-base{'+
			'background-color:'+BOTTOM_MENUBOX_BACKGROUND_COLOR+';'+
			'background-image:'+BOTTOM_MENUBOX_BACKGROUND_IMAGE+';'+
			'box-shadow:0 2px 10px '+BOTTOM_MENUBOX_BOXSHADOW_COLOR+';'+
			'opacity:'+BOTTOM_MENUBOX_OPACITY+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul,'+
		''+IdBarBottom+' .zsb-menubox-base{'+
			'border-radius:'+BOTTOM_MENUBOX_BORDER_RADIUS+' '+BOTTOM_MENUBOX_BORDER_RADIUS+' '+BOTTOM_MENUBOX_BORDER_RADIUS+' 0;'+
		'}'+
		''+IdBarBottom+' #zsb-content-bottom-right '+ClassMenubarItem+' ul,'+
		''+IdBarBottom+' #zsb-content-bottom-right .zsb-menubox-base{'+
			'border-radius:'+BOTTOM_MENUBOX_BORDER_RADIUS+' '+BOTTOM_MENUBOX_BORDER_RADIUS+' '+BOTTOM_MENUBOX_BORDER_RADIUS+' '+BOTTOM_MENUBOX_BORDER_RADIUS+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul,'+IdBarBottom+' '+ClassMenubarItem+' ul .zsb-table-menu{'+
			'color:'+BOTTOM_MENUBOX_TEXT_COLOR+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li > a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li > div,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li .zsb-table-menu a{'+
			'padding:'+BOTTOM_MENUBOX_ITEM_PADDING+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li > a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li .zsb-table-menu a,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul a{'+
			'color:'+BOTTOM_MENUBOX_LINK_COLOR+';'+
			'background-color:'+BOTTOM_MENUBOX_LINK_BACKGROUND_COLOR+';'+
			'background-image:'+BOTTOM_MENUBOX_LINK_BACKGROUND_IMAGE+';'+
			'border-color:'+BOTTOM_MENUBOX_LINK_BORDER_COLOR+';'+
			'border-radius:'+BOTTOM_MENUBOX_ITEM_BORDER_RADIUS+';'+
		'}'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li > a:hover,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul li .zsb-table-menu a:hover,'+
		''+IdBarBottom+' '+ClassMenubarItem+' ul a:hover{'+
			'color:'+BOTTOM_MENUBOX_LINK_HOVER_COLOR+';'+
			'background-color:'+BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
			'background-image:'+BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
			'border-color:'+BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
		'}'+

	'';

}


(function(){
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var WDGELMID = unescape('%7A%73%62%2D%77%69%64%67%65%74%2D%72%65%66');
	var BTELMID = unescape('%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65');
	var BTELM = document.getElementById(BTELMID);
	var BTELMREF = unescape('%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72');
	var BTELMTITLE = unescape('%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D');
	var BTELMHTML = unescape('%3C%61%20%69%64%3D%22%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65%22%20%68%72%65%66%3D%22%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72%22%3E%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D%3C%2F%61%3E');
	var MSIE8MIN = (function(){
		var REGEX = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
		if ( (navigator.appName == 'Microsoft Internet Explorer') && (REGEX.exec(navigator.userAgent) != null) && (parseFloat(RegExp.$1) < 9.0) ) {
			return true;
		}
	})();
	var BTELMATTRLEN = (function(){
		var COUNT = 0;
		for (var i=0, ATTR; ATTR=BTELM.attributes[i]; i++) {
			if (MSIE8MIN) {
				if (ATTR.specified) { COUNT++; }
			} else {
				COUNT++;
			}
		}
		return COUNT;
	})();
	if ((BTELM.href != BTELMREF) || (BTELMATTRLEN != 2)) { document.getElementById('zsb-wrapper').innerHTML = ''; }
	ZSB_WDGELM_HTML = ''+L+'div id='+Q+''+WDGELMID+''+Q+G+L+'a href='+Q+''+BTELMREF+''+Q+' target='+Q+'_blank'+Q+' title='+Q+''+BTELMTITLE+''+Q+''+G+'i'+L+'/a'+G+''+L+'/div'+G+'';
})();


/* GENERAL */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==='object'){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off('mousemove.hoverIntent',f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=='mouseenter'){u=n.pageX;a=n.pageY;e(r).on('mousemove.hoverIntent',f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off('mousemove.hoverIntent',f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({'mouseenter.hoverIntent':h,'mouseleave.hoverIntent':h},i.selector)}})(jQuery);

function zsb_GetElementsByClassName(CLASSNAME,STARTNODE) {
	var STARTNODE = STARTNODE || document;
	for (var i=0, ARRAY=[], ELEMENT; ELEMENT=STARTNODE.getElementsByTagName('*')[i]; i++) {
		if ((' '+ELEMENT.className+' ').indexOf(' '+CLASSNAME+' ') >= 0) {
			ARRAY.push(ELEMENT);
		}
	}
	return ARRAY;
}

function zsb_StyleTextEmbed(CSS_TXT,ID,MEDIA){
	var STYLE = document.createElement('style');
	STYLE.type = 'text/css';
	if ((!ID)||(ID == '')||(typeof ID == 'undefined')) { } else { STYLE.id = ID; }
	if ((!MEDIA)||(MEDIA == '')||(typeof MEDIA == 'undefined')) { } else { STYLE.setAttribute('media',MEDIA); }
	if (STYLE.styleSheet){
		STYLE.styleSheet.cssText = CSS_TXT;
	} else {
		STYLE.appendChild(document.createTextNode(CSS_TXT));
	}
	document.getElementsByTagName('head')[0].appendChild(STYLE);
}
function zsb_StyleLinkEmbed(CSS_URL,ID,MEDIA) {
	var LINK = document.createElement('link');
	LINK.href = CSS_URL;
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
	var WO_OPENWIN = window.open(URL,'zsbw_Window','width=1000,height=600,scrollbars=yes,menubar=no,toolbar=no');
	WO_OPENWIN.window.focus();
}
function zsb_WindowOpenUrl(WINURL,WINNAME,WINOPT) {
	var WINURL = WINURL || '';
	var WINNAME = WINNAME || 'zsbw_UrlWindow';
	var WINOPT = WINOPT || 'width=1000,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no';
	var WOU_OPENWIN = window.open(WINURL,WINNAME,WINOPT);
	WOU_OPENWIN.window.focus();
}
function zsb_WindowOpenWrite(WINHTML,WINTITLE,WINURL,WINNAME,WINOPT) {
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var DEFAULTWINHTML = '<!DOCTYPE html><html><head></head><body></body></html>';
	var WINHTML = (function() {
		try {
			var HTMLNODE = document.getElementById(WINHTML);
			return HTMLNODE.innerHTML;
		} catch (e) {
			var HTMLCODE = WINHTML || DEFAULTWINHTML;
			return HTMLCODE;
		}
	})();
	var WINTITLE = WINTITLE || document.title;
	var WINURL = WINURL || '';
	var WINNAME = WINNAME || 'zsbw_WriteWindow';
	var WINOPT = WINOPT || 'width=1000,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no';
	var WOW_OPENWIN = window.open(WINURL,WINNAME,WINOPT);
	WOW_OPENWIN.document.write(WINHTML);
	WOW_OPENWIN.document.title = WINTITLE;
	WOW_OPENWIN.window.focus();
}

function zsb_HtmlNodesWhiteSpaceClean(JQUERY_SELECTORS) {
	jQuery(JQUERY_SELECTORS).contents().filter(function() {
		return (this.nodeType === 3 && !/\S/.test(this.nodeValue));
	}).remove();
}


/* FOLLOWBOX */
function zsb_FollowBoxHtmlGenerate(){
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');

	if (ZSB_FACEBOOK_URL_ID) {
		var FBK_URL = 'http://www.facebook.com/'+ZSB_FACEBOOK_URL_ID+'';
		var FBK_IFR_URL = '//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F'+ZSB_FACEBOOK_URL_ID+'&amp;locale=en_US&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21';
		var FBK_BOX_HTML = ''+
			'<div id='+Q+'zsb-facebook-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<iframe '+
					'id='+Q+'zsb-facebook'+Q+' src='+Q+''+FBK_IFR_URL+''+Q+' '+
					'allowTransparency='+Q+'true'+Q+' frameborder='+Q+'0'+Q+' scrolling='+Q+'no'+Q+' '+
					'style='+Q+'border:none;overflow:hidden;width:130px;height:20px;'+Q+'></iframe>'+
			'</div>'+
		'';
	} else {
		var FBK_BOX_HTML = '';
	}

	if (ZSB_TWITTER_URL_ID) {
		var TWT_URL = 'http://twitter.com/'+ZSB_TWITTER_URL_ID+'';
		var TWT_IFR_URL = '//platform.twitter.com/widgets/follow_button.html?screen_name='+ZSB_TWITTER_URL_ID+'&lang=en&show_screen_name=false';
		var TWT_BOX_HTML = ''+
			'<div id='+Q+'zsb-twitter-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<iframe '+
					'id='+Q+'zsb-twitter'+Q+' src='+Q+''+TWT_IFR_URL+''+Q+' '+
					'allowtransparency='+Q+'true'+Q+' frameborder='+Q+'0'+Q+' scrolling='+Q+'no'+Q+' '+
					'style='+Q+'overflow:hidden;border:none;width:145px;height:20px;'+Q+'></iframe>'+
			'</div>'+
		'';
	} else {
		var TWT_BOX_HTML = '';
	}

	if (ZSB_GOOGLE_URL_ID) {
		var GGL_URL = 'https://plus.google.com/'+ZSB_GOOGLE_URL_ID+'';
		var GGL_BOX_HTML = ''+
			'<div id='+Q+'zsb-google-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<div '+
					'id='+Q+'zsb-google'+Q+' class='+Q+'g-follow'+Q+' '+
					'data-annotation='+Q+'bubble'+Q+' data-height='+Q+'20'+Q+' '+
					'data-href='+Q+''+GGL_URL+''+Q+' data-rel='+Q+'publisher'+Q+'></div>'+
			'</div>'+
		'';
	} else {
		var GGL_BOX_HTML = '';
	}

	if (ZSB_FEEDBURNER_URL_ID) {
		var FDB_URL = 'http://feeds.feedburner.com/'+ZSB_FEEDBURNER_URL_ID+'';
		var FDB_MAIL_ACTION_URL = 'https://feedburner.google.com/fb/a/mailverify';
		var FDB_MAIL_URL = ''+FDB_MAIL_ACTION_URL+'?uri='+ZSB_FEEDBURNER_URL_ID+'';
		var FDB_IMG_URL = 'http://feeds.feedburner.com/~fc/'+ZSB_FEEDBURNER_URL_ID+'?bg=CCCCCC&amp;fg=000000&amp;anim=0';
		var FDB_MAIL_WIN_NAME = 'zsb_FdbMailVerifyWin';
		var FDB_INPUT_BDR_CLR_BLUR = 'rgba(128,128,128,0.5)',
			FDB_INPUT_BDR_CLR_FOCUS = '#4ae',
			FDB_ENTRY_CLR_BLUR = '#888',
			FDB_ENTRY_CLR_FOCUS = '#000',
			FDB_ENTRY_BG_CLR_BLUR = '#fff',
			FDB_ENTRY_BG_CLR_FOCUS = '#ffe',
			FDB_BTN_CLR_BLUR = '#fff',
			FDB_BTN_CLR_FOCUS = '#444',
			FDB_BTN_BG_CLR_BLUR = '#9ab',
			FDB_BTN_BG_CLR_FOCUS = '#bdf';
		var FDB_EMAIL_INIT_VAL = 'Enter email here';
		var FDB_BTN_TITLE_STR = 'Enter your email address, and then click Follow button';
		var FDB_BOX_HTML = ''+
			'<div id='+Q+'zsb-feedburner-box'+Q+' class='+Q+'zsb-follow-item'+Q+'>'+
				'<form '+
					'id='+Q+'zsb-feedburner-form'+Q+''+
					'target='+Q+''+FDB_MAIL_WIN_NAME+''+Q+' method='+Q+'post'+Q+' '+
					'action='+Q+''+FDB_MAIL_ACTION_URL+''+Q+' '+
					'onsubmit='+Q+'zsb_FeedburnerMailVerifyWinOpen();return true;'+Q+'>'+
					'<table '+
						'id='+Q+'zsb-feedburner-table'+Q+' '+
						'style='+Q+'border-color:'+FDB_INPUT_BDR_CLR_BLUR+';'+Q+'><tbody><tr>'+
						'<td '+
							'id='+Q+'zsb-feedburner-counter-box'+Q+' '+
							'style='+Q+'border-color:'+FDB_INPUT_BDR_CLR_BLUR+';'+Q+'>'+
							'<a '+
								'id='+Q+'zsb-feedburner-counter'+Q+' class='+Q+'fb_chicklet'+Q+' '+
								'href='+Q+''+FDB_MAIL_URL+''+Q+' '+
								'title='+Q+''+FDB_BTN_TITLE_STR+''+Q+' target='+Q+'_blank'+Q+' rel='+Q+'nofollow'+Q+' '+
								'style='+Q+'background-image:url('+FDB_IMG_URL+') !important;'+Q+' '+
								'onclick='+Q+'zsb_FeedburnerMailVerifyWinOpen();return false;'+Q+' '+
								'onfocus='+Q+'zsb_FeedburnerFocusBlurStyleSet(true);'+Q+' '+
								'onblur='+Q+'zsb_FeedburnerFocusBlurStyleSet(false);'+Q+'>'+
							'</a>'+
						'</td>'+
						'<td '+
							'id='+Q+'zsb-feedburner-email-box'+Q+' '+
							'style='+Q+'background-color:'+FDB_ENTRY_BG_CLR_BLUR+';border-color:'+FDB_INPUT_BDR_CLR_BLUR+';'+Q+'>'+
							'<input '+
								'id='+Q+'zsb-feedburner-email'+Q+' name='+Q+'email'+Q+' '+
								'type='+Q+'text'+Q+' value='+Q+''+FDB_EMAIL_INIT_VAL+''+Q+' '+
								'title='+Q+''+FDB_BTN_TITLE_STR+''+Q+' '+
								'style='+Q+'color:'+FDB_ENTRY_CLR_BLUR+';'+Q+' '+
								'onfocus='+Q+'zsb_FeedburnerFocusBlurStyleSet(true);zsb_FeedburnerEmailValueSet();'+Q+' '+
								'onblur='+Q+'zsb_FeedburnerFocusBlurStyleSet(false);zsb_FeedburnerEmailValueSet();'+Q+'>'+
							'<input type='+Q+'hidden'+Q+' name='+Q+'uri'+Q+' value='+Q+''+ZSB_FEEDBURNER_URL_ID+''+Q+'>'+
							'<input type='+Q+'hidden'+Q+' name='+Q+'loc'+Q+' value='+Q+'en_US'+Q+'>'+
						'</td>'+
						'<td '+
							'id='+Q+'zsb-feedburner-submit-box'+Q+' '+
							'style='+Q+'background-color:'+FDB_BTN_BG_CLR_BLUR+';border-color:'+FDB_INPUT_BDR_CLR_BLUR+';'+Q+'>'+
							'<input '+
								'id='+Q+'zsb-feedburner-submit'+Q+' '+
								'type='+Q+'submit'+Q+' value='+Q+'Follow'+Q+' '+
								'title='+Q+''+FDB_BTN_TITLE_STR+''+Q+' '+
								'style='+Q+'color:'+FDB_BTN_CLR_BLUR+';'+Q+' '+
								'onfocus='+Q+'zsb_FeedburnerFocusBlurStyleSet(true);'+Q+' '+
								'onblur='+Q+'zsb_FeedburnerFocusBlurStyleSet(false);'+Q+'>'+
						'</td>'+
					'</tr></tbody></table>'+
				'</form>'+
			'</div>'+
		'';
	} else {
		var FDB_BOX_HTML = '';
	}

	if ((ZSB_FACEBOOK_URL_ID) || (ZSB_TWITTER_URL_ID) || (ZSB_GOOGLE_URL_ID) || (ZSB_FEEDBURNER_URL_ID)) {
		var FOLLOWBOX_VSPACER_HTML = '<div id='+Q+'zsb-follow-box-vspacer'+Q+' class='+Q+'zsb-follow-box-vspacer'+Q+'></div>';
		var FOLLOWBOX_HTML = FBK_BOX_HTML + TWT_BOX_HTML + FOLLOWBOX_VSPACER_HTML + GGL_BOX_HTML + FDB_BOX_HTML;
		if (document.getElementById('zsb-follow-box')) {
			var FOLLOWBOX = document.getElementById('zsb-follow-box');
			FOLLOWBOX.style.whiteSpace = 'nowrap';
			FOLLOWBOX.innerHTML = FOLLOWBOX_HTML;
		}
	}

}
/* google */
function zsb_GoogleFollowButtonLoad() {
	if (ZSB_GOOGLE_URL_ID) {
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.src = 'https://apis.google.com/js/platform.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);
	}
}
/* feedburner */
function zsb_FeedburnerMailVerifyWinOpen() {
	var FDB_MAIL_ACTION_URL = 'https://feedburner.google.com/fb/a/mailverify';
	var FDB_MAIL_URL = ''+FDB_MAIL_ACTION_URL+'?uri='+ZSB_FEEDBURNER_URL_ID+'';
	var FDB_MAIL_WIN_NAME = 'zsb_FdbMailVerifyWin';
	var FDBMV_OPENWIN = window.open(FDB_MAIL_URL,FDB_MAIL_WIN_NAME,'width=600,height=600,scrollbars=yes,menubar=no,toolbar=no');
	FDBMV_OPENWIN.window.focus();
}
function zsb_FeedburnerEmailValueSet() {
	var FDB_EMAIL_INIT_VAL = 'Enter email here';
	var EMAIL = document.getElementById('zsb-feedburner-email');
	if (EMAIL.value == FDB_EMAIL_INIT_VAL) {
		EMAIL.value = '';
	} else if (EMAIL.value == '') {
		EMAIL.value = FDB_EMAIL_INIT_VAL;
	}
}
function zsb_FeedburnerFocusBlurStyleSet(TRUEFALSE) {
	var FOCUS = TRUEFALSE ? true : false;
	var BLUR = TRUEFALSE ? false : true;
	var TABLE = document.getElementById('zsb-feedburner-table');
	var COUNTER = document.getElementById('zsb-feedburner-counter');
	var COUNTERBOX = document.getElementById('zsb-feedburner-counter-box');
	var EMAIL = document.getElementById('zsb-feedburner-email');
	var EMAILBOX = document.getElementById('zsb-feedburner-email-box');
	var SUBMIT = document.getElementById('zsb-feedburner-submit');
	var SUBMITBOX = document.getElementById('zsb-feedburner-submit-box');
	var FDB_INPUT_BDR_CLR_BLUR = 'rgba(128,128,128,0.5)',
		FDB_INPUT_BDR_CLR_FOCUS = '#4ae',
		FDB_ENTRY_CLR_BLUR = '#888',
		FDB_ENTRY_CLR_FOCUS = '#000',
		FDB_ENTRY_BG_CLR_BLUR = '#fff',
		FDB_ENTRY_BG_CLR_FOCUS = '#ffe',
		FDB_BTN_CLR_BLUR = '#fff',
		FDB_BTN_CLR_FOCUS = '#444',
		FDB_BTN_BG_CLR_BLUR = '#9ab',
		FDB_BTN_BG_CLR_FOCUS = '#bdf';
	var EMAILVALUE = EMAIL.value,
		TABLESTYLE = TABLE.style,
		COUNTERSTYLE = COUNTER.style,
		COUNTERBOXSTYLE = COUNTERBOX.style,
		EMAILSTYLE = EMAIL.style,
		EMAILBOXSTYLE = EMAILBOX.style,
		SUBMITSTYLE = SUBMIT.style,
		SUBMITBOXSTYLE = SUBMITBOX.style;
	if (FOCUS) {
		TABLESTYLE.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
		COUNTERBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
		EMAILBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
		SUBMITBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
		EMAILSTYLE.color = FDB_ENTRY_CLR_FOCUS;
		EMAILBOXSTYLE.backgroundColor = FDB_ENTRY_BG_CLR_FOCUS;
		SUBMITSTYLE.color = FDB_BTN_CLR_FOCUS;
		SUBMITBOXSTYLE.backgroundColor = FDB_BTN_BG_CLR_FOCUS;
	} else {
		TABLESTYLE.borderColor = FDB_INPUT_BDR_CLR_BLUR;
		COUNTERBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_BLUR;
		EMAILBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_BLUR;
		SUBMITBOXSTYLE.borderColor = FDB_INPUT_BDR_CLR_BLUR;
		EMAILSTYLE.color = FDB_ENTRY_CLR_BLUR;
		EMAILBOXSTYLE.backgroundColor = FDB_ENTRY_BG_CLR_BLUR;
		SUBMITSTYLE.color = FDB_BTN_CLR_BLUR;
		SUBMITBOXSTYLE.backgroundColor = FDB_BTN_BG_CLR_BLUR;
	}
}


/* SETUP */

/* BOX */
function zsb_LeftRightCenterContentSetup(POS) {
	zsb_HtmlNodesWhiteSpaceClean('#zsb-content-'+POS+'-left,#zsb-content-'+POS+'-right,#zsb-content-'+POS+'-center');
	var L_CONTENTBOX = document.getElementById('zsb-content-'+POS+'-left');
	var R_CONTENTBOX = document.getElementById('zsb-content-'+POS+'-right');
	var C_CONTENTBOX = document.getElementById('zsb-content-'+POS+'-center');
	L_CONTENTBOX.className += ' zsb-content';
	R_CONTENTBOX.className += ' zsb-content';
	C_CONTENTBOX.className += ' zsb-content';
	var LRC_HEIGHT = Math.max(L_CONTENTBOX.offsetHeight,R_CONTENTBOX.offsetHeight,C_CONTENTBOX.offsetHeight);
	if (LRC_HEIGHT == 0) {
		L_CONTENTBOX.style.height = 0; L_CONTENTBOX.style.display = 'none';
		R_CONTENTBOX.style.height = 0; R_CONTENTBOX.style.display = 'none';
		C_CONTENTBOX.style.height = 0; C_CONTENTBOX.style.display = 'none';
	} else {
		var LRCs = ['left','right','center'];
		for (i=0; i<LRCs.length; i++) {
			var CONTENTBOX = document.getElementById('zsb-content-'+POS+'-'+LRCs[i]+'');
			var SPACER = document.createElement('li');
			SPACER.id = 'zsb-content-vspacer-'+POS+'-'+LRCs[i]+'';
			SPACER.style.height = LRC_HEIGHT+'px';
			if (CONTENTBOX.lastChild && CONTENTBOX.lastChild.nodeName.toLowerCase() != '#text') {
				CONTENTBOX.insertBefore(SPACER,CONTENTBOX.lastChild);
			} else if (CONTENTBOX.lastChild.nodeName.toLowerCase() == '#text') {
				var L = CONTENTBOX.childNodes.length;
				CONTENTBOX.insertBefore(SPACER,CONTENTBOX.childNodes[L-1]);
			} else {
				CONTENTBOX.appendChild(SPACER);
			}
		}
		C_CONTENTBOX.style.width = C_CONTENTBOX.offsetWidth+'px';
		C_CONTENTBOX.style.left = 0;
		C_CONTENTBOX.style.right = 0;
	}
}

/* MENU */
function zsb_MenubarItemClassNameSetup() {
	var ROOT = document.getElementById('zsb-wrapper');
	for (var h=0, MH; MH=zsb_GetElementsByClassName('zsb-menu-hover',ROOT)[h]; h++) {
		MH.className += ' zsb-menubar-item';
	}
	for (var c=0, MC; MC=zsb_GetElementsByClassName('zsb-menu-click',ROOT)[c]; c++) {
		MC.className += ' zsb-menubar-item';
		for (var l=0, LINK; LINK=zsb_GetElementsByClassName('zsb-menu-click-toggler',MC)[l]; l++) {
			if (! LINK.title) {
				LINK.title = 'Click to open/close menu box';
			}
		}
	}
}
function zsb_MenuboxSetup(POS) {
	var BAR = document.getElementById('zsb-bar-'+POS+'');
	var BARHEIGHT = BAR.offsetHeight;
	jQuery('.zsb-menubar-item > ul').addClass('zsb-menubox');
	for (var i=0, MBP; MBP=zsb_GetElementsByClassName('zsb-menubar-item',BAR)[i]; i++) {
		var MBPHEIGHT = MBP.offsetHeight;
		var BOTTOM = MBPHEIGHT+(BARHEIGHT-MBPHEIGHT)/2;
		for (var u=0, UL; UL=MBP.getElementsByTagName('ul')[u]; u++) {
			//UL.className += ' zsb-menubox';
			if (POS == 'bottom') {
				UL.style.bottom = BOTTOM+'px';
			}
			var MBBASE = document.createElement('li');
			MBBASE.className += ' zsb-menubox-base';
			if (UL.firstChild) {
				UL.insertBefore(MBBASE,UL.firstChild);
			} else {
				UL.appendChild(MBBASE);
			}
		}
	}
}
function zsb_TableMenuTdWidthSetup() {
	for (var i=0, TM; TM=zsb_GetElementsByClassName('zsb-table-menu')[i]; i++) {
		for (var r=0, TR; TR=TM.getElementsByTagName('tr')[r]; r++) {
			if (TR.getElementsByTagName('td').length >= 2) {
				var TDL = TR.getElementsByTagName('td').length;
				var LASTTD = TR.getElementsByTagName('td')[TDL-1];
				if (! LASTTD.style.textAlign) {
					LASTTD.style.textAlign = 'right';
				}
				var TDWIDTH = 100/TDL;
				for (var d=0, TD; TD=TR.getElementsByTagName('td')[d]; d++) {
					if (! TD.style.width) {
						TD.style.width = TDWIDTH+'%';
					}
				}
			}
		}
	}
}

/* BAR */
function zsb_BodySpacerBarBaseFillerSetup(POS) {
	var DB = document.body||document.getElementsByTagName('body')[0];
	var ROOT = document.getElementById('zsb-wrapper');
	var BAR = document.getElementById('zsb-bar-'+POS+'');
	/* bodyspacer */
	var BODYSPACER = document.createElement('div');
	BODYSPACER.id = 'zsb-bodyspacer-'+POS+'';
	if ( ((POS == 'top') && (ZSB_TOP_RESERVED)) || ((POS == 'bottom') && (ZSB_BOTTOM_RESERVED)) ) {
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
	BASE.id = 'zsb-bar-base-'+POS+'';
	BASE.style.height = BAR.offsetHeight+'px';
	if (POS == 'top') {
		if (ZSB_TOP_BASE_FULL_WIDTH) {
			BASE.style.borderWidth = '0 0 1px 0';
		} else {
			BASE.style.borderWidth = '0 1px 1px 1px';
		}
	} else if (POS == 'bottom') {
		if (ZSB_BOTTOM_BASE_FULL_WIDTH) {
			BASE.style.borderWidth = '1px 0 0 0';
		} else {
			BASE.style.borderWidth = '1px 1px 0 1px';
		}
	}
	ROOT.insertBefore(BASE,BAR);
	/* bar-filler */
	var FILLER = document.createElement('div');
	FILLER.id = 'zsb-bar-filler-'+POS+'';
	BAR.insertBefore(FILLER,BAR.firstChild);
}
function zsb_BarShow(POS) {
	var BAR = document.getElementById('zsb-bar-'+POS+'');
	var BASE = document.getElementById('zsb-bar-base-'+POS+'');
	var BODYSPACER = document.getElementById('zsb-bodyspacer-'+POS+'');
	if (BAR.offsetHeight == 0) {
		BAR.style.height = 0; BAR.style.display = 'none';
		BASE.style.height = 0; BASE.style.display = 'none';
		BODYSPACER.style.height = 0; BODYSPACER.style.display = 'none';
	} else {
		BAR.style.visibility = 'visible';
		BAR.style.zIndex = '1000000';
	}
}

/* WRAPPER */
function zsb_WrapperShow() {
	var WRAPPERSTYLE = document.getElementById('zsb-wrapper').style;
	WRAPPERSTYLE.display = 'block';
	WRAPPERSTYLE.visibility = 'visible';
	WRAPPERSTYLE.position = 'static';
	WRAPPERSTYLE.opacity = '1.0';
}

/* SCROLLBOX */
function zsb_ScrollBoxSetup() {
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var SCROLLBOX_HTML = ''+
		'<div id='+Q+'zsb-scroll-button-box'+Q+'>'+
			'<div id='+Q+'zsb-scroll-button-top'+Q+'><span>▲</span></div>'+
			''+ZSB_WDGELM_HTML+''+
			'<div id='+Q+'zsb-scroll-button-bottom'+Q+'><span>▼</span></div>'+
		'</div>'+
	'';
	var SCROLLBOX =	document.createElement('div');
	SCROLLBOX.id = 'zsb-scroll-box';
	SCROLLBOX.innerHTML = SCROLLBOX_HTML;
	document.body.appendChild(SCROLLBOX);
}

/* GLOBAL */
function zsb_LinkTitleSet() {
	for (var h=0, HP; HP=zsb_GetElementsByClassName('zsb-homepage')[h]; h++) {
		if (! HP.title) {
			HP.title = 'Home page';
		}
	}
	for (var i=0, CONTENTBOX; CONTENTBOX=zsb_GetElementsByClassName('zsb-content')[i]; i++) {
		for (var l=0, LINK; LINK=CONTENTBOX.getElementsByTagName('a')[l]; l++) {
			if ( (! LINK.title) && (LINK.getElementsByTagName('*').length < 1) && (LINK.innerHTML) ) {
				LINK.title = LINK.innerHTML;
			}
		}
	}
}


/* EVENT */

/* MENUPOP */
function zsb_MenubarItemPopupEventBind(){
	jQuery('.zsb-menu-hover').hoverIntent(function() {
		$(this).find('.zsb-menubox').slideToggle('fast');
	},function() {
		$(this).find('.zsb-menubox').slideToggle('fast');
	});
	jQuery('.zsb-menu-click-toggler').click(function() {
		$(this).closest('.zsb-menu-click').find('.zsb-menubox').slideToggle();
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
	jQuery('#zsb-bar-base-top,#zsb-bar-filler-top,#zsb-scroll-button-top').prop('title', 'Scroll to top');
	jQuery('#zsb-bar-base-top,#zsb-bar-filler-top,#zsb-scroll-button-top').on('click', function() {
		zsb_ScrollToTop();
	});
	jQuery('#zsb-bar-base-bottom,#zsb-bar-filler-bottom,#zsb-scroll-button-bottom').prop('title', 'Scroll to bottom');
	jQuery('#zsb-bar-base-bottom,#zsb-bar-filler-bottom,#zsb-scroll-button-bottom').on('click', function() {
		zsb_ScrollToBottom();
	});
	jQuery('#zsb-scroll-box').hover(function() {
		$(this).stop().animate({'opacity':1});
	},function() {
		$(this).stop().animate({'opacity':0.5});
	});
	jQuery('#zsb-scroll-box').hoverIntent(function() {
		$('#zsb-widget-ref').animate({'width':'toggle'});
	},function() {
		$('#zsb-widget-ref').animate({'width':'toggle'});
	});
}

/* SHOWHIDEBAR */
function zsb_BarControlSetupEventBind(POS){
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var ROOT = document.getElementById('zsb-wrapper');
	if (document.getElementById('zsb-bar-control-'+POS+'')) {
		/* controlinline */
		var CONTROL = document.getElementById('zsb-bar-control-'+POS+'');
		CONTROL.className += ' zsb-bar-control zsb-close-button';
		CONTROL.title = 'Hide '+POS+' bar';
		jQuery('#zsb-bar-control-'+POS+'').click(function() {
			zsb_ShowHideBar(''+POS+'');
		});
		/* controlfixed */
		var CONTROLFIXED = document.createElement('div');
		CONTROLFIXED.id = 'zsb-bar-control-fixed-'+POS+'';
		CONTROLFIXED.className += ' zsb-bar-control-fixed';
		CONTROLFIXED.title = 'Show '+POS+' bar';
		if (POS == 'top') {
			CONTROLFIXED.innerHTML = '<span>▼</span>';
		} else {
			CONTROLFIXED.innerHTML = '<span>▲</span>';
		}
		ROOT.appendChild(CONTROLFIXED);
		jQuery('#zsb-bar-control-fixed-'+POS+'').hover(function() {
			$(this).stop().animate({'opacity':1});
		},function() {
			$(this).stop().animate({'opacity':0.5});
		});
		jQuery('#zsb-bar-control-fixed-'+POS+'').click(function() {
			zsb_ShowHideBar(''+POS+'');
		});
	}
}
function zsb_ShowHideBar(POS) {
	jQuery('#zsb-bodyspacer-'+POS+',#zsb-bar-base-'+POS+',#zsb-bar-'+POS+'').animate({'height':'toggle'});
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
	var BAR = document.getElementById('zsb-bar-'+POS+'');
	var BASE = document.getElementById('zsb-bar-base-'+POS+'');
	var BODYSPACER = document.getElementById('zsb-bodyspacer-'+POS+'');
	BASE.style.height = BAR.offsetHeight+'px';
	if ( ((POS == 'top') && (ZSB_TOP_RESERVED)) || ((POS == 'bottom') && (ZSB_BOTTOM_RESERVED)) ) {
		BODYSPACER.style.height = BAR.offsetHeight+'px';
	}
}







/******************************************************************
 * EXECUTION *
 ******************************************************************/

zsb_AppOptionsParse();
zsb_StyleLinkEmbed('//fonts.googleapis.com/css?family=Ubuntu');
zsb_StyleLinkEmbed(ZSB_APP_CSS_PATH + ZSB_APP_CSS_FILENAME);
zsb_StyleTextEmbed(ZSB_APP_OPTIONS_CSS_TXT);
zsb_FollowBoxHtmlGenerate();
jQuery(window).load(function() {
	zsb_GoogleFollowButtonLoad();
	zsb_WrapperShow();
	zsb_MenubarItemClassNameSetup();
	zsb_BarControlSetupEventBind('top');
	zsb_BarControlSetupEventBind('bottom');
	zsb_LeftRightCenterContentSetup('top');
	zsb_LeftRightCenterContentSetup('bottom');
	zsb_BodySpacerBarBaseFillerSetup('top');
	zsb_BodySpacerBarBaseFillerSetup('bottom');
	zsb_MenuboxSetup('top');
	zsb_MenuboxSetup('bottom');
	zsb_TableMenuTdWidthSetup();
	zsb_MenubarItemPopupEventBind();
	zsb_LinkTitleSet();
	zsb_BarShow('top');
	zsb_BarShow('bottom');
	zsb_ScrollBoxSetup();
	zsb_ScrollEventBind();
	zsb_BodySpacerBarBaseResizeEventBind();
	zsb_BarDefaultHidden();
});

