/*FontFaceObserver, Bram Stein, https://fontfaceobserver.com/*/
(function(){var k=!!document.addEventListener;function l(a,b){k?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function v(a){document.body?a():k?document.addEventListener("DOMContentLoaded",a):document.attachEvent("onreadystatechange",function(){"interactive"!=document.readyState&&"complete"!=document.readyState||a()})};function w(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function y(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=m;z(a)&&null!==a.a.parentNode&&b(a.g)}var m=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,H=!!window.FontFace;function I(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}D=""!==a.style.font}return D}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,m=a||"BESbswy",x=b||3E3,E=(new Date).getTime();return new Promise(function(a,b){if(H){var K=new Promise(function(a,b){function e(){(new Date).getTime()-E>=x?b():document.fonts.load(J(c,c.family),m).then(function(c){1<=c.length?a():setTimeout(e,25)},function(){b()})}e()}),L=new Promise(function(a,c){setTimeout(c,x)});Promise.race([L,K]).then(function(){a(c)},function(){b(c)})}else v(function(){function q(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=
h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==r&&g==r&&h==r||f==t&&g==t&&h==t||f==u&&g==u&&h==u)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function F(){if((new Date).getTime()-E>=x)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=n.a.offsetWidth,
h=p.a.offsetWidth,q();G=setTimeout(F,50)}}var e=new w(m),n=new w(m),p=new w(m),f=-1,g=-1,h=-1,r=-1,t=-1,u=-1,d=document.createElement("div"),G=0;d.dir="ltr";y(e,J(c,"sans-serif"));y(n,J(c,"serif"));y(p,J(c,"monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);r=e.a.offsetWidth;t=n.a.offsetWidth;u=p.a.offsetWidth;F();A(e,function(a){f=a;q()});y(e,J(c,'"'+c.family+'",sans-serif'));A(n,function(a){g=a;q()});y(n,J(c,'"'+c.family+'",serif'));A(p,function(a){h=
a;q()});y(p,J(c,'"'+c.family+'",monospace'))})})};window.FontFaceObserver=B;window.FontFaceObserver.prototype.check=window.FontFaceObserver.prototype.load=B.prototype.load;"undefined"!==typeof module&&(module.exports=window.FontFaceObserver);}());

/*SuperSizeMe*/
var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode("\
@font-face {font-family: 'FontMini';src: url('" + fontBook.urlMini + "');}\
@font-face {font-family: 'FontMiddle';src: url('" + fontBook.urlMiddle + "');}\
@font-face {font-family: 'FontMaxi';src: url('" + fontBook.urlMaxi + "');}\
*:focus {outline: none;}\
.container{display: inline-block;position: relative;width: 100%;height;100px;white-space: nowrap;}\
.container.alone{display: block;}\
.hiddenTextMin{font-family: FontMini;}\
.hiddenTextMid{font-family: FontMiddle;}\
.hiddenTextMax{font-family: FontMaxi;}\
.hiddenTextMin, .hiddenTextMid, .hiddenTextMax{position: absolute;top:-9999px;left:-9999px;width: 100%;}\
.visibleText{position: relative;width: 100%;}\
.rl{position: absolute;transform-origin: left;}\
.rt{display: none;}\
"));
document.head.appendChild(newStyle);

var fontMini = new FontFaceObserver('FontMini');
var fontMiddle = new FontFaceObserver('FontMiddle');
var fontMaxi = new FontFaceObserver('FontMaxi');

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();
var loader=false;
var lineListA=[];
var lineListB=[];
var text;
var numb=0;
var rl = document.getElementsByClassName('rl');
var rm = document.getElementsByClassName('rm');
var rlMin = document.getElementsByClassName("rlMin");
var rlMid = document.getElementsByClassName("rlMid");
var rlMax = document.getElementsByClassName("rlMax");
var container = document.getElementsByClassName('container');
var workspace = document.getElementsByClassName('workspace');
var hiddenTextMin = document.getElementsByClassName("hiddenTextMin");
var hiddenTextMid = document.getElementsByClassName("hiddenTextMid");
var hiddenTextMax = document.getElementsByClassName("hiddenTextMax");
var visibleText = document.getElementsByClassName("visibleText");
var cA, cB, nbrInstA, nbrInstB, spanTxt, rt, bMid, iMid, valeurLigne;
var large = window.innerWidth;
document.body.onload=function(){Promise.all([fontMini.load(), fontMiddle.load(), fontMaxi.load()]).then(function () {console.log('Font loaded');baseBuilder();interpolationComp();});};
window.onresize=function(){/*loader=true;*/transformLine();waitForFinalEvent(function(){interpolationTrans();}, 500, 'some unique string');};
window.matchMedia("print").addListener(function() {/*loader=true;*/interpolationTrans();})

