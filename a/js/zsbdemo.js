/*!
 * zsbDemo 1.0 (2014.04)
 * Copyright (C) 2014 - Zon Saja - zonsaja@gmail.com - http://inimu.com
 * License: CC-BY-SA 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 */

var zsbDemo = (function() {

	var HEADBOX = document.getElementById('zsbd-header');
	var LEFTBOX = document.getElementById('zsbd-left-sidebar');
	var CONTENTBOX = document.getElementById('zsbd-content');
	var RIGHTBOX = document.getElementById('zsbd-right-sidebar');
	var FOOTBOX = document.getElementById('zsbd-footer');

	var PAGESOURCEBOX = document.getElementById('zsbd-pagesource-box');
	var PAGESOURCEBOX_LEFT = document.getElementById('zsbd-pagesource-box-left');
	var PAGESOURCEBOX_RIGHT = document.getElementById('zsbd-pagesource-box-right');

	var PAGESOURCEBOX_ORIGHTML = PAGESOURCEBOX.innerHTML;
	var PAGESOURCEBOX_LEFT_ORIGHTML = PAGESOURCEBOX_LEFT.innerHTML;
	var PAGESOURCEBOX_RIGHT_ORIGHTML = PAGESOURCEBOX_LEFT.innerHTML;

	var LITERALCHARS = ['<', '>', '\t'];
	var HTMLCHARS = ['&lt;', '&gt;', '&nbsp;&nbsp;&nbsp;'];


	String.prototype.zsbd_replaceString = function(OLD_STR_ARRAY, NEW_STR_ARRAY) {
		var THESTRING = this;
		var REGEX;
		for (var i = 0, OSAL = OLD_STR_ARRAY.length; i < OSAL; i++) {
			REGEX = new RegExp(OLD_STR_ARRAY[i], 'g');
			THESTRING = THESTRING.replace(REGEX, NEW_STR_ARRAY[i]);
		}
		return THESTRING;
	}

	function zsbd_openOrigPageSourceWindow() {
		var URL = window.location.href;
		var SRCWIN = window.open('view-source:'+URL,'','width=960,height=600,scrollbars=yes,resizable=yes');
	}

	function zsbd_setupHeaderFooterContent() {
		var L = unescape('%3C'), G = unescape('%3E'), Q = unescape('%22'), S = unescape('%27');
		var DATE = new Date();
		var YEAR = DATE.getFullYear();
		HEADBOX.innerHTML = '<span id='+Q+'zsbd-header-content'+Q+'><a href='+Q+''+location.protocol+'//'+location.hostname+''+Q+'>'+location.hostname.toUpperCase()+'</a></span><hr/><p>'+document.title+'</p>';
		FOOTBOX.innerHTML = '<span id='+Q+'zsbd-footer-content'+Q+'><p>'+document.title+' on '+location.hostname+'</p><p>&copy;'+YEAR+' <a href='+Q+'http://inimu.com'+Q+'>inimu.com</a></p></span>';
	}

	function zsbd_setupPageSourceContent() {
		var RAW = document.documentElement.outerHTML;
		var CODE = RAW.zsbd_replaceString(LITERALCHARS, HTMLCHARS);
		PAGESOURCEBOX.innerHTML = CODE+'\n';
		PAGESOURCEBOX_LEFT.innerHTML = CODE+'\n';
		PAGESOURCEBOX_RIGHT.innerHTML = CODE+'\n';
	}
	function zsbd_loadPageSourceContent() {
		try { clearTimeout(PAGESOURCE_CONTENT_TIMER); } catch (e) { }
		PAGESOURCEBOX.innerHTML = PAGESOURCEBOX_ORIGHTML;
		PAGESOURCEBOX_LEFT.innerHTML = PAGESOURCEBOX_LEFT_ORIGHTML;
		PAGESOURCEBOX_RIGHT.innerHTML = PAGESOURCEBOX_RIGHT_ORIGHTML;
		zsbd_setupPageSourceContent();
	}

	function zsbd_setupZstickybarCodeBox() {
		var ZSTICKYBARCODEBOX = document.getElementById('zsbd-zstickybarcode-box');
		var ZSTICKYBARWIDGET = document.getElementById('zsbd-zstickybar-widget');
		var RAW = zOrigIOHTML.innerHTML(ZSTICKYBARWIDGET);
		var CODE = RAW.zsbd_replaceString(LITERALCHARS, HTMLCHARS);
		ZSTICKYBARCODEBOX.innerHTML = CODE+'\n';
	}

	function zsbd_checkJquery() {
		try {
			alert(jQuery.fn.jquery);
		} catch(ej) {
			try {
				alert($.fn.jquery);
			} catch(e$) {
				alert('(1) '+ej+'\n'+'(2) '+e$);
			}
		}
	}

	function zsbd_dummyLogin() {
		var NAME = document.getElementById('login-name');
		var PWD = document.getElementById('login-password');
		if ( (NAME.value) && (PWD.value) ) {
			alert('Welcome back, '+NAME.value+'!')
		} else {
			alert('Please complete the log in form!');
			if (NAME.value) { PWD.focus(); } else { NAME.focus(); }
		}
	}


	return {

		openOrigPageSourceWindow : zsbd_openOrigPageSourceWindow,
		setupHeaderFooterContent : zsbd_setupHeaderFooterContent,
		setupPageSourceContent : zsbd_setupPageSourceContent,
		loadPageSourceContent : zsbd_loadPageSourceContent,
		setupZstickybarCodeBox : zsbd_setupZstickybarCodeBox,

		checkJquery: zsbd_checkJquery,
		dummyLogin: zsbd_dummyLogin,

		ZZ:true
	}


})();


(function() {
	zsbDemo.setupHeaderFooterContent();
	try {
		if (typeof zOrigIOHTML.innerHTML === 'function') {
			zsbDemo.setupZstickybarCodeBox();
		}
	} catch(e) {}
	try {
		if (typeof zTextSelect.setClickEventForTagName === 'function') {
			zTextSelect.setClickEventForTagName('pre, textarea');
		}
	} catch(e) {}
})();

