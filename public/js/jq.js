$(document).ready(function(){
    $(".play-button").hide();
    $(".btn-circle").click(function(){
        var audio = $("#audiosrc").get(0);
        if(audio.paused == false){
            audio.pause();
            $(".play-button").show()
            $(".pause-button").hide()
        }
        else{ 
            audio.play();
            $(".play-button").hide()
            $(".pause-button").show()
        }
   });
});