function baseBuilder(){
	for(var j=0;j<workspace.length;j++){
		wspId = document.querySelectorAll(".workspace")[j];
		var rt = wspId.getElementsByClassName('rt');
		for(var i=0;i<rt.length;i++){
			var str = rt[i].textContent;
			var n = str.search(/<br>/i);
			if(n!=-1){
				text = str.substr(0, n);
			}else{
				text = rt[i].textContent;
			}
			blocBuilder(j, i, rt);
			spanBuilder(j, i, rt);
			rt[i].className = "rt done";
		}
	}
}

function blocBuilder(j, i, rt){

	/*WORKSPACE*/
	container = document.createElement('div');
	if(rt[i].className==="rt alone"){
		container.className = "container alone";
	}else{
		container.className = "container";
	}
	container.id='c'+i;
	container.style.fontSize=rt[i].style.fontSize;
	container.style.position=rt[i].style.position;
	container.style.width=rt[i].style.width;
	container.style.flex=rt[i].style.flex;
	container.style.height=rt[i].style.height;
	container.style.top=rt[i].style.top;
	container.style.left=rt[i].style.left;
	workspace[j].appendChild(container);

	/*container*/
	htMin = document.createElement('div');
	htMin.className = "hiddenTextMin";
	container.appendChild(htMin);

	htMid = document.createElement('div');
	htMid.className = "hiddenTextMid";
	container.appendChild(htMid);

	htMax = document.createElement('div');
	htMax.className = "hiddenTextMax";
	container.appendChild(htMax);

	vt = document.createElement('div');
	vt.className = "visibleText, a"+i;
	vt.setAttribute("contentEditable", true);
	vt.setAttribute("onload", "interpolationComp();");
	vt.setAttribute("oninput", "var class1 = this.className.split(' ')[1];div = document.querySelectorAll('span.'+class1);for(var i=0;i<div.length;i++){div[i].innerHTML=this.textContent;};transformLine();waitForFinalEvent(function(){interpolationComp();}, 500, 'some unique string');");
	vt.setAttribute("onkeypress", "if(event.keyCode == 13){event.preventDefault();/*newLine();interpolationComp();*/alert('No yet!')};");
	container.appendChild(vt);
}



function spanBuilder(j, i, rt){
	spanVisible = document.createElement('span');
	spanVisible.innerHTML = text;
	spanVisible.className="rl a"+i;
	vt.appendChild(spanVisible);

	spanHiddenMin = document.createElement('span');
	spanHiddenMin.innerHTML = text;
	spanHiddenMin.className="rlMin a"+i;
	htMin.appendChild(spanHiddenMin);

	spanHiddenMid = document.createElement('span');
	spanHiddenMid.innerHTML = text;
	spanHiddenMid.className="rlMid a"+i;
	htMid.appendChild(spanHiddenMid);

	spanHiddenMax = document.createElement('span');
	spanHiddenMax.innerHTML = text;
	spanHiddenMax.className="rlMax a"+i;
	htMax.appendChild(spanHiddenMax);
}

function interpolationComp(){
	for(var i=0;i<container.length;i++){
		container[i].style.fontSize=container[i].offsetHeight-3+'px';
		rl[i].style.height=container[i].offsetHeight+'px';
	}
	lineListA=[];
	lineListB=[];
	calculLine();
	transformLine();
	interpo();
	window.setTimeout(function(){resetTransform();}, 2000);
}

function interpolationTrans(){
	window.setTimeout(function(){interpolationComp();}, 100);
}

function newLine(){
	numb++;
	blocBuilder();
	for(var i=0;i<container.length;i++){
		container[i].style.height=container.offsetHeight/numb+'px';
	}
}

function transformLine(){
	if(loader===false){
		for(var i=0; i<rl.length;i++){
			rl[i].style.transform="scale("+ hiddenTextMin[i].offsetWidth/rl[i].offsetWidth +",1)";
		}
	}
}

function resetTransform(){
	for(i=0;i<rl.length;i++){
		rl[i].style.transform="";
		console.log("Reset "+i+" OK");
	}
}

