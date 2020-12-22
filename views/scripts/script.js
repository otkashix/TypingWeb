$(document).ready(function() {
    var mode = "dark";
    var time = 0;
    var words = 0;
    var speed = 0;
    var goal = 0;
    var lang = navigator.language;
    //var msg = "Al amanecer del quinto día, al alba, mira al este.";
    var msg = "Bienvenido a mi página nueva, soy kashix y estoy empezando este proyecto para aprender más sobre la programación. La verdad es que no me ha salido nada mal esta página.";
    var pos = 0;
    var started = false;
    var keys = 0;
    var kspeed = 0;
    var lastime;

    document.getElementById("message").innerHTML = msg;
    document.getElementById("lang").innerHTML = lang;

    // Dark/light mode change
    document.getElementById("mode").addEventListener("click",
        function changeMode(){
            if(mode === "dark"){
                mode = "light";
                document.body.style.backgroundColor = "#9cb9b4";
                document.getElementById("mode").textContent = "Dark";
                document.body.style.color = "black";
                document.getElementById("mode").style.backgroundColor = "#011d20";
                document.getElementById("mode").style.color = "white";
                document.getElementById("write").style.backgroundColor = "#9cb9b4";
                document.getElementById("message").style.backgroundColor = "#9cb9b4"; 
            }else if(mode === "light"){
                mode = "dark";
                document.body.style.backgroundColor = "#011d20";
                document.getElementById("mode").textContent = "Light";
                document.body.style.color = "white";
                document.getElementById("mode").style.backgroundColor = "#ffffff";
                document.getElementById("mode").style.color = "black";
                document.getElementById("write").style.backgroundColor = "#011d20";
                document.getElementById("message").style.backgroundColor = "#011d20";
            }
        }
    );

    // Add and remove placeholder
    $('#write').focus(function(){
        $(this).removeAttr('placeholder');
    });

    $('#write').focusout(function(){
        $(this).attr('placeholder', 'Write here');
    });

    // Start the count
    $("#write").keypress(function(){
        keys++;
        if(!started){
            started = true;
            lastime = Date.now();
        }
    });

    // Each frame
    setInterval(function() {
        document.getElementById("time").innerHTML = time;
        document.getElementById("words").innerHTML = words;
        document.getElementById("speed").innerHTML = speed;
        document.getElementById("goal").innerHTML = goal;
        document.getElementById("keys").innerHTML = keys;
        document.getElementById("cpm").innerHTML = kspeed;

        //console.log(lastime);

        var write = document.getElementById("write").value;
        var text = document.getElementById("message").textContent.split(" ");

        if(write === " "){
            document.getElementById("write").value = "";
        }

        // Add up the count
        if(started){
            if(Date.now() > (lastime + 1000)){
                console.log(lastime)
                lastime = Date.now();
                time++;
            }
        };

        if(write === text[pos]){
            // Add up words count
            if(text[pos] !== text[text.length - 1]){
                words++;
            }else{
                started = false;
                speed = Math.floor((words / (time / 60)));
                kspeed = Math.floor((keys / (time / 60)));
            };            

            pos++;
            document.getElementById("write").value = "";
            document.getElementById("message").textContent = "";
            for(var i = 0; i < pos; i++){
                document.getElementById("message").innerHTML += '<span class="green">' + text[i] + ' </span>';
            };
            for(let i = 0; i < text.length - pos; i++){
                document.getElementById("message").innerHTML += text[pos + i] + ' ';
            };
        };

    }, 1000/60);
        
});