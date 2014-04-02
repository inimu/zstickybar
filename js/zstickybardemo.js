var ZSBD_HEADBOX = document.getElementById('zsbd-header');
var ZSBD_LEFTBOX = document.getElementById('zsbd-left-sidebar');
var ZSBD_CONTENTBOX = document.getElementById('zsbd-content');
var ZSBD_RIGHTBOX = document.getElementById('zsbd-right-sidebar');
var ZSBD_FOOTBOX = document.getElementById('zsbd-footer');

var ZSBD_PAGESRC_BOX = document.getElementById('zsbd-pagesource-box');
var ZSBD_PAGESRC_BOX_LEFT = document.getElementById('zsbd-pagesource-box-left');
var ZSBD_PAGESRC_BOX_RIGHT = document.getElementById('zsbd-pagesource-box-right');

var ZSBD_PAGESRC_BOX_ORIGHTML = ZSBD_PAGESRC_BOX.innerHTML;
var ZSBD_PAGESRC_BOX_LEFT_ORIGHTML = ZSBD_PAGESRC_BOX_LEFT.innerHTML;
var ZSBD_PAGESRC_BOX_RIGHT_ORIGHTML = ZSBD_PAGESRC_BOX_LEFT.innerHTML;

var ZSBD_SOURCE_LITERAL_CHARS = ['<', '>', '\t', '\n'];
var ZSBD_SOURCE_HTML_ENTITIES = ['&lt;', '&gt;', '&nbsp;&nbsp;&nbsp;', '<br/>'];



String.prototype.zsbd_StringReplacer = function(OLD_STR_ARRAY,NEW_STR_ARRAY) {
	var REPLACESTRING = this;
	var REGEX;
	for (var i = 0; i < OLD_STR_ARRAY.length; i++) {
		REGEX = new RegExp(OLD_STR_ARRAY[i], 'g');
		REPLACESTRING = REPLACESTRING.replace(REGEX, NEW_STR_ARRAY[i]);
	}
	return REPLACESTRING;
}

function zsbd_PageSrcOrigWinOpen() {
	var URL = window.location.href;
	var SRCWIN = window.open('view-source:'+URL,'','width=960,height=600,scrollbars=yes,resizable=yes');
}

function zsbd_HeaderFooterContentSetup() {
	var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
	var DATE = new Date();
	var YEAR = DATE.getFullYear();
	ZSBD_HEADBOX.innerHTML = '<span id='+Q+'zsbd-header-content'+Q+'><a href='+Q+''+location.protocol+'//'+location.hostname+''+Q+'>'+location.hostname.toUpperCase()+'</a></span><hr/><p>'+document.title+'</p>';
	ZSBD_FOOTBOX.innerHTML = '<span id='+Q+'zsbd-footer-content'+Q+'><p>'+document.title+' on '+location.hostname+'</p><p>&copy;'+YEAR+' <a href='+Q+'http://inimu.com'+Q+'>inimu.com</a></p></span>';
}

function zsbd_PageSrcContentSetup() {
	var RAW = document.documentElement.outerHTML;
	var CODE = RAW.zsbd_StringReplacer(ZSBD_SOURCE_LITERAL_CHARS, ZSBD_SOURCE_HTML_ENTITIES);
	ZSBD_PAGESRC_BOX.innerHTML = CODE+'\n';
	ZSBD_PAGESRC_BOX_LEFT.innerHTML = CODE+'\n';
	ZSBD_PAGESRC_BOX_RIGHT.innerHTML = CODE+'\n';
}
function zsbd_PageSrcContentLoad() {
	try { clearTimeout(ZSBD_PAGESRC_CONTENT_TIMER); } catch (ZFBD_ERR) { }
	ZSBD_PAGESRC_BOX.innerHTML = ZSBD_PAGESRC_BOX_ORIGHTML;
	ZSBD_PAGESRC_BOX_LEFT.innerHTML = ZSBD_PAGESRC_BOX_LEFT_ORIGHTML;
	ZSBD_PAGESRC_BOX_RIGHT.innerHTML = ZSBD_PAGESRC_BOX_RIGHT_ORIGHTML;
	zsbd_PageSrcContentSetup();
}

function zsbd_zStickyBarCodeBoxSetup() {
	var ZSBD_ZSTICKYBAR_CODE_BOX = document.getElementById('zsbd-zstickybar-code-box');
	var ZSBD_ZSTICKYBAR_WIDGET = document.getElementById('zsbd-zstickybar-widget');
	var RAW = zoio_InnerHTML(ZSBD_ZSTICKYBAR_WIDGET);
	var CODE = RAW.zsbd_StringReplacer(ZSBD_SOURCE_LITERAL_CHARS, ZSBD_SOURCE_HTML_ENTITIES);
	ZSBD_ZSTICKYBAR_CODE_BOX.innerHTML = CODE+'\n';
}

zsbd_HeaderFooterContentSetup();

zsbd_zStickyBarCodeBoxSetup();

ztse_TextSelectOnClickByTagName('pre');
ztse_TextSelectOnClickByTagName('textarea');

/* var ZSBD_PAGESRC_CONTENT_TIMER = setTimeout(function(){zsbd_PageSrcContentSetup()},5000); */

