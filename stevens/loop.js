var actx = new (AudioContext || webkitAudioContext)();

function LoopedAudio(src, gain = 1)
{
    var a = {};
    a.src = src;
    a.buf = null;
    
    a.gainNode = false;
    a.srcNode = false;

    a.decode = function decode(buf)
    {
        actx.decodeAudioData(buf, function (nBuf)
        {
            a.buf = nBuf;

            a.gainNode = actx.createGain();
            a.gainNode.gain.value = gain;
            a.gainNode.connect(actx.destination);

            a.srcNode = actx.createBufferSource();
            a.srcNode.buffer = a.buf;
            a.srcNode.connect(a.gainNode);  
        });
    };

    // Load some audio (CORS need to be allowed or we won't be able to decode the data)
    fetch(a.src, { mode: "cors" })
        .then(function (resp)
        { return resp.arrayBuffer() })
        .then(a.decode);
    
    a.play = function play()
    {
        this.srcNode.loop = true;                  // takes care of perfect looping
        this.srcNode.start();                      // play...
    };

    a.stop = function stop()
    {
        if ((this.srcNode) && (this.gainNode)) this.srcNode.stop();
    }

    return a;
}
