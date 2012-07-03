/** @license Hyphenator X.Y.Z - client side hyphenation for webbrowsers
 *  Copyright (C) 2010  Mathias Nater, Zürich (mathias at mnn dot ch)
 *  Project and Source hosted on http://code.google.com/p/hyphenator/
 * 
 *  This JavaScript code is free software: you can redistribute
 *  it and/or modify it under the terms of the GNU Lesser
 *  General Public License (GNU LGPL) as published by the Free Software
 *  Foundation, either version 3 of the License, or (at your option)
 *  any later version.  The code is distributed WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS
 *  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 *  As additional permission under GNU GPL version 3 section 7, you
 *  may distribute non-source (e.g., minimized or compacted) forms of
 *  that code without the copy of the GNU GPL normally required by
 *  section 4, provided you include this license notice and a URL
 *  through which recipients can access the Corresponding Source.
 *
 * 
 *  Hyphenator.js contains code from Bram Steins hypher.js-Project:
 *  https://github.com/bramstein/Hypher
 *  
 *  Code from this project is marked in the source and belongs 
 *  to the following license:
 *  
 *  Copyright (c) 2011, Bram Stein
 *  All rights reserved.
 *  
 *  Redistribution and use in source and binary forms, with or without 
 *  modification, are permitted provided that the following conditions 
 *  are met:
 *   
 *   1. Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer. 
 *   2. Redistributions in binary form must reproduce the above copyright 
 *      notice, this list of conditions and the following disclaimer in the 
 *      documentation and/or other materials provided with the distribution. 
 *   3. The name of the author may not be used to endorse or promote products 
 *      derived from this software without specific prior written permission. 
 *  
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED 
 *  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
 *  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
 *  EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
 *  OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
 *  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 */
 
/* 
 *  Comments are jsdoctoolkit formatted. See http://code.google.com/p/jsdoc-toolkit/
 */
 
/* The following comment is for JSLint: */
/*global window, ActiveXObject, unescape */
/*jslint plusplus: true, white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: false, regexp: true, sub: true, newcap: true, immed: true, evil: true, eqeqeq: false */


/**
 * @constructor
 * @description Provides all functionality to do hyphenation, except the patterns that are loaded
 * externally.
 * @author Mathias Nater, <a href = "mailto:mathias@mnn.ch">mathias@mnn.ch</a>
 * @version X.Y.Z
 * @namespace Holds all methods and properties
 * @example
 * &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
 * &lt;script type = "text/javascript"&gt;
 *   Hyphenator.run();
 * &lt;/script&gt;
 */
