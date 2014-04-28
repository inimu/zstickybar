/*!
 * zStickyBar 1.0.0 (2014.05)
 * Copyright (c) 2014 Zon Saja - zonsaja@gmail.com - http://inimu.com
 * Official page: http:inimu.com/widget/zstickybar
 * License: CC-BY-SA 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 * You may use zStickyBar as long as proper credit line in HTML code
 * and this header are left intact, and any modification of the software
 * must be released under the same or compatible license.
 */
/*
 * zStickyBar is a beautifully designed, yet highly configurable
 * fixed position bar widget for website/blog, complete with custom menu,
 * follow box, and page scrolling button.
 */

/*!
 * hoverIntent, by Brian Cherne - http://cherne.net/brian/resources/jquery.hoverIntent.html
 * jQuery outside events, by Ben Alman - http://benalman.com/projects/jquery-outside-events-plugin/
 */

/*
 * Before minification:
 * - var declarations (make them comma separated)
 * - ZSBAO (replace: " ZSBAO['" with: " ZSBAO." -- replace: "'] || " with: " || ")
 * - OPTION_CSS_TEXT (replace repeated strings w variables -- remove #ZZ)
 * - DOC.getElementById (replace w zsb_getId)
 */



(function() {
	var UAREGEX = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
	if ( (navigator.appName.indexOf('Microsoft Internet Explorer') >= 0) && (parseFloat(UAREGEX.exec(navigator.userAgent)) < 9.0) ) {
		zsb$ = jQuery.noConflict();
	} else {
		zsb$ = jQuery.noConflict(true);
		jQuery = jQuery || zsb$;
		$ = $ || zsb$;
	}
})();



(function($){
	$.fn.hoverIntent=function(w,e,b){var j={interval:100,sensitivity:7,timeout:0};if(typeof w==='object'){j=$.extend(j,w)}else if($.isFunction(e)){j=$.extend(j,{over:w,out:e,selector:b})}else{j=$.extend(j,{over:w,out:w,selector:e})}var x,d,v,q;var m=function(c){x=c.pageX;d=c.pageY};var g=function(c,f){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);if(Math.abs(v-x)+Math.abs(q-d)<j.sensitivity){$(f).off('mousemove.hoverIntent',m);f.hoverIntent_s=1;return j.over.apply(f,[c])}else{v=x;q=d;f.hoverIntent_t=setTimeout(function(){g(c,f)},j.interval)}};var p=function(f,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);c.hoverIntent_s=0;return j.out.apply(c,[f])};var k=function(c){var h=$.extend({},c);var f=this;if(f.hoverIntent_t){f.hoverIntent_t=clearTimeout(f.hoverIntent_t)}if(c.type=='mouseenter'){v=h.pageX;q=h.pageY;$(f).on('mousemove.hoverIntent',m);if(f.hoverIntent_s!=1){f.hoverIntent_t=setTimeout(function(){g(h,f)},j.interval)}}else{$(f).off('mousemove.hoverIntent',m);if(f.hoverIntent_s==1){f.hoverIntent_t=setTimeout(function(){p(h,f)},j.timeout)}}};return this.on({'mouseenter.hoverIntent':k,'mouseleave.hoverIntent':k},j.selector)}
})(zsb$);



(function($,c,b){
	$.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '),function(d){a(d)});a('focusin','focus'+b);a('focusout','blur'+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+'.'+e+'-special-event';$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}
})(zsb$,document,'outside');