var calculLine=function(){
	cA=0;
	cB=0;
	wspId = document.getElementsByClassName("workspace")[0];
	rt = wspId.getElementsByClassName('rt');
	for(var i=0; i<rl.length;i++){
		if(rlMid[i].offsetWidth>hiddenTextMin[i].offsetWidth){
			valeurLigne=((hiddenTextMin[i].offsetWidth-rlMin[i].offsetWidth)/(rlMid[i].offsetWidth-rlMin[i].offsetWidth));
			//console.log(hiddenTextMin[i].offsetWidth+'/'+rl[i].offsetWidth);
			lineListA.push(valeurLigne);
			rl[i].style.fontFamily= "FontA"+cA+",FontMiddle";
			if(loader===false){
				rl[i].style.transform="scale("+ hiddenTextMin[i].offsetWidth/rlMid[i].offsetWidth +",1)";
			};
			cA++;
		}else if(rlMid[i].offsetWidth==hiddenTextMin[i].offsetWidth){
			rl[i].style.fontFamily="FontMiddle";
		}else{
			valeurLigne=((hiddenTextMin[i].offsetWidth-rlMid[i].offsetWidth)/(rlMax[i].offsetWidth-rlMid[i].offsetWidth));
			//console.log(hiddenTextMin[i].offsetWidth+'/'+rl[i].offsetWidth);
			lineListB.push(valeurLigne);
			rl[i].style.fontFamily= "FontB"+cB+",FontMaxi";
			if(loader===false){
				rl[i].style.transform="scale("+ hiddenTextMin[i].offsetWidth/rlMax[i].offsetWidth +",1)";
			};
			cB++;
		}
	}
	console.log('Liste A: '+lineListA);
	console.log('Liste B: '+lineListB);
	console.log('Liste C: x:'+fontBook.staticFontValue.x +' / y:'+fontBook.staticFontValue.y);
}

plumin.paper.setup('hidden-canvas');

