
let actx = new (AudioContext || window.webkitAudioContext)();

window.LoopedAudio = function (src, gain = 1)
{
    let audio = this;
    audio.src = src;
    audio.buf = null;
    
    audio.gainNode = false;
    audio.srcNode = false;

    audio.decode = function decode(buf)
    {
        actx.decodeAudioData(buf, (nBuf) => {
            audio.buf = nBuf;

            audio.gainNode = actx.createGain();
            audio.gainNode.gain.value = gain;
            audio.gainNode.connect(actx.destination);

            audio.srcNode = actx.createBufferSource();
            audio.srcNode.buffer = audio.buf;
            audio.srcNode.connect(audio.gainNode);  
        });
    };

    // Load the audio (CORS needs to be allowed or we won't be able to decode
    // the data).
    fetch(audio.src, { mode: "cors" })
        .then((resp) => resp.arrayBuffer())
        .then(audio.decode);
    
    audio.play = function play()
    {
        this.srcNode.loop = true;
        this.srcNode.start();
    };

    audio.stop = function stop()
    {
        if ((this.srcNode) && (this.gainNode)) this.srcNode.stop();
    }

    return audio;
}
