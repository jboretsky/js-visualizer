function create(){

    var bar_x, bar_width, bar_height;

    var audio = document.getElementById("audiosrc");

    //some styling for the elements based on window size
    audio.style.width = window.innerWidth/3;
    audio.style.margin = "5px";
    document.getElementById('bars').width = 600;
    document.getElementById('bars').height = 600;
    document.getElementById('circle').checked = true;

    context = new (AudioContext || webkitAudioContext)();
    analyser = context.createAnalyser();
    
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 128;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var canvas = document.getElementById('bars');
    var ctx = canvas.getContext('2d');

    var center_x = canvas.width/2;
    var center_y = canvas.height/2;
    document.getElementById('but').style.left = canvas.width/2 -55;
    document.getElementById('but').style.top = canvas.height/2 -35;
    audio.style.width = canvas.width;

    draw()

    function draw(){
        window.requestAnimationFrame(draw);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray);

        //drawing style depends on which radio box is checked
        if(document.getElementById('bar').checked){
            document.getElementById('but').style.display = "none";
            document.getElementById('audio-container').firstChild.controls = true;
            for(var i=0;i<bufferLength;i++){
                bar_x = i*(canvas.width/(bufferLength));
                bar_width = (canvas.width/(bufferLength)) - 1;
                bar_height = (dataArray[i]*3 - 200);
                ctx.fillStyle = 'rgb(0,' + (i*10) + ',0)';
                ctx.fillRect(bar_x, 0, bar_width, 2);
                ctx.fillRect(bar_x, 0, bar_width, bar_height);
            }
        }
        if(document.getElementById('circle').checked){
            document.getElementById('but').style.display = "block";
            document.getElementById('audio-container').firstChild.controls = false;
            for(var i=3;i<bufferLength-20;i++){
                var radius = (i-3)*(5) + 55;
                bar_height = (dataArray[i]);
                var opacity;
                if(bar_height > 170) opacity = bar_height/300 * 1.25;
                else opacity = bar_height/300;

                ctx.beginPath();
                ctx.arc(center_x, center_y, radius+(1*(i-3)), 0, 2* Math.PI, false);
                ctx.strokeStyle = 'rgba('+ (i-3)*4 +',0,0,' + opacity + ')';
                ctx.lineWidth=10;
                ctx.stroke();
            }
        }
    }
}

window.onload = create;
