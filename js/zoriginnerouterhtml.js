/*!
 * zOrigInnerOuterHTML
 * Copyright (C) 2014 - Zon Saja - zonsaja@gmail.com - http://inimu.com
 * A slightly modified version from original code from 2011 by
 * MOleYArd (MOYA) Software (http://www.moya.sk , http://www.moyablog.com).
 * Released under the Creative Commons Attribution-Share Alike 3.0  License
 * See the license at http://creativecommons.org/licenses/by-sa/3.0/
 * Basically that means you are free to use zOrigInnerOuterHTML as long as
 * you give the proper credit line above in your code.
 */

/*!
 * zOrigInnerOuterHTML version 1.0 (2014.04)
 * zOrigInnerOuterHTML is Javascript library provided functions to get the
 * 'original innerHTML', 'original outerHTML' and original page source
 * (rather than build-in inner/outerHTML in Javascript, which do not return
 * original codes but return source codes after modifications made by scripts).
 * This functions make use of XMLHttpRequest to get the original document.
 * Usage:
 * zoio_InnerHTML(ELEMENT,INCLUDING)
 * 	Returns original page source string content inside chosen ELEMENT
 * 	and including that ELEMENT if INCLUDING is set to true.
 * zoio_OuterHTML(ELEMENT)
 * 	Returns original page source string content inside chosen ELEMENT
 * 	including that ELEMENT.
 * zoio_PageSource()
 * 	Returns the complete original page source string.
 */




function zoio_PageSource() {
	var DOCREQUEST = new XMLHttpRequest();
	if (window.ActiveXObject) {
		DOCREQUEST = new ActiveXObject('Microsoft.XMLHTTP');
	} else if (window.XMLHttpRequest) {
		DOCREQUEST = new XMLHttpRequest();
	}
	DOCREQUEST.open('GET',document.location.href,false);
	DOCREQUEST.send(null);
	if (DOCREQUEST.status === 200) {
		return DOCREQUEST.responseText;
	} else {
		return false;
	}
}

function zoio_InnerHTML(ELEMENT,INCLUDING) {
	var ELMXML = zoio_PageSource();
	var ELMINDEX = 0;
	var ELMNODENAME = ELEMENT.nodeName;
	var ELEMENTS = document.getElementsByTagName(ELMNODENAME);
	for (var i = 0; i < ELEMENTS.length; i++) {
		if (ELEMENT === ELEMENTS[i]) {
			ELMINDEX = i;
			break;
		}
	}
	OPENELMREGEX = new RegExp('<'+ELMNODENAME, 'i');
	CLOSEELMREGEX = new RegExp('</'+ELMNODENAME, 'i');
	for (var i=0; i <= ELMINDEX; i++) {
		ELMXML = ELMXML.substring(ELMXML.search(OPENELMREGEX)+1);
	}
	ELMXML = '<'+ELMXML;
	if ( (ELEMENT.hasChildNodes() == false) && ( (ELMXML.indexOf('/') < ELMXML.indexOf('>')) || (ELMXML.search(CLOSEELMREGEX) == -1) ) ) {
		if (INCLUDING) {
			ELMXML = ELMXML.substring(0, ELMXML.indexOf('>')+1);
			return ELMXML;
		} else {
			return '';
		}
	}
	ELMXMLCOPY = ELMXML;
	while ( ELMXMLCOPY.search(new RegExp(OPENELMREGEX)) < ELMXMLCOPY.search(new RegExp(CLOSEELMREGEX)) ) {
		if (ELMXMLCOPY.search(OPENELMREGEX) != -1) {
			ELMXMLCOPY = ELMXMLCOPY.substring(ELMXMLCOPY.search(OPENELMREGEX));
			ELMXMLCOPY = '<'+ELMXMLCOPY;
			ELMXMLCOPY = ELMXMLCOPY.substring(ELMXMLCOPY.search(CLOSEELMREGEX)+ELMNODENAME.length+3);
			ELMXMLCOPY = '<'+ELMNODENAME+'>'+ELMXMLCOPY;
		}
	}
	var ENDOFFSET = ELMXMLCOPY.length - ELMXMLCOPY.search(CLOSEELMREGEX);
	ELMXML = ELMXML.substring(0,ELMXML.length - ENDOFFSET);
	ELMXML = ELMXML+'</'+ELMNODENAME.toLowerCase()+'>';
	if (INCLUDING) {
		return ELMXML;
	} else {
		ELMXML = ELMXML.substring(ELMXML.indexOf('>')+1, ELMXML.lastIndexOf('<')-1);
		return ELMXML;
	}
}
function zoio_OuterHTML(ELEMENT) {
	return zoio_InnerHTML(ELEMENT,true);
}