var zStickyBar = (function($) {

	var ZSB_VERSION = '1.0.0', ZSB_APP_STARTED = false, ZSB_APP_INITIALIZED = false, ZSB_WRELM_HTML = '';
	var ZSB_APP_JS_FILE, ZSB_APP_CSS_FILE, ZSB_APP_IMAGE_FILE;
	var ZSB_APP_JS_FILENAME, ZSB_APP_CSS_FILENAME, ZSB_APP_IMAGE_FILENAME;
	var ZSB_APP_PATH, ZSB_APP_ROOT_PATH, ZSB_APP_JS_PATH, ZSB_APP_CSS_PATH, ZSB_APP_IMAGE_PATH;
	var ZSB_FACEBOOK_URL_ID, ZSB_TWITTER_URL_ID, ZSB_GOOGLE_URL_ID, ZSB_FEEDBURNER_URL_ID;
	var ZSB_WAIT_PAGE, ZSB_UPGRADE_SHOW, ZSB_UPGRADE_URL, ZSB_MSIE9_LT, ZSB_MSIE8_LT;
	var ZSB_TOP_FULLWIDTH, ZSB_TOP_HIDDEN, ZSB_TOP_RESERVED;
	var ZSB_BOTTOM_FULLWIDTH, ZSB_BOTTOM_HIDDEN, ZSB_BOTTOM_RESERVED;
	var ZSB_OPTION_CSS_TEXT, GENERAL_CSS_TEXT, TOP_BAR_CSS_TEXT, BOTTOM_BAR_CSS_TEXT, CUSTOM_CSS_TEXT;
	var DOC = document, L = unescape('%3C'), G = unescape('%3E'), TO = unescape(' %3E '), Q = unescape('%22'), S = unescape('%27');
	var HEAD = DOC.head || DOC.getElementsByTagName('head')[0], BODY = DOC.body || DOC.getElementsByTagName('body')[0];




	/* COMMON */

	function zsb_getId(ID,STARTNODE) {
		var STARTNODE = STARTNODE || DOC;
		return STARTNODE.getElementById(ID);
	}

	function zsb_checkId(ID) {
		if (! ID) { return false; }
		try {
			return Boolean(DOC.getElementById(ID).nodeType === 1);
		} catch(e) {
			return false;
		}
	}
	function zsb_checkElement(ELEMENT) {
		if (! ELEMENT) { return false; }
		try {
			return Boolean(ELEMENT.nodeType === 1);
		} catch(e) {
			return false;
		}
	}

	function zsb_setupCSSText(TEXT,ID,MEDIA){
		var TEXT = TEXT || '', ID = ID || '', MEDIA = MEDIA || '';

		var CSSNODE = DOC.createElement('style');
		CSSNODE.type = 'text/css';
		if (ID) { CSSNODE.id = ID; }
		if (MEDIA) { CSSNODE.setAttribute('media',MEDIA); }
		if (CSSNODE.styleSheet) {
			CSSNODE.styleSheet.cssText = TEXT;
		} else {
			CSSNODE.appendChild(DOC.createTextNode(TEXT));
		}
		HEAD.appendChild(CSSNODE);
	}
	function zsb_setupCSSLink(URL,ID,MEDIA) {
		var URL = URL || '', ID = ID || '', MEDIA = MEDIA || '';

		var CSSNODE = DOC.createElement('link');
		CSSNODE.type = 'text/css';
		CSSNODE.rel = 'stylesheet';
		if (ID) { CSSNODE.id = ID; }
		if (MEDIA) { CSSNODE.setAttribute('media',MEDIA); }
		CSSNODE.href = URL;
		HEAD.appendChild(CSSNODE);
	}

	function zsb_DeleteEdgeQuotes(STRING) {
		var REXPSQA = new RegExp('^'+S+''), REXPSQB = new RegExp(''+S+'$');
		var REXPDQA = new RegExp('^'+Q+''), REXPDQB = new RegExp(''+Q+'$');
		return STRING.replace(REXPSQA,'').replace(REXPSQB,'').replace(REXPDQA,'').replace(REXPDQB,'');
	}

	function zsb_insertHTML(TARGETELEMENT,CONTENT,REMOVE) {
		var TARGETELEMENT = TARGETELEMENT || '';
		var TARGETID = (typeof TARGETELEMENT === 'string') ? TARGETELEMENT.replace(/^#/,'') : '';
		var CONTENT = CONTENT || '', REMOVE = REMOVE || false;
		var CODE, CONTENTID = CONTENT.replace(/^#/,'');
		TARGETELEMENT = (zsb_checkElement(TARGETELEMENT)) ? TARGETELEMENT : (zsb_checkId(TARGETID)) ? DOC.getElementById(TARGETID) : '';
		if ( (! TARGETELEMENT) || (! CONTENT) ) { return; }
		try {
			CODE = document.getElementById(CONTENTID).innerHTML;
		} catch(e) {
			CODE = CONTENT;
		}
		$(TARGETELEMENT).append(''+CODE+'');
		if ( (REMOVE) && zsb_checkId(CONTENTID) ) {
			$('#'+CONTENTID+'').remove();
		}
	}

	function zsb_openWindow(WINURL,WINNAME,WINOPT,WINCONTENT,WINTITLE) {
		var DEFWIDTH = parseInt(screen.width*85/100), DEFHEIGHT = parseInt(screen.height*75/100);
		var DEFWINOPT = 'width='+DEFWIDTH+',height='+DEFHEIGHT+',scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=yes';
		var WINURL = WINURL || '';
		var WINNAME = WINNAME || 'zsb_OpenWindow';
		var WINOPT = WINOPT || DEFWINOPT;
		var WINCONTENT = WINCONTENT || '';
		var WINTITLE = WINTITLE || '';

		var OPENWIN = window.open(WINURL,WINNAME,WINOPT);
		OPENWIN.window.focus();
		if (WINCONTENT) {
			WINCONTENT = (function() {
				var HTMLCODE;
				try {
					HTMLCODE = DOC.getElementById(WINCONTENT.replace(/^#/,'')).innerHTML;
				} catch (e) {
					HTMLCODE = WINCONTENT || '';
				}
				return HTMLCODE;
			})();

			var OWDOC = OPENWIN.document;
			if (OWDOC.all) {
				OWDOC.body.innerHTML = '';
				OWDOC.write(WINCONTENT);
			} else if (OWDOC.documentElement) {
				OWDOC.documentElement.innerHTML = WINCONTENT;
			} else if (OWDOC.body) {
				OWDOC.body.innerHTML = WINCONTENT;
			} else {
				OWDOC.write(WINCONTENT);
			}
		}
		if (WINTITLE) {
			OPENWIN.document.title = WINTITLE;
		}
	}




	/* OPTION PARSE */

	function zsb_parsePathOption(ZSBAO) {

		var ZSBAO = ZSBAO || {};

		ZSB_APP_JS_FILENAME = ZSBAO['App_JS_Filename'] || 'zstickybar.js';
		ZSB_APP_CSS_FILENAME = ZSBAO['App_CSS_Filename'] || 'zstickybar.css';
		ZSB_APP_IMAGE_FILENAME = ZSBAO['App_Image_Filename'] || 'zstickybar.png';

/*
		//RECOMMENDED
		ZSB_APP_PATH = ZSBAO['App_Path'] || 'http://inimu.github.io/zstickybar/js/'+ZSB_APP_JS_FILENAME+'';
		ZSB_APP_ROOT_PATH = ZSBAO['App_Root_Path'] || 'http://inimu.github.io/zstickybar/';
		ZSB_APP_JS_PATH = ZSBAO['App_JS_Path'] || ZSB_APP_ROOT_PATH + 'js/';
		ZSB_APP_CSS_PATH = ZSBAO['App_CSS_Path'] || ZSB_APP_ROOT_PATH + 'css/';
		ZSB_APP_IMAGE_PATH = ZSBAO['App_Image_Path'] || ZSB_APP_ROOT_PATH + 'img/';
*/

		//EXPERIMENTAL
		ZSB_APP_PATH = ZSBAO['App_Path'] || (function(){
			var APPURL = '', APPID = 'zsb-app', APPCHECKSTR = 'zStickyBar 1.0.0 (2014.05)';
			if (zsb_checkId('zsb-app')) {
				APPURL = DOC.getElementById(APPID).src;
			} else if (DOC.currentScript) {
				APPURL = DOC.currentScript.src;
			} else {
				var DOCSCRIPTS = DOC.getElementsByTagName('script');

				var i, SCRIPT;
				for (var i = 0; SCRIPT = DOCSCRIPTS[i]; i++) {
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
							var FNREGEX = new RegExp(ZSB_APP_JS_FILENAME);
							if (SCRIPT.src.match(FNREGEX)) {
								APPURL = SCRIPT.src;
								break;
							}
						}
					}
				}
			}
			return APPURL.split('?')[0];
		})();
		ZSB_APP_ROOT_PATH = ZSBAO['App_Root_Path'] || ZSB_APP_PATH.split('/').slice(0, -1).join('/')+'/../';
		ZSB_APP_JS_PATH = ZSBAO['App_JS_Path'] || ZSB_APP_ROOT_PATH + 'js/';
		ZSB_APP_CSS_PATH = ZSBAO['App_CSS_Path'] || ZSB_APP_ROOT_PATH + 'css/';
		ZSB_APP_IMAGE_PATH = ZSBAO['App_Image_Path'] || ZSB_APP_ROOT_PATH + 'img/';

		//ACTUAL FILE USED
		ZSB_APP_JS_FILE = ZSBAO['App_JS_File'] || ZSB_APP_JS_PATH + ZSB_APP_JS_FILENAME;
		ZSB_APP_CSS_FILE = ZSBAO['App_CSS_File'] || ZSB_APP_CSS_PATH + ZSB_APP_CSS_FILENAME;
		ZSB_APP_IMAGE_FILE = ZSBAO['App_Image_File'] || ZSB_APP_IMAGE_PATH + ZSB_APP_IMAGE_FILENAME;

	}



	function zsb_parseGeneralOption(ZSBAO) {

		var ZSBAO = ZSBAO || {};

		var ZSB_SMOOB = ZSBAO['Show_Message_On_Old_Browser'] || 'no';
		ZSB_UPGRADE_SHOW = Boolean( (ZSB_SMOOB === 'yes') || (ZSB_SMOOB === 'true') || (ZSB_SMOOB === true) );
		ZSB_UPGRADE_URL = ZSBAO['Browser_Upgrade_Link_URL'] || 'http://inimu.com/?on=browser-upgrade';

		var ZSB_WUPL = ZSBAO['Wait_Until_Page_Loaded'] || 'no';
		ZSB_WAIT_PAGE = Boolean( (ZSB_WUPL === 'yes') || (ZSB_WUPL === 'true') || (ZSB_WUPL === true) );

		ZSB_FACEBOOK_URL_ID = ZSBAO['Facebook_URL_ID'] || '';
		ZSB_TWITTER_URL_ID = ZSBAO['Twitter_URL_ID'] || '';
		ZSB_GOOGLE_URL_ID = ZSBAO['Google_URL_ID'] || '';
		ZSB_FEEDBURNER_URL_ID = ZSBAO['Feedburner_URL_ID'] || '';

	}




	function zsb_parseStyleOption(ZSBAO) {

		var ZSBAO = ZSBAO || {};



		// GENERAL STYLE

		var COLOR_THEME = ZSBAO['Color_Theme'] || 'light';
		var FONT_FAMILY = ZSBAO['Font_Family'] || 'Ubuntu,Lucida,Calibri,Tahoma,Arial,sans-serif';
		var FONT_WEIGHT = ZSBAO['Font_Weight'] || 'normal';
		var FONT_SIZE = ZSBAO['Font_Size'] || '14px';
		var LINE_HEIGHT = ZSBAO['Line_Height'] || '1.3';


		// BAR+CONTENTBOX+MENUBOX
		//bar
		var BAR_WIDTH = ZSBAO['Bar_Width'] || '100%';
		var BAR_BASE_WIDTH = ZSBAO['Bar_Base_Width'] || '100%';
		var BODY_SPACE_RESERVED = ZSBAO['Body_Space_Reserved'] || 'no';
		var BAR_DEFAULT_HIDDEN = ZSBAO['Bar_Default_Hidden'] || 'no';
		var BAR_ALIGN = ZSBAO['Bar_Align'] || 'center';
		var BAR_PADDING = ZSBAO['Bar_Padding'] || '0';
		var BAR_BORDER_RADIUS = ZSBAO['Bar_Border_Radius'] || '0';
		var BAR_OPACITY = ZSBAO['Bar_Opacity'] || '1.0';
		var BAR_BOXSHADOW_COLOR = ZSBAO['Bar_Boxshadow_Color'] || 'rgba(0,0,0,0.25)';

		if (COLOR_THEME === 'dark') {
			var BAR_BACKGROUND_COLOR = ZSBAO['Bar_Background_Color'] || '#444';
			var BAR_BACKGROUND_IMAGE = ZSBAO['Bar_Background_Image'] || 'none';
			var BAR_BORDER_COLOR = ZSBAO['Bar_Border_Color'] || '#222';
		} else {
			var BAR_BACKGROUND_COLOR = ZSBAO['Bar_Background_Color'] || '#eee';
			var BAR_BACKGROUND_IMAGE = ZSBAO['Bar_Background_Image'] || 'none';
			var BAR_BORDER_COLOR = ZSBAO['Bar_Border_Color'] || '#bbb';
		}

		//contentbox
		var CONTENTBOX_LINK_PADDING = ZSBAO['Bar_Link_Padding'] || '5px 8px';
		var CONTENTBOX_ITEM_PADDING = ZSBAO['Bar_Item_Padding'] || '0';
		var CONTENTBOX_ITEM_VERTICAL_ALIGN = ZSBAO['Bar_Item_Vertical_Align'] || 'middle';
		var CONTENTBOX_ITEM_BORDER_RADIUS = ZSBAO['Bar_Item_Border_Radius'] || BAR_BORDER_RADIUS;

		if (COLOR_THEME === 'dark') {
			var CONTENTBOX_TEXT_COLOR = ZSBAO['Bar_Text_Color'] || '#ccc';
			var CONTENTBOX_LINK_COLOR = ZSBAO['Bar_Link_Color'] || '#fff';
		} else {
			var CONTENTBOX_TEXT_COLOR = ZSBAO['Bar_Text_Color'] || '#555';
			var CONTENTBOX_LINK_COLOR = ZSBAO['Bar_Link_Color'] || '#333';
		}
		var CONTENTBOX_LINK_BACKGROUND_COLOR = ZSBAO['Bar_Link_Background_Color'] || 'transparent';
		var CONTENTBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Bar_Link_Background_Image'] || 'none';
		var CONTENTBOX_LINK_BORDER_COLOR = ZSBAO['Bar_Link_Border_Color'] || 'transparent';

		if (COLOR_THEME === 'dark') {
			var CONTENTBOX_LINK_HOVER_COLOR = ZSBAO['Bar_Link_Hover_Color'] || '#fff';
			var CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Bar_Link_Hover_Background_Color'] || '#595959';
			var CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Bar_Link_Hover_Background_Image'] || 'none';
			var CONTENTBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Bar_Link_Hover_Border_Color'] || '#333';
		} else {
			var CONTENTBOX_LINK_HOVER_COLOR = ZSBAO['Bar_Link_Hover_Color'] || '#333';
			var CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Bar_Link_Hover_Background_Color'] || '#fff';
			var CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Bar_Link_Hover_Background_Image'] || 'none';
			var CONTENTBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Bar_Link_Hover_Border_Color'] || '#ccc';
		}

		//menubox
		var MENUBOX_TEXT_COLOR = ZSBAO['Menubox_Text_Color'] || CONTENTBOX_TEXT_COLOR;
		var MENUBOX_LINK_COLOR = ZSBAO['Menubox_Link_Color'] || CONTENTBOX_LINK_COLOR;
		var MENUBOX_BACKGROUND_COLOR = ZSBAO['Menubox_Background_Color'] || CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR;
		var MENUBOX_BACKGROUND_IMAGE = ZSBAO['Menubox_Background_Image'] || 'none';
		var MENUBOX_BORDER_COLOR = ZSBAO['Menubox_Border_Color'] || CONTENTBOX_LINK_HOVER_BORDER_COLOR;
		var MENUBOX_ACCENT_BORDER_COLOR = ZSBAO['Menubox_Accent_Border_Color'] || MENUBOX_BACKGROUND_COLOR;
		var MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO['Menubox_Accent_Border_Width'] || '0';
		var MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO['Menubox_Link_Background_Color'] || 'transparent';
		var MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Menubox_Link_Background_Image'] || 'none';
		var MENUBOX_LINK_BORDER_COLOR = ZSBAO['Menubox_Link_Border_Color'] || 'transparent';
		var MENUBOX_PADDING = ZSBAO['Menubox_Padding'] || '8px';
		var MENUBOX_BORDER_RADIUS = ZSBAO['Menubox_Border_Radius'] || BAR_BORDER_RADIUS;
		var MENUBOX_BOXSHADOW_COLOR = ZSBAO['Menubox_Boxshadow_Color'] || BAR_BOXSHADOW_COLOR;
		var MENUBOX_OPACITY = ZSBAO['Menubox_Opacity'] || '1.0';
		var MENUBOX_LINK_PADDING = ZSBAO['Menubox_Link_Padding'] || CONTENTBOX_LINK_PADDING;
		var MENUBOX_ITEM_PADDING = ZSBAO['Menubox_Item_Padding'] || MENUBOX_LINK_PADDING;
		var MENUBOX_ITEM_BORDER_RADIUS = ZSBAO['Menubox_Item_Border_Radius'] || CONTENTBOX_ITEM_BORDER_RADIUS;

		if (COLOR_THEME === 'dark') {
			var MENUBOX_LINK_HOVER_COLOR = ZSBAO['Menubox_Link_Hover_Color'] || '#fff';
			var MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Menubox_Link_Hover_Background_Color'] || '#888';
			var MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Menubox_Link_Hover_Background_Image'] || 'none';
			var MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Menubox_Link_Hover_Border_Color'] || '#555';
		} else {
			var MENUBOX_LINK_HOVER_COLOR = ZSBAO['Menubox_Link_Hover_Color'] || '#222';
			var MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Menubox_Link_Hover_Background_Color'] || '#eee';
			var MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Menubox_Link_Hover_Background_Image'] || 'none';
			var MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Menubox_Link_Hover_Border_Color'] || '#dadada';
		}


		// TOP BAR+CONTENTBOX+MENUBOX
		//bar
		var TOP_BAR_WIDTH = ZSBAO['Top_Bar_Width'] || BAR_WIDTH;
		var TOP_BAR_BASE_WIDTH = ZSBAO['Top_Bar_Base_Width'] || BAR_BASE_WIDTH;
		ZSB_TOP_FULLWIDTH = Boolean(TOP_BAR_BASE_WIDTH === '100%');

		var TOP_BDH = ZSBAO['Top_Bar_Default_Hidden'] || BAR_DEFAULT_HIDDEN;
		ZSB_TOP_HIDDEN = Boolean( (TOP_BDH === 'yes') || (TOP_BDH === 'true') || (TOP_BDH === true) );

		var TOP_BSR = ZSBAO['Top_Body_Space_Reserved'] || BODY_SPACE_RESERVED;
		ZSB_TOP_RESERVED = Boolean( (TOP_BSR === 'yes') || (TOP_BSR === 'true') || (TOP_BSR === true) );

		var TOP_BAR_ALIGN = ZSBAO['Top_Bar_Align'] || BAR_ALIGN;

		var TOP_BAR_ALIGN_CSS_TEXT;
		if (TOP_BAR_ALIGN === 'left') {
			TOP_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-top,#zsb-bar-base-top{left:0;right:auto;margin:0 auto 0 0;}'+
				'#zsb-bar-button-show-top{left:50px;right:auto;margin:0 0 0 auto;}'+
			'';
		} else if (TOP_BAR_ALIGN === 'right') {
			TOP_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-top,#zsb-bar-base-top{left:auto;right:0;margin:0 0 0 auto;}'+
				'#zsb-bar-button-show-top{left:auto;right:50px;margin:0 0 0 auto;}'+
			'';
		} else {
			TOP_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-top,#zsb-bar-base-top{left:0;right:0;margin:0 auto;}'+
				'#zsb-bar-button-show-top{left:0;right:0;margin:0 auto;}'+
			'';
		}

		var TOP_BAR_PADDING = ZSBAO['Top_Bar_Padding'] || BAR_PADDING;
		var TOP_BAR_BORDER_RADIUS = ZSBAO['Top_Bar_Border_Radius'] || BAR_BORDER_RADIUS;
		var TOP_BAR_OPACITY = ZSBAO['Top_Bar_Opacity'] || BAR_OPACITY;
		var TOP_BAR_BOXSHADOW_COLOR = ZSBAO['Top_Bar_Boxshadow_Color'] || BAR_BOXSHADOW_COLOR;
		var TOP_BAR_BACKGROUND_COLOR = ZSBAO['Top_Bar_Background_Color'] || BAR_BACKGROUND_COLOR;
		var TOP_BAR_BACKGROUND_IMAGE = ZSBAO['Top_Bar_Background_Image'] || BAR_BACKGROUND_IMAGE;
		var TOP_BAR_BORDER_COLOR = ZSBAO['Top_Bar_Border_Color'] || BAR_BORDER_COLOR;

		//contentbox
		var TOP_CONTENTBOX_ITEM_VERTICAL_ALIGN = ZSBAO['Top_Bar_Item_Vertical_Align'] || CONTENTBOX_ITEM_VERTICAL_ALIGN;
		var TOP_CONTENTBOX_ITEM_BORDER_RADIUS = ZSBAO['Top_Bar_Item_Border_Radius'] || CONTENTBOX_ITEM_BORDER_RADIUS;
		var TOP_CONTENTBOX_LINK_PADDING = ZSBAO['Top_Bar_Link_Padding'] || CONTENTBOX_LINK_PADDING;
		var TOP_CONTENTBOX_ITEM_PADDING = ZSBAO['Top_Bar_Item_Padding'] || CONTENTBOX_ITEM_PADDING;
		var TOP_CONTENTBOX_TEXT_COLOR = ZSBAO['Top_Bar_Text_Color'] || CONTENTBOX_TEXT_COLOR;
		var TOP_CONTENTBOX_LINK_COLOR = ZSBAO['Top_Bar_Link_Color'] || CONTENTBOX_LINK_COLOR;
		var TOP_CONTENTBOX_LINK_BACKGROUND_COLOR = ZSBAO['Top_Bar_Link_Background_Color'] || CONTENTBOX_LINK_BACKGROUND_COLOR;
		var TOP_CONTENTBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Top_Bar_Link_Background_Image'] || CONTENTBOX_LINK_BACKGROUND_IMAGE;
		var TOP_CONTENTBOX_LINK_BORDER_COLOR = ZSBAO['Top_Bar_Link_Border_Color'] || CONTENTBOX_LINK_BORDER_COLOR;
		var TOP_CONTENTBOX_LINK_HOVER_COLOR = ZSBAO['Top_Bar_Link_Hover_Color'] || CONTENTBOX_LINK_HOVER_COLOR;
		var TOP_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Top_Bar_Link_Hover_Background_Color'] || CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR;
		var TOP_CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Top_Bar_Link_Hover_Background_Image'] || CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE;
		var TOP_CONTENTBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Top_Bar_Link_Hover_Border_Color'] || CONTENTBOX_LINK_HOVER_BORDER_COLOR;

		//menubox
		var TOP_MENUBOX_BACKGROUND_COLOR = ZSBAO['Top_Menubox_Background_Color'] || MENUBOX_BACKGROUND_COLOR;
		var TOP_MENUBOX_BACKGROUND_IMAGE = ZSBAO['Top_Menubox_Background_Image'] || MENUBOX_BACKGROUND_IMAGE;
		var TOP_MENUBOX_BORDER_COLOR = ZSBAO['Top_Menubox_Border_Color'] || MENUBOX_BORDER_COLOR;
		var TOP_MENUBOX_PADDING = ZSBAO['Top_Menubox_Padding'] || MENUBOX_PADDING;
		var TOP_MENUBOX_BORDER_RADIUS = ZSBAO['Top_Menubox_Border_Radius'] || MENUBOX_BORDER_RADIUS;
		var TOP_MENUBOX_ACCENT_BORDER_COLOR = ZSBAO['Top_Menubox_Accent_Border_Color'] || MENUBOX_ACCENT_BORDER_COLOR;
		var TOP_MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO['Top_Menubox_Accent_Border_Width'] || MENUBOX_ACCENT_BORDER_WIDTH;
		var TOP_MENUBOX_BOXSHADOW_COLOR = ZSBAO['Top_Menubox_Boxshadow_Color'] || MENUBOX_BOXSHADOW_COLOR;
		var TOP_MENUBOX_OPACITY = ZSBAO['Top_Menubox_Opacity'] || MENUBOX_OPACITY;
		var TOP_MENUBOX_LINK_PADDING = ZSBAO['Top_Menubox_Link_Padding'] || MENUBOX_LINK_PADDING;
		var TOP_MENUBOX_ITEM_PADDING = ZSBAO['Top_Menubox_Item_Padding'] || MENUBOX_ITEM_PADDING;
		var TOP_MENUBOX_ITEM_BORDER_RADIUS = ZSBAO['Top_Menubox_Item_Border_Radius'] || MENUBOX_ITEM_BORDER_RADIUS;
		var TOP_MENUBOX_TEXT_COLOR = ZSBAO['Top_Menubox_Text_Color'] || MENUBOX_TEXT_COLOR;
		var TOP_MENUBOX_LINK_COLOR = ZSBAO['Top_Menubox_Link_Color'] || MENUBOX_LINK_COLOR;
		var TOP_MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO['Top_Menubox_Link_Background_Color'] || MENUBOX_LINK_BACKGROUND_COLOR;
		var TOP_MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Top_Menubox_Link_Background_Image'] || MENUBOX_LINK_BACKGROUND_IMAGE;
		var TOP_MENUBOX_LINK_BORDER_COLOR = ZSBAO['Top_Menubox_Link_Border_Color'] || MENUBOX_LINK_BORDER_COLOR;
		var TOP_MENUBOX_LINK_HOVER_COLOR = ZSBAO['Top_Menubox_Link_Hover_Color'] || MENUBOX_LINK_HOVER_COLOR;
		var TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Top_Menubox_Link_Hover_Background_Color'] || MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
		var TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Top_Menubox_Link_Hover_Background_Image'] || MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
		var TOP_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Top_Menubox_Link_Hover_Border_Color'] || MENUBOX_LINK_HOVER_BORDER_COLOR;


		// BOTTOM BAR+CONTENTBOX+MENUBOX
		//bar
		var BOTTOM_BAR_WIDTH = ZSBAO['Bottom_Bar_Width'] || BAR_WIDTH;
		var BOTTOM_BAR_BASE_WIDTH = ZSBAO['Bottom_Bar_Base_Width'] || BAR_BASE_WIDTH;
		ZSB_BOTTOM_FULLWIDTH = Boolean(BOTTOM_BAR_BASE_WIDTH === '100%');

		var BOTTOM_BDH = ZSBAO['Bottom_Bar_Default_Hidden'] || BAR_DEFAULT_HIDDEN;
		ZSB_BOTTOM_HIDDEN = Boolean( (BOTTOM_BDH === 'yes') || (BOTTOM_BDH === 'true') || (BOTTOM_BDH === true) );

		var BOTTOM_BSR = ZSBAO['Bottom_Body_Space_Reserved'] || BODY_SPACE_RESERVED;
		ZSB_BOTTOM_RESERVED = Boolean( (BOTTOM_BSR === 'yes') || (BOTTOM_BSR === 'true') || (BOTTOM_BSR === true) );

		var BOTTOM_BAR_ALIGN = ZSBAO['Bottom_Bar_Align'] || BAR_ALIGN;

		var BOTTOM_BAR_ALIGN_CSS_TEXT;
		if (BOTTOM_BAR_ALIGN === 'left') {
			BOTTOM_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-bottom,#zsb-bar-base-bottom{left:0;right:auto;margin:0 auto 0 0;}'+
				'#zsb-bar-button-show-bottom{left:50px;right:auto;margin:0 0 0 auto;}'+
			'';
		} else if (BOTTOM_BAR_ALIGN === 'right') {
			BOTTOM_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-bottom,#zsb-bar-base-bottom{left:auto;right:0;margin:0 0 0 auto;}'+
				'#zsb-bar-button-show-bottom{left:auto;right:50px;margin:0 0 0 auto;}'+
			'';
		} else {
			BOTTOM_BAR_ALIGN_CSS_TEXT = ''+
				'#zsb-bar-bottom,#zsb-bar-base-bottom{left:0;right:0;margin:0 auto;}'+
				'#zsb-bar-button-show-bottom{left:0;right:0;margin:0 auto;}'+
			'';
		}

		var BOTTOM_BAR_PADDING = ZSBAO['Bottom_Bar_Padding'] || BAR_PADDING;
		var BOTTOM_BAR_BORDER_RADIUS = ZSBAO['Bottom_Bar_Border_Radius'] || BAR_BORDER_RADIUS;
		var BOTTOM_BAR_OPACITY = ZSBAO['Bottom_Bar_Opacity'] || BAR_OPACITY;
		var BOTTOM_BAR_BOXSHADOW_COLOR = ZSBAO['Bottom_Bar_Boxshadow_Color'] || BAR_BOXSHADOW_COLOR;
		var BOTTOM_BAR_BACKGROUND_COLOR = ZSBAO['Bottom_Bar_Background_Color'] || BAR_BACKGROUND_COLOR;
		var BOTTOM_BAR_BACKGROUND_IMAGE = ZSBAO['Bottom_Bar_Background_Image'] || BAR_BACKGROUND_IMAGE;
		var BOTTOM_BAR_BORDER_COLOR = ZSBAO['Bottom_Bar_Border_Color'] || BAR_BORDER_COLOR;

		//contentbox
		var BOTTOM_CONTENTBOX_ITEM_VERTICAL_ALIGN = ZSBAO['Bottom_Bar_Item_Vertical_Align'] || CONTENTBOX_ITEM_VERTICAL_ALIGN;
		var BOTTOM_CONTENTBOX_ITEM_BORDER_RADIUS = ZSBAO['Bottom_Bar_Item_Border_Radius'] || CONTENTBOX_ITEM_BORDER_RADIUS;
		var BOTTOM_CONTENTBOX_LINK_PADDING = ZSBAO['Bottom_Bar_Link_Padding'] || CONTENTBOX_LINK_PADDING;
		var BOTTOM_CONTENTBOX_ITEM_PADDING = ZSBAO['Bottom_Bar_Item_Padding'] || CONTENTBOX_ITEM_PADDING;
		var BOTTOM_CONTENTBOX_TEXT_COLOR = ZSBAO['Bottom_Bar_Text_Color'] || CONTENTBOX_TEXT_COLOR;
		var BOTTOM_CONTENTBOX_LINK_COLOR = ZSBAO['Bottom_Bar_Link_Color'] || CONTENTBOX_LINK_COLOR;
		var BOTTOM_CONTENTBOX_LINK_BACKGROUND_COLOR = ZSBAO['Bottom_Bar_Link_Background_Color'] || CONTENTBOX_LINK_BACKGROUND_COLOR;
		var BOTTOM_CONTENTBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Bottom_Bar_Link_Background_Image'] || CONTENTBOX_LINK_BACKGROUND_IMAGE;
		var BOTTOM_CONTENTBOX_LINK_BORDER_COLOR = ZSBAO['Bottom_Bar_Link_Border_Color'] || CONTENTBOX_LINK_BORDER_COLOR;
		var BOTTOM_CONTENTBOX_LINK_HOVER_COLOR = ZSBAO['Bottom_Bar_Link_Hover_Color'] || CONTENTBOX_LINK_HOVER_COLOR;
		var BOTTOM_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Bottom_Bar_Link_Hover_Background_Color'] || CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR;
		var BOTTOM_CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Bottom_Bar_Link_Hover_Background_Image'] || CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE;
		var BOTTOM_CONTENTBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Bottom_Bar_Link_Hover_Border_Color'] || CONTENTBOX_LINK_HOVER_BORDER_COLOR;

		//menubox
		var BOTTOM_MENUBOX_BACKGROUND_COLOR = ZSBAO['Bottom_Menubox_Background_Color'] || MENUBOX_BACKGROUND_COLOR;
		var BOTTOM_MENUBOX_BACKGROUND_IMAGE = ZSBAO['Bottom_Menubox_Background_Image'] || MENUBOX_BACKGROUND_IMAGE;
		var BOTTOM_MENUBOX_BORDER_COLOR = ZSBAO['Bottom_Menubox_Border_Color'] || MENUBOX_BORDER_COLOR;
		var BOTTOM_MENUBOX_PADDING = ZSBAO['Bottom_Menubox_Padding'] || MENUBOX_PADDING;
		var BOTTOM_MENUBOX_BORDER_RADIUS = ZSBAO['Bottom_Menubox_Border_Radius'] || MENUBOX_BORDER_RADIUS;
		var BOTTOM_MENUBOX_ACCENT_BORDER_COLOR = ZSBAO['Bottom_Menubox_Accent_Border_Color'] || MENUBOX_ACCENT_BORDER_COLOR;
		var BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH = ZSBAO['Bottom_Menubox_Accent_Border_Width'] || MENUBOX_ACCENT_BORDER_WIDTH;
		var BOTTOM_MENUBOX_BOXSHADOW_COLOR = ZSBAO['Bottom_Menubox_Boxshadow_Color'] || MENUBOX_BOXSHADOW_COLOR;
		var BOTTOM_MENUBOX_OPACITY = ZSBAO['Bottom_Menubox_Opacity'] || MENUBOX_OPACITY;
		var BOTTOM_MENUBOX_LINK_PADDING = ZSBAO['Bottom_Menubox_Link_Padding'] || MENUBOX_LINK_PADDING;
		var BOTTOM_MENUBOX_ITEM_PADDING = ZSBAO['Bottom_Menubox_Item_Padding'] || MENUBOX_ITEM_PADDING;
		var BOTTOM_MENUBOX_ITEM_BORDER_RADIUS = ZSBAO['Bottom_Menubox_Item_Border_Radius'] || MENUBOX_ITEM_BORDER_RADIUS;
		var BOTTOM_MENUBOX_TEXT_COLOR = ZSBAO['Bottom_Menubox_Text_Color'] || MENUBOX_TEXT_COLOR;
		var BOTTOM_MENUBOX_LINK_COLOR = ZSBAO['Bottom_Menubox_Link_Color'] || MENUBOX_LINK_COLOR;
		var BOTTOM_MENUBOX_LINK_BACKGROUND_COLOR = ZSBAO['Bottom_Menubox_Link_Background_Color'] || MENUBOX_LINK_BACKGROUND_COLOR;
		var BOTTOM_MENUBOX_LINK_BACKGROUND_IMAGE = ZSBAO['Bottom_Menubox_Link_Background_Image'] || MENUBOX_LINK_BACKGROUND_IMAGE;
		var BOTTOM_MENUBOX_LINK_BORDER_COLOR = ZSBAO['Bottom_Menubox_Link_Border_Color'] || MENUBOX_LINK_BORDER_COLOR;
		var BOTTOM_MENUBOX_LINK_HOVER_COLOR = ZSBAO['Bottom_Menubox_Link_Hover_Color'] || MENUBOX_LINK_HOVER_COLOR;
		var BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR = ZSBAO['Bottom_Menubox_Link_Hover_Background_Color'] || MENUBOX_LINK_HOVER_BACKGROUND_COLOR;
		var BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE = ZSBAO['Bottom_Menubox_Link_Hover_Background_Image'] || MENUBOX_LINK_HOVER_BACKGROUND_IMAGE;
		var BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR = ZSBAO['Bottom_Menubox_Link_Hover_Border_Color'] || MENUBOX_LINK_HOVER_BORDER_COLOR;



		// OUTPUT CSS TEXT

		var IDBARTOP = '#zsb-bar-top';
		var IDBARBOTTOM = '#zsb-bar-bottom';
		var ULCONTENTBOX = 'ul.zsb-contentbox';
		var ULMENUBOX = 'ul.zsb-menubox';
		var CSSBKGTEXT = 'background-';
		var CSSBDRTEXT = 'border-';
		var CSSCLRTEXT = 'color:';

		//general
		GENERAL_CSS_TEXT = ZSBAO['General_CSS_Text'] || ''+
			'#zsb-wrapper,'+
			'#zsb-wrapper ul,'+
			'#zsb-wrapper ol,'+
			'#zsb-wrapper li,'+
			'#zsb-wrapper table,'+
			'#zsb-wrapper td,'+
			'#ZZ {'+
				'font-family:'+FONT_FAMILY+';'+
				'font-weight:'+FONT_WEIGHT+';'+
				'font-size:'+FONT_SIZE+';'+
				'line-height:'+LINE_HEIGHT+';'+
			'}'+
			'.zsb-close-button:after,'+
			'#ZZ {'+
				'line-height:'+FONT_SIZE+';'+
			'}'+
		'';

		//top
		TOP_BAR_CSS_TEXT = ZSBAO['Top_Bar_CSS_Text'] || ''+
			''+TOP_BAR_ALIGN_CSS_TEXT+''+
			'#zsb-bar-base-top,'+
			'#zsb-bar-top,'+
			'#ZZ {'+
				'border-radius:'+TOP_BAR_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-base-top,'+
			'#ZZ {'+
				'width:'+TOP_BAR_BASE_WIDTH+';'+
				'min-width:'+TOP_BAR_WIDTH+';'+
				'background-color:'+TOP_BAR_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_BAR_BACKGROUND_IMAGE+';'+
				'box-shadow:0 0 10px '+TOP_BAR_BOXSHADOW_COLOR+';'+
				'border-color:'+TOP_BAR_BORDER_COLOR+';'+
				'opacity:'+TOP_BAR_OPACITY+';'+
			'}'+
			'.zsb-bar-top-temp,'+
			'#ZZ {'+
				'background-color:'+TOP_BAR_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_BAR_BACKGROUND_IMAGE+';'+
				'box-shadow:0 0 10px '+TOP_BAR_BOXSHADOW_COLOR+';'+
				'border-color:'+TOP_BAR_BORDER_COLOR+';'+
				'opacity:'+TOP_BAR_OPACITY+';'+
			'}'+
			'#zsb-bar-top,'+
			'#ZZ {'+
				'width:'+TOP_BAR_WIDTH+';'+
				'max-width:'+TOP_BAR_BASE_WIDTH+';'+
			'}'+
			'#zsb-bar-top ul.zsb-contentbox,'+
			'#ZZ {'+
				'padding:'+TOP_BAR_PADDING+';'+
			'}'+
			'#zsb-bar-top,'+
			'#zsb-bar-top ul.zsb-contentbox,'+
			'#ZZ {'+
				'color:'+TOP_CONTENTBOX_TEXT_COLOR+';'+
			'}'+
			'#zsb-bar-top ul.zsb-contentbox > li,'+
			'#zsb-bar-top ul.zsb-contentbox .zsb-contentbox-vspacer,'+
			'#ZZ {'+
				'vertical-align:'+TOP_CONTENTBOX_ITEM_VERTICAL_ALIGN+';'+
			'}'+
			'#zsb-bar-top a,'+
			'#zsb-bar-top ul.zsb-contentbox a,'+
			'#zsb-bar-top ul.zsb-contentbox > li > a,'+
			'#ZZ {'+
				'color:'+TOP_CONTENTBOX_LINK_COLOR+';'+
				'background-color:'+TOP_CONTENTBOX_LINK_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_CONTENTBOX_LINK_BACKGROUND_IMAGE+';'+
				'border-color:'+TOP_CONTENTBOX_LINK_BORDER_COLOR+';'+
				'border-radius:'+TOP_CONTENTBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top ul.zsb-contentbox > li .zsb-item-base,'+
			'#zsb-bar-top ul.zsb-contentbox > li .zsb-with-base:before,'+
			'#zsb-bar-top ul.zsb-contentbox > li > a.zsb-bar-button-hide,'+
			'#zsb-bar-top a.zsb-bar-button-hide,'+
			'#ZZ {'+
				'border-radius:'+TOP_CONTENTBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top ul.zsb-contentbox > li > a,'+
			'#ZZ {'+
				'padding:'+TOP_CONTENTBOX_LINK_PADDING+';'+
			'}'+
			'#zsb-bar-top ul.zsb-contentbox > li > div,'+
			'#ZZ {'+
				'padding:'+TOP_CONTENTBOX_ITEM_PADDING+';'+
			'}'+
			'#zsb-bar-top a:hover,'+
			'#zsb-bar-top ul.zsb-contentbox a:hover,'+
			'#zsb-bar-top ul.zsb-contentbox > li > a:hover,'+
			'#zsb-bar-top ul.zsb-contentbox > li:hover > a,'+
			'#zsb-bar-top ul.zsb-contentbox > li > a.zsb-contentbox-item-on,'+
			'#ZZ {'+
				'color:'+TOP_CONTENTBOX_LINK_HOVER_COLOR+';'+
				'background-color:'+TOP_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
				'border-color:'+TOP_CONTENTBOX_LINK_HOVER_BORDER_COLOR+';'+
				'border-bottom-color:'+TOP_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox,'+
			'#ZZ {'+
				'border-color:'+TOP_MENUBOX_BORDER_COLOR+';'+
				'border-top-color:'+TOP_MENUBOX_ACCENT_BORDER_COLOR+';'+
				'border-top-width:'+TOP_MENUBOX_ACCENT_BORDER_WIDTH+';'+
				'padding:'+TOP_MENUBOX_PADDING+';'+
			'}'+
			'#zsb-bar-top li.zsb-menu-popover ul.zsb-menubox:before,'+
			'#ZZ {'+
				'border-bottom-color:'+TOP_MENUBOX_ACCENT_BORDER_COLOR+';'+
			'}'+
			'#zsb-bar-top li.zsb-menu-popover ul.zsb-menubox:after,'+
			'#ZZ {'+
				'border-bottom-color:'+TOP_MENUBOX_BACKGROUND_COLOR+';'+
			'}'+
			'#zsb-bar-top .zsb-menubox-base,'+
			'#ZZ {'+
				'background-color:'+TOP_MENUBOX_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_MENUBOX_BACKGROUND_IMAGE+';'+
				'box-shadow:0 2px 10px '+TOP_MENUBOX_BOXSHADOW_COLOR+';'+
				'opacity:'+TOP_MENUBOX_OPACITY+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox,'+
			'#zsb-bar-top .zsb-menubox-base,'+
			'#ZZ {'+
				'border-radius:'+TOP_MENUBOX_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top #zsb-contentbox-top-right ul.zsb-menubox,'+
			'#zsb-bar-top #zsb-contentbox-top-right .zsb-menubox-base,'+
			'#ZZ {'+
				'border-radius:'+TOP_MENUBOX_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox,'+
			'#zsb-bar-top ul.zsb-menubox .zsb-menu-table,'+
			'#ZZ {'+
				'color:'+TOP_MENUBOX_TEXT_COLOR+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox > li > a,'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-menu-table a,'+
			'#ZZ {'+
				'padding:'+TOP_MENUBOX_LINK_PADDING+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox > li > div,'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-menu-table div,'+
			'#ZZ {'+
				'padding:'+TOP_MENUBOX_ITEM_PADDING+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox a,'+
			'#zsb-bar-top ul.zsb-menubox > li > a,'+
			'#zsb-bar-top ul.zsb-menubox .zsb-menu-table a,'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-menu-table a,'+
			'#ZZ {'+
				'color:'+TOP_MENUBOX_LINK_COLOR+';'+
				'background-color:'+TOP_MENUBOX_LINK_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_MENUBOX_LINK_BACKGROUND_IMAGE+';'+
				'border-color:'+TOP_MENUBOX_LINK_BORDER_COLOR+';'+
				'border-radius:'+TOP_MENUBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-item-base,'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-with-base:before,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_MENUBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox a:hover,'+
			'#zsb-bar-top ul.zsb-menubox > li > a:hover,'+
			'#zsb-bar-top ul.zsb-menubox .zsb-menu-table a:hover,'+
			'#zsb-bar-top ul.zsb-menubox > li .zsb-menu-table a:hover,'+
			'#zsb-bar-top ul.zsb-menubox > li > a.zsb-menubox-item-on,'+
			'#ZZ {'+
				'color:'+TOP_MENUBOX_LINK_HOVER_COLOR+';'+
				'background-color:'+TOP_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
				'background-image:'+TOP_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
				'border-color:'+TOP_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
			'}'+
			'#zsb-bar-top ul.zsb-menubox > li.zsb-menu-separator,'+
			'#ZZ {'+
				'border-color:'+TOP_MENUBOX_TEXT_COLOR+';'+
			'}'+
		'';

		//bottom
		BOTTOM_BAR_CSS_TEXT = ZSBAO['Bottom_Bar_CSS_Text'] || ''+
			''+BOTTOM_BAR_ALIGN_CSS_TEXT+''+
			'#zsb-bar-base-bottom,'+
			'#zsb-bar-bottom,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_BAR_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-base-bottom,'+
			'#ZZ {'+
				'width:'+BOTTOM_BAR_BASE_WIDTH+';'+
				'min-width:'+BOTTOM_BAR_WIDTH+';'+
				'background-color:'+BOTTOM_BAR_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_BAR_BACKGROUND_IMAGE+';'+
				'box-shadow:0 0 10px '+BOTTOM_BAR_BOXSHADOW_COLOR+';'+
				'border-color:'+BOTTOM_BAR_BORDER_COLOR+';'+
				'opacity:'+BOTTOM_BAR_OPACITY+';'+
			'}'+
			'.zsb-bar-bottom-temp,'+
			'#ZZ {'+
				'background-color:'+BOTTOM_BAR_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_BAR_BACKGROUND_IMAGE+';'+
				'box-shadow:0 0 10px '+BOTTOM_BAR_BOXSHADOW_COLOR+';'+
				'border-color:'+BOTTOM_BAR_BORDER_COLOR+';'+
				'opacity:'+BOTTOM_BAR_OPACITY+';'+
			'}'+
			'#zsb-bar-bottom,'+
			'#ZZ {'+
				'width:'+BOTTOM_BAR_WIDTH+';'+
				'max-width:'+BOTTOM_BAR_BASE_WIDTH+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-contentbox,'+
			'#ZZ {'+
				'padding:'+BOTTOM_BAR_PADDING+';'+
			'}'+
			'#zsb-bar-bottom,'+
			'#zsb-bar-bottom ul.zsb-contentbox,'+
			'#ZZ {'+
				'color:'+BOTTOM_CONTENTBOX_TEXT_COLOR+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-contentbox > li,'+
			'#zsb-bar-bottom ul.zsb-contentbox .zsb-contentbox-vspacer,'+
			'#ZZ {'+
				'vertical-align:'+BOTTOM_CONTENTBOX_ITEM_VERTICAL_ALIGN+';'+
			'}'+
			'#zsb-bar-bottom a,'+
			'#zsb-bar-bottom ul.zsb-contentbox a,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > a,'+
			'#ZZ {'+
				'color:'+BOTTOM_CONTENTBOX_LINK_COLOR+';'+
				'background-color:'+BOTTOM_CONTENTBOX_LINK_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_CONTENTBOX_LINK_BACKGROUND_IMAGE+';'+
				'border-color:'+BOTTOM_CONTENTBOX_LINK_BORDER_COLOR+';'+
				'border-radius:'+BOTTOM_CONTENTBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-contentbox > li .zsb-item-base,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li .zsb-with-base:before,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > a.zsb-bar-button-hide,'+
			'#zsb-bar-bottom a.zsb-bar-button-hide,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_CONTENTBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > a,'+
			'#ZZ {'+
				'padding:'+BOTTOM_CONTENTBOX_LINK_PADDING+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > div,'+
			'#ZZ {'+
				'padding:'+BOTTOM_CONTENTBOX_ITEM_PADDING+';'+
			'}'+
			'#zsb-bar-bottom a:hover,'+
			'#zsb-bar-bottom ul.zsb-contentbox a:hover,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > a:hover,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li:hover > a,'+
			'#zsb-bar-bottom ul.zsb-contentbox > li > a.zsb-contentbox-item-on,'+
			'#ZZ {'+
				'color:'+BOTTOM_CONTENTBOX_LINK_HOVER_COLOR+';'+
				'background-color:'+BOTTOM_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_CONTENTBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
				'border-color:'+BOTTOM_CONTENTBOX_LINK_HOVER_BORDER_COLOR+';'+
				'border-top-color:'+BOTTOM_CONTENTBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox,'+
			'#ZZ {'+
				'border-color:'+BOTTOM_MENUBOX_BORDER_COLOR+';'+
				'border-bottom-color:'+BOTTOM_MENUBOX_ACCENT_BORDER_COLOR+';'+
				'border-bottom-width:'+BOTTOM_MENUBOX_ACCENT_BORDER_WIDTH+';'+
				'padding:'+BOTTOM_MENUBOX_PADDING+';'+
			'}'+
			'#zsb-bar-bottom li.zsb-menu-popover ul.zsb-menubox:before,'+
			'#ZZ {'+
				'border-top-color:'+BOTTOM_MENUBOX_ACCENT_BORDER_COLOR+';'+
			'}'+
			'#zsb-bar-bottom li.zsb-menu-popover ul.zsb-menubox:after,'+
			'#ZZ {'+
				'border-top-color:'+BOTTOM_MENUBOX_BACKGROUND_COLOR+';'+
			'}'+
			'#zsb-bar-bottom .zsb-menubox-base,'+
			'#ZZ {'+
				'background-color:'+BOTTOM_MENUBOX_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_MENUBOX_BACKGROUND_IMAGE+';'+
				'box-shadow:0 2px 10px '+BOTTOM_MENUBOX_BOXSHADOW_COLOR+';'+
				'opacity:'+BOTTOM_MENUBOX_OPACITY+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox,'+
			'#zsb-bar-bottom .zsb-menubox-base,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_MENUBOX_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom #zsb-contentbox-bottom-right ul.zsb-menubox,'+
			'#zsb-bar-bottom #zsb-contentbox-bottom-right .zsb-menubox-base,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_MENUBOX_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox,'+
			'#zsb-bar-bottom ul.zsb-menubox .zsb-menu-table,'+
			'#ZZ {'+
				'color:'+BOTTOM_MENUBOX_TEXT_COLOR+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox > li > a,'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-menu-table a,'+
			'#ZZ {'+
				'padding:'+BOTTOM_MENUBOX_LINK_PADDING+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox > li > div,'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-menu-table div,'+
			'#ZZ {'+
				'padding:'+BOTTOM_MENUBOX_ITEM_PADDING+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox a,'+
			'#zsb-bar-bottom ul.zsb-menubox > li > a,'+
			'#zsb-bar-bottom ul.zsb-menubox .zsb-menu-table a,'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-menu-table a,'+
			'#ZZ {'+
				'color:'+BOTTOM_MENUBOX_LINK_COLOR+';'+
				'background-color:'+BOTTOM_MENUBOX_LINK_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_MENUBOX_LINK_BACKGROUND_IMAGE+';'+
				'border-color:'+BOTTOM_MENUBOX_LINK_BORDER_COLOR+';'+
				'border-radius:'+BOTTOM_MENUBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-item-base,'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-with-base:before,'+
			'#ZZ {'+
				'border-radius:'+BOTTOM_MENUBOX_ITEM_BORDER_RADIUS+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox a:hover,'+
			'#zsb-bar-bottom ul.zsb-menubox > li > a:hover,'+
			'#zsb-bar-bottom ul.zsb-menubox .zsb-menu-table a:hover,'+
			'#zsb-bar-bottom ul.zsb-menubox > li .zsb-menu-table a:hover,'+
			'#zsb-bar-bottom ul.zsb-menubox > li > a.zsb-menubox-item-on,'+
			'#ZZ {'+
				'color:'+BOTTOM_MENUBOX_LINK_HOVER_COLOR+';'+
				'background-color:'+BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_COLOR+';'+
				'background-image:'+BOTTOM_MENUBOX_LINK_HOVER_BACKGROUND_IMAGE+';'+
				'border-color:'+BOTTOM_MENUBOX_LINK_HOVER_BORDER_COLOR+';'+
			'}'+
			'#zsb-bar-bottom ul.zsb-menubox > li.zsb-menu-separator,'+
			'#ZZ {'+
				'border-color:'+BOTTOM_MENUBOX_TEXT_COLOR+';'+
			'}'+
		'';


		//custom
		CUSTOM_CSS_TEXT = ZSBAO['Custom_CSS_Text'] || '';


		ZSB_OPTION_CSS_TEXT = GENERAL_CSS_TEXT + TOP_BAR_CSS_TEXT + BOTTOM_BAR_CSS_TEXT + CUSTOM_CSS_TEXT;

	}


	function zsb_parseAppOption(ZSBAO) {

		var ZSBAO = ZSBAO || {};

		zsb_parsePathOption(ZSBAO);
		zsb_parseGeneralOption(ZSBAO);
		zsb_parseStyleOption(ZSBAO);

	}




	/* BROWSERCHECK */

	function zsb_checkBrowser() {
		var UAREGEX = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
		if ( (navigator.appName.indexOf('Microsoft Internet Explorer') >= 0) && (UAREGEX.exec(navigator.userAgent) !== null) ) {
			var IEVER = parseFloat(RegExp.$1);
			ZSB_MSIE9_LT = Boolean(IEVER < 9.0);
			ZSB_MSIE8_LT = Boolean(IEVER < 8.0);
		}
		if (ZSB_MSIE8_LT) {
			ZSB_TOP_HIDDEN = false;
			ZSB_BOTTOM_HIDDEN = false;
			$('#zsb-wrapper,#zsb-bodyspacer-top,#zsb-bodyspacer-bottom').addClass('zsb-dissapear');
		}
		var BTELM = DOC.getElementById(unescape('%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65'));
		var BTELMREF = unescape('%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72');
		var BTELMTITLE = unescape('%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D');
		var BTELMHTML = unescape('%3C%61%20%69%64%3D%22%7A%73%62%2D%62%6F%6F%74%6E%6F%64%65%22%20%68%72%65%66%3D%22%68%74%74%70%3A%2F%2F%69%6E%69%6D%75%2E%63%6F%6D%2F%77%69%64%67%65%74%2F%7A%73%74%69%63%6B%79%62%61%72%22%3E%7A%53%74%69%63%6B%79%42%61%72%20%57%69%64%67%65%74%20%62%79%20%69%6E%69%6D%75%2E%63%6F%6D%3C%2F%61%3E');

		var BTELMATTRLEN = (function(){
			var COUNT = 0;
			for (var i = 0, ATTR; ATTR = BTELM.attributes[i]; i++) {
				/*if (ZSB_MSIE9_LT) {
					if (ATTR.specified) { COUNT++; }
				} else {
					COUNT++;
				}*/
				if (typeof ATTR.specified === 'boolean') {
					if (ATTR.specified) { COUNT++; }
				} else {
					COUNT++;
				}
			}
			return COUNT;
		})();

		var WRELMID = unescape('%7A%73%62%2D%77%69%64%67%65%74%2D%72%65%66');
		ZSB_WRELM_HTML = '<div id="'+WRELMID+'"><a href="'+BTELMREF+'" target="_blank" title="'+BTELMTITLE+'"><i class="fa fa-info-circle"></i></a></div>';
		if ( (BTELM.href !== BTELMREF) || (BTELMATTRLEN !== 2) ) { DOC.getElementById('zsb-wrapper').innerHTML = ''; }
	}
	function zsb_showUpgradebox(SIMULATE) {
		var SIMULATE = Boolean(SIMULATE === true);
		if (ZSB_MSIE8_LT || SIMULATE) {
			ZSB_TOP_HIDDEN = false;
			ZSB_BOTTOM_HIDDEN = false;
			$('#zsb-wrapper,#zsb-bodyspacer-top,#zsb-bodyspacer-bottom').addClass('zsb-dissapear');
			if (ZSB_UPGRADE_SHOW || SIMULATE) {
				var UPGRADEBOX, UPGRADELINK, UPGRADECLOSE;
				var UPGRADEBOXID = 'zsb-upgrade-box';
				var UPGRADELINKID = 'zsb-upgrade-link';
				var UPGRADECLOSEID = 'zsb-upgrade-close';
				var UPGRADETITLE = 'Free download latest browser and upgrade your browser today!';
				var UPGRADETARGETWIN = '_blank';
				var UPGRADETARGETLOC = ZSB_UPGRADE_URL;
				//upgradebox
				if (! zsb_checkId(UPGRADEBOXID)) {
					UPGRADEBOX = DOC.createElement('a');
					UPGRADEBOX.id = UPGRADEBOXID;
					UPGRADEBOX.href = UPGRADETARGETLOC;
					UPGRADEBOX.title = UPGRADETITLE;
					UPGRADEBOX.target = UPGRADETARGETWIN;
					UPGRADEBOX.innerHTML = ''+
						'It looks like you are using an insecure version of Internet Explorer. '+
						'Using an outdated browser makes your computer unsafe.<br/>'+
						'For the best experience on the web, please update your browser.<br/>'+
					'';
					BODY.insertBefore(UPGRADEBOX,BODY.firstChild);
				}
				//upgradelink
				UPGRADEBOX = DOC.getElementById(UPGRADEBOXID);
				if (! zsb_checkId(UPGRADELINKID)) {
					UPGRADELINK = DOC.createElement('a');
					UPGRADELINK.id = UPGRADELINKID;
					UPGRADELINK.title = UPGRADETITLE;
					UPGRADELINK.href = UPGRADETARGETLOC;
					UPGRADELINK.target = UPGRADETARGETWIN;
					UPGRADELINK.innerHTML = 'Upgrade your browser!';
					UPGRADEBOX.appendChild(UPGRADELINK);
				}
				//upgradeclose
				if (! zsb_checkId(UPGRADECLOSE)) {
					UPGRADECLOSE = DOC.createElement('input');
					UPGRADECLOSE.id = UPGRADECLOSEID;
					UPGRADECLOSE.type = 'button';
					UPGRADECLOSE.value = 'Dismiss';
					UPGRADECLOSE.title = 'Close this message bar';
					UPGRADECLOSE.onclick = function(){ zsb_hideUpgradebox(true); return false; }
					UPGRADEBOX.appendChild(UPGRADECLOSE);
				}
			}
		}
	}
	function zsb_hideUpgradebox(REMOVE) {
		var REMOVE = Boolean(REMOVE === true);
		if (! ZSB_MSIE8_LT) {
			$('#zsb-wrapper,#zsb-bodyspacer-top,#zsb-bodyspacer-bottom').removeClass('zsb-dissapear');
		}
		if (REMOVE) {
			$('#zsb-upgrade-box').remove();
		} else {
			$('#zsb-upgrade-box').hide(0);
		}
	}
	function zsb_toggleUpgradebox() {
		if (zsb_checkId('zsb-upgrade-box')) {
			zsb_hideUpgradebox(true);
		} else {
			zsb_showUpgradebox(true);
		}
	}




	/* FOLLOWBOX */

	function zsb_setupFollowbox(){

		var FBK_BOX_HTML = '', TWT_BOX_HTML = '', GGL_BOX_HTML = '', FDB_BOX_HTML = '';

		//facebook
		if (ZSB_FACEBOOK_URL_ID) {
			var FBK_URL = 'http://www.facebook.com/'+ZSB_FACEBOOK_URL_ID+'';
			var FBK_IFR_URL = '//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F'+ZSB_FACEBOOK_URL_ID+'&amp;locale=en_US&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21';
			FBK_BOX_HTML = ''+
				'<div id="zsb-facebook-box" class="zsb-follow-item" style="display:inline-block;vertical-align:middle;">'+
					'<iframe id="zsb-facebook" src="'+FBK_IFR_URL+'" '+
						'allowTransparency="true" frameborder="0" scrolling="no" '+
						'style="border:none;overflow:hidden;width:130px;height:20px;"></iframe>'+
				'</div>'+
			'';
		}

		//twitter
		if (ZSB_TWITTER_URL_ID) {
			var TWT_URL = 'http://twitter.com/'+ZSB_TWITTER_URL_ID+'';
			var TWT_IFR_URL = '//platform.twitter.com/widgets/follow_button.html?screen_name='+ZSB_TWITTER_URL_ID+'&lang=en&show_screen_name=false';
			TWT_BOX_HTML = ''+
				'<div id="zsb-twitter-box" class="zsb-follow-item" style="display:inline-block;vertical-align:middle;">'+
					'<iframe id="zsb-twitter" src="'+TWT_IFR_URL+'" '+
						'allowtransparency="true" frameborder="0" scrolling="no" '+
						'style="overflow:hidden;border:none;width:145px;height:20px;"></iframe>'+
				'</div>'+
			'';
		}

		//google
		if (ZSB_GOOGLE_URL_ID) {
			var GGL_URL = 'https://plus.google.com/'+ZSB_GOOGLE_URL_ID+'';
			function zsbLoadGoogleScript() {
				var po = document.createElement('script');
				po.type = 'text/javascript';
				po.src = 'https://apis.google.com/js/platform.js';

				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(po, s);
			}
			GGL_BOX_HTML = ''+
				'<div id="zsb-google-box" class="zsb-follow-item" style="display:inline-block;vertical-align:middle;">'+
					'<div id="zsb-google">'+
						'<div class="g-follow" data-annotation="bubble" data-height="20" data-href="'+GGL_URL+'" data-rel="publisher"></div>'+
					'</div>'+
				'</div>'+
			'';
		}

		//feedburner
		if (ZSB_FEEDBURNER_URL_ID) {
			var FDB_URL = 'http://feeds.feedburner.com/'+ZSB_FEEDBURNER_URL_ID+'';
			var FDB_MAIL_ACTION_URL = 'https://feedburner.google.com/fb/a/mailverify';
			var FDB_MAIL_URL = ''+FDB_MAIL_ACTION_URL+'?uri='+ZSB_FEEDBURNER_URL_ID+'';
			var FDB_IMG_URL = 'http://feeds.feedburner.com/~fc/'+ZSB_FEEDBURNER_URL_ID+'?bg=CCCCCC&amp;fg=000000&amp;anim=0';
			var FDB_MAIL_WIN_NAME = 'zsb_FdbMailVerifyWin';
			var FDB_EMAIL_INIT_VAL = 'Enter email here';
			var FDB_BTN_TITLE_STR = 'Enter your email address, and then click Follow button';
			var FDB_INPUT_BDR_CLR_BLUR = '#999';
			var FDB_INPUT_BDR_CLR_FOCUS = '#4ae';
			var FDB_ENTRY_CLR_BLUR = '#888';
			var FDB_ENTRY_CLR_FOCUS = '#000';
			var FDB_ENTRY_BG_CLR_BLUR = '#fff';
			var FDB_ENTRY_BG_CLR_FOCUS = '#ffe';
			var FDB_BTN_CLR_BLUR = '#fff';
			var FDB_BTN_CLR_FOCUS = '#444';
			var FDB_BTN_BG_CLR_BLUR = '#9ab';
			var FDB_BTN_BG_CLR_FOCUS = '#bdf';
			function zsbSetFeedburnerEmailValue() {
				var EMAIL = DOC.getElementById('zsb-feedburner-email');
				if (EMAIL.value === FDB_EMAIL_INIT_VAL) {
					EMAIL.value = '';
				} else if (EMAIL.value === '') {
					EMAIL.value = FDB_EMAIL_INIT_VAL;
				}
			}
			function zsbSetFeedburnerFocusBlurStyle(TRUEFALSE) {
				var FOCUS = Boolean(TRUEFALSE);
				var BLUR = Boolean(! TRUEFALSE);
				var TABLEstl = DOC.getElementById('zsb-feedburner-table').style,
					COUNTERstl = DOC.getElementById('zsb-feedburner-counter').style,
					COUNTERBOXstl = DOC.getElementById('zsb-feedburner-counter-box').style,
					EMAILstl = DOC.getElementById('zsb-feedburner-email').style,
					EMAILBOXstl = DOC.getElementById('zsb-feedburner-email-box').style,
					SUBMITstl = DOC.getElementById('zsb-feedburner-submit').style,
					SUBMITBOXstl = DOC.getElementById('zsb-feedburner-submit-box').style;
				if (FOCUS) {
					$('#zsb-feedburner-table').toggleClass('zsb-fdb-table-blur zsb-fdb-table-focus');
					COUNTERBOXstl.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
					EMAILstl.color = FDB_ENTRY_CLR_FOCUS;
					EMAILBOXstl.backgroundColor = FDB_ENTRY_BG_CLR_FOCUS;
					EMAILBOXstl.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
					SUBMITstl.color = FDB_BTN_CLR_FOCUS;
					SUBMITBOXstl.backgroundColor = FDB_BTN_BG_CLR_FOCUS;
					SUBMITBOXstl.borderColor = FDB_INPUT_BDR_CLR_FOCUS;
				} else {
					$('#zsb-feedburner-table').toggleClass('zsb-fdb-table-focus zsb-fdb-table-blur');
					COUNTERBOXstl.borderColor = FDB_INPUT_BDR_CLR_BLUR;
					EMAILstl.color = FDB_ENTRY_CLR_BLUR;
					EMAILBOXstl.backgroundColor = FDB_ENTRY_BG_CLR_BLUR;
					EMAILBOXstl.borderColor = FDB_INPUT_BDR_CLR_BLUR;
					SUBMITstl.color = FDB_BTN_CLR_BLUR;
					SUBMITBOXstl.backgroundColor = FDB_BTN_BG_CLR_BLUR;
					SUBMITBOXstl.borderColor = FDB_INPUT_BDR_CLR_BLUR;
				}
			}
			function zsbSetFeedburnerEvent() {
				$('#zsb-feedburner-counter').on('click',function(e) {
					e.preventDefault;
					zsb_openWindow(FDB_MAIL_URL,FDB_MAIL_WIN_NAME,'width=600,height=600,resizable=yes');
					return false;
				});
				$('#zsb-feedburner-form').on('submit',function(e) {
					e.preventDefault;
					zsb_openWindow(FDB_MAIL_URL,FDB_MAIL_WIN_NAME,'width=600,height=600,resizable=yes');
					return true;
				});
				$('#zsb-feedburner-counter,#zsb-feedburner-email,#zsb-feedburner-submit').on('focus',function(e) {
					zsbSetFeedburnerFocusBlurStyle(true);
				});
				$('#zsb-feedburner-counter,#zsb-feedburner-email,#zsb-feedburner-submit').on('blur',function(e) {
					zsbSetFeedburnerFocusBlurStyle(false);
				});
				$('#zsb-feedburner-email').on('focus',function(e) {
					zsbSetFeedburnerEmailValue();
				});
				$('#zsb-feedburner-email').on('blur',function(e) {
					zsbSetFeedburnerEmailValue();
				});
			}
			FDB_BOX_HTML = ''+
				'<div id="zsb-feedburner-box" class="zsb-follow-item" style="display:inline-block;vertical-align:middle;">'+
					'<form id="zsb-feedburner-form"'+
						'target="'+FDB_MAIL_WIN_NAME+'" method="post" '+
						'action="'+FDB_MAIL_ACTION_URL+'">'+
						'<table id="zsb-feedburner-table" class="zsb-fdb-table-blur"><tbody><tr>'+
							'<td '+
								'id="zsb-feedburner-counter-box" '+
								'style="border-color:'+FDB_INPUT_BDR_CLR_BLUR+';">'+
								'<a '+
									'id="zsb-feedburner-counter" class="fb_chicklet" '+
									'href="'+FDB_MAIL_URL+'" '+
									'title="'+FDB_BTN_TITLE_STR+'" target="_blank" rel="nofollow" '+
									'style="background-image:url('+FDB_IMG_URL+') !important;">'+
								'</a>'+
							'</td>'+
							'<td '+
								'id="zsb-feedburner-email-box" '+
								'style="background-color:'+FDB_ENTRY_BG_CLR_BLUR+';border-color:'+FDB_INPUT_BDR_CLR_BLUR+';">'+
								'<input '+
									'id="zsb-feedburner-email" name="email" '+
									'type="text" value="'+FDB_EMAIL_INIT_VAL+'" '+
									'title="'+FDB_BTN_TITLE_STR+'" '+
									'style="color:'+FDB_ENTRY_CLR_BLUR+';">'+
								'<input type="hidden" name="uri" value="'+ZSB_FEEDBURNER_URL_ID+'">'+
								'<input type="hidden" name="loc" value="en_US">'+
							'</td>'+
							'<td '+
								'id="zsb-feedburner-submit-box" '+
								'style="background-color:'+FDB_BTN_BG_CLR_BLUR+';border-color:'+FDB_INPUT_BDR_CLR_BLUR+';">'+
								'<input '+
									'id="zsb-feedburner-submit" '+
									'type="submit" value="Follow" '+
									'title="'+FDB_BTN_TITLE_STR+'" '+
									'style="color:'+FDB_BTN_CLR_BLUR+';">'+
							'</td>'+
						'</tr></tbody></table>'+
					'</form>'+
				'</div>'+
			'';
		}

		//followbox
		if ((ZSB_FACEBOOK_URL_ID) || (ZSB_TWITTER_URL_ID) || (ZSB_GOOGLE_URL_ID) || (ZSB_FEEDBURNER_URL_ID)) {
			if (zsb_checkId('zsb-followbox')) {
				var FOLLOWBOX_VSPACER_HTML = '<div id="zsb-followbox-vspacer" class="zsb-followbox-vspacer" '+
						'style="display:inline-block;vertical-align:middle;"></div>';
				var FOLLOWBOX_HTML = FBK_BOX_HTML + TWT_BOX_HTML + FOLLOWBOX_VSPACER_HTML + GGL_BOX_HTML + FDB_BOX_HTML;

				var FOLLOWBOX = DOC.getElementById('zsb-followbox');
				FOLLOWBOX.style.whiteSpace = 'nowrap';
				FOLLOWBOX.innerHTML = FOLLOWBOX_HTML;
				if (ZSB_GOOGLE_URL_ID) { zsbLoadGoogleScript(); }
				if (ZSB_FEEDBURNER_URL_ID) { zsbSetFeedburnerEvent(); }
			}
		}

	}




	/* BARSETUP */

	/* INITSTYLE */
	function zsb_setClassNameInitStyle() {
		var BARclsname = 'zsb-bar';
		var CONTENTBOXclsname = 'zsb-contentbox';
		var CONTENTBOXITEMclsname = 'zsb-contentbox-item';
		var MENUBOXclsname = 'zsb-menubox';
		var MENUBOXITEMclsname = 'zsb-menubox-item';

		var INITCSSTEXT = ''+
			'.zsb-clearer,hr.zsb-clearer{height:0;margin:0;padding:0;border:none;opacity:0;}'+
			'.zsb-contentbox,ul.zsb-contentbox{margin:0;padding:0;list-style:none;}'+
			'.zsb-contentbox > li,ul.zsb-contentbox > li{vertical-align:middle;display:inline-block;}'+
			'.zsb-menubox,ul.zsb-menubox{display:none;list-style:none;}'+
		'';
		function zsbSetClass(POS) {
			$('#'+BARclsname+'-'+POS+'').addClass(''+BARclsname+'');
			$('#'+CONTENTBOXclsname+'-'+POS+'-left, #'+CONTENTBOXclsname+'-'+POS+'-right, #'+CONTENTBOXclsname+'-'+POS+'-center').addClass(''+CONTENTBOXclsname+'');
		}
		zsbSetClass('top');
		zsbSetClass('bottom');

		$('ul.'+CONTENTBOXclsname+' > li').addClass(''+CONTENTBOXITEMclsname+'');
		$('li[data-zsb-menu-hover] > ul, li[data-zsb-menu-click] > ul').addClass(''+MENUBOXclsname+'');
		$('ul.'+MENUBOXclsname+' > li:not(.zsb-menu-separator,.zsb-menu-spacer)').addClass(''+MENUBOXITEMclsname+'');

		zsb_setupCSSText(INITCSSTEXT,'zsb-init-style');

		$('.'+BARclsname+'').append('<hr class="zsb-clearer" />');
		$('.'+MENUBOXITEMclsname+'').append('<hr class="zsb-clearer" />');

		$('iframe, embed, object').css('background', 'none');
		$('iframe, embed, object').attr('allowTransparency', 'true');
	}

	/* CONTENTBOX */
	function zsb_GetMaxHeightOfElements(JQUERYSELECTOR) {
		var MAXHEIGHT = 0, ELM, ELMHEIGHT;
		for (var n = 0; ELM = $(JQUERYSELECTOR)[n]; n++) {
			ELMHEIGHT = parseInt($(ELM).height());
			if (ELMHEIGHT > MAXHEIGHT) {
				MAXHEIGHT = ELMHEIGHT;
			}
		}
		return MAXHEIGHT;
	}
	function zsb_setContentboxSize(CHECKCHILDREN) {
		var CHECKCHILDREN = Boolean(CHECKCHILDREN === true);
		var CONTENTBOXclsname = 'zsb-contentbox';
		var CONTENTBOXVSPACERclsname = ''+CONTENTBOXclsname+'-vspacer';
		var CONTENTBOXFILLERclsname = ''+CONTENTBOXclsname+'-filler';
		var SIDES = [ 'left', 'right','center' ];
		function zsbSetCtbSize(POS) {
			var CONTENTBOXobj, CONTENTBOXVSPACERobj, CONTENTBOXFILLERobj;
			var leftCONTENTBOXobj = $('#'+CONTENTBOXclsname+'-'+POS+'-left');
			var leftCONTENTBOXVSPACERobj = $('#'+CONTENTBOXVSPACERclsname+'-'+POS+'-left');
			var leftCONTENTBOXFILLERobj = $('#'+CONTENTBOXFILLERclsname+'-'+POS+'-left');
			var rightCONTENTBOXobj = $('#'+CONTENTBOXclsname+'-'+POS+'-right');
			var rightCONTENTBOXVSPACERobj = $('#'+CONTENTBOXVSPACERclsname+'-'+POS+'-right');
			var rightCONTENTBOXFILLERobj = $('#'+CONTENTBOXFILLERclsname+'-'+POS+'-right');
			var centerCONTENTBOXobj = $('#'+CONTENTBOXclsname+'-'+POS+'-center');
			var centerCONTENTBOXVSPACERobj = $('#'+CONTENTBOXVSPACERclsname+'-'+POS+'-center');
			var centerCONTENTBOXFILLERobj = $('#'+CONTENTBOXFILLERclsname+'-'+POS+'-center');
			function zsbGetMaxElmHeight() {
				var MAXHEIGHT = 0, ELM, ELMHEIGHT;
				for (var i = 0, SIDE; SIDE = SIDES[i]; i++) {
					for (var n = 0; ELM = $('#'+CONTENTBOXclsname+'-'+POS+'-'+SIDE+' > li')[n]; n++) {
						ELMHEIGHT = parseInt($(ELM).height());
						if (ELMHEIGHT > MAXHEIGHT) {
							MAXHEIGHT = ELMHEIGHT;
						}
					}
				}
				return MAXHEIGHT;
			}
			//normalize
			//left
			leftCONTENTBOXobj.css('height','auto');
			leftCONTENTBOXVSPACERobj.css('height','auto');
			leftCONTENTBOXFILLERobj.css('width','auto');
			leftCONTENTBOXFILLERobj.css('height','auto');
			//right
			rightCONTENTBOXobj.css('height','auto');
			rightCONTENTBOXVSPACERobj.css('height','auto');
			rightCONTENTBOXFILLERobj.css('width','auto');
			rightCONTENTBOXFILLERobj.css('height','auto');
			//center
			centerCONTENTBOXobj.css('width','auto');
			centerCONTENTBOXobj.css('height','auto');
			centerCONTENTBOXobj.css('left','auto');
			centerCONTENTBOXobj.css('right','auto');
			centerCONTENTBOXVSPACERobj.css('height','auto');
			centerCONTENTBOXFILLERobj.css('width','auto');
			centerCONTENTBOXFILLERobj.css('height','auto');
			//computedsize
			var leftCONTENTBOXheight = leftCONTENTBOXobj.height();
			var rightCONTENTBOXheight = rightCONTENTBOXobj.height();
			var centerCONTENTBOXheight = centerCONTENTBOXobj.height();
			var centerCONTENTBOXwidth = centerCONTENTBOXobj.width();
			//maxheight
			var maxCONTENTBOXheight = (CHECKCHILDREN) ?
				zsb_GetMaxHeightOfElements('#zsb-bar-'+POS+' ul.'+CONTENTBOXclsname+' > li') :
				Math.max(leftCONTENTBOXheight,rightCONTENTBOXheight,centerCONTENTBOXheight);
			//setsize
			if (maxCONTENTBOXheight === 0) {
				leftCONTENTBOXobj.css('display','none');
				rightCONTENTBOXobj.css('display','none');
				centerCONTENTBOXobj.css('display','none');
			} else {
				//contentbox(center)
				centerCONTENTBOXobj.css('width',centerCONTENTBOXwidth+'px');
				centerCONTENTBOXobj.css('left','0');
				centerCONTENTBOXobj.css('right','0');
				for (var i = 0, SIDE; SIDE = SIDES[i]; i++) {
					CONTENTBOXobj = $('#'+CONTENTBOXclsname+'-'+POS+'-'+SIDE+'');
					//vspacer
					CONTENTBOXVSPACERobj = $('#'+CONTENTBOXVSPACERclsname+'-'+POS+'-'+SIDE+'');
					CONTENTBOXVSPACERobj.css('height',maxCONTENTBOXheight+'px');
					//filler
					CONTENTBOXFILLERobj = $('#'+CONTENTBOXFILLERclsname+'-'+POS+'-'+SIDE+'');
					CONTENTBOXFILLERobj.css('width',CONTENTBOXobj.outerWidth()+'px');
					CONTENTBOXFILLERobj.css('height',CONTENTBOXobj.outerHeight()+'px');
				}
			}
		}
		zsbSetCtbSize('top');
		zsbSetCtbSize('bottom');
	}
	function zsb_setupContentbox() {
		var CONTENTBOXclsname = 'zsb-contentbox';
		var CONTENTBOXVSPACERclsname = ''+CONTENTBOXclsname+'-vspacer';
		var CONTENTBOXFILLERclsname = ''+CONTENTBOXclsname+'-filler';
		var SIDES = [ 'left', 'right', 'center' ];
		function zsbSetupCtb(POS) {
			var CONTENTBOX, CONTENTBOXVSPACER, CONTENTBOXFILLER;
			var WSREGEX = new RegExp('\S');
			for (var i = 0, SIDE; SIDE = SIDES[i]; i++) {
				CONTENTBOX = DOC.getElementById(''+CONTENTBOXclsname+'-'+POS+'-'+SIDE+'');
				$(CONTENTBOX).contents().filter(function() {
					return (this.nodeType === 3 && !WSREGEX.test(this.nodeValue));
				}).remove();
				//vspacer
				CONTENTBOXVSPACER = DOC.createElement('div');
				CONTENTBOXVSPACER.id = ''+CONTENTBOXVSPACERclsname+'-'+POS+'-'+SIDE+'';
				CONTENTBOXVSPACER.className = ''+CONTENTBOXVSPACERclsname+'';
				CONTENTBOX.appendChild(CONTENTBOXVSPACER);
				//filler
				CONTENTBOXFILLER = DOC.createElement('div');
				CONTENTBOXFILLER.id = ''+CONTENTBOXFILLERclsname+'-'+POS+'-'+SIDE+'';
				CONTENTBOXFILLER.className = ''+CONTENTBOXFILLERclsname+'';
				CONTENTBOX.insertBefore(CONTENTBOXFILLER,CONTENTBOX.firstChild);
			}
			$('.'+CONTENTBOXclsname+' li .zsb-item-base').parent(':not(.zsb-menubox)').css('position','relative');
		}
		zsbSetupCtb('top');
		zsbSetupCtb('bottom');
	}

	/* MENU */
	function zsb_setupContentboxMenuboxMenu() {
		$('#zsb-bar-top li[data-zsb-menu-hover] > a, #zsb-bar-top li[data-zsb-menu-click] > a').append(' <i class="fa fa-caret-down"></i>');
		$('#zsb-bar-bottom li[data-zsb-menu-hover] > a, #zsb-bar-bottom li[data-zsb-menu-click] > a').append(' <i class="fa fa-caret-up"></i>');
		$('li[data-zsb-menu-click] > a').attr('data-zsb-menubox-toggle','');
		$('.zsb-menubox').prepend('<div class="zsb-menubox-base"></div>');
		$('.zsb-menu-popover').prepend('<div class="zsb-menu-popover-filler"></div>');
		for (var t = 0, TM; TM = $('.zsb-menu-table')[t]; t++) {
			for (var r = 0, TR; TR = TM.getElementsByTagName('tr')[r]; r++) {
				if (TR.getElementsByTagName('td').length >= 2) {
					var TDL = TR.getElementsByTagName('td').length;
					var LASTTD = TR.getElementsByTagName('td')[TDL-1];
					if (! LASTTD.style.textAlign) {
						LASTTD.style.textAlign = 'right';
					}
					var TDWIDTH = 100/TDL;
					for (var d = 0, TD; TD = TR.getElementsByTagName('td')[d]; d++) {
						if (! TD.style.width) {
							TD.style.width = TDWIDTH+'%';
						}
					}
				}
			}
		}
	}

	/* BAR */
	function zsb_setBodySpacerBarBaseSize(CHECKCHILDREN) {
		var CHECKCHILDREN = Boolean(CHECKCHILDREN === true);
		var BAR, BARBASE, BODYSPACER, BARHEIGHT;
		function zsbSetBsBbSize(POS) {
			BAR = DOC.getElementById('zsb-bar-'+POS+'');
			BARHEIGHT = BAR.offsetHeight;
			BARHEIGHT = (CHECKCHILDREN) ?
				zsb_GetMaxHeightOfElements('#zsb-bar-'+POS+' ul.zsb-contentbox') :
				$(BAR).height();
			//barbase
			BARBASE = DOC.getElementById('zsb-bar-base-'+POS+'');
			BARBASE.style.height = BARHEIGHT+'px';
			//bodyspacer
			if (zsb_checkId('zsb-bodyspacer-'+POS+'')) {
				BODYSPACER = DOC.getElementById('zsb-bodyspacer-'+POS+'');
				if ( ((POS === 'top') && (ZSB_TOP_RESERVED)) || ((POS === 'bottom') && (ZSB_BOTTOM_RESERVED)) ) {
					BODYSPACER.style.height = BARHEIGHT+'px';
				} else {
					BODYSPACER.style.height = 0;
					BODYSPACER.style.border = 0;
				}
			}
		}
		zsbSetBsBbSize('top');
		zsbSetBsBbSize('bottom');
	}
	function zsb_setupBodySpacerBarBaseBarFiller() {
		var BAR, BODYSPACER, BARBASE, BARFILLER;
		function zsbSetupBsBbBf(POS) {
			BAR = DOC.getElementById('zsb-bar-'+POS+'');
			//bodyspacer
			BODYSPACER = DOC.createElement('div');
			BODYSPACER.id = 'zsb-bodyspacer-'+POS+'';
			if ( (POS === 'top') && (ZSB_TOP_RESERVED) ) {
				BODY.insertBefore(BODYSPACER,BODY.firstChild);
			} else if ( (POS === 'bottom')  && (ZSB_BOTTOM_RESERVED) ) {
				BODY.appendChild(BODYSPACER);
			}
			//barbase
			BARBASE = DOC.createElement('div');
			BARBASE.id = 'zsb-bar-base-'+POS+'';
			if (POS === 'top') {
				if (ZSB_TOP_FULLWIDTH) {
					BARBASE.style.borderWidth = '0 0 1px 0';
				} else {
					BARBASE.style.borderWidth = '0 1px 1px 1px';
				}
			} else if (POS === 'bottom') {
				if (ZSB_BOTTOM_FULLWIDTH) {
					BARBASE.style.borderWidth = '1px 0 0 0';
				} else {
					BARBASE.style.borderWidth = '1px 1px 0 1px';
				}
			}
			DOC.getElementById('zsb-wrapper').insertBefore(BARBASE,BAR);
			//barfiller
			BARFILLER = DOC.createElement('div');
			BARFILLER.id = 'zsb-bar-filler-'+POS+'';
			BAR.insertBefore(BARFILLER,BAR.firstChild);
		}
		zsbSetupBsBbBf('top');
		zsbSetupBsBbBf('bottom');
	}

	function zsb_setupBarButton() {
		var BarBtnHIDEclsname = 'zsb-bar-button-hide';
		var BarBtnSHOWclsname = 'zsb-bar-button-show';
		var BarBtnHIDE, BarBtnSHOW;
		function zsbSetupBarBtn(POS) {
			$('#zsb-bar-'+POS+' a[data-zsb-bar-hide]').each(function() {
				//barbtnhide
				$(this).addClass(''+BarBtnHIDEclsname+' zsb-close-button');
				$(this).prop('title','Hide '+POS+' bar');
				//barbtnshow
				if (! zsb_checkId(''+BarBtnSHOWclsname+'-'+POS+'')) {
					BarBtnSHOW = DOC.createElement('div');
					BarBtnSHOW.id = ''+BarBtnSHOWclsname+'-'+POS+'';
					BarBtnSHOW.className = ''+BarBtnSHOWclsname+'';
					BarBtnSHOW.title = 'Show '+POS+' bar';
					BarBtnSHOW.style.display = 'none';

					var CONTAINER = DOC.getElementById('zsb-wrapper');
					CONTAINER.insertBefore(BarBtnSHOW,CONTAINER.firstChild);
				}
			});
		}
		zsbSetupBarBtn('top');
		zsbSetupBarBtn('bottom');
		$('#'+BarBtnHIDEclsname+'-top, #'+BarBtnHIDEclsname+'-bottom, .zsb-close-button').prepend('<i class="fa fa-times-circle"></i>');
		$('#'+BarBtnSHOWclsname+'-top').prepend('<i class="fa fa-chevron-down"></i>');
		$('#'+BarBtnSHOWclsname+'-bottom').prepend('<i class="fa fa-chevron-up"></i>');
	}

	/* WRAPPER */
	function zsb_showWrapper() {
		var WRAPPERstl = DOC.getElementById('zsb-wrapper').style;
		WRAPPERstl.display = 'block';
		WRAPPERstl.visibility = 'visible';
		WRAPPERstl.position = 'static';
		WRAPPERstl.opacity = '1.0';
	}

	/* SCROLLBOX */
	function zsb_setupScrollbox() {
		var SCROLLBOX_HTML = ''+
			'<div id="zsb-scroll-button-box">'+
				'<div id="zsb-scroll-button-top"><i class="fa fa-chevron-circle-up"></i></div>'+
				''+ZSB_WRELM_HTML+''+
				'<div id="zsb-scroll-button-bottom"><i class="fa fa-chevron-circle-down"></i></div>'+
			'</div>'+
		'';

		var SCROLLBOX = DOC.createElement('div');
		SCROLLBOX.id = 'zsb-scrollbox';
		SCROLLBOX.innerHTML = SCROLLBOX_HTML;

		var CONTAINER = DOC.getElementById('zsb-wrapper');
		CONTAINER.insertBefore(SCROLLBOX,CONTAINER.firstChild);
	}

	/* LINKTITLE */
	function zsb_setLinkTitle() {
		$('#zsb-wrapper a[data-zsb-menubox-toggle]').each(function(){
			var TOGGLETITLE = $(this).prop('title') || '';
			if (! TOGGLETITLE) {
				$(this).prop('title','Click to open/close menu box');
			}
		});
		$('#zsb-bar-top a, #zsb-bar-bottom a').each(function () {
			var TITLE = $(this).prop('title') || '';
			if (! TITLE) {
				if ( ($(this).hasClass('fa-home')) || ($(this).children().hasClass('fa-home')) ) {
					$(this).prop('title','Home page');
				} else {
					var TEXT = $(this).contents().filter(function(){
						return this.nodeType === 3;
					}).text();
					$(this).prop('title',TEXT);
				}
			}
		});
	}




	/* EVENTBIND */

	/* MENUPOP */
	function zsb_setEventMenuItem(){

		$('#zsb-wrapper li[data-zsb-menu-hover]').hoverIntent(function() {
			$(this).find('.zsb-menubox').slideToggle('fast');
		},function() {
			$(this).find('.zsb-menubox').slideToggle('fast');
		});

		$('#zsb-wrapper a[data-zsb-menubox-toggle]').on('click',function() {
			$(this).closest('li[data-zsb-menu-click]').find('.zsb-menubox').slideToggle('fast');
		});
		$('#zsb-wrapper li[data-zsb-menu-click] > a[data-zsb-menubox-toggle]').on('click',function() {
			if ($(this).hasClass('zsb-contentbox-item-on')) {
				$(this).removeClass('zsb-contentbox-item-on');
			} else {
				$(this).addClass('zsb-contentbox-item-on');
			}
		});
		$('#zsb-wrapper ul.zsb-menubox a[data-zsb-menubox-toggle]').on('click',function() {
			$(this).closest('li[data-zsb-menu-click]').find('a[data-zsb-menubox-toggle]').removeClass('zsb-contentbox-item-on');
		});

		$('#zsb-bar-top li[data-zsb-menu-click]').on('clickoutside',function(e){
			if (! $(this).data('zsbMenuClick')) {
				$(this).find('a[data-zsb-menubox-toggle]').removeClass('zsb-contentbox-item-on');
				$(this).find('.zsb-menubox').slideUp('fast');
			}
		});
		$('#zsb-bar-bottom li[data-zsb-menu-click]').on('clickoutside',function(e){
			if (! $(this).data('zsbMenuClick')) {
				$(this).find('a[data-zsb-menubox-toggle]').removeClass('zsb-contentbox-item-on');
				$(this).find('.zsb-menubox').slideDown('fast');
			}
		});

	}

	/* SCROLL */
	function zsb_scrollToTop(){
		$(function($) {
			$('html,body').animate({scrollTop:0},1000);
		});
	}
	function zsb_scrollToBottom(){
		$(function($) {
			$('html,body').animate({scrollTop:$(document).height()-$(window).height()},1000);
		});
	}
	function zsb_setEventScroll(){
		$('#zsb-bar-base-top, #zsb-bar-filler-top, #zsb-bar-top .zsb-contentbox-filler, #zsb-scroll-button-top').prop('title', 'Scroll to top');
		$('#zsb-bar-base-top, #zsb-bar-filler-top, #zsb-bar-top .zsb-contentbox-filler, #zsb-scroll-button-top').on('click', function() {
			zsb_scrollToTop();
		});
		$('#zsb-bar-base-bottom, #zsb-bar-filler-bottom, #zsb-bar-bottom .zsb-contentbox-filler, #zsb-scroll-button-bottom').prop('title', 'Scroll to bottom');
		$('#zsb-bar-base-bottom, #zsb-bar-filler-bottom, #zsb-bar-bottom .zsb-contentbox-filler, #zsb-scroll-button-bottom').on('click', function() {
			zsb_scrollToBottom();
		});
		$('#zsb-scrollbox').hover(function() {
			$(this).stop().animate({'opacity':1});
		},function() {
			$(this).stop().animate({'opacity':0.5});
		});
		$('#zsb-scrollbox').hoverIntent(function() {
			$('#zsb-widget-ref').animate({'width':'toggle'});
		},function() {
			$('#zsb-widget-ref').animate({'width':'toggle'});
		});
	}

	/* SHOWHIDEBAR */
	function zsb_showTopBottomBar() {
		var BAR, BARBASE, BODYSPACER;
		function zsbShowBar(POS) {
			BAR = DOC.getElementById('zsb-bar-'+POS+'');
			BARBASE = DOC.getElementById('zsb-bar-base-'+POS+'');
			if (BAR.offsetHeight === 0) {
				BAR.style.height = 0; BAR.style.display = 'none';
				BARBASE.style.height = 0; BARBASE.style.display = 'none';
				if (zsb_checkId('zsb-bodyspacer-'+POS+'')) {
					BODYSPACER = DOC.getElementById('zsb-bodyspacer-'+POS+'');
					BODYSPACER.style.height = 0; BODYSPACER.style.display = 'none';
				}
			} else {
				BAR.style.visibility = 'visible';
				BAR.style.zIndex = '1000000';
			}
		}
		zsbShowBar('top');
		zsbShowBar('bottom');
	}
	function zsb_setEventBarButton(){
		function zsbSetEvBarBtn(POS){
			//barbtnhide
			$('#zsb-bar-'+POS+' a[data-zsb-bar-hide]').on('click',function() {
				zsb_toggleShowHideBar(''+POS+'');
			});

			//barbtnshow
			$('#zsb-bar-button-show-'+POS+'').on('click',function() {
				zsb_toggleShowHideBar(''+POS+'');
			});
			$('#zsb-bar-button-show-'+POS+'').hover(function() {
				$(this).stop().animate({'opacity':1});
			},function() {
				$(this).stop().animate({'opacity':0.5});
			});
		}
		zsbSetEvBarBtn('top');
		zsbSetEvBarBtn('bottom');
	}
	function zsb_toggleShowHideBar(POS,SHOWHIDE) {
		var SHOWHIDE = SHOWHIDE || '';
		var BARsel = '#zsb-bodyspacer-'+POS+', #zsb-bar-base-'+POS+', #zsb-bar-'+POS+'';
		var barBUTTONSHOWsel = '#zsb-bar-button-show-'+POS+'';
		if (SHOWHIDE === 'hide') {
			$(BARsel).animate({'height':'hide'});
			$(barBUTTONSHOWsel).show(0);
		} else if (SHOWHIDE === 'show') {
			$(BARsel).animate({'height':'show'});
			$(barBUTTONSHOWsel).hide(0);
		} else {
			$(BARsel).animate({'height':'toggle'});
			$(barBUTTONSHOWsel).toggle(0);
		}
	}
	function zsb_checkDefaultHiddenBar() {
		if (ZSB_TOP_HIDDEN) {
			setTimeout(function(){
				zsb_toggleShowHideBar('top','hide');
			}, 3000);
		}
		if (ZSB_BOTTOM_HIDDEN) {
			setTimeout(function(){
				zsb_toggleShowHideBar('bottom','hide');
			}, 3000);
		}
	}

	/* WINDOWRESIZE */
	function zsb_setEventWindowResize() {
		$(window).resize(function() {
			zsb_setBodySpacerBarBaseSize();
		});
	}

	/* WINDOWOPEN */
	function zsb_setEventOpenWindow() {
		var TARGETVAL, HREFVAL, ARGVAL, ARGS, URL, NAME, OPT, CONTENT, TITLE;
		$('*[data-zsb-win-open]').on('click',function(e){
			e.preventDefault();
			TARGETVAL = $(this).attr('target') || '';
			HREFVAL = $(this).attr('href') || '';
			ARGVAL = $(this).data('zsbWinOpen') || '';
			ARGS = ARGVAL.split('|') || [];
			if (ARGS.length >= 1) {
				URL = ARGS[0] || HREFVAL || '';
				NAME = ARGS[1] || TARGETVAL || '';
				OPT = ARGS[2] || '';
				CONTENT = ARGS[3] || '';
				TITLE = ARGS[4] || '';
				if (URL) { URL = zsb_DeleteEdgeQuotes(URL); if (URL === 'this.href') { URL = HREFVAL; } else if (URL === 'about:blank') { URL = ''; } }
				if (NAME) { NAME = zsb_DeleteEdgeQuotes(NAME); if (NAME === '_blank') { NAME = ''; } }
				if (OPT) { OPT = zsb_DeleteEdgeQuotes(OPT); }
				if (CONTENT) { CONTENT = zsb_DeleteEdgeQuotes(CONTENT); CONTENT = unescape(CONTENT); URL = ''; }
				if (TITLE) { TITLE = zsb_DeleteEdgeQuotes(TITLE); TITLE = unescape(TITLE); }
			} else {
				URL = ''; NAME = ''; OPT = ''; CONTENT = ''; TITLE = '';
			}
			zsb_openWindow(URL,NAME,OPT,CONTENT,TITLE);
			return false;
		});
	}

	/* ELEMENTHTML */
	function zsb_setupElementHTML() {
		var ARGVAL, ARGS, CONTENT, REMOVE;
		$('*[data-zsb-html-insert]').each(function() {
			ARGVAL = $(this).attr('data-zsb-html-insert') || '';
			ARGS = ARGVAL.split(',') || [];
			if (ARGS.length < 1) { return; }
			CONTENT = ARGS[0] || '';
			REMOVE = ARGS[1] || '';
			if (CONTENT) {
				CONTENT = zsb_DeleteEdgeQuotes(CONTENT);
				REMOVE = zsb_DeleteEdgeQuotes(REMOVE);
				REMOVE = Boolean(REMOVE === true || REMOVE === 'true' || REMOVE === 'yes');
				zsb_insertHTML($(this)[0],CONTENT,REMOVE)
			}
		});
	}




	/* EXECUTE */

	function zsb_render(ZSBAO) {

		var ZSBAO = ZSBAO || {};

		zsb_parseStyleOption(ZSBAO);
		if (zsb_checkId('zsb-style-option')) { $('#zsb-style-option').remove(); }
		zsb_setupCSSText(ZSB_OPTION_CSS_TEXT,'zsb-style-option');

	}


	function zsb_start(ZSBAO) {

		if (ZSB_APP_STARTED) { return; }

		var ZSBAO = ZSBAO || {};

		zsb_parseAppOption(ZSBAO);

		zsb_checkBrowser();

		if (! zsb_checkId('zsb-style')) { return; }

		zsb_setupCSSText(ZSB_OPTION_CSS_TEXT,'zsb-style-option');
		zsb_setupFollowbox();
		zsb_setupScrollbox();
		$('#zsb-followbox,#zsb-scrollbox').addClass('zsb-transparent');

		function zsbRunOnDOMReady() {
			zsb_setupElementHTML();
			zsb_setupContentboxMenuboxMenu();
			zsb_setupBarButton();
			zsb_showWrapper();
		}
		function zsbRunLatelyAfterDOMReady() {
			$('#zsb-followbox,#zsb-scrollbox').removeClass('zsb-transparent');
			zsb_setupContentbox();
			zsb_setContentboxSize(true);
			zsb_setupBodySpacerBarBaseBarFiller();
			//zsb_setBodySpacerBarBaseSize(true);
			$('#zsb-bar-top').addClass('zsb-bar-top-temp');
			$('#zsb-bar-bottom').addClass('zsb-bar-bottom-temp');
			zsb_setLinkTitle();
			zsb_setEventBarButton();
			zsb_setEventScroll();
			zsb_setEventMenuItem();
			zsb_setEventWindowResize();
			zsb_setEventOpenWindow();
			zsb_showTopBottomBar();
		}
		function zsbRunWhenPageLoaded() {
			$('#zsb-bar-top').removeClass('zsb-bar-top-temp');
			$('#zsb-bar-bottom').removeClass('zsb-bar-bottom-temp');
			zsb_setContentboxSize();
			zsb_setBodySpacerBarBaseSize();
			zsb_checkDefaultHiddenBar();
			zsb_showUpgradebox();
		}

		if (ZSB_WAIT_PAGE) {
			$(document).ready(function() {
				zsbRunOnDOMReady();
			});
			$(window).load(function() {
				zsbRunLatelyAfterDOMReady();
				zsbRunWhenPageLoaded();
			});
		} else {
			$(document).ready(function() {
				zsbRunOnDOMReady();
				zsbRunLatelyAfterDOMReady();
			});
			$(window).load(function() {
				zsbRunWhenPageLoaded();
			});
		}

		ZSB_APP_STARTED = true;

	}


	function zsb_init() {

		if (ZSB_APP_INITIALIZED) { return; }

		zsb_setClassNameInitStyle();

		try { var ZSBAO = zsb_App_Options; } catch(e) { var ZSBAO = {}; }
		zsb_parsePathOption(ZSBAO);
		if (! zsb_checkId('zsb-style-fa')) { zsb_setupCSSLink('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css','zsb-style-fa'); }
		if (! zsb_checkId('zsb-style-ubuntu')) { zsb_setupCSSLink('//fonts.googleapis.com/css?family=Ubuntu','zsb-style-ubuntu'); }
		if (! zsb_checkId('zsb-style')) { zsb_setupCSSLink(ZSB_APP_CSS_FILE,'zsb-style'); }

		ZSB_APP_INITIALIZED = true;

	}




	/* PUBLIC */

	return {

		getId: zsb_getId,
		checkId: zsb_checkId,
		checkElement: zsb_checkElement,

		setupCSSLink: zsb_setupCSSLink,
		setupCSSText: zsb_setupCSSText,

		insertHTML: zsb_insertHTML,
		openWindow: zsb_openWindow,

		showUpgradebox: zsb_showUpgradebox,
		hideUpgradebox: zsb_hideUpgradebox,
		toggleUpgradebox: zsb_toggleUpgradebox,

		render: zsb_render,
		start: zsb_start,
		init: zsb_init,

		ZZ:true
	};




})(zsb$);







/* *****************************************************************
 * EXECUTION *
 * *****************************************************************/

var zSB = zSB || zStickyBar;

var zsb = zsb || zStickyBar;

(function () {

	var ELS = [];
	for (var i = 0, EL; EL = document.getElementsByTagName('*')[i]; i++) {
		if (EL.id === 'zsb-wrapper') {
			ELS.push(EL);
		}
	}
	if (ELS.length > 1) {
		for (var n = 1, WR; WR = ELS[n]; n++) {
			zsb$(WR).remove();
		}
	}

	if (zStickyBar.executed) { return; }

	zStickyBar.init();

	var cID = zStickyBar.checkId;

	var ZSBAO = {};

	if (
		cID('zsb-wrapper') &&
		cID('zsb-bar-top') &&
		cID('zsb-bar-bottom') &&
		cID('zsb-contentbox-top-left') &&
		cID('zsb-contentbox-top-center') &&
		cID('zsb-contentbox-top-right') &&
		cID('zsb-contentbox-bottom-left') &&
		cID('zsb-contentbox-bottom-center') &&
		cID('zsb-contentbox-bottom-right') &&
		cID('zsb-bootnode')
		) {
		try { ZSBAO = zsb_App_Options; } catch(e) { }
		zStickyBar.start(ZSBAO);
		zStickyBar.executed = true;
	}

})();

