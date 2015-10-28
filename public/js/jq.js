$(document).ready(function(){
    var audio = $("#audiosrc").get(0);

    $("body").on("dragover", function(ev) {
        ev.preventDefault();
        console.log("Dragenter");

    });

    $("body").on("drop", function(ev){
        ev.preventDefault();
        console.log("Drop");
        var files = ev.originalEvent.dataTransfer.files;
        if(files.length > 0){
            var url = URL.createObjectURL(files[0]);
            var name = files[0].name;
            audio.pause();
            audio.setAttribute('src', url);
            audio.load();
            if(audio.paused){
                $(".play-button").hide()
                $(".pause-button").show()
            }
            audio.play();
        }
    });

    $(".play-button").hide();
    $(".btn-circle").click(function(){
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