var interpo=function(){
		nbrInstA = lineListA.length;
		nbrInstB = lineListB.length;
		nbrInstC = fontBook.staticFontValue.length;

	var _URL = window.URL || window.webkitURL,
		lastBuffer,
		lastSubset,
		pluminSource,
		lightBuffer,
		heavyBuffer,
		boldBuffer,
		worker,
		worker2,
		worker3,
		lastSubset = _subsetFromText(" abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
		// this font will be used for its addToFonts method
		
		if(nbrInstA!=0){ 
			font = new plumin.Font({
				familyName: 'FontA'
			});
		}

		if(nbrInstB!=0){ 
			font2 = new plumin.Font({
				familyName: 'FontB'
			});
		}

		if(nbrInstC!=0){ 
			font3 = new plumin.Font({
				familyName: 'FontC'
			});
		}

	_get('dist/plumin.js', 'text', function(response) {
		pluminSource = response;
		if ( pluminSource && lightBuffer && heavyBuffer && boldBuffer ) {
			if(nbrInstA!=0){_initWorkerA();}
			if(nbrInstB!=0){_initWorkerB();}
			if(nbrInstC!=0){_initWorkerC();}
		}
	});

	_get(fontBook.urlMini, 'arraybuffer', function(response) {
		lightBuffer = response;
		if ( pluminSource && lightBuffer && heavyBuffer && boldBuffer) {
			if(nbrInstA!=0){_initWorkerA();}
			if(nbrInstB!=0){_initWorkerB();}
			if(nbrInstC!=0){_initWorkerC();}
		}
	});

	_get(fontBook.urlMaxi, 'arraybuffer', function(response) {
		heavyBuffer = response;
		if ( pluminSource && lightBuffer && heavyBuffer && boldBuffer) {
			if(nbrInstA!=0){_initWorkerA();}
			if(nbrInstB!=0){_initWorkerB();}
			if(nbrInstC!=0){_initWorkerC();}
		}
	});

	_get(fontBook.urlMiddle, 'arraybuffer', function(response) {
		boldBuffer = response;
		if ( pluminSource && lightBuffer && heavyBuffer && boldBuffer) {
			if(nbrInstA!=0){_initWorkerA();}
			if(nbrInstB!=0){_initWorkerB();}
			if(nbrInstC!=0){_initWorkerC();}
		}
	});

	function _get(url, type, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open('get', url, true);
		xhr.responseType = type;
		xhr.onload = function () {
			if ( this.status === 200 ) {
				cb( this.response );
			}
		};
		xhr.send();
	}

	function _initWorkerA() {
		//lastSubset = _subsetFromText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()[]")
		worker = new Worker(
			_URL.createObjectURL( new Blob(
				[document.getElementById('workerscript')
					.textContent
					.replace('PLUMINSOURCE', pluminSource)],
				{type: "text/javascript"}
			))
		);
		worker.postMessage({lig: lightBuffer, hea:boldBuffer});
		worker.postMessage(lastSubset);

		worker.onmessage = function(e) {
			if(e.data.id!=undefined){
				lastBuffer = e.data.buf;
				id = e.data.id;
				font.addToFonts( lastBuffer, 'FontA' + id );
				//if(font){
				for(i=0;i<rl.length;i++){
					var test = 'FontA'+id+', FontMiddle';
					if(rl[i].style.fontFamily==test){
						rl[id].style.transform="";
						//console.log(rl[id].textContent);
					}
				}
			}
		};
		_interpolate(0);
	}

	function _initWorkerB() {
		//lastSubset = _subsetFromText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()[]")
		worker2 = new Worker(
			_URL.createObjectURL( new Blob(
				[document.getElementById('workerscript')
					.textContent
					.replace('PLUMINSOURCE', pluminSource)],
				{type: "text/javascript"}
			))
		);

		worker2.postMessage({lig: boldBuffer, hea:heavyBuffer});
		worker2.postMessage(lastSubset);

		worker2.onmessage = function(e) {
			if(e.data.id!=undefined){
				lastBuffer = e.data.buf;
				id = e.data.id;
				font2.addToFonts( lastBuffer, 'FontB' + id );
				//if(font2){
				for(i=0;i<rl.length;i++){
					var test='FontB'+id+', FontMaxi';
					if(rl[i].style.fontFamily==test){
						rl[id].style.transform="";
						//console.log(rl[id].textContent);
					}
				}
			}
		};
		_interpolate(0);
	}


	function _initWorkerC() {
	//lastSubset = _subsetFromText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()[]")
		worker3 = new Worker(
			_URL.createObjectURL( new Blob(
				[document.getElementById('workerscript')
					.textContent
					.replace('PLUMINSOURCE', pluminSource)],
				{type: "text/javascript"}
			))
		);

		worker3.postMessage({lig: lightBuffer, hea:boldBuffer});
		worker3.postMessage(lastSubset);

		worker3.onmessage = function(e) {
			if(e.data.id!=undefined){
				lastBuffer = e.data.buf;
				id = e.data.id;
				font3.addToFonts( lastBuffer, 'FontC' + id );
				//console.log(id);
			}
		};
		_interpolate(0);
	}

	function _subsetFromText( text ) {
		return text.split('')
			.filter(function(e, i, arr) {
				return arr.lastIndexOf(e) === i;
			})
			.sort()
			.join('');
	}

	// TODO: throttle calls
	function _interpolate( value ) {
		if(nbrInstA!=0 && !worker){return;}
		if(nbrInstB!=0 && !worker2){return;}
		if(nbrInstC!=0 && !worker3){return;}

		if(nbrInstA!=0){ 
			var valuesA = Array(nbrInstA).fill(0).map(function(val, i) {
				return lineListA[i];
				// return +value + i/nbrInst;
			});
			worker.postMessage( valuesA );
		}

		if(nbrInstB!=0){ 
			var valuesB = Array(nbrInstB).fill(0).map(function(val, i) {
				return lineListB[i];
				// return +value + i/nbrInst;
			});
			worker2.postMessage( valuesB );
		}
		/* SAUVEGARDÉ ICI AU CAS OÙ ->
		var values = Array(nbrInst).fill(0).map(function(val, i) {
			return +value + i/nbrInst;
		})*/
		if(nbrInstC!=0){ 
			worker3.postMessage( fontBook.staticFontValue );
		}
		
	}

	// TODO: throttle calls
	function _subset( value ) {
		var tmp = _subsetFromText( value );

		if ( tmp !== lastSubset ) {
			if(nbrInstA!=0){ 
				worker.postMessage( tmp );
			}
			if(nbrInstB!=0){ 
				worker2.postMessage( tmp );
			}
			if(nbrInstC!=0){ 
				worker3.postMessage( tmp );
			}
		}
	}
}