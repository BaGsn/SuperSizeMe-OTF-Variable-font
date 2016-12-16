/**
 * Created by Michael on 31/12/13.
 */

// /**
//  * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
//  * which samples the input and turns it into an FFT array. The object has two properties:
//  * streamData - this is the Uint8Array containing the FFT data
//  * volume - cumulative value of all the bins of the streaData.
//  *
//  * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
//  */

var activList=[];
var read = document.getElementById('read');
var trackList = document.getElementsByClassName('trackList');

document.getElementById('player').addEventListener('playing',function() {
read.className="carre";},false);
document.getElementById('player').addEventListener('pause',function() {
read.className="triangle";},false);

var SoundCloudAudioSource = function(player) {
    var self = this;
    var analyser;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    player.crossOrigin = "anonymous";
    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // RÉCUP DES DONNÉES AUDIO POUR AGIR SUR L'UI
    var oldValue=0;
    var loader={};
    var w = 0;
    loader.draw = function() {
    	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    	analyser.getByteFrequencyData(freqByteData);
      requestAnimationFrame(loader.draw);
      var soundValue = freqByteData[10];
      var freqChoice = Math.round((freqByteData.length/6)/rt.length);
          if(soundValue!=oldValue || soundValue==0){

            for (j = 0; j < rt.length; j++) {
              if(j>3){
                var bonus = j+1;
            }else{
                var bonus = 1;
            }
              fontValue = rt[j].ssm.hiddenElement[0].offsetWidth* freqByteData[freqChoice*j]/256*4.08*bonus;
              rt[j].style.width = fontValue + 'px';

              if(rt[j].ssm.trailCache){
                var trailDom = rt[j].ssm.trailDom;

                rt[j].ssm.trailCache.unshift(rt[j].ssm.fontValue);
                rt[j].ssm.trailCache.splice(trailDom.length, 1);

                for(i=0;i<trailDom.length;i++){
                    trailDom[i].style.fontFamily = "VFont"+ rt[j].ssm.trailCache[i]+", fallback-wdth0";

                }

              }

              if(rt[j].ssm){
                rt[j].ssm.updateInterpolation();
              }
            }
          }
          oldValue = soundValue;
    }
    loader.draw();

    var sampleAudioStream = function() {
        analyser.getByteFrequencyData(self.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += self.streamData[i];
        }
        self.volume = total;
    };
    setInterval(sampleAudioStream, 20);
    // public properties and methods
    this.volume = 0;
    this.streamData = new Uint8Array(128);
    this.playStream = function(streamUrl) {
        // get the input stream from the audio element
        player.addEventListener('ended', function(){
            self.directStream('coasting');
        });
        player.setAttribute('src', streamUrl);
        player.pause();
    }
};

var wH, rS, rB;
/**
 * Makes a request to the Soundcloud API and returns the JSON data.
 */
var SoundcloudLoader = function(player,uiUpdater) {
    var self = this;
    var client_id = "237d195ad90846f5e6294ade2e8cf87b"; // to get an ID go to http://developers.soundcloud.com/
    this.sound = {};
    this.streamUrl = "";
    this.errorMessage = "";
    this.player = player;
    this.uiUpdater = uiUpdater;
    /**
     * Loads the JSON stream data object from the URL of the track (as given in the location bar of the browser when browsing Soundcloud),
     * and on success it calls the callback passed to it (for example, used to then send the stream_url to the audiosource object).
     * @param track_url
     * @param callback
     */
    this.loadStream = function(track_url, successCallback, errorCallback) {
        SC.initialize({
            client_id: client_id
        });
        SC.get('/resolve', { url: track_url }, function(sound) {
            if (sound.errors) {
                console.log("Url sound error")
                errorCallback();
            } else {

                if(sound.kind=="playlist"){
                    self.sound = sound;
                    self.streamPlaylistIndex = 0;
                    self.streamUrl = function(){
                      if(sound.tracks[self.streamPlaylistIndex]){
                        return sound.tracks[self.streamPlaylistIndex].stream_url + '?client_id=' + client_id;
                      }else{
                        return sound.uri + '?client_id=' + client_id;
                      }
                    }
                    successCallback();
                }else{
                    self.sound = sound;
                    self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id; };
                    successCallback();
                }
            }
        });
    };


    this.directStream = function(direction){
        if(direction=='toggle'){
            if (this.player.paused) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }
    }
};

/**
 * Class to update the UI when a new sound is loaded
 * @constructor
 */
var UiUpdater = function() {

    this.built = false;

    this.update = function(loader) {
    // update the track and artist into in the controlPanel
    if(this.built === false){this.startBuilder(loader);}
    };

    this.startBuilder = function(loader){

      var titre = document.getElementById('titre');
      var artist = document.getElementById('artiste');

      var artistLink = document.createElement('span');
      artistLink.innerHTML = loader.sound.user.username;
      artist.appendChild(artistLink);

      if(loader.sound.kind=="playlist"){
              titleTrack = document.createElement('span');
              titleTrack.innerHTML = loader.sound.tracks.title;
              titre.appendChild(titleTrack);

              titleSound = document.createElement('span');
              titleSound.innerHTML = loader.sound.title;
              trackLink.appendChild(titleSound);
      }else{
          titre.innerHTML = loader.sound.title;
          titre.href = loader.sound.permalink_url;
      }
      this.built = true;
    }
};

window.onload = function() {
    var firstTime = true;
    var player =  document.getElementById('player');
    var uiUpdater = new UiUpdater();
    var loader = new SoundcloudLoader(player,uiUpdater);
    read.onclick=function(){
      for (i = 0; i < trackList.length; i++) {
          var list = trackList[i].querySelectorAll('.rt');
          if (trackList[i].getAttribute("data-activate") == "true") {
              activList = trackList[i].querySelectorAll('.rt');
          }
      };
      loader.directStream('toggle');
    };

    var audioSource = new SoundCloudAudioSource(player);
    var form = document.getElementById('form');
    var loadAndUpdate = function(trackUrl) {
        loader.loadStream(trackUrl,
            function() {
                audioSource.playStream(loader.streamUrl());
                uiUpdater.update(loader);
            },
            function() {
                uiUpdater.displayMessage("Error", loader.errorMessage);
            });
    };
    // on load, load the song url
    var trackUrl = 'https://soundcloud.com/mattstewartevans/chilly-gonzales-train-of-thought-piano-cover';
    loadAndUpdate(trackUrl);

    window.addEventListener("keydown", keyControls, false);

    function keyControls(e) {
      if(typeof e == String){
        e.keyCode = e;
      }
        switch(e.keyCode) {
            case 32:
                // spacebar pressed
                loader.directStream('toggle');
                // e.preventDefault();
                break;
        }
    }
};