var Hyphenator = (function (window) {
	'use strict';
	
	var
	/**
	 * @name Hyphenator-supportedLang
	 * @description
	 * A key-value object that stores supported languages.
	 * The key is the bcp47 code of the language and the value
	 * is an object containing informations about the language
	 * @type {Object.<string, Object>}
	 * @private
	 * @example
	 * Check if language lang is supported:
	 * if (supportedLangs.hasOwnProperty(lang))
	 */
	supportedLangs = (function () {
		var r = {},
		o = function (code, file, script, prompt) {
			r[code] = {'file': file, 'script': script, 'prompt': prompt};
		};
		
		//latin:0, cyrillic: 1, arabic: 2, armenian:3, bengali: 4, devangari: 5, greek: 6
		//gujarati: 7, kannada: 8, lao: 9, malayalam: 10, oriya: 11, persian: 12, punjabi: 13, tamil: 14, telugu: 15
		o('be', 'be.js', 1, 'Мова гэтага сайта не можа быць вызначаны аўтаматычна. Калі ласка пакажыце мову:');
		o('ca', 'ca.js', 0, '');
		o('cs', 'cs.js', 0, 'Jazyk této internetové stránky nebyl automaticky rozpoznán. Určete prosím její jazyk:');
		o('da', 'da.js', 0, 'Denne websides sprog kunne ikke bestemmes. Angiv venligst sprog:');
		o('bn', 'bn.js', 4, '');
		o('de', 'de.js', 0, 'Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben:');
		o('el', 'el-monoton.js', 6, '');
		o('el-monoton', 'el-monoton.js', 6, '');
		o('el-polyton', 'el-polyton.js', 6, '');
		o('en', 'en-us.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
		o('en-gb', 'en-gb.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
		o('en-us', 'en-us.js', 0, 'The language of this website could not be determined automatically. Please indicate the main language:');
		o('eo', 'eo.js', 0, 'La lingvo de ĉi tiu retpaĝo ne rekoneblas aŭtomate. Bonvolu indiki ĝian ĉeflingvon:');
		o('es', 'es.js', 0, 'El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal:');
		o('et', 'et.js', 0, 'Veebilehe keele tuvastamine ebaõnnestus, palun valige kasutatud keel:');
		o('fi', 'fi.js', 0, 'Sivun kielt%E4 ei tunnistettu automaattisesti. M%E4%E4rit%E4 sivun p%E4%E4kieli:');
		o('fr', 'fr.js', 0, 'La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue, s.v.p.%A0:');
		o('grc', 'grc.js', 6, '');
		o('gu', 'gu.js', 7, '');
		o('hi', 'hi.js', 5, '');
		o('hu', 'hu.js', 0, 'A weboldal nyelvét nem sikerült automatikusan megállapítani. Kérem adja meg a nyelvet:');
		o('hy', 'hy.js', 3, 'Չհաջողվեց հայտնաբերել այս կայքի լեզուն։ Խնդրում ենք նշեք հիմնական լեզուն՝');
		o('it', 'it.js', 0, 'Lingua del sito sconosciuta. Indicare una lingua, per favore:');
		o('kn', 'kn.js', 8, 'ಜಾಲ ತಾಣದ ಭಾಷೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮುಖ್ಯ ಭಾಷೆಯನ್ನು ಸೂಚಿಸಿ:');
		o('la', 'la.js', 0, '');
		o('lt', 'lt.js', 0, 'Nepavyko automatiškai nustatyti šios svetainės kalbos. Prašome įvesti kalbą:');
		o('lv', 'lv.js', 0, 'Šīs lapas valodu nevarēja noteikt automātiski. Lūdzu norādiet pamata valodu:');
		o('ml', 'ml.js', 10, 'ഈ വെ%u0D2C%u0D4D%u200Cസൈറ്റിന്റെ ഭാഷ കണ്ടുപിടിയ്ക്കാ%u0D28%u0D4D%u200D കഴിഞ്ഞില്ല. ഭാഷ ഏതാണെന്നു തിരഞ്ഞെടുക്കുക:');
		o('nb', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
		o('no', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
		o('nb-no', 'nb-no.js', 0, 'Nettstedets språk kunne ikke finnes automatisk. Vennligst oppgi språk:');
		o('nl', 'nl.js', 0, 'De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op:');
		o('or', 'or.js', 11, '');
		o('pa', 'pa.js', 13, '');
		o('pl', 'pl.js', 0, '');
		o('pt', 'pt.js', 0, 'A língua deste site não pôde ser determinada automaticamente. Por favor indique a língua principal:');
		o('ru', 'ru.js', 1, 'Язык этого сайта не может быть определен автоматически. Пожалуйста укажите язык:');
		o('sk', 'sk.js', 0, '');
		o('sl', 'sl.js', 0, 'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');
		o('sr-latn', 'sr-latn.js', 0, 'Jezika te spletne strani ni bilo mogoče samodejno določiti. Prosim navedite jezik:');
		o('sv', 'sv.js', 0, 'Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange:');
		o('ta', 'ta.js', 14, '');
		o('te', 'te.js', 15, '');
		o('tr', 'tr.js', 0, 'Bu web sitesinin dili otomatik olarak tespit edilememiştir. Lütfen dökümanın dilini seçiniz%A0:');
		o('uk', 'uk.js', 1, 'Мова цього веб-сайту не може бути визначена автоматично. Будь ласка, вкажіть головну мову:');
		
		return r;
	}()),
	/**
	 * @name Hyphenator-languageHint
	 * @description
	 * An automatically generated string to be displayed in a prompt if the language can't be guessed.
	 * The string is generated using the supportedLangs-object.
	 * @see Hyphenator-supportedLang
	 * @type {string}
	 * @private
	 * @see Hyphenator-autoSetMainLanguage
	 */

	languageHint = (function () {
		var k, r = '';
		for (k in supportedLangs) {
			if (supportedLangs.hasOwnProperty(k)) {
				r += k + ', ';
			}
		}
		r = r.substring(0, r.length - 2);
		return r;
	}()),
	
	/**
	 * @name Hyphenator-basePath
	 * @description
	 * A string storing the basepath from where Hyphenator.js was loaded.
	 * This is used to load the patternfiles.
	 * The basepath is determined dynamically by searching all script-tags for Hyphenator.js
	 * If the path cannot be determined http://hyphenator.googlecode.com/svn/trunk/ is used as fallback.
	 * @type {string}
	 * @private
	 * @see Hyphenator-loadPatterns
	 */
	basePath = (function () {
		var s = document.getElementsByTagName('script'), i = 0, p, src, t;
		while (!!(t = s[i++])) {
			if (!!t.src) {
				src = t.src;
				p = src.indexOf('Hyphenator.js');
				if (p !== -1) {
					return src.substring(0, p);
				}
			}
		}
		return 'http://hyphenator.googlecode.com/svn/trunk/';
	}()),

	/**
	 * @name Hyphenator-isLocal
	 * @description
	 * isLocal is true, if Hyphenator is loaded from the same domain, as the webpage, but false, if
	 * it's loaded from an external source (i.e. directly from google.code)
	 */
	isLocal = (function () {
		var re = false;
		if (window.location.href.indexOf(basePath) !== -1) {
			re = true;
		}
		return re;
	}()),
	
	/**
	 * @name Hyphenator-documentLoaded
	 * @description
	 * documentLoaded is true, when the DOM has been loaded. This is set by runOnContentLoaded
	 */
	documentLoaded = false,
	documentCount = 0,
	
	/**
	 * @name Hyphenator-persistentConfig
	 * @description
	 * if persistentConfig is set to true (defaults to false), config options and the state of the 
	 * toggleBox are stored in DOM-storage (according to the storage-setting). So they haven't to be
	 * set for each page.
	 */	
	persistentConfig = false,	

	/**
	 * @name Hyphenator-contextWindow
	 * @description
	 * contextWindow stores the window for the document to be hyphenated.
	 * If there are frames this will change.
	 * So use contextWindow instead of window!
	 */
	contextWindow = window,

	/**
	 * @name Hyphenator-doFrames
	 * @description
	 * switch to control if frames/iframes should be hyphenated, too
	 * defaults to false (frames are a bag of hurt!)
	 */
	doFrames = false,
	
	/**
	 * @name Hyphenator-dontHyphenate
	 * @description
	 * A key-value object containing all html-tags whose content should not be hyphenated
	 * @type {Object.<string,boolean>}
	 * @private
	 * @see Hyphenator-hyphenateElement
	 */
	dontHyphenate = {'script': true, 'code': true, 'pre': true, 'img': true, 'br': true, 'samp': true, 'kbd': true, 'var': true, 'abbr': true, 'acronym': true, 'sub': true, 'sup': true, 'button': true, 'option': true, 'label': true, 'textarea': true, 'input': true, 'math': true, 'svg': true},

	/**
	 * @name Hyphenator-enableCache
	 * @description
	 * A variable to set if caching is enabled or not
	 * @type boolean
	 * @default true
	 * @private
	 * @see Hyphenator.config
	 * @see hyphenateWord
	 */
	enableCache = true,

	/**
	 * @name Hyphenator-storageType
	 * @description
	 * A variable to define what html5-DOM-Storage-Method is used ('none', 'local' or 'session')
	 * @type {string}
	 * @default 'none'
	 * @private
	 * @see Hyphenator.config
	 */	
	storageType = 'local',

	/**
	 * @name Hyphenator-storage
	 * @description
	 * An alias to the storage-Method defined in storageType.
	 * Set by Hyphenator.run()
	 * @type {Object|undefined}
	 * @default null
	 * @private
	 * @see Hyphenator.run
	 */	
	storage,
	
	/**
	 * @name Hyphenator-enableReducedPatternSet
	 * @description
	 * A variable to set if storing the used patterns is set
	 * @type boolean
	 * @default false
	 * @private
	 * @see Hyphenator.config
	 * @see hyphenateWord
	 * @see Hyphenator.getRedPatternSet
	 */	
	enableReducedPatternSet = false,
	
	/**
	 * @name Hyphenator-enableRemoteLoading
	 * @description
	 * A variable to set if pattern files should be loaded remotely or not
	 * @type boolean
	 * @default true
	 * @private
	 * @see Hyphenator.config
	 * @see Hyphenator-loadPatterns
	 */
	enableRemoteLoading = true,
	
	/**
	 * @name Hyphenator-displayToggleBox
	 * @description
	 * A variable to set if the togglebox should be displayed or not
	 * @type boolean
	 * @default false
	 * @private
	 * @see Hyphenator.config
	 * @see Hyphenator-toggleBox
	 */
	displayToggleBox = false,

	/**
	 * @name Hyphenator-onError
	 * @description
	 * A function that can be called upon an error.
	 * @see Hyphenator.config
	 * @type {function(Object)}
	 * @private
	 */		
	onError = function (e) {
		window.alert("Hyphenator.js says:\n\nAn Error occurred:\n" + e.message);
	},
	
	/**
	 * @name Hyphenator-createElem
	 * @description
	 * A function alias to document.createElementNS or document.createElement
	 * @type {function(string, Object)}
	 * @private
	 */		
	createElem = function (tagname, context) {
		context = context || contextWindow;
		if (document.createElementNS) {
			return context.document.createElementNS('http://www.w3.org/1999/xhtml', tagname);
		} else if (document.createElement) {
			return context.document.createElement(tagname);
		}
	},

	/**
	 * @name Hyphenator-css3
	 * @description
	 * A variable to set if css3 hyphenation should be used
	 * @type boolean
	 * @default false
	 * @private
	 * @see Hyphenator.config
	 */
	css3 = false,
	/**
	 * @name Hyphenator-css3_hsupport
	 * @description
	 * A generated object containing information for CSS3-hyphenation support
	 * {
	 *   support: boolean,
	 *   property: <the property name to access hyphen-settings>,
	 *   languages: <an object containing supported languages>
	 * }
	 * @type object
	 * @default undefined
	 * @private
	 * @see Hyphenator-css3_gethsupport
	 */
	css3_h9n,
	/**
	 * @name Hyphenator-css3_gethsupport
	 * @description
	 * This function sets Hyphenator-css3_h9n for the current UA
	 * @type function
	 * @private
	 * @see Hyphenator-css3_h9n
	 */
	css3_gethsupport = function () {
		var s,
		ua = navigator.userAgent,
		createLangSupportChecker = function (prefix) {
			 var testStrings = [
				//latin: 0
				'abcdefghijklmnopqrstuvwxyz',
				//cyrillic: 1
				'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
				//arabic: 2
				'أبتثجحخدذرزسشصضطظعغفقكلمنهوي',
				//armenian: 3
				'աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ',
				//bengali: 4
				'ঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ',
				//devangari: 5
				'ँंःअआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसहऽािीुूृॄेैोौ्॒॑ॠॡॢॣ',
				//greek: 6
				'αβγδεζηθικλμνξοπρσςτυφχψω',
				//gujarati: 7
				'બહઅઆઇઈઉઊઋૠએઐઓઔાિીુૂૃૄૢૣેૈોૌકખગઘઙચછજઝઞટઠડઢણતથદધનપફસભમયરલળવશષ',
				//kannada: 8
				'ಂಃಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹಽಾಿೀುೂೃೄೆೇೈೊೋೌ್ೕೖೞೠೡ',
				//lao: 9
				'ກຂຄງຈຊຍດຕຖທນບປຜຝພຟມຢຣລວສຫອຮະັາິີຶືຸູົຼເແໂໃໄ່້໊໋ໜໝ',
				//malayalam: 10
				'ംഃഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരറലളഴവശഷസഹാിീുൂൃെേൈൊോൌ്ൗൠൡൺൻർൽൾൿ',
				//oriya: 11
				'ଁଂଃଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହାିୀୁୂୃେୈୋୌ୍ୗୠୡ',
				//persian: 12
				'أبتثجحخدذرزسشصضطظعغفقكلمنهوي',
				//punjabi: 13
				'ਁਂਃਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹਾਿੀੁੂੇੈੋੌ੍ੰੱ',
				//tamil: 14
				'ஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஷஸஹாிீுூெேைொோௌ்ௗ',
				//telugu: 15
				'ఁంఃఅఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహాిీుూృౄెేైొోౌ్ౕౖౠౡ'
			],
			f = function (lang) {
				var shadow,
					computedHeight,
					bdy = window.document.getElementsByTagName('body')[0];
				
				//create and append shadow-test-element
				shadow = createElem('div', window);
				shadow.id = 'Hyphenator_LanguageChecker';
				shadow.style.width = '5em';
				shadow.style[prefix] = 'auto';
				shadow.style.hyphens = 'auto';
				shadow.style.fontSize = '12px';
				shadow.style.lineHeight = '12px';
				shadow.style.visibility = 'hidden';
				if (supportedLangs.hasOwnProperty(lang)) {
					shadow.lang = lang;
					shadow.style['-webkit-locale'] = "'" + lang + "'";
					shadow.innerHTML = testStrings[supportedLangs[lang].script];
				} else {
					return false;
				}
				bdy.appendChild(shadow);
				
				//measure its height
				//computedHeight = parseInt(window.getComputedStyle(shadow, null).height.slice(0, -2), 10);
				computedHeight = shadow.offsetHeight;
				
				//remove shadow element
				bdy.removeChild(shadow);
	
				if (computedHeight > 12) {
					return true;
				} else {
					return false;
				}			
			};
			return f;
		},
		r = {
			support: false,
			property: '',
			checkLangSupport: function () {}
		};		
		
		if (window.getComputedStyle) {
			s = contextWindow.getComputedStyle(contextWindow.document.getElementsByTagName('body')[0], null);
		} else {
			//ancient Browsers don't support CSS3 anyway
			css3_h9n = r;
			return;
		}
		
		if (s['-webkit-hyphens'] !== undefined) {
			r.support = true;
			r.property = '-webkit-hyphens';
			r.checkLangSupport = createLangSupportChecker('-webkit-hyphens');
		} else if (s['MozHyphens'] !== undefined) {
			r.support = true;
			r.property = 'MozHyphens';
			r.checkLangSupport = createLangSupportChecker('MozHyphens');
		} else if (s['-ms-hyphens'] !== undefined) {
			r.support = true;
			r.property = '-ms-hyphens';
			r.checkLangSupport = createLangSupportChecker('-ms-hyphens');
		}
		
		css3_h9n = r;
	},
	
	/**
	 * @name Hyphenator-hyphenateClass
	 * @description
	 * A string containing the css-class-name for the hyphenate class
	 * @type {string}
	 * @default 'hyphenate'
	 * @private
	 * @example
	 * &lt;p class = "hyphenate"&gt;Text&lt;/p&gt;
	 * @see Hyphenator.config
	 */
	hyphenateClass = 'hyphenate',

	/**
	 * @name Hyphenator-dontHyphenateClass
	 * @description
	 * A string containing the css-class-name for elements that should not be hyphenated
	 * @type {string}
	 * @default 'donthyphenate'
	 * @private
	 * @example
	 * &lt;p class = "donthyphenate"&gt;Text&lt;/p&gt;
	 * @see Hyphenator.config
	 */
	dontHyphenateClass = 'donthyphenate',
	
	/**
	 * @name Hyphenator-min
	 * @description
	 * A number wich indicates the minimal length of words to hyphenate.
	 * @type {number}
	 * @default 6
	 * @private
	 * @see Hyphenator.config
	 */	
	min = 6,
	
	/**
	 * @name Hyphenator-orphanControl
	 * @description
	 * Control how the last words of a line are handled:
	 * level 1 (default): last word is hyphenated
	 * level 2: last word is not hyphenated
	 * level 3: last word is not hyphenated and last space is non breaking
	 * @type {number}
	 * @default 1
	 * @private
	 */
	orphanControl = 1,
	
	/**
	 * @name Hyphenator-isBookmarklet
	 * @description
	 * Indicates if Hyphanetor runs as bookmarklet or not.
	 * @type boolean
	 * @default false
	 * @private
	 */	
	isBookmarklet = (function () {
		var loc = null, re = false, jsArray = document.getElementsByTagName('script'), i, l;
		for (i = 0, l = jsArray.length; i < l; i++) {
			if (!!jsArray[i].getAttribute('src')) {
				loc = jsArray[i].getAttribute('src');
			}
			if (!!loc && loc.indexOf('Hyphenator.js?bm=true') !== -1) {
				re = true;
			}
		}
		return re;
	}()),
	
	/**
	 * @name Hyphenator-mainLanguage
	 * @description
	 * The general language of the document. In contrast to {@link Hyphenator-defaultLanguage},
	 * mainLanguage is defined by the client (i.e. by the html or by a prompt).
	 * @type {string|null}
	 * @private
	 * @see Hyphenator-autoSetMainLanguage
	 */	
	mainLanguage = null,

	/**
	 * @name Hyphenator-defaultLanguage
	 * @description
	 * The language defined by the developper. This language setting is defined by a config option.
	 * It is overwritten by any html-lang-attribute and only taken in count, when no such attribute can
	 * be found (i.e. just before the prompt).
	 * @type {string|null}
	 * @private
	 * @see Hyphenator-autoSetMainLanguage
	 */	
	defaultLanguage = '',
	

	/**
	 * @name Hyphenator-elements
	 * @description
	 * An array holding all elements that have to be hyphenated. This var is filled by
	 * {@link Hyphenator-gatherDocumentInfos}
	 * @type {Array}
	 * @private
	 */	
	elements = (function () {
		var Element = function (element, data) {
			this.element = element;
			this.hyphenated = false;
			this.treated = false; //collected but not hyphenated (dohyphenation is off)
			this.data = data;
		},
		ElementCollection = function () {
			this.count = 0;
			this.hyCount = 0;
			this.list = {};
		};
		ElementCollection.prototype = {
			add: function (el, lang, data) {
				if (!this.list.hasOwnProperty(lang)) {
					this.list[lang] = [];
				}
				this.list[lang].push(new Element(el, data));
				this.count += 1;
			},
			each: function (fn) {
				var k;
				for (k in this.list) {
					if (this.list.hasOwnProperty(k)) {
						fn(k, this.list[k]);
					}
				}
			}
		};
		return new ElementCollection();
	}()),

	
	/**
	 * @name Hyphenator-exceptions
	 * @description
	 * An object containing exceptions as comma separated strings for each language.
	 * When the language-objects are loaded, their exceptions are processed, copied here and then deleted.
	 * @see Hyphenator-prepareLanguagesObj
	 * @type {Object}
	 * @private
	 */	
	exceptions = {},
	
	/**
	 * @name Hyphenator-docLanguages
	 * @description
	 * An object holding all languages used in the document. This is filled by
	 * {@link Hyphenator-gatherDocumentInfos}
	 * @type {Object}
	 * @private
	 */	
	docLanguages = {},

	/**
	 * @name Hyphenator-state
	 * @description
	 * A number that inidcates the current state of the script
	 * 0: not initialized
	 * 1: loading patterns
	 * 2: ready
	 * 3: hyphenation done
	 * 4: hyphenation removed
	 * @type {number}
	 * @private
	 */	
	state = 0,

	/**
	 * @name Hyphenator-url
	 * @description
	 * A string containing a RegularExpression to match URL's
	 * @type {string}
	 * @private
	 */	
	url = '(\\w*:\/\/)?((\\w*:)?(\\w*)@)?((([\\d]{1,3}\\.){3}([\\d]{1,3}))|((www\\.|[a-zA-Z]\\.)?[a-zA-Z0-9\\-\\.]+\\.([a-z]{2,4})))(:\\d*)?(\/[\\w#!:\\.?\\+=&%@!\\-]*)*',
	//      protocoll     usr     pwd                    ip               or                          host                 tld        port               path
	/**
	 * @name Hyphenator-mail
	 * @description
	 * A string containing a RegularExpression to match mail-adresses
	 * @type {string}
	 * @private
	 */	
	mail = '[\\w-\\.]+@[\\w\\.]+',

	/**
	 * @name Hyphenator-urlRE
	 * @description
	 * A RegularExpressions-Object for url- and mail adress matching
	 * @type {RegExp}
	 * @private
	 */		
	urlOrMailRE = new RegExp('(' + url + ')|(' + mail + ')', 'i'),

	/**
	 * @name Hyphenator-zeroWidthSpace
	 * @description
	 * A string that holds a char.
	 * Depending on the browser, this is the zero with space or an empty string.
	 * zeroWidthSpace is used to break URLs
	 * @type {string}
	 * @private
	 */		
	zeroWidthSpace = (function () {
		var zws, ua = navigator.userAgent.toLowerCase();
		zws = String.fromCharCode(8203); //Unicode zero width space
		if (ua.indexOf('msie 6') !== -1) {
			zws = ''; //IE6 doesn't support zws
		}
		if (ua.indexOf('opera') !== -1 && ua.indexOf('version/10.00') !== -1) {
			zws = ''; //opera 10 on XP doesn't support zws
		}
		return zws;
	}()),
	
	/**
	 * @name Hyphenator-onHyphenationDone
	 * @description
	 * A method to be called, when the last element has been hyphenated or the hyphenation has been
	 * removed from the last element.
	 * @see Hyphenator.config
	 * @type {function()}
	 * @private
	 */		
	onHyphenationDone = function () {},

	/**
	 * @name Hyphenator-selectorFunction
	 * @description
	 * A function that has to return a HTMLNodeList of Elements to be hyphenated.
	 * By default it uses the classname ('hyphenate') to select the elements.
	 * @see Hyphenator.config
	 * @type {function()}
	 * @private
	 */		
	selectorFunction = function () {
		var tmp, el = [], i, l;
		if (document.getElementsByClassName) {
			el = contextWindow.document.getElementsByClassName(hyphenateClass);
		} else if (document.querySelectorAll) {
			el = contextWindow.document.querySelectorAll('.' + hyphenateClass);
		} else {
			tmp = contextWindow.document.getElementsByTagName('*');
			l = tmp.length;
			for (i = 0; i < l; i++)
			{
				if (tmp[i].className.indexOf(hyphenateClass) !== -1 && tmp[i].className.indexOf(dontHyphenateClass) === -1) {
					el.push(tmp[i]);
				}
			}
		}
		return el;
	},

	/**
	 * @name Hyphenator-intermediateState
	 * @description
	 * The value of style.visibility of the text while it is hyphenated.
	 * @see Hyphenator.config
	 * @type {string}
	 * @private
	 */		
	intermediateState = 'hidden',
	
	/**
	 * @name Hyphenator-unhide
	 * @description
	 * How hidden elements unhide: either simultaneous (default: 'wait') or progressively.
	 * 'wait' makes Hyphenator.js to wait until all elements are hyphenated (one redraw)
	 * With 'progressiv' Hyphenator.js unhides elements as soon as they are hyphenated.
	 * @see Hyphenator.config
	 * @type {string}
	 * @private
	 */		
	unhide = 'wait',
	
	/**
	 * @name Hyphenator-CSSEditors
	 * @description A container array that holds CSSEdit classes
	 * For each window object one CSSEdit class is inserted
	 * @see Hyphenator-CSSEdit
	 * @type {array}
	 * @private
	 */			
	CSSEditors = [],

	/**
	 * @name Hyphenator-CSSEditors
	 * @description A custom class with two public methods: setRule() and clearChanges()
	 * Tis is used to hide/unhide elements when they are hyphenated.
	 * @see Hyphenator-gatherDocumentInfos
	 * @type {function ()}
	 * @private
	 */			
	CSSEdit = function (w) {
		w = w || window;
		var doc = w.document,
		sheet = doc.styleSheets[doc.styleSheets.length-1],
		changes = [],
		findRule = function (sel) {
			var sheet, rule, sheets = window.document.styleSheets, rules, i, j;
			for (i = 0; i < sheets.length; i++) {
				sheet = sheets[i];
				if (!!sheet.cssRules) {
					rules = sheet.cssRules;
				} else if (!!sheet.rules) {
					// IE < 9
					rules = sheet.rules;
				}
				if (!!rules && !!rules.length) {
					for (j = 0; j < rules.length; j++) {
						rule = rules[j];
						if (rule.selectorText === sel) {
							return {
								index: j,
								rule: rule
							};
						}
					}
				}
			}
			return false;
		},
		addRule = function (sel, rulesStr) {
			var i;
			if (!!sheet.insertRule) {
				if (!!sheet.cssRules) {
					i = sheet.cssRules.length;
				} else {
					i = 0;
				}
				return sheet.insertRule(sel + '{' + rulesStr + '}', i);
			} else if (!!sheet.addRule) {
				// IE < 9
				if (!!sheet.rules) {
					i = sheet.rules.length;
				} else {
					i = 0;
				}
				sheet.addRule(sel, rulesStr, i);
				return i;
			}
		},
		removeRule = function (sheet, index) {
			if (sheet.deleteRule) {
				sheet.deleteRule(index);
			} else {
				// IE < 9
				
				sheet.removeRule(index);
			}
		};
		
		return {
			setRule: function (sel, rulesString) {
				var i, existingRule, cssText;
				existingRule = findRule(sel);
				if (!!existingRule) {
					if (!!existingRule.rule.cssText) {
						cssText = existingRule.rule.cssText;
					} else {
						// IE < 9
						cssText = existingRule.rule.style.cssText.toLowerCase();
					}
					if (cssText === '.' + hyphenateClass + ' { visibility: hidden; }') {
						//browsers w/o IE < 9 and no additional style defs:
						//add to [changes] for later removal
						changes.push({sheet: existingRule.rule.parentStyleSheet, index: existingRule.index});
					} else if (cssText.indexOf('visibility: hidden') !== -1) {
						// IE < 9 or additional style defs:
						// add new rule
						i = addRule(sel, rulesString);
						//add to [changes] for later removal
						changes.push({sheet: sheet, index: i});
						// clear existing def
						existingRule.rule.style['visibility'] = '';
					}
				} else {
					i = addRule(sel, rulesString);
					changes.push({sheet: sheet, index: i});
				}
			},
			clearChanges: function () {
				var change;
				while (!!(change = changes.pop())) {
					removeRule(change.sheet, change.index);
				}
			}
		};
	},
	
	/**
	 * @name Hyphenator-hyphen
	 * @description
	 * A string containing the character for in-word-hyphenation
	 * @type {string}
	 * @default the soft hyphen
	 * @private
	 * @see Hyphenator.config
	 */
	hyphen = String.fromCharCode(173),
	
	/**
	 * @name Hyphenator-urlhyphen
	 * @description
	 * A string containing the character for url/mail-hyphenation
	 * @type {string}
	 * @default the zero width space
	 * @private
	 * @see Hyphenator.config
	 * @see Hyphenator-zeroWidthSpace
	 */
	urlhyphen = zeroWidthSpace,

	/**
	 * @name Hyphenator-safeCopy
	 * @description
	 * Defines wether work-around for copy issues is active or not
	 * Not supported by Opera (no onCopy handler)
	 * @type boolean
	 * @default true
	 * @private
	 * @see Hyphenator.config
	 * @see Hyphenator-registerOnCopy
	 */
	safeCopy = true,	
		
	/*
	 * runOnContentLoaded is based od jQuery.bindReady()
	 * see
	 * jQuery JavaScript Library v1.3.2
	 * http://jquery.com/
	 *
	 * Copyright (c) 2009 John Resig
	 * Dual licensed under the MIT and GPL licenses.
	 * http://docs.jquery.com/License
	 *
	 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
	 * Revision: 6246
	 */
	/**
	 * @name Hyphenator-runOnContentLoaded
	 * @description
	 * A crossbrowser solution for the DOMContentLoaded-Event based on jQuery
	 * <a href = "http://jquery.com/</a>
	 * I added some functionality: e.g. support for frames and iframes…
	 * @param {Object} w the window-object
	 * @param {function()} f the function to call onDOMContentLoaded
	 * @private
	 */
	runOnContentLoaded = function (w, f) {
		var DOMContentLoaded = function () {}, toplevel, hyphRunForThis = {},
		add = document.addEventListener ? 'addEventListener' : 'attachEvent',
		rem = document.addEventListener ? 'removeEventListener' : 'detachEvent',
		pre = document.addEventListener ? '' : 'on';
		
		if (documentLoaded && !hyphRunForThis[w.location.href]) {
			f();
			hyphRunForThis[w.location.href] = true;
			return;
		}
		function init(context) {
			contextWindow = context || window;
			if (!hyphRunForThis[contextWindow.location.href] && (!documentLoaded || !!contextWindow.frameElement)) {
				documentLoaded = true;
				f();
				hyphRunForThis[contextWindow.location.href] = true;
			}
		}
		
		function doScrollCheck() {
			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch (error) {
				setTimeout(doScrollCheck, 1);
				return;
			}
		
			// and execute any waiting functions
			init(window);
		}

		function doOnLoad() {
			var i, haveAccess, fl = window.frames.length;
			if (doFrames && fl > 0) {
				for (i = 0; i < fl; i++) {
					haveAccess = undefined;
					//try catch isn't enough for webkit
					try {
						//opera throws only on document.toString-access
						haveAccess = window.frames[i].document.toString();
					} catch (e) {
						haveAccess = undefined;
					}
					if (!!haveAccess) {
						if (window.frames[i].location.href !== 'about:blank') {
							init(window.frames[i]);
						}
					}
				}
				contextWindow = window;
				f();
				hyphRunForThis[window.location.href] = true;
			} else {
				init(window);
			}
		}
		
		// Cleanup functions for the document ready method
		DOMContentLoaded = function (e) {
			if (e.type === 'readystatechange' && document.readyState !== 'complete') {
				return;
			}
			document[rem](pre + e.type, DOMContentLoaded, false);
			if (doFrames && window.frames.length > 0) {
				//we are in a frameset, so do nothing but wait for onload to fire
				return;
			} else {
				init(window);
			}
		};
		
		if (document.readyState === "complete" || document.readyState === "interactive") {
			//Running Hyphenator.js if it has been loaded later
			//Thanks to davenewtron http://code.google.com/p/hyphenator/issues/detail?id=158#c10
			setTimeout(doOnLoad, 1);
		} else {
			//registering events
			document[add](pre + "DOMContentLoaded", DOMContentLoaded, false);
			document[add](pre + 'readystatechange', DOMContentLoaded, false);
			window[add](pre + 'load', doOnLoad, false);
			toplevel = false;
			try {
				toplevel = !window.frameElement;
			} catch (e) {}
			if (document.documentElement.doScroll && toplevel) {
				doScrollCheck();
			}
		}
	},
	
	/**
	 * @name Hyphenator-getLang
	 * @description
	 * Gets the language of an element. If no language is set, it may use the {@link Hyphenator-mainLanguage}.
	 * @param {Object} el The first parameter is an DOM-Element-Object
	 * @param {boolean} fallback The second parameter is a boolean to tell if the function should return the {@link Hyphenator-mainLanguage}
	 * if there's no language found for the element.
	 * @private
	 */
	getLang = function (el, fallback) {
		if (!!el.getAttribute('lang')) {
			return el.getAttribute('lang').toLowerCase();
		}
		// The following doesn't work in IE due to a bug when getAttribute('xml:lang') in a table
		/*if (!!el.getAttribute('xml:lang')) {
			return el.getAttribute('xml:lang').substring(0, 2);
		}*/
		//instead, we have to do this (thanks to borgzor):
		try {
			if (!!el.getAttribute('xml:lang')) {
				return el.getAttribute('xml:lang').toLowerCase();
			}
		} catch (ex) {}
		if (el.tagName !== 'HTML') {
			return getLang(el.parentNode, true);
		}
		if (fallback) {
			return mainLanguage;
		}
		return null;
	},
	
	/**
	 * @name Hyphenator-autoSetMainLanguage
	 * @description
	 * Retrieves the language of the document from the DOM.
	 * The function looks in the following places:
	 * <ul>
	 * <li>lang-attribute in the html-tag</li>
	 * <li>&lt;meta http-equiv = "content-language" content = "xy" /&gt;</li>
	 * <li>&lt;meta name = "DC.Language" content = "xy" /&gt;</li>
	 * <li>&lt;meta name = "language" content = "xy" /&gt;</li>
	 * </li>
	 * If nothing can be found a prompt using {@link Hyphenator-languageHint} and a prompt-string is displayed.
	 * If the retrieved language is in the object {@link Hyphenator-supportedLangs} it is copied to {@link Hyphenator-mainLanguage}
	 * @private
	 */		
	autoSetMainLanguage = function (w) {
		w = w || contextWindow;
		var el = w.document.getElementsByTagName('html')[0],
			m = w.document.getElementsByTagName('meta'),
			i, text, e, ul;
		mainLanguage = getLang(el, false);
		if (!mainLanguage) {
			for (i = 0; i < m.length; i++) {
				//<meta http-equiv = "content-language" content="xy">	
				if (!!m[i].getAttribute('http-equiv') && (m[i].getAttribute('http-equiv').toLowerCase() === 'content-language')) {
					mainLanguage = m[i].getAttribute('content').toLowerCase();
				}
				//<meta name = "DC.Language" content="xy">
				if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'dc.language')) {
					mainLanguage = m[i].getAttribute('content').toLowerCase();
				}			
				//<meta name = "language" content = "xy">
				if (!!m[i].getAttribute('name') && (m[i].getAttribute('name').toLowerCase() === 'language')) {
					mainLanguage = m[i].getAttribute('content').toLowerCase();
				}
			}
		}
		//get lang for frame from enclosing document
		if (!mainLanguage && doFrames && (!!contextWindow.frameElement)) {
			autoSetMainLanguage(window.parent);
		}
		//fallback to defaultLang if set
		if (!mainLanguage && defaultLanguage !== '') {
			mainLanguage = defaultLanguage;
		}
		//ask user for lang
		if (!mainLanguage) {
			text = '';
			ul = navigator.language || navigator.userLanguage;
			ul = ul.substring(0, 2);
			if (!!supportedLangs[ul] && supportedLangs[ul].prompt !== '') {
				text = supportedLangs[ul].prompt;
			} else {
				text = supportedLangs.en.prompt;
			}
			text += ' (ISO 639-1)\n\n' + languageHint;
			mainLanguage = window.prompt(unescape(text), ul).toLowerCase();
		}
		if (!supportedLangs.hasOwnProperty(mainLanguage)) {
			if (supportedLangs.hasOwnProperty(mainLanguage.split('-')[0])) { //try subtag
				mainLanguage = mainLanguage.split('-')[0];
			} else {
				e = new Error('The language "' + mainLanguage + '" is not yet supported.');
				throw e;
			}
		}
	},
    
	/**
	 * @name Hyphenator-gatherDocumentInfos
	 * @description
	 * This method runs through the DOM and executes the process()-function on:
	 * - every node returned by the {@link Hyphenator-selectorFunction}.
	 * The process()-function copies the element to the elements-variable, sets its visibility
	 * to intermediateState, retrieves its language and recursivly descends the DOM-tree until
	 * the child-Nodes aren't of type 1
	 * @private
	 */		
	gatherDocumentInfos = function () {
		var elToProcess, tmp, i = 0,
		process = function (el, hide, lang) {
			var n, i = 0, hyphenatorSettings = {};

			if (el.lang && typeof(el.lang) === 'string') {
				lang = el.lang.toLowerCase(); //copy attribute-lang to internal lang
			} else if (lang) {
				lang = lang.toLowerCase();
			} else {
				lang = getLang(el, true);
			}
			
			//if css3-hyphenation is supported: use it!
			if (css3 && css3_h9n.support && !!css3_h9n.checkLangSupport(lang)) {
				el.style[css3_h9n.property] = "auto";
				el.style['-webkit-locale'] = "'" + lang + "'";
			} else {
				if (intermediateState === 'hidden' && unhide === 'progressive') {
					if (!!el.getAttribute('style')) {
						hyphenatorSettings.hasOwnStyle = true;
					} else {
						hyphenatorSettings.hasOwnStyle = false;					
					}
					hyphenatorSettings.isHidden = true;
					el.style.visibility = 'hidden';
				}
				if (supportedLangs.hasOwnProperty(lang)) {
					docLanguages[lang] = true;
				} else {
					if (supportedLangs.hasOwnProperty(lang.split('-')[0])) { //try subtag
						lang = lang.split('-')[0];
						hyphenatorSettings.language = lang;
					} else if (!isBookmarklet) {
						onError(new Error('Language ' + lang + ' is not yet supported.'));
					}
				}				
				elements.add(el, lang, hyphenatorSettings);
			}
			while (!!(n = el.childNodes[i++])) {
				if (n.nodeType === 1 && !dontHyphenate[n.nodeName.toLowerCase()] &&
					n.className.indexOf(dontHyphenateClass) === -1 && !elToProcess[n]) {
					process(n, false, lang);
				}
			}
		};
		if (css3) {
			css3_gethsupport();
		}
		if (isBookmarklet) {
			elToProcess = contextWindow.document.getElementsByTagName('body')[0];
			process(elToProcess, false, mainLanguage);
		} else {
			if (!css3 && unhide === 'wait') {
				CSSEditors.push(new CSSEdit(contextWindow));
				CSSEditors[CSSEditors.length - 1].setRule('.' + hyphenateClass, 'visibility: hidden;');
			}
			elToProcess = selectorFunction();
			while (!!(tmp = elToProcess[i++]))
			{
				process(tmp, true, '');
			}			
		}
		if (elements.count === 0) {
			//nothing to hyphenate or all hyphenated b css3
			state = 3;
			onHyphenationDone();
		}
	},
		 
	
	/**
	 * @name Hyphenator-createTrie
	 * @description
	 * converts patterns of the given language in a trie
	 * @private
	 * @param {string} lang the language whose patterns shall be converted
	 */		
	convertPatterns = function (lang) {
		/** @license BSD licenced code
		 * The following code is based on code from hypher.js and adapted for Hyphenator.js
		 * Copyright (c) 2011, Bram Stein
		 */
		var size = 0,
			tree = {
				tpoints: []
			},
			patterns, pattern, i, j, k,
			patternObject = Hyphenator.languages[lang].patterns,
			c, chars, points, t, p, codePoint, test = 'in3se',
			getPoints = (function () {
				//IE<9 doesn't act like other browsers: doesn't preserve the separators
				if (test.split(/\D/).length === 1) {
					return function (pattern) {
						pattern = pattern.replace(/\D/gi, ' ');
						return pattern.split(' ');
					};
				} else {
					return function (pattern) {
						return pattern.split(/\D/);
					};
				}
			}());
	
		for (size in patternObject) {
			if (patternObject.hasOwnProperty(size)) {
				patterns = patternObject[size].match(new RegExp('.{1,' + (+size) + '}', 'g'));
				i = 0;
				while (!!(pattern = patterns[i++])) {
					chars = pattern.replace(/[\d]/g, '').split('');
					points = getPoints(pattern);
					t = tree;

					j = 0;
					while (!!(c = chars[j++])) {
						codePoint = c.charCodeAt(0);
						
						if (!t[codePoint]) {
							t[codePoint] = {};
						}
						t = t[codePoint];
					}

					t.tpoints = [];
					for (k = 0; k < points.length; k++) {
						p = points[k];
						t.tpoints.push((p === "") ? 0 : p);
					}
				}
			}
		}
		Hyphenator.languages[lang].patterns = tree;
		/**
		 * end of BSD licenced code from hypher.js
		 */
	},

	recreatePattern = function (pattern, nodePoints) {
		var r = [], c = pattern.split(''), i;
		for (i = 0; i < nodePoints.length; i++) {
			if (nodePoints[i] !== 0) {
				r.push(nodePoints[i]);
			}
			if (c[i]) {
				r.push(c[i]);
			}
		}
		return r.join('');
	},
	
	/**
	 * @name Hyphenator-convertExceptionsToObject
	 * @description
	 * Converts a list of comma seprated exceptions to an object:
	 * 'Fortran,Hy-phen-a-tion' -> {'Fortran':'Fortran','Hyphenation':'Hy-phen-a-tion'}
	 * @private
	 * @param {string} exc a comma separated string of exceptions (without spaces)
	 */		
	convertExceptionsToObject = function (exc) {
		var w = exc.split(', '),
			r = {},
			i, l, key;
		for (i = 0, l = w.length; i < l; i++) {
			key = w[i].replace(/-/g, '');
			if (!r.hasOwnProperty(key)) {
				r[key] = w[i];
			}
		}
		return r;
	},
	
	/**
	 * @name Hyphenator-loadPatterns
	 * @description
	 * Adds a &lt;script&gt;-Tag to the DOM to load an externeal .js-file containing patterns and settings for the given language.
	 * If the given language is not in the {@link Hyphenator-supportedLangs}-Object it returns.
	 * One may ask why we are not using AJAX to load the patterns. The XMLHttpRequest-Object 
	 * has a same-origin-policy. This makes the isBookmarklet-functionality impossible.
	 * @param {string} lang The language to load the patterns for
	 * @private
	 * @see Hyphenator-basePath
	 */
	loadPatterns = function (lang) {
		var url, xhr, head, script;
		if (supportedLangs.hasOwnProperty(lang) && !Hyphenator.languages[lang]) {
	        url = basePath + 'patterns/' + supportedLangs[lang].file;
		} else {
			return;
		}
		if (isLocal && !isBookmarklet) {
			//check if 'url' is available:
			xhr = null;
			if (typeof XMLHttpRequest !== 'undefined') {
				xhr = new XMLHttpRequest();
			}
			if (!xhr) {
				try {
					xhr  = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					xhr  = null;
				}
			}
			if (xhr) {
				xhr.open('HEAD', url, true);
				xhr.setRequestHeader('Cache-Control', 'no-cache');
				xhr.onreadystatechange = function (aEvt) {
					if (xhr.readyState === 4) {
						if (xhr.status === 404) {
							onError(new Error('Could not load\n' + url));
							delete docLanguages[lang];
							return;
						}
					}
				};
				xhr.send(null);
			}
		}
		if (createElem) {
			head = window.document.getElementsByTagName('head').item(0);
			script = createElem('script', window);
			script.src = url;
			script.type = 'text/javascript';
			head.appendChild(script);
		}
	},
	
	/**
	 * @name Hyphenator-prepareLanguagesObj
	 * @description
	 * Adds a cache to each language and converts the exceptions-list to an object.
	 * If storage is active the object is stored there.
	 * @private
	 * @param {string} lang the language ob the lang-obj
	 */		
	prepareLanguagesObj = function (lang) {
		var lo = Hyphenator.languages[lang], wrd;
		if (!lo.prepared) {	
			if (enableCache) {
				lo['cache'] = {};
				//Export
				//lo['cache'] = lo.cache;
			}
			if (enableReducedPatternSet) {
				lo.redPatSet = {};
			}
			//add exceptions from the pattern file to the local 'exceptions'-obj
			if (lo.hasOwnProperty('exceptions')) {
				Hyphenator.addExceptions(lang, lo.exceptions);
				delete lo.exceptions;
			}
			//copy global exceptions to the language specific exceptions
			if (exceptions.hasOwnProperty('global')) {
				if (exceptions.hasOwnProperty(lang)) {
					exceptions[lang] += ', ' + exceptions.global;
				} else {
					exceptions[lang] = exceptions.global;
				}
			}
			//move exceptions from the the local 'exceptions'-obj to the 'language'-object
			if (exceptions.hasOwnProperty(lang)) {
				lo.exceptions = convertExceptionsToObject(exceptions[lang]);
				delete exceptions[lang];
			} else {
				lo.exceptions = {};
			}
			convertPatterns(lang);
			wrd = '[\\w' + lo.specialChars + '@' + String.fromCharCode(173) + String.fromCharCode(8204) + '-]{' + min + ',}';
			lo.genRegExp = new RegExp('(' + url + ')|(' + mail + ')|(' + wrd + ')', 'gi');
			lo.prepared = true;
		}
		if (!!storage) {
			try {
				storage.setItem('Hyphenator_' + lang, window.JSON.stringify(lo));
			} catch (e) {
				//onError(e);
			}
		}
		
	},
	
	/**
	 * @name Hyphenator-prepare
	 * @description
	 * This funtion prepares the Hyphenator-Object: If RemoteLoading is turned off, it assumes
	 * that the patternfiles are loaded, all conversions are made and the callback is called.
	 * If storage is active the object is retrieved there.
	 * If RemoteLoading is on (default), it loads the pattern files and waits until they are loaded,
	 * by repeatedly checking Hyphenator.languages. If a patterfile is loaded the patterns are
	 * converted to their object style and the lang-object extended.
	 * Finally the callback is called.
	 * @private
	 */
	prepare = function (callback) {
		var lang, interval, tmp1, tmp2;
		if (!enableRemoteLoading) {
			for (lang in Hyphenator.languages) {
				if (Hyphenator.languages.hasOwnProperty(lang)) {
					prepareLanguagesObj(lang);
				}
			}
			state = 2;
			callback('*');
			return;
		}
		// get all languages that are used and preload the patterns
		state = 1;
		for (lang in docLanguages) {
			if (docLanguages.hasOwnProperty(lang)) {
				if (!!storage && storage.getItem('Hyphenator_' + lang)) {
					Hyphenator.languages[lang] = window.JSON.parse(storage.getItem('Hyphenator_' + lang));
					if (exceptions.hasOwnProperty('global')) {
						tmp1 = convertExceptionsToObject(exceptions.global);
						for (tmp2 in tmp1) {
							if (tmp1.hasOwnProperty(tmp2)) {
								Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
							}
						}
					}
					//Replace exceptions since they may have been changed:
					if (exceptions.hasOwnProperty(lang)) {
						tmp1 = convertExceptionsToObject(exceptions[lang]);
						for (tmp2 in tmp1) {
							if (tmp1.hasOwnProperty(tmp2)) {
								Hyphenator.languages[lang].exceptions[tmp2] = tmp1[tmp2];
							}
						}
						delete exceptions[lang];
					}
					//Replace genRegExp since it may have been changed:
					tmp1 = '[\\w' + Hyphenator.languages[lang].specialChars + '@' + String.fromCharCode(173) + String.fromCharCode(8204) + '-]{' + min + ',}';
					Hyphenator.languages[lang].genRegExp = new RegExp('(' + url + ')|(' + mail + ')|(' + tmp1 + ')', 'gi');
					
					delete docLanguages[lang];
					callback(lang);
				} else {
					loadPatterns(lang);
				}
			}
		}
		// else async wait until patterns are loaded, then hyphenate
		interval = window.setInterval(function () {
			var finishedLoading = true, lang;
			for (lang in docLanguages) {
				if (docLanguages.hasOwnProperty(lang)) {
					finishedLoading = false;
					if (!!Hyphenator.languages[lang]) {
						delete docLanguages[lang];
						//do conversion while other patterns are loading:
						prepareLanguagesObj(lang);
						callback(lang);
					}
				}
			}
			if (finishedLoading) {
				window.clearInterval(interval);
				state = 2;
			}
		}, 100);
	},

	/**
	 * @name Hyphenator-switchToggleBox
	 * @description
	 * Creates or hides the toggleBox: a small button to turn off/on hyphenation on a page.
	 * @see Hyphenator.config
	 * @private
	 */		
	toggleBox = function () {
		var myBox, bdy, myIdAttribute, myTextNode, myClassAttribute,
		text = (Hyphenator.doHyphenation ? 'Hy-phen-a-tion' : 'Hyphenation');
		if (!!(myBox = contextWindow.document.getElementById('HyphenatorToggleBox'))) {
			myBox.firstChild.data = text;
		} else {
			bdy = contextWindow.document.getElementsByTagName('body')[0];
			myBox = createElem('div', contextWindow);
			myIdAttribute = contextWindow.document.createAttribute('id');
			myIdAttribute.nodeValue = 'HyphenatorToggleBox';
			myClassAttribute = contextWindow.document.createAttribute('class');
			myClassAttribute.nodeValue = dontHyphenateClass;
			myTextNode = contextWindow.document.createTextNode(text);
			myBox.appendChild(myTextNode);
			myBox.setAttributeNode(myIdAttribute);
			myBox.setAttributeNode(myClassAttribute);
			myBox.onclick =  Hyphenator.toggleHyphenation;
			myBox.style.position = 'absolute';
			myBox.style.top = '0px';
			myBox.style.right = '0px';
			myBox.style.margin = '0';
			myBox.style.backgroundColor = '#AAAAAA';
			myBox.style.color = '#FFFFFF';
			myBox.style.font = '6pt Arial';
			myBox.style.letterSpacing = '0.2em';
			myBox.style.padding = '3px';
			myBox.style.cursor = 'pointer';
			myBox.style.WebkitBorderBottomLeftRadius = '4px';
			myBox.style.MozBorderRadiusBottomleft = '4px';
			bdy.appendChild(myBox);
		}
	},


	/**
	 * @name Hyphenator-hyphenateWord
	 * @description
	 * This function is the heart of Hyphenator.js. It returns a hyphenated word.
	 *
	 * If there's already a {@link Hyphenator-hypen} in the word, the word is returned as it is.
	 * If the word is in the exceptions list or in the cache, it is retrieved from it.
	 * If there's a '-' put a zeroWidthSpace after the '-' and hyphenate the parts.
	 * @param {string} lang The language of the word
	 * @param {string} word The word
	 * @returns string The hyphenated word
	 * @public
	 */	
	hyphenateWord = function (lang, word) {
		var lo = Hyphenator.languages[lang], parts, l, subst,
			w, characters, originalCharacters, wordLength, i, j, k, node, points = [],
			characterPoints = [], nodePoints, nodePointsLength, m = Math.max, trie,
			result = [''], pattern;
		if (word === '') {
			return '';
		}
		if (word.indexOf(hyphen) !== -1) {
			//word already contains shy; -> leave at it is!
			return word;
		}
		if (enableCache && lo.cache.hasOwnProperty(word)) { //the word is in the cache
			return lo.cache[word];
		}
		if (lo.exceptions.hasOwnProperty(word)) { //the word is in the exceptions list
			return lo.exceptions[word].replace(/-/g, hyphen);
		}
		if (word.indexOf('-') !== -1) {
			//word contains '-' -> hyphenate the parts separated with '-'
			parts = word.split('-');
			for (i = 0, l = parts.length; i < l; i++) {
				parts[i] = hyphenateWord(lang, parts[i]);
			}
			return parts.join('-');
		}
		w = word = '_' + word + '_';
		if (!!lo.charSubstitution) {
			for (subst in lo.charSubstitution) {
				if (lo.charSubstitution.hasOwnProperty(subst)) {
					w = w.replace(new RegExp(subst, 'g'), lo.charSubstitution[subst]);
				}
			}
		}
		if (word.indexOf("'") !== -1) {
			w = w.replace("'", "’"); //replace APOSTROPHE with RIGHT SINGLE QUOTATION MARK (since the latter is used in the patterns)
		}
		/** @license BSD licenced code
		 * The following code is based on code from hypher.js
		 * Copyright (c) 2011, Bram Stein
		 */
		characters = w.toLowerCase().split('');
		originalCharacters = word.split('');
		wordLength = characters.length;
		trie = lo.patterns;
		for (i = 0; i < wordLength; i += 1) {
			points[i] = 0;
			characterPoints[i] = characters[i].charCodeAt(0);
		}
		for (i = 0; i < wordLength; i += 1) {
			pattern = '';
			node = trie;
			for (j = i; j < wordLength; j += 1) {
				node = node[characterPoints[j]];
				if (node) {
					if (enableReducedPatternSet) {
						pattern += String.fromCharCode(characterPoints[j]);
					}
					nodePoints = node.tpoints;
					if (nodePoints) {
						if (enableReducedPatternSet) {
							if (!lo.redPatSet) {
								lo.redPatSet = {};
							}
							lo.redPatSet[pattern] = recreatePattern(pattern, nodePoints);
						}
						for (k = 0, nodePointsLength = nodePoints.length; k < nodePointsLength; k += 1) {
							points[i + k] = m(points[i + k], nodePoints[k]);
						}
					}
				} else {
					break;
				}
			}
		}
		for (i = 1; i < wordLength - 1; i += 1) {
			if (i > lo.leftmin && i < (wordLength - lo.rightmin) && points[i] % 2) {
				result.push(originalCharacters[i]);
			} else {
				result[result.length - 1] += originalCharacters[i];
			}
		}
		return result.join(hyphen);
		/**
		 * end of BSD licenced code from hypher.js
		 */
	},
		
	/**
	 * @name Hyphenator-hyphenateURL
	 * @description
	 * Puts {@link Hyphenator-urlhyphen} after each no-alphanumeric char that my be in a URL.
	 * @param {string} url to hyphenate
	 * @returns string the hyphenated URL
	 * @public
	 */
	hyphenateURL = function (url) {
		return url.replace(/([:\/\.\?#&_,;!@]+)/gi, '$&' + urlhyphen);
	},

	/**
	 * @name Hyphenator-removeHyphenationFromElement
	 * @description
	 * Removes all hyphens from the element. If there are other elements, the function is
	 * called recursively.
	 * Removing hyphens is usefull if you like to copy text. Some browsers are buggy when the copy hyphenated texts.
	 * @param {Object} el The element where to remove hyphenation.
	 * @public
	 */
	removeHyphenationFromElement = function (el) {
		var h, i = 0, n;
		switch (hyphen) {
		case '|':
			h = '\\|';
			break;
		case '+':
			h = '\\+';
			break;
		case '*':
			h = '\\*';
			break;
		default:
			h = hyphen;
		}
		while (!!(n = el.childNodes[i++])) {
			if (n.nodeType === 3) {
				n.data = n.data.replace(new RegExp(h, 'g'), '');
				n.data = n.data.replace(new RegExp(zeroWidthSpace, 'g'), '');
			} else if (n.nodeType === 1) {
				removeHyphenationFromElement(n);
			}
		}
	},
	
	
	/**
	 * @name Hyphenator-registerOnCopy
	 * @description
	 * Huge work-around for browser-inconsistency when it comes to
	 * copying of hyphenated text.
	 * The idea behind this code has been provided by http://github.com/aristus/sweet-justice
	 * sweet-justice is under BSD-License
	 * @private
	 */
	registerOnCopy = function (el) {
		var body = el.ownerDocument.getElementsByTagName('body')[0],
		shadow,
		selection,
		range,
		rangeShadow,
		restore,
		oncopyHandler = function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement,
			currDoc = target.ownerDocument,
			body = currDoc.getElementsByTagName('body')[0],
			targetWindow = currDoc.defaultView || currDoc.parentWindow;
			if (target.tagName && dontHyphenate[target.tagName.toLowerCase()]) {
				//Safari needs this
				return;
			}
			//create a hidden shadow element
			shadow = currDoc.createElement('div');
			//Moving the element out of the screen doesn't work for IE9 (https://connect.microsoft.com/IE/feedback/details/663981/)
			//shadow.style.overflow = 'hidden';
			//shadow.style.position = 'absolute';
			//shadow.style.top = '-5000px';
			//shadow.style.height = '1px';
			//doing this instead:
			shadow.style.color = window.getComputedStyle ? targetWindow.getComputedStyle(body, null).backgroundColor : '#FFFFFF';
			shadow.style.fontSize = '0px';
			body.appendChild(shadow);
			if (!!window.getSelection) {
				//FF3, Webkit, IE9
				e.stopPropagation();
				selection = targetWindow.getSelection();
				range = selection.getRangeAt(0);
				shadow.appendChild(range.cloneContents());
				removeHyphenationFromElement(shadow);
				selection.selectAllChildren(shadow);
				restore = function () {
					shadow.parentNode.removeChild(shadow);
					selection.removeAllRanges(); //IE9 needs that
					selection.addRange(range);
				};
			} else {
				// IE<9
				e.cancelBubble = true;
				selection = targetWindow.document.selection;
				range = selection.createRange();
				shadow.innerHTML = range.htmlText;
				removeHyphenationFromElement(shadow);
				rangeShadow = body.createTextRange();
				rangeShadow.moveToElementText(shadow);
				rangeShadow.select();
				restore = function () {
					shadow.parentNode.removeChild(shadow);
					if (range.text !== "") {
						range.select();
					}
				};
			}
			window.setTimeout(restore, 0);
		};
		if (!body) {
			return;
		}
		el = el || body;
		if (window.addEventListener) {
			el.addEventListener("copy", oncopyHandler, true);
		} else {
			el.attachEvent("oncopy", oncopyHandler);
		}
	},
	
		
	/**
	 * @name Hyphenator-unhideElement
	 * @description
	 * Unhides an element and removes the visibility attr if set by hyphenator
	 * @param Object The Element object from ElementCollection
	 * @private
	 */	
	unhideElement = function (elo) {
		var el = elo.element,
		hyphenatorSettings = elo.data;
		el.style.visibility = 'visible';
		elo.data.isHidden = false;
		if (!hyphenatorSettings.hasOwnStyle) {
			el.setAttribute('style', ''); // without this, removeAttribute doesn't work in Safari (thanks to molily)
			el.removeAttribute('style');
		} else {
			if (el.style.removeProperty) {
				el.style.removeProperty('visibility');
			} else if (el.style.removeAttribute) { // IE
				el.style.removeAttribute('visibility');
			}  
		}
	},

	/**
	 * @name Hyphenator-checkIfAllDone
	 * @description
	 * Checks if all Elements are hyphenated, unhides them and fires onHyphenationDone()
	 * @private
	 */		
	checkIfAllDone = function () {
		var allDone = true, i;
		elements.each(function (lang, list) {
			var i, l = list.length;
			for (i = 0; i < l; i++) {
				allDone = allDone && list[i].hyphenated;
				/*if (intermediateState === 'hidden' && unhide === 'wait') {
					unhideElement(list[i]);
				}*/
			}
		});
		if (allDone) {
			for (i = 0; i < CSSEditors.length; i++) {
				CSSEditors[i].clearChanges();
			}
			state = 3;
			onHyphenationDone();
		}
	},


	/**
	 * @name Hyphenator-hyphenateElement
	 * @description
	 * Takes the content of the given element and - if there's text - replaces the words
	 * by hyphenated words. If there's another element, the function is called recursively.
	 * When all words are hyphenated, the visibility of the element is set to 'visible'.
	 * @param {Object} el The element to hyphenate
	 * @private
	 */
	hyphenateElement = function (lang, elo) {
		var hyphenatorSettings = elo.data,
			el = elo.element,
			hyphenate, n, i,
			controlOrphans = function (part) {
				var h, r;
				switch (hyphen) {
				case '|':
					h = '\\|';
					break;
				case '+':
					h = '\\+';
					break;
				case '*':
					h = '\\*';
					break;
				default:
					h = hyphen;
				}
				if (orphanControl >= 2) {
					//remove hyphen points from last word
					r = part.split(' ');
					r[1] = r[1].replace(new RegExp(h, 'g'), '');
					r[1] = r[1].replace(new RegExp(zeroWidthSpace, 'g'), '');
					r = r.join(' ');
				}
				if (orphanControl === 3) {
					//replace spaces by non breaking spaces
					r = r.replace(/[ ]+/g, String.fromCharCode(160));
				}
				return r;
			};
		if (Hyphenator.languages.hasOwnProperty(lang)) {
			hyphenate = function (word) {
				if (!Hyphenator.doHyphenation) {
					return word;
				} else if (urlOrMailRE.test(word)) {
					return hyphenateURL(word);
				} else {
					return hyphenateWord(lang, word);
				}
			};
			if (safeCopy && (el.tagName.toLowerCase() !== 'body')) {
				registerOnCopy(el);
			}
			i = 0;
			while (!!(n = el.childNodes[i++])) {
				if (n.nodeType === 3 && n.data.length >= min) { //type 3 = #text -> hyphenate!
					n.data = n.data.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
					if (orphanControl !== 1) {
						n.data = n.data.replace(/[\S]+ [\S]+$/, controlOrphans);
					}
				}
			}
		}
		if (hyphenatorSettings.isHidden && intermediateState === 'hidden' && unhide === 'progressive') {
			unhideElement(elo);
		}
		elo.hyphenated = true;
		elements.hyCount += 1;
		if (elements.count <= elements.hyCount) {
			checkIfAllDone();
		}
	},
	

	/**
	 * @name Hyphenator-hyphenateLanguageElements
	 * @description
	 * Calls hyphenateElement() for all elements of the specified language.
	 * If the language is '*' then all elements are hyphenated.
	 * This is done with a setTimout
	 * to prevent a "long running Script"-alert when hyphenating large pages.
	 * Therefore a tricky bind()-function was necessary.
	 * @private
	 */
	hyphenateLanguageElements = function (lang) {
		function bind(fun, arg1, arg2) {
			return function () {
				return fun(arg1, arg2);
			};
		}
		var el, i, l;
		if (lang === '*') {
			elements.each(function (lang, langels) {
				var i, l = langels.length;
				for (i = 0; i < l; i++) {
					window.setTimeout(bind(hyphenateElement, lang, langels[i]), 0);
				}
			});
		} else {
			if (elements.list.hasOwnProperty(lang)) {
				l = elements.list[lang].length;
				for (i = 0; i < l; i++) {
					window.setTimeout(bind(hyphenateElement, lang, elements.list[lang][i]), 0);
				}
			}
		}
	},
	
	/**
	 * @name Hyphenator-removeHyphenationFromDocument
	 * @description
	 * Does what it says ;-)
	 * @private
	 */
	removeHyphenationFromDocument = function () {
		elements.each(function (lang, elo) {
			var i, l = elo.length, el;
			for (i = 0; i < l; i++) {
				removeHyphenationFromElement(elo[i].element);
				elo[i].hyphenated = false;
			}
		});
		state = 4;
	},
		
	/**
	 * @name Hyphenator-createStorage
	 * @description
	 * inits the private var storage depending of the setting in storageType
	 * and the supported features of the system.
	 * @private
	 */
	createStorage = function () {
		try {
			if (storageType !== 'none' &&
				typeof(window.localStorage) !== 'undefined' &&
				typeof(window.sessionStorage) !== 'undefined' &&
				typeof(window.JSON.stringify) !== 'undefined' &&
				typeof(window.JSON.parse) !== 'undefined') {
				switch (storageType) {
				case 'session':
					storage = window.sessionStorage;
					break;
				case 'local':
					storage = window.localStorage;
					break;
				default:
					storage = undefined;
					break;
				}
			}
		} catch (f) {
			//FF throws an error if DOM.storage.enabled is set to false
		}
	},
	
	/**
	 * @name Hyphenator-storeConfiguration
	 * @description
	 * Stores the current config-options in DOM-Storage
	 * @private
	 */
	storeConfiguration = function () {
		if (!storage) {
			return;
		}
		var settings = {
			'STORED': true,
			'classname': hyphenateClass,
			'donthyphenateclassname': dontHyphenateClass,
			'minwordlength': min,
			'hyphenchar': hyphen,
			'urlhyphenchar': urlhyphen,
			'togglebox': toggleBox,
			'displaytogglebox': displayToggleBox,
			'remoteloading': enableRemoteLoading,
			'enablecache': enableCache,
			'onhyphenationdonecallback': onHyphenationDone,
			'onerrorhandler': onError,
			'intermediatestate': intermediateState,
			'selectorfunction': selectorFunction,
			'safecopy': safeCopy,
			'doframes': doFrames,
			'storagetype': storageType,
			'orphancontrol': orphanControl,
			'dohyphenation': Hyphenator.doHyphenation,
			'persistentconfig': persistentConfig,
			'defaultlanguage': defaultLanguage
		};
		storage.setItem('Hyphenator_config', window.JSON.stringify(settings));
	},
	
	/**
	 * @name Hyphenator-restoreConfiguration
	 * @description
	 * Retrieves config-options from DOM-Storage and does configuration accordingly
	 * @private
	 */
	restoreConfiguration = function () {
		var settings;
		if (storage.getItem('Hyphenator_config')) {
			settings = window.JSON.parse(storage.getItem('Hyphenator_config'));
			Hyphenator.config(settings);
		}
	};

	return {
		
		/**
		 * @name Hyphenator.version
		 * @memberOf Hyphenator
		 * @description
		 * String containing the actual version of Hyphenator.js
		 * [major release].[minor releas].[bugfix release]
		 * major release: new API, new Features, big changes
		 * minor release: new languages, improvements
		 * @public
         */		
		version: 'X.Y.Z',

		/**
		 * @name Hyphenator.doHyphenation
		 * @description
		 * If doHyphenation is set to false (defaults to true), hyphenateDocument() isn't called.
		 * All other actions are performed.
		 */		
		doHyphenation: true,
		
		/**
		 * @name Hyphenator.languages
		 * @memberOf Hyphenator
		 * @description
		 * Objects that holds key-value pairs, where key is the language and the value is the
		 * language-object loaded from (and set by) the pattern file.
		 * The language object holds the following members:
		 * <table>
		 * <tr><th>key</th><th>desc></th></tr>
		 * <tr><td>leftmin</td><td>The minimum of chars to remain on the old line</td></tr>
		 * <tr><td>rightmin</td><td>The minimum of chars to go on the new line</td></tr>
		 * <tr><td>shortestPattern</td><td>The shortes pattern (numbers don't count!)</td></tr>
		 * <tr><td>longestPattern</td><td>The longest pattern (numbers don't count!)</td></tr>
		 * <tr><td>specialChars</td><td>Non-ASCII chars in the alphabet.</td></tr>
		 * <tr><td>patterns</td><td>the patterns</td></tr>
		 * </table>
		 * And optionally (or after prepareLanguagesObj() has been called):
		 * <table>
		 * <tr><td>exceptions</td><td>Excpetions for the secified language</td></tr>
		 * </table>
		 * @public
         */		
		languages: {},
		

		/**
		 * @name Hyphenator.config
			 * @description
		 * Config function that takes an object as an argument. The object contains key-value-pairs
		 * containig Hyphenator-settings. This is a shortcut for calling Hyphenator.set...-Methods.
		 * @param {Object} obj <table>
		 * <tr><th>key</th><th>values</th><th>default</th></tr>
		 * <tr><td>classname</td><td>string</td><td>'hyphenate'</td></tr>
		 * <tr><td>donthyphenateclassname</td><td>string</td><td>''</td></tr>
		 * <tr><td>minwordlength</td><td>integer</td><td>6</td></tr>
		 * <tr><td>hyphenchar</td><td>string</td><td>'&amp;shy;'</td></tr>
		 * <tr><td>urlhyphenchar</td><td>string</td><td>'zero with space'</td></tr>
		 * <tr><td>togglebox</td><td>function</td><td>see code</td></tr>
		 * <tr><td>displaytogglebox</td><td>boolean</td><td>false</td></tr>
		 * <tr><td>remoteloading</td><td>boolean</td><td>true</td></tr>
		 * <tr><td>enablecache</td><td>boolean</td><td>true</td></tr>
		 * <tr><td>enablereducedpatternset</td><td>boolean</td><td>false</td></tr>
		 * <tr><td>onhyphenationdonecallback</td><td>function</td><td>empty function</td></tr>
		 * <tr><td>onerrorhandler</td><td>function</td><td>alert(onError)</td></tr>
		 * <tr><td>intermediatestate</td><td>string</td><td>'hidden'</td></tr>
		 * <tr><td>selectorfunction</td><td>function</td><td>[…]</td></tr>
		 * <tr><td>safecopy</td><td>boolean</td><td>true</td></tr>
		 * <tr><td>doframes</td><td>boolean</td><td>false</td></tr>
		 * <tr><td>storagetype</td><td>string</td><td>'none'</td></tr>
		 * </table>
		 * @public
		 * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *     Hyphenator.config({'minwordlength':4,'hyphenchar':'|'});
         *     Hyphenator.run();
         * &lt;/script&gt;
         */
		config: function (obj) {
			var assert = function (name, type) {
					if (typeof obj[name] === type) {
						return true;
					} else {
						onError(new Error('Config onError: ' + name + ' must be of type ' + type));
						return false;
					}
				},
				key;

			if (obj.hasOwnProperty('storagetype')) {
				if (assert('storagetype', 'string')) {
					storageType = obj.storagetype;
				}
				if (!storage) {
					createStorage();
				}			
			}
			if (!obj.hasOwnProperty('STORED') && storage && obj.hasOwnProperty('persistentconfig') && obj.persistentconfig === true) {
				restoreConfiguration();
			}
			
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					switch (key) {
					case 'STORED':
						break;
					case 'classname':
						if (assert('classname', 'string')) {
							hyphenateClass = obj[key];
						}
						break;
					case 'donthyphenateclassname':
						if (assert('donthyphenateclassname', 'string')) {
							dontHyphenateClass = obj[key];
						}						
						break;
					case 'minwordlength':
						if (assert('minwordlength', 'number')) {
							min = obj[key];
						}
						break;
					case 'hyphenchar':
						if (assert('hyphenchar', 'string')) {
							if (obj.hyphenchar === '&shy;') {
								obj.hyphenchar = String.fromCharCode(173);
							}
							hyphen = obj[key];
						}
						break;
					case 'urlhyphenchar':
						if (obj.hasOwnProperty('urlhyphenchar')) {
							if (assert('urlhyphenchar', 'string')) {
								urlhyphen = obj[key];
							}
						}
						break;
					case 'togglebox':
						if (assert('togglebox', 'function')) {
							toggleBox = obj[key];
						}
						break;
					case 'displaytogglebox':
						if (assert('displaytogglebox', 'boolean')) {
							displayToggleBox = obj[key];
						}
						break;
					case 'remoteloading':
						if (assert('remoteloading', 'boolean')) {
							enableRemoteLoading = obj[key];
						}
						break;
					case 'enablecache':
						if (assert('enablecache', 'boolean')) {
							enableCache = obj[key];
						}
						break;
					case 'enablereducedpatternset':
						if (assert('enablereducedpatternset', 'boolean')) {
							enableReducedPatternSet = obj[key];
						}
						break;
					case 'onhyphenationdonecallback':
						if (assert('onhyphenationdonecallback', 'function')) {
							onHyphenationDone = obj[key];
						}
						break;
					case 'onerrorhandler':
						if (assert('onerrorhandler', 'function')) {
							onError = obj[key];
						}
						break;
					case 'intermediatestate':
						if (assert('intermediatestate', 'string')) {
							intermediateState = obj[key];
						}
						break;
					case 'selectorfunction':
						if (assert('selectorfunction', 'function')) {
							selectorFunction = obj[key];
						}
						break;
					case 'safecopy':
						if (assert('safecopy', 'boolean')) {
							safeCopy = obj[key];
						}
						break;
					case 'doframes':
						if (assert('doframes', 'boolean')) {
							doFrames = obj[key];
						}
						break;
					case 'storagetype':
						if (assert('storagetype', 'string')) {
							storageType = obj[key];
						}						
						break;
					case 'orphancontrol':
						if (assert('orphancontrol', 'number')) {
							orphanControl = obj[key];
						}
						break;
					case 'dohyphenation':
						if (assert('dohyphenation', 'boolean')) {
							Hyphenator.doHyphenation = obj[key];
						}
						break;
					case 'persistentconfig':
						if (assert('persistentconfig', 'boolean')) {
							persistentConfig = obj[key];
						}
						break;
					case 'defaultlanguage':
						if (assert('defaultlanguage', 'string')) {
							defaultLanguage = obj[key];
						}
						break;
					case 'useCSS3hyphenation':
						if (assert('useCSS3hyphenation', 'boolean')) {
							css3 = obj[key];
						}
						break;
					case 'unhide':
						if (assert('unhide', 'string')) {
							unhide = obj[key];
						}
						break;
					default:
						onError(new Error('Hyphenator.config: property ' + key + ' not known.'));
					}
				}
			}
			if (storage && persistentConfig) {
				storeConfiguration();
			}
		},

		/**
		 * @name Hyphenator.run
			 * @description
		 * Bootstrap function that starts all hyphenation processes when called.
		 * @public
		 * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *   Hyphenator.run();
         * &lt;/script&gt;
         */
		run: function () {
			documentCount = 0;
			var process = function () {
				try {
					if (contextWindow.document.getElementsByTagName('frameset').length > 0) {
						return; //we are in a frameset
					}
					documentCount++;
					autoSetMainLanguage(undefined);
					gatherDocumentInfos();
					prepare(hyphenateLanguageElements);
					if (displayToggleBox) {
						toggleBox();
					}
				} catch (e) {
					onError(e);
				}
			}, i, haveAccess, fl = window.frames.length;
			
			if (!storage) {
				createStorage();
			}
			if (!documentLoaded && !isBookmarklet) {
				runOnContentLoaded(window, process);
			}
			if (isBookmarklet || documentLoaded) {
				if (doFrames && fl > 0) {
					for (i = 0; i < fl; i++) {
						haveAccess = undefined;
						//try catch isn't enough for webkit
						try {
							//opera throws only on document.toString-access
							haveAccess = window.frames[i].document.toString();
						} catch (e) {
							haveAccess = undefined;
						}
						if (!!haveAccess) {
							contextWindow = window.frames[i];
							process();
						}						
					}
				}
				contextWindow = window;
				process();
			}
		},
		
		/**
		 * @name Hyphenator.addExceptions
			 * @description
		 * Adds the exceptions from the string to the appropriate language in the 
		 * {@link Hyphenator-languages}-object
		 * @param {string} lang The language
		 * @param {string} words A comma separated string of hyphenated words WITH spaces.
		 * @public
		 * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
         *   Hyphenator.addExceptions('de','ziem-lich, Wach-stube');
         *   Hyphenator.run();
         * &lt;/script&gt;
         */
		addExceptions: function (lang, words) {
			if (lang === '') {
				lang = 'global';
			}
			if (exceptions.hasOwnProperty(lang)) {
				exceptions[lang] += ", " + words;
			} else {
				exceptions[lang] = words;
			}
		},
		
		/**
		 * @name Hyphenator.hyphenate
			 * @public
		 * @description
		 * Hyphenates the target. The language patterns must be loaded.
		 * If the target is a string, the hyphenated string is returned,
		 * if it's an object, the values are hyphenated directly.
		 * @param {string|Object} target the target to be hyphenated
		 * @param {string} lang the language of the target
		 * @returns string
		 * @example &lt;script src = "Hyphenator.js" type = "text/javascript"&gt;&lt;/script&gt;
		 * &lt;script src = "patterns/en.js" type = "text/javascript"&gt;&lt;/script&gt;
         * &lt;script type = "text/javascript"&gt;
		 * var t = Hyphenator.hyphenate('Hyphenation', 'en'); //Hy|phen|ation
		 * &lt;/script&gt;
		 */
		hyphenate: function (target, lang) {
			var hyphenate, n, i;
			if (Hyphenator.languages.hasOwnProperty(lang)) {
				if (!Hyphenator.languages[lang].prepared) {
					prepareLanguagesObj(lang);
				}
				hyphenate = function (word) {
					if (urlOrMailRE.test(word)) {
						return hyphenateURL(word);
					} else {
						return hyphenateWord(lang, word);
					}
				};
				if (typeof target === 'string' || target.constructor === String) {
					return target.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
				} else if (typeof target === 'object') {
					i = 0;
					while (!!(n = target.childNodes[i++])) {
						if (n.nodeType === 3 && n.data.length >= min) { //type 3 = #text -> hyphenate!
							n.data = n.data.replace(Hyphenator.languages[lang].genRegExp, hyphenate);
						} else if (n.nodeType === 1) {
							if (n.lang !== '') {
								Hyphenator.hyphenate(n, n.lang);
							} else {
								Hyphenator.hyphenate(n, lang);
							}
						}
					}
				}
			} else {
				onError(new Error('Language "' + lang + '" is not loaded.'));
			}
		},
		
		/**
		 * @name Hyphenator.getRedPatternSet
			 * @description
		 * Returns {@link Hyphenator-isBookmarklet}.
		 * @param {string} lang the language patterns are stored for
		 * @returns object {'patk': pat}
		 * @public
         */
		getRedPatternSet: function (lang) {
			return Hyphenator.languages[lang].redPatSet;
		},
		
		/**
		 * @name Hyphenator.isBookmarklet
			 * @description
		 * Returns {@link Hyphenator-isBookmarklet}.
		 * @returns boolean
		 * @public
         */
		isBookmarklet: function () {
			return isBookmarklet;
		},

		getConfigFromURI: function () {
			var loc = null, re = {}, jsArray = document.getElementsByTagName('script'), i, j, l, s, gp, option;
			for (i = 0, l = jsArray.length; i < l; i++) {
				if (!!jsArray[i].getAttribute('src')) {
					loc = jsArray[i].getAttribute('src');
				}
				if (loc && (loc.indexOf('Hyphenator.js?') !== -1)) {
					s = loc.indexOf('Hyphenator.js?');
					gp = loc.substring(s + 14).split('&');
					for (j = 0; j < gp.length; j++) {
						option = gp[j].split('=');
						if (option[0] !== 'bm') {
							if (option[1] === 'true') {
								option[1] = true;
							} else if (option[1] === 'false') {
								option[1] = false;
							} else if (isFinite(option[1])) {
								option[1] = parseInt(option[1], 10);
							}
							if (option[0] === 'onhyphenationdonecallback') {
								option[1] = new Function('', option[1]);
							}
							re[option[0]] = option[1];
						}
					}
					break;
				}
			}
			return re;
		},

		/**
		 * @name Hyphenator.toggleHyphenation
			 * @description
		 * Checks the current state of the ToggleBox and removes or does hyphenation.
		 * @public
         */
		toggleHyphenation: function () {
			if (Hyphenator.doHyphenation) {
				removeHyphenationFromDocument();
				Hyphenator.doHyphenation = false;
				storeConfiguration();
				toggleBox();
			} else {
				hyphenateLanguageElements('*');
				Hyphenator.doHyphenation = true;
				storeConfiguration();
				toggleBox();
			}
		}
	};
}(window));

//Export properties/methods (for google closure compiler)
/* to be moved to external file
Hyphenator['languages'] = Hyphenator.languages;
Hyphenator['config'] = Hyphenator.config;
Hyphenator['run'] = Hyphenator.run;
Hyphenator['addExceptions'] = Hyphenator.addExceptions;
Hyphenator['hyphenate'] = Hyphenator.hyphenate;
Hyphenator['getRedPatternSet'] = Hyphenator.getRedPatternSet;
Hyphenator['isBookmarklet'] = Hyphenator.isBookmarklet;
Hyphenator['getConfigFromURI'] = Hyphenator.getConfigFromURI;
Hyphenator['toggleHyphenation'] = Hyphenator.toggleHyphenation;
window['Hyphenator'] = Hyphenator;
*/
if (Hyphenator.isBookmarklet()) {
	Hyphenator.config({displaytogglebox: true, intermediatestate: 'visible', doframes: true, useCSS3hyphenation: true});
	Hyphenator.config(Hyphenator.getConfigFromURI());
	Hyphenator.run();
}

// The en-GB hyphenation patterns are retrieved from
// http://tug_org/svn/texhyphen/trunk/collaboration/repository/hyphenator/
Hyphenator.languages['en-gb'] = {
	leftmin : 2,
	rightmin : 3,
	specialChars : "",
	patterns : {
		3 : "sw2s2ym1p2chck1cl2cn2st24sss1rzz21moc1qcr2m5q2ct2byb1vcz2z5sd3bs1jbr4m3rs2hd2gbo2t3gd1jb1j1dosc2d1pdr2dt4m1v1dum3w2myd1vea2r2zr1we1bb2e2edn1az1irt2e1fe1j4aya4xr1q2av2tlzd4r2kr1jer1m1frh2r1fr2er1bqu44qft3ptr22ffy3wyv4y3ufl21fo1po2pn2ft3fut1wg1ba2ra4q2gh4ucm2ep5gp1fm5d2ap2aom1cg3p2gyuf2ha2h1bh1ch1d4nda2nhe22oz2oyo4xh1fh5h4hl2ot2hrun1h1wh2y2yp2aki2d2upie22ah2oo2igu4r2ii2omo1j2oiyn1lz42ip2iq2ir1aba4a2ocn3fuu4uv22ix1iz1jay1iy1h2lylx4l3wn5w2ji4jr4ng4jsy1gk1ck1fkk4y5fk1mkn21vok1pvr44vsk1t4vyk5vk1wl2aw5cn2ul3bw5fwh2wi2w1m1wowt4wy2wz4x1an1in1rn1ql3hxe4x1hx1ill24lsn3mlm2n1jx1ox3plr4x5wxx4",
		4 : "d3gr_fi2xy3ty1a2x5usy5acx1urxu4on2ielph2xti4ni2gx4thn2ilx1t2x1s25niql3rix4osxo4n1logn2ivx5om1locl3ro2lo_l3nel1n4_hi2l5rul1mexi4pl1max3io_ex1l1lu_ig3ll5tll3sll3p_in14n2kl1loll3mn3le_ew4n1n4nne4l1lixi4cll3fn3nil1lal5skls4p_eu14no_l4ivx3erx3enl1itx1eml1isx5eg3lirli1qxe2d3lik5lihx1ec1lig4y1bn1oun4ow4li_x3c4yb2il1g2l2fox2as1leyn3p42lev1letx2ag4ni_l1te_es1nhy2yc1l4n1sw3tow5tenho4ns2cwra42lerle5qn2si3womwol4l1try1d4lek42ledwl1in3suw3la4le_l3don1teldi2nth2lce4yda4l1c2l1tu4lu_l4by_od4lbe4lu1a4laz_oi4l4awnt2iwes4l4aul4asn2tjla4p_or1n1tr5wein1tun2tyn1h2w4ednu1awe4b5nuc_os13nudl4all4af_ov4w3drl4aey3eenu3iw1b45nukl4ac5laa4la_4lue3kyllu1in1gu4wabn1go_ph2v5vikur5_en12vv2ks4ty3enk3slv5rov5ri4k1sk3rung1n2vowy1erkol4ko5a4vonk2novo2l2vo_5lupn2gingh4k3lok3lik3lak2l2ng2aki4wvi2tkis4k1inki2l5kihk3holu1vke4g3kee4kedkdo4_sa2k5d2_eg4k1b4kav4kap4vim4ka3ovi4lk4ann3v2nve2vic2ka4lju1v4vi_ju5ljui4_sh2ygi2nfo4_st44jo_3jo2jil43jigl4vi2vel3veive3gjew3jeu42ve_4jesjeo2y3gljal43jac2ja__th44ly_2izz_ti22izo_do2i5yeix3oy3in2i1wn2x4i2vov4ad2ny25nyc5vacn1z24va_nzy4uy4aux2o2oa2o3ag2ivauve2u4vayle2i3um2ittly1c4obau3tu2itrob2i4obo_up12ithob5tuts2lym2ut2o_ve2oc2ait1a2isyo1clo1crut2ioct2is1pis1lo1cy4usto2doo2du4isblyp2n4ew2ab_2abai4saoe3a2abbus1pir2sir4qoe4do5eeir1ioep5o5eqo3er2usco1etir1a3lyr3lywipy43oeuo3evi3poab1ro3ex4ofo2o1gur1uo2ga2abyac2a3lyzi5oxo3gii3oti1orioe4ur2so2gui1od2io22acio1h2ur1o2inuo3hao3heohy44ma_oi4cins24inqoig4ac1r2ino2inn4inl4inkur1ioi4our2f4oisoi4t2iniynd4ok3lok5u2ind2inco1loyn2eo1mai2moom1iur2ca2doim1iil3v4iluon1co2nead1ril3f4onh2ik24iju4adyae5aija4i5in4aed2mahae5gihy4ae5pur1aae4s2i1h4igions2i1geyng42ont4af_4afe5maka4fui3fyu2pri3foon2zn1eru4po4agli2fe2i1foo1iu1ph4ieua2groo4moo2pyn4yi1er4iemie5ia1heah4n4iec2ai24ai_ai3aa1icne2p4idraig2oo2tu1peo1paop1iy1o2u1ouu3os4oplid1ayo3d2icuop1uor1a2ick4ich2a1ja4ju2mam4iceak5u4ibuunu44iboib1i2oreiav4i3aui3atun5ror1iun5o2alei5aii3ah2unniaf4i5ae2ormhy4thyr4hy3ohyn4hy2m2orthy2l1man2nedhuz4un2ihu4gh1th4alko1sch4skhsi42mapu1mu2h1shry4hri4hre41mar4h1pum2ph2ou4osp4osuy2ph4oth4ho_u1mi2h1mh1leh3la2ne_h4irhi2pu1mao4u2oub2h1in2a2mhi4l4oueu1lu2ulsoug4h1ic2hi_u1loul3mnde24ulln2daheu2ul2iou3mam1ihet12ounhep1ow1iows4ow5yyp1nox3ih4eiox5oypo1oy5aoys4u1la4ul_am2pu2izmav4h2ea4he_y2prhdu42m1ban2ao1zo_ch4mb4dy5pu4pa_ha4m1paru2ic5pau2ui2h4ac4ha_u4gon1cug5z2uft43gynu4fou3fl3ufa5gymmb2iue4tgy2b4anhnc1t2g1w5paw3gun2p1bu4edueb4p1c42guep5d2an1og5to2pe_gs4tgs4c2g1san2s2ped3grug4rou2dog4reud4g1gr2n1crgov12gou3gosud4e3goop4ee3goe5god3goc5goa2go_pe2fg2nog1niuc3lg1na2gn2an2y2pes3gluyr4r3pet5aowyr4s4ap_4apa3glo4pexyr5uu4ch2gl24y2s5gip2me_3gioap1i2ph_gi4g3gib4gi_uba41g2igh2tg3hoa2prphe44aps2medg2gegg4ame2g2g1gy3shu1alua5hu2ag2g1f3get2ua2ph2lge4o1pho2tz23gen4phs1gel1typ4gef2ge_g5d4me2m1phug1at4pi_p2iety4a4ty_p2ilt3wopim23gait2wi3gagn3b44ga_5piqar3har1i1tutfu4c4fu_1menp2l23tunna2vfs4p2f3s1pla1fr2tu1ifo3v4tufp4ly2p1myso53foo2arrme4par2stu1afo2n4tu_4po_t2tytt5s3pod2aru4poffo2e3foc4fo_ar5zas1ays1t3flu2asc3flo3flan2asas2et3ti2fin5poypph44f5hf3fr1pr2f1fif1fena5o3feufe4t4pry2ps22asotta4p3sh5fei3fecass2p1sits2its4ht2sc2fe_4t1s2f5d4f5b5faw5farp1st2pt2as1u2fa_1f2aeyl44ey_1expe1wre3whe1waevu4p4trp1tupub1puc4p4uneus44eumeuk5eue4p4uset5zyzy4z1a14p1wet2t2p4y4tovpy3e3pyg3pylpy5t2za__av44ra_r2adras2et2ae1su1namr2bat1orr2berb2ir1c2r2clrct4nak24re_rea4e2sc4es_2erza2to5tok2erurei4erk44erj1tog3toere1qre1vza2irf4lr1g2r2gez4as4ri_2ereto1b2erd2to_2erc4m3hri3ori5reph14mi_2au24au_m1ic4auc4t3me1paeo3mt1lieo2leof2eo3b4enur1lar1leaun2r1loen2sen1ot1laen3kzeb4r1mur2n24ene2end3tiurn5nrnt4ze4d4ro_r2od4roiroo4r2opelv4e1lur4owti4q1tip4roxrpe2r2ph1tior3puaw1i5nahaw5y4mijr3ri_as12eleay3mayn4ays2r5rurry5ek4l2az2m2ilaze4e2ize2iv4eis2ba_t1ineig24eifeid45bahba4ir2seehy21timeh5se5hoe1h2e2gr2efuef4lna2ceep1ee2mee1iee5gee2fr3su2na_rt3ced4g1basede23mytr1turu3ar2udr4ufe1clru2le1ceru2pb1c2ec2a2b1deb2te2bre4bl3myi4be_3beaeb2iebe4eb2b2bedzib5r1v2r2veeau3t1icmy3e5bee3bef2r2yry2tz2ie1bel2sa_2sabeap25saebe3meak1ea4gsa4g3sai4ti_5sak4beobe3q4eabmy4dd3zo3dyndyl25dyksa2l2d2y2d1wsa4mbe3w2b1fbfa44b1hb4ha2bi_1biazi5mdu3udu2ps3apb4ie3ducbif42ths2du_z4isb1ilmi3od4swds3m4bimd5sl1saumi3pz3li3dox4s3bd4osd2or3doosby3bip4bi5qbir44zo_s1cab2iss1cedo4jd4ob4do_5zoa2d1mmtu4d5lu2bl2d1losch2d1la2dl4tha42th_m5si4m1ss2co2t3f1diu2se_se2a4bly2b1m3texbmi44b1nm4ry4bo_3boa2sed5bobdil4bo5h3sei1didse2p1dia4di_d4hu3bon4d1hxys4dg4ami2t2d5f1boo3dexs2es1set3sev3sex3sey2s1fsfi4_an1d3eqde1ps4idsif4bow2si4g2sin5boyzo5p3sipde3gs1it3dec2de_d3di2tep3miute2od1d4d3c4zot23davs2k24sk_d1atske2d3ap4sksd1agb3sc2sl44da_5zumb5sicy4tbso2te2ltei4cys4cy4m2b1tcyl34bu_5bubte2g1cyc2cy_bun2cu5v5cuu1cuss2le1curt4edc4ufc1tyc1tu4te_c1trs1n2s2na2so_t1ca5mix4b3w4zy_4by_3byibys45byt2ca_2tc23soes2olc1te5cafsos45cai5cakc1al3sou4t3bt4axc2ta4m1lcry2sph2s1plc2res2pos4pym3pum3pocoz4cov14mo_sre22moc5cao1caps1sa3cooss3mcon11cars4sns1sos1su1takss3wmod13coe4st_1tai3tah3coc3coa4co_taf4c3nim2pist3cc1atste2mo1mc4kem4ons1th2cim3cau2tab2ta_3cayc1c44stl3cilc3ch3syn4cigci3f4ce_4ci_3chrs1tu1cho2ced4chm1sylch5k4stw4cefce5gs4tysy4d4su_sug3sy1c3sui4ch_m3pa2cem4sy_cew4ce2t1cepsu5zm4op2swo2s3vzzo3",
		5 : "n5tau2cenn3centsves45swee5cencsu5sus4urg1cen2sur3csu5pe3cerasun4a3cerdsum3i5cern5cesss4u2m1s2ulce4mo3cemi4celysy4bi4chab3chae3chaisui5ccelo45cellchec44ched3chee3chemsuf3fch1ersu3etsud4asuct44chessubt2ch5eusu4b13chewch5ex5chi_3chiasu5ansy4ce1styl3ceiv3chio5chip3cedi3cedestu4m5cedace4cicho3a5choc4chois4tud3chor3ceas2st3sstre43chots2tou3stonchow5cean3chur43chut5chyd3chyl3chym1c2i24ceab4ciaccia4mci3ca4cids4cie_ci3ers4toeci5etccle3cifi4ccip4ci3gast3lisyn5esyr5icat4ucim3aci3mes5tizs4thu4cinds4thac4atss4tec4cintci3olci5omci4pocisi4cit3rt2abockar5cka5tt5adeck5ifck4scc2atcs4teb3clasc2le22cle_c5lecc4at_clev3cli1mtad4icli2qclo4q4stakclue4clyp55clystad2rtae5n1c2o2case5car4vco5ba3tagrco3cico5custab23tail4cody2tairco5etco3grcar5mt4ais4col_col3atal2css5poco5lyta3lyco4met4anecomp4cap3uta4pass5liss1ins1sifs1siccon3scon3ts3siacapt4coop4co3orcop4eco3phco5plco3pocop4t2corassev3s5seus1sel1tard3corn4corotar3n5cort3cos_sre4ssreg5co5ta3tarr5cotytas3it3asmco3vacow5a5tassco5zic4anotas4t5craftat4rc4ran5spomcam4is4plysple2ca3maca3lys2pins2pids3phacal4m4speocri3lcron4so3vi4crousov5et5awacrym3cryo34c5s4csim5tawn43calcc3tacc4alaso5thct1an4soseca3gos3orycad4rc4teasor3os2o2ps4onect5esct5etct2ics2onaso3mo1so2mc3timsol3acaco3c4acesody4sod3oc5tio2s3odc3tittcas4tch5u4t1d4smo4dsmi3gc1tomc3tons3mensmas4b3utec2tres3man3bustc2tumte3cr2s1m4buss2s5lucslov5c2ulislo3cs3lits5leycu4mi5cunacun4e5cuni5cuolcu5pacu3pic3upl4tedds3lets5leabur3ebunt4cus5a3slauc3utr4tedobun4a4teeicy4bib4ulit3egoteg1rcy5noteg3us1latbsin41tellbsen4d4abr1d2acdach43tels3dact4b1s2sky3ld4aled4alg4bry_dam5a3damed3amida5mu3dangs5keybrum4d3ard5darms3ketbros4tem3as5kardat4ub4roa4teme4tenet5enm4tenob2ridteo5l4bre_5sivad3dlid3dyite3pe4s1ivde5awde4bisi4teb2ranbram44sismde1cr4dectded3i4sishs1is24bralde4gude3iosi4prtep5i4sio_1sio45sinkde5lo1d4emsin3is2ine4boxy1silibow3ssif5f4demybous4den4d4dened3enh4sidssi4de4sid_3bourde3oddeo3ldeon2si4cu5terd3sicc4s1ibde2pu5botishys44shu4d4eres3hon5shipsh3io1derider3k3dermsh5etsh1er4shab1teri2s1g4der3s5deru4des_de3sa5descbor4nter5k3terrdes4isexo23borides1psewo4de3sq2t2es5seum1de1t4tes_de5thde2tise5sh4ses_bor3d3septsep3atesi4t3esqdfol4tes4tteti4dgel4d4genbon4ebon4cdhot4bol4tbol3itet1rdi2ad3diarbol4e4d1ibd1ic_3sensdi4cedi3chd5iclsen5g1dictsem4osem2i5self4sele4boke5selasei3gd4ifo2boid3seedbod5i5dilldilo4di3luse4dabo5amdi1mi2d1indin4ese2cosec4a3di1odio4csea3wdip5t3diredi3riseas4di4s1d4iscs4eamb3lis3dissbli2q2s1d22s1cud3itos4coi2ditybli3oscof44blikscid5dix4i3bler4the_b3lan5dlefblag43dlewdlin45blac4b5k4bi5ve4d1n24bity4thea4thed4sceidog4abis4od4ol_s4ced5bismscav3sca2pd4ols5dom_1thei3theobi3ousbe4sdo5mos4bei4donybio5mbio3l4dor_dor4mdort41bi2ot4hersavi2dot1asaur52dousd4own4thi_th5lo2thm25binad3ral3dramdran4d4rassat1u3dreldres4sa2tedri4ed4rifs2a1td4romsas3s3sas_4d1s2th4mi3thotds4mi1th2rb2iledt5hobigu3bi5gadu1at5thurduch5sar5sdu4cosap3rbid5idu5en2santdu5indul3cd3uledul4lsan3adun4asamp43b2iddu3pl5durod5usesam5o5thymbi4b1dver2be3trsa3lube3sl3sale2bes_be1s2dy5ar5dy4e3thyrber5sdyll35dymi5berrdys3pberl4thys42beree1actbe5nuea5cue5addbe1neead1i1ti2ati3abben4deal3abel4tsad5osad5is3actean5i2t3ibsac4qe3appear3a5sacks3abl2belebe3labe3gube5grryp5arym4bry4goeas4t5rygmry5erbe3gobe4durvi4tr3veyr3vetr3vene4atube4doeav5ibed2it3ic_eaz5ibe3daebar43becube3caru3tirus4pe2beneb5et4bease5bile4bine4bisbdi4ve4bosrur4ibde4beb1rat2icie4bucru3putic1ut3id_run4trun4ge5camrun2eec3atr4umib3blir4umeech3ie4cibeci4ft4ida2b1b2ru3in3tidirue4lt5idsru4cerub3rr4ube1tif2ec1ror4tusti3fert5sirto5lr1t4oec1ulrt3li4tiffr2tize2dat3tigie4dede5dehrt3ivr2tinrth2ir5teue3deve5dew5barsr5tetr1ted4tigmr3tarrta4grt3abed1itedi2v5tigued3liedor4e4doxed1ror4suse2dulbar4nrs5liee4cers3ivee4doti4kabar4d5barbr4sitba4p1r3sioeem3ib4ansee4par4sileesi4ee3tot4illr5sieefal4rs3ibr3shir3sha5bangr3setb4anee4fugrsel4egel3egi5ae4gibe3glaeg3leeg4mir3secr3seat4ilte5gurban4abam4abal5utim1abal3abag4a5eidobaen43backr4sare4in_e3ince2inee1ingein5ir2sanei4p4eir3oazz4leis3ir2saleith4azyg4r4sagaz5eeaz3ar2r1s2ek3enek5isayth4e4lace5ladr3rymelam4r3ryi3tinnay5sirro4trrog5rrob3ay5larric4ax2idrrhe3rre2lele3orrap4el1ere1lesrra4h4r1r44tinst4intrpre4el5exrp5ise1lierph5ee3limav1isti3ocrp3atav3ige3livavas3r4oute3loae3locroul35rouero3tue2logro1te4rossr4osa4roreel3soror5dav5arelu4melus42t1ise5lyi3elytr4opr4rop_emar4tis4c5root1roomem5bie1me4e4meee4mele3mem3tissro1noro3murom4pe4miee2migro3lyro3laroid3e3mioro3ictis2te4miuro3gnro1fero3doava4ge2moge4moiro3cuem5om4emon5roccro5bre2morro4beav4abr5nute5mozrnuc4au3thr5nogr3noc3titlem3ume5muten3ace4nalrn3izrni5vr1nisrn3inr3nicrn5ibr5niaenct42t1ivr3neyr3netr3nelaus5pene5den3eern5are5nepe2nerr5nadr3nacrn3abt3iveen1et4aus_rmol4e3newen3gien3icr3mocrmil5en5inr5migaur4o5tleben3oieno2mrm4ieenov3aun3dr2micen3sprme2arm4asr2malr5madr3mac3tlefen2tor4litau3marlat33tlem5tlenen3uaen3ufen3uren5ut5enwa5tlewe4oche4odaaul4taul3ir3keyr3ketrk1ere5olutlin4eon4ae3onteop4te1or1r5kaseor3eeor5oeo1s2eo4toauc3oep4alaub5iepa4t4a2tyr2i4vr2ispris4cep5extmet2eph4ie2pige5pla2t3n2ri5orri4oprio4gatu4mrin4sr4inorin4e4rimse1p4u4rimmr4imbri2ma4rim_at1ulr4ileri2esera4gera4lri3erri5elrid4e2ricur4icl2riceri3boer3be2r2ib2a2tuer3cher3cltoas4ri5apri3am4toccat1ri4ered3r2hyrhos4tod4irgu5frg5lier3enr3gerr3geor5geee3reqer3erere4sa4trergal4r4gagat3rarfu4meret42a2tra5tozatos4ere4ver3exreur4er3glre3unre3tur3esq2res_er2ider3ierere4rer4aer3into5dore5phre1pe3reos3reogre3oce3river5iza3too4atoner3mer4enirene2rena4r3empr5em_re1le4ero_re1lam5ordreit3re3isre1inre3if2atolre2fe3reerree3mre1drre1de2r4ed4atogeru4beru5dre3cure3ce3reavr5eautol4ltolu5es5ames5an4atiure3agre3afr4ea_to5lye3seatom4be5seeat1itese4lr4dolrd3lie1shie5shurdi3ord2inr5digr4dier4desr2dares3imes3inr5dame4sitrc5titon4er5clor4clees4od3tonnrcis2rcil4eso3pe1sorr2cesrca4ston3ses4plr4bumr2bosrbit1r2binrbic4top4er4beses2sor3belrbe5ca4timrbar3e2stirb1anr4baga2tif4toreest4rrawn4tor5pra3sor4asktor4qr2aseras3cati2crare2eta3p4rarcran2tet4asra3mur5amnet5ayra3lyra3grra4de3tos_eter2r2acurac4aetex4e2th1r2abo2etia5rabera3bae5timet3inath5re3tir5quireti4u1quet2que_e2ton4quar5quaktos4ttot5uath3ipyr3etou4fet1ri5tourt3ousath3aet1ro4a2that5etetud4pu3tre4tumet4wetra5q3tray4ater4tre_4trede3urgeur5itren4pur3cpur5beut3ipu3pipun2tpun3i3puncev3atpun4aeve4n4trewpum4op4u4mpu5ere4vese1viapuch4e2vict2rieevid3ev5igpu5be2trilt2rit4trixe4viuevoc3p5tomp3tilata3st4rode4wage5wayew1erata3pew5ieew1inp5tiee3witatam4ex5icpt4ictro5ft2rotey4as2a2taey3s2p5tetp1tedez5ieas5uras4unfab4ip2tarfact2p4tan2f3agp4tad5falopt3abtro1v3psyc3troypso3mt4rucfar3itru3i2t4rytrys42asta3feast4silfeb5ras3ph2fed1as5orfe1lifem3i2t1t4p3sacf5enias4loas4la3feropro1l4pro_3ferrfer3v2fes_priv24priopren3aski43prempre1dfet4ot3tabpreb3as5iva3sit4pre_f5feta5siof5fiaf3ficf5fieffil3prar4ff4lepra5dffoc3prac1as3int5tanppi4ct5tast3tedfib5u4fic_ppet33fici4ficsppar34p1p2fiel4asep4p5oxi1fi2l4asedfin2apo1tefind3fin2ef1ing3p4os3portpor3pf3itapo4paas2crt3tlifle2s2ponyflin4t5toip4o2nasan2pom4eas4afa5ryta3ryot5torar3umt3tospo3caar2thar3soar2rhar4pupnos4tu5bufor5bar3oxtu5en5formplu2m2plesaro4ntu4is3plen3plegfrar44ple_fre4sar3odfruc42tum_3tumi4tumsf1tedtun4aft5es2p3k2p2itutu4netur4dtur4npis2sfug4ap4iscfun2gp4is_fur3npir4tfus5oar3guar5ghpi4pegadi4pip4at3wa4ar3en3gale3pi1op4innpin4e3galot3wit5pilo3piletwon4pig3n5tychpict4g5arcg4arepi4crpi3co4picagar5p5garr1ga4sgas5igas3o3piarar4bl3phyltyl5ig4at_2phy_phu5ity5mig4attgat5ugaud5ga5zaar3baara3va3rau5geal3gean2ge4d3gedi5gednar1at3type4gelege4li1tyr13phrage4lu2gelygem3i5gemoara3mph3ou3phorgen3oa3rajt5ziat5zie4gereph1is2ges_5gessphi4nua3ciget3aara2ga5quia5punua5lu1philg3ger4phic3phibg3gligglu3g5glyph3etg4grouan4og5haiuar3auar2dg4hosuar3iap5lia5pirph2angi4atu1b2igi5coap3in4phaeub5loub3ragi4orgi4otaph3igi5pag4i4s5gis_gi2t15gituu1c2aa5peug3laru5chrglec43glerap3alpe4wag4leypet3rpe2tia1pacaol3iglom34glopa5nyian5yap4ery3glyp2g1m4a5nuta3nurg4nabper3vp4eri4pere5percpe5ongn5eegn3eru4comg4niapen5upel5v4pelean3uluco5tgno4suc2trant4ruc3ubuc5ulu5cumgo4etgo4geu5dacg5oidgo3isgo2me5gonnpe2duud1algoph44gor_5gorg4gorsg4oryud5epgos4t1anth3pedsg1ousan2teu4derudev4grab43gram3pedigra2pudi3ogril43pedeu5doigro4gg5rongrop4ud5onan3scgru5ipe4coan5otan2osanor3g4stiu5doran2oeg4u2agu5ab5guan4annyg5uatan5no5gueu4aniuuen4ogu2magu4mi4anigpawk4uer3agur4ngur4u4gurypau3pani3fan3icues4san3euan4eagyn5ouga4cug2niug3uluhem3ui3alp5atohae3opas1t1p4ashag5uha5ichais4par3luid5ouil4apa3pypap3uhan2gpa3pepa4pahan4tpan3iha4pehap3lhar1ahar5bhar4dpan1ep4alspa3lohar3opain2paes4pad4rhat5ouil4to3zygozo5ihav5oana5kuin4san3aeuint4amyl5am3ului5pruis4t1head3hearui3vou4laba3mon4ulacu5lathe3doheek4ul4bohe3isul3caul4ch4uleaow5slow5shu5leehem1aow5in3amidow5hahem4pow1elhe3orulet4h1er_owd3lher2bowd4io5wayow3anow3ago1vish5erho5varouv5ah1erlouss42ouseh1ersoun2dul4evami2cul2fahet3ioul4tul4iaheum3ou5gihe4v4hev5ihex5oa3men3ambuu5lomhi4aram1atou5gaul4poh4iclh5ie_h1ierou3eth1iesama4gh3ifyhig4ohi5kaa5madoud5iou5coou5caa5lynhin4dou5brul1v45ou3aalv5uh2ins4o1trh4ioral1vahip3lum3amhir4ro4touhit4ahiv5aumar4u5masalu3bh3leth1l2ihli4aum2bio1t2oot4iv2h1n2o5tiaal3phho3anho4cou4micho5duho5epo4tedhold1o3taxo3tapot3ama5lowh2o4nos1uru4mos4ostaos4saos1pihon1o1hoodhoo5rh4opea4louo5sono5skeh4orno4sisos1inos5ifhosi4o3siaalos4os5eual1ora3looo2seta3lomoser4hr5erhres4um4paos5eohrim4h5rith3rodose5ga5loeo3secumpt4un5abun4aeht5aght5eeo4scio2schos4ceos4caht5eoht5esun2ce4aliuosar5un3doos3alosa5iory5phun4chunk4hun4thur3ior4unu1nicun4ie4or1uun3inal1in5aligal3ifal1iduni5por4schy1pehy3phuni1vor1ouun3iz2i1a2ia4blo5rooorm1ii2achiac3oa2letork5a5origa1leoun3kni2ag4ia3gnor3ifia3graleg4a3lec4ori_al3chor5gn4ialnor4fria5lyi5ambia3me5orexi3anti5apeia3phi2ardore4va5lavor3eiore3giat4uore3fal3atun3s4un5shun2tiibio4or4duib5lia1laei4bonibor4or4chi5bouib1riun3usoram4ic3acor5ali4calic1an2icariccu4akel4i5ceoa5ismich4io5raiora4g4icini5cioais1iic4lo2i2coico3cair3sair5pi5copop2ta2i1cri4crii4crui4cry1op1top5soopre4air5aop2plic3umopon4i5cut2i1cyuo3deain5oi5dayide4mo4poiain3iu1pato1phyid3ifi5digi5dili3dimo4pheo1phaidir4op1ero5peco4pabidi4vid3liid3olail3oai5guid3owu5peeid5riid3ulaid4aa5hoo2ieg2ie3gauper3i5ellahar22i1enien2da1h2aoo4sei2erio3opt4iernier2oi4erti3escagru5oon3iag3ri2i1eti4et_oo4leag5otook3iiev3au5pidiev3o4ag1nagli4if4fau5pola5giao5nuson5urifi4difi4n4i2fla5gheifoc5ont4rupre4af5tai3gadaev3a3igaraeth4i3geraet4aono3saes3ton5oionk4si3gonig1orig3oto1nioo5nigon3ifig1urae5siae3on4ura_aeco34uraead3umura2gik5anike4bi2l3aila4gon4id4a2duil4axil5dril4dui3lenon4guuras5on1eto3neoon1ee4oned4oneaad1owon5dyon3dril1ina3dos4onauon3aiil5iqona4do2mouil4moi5lonil3ouilth4il2trad3olil5uli5lumo4moi4adoi4ilymima4cim2agomni3im1alim5amom2naomme4om2itomil44adoeomi2co3mia3adjuome4gurc3ai5mogi3monim5ooome4dom4beo3mato2malo2macim5primpu4im1ulim5umin3abo4mabur4duadi4p4olytina4lol1ouin5amin3anin3apo3losol1or4olocur3eain3auin4aw4adilol3mia5difolle2ol2itolis4o5lifoli2eo1lia4inea4inedin5eeo3leuol1erine4so3lepo3leo4ineuinev5ol5chol4an4infu4ingaola4c4ingeur5ee4ingiad4haur1er4ingo4inguoith44adeeada3v4inico3isma5daiur3faac2too3inguril4ur1m4ac3ry4ino_in3oioil5i4inos4acou4oideo2i4d4acosurn5soi5chinse2o3ic_aco3din3si5insk4aco_ac3lio3ho4ack5aohab34acitacif4in5ulin5umin3unin3ura4cicuro4do5gyrur5oturph4iod5our3shio3gr4i1olio3maog4shio3moi5opeio3phi5opoiop4sa5cato4gro4ioreo2grio4got4iorlior4nio3sci3osei3osii4osoog2naur5taiot4aio5tho4gioio5tri4otyur1teo5geyac3alurth2ip3alipap4ogen1o3gasip1ato3gamurti4ur4vaofun4iphi4i4phuip3idi5pilip3ino4fulipir4ip5isab1uloflu42abs_ip3lou3sadi4pogus3agi4pomipon3i4powip2plab3omip4reoet4rip1uli5putus3alabli4i3quaab3laus4apoet3iira4co4et_ir4agus3atoes3t4abio2abiniray4ird3iire3air3ecir5eeirel4a3bieires4oelo4ab1icoe5icir4ima3bet5irizush5aoe5cuir5olir3omusil52abe4ir5taoe4biabay4us4pais5ado5dytis1alis3amis1anis3aris5av_za5ri2s3cod3ul_xy3lod5ruo3drouss4eod3liis2er5odizod5it4iseuod4ilodes4o5degode4co5cyt2isiais5icis3ie4isim_vo1c4isisis4keus1troc5uo2ismais1onocum4iso5pu5teooc1to5ispr2is1soc2te_vi2socre3u3tieiss4o4istao2cleu3tioo5chuoch4e4istho4cea4istloc5ago3cadis1tro4cab4istyi5sulis3urut3leutli4it5abita4c4itaiit3am_vec5it4asit3at_ur4oit3eeo3busob3ul_ura4_up3lo3braith5io5botith3rithy52itiao5bolob3ocit1ieit3ig4itim_un5uob1lio3blaob3iti5tiqut5smit3ivit4liit5lo4ito_it5ol2itonit1ou_un5sobe4lu4tul_un3goat5aoap5ioan4t4itueit1ulit1urit3us2i1u2_un3eiur5euven3oal4iiv1ati4vedu5vinoad5io3acto5ace_ul4luy5er2v3abives4iv3eti4vieiv3ifnyth4va1cavacu1iv1itva4geivoc3vag5rv1al_1vale_tor1vali25valu4izahiz3i2_til4iz5oivam4i_tho4va5mo5vannnwom4jac3ujag5u_te4mja5lonwin44vasev4at_jeop34vatuvect4_ta4m4velev1ellve1nejill55jis_4venu5ve3ojoc5ojoc5ujol4e_sis35verbju1di4ves__ses1ju3ninvi4tjut3a_se1qk4abinvel3kach4k3a4gkais5vi1b4vi4ca5vicuvign3vil3i5vimekar4i1kas_kaur42v1invin2evint4kcom43vi1oviol3kdol5vi5omke5dak5ede_rit2_rin4ken4dkeno4kep5tker5ak4erenu1trker4jker5okes4iket5anu4to5vi3pkfur4_re3w_re5uvire4kilo3vir3uk2in_3kind3nunc5numik3ingkin4ik2inskir3mkir4rv3ism3kis_k1ishkit5cvit2avit1rk5kervi3tu_re5ok5leak3lerk3let_re1mv3ity_re1ivi5zovolv41know3vorc4voreko5miko5pe3vorok5ro4_po2pv5ra4vrot4ks2miv3ure_pi2ev5verwag3owais4w3al_w3alswar4fwass4nu1men3ult5labrwas4tla2can4ulowa1tela4chla2conu4isw4bonla3cula4del5admw5die_out1nug4anu3enlag3r5lah4nud5i_oth54lale_osi4_or2o_or4ilam1ol5amu_ore4lan2d_or3dn5turntub5n3tua3weedweir4n5topwel3ilapi4n3tomn1t2o_op2i_on4ent3izla4tenti3pn3tign1tient4ibwent45laur_ome2_ol4d_of5twest3_oed5l4bit_ob3lw5hidl2catwid4elcen4n1thelch4el3darl3dedl3dehwi5ern4teol5dew_no4cl3dien3teln4tecwim2pld5li_ni4cwin2ecen3int1atnt1aln3swale3cawl1ernsta4_na5kle5drleg1an3s2t3leggn5sonleg3ons3ivwl4iensi2tlel5olelu5n3sion3sien3sid5lemml3emnle2mon4sicns3ibwon2tn3sh2n5seule1nen2seslen3on5seclen5ule3onleo4swoun4wp5inn4scun2sco_mis1_mi4enre3mnre4ix4ach4les_x4adenpri4x3aggnpos4npla4npil4leur5x3amil3eva5levexan5dle4wil5exaxano4lf5id_lyo3lf3on_lub3l4gall4gemlgi4al4gidl4goixas5pxcav3now3llias4lib1rl1ic_5lich_lo2pnove2nou5v2nousli4cul3ida3nounn4oug3lieul4ifel4ifoxcor5_li4p3notenot1a_li3oxec3r1l4illil4ilim2bno3splim4pnos4on4os_lin4dl4inenor4tn4oronop5i5nood4noneno2mo1nomi3linqnol4i3liogli4ollio3mliot4li3ou5liphlipt5x5edlx5edn_le2pl4iskno3la_le4ml2it_n5ol_no4fa3lithnoe4c3litrlit4uxer4gn4odyno4dinob4ln5obilk5atxer3on5nyi_ki4ex3ia_nnov3x4iasl5lasl4lawl5lebl1lecl1legl3leil1lellle5ml1lenl3lepl3leul3lev_is4o_is4c_ir3rx5ige_in3tllic4nlet4_in3ol5lie4n1l2l2linnk5ilnk5ifn3keyl5liolli5v_in2ixim3ank5ar_in3dllo2ql4lovnjam2_im5b_il4i_ig1n_idi2llun4l5lyal3lycl3lygl3lyhl3lyil5lymx4ime_hov3_ho2ll4mer_hi3bl5mipni3vox4it__he4ilneo4x4its5loadniv4ax4ode_hab2ni4ten5iss2locynis4onis4l_gos3n4isk4loi_lo5milom4mn4is_lon4expel43nipuni1ou5nioln4inu5ninnnin4jn4imelop4en3im1l3opm1lo1qnil4ax4tednik5e3nignn3igml4os_lo1soloss4_ga4mnift4nif4flo5tu5louplp1atlp3erxtre4l5phe_fo3cl2phol3piel3pitxur4b1y2ar_eye3_ex3a3yardl5samls5an4nicllsi4mls4isyas4i_eur4l1s2tni3ba3niac_es3tl5tar_es3pl4teiyca5mlth3inhyd5y3choltin4lti3tycom4lt4ory2cosnhab3_er2al4tusyder4_epi1luch4_eos5n2gumlu4cu_ent2lu1enlu5er_en3slu4ityel5olu4mo5lumpn4gry_en5c5lune_emp4n5gic_em3by5ettlusk5luss4_el2in5geen4gae_ei5rlut5r_ei3dygi5a_ec3t_eco3l4vorygo4i_dys3_du4c_do4eyl3osly4calyc4lyl5ouy1me4news3_de4wly4pay3meny5metnet1ry5miaym5inymot4yn4cim4acanet3an1est1nessn1escmact44mad_4mada4madsma4ge5magn2nes_yn3erma5ho3ma4i4mai_maid3_der2ner2vner5oyni4c_de1mneon4m3algneo3ln3end4n1enne2moyoun4n4ely2neleyp5alneis4man3a5negune3goneg3a3nedi_dav5m4ansne2coyper3m3aphy4petne4cl5neckn3earyph4en3dyind2wemar3vn4dunndu4bn2doundor4n5docnd1lin3diem4at_n1dicnd4hin5deznde4snde4ln1dedn3deayph3in3damm4atsn3daly4p1iy4poxyp5riyp4siypt3am5becn4cuny3ragm4besyr3atm2bicnct2oyr3icm4bisy5rigncoc4n1c2lm3blimbru4mbu3lmbur4yr3is_can1ys5agys5atmea5gn4cifme4bame4biy3s2c4med_n4cicn3chun3chon3chan5ceyme4dom5edy_bre2n5cetn3cer4melen1c2anbit4nbet4mel4tnbe4n_bov4ys1icys3in3men_2menaysi4o3nautnaus3me1nenat4rnati45meogys4sonas3s4merenas5p2me2snas5iys4tomes5qyz5er1me2tnam4nmet1e3nameza4bina3lyn5algmet3o_aus5_au3b_at3t_at3rza4tena5ivmi3co5nailm4ictzen4an5agom4idina4ginag4ami5fimig5an2ae_mi2gr_as4qmi5kaz5engm3ilanadi4nach4zer5a3millmi5lomil4t3m2immim5iz3et4_ari4_ar4e_ar5d5zic4_ap4i5my3c_any5z3ing3zlemz3ler_an3smu4sem5uncm2is_m4iscmi4semuff4zo3anmsol43zoo2_and2zo3olzo3onzo5op4mity_am2i_al1k_air3_ag5nmlun42m1m2_ag4amp5trmp3tompov5mpo2tmmig3_af3tmmis3mmob3m5mocmmor3mp3is4m1n2mnif4m4ninmni5omnis4mno5l_af3f_ae5d_ad3o_ad3em3pirmp1inmo4gom5pigm5oirmok4imol3amp5idz3zarm4phlmo3lyz5zasm4phe_ach4mona4z3ziemon1gmo4no_ace45most_ab4imo3spmop4t3morpz5zot",
		6 : "reit4i_ab3olmo5rel3moriam5orizmor5onm3orab3morse_acet3_aer3i_al5immo3sta2m1ous_al3le4monedm4pancm4pantmpath3_am5ar_am3pemper3izo5oti_am3phmo4mis_ana3b_ana3s_an5damog5rimp3ily_an4el_an4enmmut3ammin3u_an4glmmet4e_ant3am3medizing5imman4d_ar5abm5itanm3ists_ar5apmsel5fm3ist_5missimis3hamuck4e4misemmul1t2_ar4cimu5niomun3ismus5comirab4mus5kemu3til_at5ar1m4intmin3olm4initmin5ie_bas4i_be3di5myst4_be3lo_be5sm5min4d_bi4er_bo3lo_ca3de_cam5inac4te_cam3oyr5olona4d4amil4adnad4opyr3i4t_car4imid5onn4agen_ca4timid4inmi4cus_cer4imi3cul3micromi4cinmet3ri4naledyp5syfn4aliameti4cmeth4i4metedmeta3tna5nas_cit4anan4ta_co5itnan4to_co3pa4n4ard_co3ru_co3simes5enmer4iam5erannas5tenat5alna5tatn4ateena3thenath4l5mentsn4ati_nat5icn4ato_na3tomna4tosy4peroy4periy5peremend5oyoung5naut3imen4agna5vel4m5emeyo4gisnbeau4_de3linbene4mel3on_de3nomel5een4cal_yn4golncel4i_de3ra_de3rimega5tncer4en4ces_yn5ast3medityn5ap4nch4ie4medieynand5ynago43mediaym4phame5and_de3vem5blern4cles_dia3s_di4atmb5ist_din4anc4tin_dio5cm5bil5m4beryncu4lo_east5_ed5emncus4tmbat4t_elu5sn3da4c3m4attn4dalema3topnd3ancmat5omma3tognde3ciyes5tey3est__em5innd3enc_em5pyn3derlm4atit_en5tay4drouma3term4atenndic5undid5aydro5snd5ilynd4inend3ise_epi3d_er4i4nd5itynd3ler_er4o2_eros43mas1ty4collnd5ourndrag5ndram4n5dronmassi4y4colima3sonyclam4mar5rima3roone3aloma5ronne2b3umar5ol5maran_erot3_er4rima5nilych5isne4du4manic4man3dr_eth3e3m4an__eval3ne5lianeli4g_far4imal4limal3le_fen4dm3alismal3efmal5ed5male24nered_fin3gxtra3vner4r5mal3apxtra5d2mago4ma4cisne3sia5machy_fu5ganes3trmac3adnet3icne4toglys5erxtern3neut5rnev5erlypt5olymph5n4eys_lyc5osl5vet4xter3ixpoun4nfran3lv5atelu5tocxpo5n2_ge3ron3gerin5gerolut5an3lur3olu3oringio4gn5glemn3glien5gliol3unta_go3nolu2m5uxo4matluc5ralu2c5o_hama5l3t4ivltim4alti4ciltern3lt5antl4tangltan3en4icabni4cen_hem5anict5a_hy3loni4diol3phinni4ersximet4lot5atnif5ti_ico3s_in3e2loros4lo5rof_is4li_iso5ml4ored_ka5ro_kin3e5nimetn4inesl3onizl3onisloni4e3lonia_lab4olo5neyl5onellon4allo5gan3lo3drl3odis_la4me_lan5ixen4opnitch4loc5ulni3thon4itosni5tra_lep5rni3trinit4urloc3al5lob3al2m3odnivoc4niz5enlm3ing_lig3anjur5illoc5ulloc3an5kerol3linel3linal5lin__loc3anland5lli5col4liclllib4e_loph3_mac5ulli4anlli5amxa5met_math5llact4nni3killa4balk3erslk3er_lkal5ono5billiv5id_ment4_mi3gr_mirk4liv3erl5ivat5litia5liternois5il3it5a5lisselint5inom3al3lingu5lingtling3i3nonicw5sterws5ingnora4tnor5dinor4ianor4isnor3ma_mi5to_mo3bil4inasl4ina_wotch4word5ili5ger_mon3a5lidifl4idarlict4o_mu3ninova4l5licionov3el_mu3sili4cienow5erli4ani_myth3_nari4le5trenpoin4npo5lale5tra3les4sle3scon4quefler3otleros4ler3om_nast4le5rigl4eric3w4isens3cotle5recwin4tr_nec3tle5nielen4dolend4e_nom3ol5endalem5onn5sickl5emizlem3isns5ifins3ing_nos3tn3s2is4leledle3gransolu4le4ginn4soren4soryn3spirl3egan_obed5nstil4le5chansur4e_ob3elntab4unt3agew5est__oe5sont5and_om5el_on4cewel4liweliz4nt3ast_opt5ant5athnt3ati_or3eo3leaguld3ish_pal5in4tee_n4teesld4ine_pa5tald3estn4ter_n3terin5tern_pecu3war4tel5deral4cerenther5_ped3elav5atlat5usn4tic_ward5r_pend4n4tics_pep3tn3tid4_pi3la_plic4_plos4_po3lan5tillnt3ing_pop5lvo3tar_pur4rn4tis_nt3ismnt3istvo5raclat5al4laredlar5delar5anntoni4lan4tr_re3cantra3dnt3ralviv5orn3tratviv5alnt3rilv5itien5trymlan3etlan4er3landsvi5telland3i3land_lan3atlam4ievi3tal2v5istla4ic_la4gisla3gerlac5on5visiola5cerla5ceolabel4vi5ridlab5ar_re3ta5numerkin5et_rib5anu3tatn5utivkey4wok5erelkal4iska5limk2a5bunven4enven5o_ros3ajuscu4_sac5rjel5laja5panja2c5oi5vorevin5ta_sal4inym5itv5iniz5vinit3vinciiv3erii4ver_iv5elsoad5ervin4aciv5el_oak5ero3alesiv5ancoal5ino5alitit5uar_sanc5oar5eroar4se_sap5ait4titoat5eeoat5eri4tric_sa3vo4i5titob3ing2obi3o_sci3e4itio_it4insit4in_it5icuiti4coi5tholitha5lobrom4it3erait3entit3enci3tectit4ana3istry_sea3si4s1to5vider_sect4oc5ato4o3ce25vict2ocen5ovice3r_se3groch5ino3chon_sen3tvi4atroci3aboci4al5verseis4taliss4ivis5sanis4saliss5adi3s2phocu4luver4neislun4ocuss4ver3m4ocut5ris3incis5horocyt5ood3al_ish3op4ishioode4gao5dendo3dentish5eeod3icao4d1ieod3igais3harod1is2v5eriei2s3etis5ere4is3enis3ellod5olood5ousise5cr4i1secisci5cver3eiver5eaven4tris5chiis3agevent5oir5teeir5ochve5niair4is_ir2i4do3elecoelli4ir5essoe3o4pire5liven4doi5rasoven4alvel3liir4ae_ir4abiv4ellaip3plii4poliip3linip4itiip1i4tip4ine_su5daiphen3i1ph2ei3pendog5ar5v3eleripar3oi4oursi4our_iot5icio5staogoni45ioriz4ioritiora4mvel3atiod3i4ioact4_sul3tintu5m_tar5oin3til_tect45vateein4tee_tel5avast3av5a4sovar4isin3osiin5osei3nos_oi5ki5oil3eri5noleoin3de4vantlvanta4oin4tr_ter4pin3ionin4iciin5ia_oit4aling3um4ingliok4ine4ingleing5hain5galo4lacko5laliinfol4olan5dol5ast_thol45val4vole2c4ol5eciol5efiine5teole4onin3esi4in5eoo3lestin5egain5drool3icao3lice_ti5niol5ickol3icsol5id_va5lieo3lier_tri3dinde3tvager4oli5goo5linaol3ingoli5osol5ip4indes5inde5pin5darollim34vagedol4lyi3vag3ava5ceo4inataol3oido4lona_tro4vi3nas_in4ars_turb44ol1ubo3lumi_turi4ol3us_oly3phin3airin5aglin4ado4inaceimpot5im5pieo4maneomast4_tu5te_tu3toi3mos_im5mesomeg5aome3liom3enaomen4to3meriim5inoim4inei3m2ieomic5rom4ie_imat5uom4inyomiss4uv5eri_un5cei5m2asim3ageil5ureomoli3o2mo4nom5onyo4mos__un5chilit5uom5pil_un3d2il4iteil5ippo5nas__uni3c_uni3o4iliou_un3k4oncat3on4cho_un3t4u4t1raon3deru4to5sili4feili4eri5lienonec4ri3lici_ve5loon5ellil3iaron3essil3ia_ong3atilesi45u5tiz4o1niaon5iar2oni4conic5aut3istut5ismon3iesigu5iti4g5roi5gretigno5m4onneson5odiign5izono4miu5tiniut3ingo5nota_ver3nig3andu4tereon4ter_vis3ionton5if5teeon4treif5icsut5eniutch4eif3ic_u3taneoof3eriev3erook3eri5eutiiet3ieool5iei3est_i1es2ties3eloop4ieieri4ni3eresus5uri4idomioot3erooz5eridol3ausur4eo5paliopa5raopath5id4istopens4id1is43operaus4treidios4_vi5sooph4ieo5philop5holi3dicuus1to4iderm5op3iesop5ingo3p2itid3eraust3ilid3encopol3ii5cun4op5onyop5oriopoun4o2p5ovicu4luop5plioprac4op3ranict5icopro4lop5ropic4terust5igust4icicon3ous5tanic5olaor5adoich5olus3tacic5ado4oralsib3utaoran3eab5areorb3ini4boseorch3iibios4ib3eraor5eadore5arore5caab5beri5atomia5theoreo5lor3escore3shor3essusk5eru4s1inor5ett4iaritianch5i2a3loial5lii3alitab3erdor3ia_4orianori4cius5ianorien4ab3erria5demori5gaori4no4orio_or5ion4oriosia5crii2ac2rus4canor3n4a5ornisor3nitor3oneabi5onor5oseor5osohys3teorrel3orres3hyol5ior4seyor4stihyl5enort3anort3atort3erab3itaor3thior4thror4titort3izor4toror5traort3reh4warthu3siahu4minhu5merhu4matht4ineht4fooht3ensht3eniab4ituht3en_ab3otah3rym3osec3uhrom4ios5encosens43abouthre5maabu4loab3useho4tonosi4alosi4anos5ideo3sierhort5hho5roghorn5ihor5etab3usio3sophos3opoho2p5ro3specho5niohong3ioss5aros4sithon3eyur3theos4taros5teeos5tenac5ablur5tesos3tilac5ardost3orho5neuhon5emhom5inot3a4gurs3orho4magach5alho5lysurs5ero5ta5vurs5alhol3aroter4muroti4ho3donachro4ur5o4mach5urac5onro5thorurn3ero5tillurn3alh5micao3tivao5tiviur5lieo5toneo4tornhirr5ihio5looturi4oty3lehi5noph5inizhi5nieh2in2ehimos4hi5merhi5ma4h3ifi4url5erhi4cinur5ionur4iliur4ie_ac2t5roult5ih4et3ahes3trh5erwaound5aac5uatur3ettoun3troup5liour3erou5sanh4eron5ousiaher5omur1e2tur3ersova3lead5eni4ovatiad3icao4ver_over3bover3sov4eteadi4opadis4iovis5oo2v5oshere3ohere3aherb3iherb3aher4ashende5ur5diehe5mopa3ditihemis4he3menowi5neh3el3ohel4lihe5liuhe3lioh5elinhe5lat5admithe5delhec3t4adram4heast5ad3ulahdeac5ae4cithavel4ura4cipac4tepa5douhas4tehar4tipa3gan4pagataed5isu5quet4pairmpa5lanpal3inag4ariharge4pan5ac4agerihant3ah5anizh1ani4agi4asham5an4aginopara5sup3ingpa3rocpa3rolpar5onhagi3oag3onihaged5agor4apa3terpati4naha5raaid5erail3erhadi4epaul5egust5apa5vilg4uredg4uraspaw5kigui5ta5guit43guardaim5erai5neagrum4bpec4tugru3en5ped3agrim3a4grameped3isgour4igo5noma3ing_5gnorig4ni2ope5leogn4in_pen4at5p4encu5orospen5drpen4ic3p4ennal5ablg2n3ingn5edlalact4until4g5natial5ais5gnathala3map3eronalc3atald5riun4nagg5nateglu5tiglu5tepes4s3ale5ma4g5lodun5ketpet3eng5lis4gli5ong4letrg4letoal3ibrali4cigin5gigi5ganun3istph5al_gi4alluni3sogh5eniph5esiggrav3ggi4a5al5icsg5gedlun4ine3germ4phi5thgeo3logen5ti4phobla5linigen5italin5ophos3pgen4dugel5ligel4ing4atosg4ato_gat5ivgast3ral5ipegasol5ga5rotp5icalu3n2ergar3eeg5antsgan4trp4iestpi5etip5ifieg5ant_un4dus4ganed4alis_gan5atpi3lotgam4blun4diepin5et3pingegali4a5p4insga5lenga4dosga4ciefu5tilpir5acfu3sil4furedfu4minundi4cpiss5aunde4tpis4trft4inefti4etf4ter_un3dedpla5noun4dalalk5ieun4as_al4lab4pled_frant4frag5aunabu44plism4plistal4lagu4n3a4umu4lofore3tfor4difor5ayfo5ramfon4deallig4fo4liefo1l4ifoeti42p5oidpois5iump5tepo4ly1poly3spoman5flum4iump5lipon4acpon4ceump3er3ponifpon5taf3licaf5iteepo5pleal3ogrpor3ea4poredpori4ffir2m1fin4nial3ous5fininpos1s2fi3nalu4moraumi4fyu2m5iffight5fier4cfid3enfi5delal5penp4pene4ficalumen4tal3tiep4pledp5plerp5pletal5uedal3uesffor3effoni4ff3linf2f3isal5ver2a1ly4fet4inaman5dul3siffet4ala3mas_fest5ipres3aulph3op3reseulph3i5pricipri4es4pri4mam5atuam4binfest3ap5riolpri4osul4litfess3o4privafer5ompro3boul4lispro4chfe5rocpron4aul4latam5elopro3r2pros4iu5litypro3thfer3ee4feredu5litipsal5tfemin5fea3tup5sin_fant3iul5ishpsul3i4fan3aul3ingfa5lonu3linefa2c3ufa3cetpt5arcez5ersp5tenapt5enn5pteryez5er_ex4on_ew5ishamen4dp2t3inpt4inep3tisep5tisievol5eevis5oam3eraev5ishev4ileam5erle4viabpudi4ce4veriam5icapu4laramic5rpu5lisu5lentu1len4a3miliev5eliev3astpun5gieva2p3eval5eev4abieu3tereu5teneudio5am5ilypu3tat5ulcheet3udeet3tere4trima5mis_et4riaul5ardet4ranetra5mamor5aetra5getor3iet3onaamort3am5ose3quera4quere4ques_et5olo5quinauit5er3quito4quitueti4naeti4gie3ticuuisti4ethyl3ra3bolamp3liuis3erampo5luin4taet5enia5nadian3agerag5ouuinc5u3raillra5ist4raliaet3eeret3atiet3ater4andian3aliran4dura5neeui3libra3niara3noiet5aryan3arca5nastan4conrant5orapol5rap5toet3arieta5merar3efand5auug3uraan5delet3al_es4ur5e2s3ulrass5aan5difug5lifra5tapra5tatrat5eurath4erat3ifan5ditra5tocan5eeran3ellra4tosra5tuirat5umrat3urrav5aian3ganrav3itestud4ra3ziees5tooe3stocangov4rb3alian4gures5taue5starest3anesta4brbel5orb3entes4siless5eeessar5rbic5uan5ifor5binee5s2pres5potan5ionrbu5t4es5pitrcant54anityr4celean3omaan4scoans3ilrcha3irch3alan4suran2t2ar3cheor4cherud3iedr4chinrch3isr3chites3onaan3talan5tamrciz4ies3olae3s4mie3skinrcolo4rcrit5an4thies4itses4it_e5sion3anthrrd4an_es5iesr5de4lr3dens4anticrd5essrd5ianan4tiee5sickes5ic_rd3ingesi4anrd1is2rd5lere3sh4aes5encrd5ouse5seg5e3sectescut5esci5eant4ives5chees5canre5altre5ambre3anire5antre5ascreas3oeryth35erwauan4tusreb5ucre3calrec4ceer4vilan5tymre3chaan3um_an5umsap5aroerund5ert5izer4thire3disre4dolape5lireed5iu4cender4terer5tedre3finuccen5re5grare3grereg3rire3groreg3ulaph5emer4repaph5olaphyl3ero5stero5iser3oidern3it4reledre3liarel3icre5ligreli4qrel3liern3isrem5acap5icuub3linern3errem5ulu4bicuren5atr4endiap4ineren4eser4moirenic5ren4itub5blyre5num4eri2ta3planre5olare3olier4iscer3ioure4pereri4onrep5idre3pinre3plere4preeri4nauari4ner3iffre5reare3r2uapo3thre3scrre3selre3semre3serap5ronre5sitre3speapt5at4arabiara5bore5stu3retarre3tenar3agear5agire1t2ore5tonre3trare3trere5trier4ianer3ia_ergi3ver3ettrev3elrevi4ter3etser3et_ar3agoar3allaran4ger3esier5eseere5olr4geneeren4e5erende4remeer5elser5ellr5hel4rhe5oler5el_er3egrer3ealerdi4eerd5arerb5oser3batar5apaer5atuarb5etar4bidty4letri5cliri3colri5corri4craarb3lirid4aler3apyer3apier3aphera4doar4bularch5otwi5liri5gamaren5dri5l4aar5ettar3ev5ar5iff5tur5oequin4rima4gar4illrim3ate4putarimen4e3pur5ept3or5turitr4inetturf5iturb3aep5rimt4uranrins5itu5racep3rehtun5it5rioneepol3iepol3ari5p2ari5piear5iniep3licarm3erris4ise4peteris4paris4pear5mit4ristiri3tonr5it5rep5ertriv4alar3nalar3nisriv3enriv3il5ri5zoar5oidep5arceor4derk5atir5kellrk5enia5rotieol5ata5roucr3kiertud5ier5kin_r5kinsrks4meen4tusent5uptu5denr3l4icr3liner5linsen4tritu4binen5tiarma5cetuari4ent3arr4mancr4manor4marir4maryen4susars5alart5atarth4een4sumens5alrm4icar5m2iden3otyenit5ut4tupermin4erm3ingarth3rar5tizen5iere2n3euen4ettrmu3lie3nessen5esiener5var5un4as5conrn3ateas5cotrn5edlt3tlerr3nessrn5esttti3tuas3ectt5test3encept4tereen3as_rn4inee2n3arrn3isten4annash5ayem4preash5ilem5pesas5ilyempa5rask5erem3orras5ochrob3letstay4e3moniem3oloemod4uemo3birody4n4emnitem4maee4mitaem3ismem5ingem3inar4oledas4silassit5as4tatro5melro3mitas4tiaas3tisemet4eron4ac4ronalas4titron5chron4dorong5ir5onmeem5ero4asto2as3traas4trit5roto4atabiem3anaro3peltro3spem3agor5opteel5tieelp5inel5opsrosi4aro5solel5op_5troopros4tiatar3aro3tatata3t4ro4terelo4dieloc3uelo5caat3eautri3me4roussell5izel4labrow3erelit4ttri3lie4li4seli3onr3pentrp5er_el3ingat3echr3pholrp3ingat5eerrpol3ar2p5ouele3vi3tricuelev3at5ricla5tel_e5lesstres4sele5phel3enor4reo4el5eni4e4ledelea5grricu4tre5prate5lerri4oseld3ertre4moat3entat3eraelast3el5ancel5age4traddeiv3ereit5ertra4co4atesse4ins_to3warehyd5re5g4oneg5nabefut5arsell5rs3er_rs3ersa3thene4fiteath3odr4shier5si2ato3temto5stra5thonrs3ingeem5eree2l1ieed3ere4d5urrstor4to3s4ped3ulo4a3tiator5oitor5ered3imeed5igrrt3ageto5radr4tareed5icsto4posr4tedlr3tel4r5tendrt3enito5piaa2t3in4atinaat5ingede3teton5earth3rir1t4icr4ticlr5tietr5tilar5tilltom5osrt5ilyedes3tr3tinart3ingr3titirti5tue4delee5dansrt5lete5culito4mogec4titrt5ridecti4cec4teratit3urtwis4e4cremtoma4nec3ratec5oroec3oratom3acat4iviec3lipruis5iecip5i4toledec5ath5at5odrun4clruncu42t3oidrun2d4e4caporu5netecal5ea4topsec3adea4toryebus5iebot3oe4belstode5cat3ronat5rouat4tagru3tale4bel_eav5our4vanceavi4ervel4ie3atrirven4erv5er_t4nerer3vestat3uraeatit4e3atifeat5ieeat3ertmo4t5east5iat3urge1as1s3ryngoau5ceraud5ereas5erryth4iaudic4ear4tee5ar2rear4liear3ereap5eream3ersac4teeam4blea3logeal3eread3liead3ersain4teac4tedy4ad_sa5lacdwell3sa3lies4al4t5tletrdvert3sa5minault5id5un4cdum4be5tledrs4an4etlant4san5ifdu5ettau5reodu5elldu5eliau5rordrunk3tiv3isaus5erdri4g3aut3ars5ativti3tradrast4d5railsau5ciaut3erdossi4sa3voudo5simdon4atdom5itt3itisdomin5doman4tit5ildo4lonscar4cdol5ittith4edol3endo4c3u4s4ces5dlestt4istrdi4val1di1v2ditor3av3ageava5latish5idithe4av5alr3tisand4iterd4itas3disiadisen34d5irodi4oladi5nossec5andin5gisecon4dimet4di5mersed4itdi3gamdig3al3di3evdi4ersd5icurse3lecselen55dicul2s4emedic4tesemi5dav5antdic5oldic5amt3iristi5quaav3end5sentmti3pliav3ernti5omosep4side4voisep3tiser4antiol3aser4to4servode3vitde3visdev3ils5estade3tesdes3tid3est_sev3enaviol4aw5er_de3sidde3sectin3uetin4tedes4casfor5esfran5der5os3dero45dernesh4abiaw5ersder4miaw5nieay5sta3dererde5reg4deredde3raiderac4si4allsiast5tin3ets3icatdepen42s5icldeont5si5cul4tinedba5birdens5aside5lsid3enbalm5ideni4eba5lonsi4ersde1n2ade4mosde3morba5nan5tilindemo4nti4letsin5etbardi44demiedel5lisi5nolsi3nusba5romdeli4esi5o5sde3lat5de3isde4fy_bar3onde4cilsist3asist3otigi5odeb5itsit5omdeac3td3dlerd4derebas4tedaugh3dativ4dast5a3d4as2d1an4ts3kierba4th4sk5ily3baticba5tiod4a4gid5ache3ti2encys5toc3utivbat5on4cur4oti3diecur4er1c2ultb4batab4bonecul5abcu5itycub3atctro5tbcord4ti3colct5olo3smithbdeac5tic5asct5ivec4tityc4tituc3t2isbed5elc3tinict5ing4s3oid4te3loct4in_so5lansol4erso3lic3solvebe5dra5ti5bube3lit3some_bend5ac4ticsbe5nigson5atbicen5son5orc4tentbi4ers5soriosor4its5orizc2t5eec3tato5bilesct5antc5ta5gctac5u5c4ruscrost4spast45thoug3b2ill3sperms5pero4thoptcre4to5creti3spher4t5hoocre4p3sp5id_s5pierspil4lcre3atsp3ingspi5nith3oli4creancra4tecras3tbimet55crani5bin4d3spons3spoonspru5dbind3ecous5t3co3trth4is_srep5ucost3aco5rolco3rels5sam24coreds5sengs3sent5th4ioss3er_s5seriss3ers3thinkt5hillbin5etcon4iecon4eyth3eryss4in_s4siness4is_s3s2itss4ivicon4chth3ernco3mo4co5masssol3ut5herds4soreth5erc5colouco3logco3inc4c3oidco3difco3dicsta3bic4lotrs4talebin5i4s3tas_theo3lc3lingbi3re4ste5arste5atbi5rusbisul54s1teds4tedls4tedn4stereth5eas3bituas3terost5est5blastcine5a4cinabs3ti3a3sticks3ticuthal3ms4tilyst3ing5s4tir5cimenth5al_st3lercigar5ci3estch5ousstone3bla5tu5blespblim3as4tose4chotis4tray4chosostrep33strucstru5dbment4tew3arch5oid5chlorstur4echizz4ch3innch4in_ch3ily3chicoche5va3chetech4erltetr5och4eriche3olcha3pa4boledbon4iesu5ingces5trcest5oce3remcer4bites5tusu3pinsupra3sur4ascept3a5testesur3pltest3aboni4ft3ess_bon4spcent4ab3oratbor5eebor5etbor5icter5nobor5iocen5cice4metce5lomter3itt4erinsy4chrcel3aice3darcci3d4ter5ifsy5photer5idcav3ilter3iabot3an3tablica3t2rta3bolta4bout4a3cete3reota3chyta4cidc4atom3casu35t2adjta5dor5terel3cas3scashi4tage5ota5gogca3roucar5oocar5oncar3olcar3nicar3ifter5ecca3reeter3ebta5lept4aliat4alin2tere45tallut2alo43ter3bt4eragtera4c3brachtan5atbran4db4reas5taneltan5iet5aniz4b2rescap3tica5piltent4atark5ican4trte5nog5brief5tennaca3noec2an4eta3stabring5t4ateu3tatist4ato_tat4ouca5nartat3uttau3tobri4osca5lefcal5ar4tenarcab5inb5ut5obut4ivten4ag3butiob5utinbu5tarte5cha5technbus5sibusi4ete5d2abur4rite5monb4ulosb5rist5tegicb5tletbro4mab4stacbso3lubsol3e4teledtel5izbscon4ct4ina",
		7 : "mor4atobstupe5buf5ferb5u5nattch5ettm3orat4call5inmor5talcan5tarcan5tedcan4tictar5ia_brev5ettant5anca3ra5ctand5er_ad4din5ta3mettam5arit4eratocar5ameboun5tital4l3atal5entmonolo4cas5tigta5chom3teres4ta5blemcaulk4iccent5rcces4sacel5ib5mpel5licel5lincen5ded5ternit4sweredswell5icend5encend5ersvest5isvers5acen5tedt5esses_ama5tem5perercen5testest5ertest5intest5orcep5ticmpet5itchan5gi5cherin4choredchor5olmphal5os5toratblem5atston4iecil5lin4mologu4mologss4tern_ster4iaci5nesscla5rifclemat45static4molog_5therapmogast4ssolu4b4theredcon4aticond5erconta5dcor5dedcord5ermpol5itcost5ercraft5ispon5gicra5niuspital5spic5ulspers5a4thorescret5orspens5ac5tariabi4fid_4sor3iecter4iab5ertinberga5mc5ticiabend5erso5metesoma5toctifi4esolv5erc5tin5o_an4on_ct4ivittici5ar3ti3cint4icityc5torisc5toriz4ticulecull5ercull5inbattle5cur5ialmmel5lislang5idal5lersk5iness5kiest4tific_daun5tede5cantdefor5edel5ler_an3ti34dem4issim4plyb4aniti_ant4icde4mons_an4t5osid5eri5timet4dens5er5ti5nadden5titdeposi4zin4c3i_aph5orshil5lider5minsfact5otin5tedtint5erde5scalmis4tindes5ponse5renedevol5u4tionemdiat5omti5plexseo5logsent5eemi5racu_ar4isedic5tat4scuras4scura__ar4isi5scopic3s4cope5t4istedi5vineti5t4ando5linesca5lendom5inodot4tins5atorydress5oaus4tedtiv5allsassem4dropho4duci5ansant5risan5garaun4dresan4ded_ar5sendust5erault5erdvoc5ataul5tedearth5iea4soni4ryngoleassem4eat5enieat4iturv5ers_rus4t5urus5ticrust5eeatric5urust5at_as5sibrup5licminth5oecad5enruncul5ru4moreecent5oa5tivizecon4sc_ateli4_au3g4uec5rean_aur4e5ect5atiec4t5usrtil5le4at4is__av5erar4theneedeter5edi4alsr5terered5icala4t1i4lediges4at5icizediv5idtori4asrswear4ati5citat5icisedu5cerrstrat4eer4ineefact5oming5li_ba5sicef5ereemin4ersath5eteath5eromin4er__be5r4ae5ignitr5salizmind5err5salisejudic44traistmil5iestrarch4tra5ven_blaz5o4m5iliee4lates_bos5omat5enatelch5errrin5getrend5irri4fy_rran5gie4lesteel3et3o_boun4d_bra5chtri5fli_burn5ieli4ers_ca4ginrou5sel_can5tamigh5tiros5tita5talisro5stattro4pharop4ineemarc5aem5atizemat5ole4m3eraron4tonro5nateem4icisnaffil4romant4emig5rarol5iteass5iblassa5giemon5ola4sonedem5orise4moticempara54empli_en3am3o_cen5sot5tereren4cileen4d5alen4dedlttitud45n4a3grend5ritrn5atine5nellee5nereor4mite_r4ming_en3ig3rmet5icirma5tocr4m3atinannot4en4tersen4tifyarp5ersent5rinr5kiesteol5ar_eologi4aro4mas_clem5eriv5eliri5vallris5ternan5teda5rishi3mesti4epolit5tup5lettup5lic_cop5roepres5erink5erme5si4aring5ie_co5terrim5an4equi5noment5or4tut4ivna5turiera4cierig5ant5rifugaar4donear5dinarif5tiear5chetrift5er4erati_4eratimrick4enrich5omrica5tuaran5teer5esteer5estieres5trre5termar4aged_dea5coaract4irest5erre5stalapu5lareri4ciduant5isuant5itres5ist5er5ickapo5strer4imet_de5lecuar4t5iua5terneri5staren4ter5ernaclmend5errem5atoreman4d_del5egerre5laer5sinere5galiert5er_ert5ersrec4t3rr4e1c2rreci5simelt5er_deli5ran4tone_de5nitan4tinges5idenesi5diur4d1an4rcriti4es3ol3urci5nogant5abludi4cinrch4ieru5dinisrch5ateu5ditiorch5ardes3per3mel5lerrcen5eres5piraanis5teesplen5uen4teres4s3anest5ifi_de5resues5trin4cept_rav5elianel5li4r4atom5ra5tolan4donirat4in_r4as5teand5istrass5in5meg2a1et3al5oand5eerrar5ia_an3d4atrant5inuicent55rantelran5teduild5erran4gennch5oloetell5irad4inencid5enra5culorac5ulaet3er3aet5eria3ra3binet5itivui5val5amphi5gam5peri_de5sirqua5tio4e4trala4mium_et5ressetrib5aaminos4am5inizamini4fp5u5tis5ulchrepush4ieev5eratev5eren4ulenciever4erpu5lar_puff5erevictu4evis5in_de5sisfall5inncip5ie_di4al_fend5erpros5trpropyl5proph5eul4l5ibp3roc3apris5inpring5imbival5nco5pat5pressiyllab5iulp5ingpre5matylin5dem4b3ingnct4ivife5veriffec4te_du4al_pprob5am5bererum4bar__echin5fi5anceal5tatipparat5pout5ern4curviumi5liaumin4aru4minedu4m3ingpoult5epor5tieal4orim4poratopon4i4eflo5rical4lish_ed4it_foment4_ed4itialli5anplum4befor4m3a_el3ev3fratch4pla5t4oma5turem4atizafrost5ipis5tilmat4itifuel5ligal5lerpill5ingang5ergariz4aunho5lial5ipotgass5inph5oriz4phonedgest5atg5gererphant5ipha5gedgiv5en_5glass_unk5eripet5allal5endepes5tilpert5isper5tinper4os_al5ance5p4er3nperem5indeleg4gna5turndepre4aint5eruodent4pend5er4gogram_en4dedpearl5indes5crgth5enimas4tinpat4richad4inepas4tinnd5is4ihak4inehal5anthan4crohar5dieha5rismhar4tedaet4or_aerody5pag4atihaught5_er5em5hearch44urantiheav5enurb5ingoxic5olowhith4ur5den_ur5deniowel5lih5erettovid5ennd5ism_her5ialh5erineout5ishoun5ginound5elhet4tedact5oryu5ri5cuheumat5ur5ifieact5ileought5ihi3c4anuri4os_h4i4ersh4manicurl5ingact5atemast4ichnocen5_men5taaci4erso5thermmar4shimantel5ot5estaurpen5tach5isma5chinihol4is_ot4atioot4anico5talito5stome5acanthost5icaosten5tost5ageh4op4te3house3hras5eoy4chosen5ectom4abolicht5eneror5tes_man4icay5chedei5a4g5oori5cidialect4or5este_escal5iatur4aorator5_wine5s_vo5lutich5ingo5quial_etern5us5ticiic4tedloplast4ophy5laid4ines4operag2i4d1itoost5eriff5leronvo5lui4ficaconti5fiman5dar_vic5to_fal4lemament4mal4is__ver4ieila5telonical4i5later_feoff5ili4arl_va5ledil4ificond5ent_ur5eth5ond5arut4toneil5ine_on5ativonast5i_under5ompt5eromot5ivi4matedi4matin_fi5liaimpar5a_fil5tro5lunte4inalit_tular5olon5el5neringinator5_tro4ph_fis4c5inc4tua_trin4aol4lopeoli4f3eol5ies_mal5ari_tran4c_tit4isnerv5inval4iseol5icizinfilt5olat5erin4itud_gam5etxter4m3ink4inein4sch5_tell5evas5el5insect5insec5uinsolv5int5essvat4inaoher4erint5res_tamar5xtens5o_tact4iinvol5ui4omani_gen4et_gen5iave5linei5pheriip5torivel5lerir4alinvel5opiir4alliirassi4nfortu5irl5ingirwo4meo4ducts4lut5arv5en5ue_stat4o_si5gnoverde5v4v4ere4o4duct_odu5cerodis5iaocus5siis5onerist5encxotrop4_ser4ie5vialitist5entochro4n_gnost4_sec5tovi5cariocess4iis4t3iclum4brio5calli4is4tom4itioneit5ress3vili4av5ilisev5ilizevil5linoast5eritu4als_han4de_hast5ii4vers__sa5linlsi4fiai5vilit5ivist_5ivistsnvoc5at_ho5rol_rol4lakinema4ni4cul4nultim5_re5strloth4ie5la5collos5sienight5ilor4ife_re5spolor5iatntup5li5lo5pen_re5sen_res5ci_re5linnt5ressn4trant_re5garloom5erxhort4a_ran5gilong5invol4ubi_ra5cem_put4ten5tition4tiparlo4cus__pos5si_lash4e_len5tint5ing_nit5res_le5vanxecut5o_plica4n4tify__plast45latini_phon4illow5er_li4onslligat4_peri5nntic4u4_pen5dewall5ern5ticizwan5gliwank5erwar5dedward5ern5ticisnth5ine_lo4giawar5thinmater4_pec3t4_pa4tiowav4ine_lous5i_para5t_par5af_lov5ernmor5ti_orner4nt5ativ_or5che_ma5lin_mar5ti_or4at4le5ation5tasiswel4izint4ariun4t3antntan5eon4t3ancleav5erl3eb5rannel5li_nucle5_no5ticlem5enclen5darwill5in_ni5tronsec4tewing5er4lentio5l4eriannerv5a_nas5tinres5tr5le5tu5lev5itano5blemnovel5el3ic3onwol5ver_mor5tilift5erlight5ilimet4e_mo5lec5lin3ealin4er_lin4erslin4gern5ocula_min5uenobser4_met4er_me5rin_me5ridmas4ted",
		8 : "_musi5cobserv5anwith5erilect5icaweight5ica5laman_mal5ad5l5di5nestast5i4cntend5enntern5alnter5nat_perse5c_pe5titi_phe5nomxe5cutio5latiliz_librar5nt5ilati_les5son_po5lite_ac5tiva5latilisnis5tersnis5ter_tamorph5_pro5batvo5litiolan5tine_ref5eremophil5ila5melli_re5statca3r4i3c5lamandrcen5ter_5visecti5numentanvers5aniver5saliv5eling_salt5ercen5ters_ha5bilio4c5ativlunch5eois5terer_sev5era_glor5io_stra5tocham5perstor5ianstil5ler_ge5neti_sulph5a_tac5ticnform5eroin4t5erneuma5to_te5ra5tma5chinecine5mat_tri5bal_fran5ch_tri5sti_fi5n4it_troph5o_fin5essimparad5stant5iv_vent5il4o5nomicssor5ialight5ersight5er__evol5utm5ament_ont5ane_icotyle5orest5atiab5oliziab5olismod5ifiehrill5inothalam5oth5erinnduct5ivrth5ing_otherm5a5ot5inizov5elinghav5ersipass5ivessent5ermater5n4ain5dersuo5tatiopens5atipercent5slav5eriplant5er5sing5erfortu5naplumb5erpo5lemicpound5erffranch5ppress5oa5lumnia_domest5pref5ereprel5atea5marinepre5scina5m4aticpring5ertil4l5agmmand5er5sid5u4a_de5spoievol5utee5tometeetend5erting5ingmed5icatran5dishm5ed5ieset5allis_de5servsh5inessmlo5cutiuest5ratncent5rincarn5atdes5ignareact5ivr5ebratereced5ennbarric5sen5sorier5nalisuar5tersre4t4er3_custom5naugh5tirill5er_sen5sati5scripti_cotyle5e4p5rob5a5ri5netaun5chierin4t5errip5lica_art5icl5at5ressepend5entu4al5lir5ma5tolttitu5di_cent5ria5torianena5ture5na5geri_cas5ualromolec5elom5ateatitud5i_ca5pituround5ernac5tiva_at5omizrpass5intomat5oltrifu5gae4l3ica4rpret5erel5ativetrav5esttra5versat5ernisat5ernizefor5estath5erinef5initeto5talizto5talis_barri5c_authen5mass5ing",
		9 : "_bap5tismna5cious_econstit5na5ciousl_at5omisena5culari_cen5tena_clima5toepe5titionar5tisti_cri5ticirill5ingserpent5inrcen5tenaest5igati_de5scrib_de5signe_determ5ifals5ifiefan5tasizplas5ticiundeter5msmu5tatiopa5triciaosclero5s_fec5unda_ulti5matindeterm5ipart5ite_string5i5lutionizltramont5_re5storeter5iorit_invest5imonolog5introl5ler_lam5enta_po5sitio_para5dis_ora5tori_me5lodio"
	}
};

Hyphenator.config({
	remoteloading : false,
	useCSS3hyphenation : true
});

Hyphenator.run();