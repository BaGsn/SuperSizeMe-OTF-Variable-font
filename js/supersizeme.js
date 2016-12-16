var ssm ={
  subset: '',
  opacityPreview : 0.5,
  fontReady : false,
  preview : true,
  fit: true,
  lines : {},
  generatedFontNbr : 100,
  elementsToFit:'' //#monId, #monId2, #monId3, #monId4
};
var rt = document.getElementsByClassName('rt');
var fontList=[];
var firstRun=true;
var fontIntList =[];
interpolationStep = function() {return 1/(ssm.generatedFontNbr/(ssm.fontBook.wdth.length-1))};

///////////////// INIT /////////////////////

document.addEventListener("DOMContentLoaded", function(){
ssm.loading = [];
var fontLoader = [];
var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode(addFallBack()+".hidden, .hidden-p{position: fixed;top:-9999px;left:-9999px;opacity: 0;white-space: nowrap;} .visible{display:inline-block;white-space:nowrap;transform-origin: left;}.rt[preview*='true']{transform-origin:left;opacity: "+ ssm.opacityPreview +";}"));
document.head.appendChild(newStyle);
for(j=0;j<Object.keys(ssm.fontBook).length;j++){
  for(i=0;i<ssm.fontBook.wdth.length;i++){
    fontLoader.push(new FontFaceObserver('fallback-'+ Object.keys(ssm.fontBook)[j]+i));
    fontList.push(fontLoader[i].load());
  }
}

function addFallBack(){
  var fallBackFull="";
  for(j=0;j<Object.keys(ssm.fontBook).length;j++){
    for(i=0;i<ssm.fontBook.wdth.length;i++){
      fallBackFull+="@font-face {font-family: 'fallback-"+ Object.keys(ssm.fontBook)[j]+i +"';src: url('"+ssm.fontBook[Object.keys(ssm.fontBook)[j]][i]+"');}";
    }
  }
  return fallBackFull;
}

ssm.beforeLoad();

var canvas = document.createElement('canvas');
canvas.id = "hidden-canvas";
canvas.style.display='none';
canvas.width = "1024";
canvas.height = "1024";
canvas.style.visibility = "hidden";
document.body.appendChild(canvas);

var scriptBloc = document.createElement('script');
scriptBloc.id="workerscript";
scriptBloc.type="text/workerscript";
scriptBloc.text="PLUMINSOURCE \
var otFont;var otFont0;var otFont1;var font;var font0;var font1;var coefx;plumin.paper.install(this);plumin.paper.setup({width: 1024,height: 1024});plumin.paper.Font.prototype.addToFonts = function(name, master, line) {var buffer = this.ot.toArrayBuffer();postMessage( {buf:buffer,name: name, master: master, line: line}, [buffer] ); };onmessage = function( message ) {var data = message.data;switch ( Object.prototype.toString.call(data) ) {case '[object Object]': if ( Object.keys(data)[0] === 'lig'){if ( !data.lig || data.lig.constructor !==ArrayBuffer ) {return;}otFont = plumin.opentype.parse( data.lig );otFont0 = plumin.opentype.parse( data.lig );otFont1 = plumin.opentype.parse( data.hea );font = new plumin.paper.Font();var encoding = font.ot.encoding;font.importOT( otFont );font.ot.familyName = 'SSM'+Date.now;font.ot.encoding = encoding;font0 = new plumin.paper.Font();font0.importOT( otFont0 );font0.ot.familyName = 'SSM0'+Date.now;font1 = new plumin.paper.Font();font1.importOT( otFont1 );font1.ot.familyName = 'SSM1'+Date.now;break;}case '[object String]':if (font) {font.subset = data;font.interpolate(font0, font1, coefx);font.updateOTCommands();font.addToFonts();}break;case '[object Array]':if (font) {data.forEach(function(element,i){if(element==undefined){return;}coefx=element.factor;font.interpolate(font0, font1, coefx);font.updateOTCommands();if(element.line){font.addToFonts(element.name, element.master, element.line);}else{font.addToFonts(element.name, element.master);}});}break;}};";

document.body.appendChild(scriptBloc);

function responsiveLine(element, visible, number) {

  this.fontValue = 0;

  this.lineNumber = number;

  this.allElement = element;

  this.hiddenElement = element.getElementsByClassName('hidden');

  this.visibleElement = visible;

  this.oldWidth = visible.offsetWidth;

  this.subset = visible.textContent;

  this.contenteditable = function(){
    if(this.allElement.dataset.contenteditable=='true'){
      return true;
    }else{
      return false;
    }
  };

  this.fallBackFont = function(){
    var data=[];
    for(i=0;i<this.hiddenElement.length;i++){
      var calcul = this.allElement.offsetWidth/this.hiddenElement[i].offsetWidth;
      if(i==0){
        if(calcul<1){
          data.push(1);
        }else{
          data.push(calcul);
        }
      }else if(i==this.hiddenElement.length){
        if(calcul>1){
          data.push(1);
        }else{
          data.push(calcul);
        }
      }else{
        data.push(calcul);
      }
    }
    var value = closest(data,1);
    return ['fallback-wdth'+(data.indexOf(value)), value];
  }

  this.clearPreview = function(){
    if(element.getAttribute("preview")=="true"){
      element.style="";
      this.visibleElement.style="";
      element.setAttribute("preview","false");
      element.setAttribute("variable","true");
    }
  }

  this.interpolationObject = function(){
    var master;
    if(this.hiddenElement[0].offsetWidth==element.offsetWidth){return};
    element.style.minWidth=this.hiddenElement[0].offsetWidth+5+'px';
    for(i=0;i<this.hiddenElement.length;i++){
      if(element.offsetWidth>this.hiddenElement[i].offsetWidth){
        master=i;
      }
    }
    if(master<this.hiddenElement.length-1){
      var data = ((element.offsetWidth-this.hiddenElement[master].offsetWidth)/(this.hiddenElement[master+1].offsetWidth-this.hiddenElement[master].offsetWidth));
    }else{
      master=this.hiddenElement.length-1;
      data=0;
    }

    var intSpaceNbr = (ssm.generatedFontNbr) / (ssm.fontBook.wdth.length-1);
    var value = Math.round( (data * intSpaceNbr) + (master * intSpaceNbr) );

    if(value<0 || value == Infinity){
      value=0;
    }else if(value>100){
      value=99;
    }
    var object = {};
    object.factor=data;
    object.master=master;
    object.name=value;
    object.line=this.lineNumber;
    return object;
  }

  this.interpolate = function(){
    var object = this.interpolationObject();
    ssm.interpolate([object], ssm.subset);
  }

  this.updateInterpolation = function(){
    var object = this.interpolationObject();
    if(!object){return};
    this.fontValue = object.name;
    this.visibleElement.style.fontFamily = 'VFont'+this.fontValue+', '+this.fallBackFont()[0];
  }

  this.updateText = function(newTxt){
    if(typeof newTxt=='string'){
      this.visibleElement.innerHTML = newTxt;
    }
    for(i=0;i<this.hiddenElement.length;i++){
      this.hiddenElement[i].innerHTML=this.visibleElement.innerHTML;
    }
  }

  this.updateSize = function(width, height){
    if(width){this.allElement.style.width=width;};
    if(height){
      this.allElement.style.height=height;
      this.allElement.style.fontSize=height;
    };
    this.updatePreview();
  }

  this.updatePreview = function(){
    var value = this.fallBackFont()[1]
    element.style.fontFamily = this.fallBackFont()[0];
    element.style.transform="scale("+value+",1)";
    element.setAttribute("preview","true");
  }

  this.updateAll = function() {
    this.updateText();
    this.updateInterpolation();
    this.subset = visible.textContent;
  };
}

var inBuild = function(target, j, targetBis, nbrRt){
    var content = target[j].innerHTML;
    ssm.subset +=content;
    target[j].setAttribute('contenteditable','false');
    target[j].innerHTML="";
    if(target[j].style.fontFamily==""){target[j].style.fontFamily = "fallback-wdth0";};
    var span = document.createElement('span');

    if(targetBis){
      if(target[j].dataset.rtId){
        span.id=target[j].dataset.rtId;
      }else{
        span.id="v"+(nbrRt+j);
      }
    }else{
      if(target[j].dataset.rtId){
        span.id=target[j].dataset.rtId;
      }else{
        span.id="v"+j;
      }
    }

    span.className = "visible";
    span.innerHTML = content;
    rt[j].ssm = new responsiveLine(target[j], span, (j+nbrRt));
    span.setAttribute('contenteditable',rt[j].ssm.contenteditable());
    target[j].appendChild(span);

    for (var i=0;i<ssm.fontBook.wdth.length;i++){
      var span = document.createElement('span');
      span.innerHTML = content;
      span.id="v"+(nbrRt+j)+'-h'+i;
      span.className="hidden h"+i;
      span.style.fontFamily = "fallback-wdth"+i;
      target[j].appendChild(span);
    }

    rt[j].onkeyup = function(e){
      if(e.key!="Control"||e.key!="Alt"||e.key!="Meta"||e.key!="ArrowLeft"||e.key!="ArrowRight"||e.key!="ArrowUp"||e.key!="ArrowDown"||e.key!="Shift"||e.key!="Enter"||e.key!="Shift"||e.key!="CapsLock"||e.key!="Tab"||e.key!="Escape"){
        ssm.updateContent(e.path[1]);
        var target = e.path[1];
        ssm.updateContent(target);
        if(e.key=="Backspace"){return};
        if(Array.from(ssm.subset).indexOf(e.key)==-1){
          ssm.subset += e.key;
          animationInterpolation();
        }
      }
    }
    // this.interpolate();
    // this.updateInterpolation();
}

ssm.build = function (target){
  var targetBis=false;
  var nbrRt=0;

  if(typeof target!='object'){
    target = document.querySelectorAll(target);
    for(var w=0;w<rt.length;w++){
      nbrRt++;
    }
    for (var j=0;j<target.length;j++){
      target[j].className = 'rt';
    }
    targetBis = true;
  }

  if(target.length!=undefined){
    for (var j=0;j<target.length;j++){
      inBuild(target, j, targetBis, nbrRt);
    }
  }else if(target.className!=undefined){
    target = [target];
    inBuild(target, 0, targetBis, nbrRt);
  }
}

if(ssm.fontBook.wdth && ssm.fit){
  ssm.build(rt);
}
if(ssm.elementsToFit){
  ssm.build(ssm.elementsToFit);
}
var content = document.getElementById("content");


Promise.all(fontList).then(function () {
  animationInterpolation();
});

plumin.paper.setup('hidden-canvas');
// if(ssm.fit){updateResize();};
});

////////////// FIN INIT ////////////////

////////////////// PLUMIN ///////////////////

ssm.interpolate = function(objectToBeDone, subset){
if(firstRun){console.log('Close your eyes and count to 100!');};
var buffer = [];
var font = [];
var worker = {};

var _URL = window.URL || window.webkitURL,
  lastSubset = _subsetFromText( subset ),
  lastBuffer,
  pluminSource
  ssm.subset = lastSubset;
for (i=0;i<ssm.fontBook.wdth.length;i++){
  font[i] = new plumin.Font({
      familyName: 'font'+i
  });
}
ssm.fontBook.wdth.forEach(function(name, i) {
  _get(name, 'arraybuffer', function(response) {
    buffer[i] = response;
  });
});

_get('js/plumin.js', 'text', function(response) {
  pluminSource = response;
  if ( pluminSource && buffer.length==ssm.fontBook.wdth.length ) {
    _initWorker();
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

function _initWorker() {
  for(i=0;i<(ssm.fontBook.wdth.length-1);i++){
    worker[i] = new Worker(
      _URL.createObjectURL( new Blob(
        [document.getElementById('workerscript')
          .textContent
          .replace('PLUMINSOURCE', pluminSource)],
        {type: "text/javascript"}
      ))
    );

    worker[i].postMessage({lig: buffer[i], hea:buffer[i+1]});
    worker[i].postMessage(lastSubset);

    worker[i].onmessage = function(e) {
      if(e.data.name!=undefined){
        lastBuffer = e.data.buf;
        name = e.data.name;
        font[e.data.master].addToFonts( lastBuffer, 'VFont'+name );
        ssm.loading.push(name);
        if(e.data.line){
          rt[e.data.line].ssm.clearPreview();
          ssm.fontReady = true;
          rt[e.data.line].ssm.updateInterpolation();
          if(firstRun){ssm.afterFontReady();};
        }
        if(ssm.loading.length==100){
          if(firstRun){
            console.log("%cReady!","color:red");
          }
          for(f=0;f<rt.length;f++){
            rt[f].ssm.clearPreview();
            rt[f].ssm.updateInterpolation();
          }
          ssm.fontReady = true;
          if(firstRun){ssm.afterAnimationReady();};
          firstRun=false;
          ssm.loading=[];
        }
      }
    };
    _interpolate(0, i);
  }
}

function _subsetFromText( text ) {
  return text.split('')
    .filter(function(e, i, arr) {
      return arr.lastIndexOf(e) === i;
    })
    .sort()
    .join('');
}

function _interpolate( value, wId ) {
  if(!worker[wId]||!objectToBeDone[i]){return;}
  var valuesA = Array(objectToBeDone.length).fill(0).map(function(val, i) {
    if(objectToBeDone[i].master==wId){
      if(objectToBeDone[i].line){
        return {master: objectToBeDone[i].master, factor: objectToBeDone[i].factor, name: objectToBeDone[i].name, line:objectToBeDone[i].line};
      }else{
        return {master: objectToBeDone[i].master, factor: objectToBeDone[i].factor, name: objectToBeDone[i].name};
      }
    }
  });
    worker[wId].postMessage( valuesA );
}

  function _subset( value, wId ) {
    var tmp = _subsetFromText( value );
    if ( tmp !== lastSubset ) {
        worker[wId].postMessage( tmp );
    }
  }
}

///////////// FIN PLUMIN ///////////////

animationInterpolation = function(){
var total = 0;
var newTotal = 0;
var toBeDone = [];
var objectToBeDone = [];
var toDelete = [];
var newObject = {};
var number = 0;

//CREATION DE LA LISTE DES INSTANCES A CREER
for(i=0;i<(ssm.generatedFontNbr/(ssm.fontBook.wdth.length-1));i+=1){
  toBeDone.push(total);
  total+=interpolationStep();
}

//CREATION DE L'OBJET DES INSTANCES A CREER
for(j=0;j<(ssm.fontBook.wdth.length-1);j++){
  for(i=0;i<toBeDone.length;i+=1){
    var temp={};
    temp["name"] = number;
    temp["master"] = j;
    temp["factor"] = toBeDone[i];
    objectToBeDone.push(temp);
    number++;
  }
}

for (i in rt){
  if(typeof rt[i] == 'object'){
    if(rt[i].getAttribute("variable")!="true" && ssm.preview){
      // rt[i].ssm.interpolate();
      rt[i].ssm.updatePreview();
    }
  }
}
// }
if(ssm.subset==""){
  // var visibleList=[];
  if(rt.length>0){
    for (i in rt){
      if(rt[i].ssm){
        ssm.subset += rt[i].ssm.subset;
        // visibleList.push(rt[i].ssm.visibleElement);
      }
    }
  }
}
ssm.interpolatedList = objectToBeDone;
ssm.interpolate(objectToBeDone, ssm.subset);
}

ssm.updateContent = function(target){
  if(!target.ssm){return};
  target.ssm.updateText();
    if(ssm.fontReady===true){
      target.ssm.updateInterpolation();
    }
    else{
      target.ssm.updatePreview();
    }
}


function isInArray(value, array) {
return array.indexOf(value) > -1;
}


//MOVING DATA IN ARRAY
Array.prototype.move = function (from, to) {
this.splice(to, 0, this.splice(from, 1)[0]);
};
//END

function updateResize(){
  for(j in rt){
    if(typeof rt[j] == 'object'){
      if(rt[j].ssm.oldWidth!=rt[j].ssm.visibleElement.offsetWidth && rt[j].ssm.visibleElement.getBoundingClientRect().bottom>0 && rt[j].ssm.visibleElement.getBoundingClientRect().top<window.innerHeight){
        rt[j].ssm.updateInterpolation();
      }
    }
  }
}


function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

function closest(array,num){
 var i=0;
 var minDiff=1000;
 var ans;
 for(i in array){
      var m=Math.abs(num-array[i]);
      if(m<minDiff){
             minDiff=m;
             ans=array[i];
         }
   }
 return ans;
}

/////////// EVENTS ///////////

// var _timer, _timeOut = 1000;

window.onresize = function(){updateResize();}



/////////// FIN EVENTS ///////////
