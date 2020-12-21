$(document).ready(function() {
    var mode = "";
    var time = 0;
    var words = 0;
    var speed = 0;
    var goal = 0;
    var lang = navigator.language;
    var msg = "Al amanecer del quinto día, al alba, mira al este.";
    var pos = 0;

    document.getElementById("message").innerHTML = msg;
    document.getElementById("lang").innerHTML = lang;

    setInterval(function() {
        document.getElementById("time").innerHTML = time;
        document.getElementById("words").innerHTML = words;
        document.getElementById("speed").innerHTML = speed;
        document.getElementById("goal").innerHTML = goal;

        var write = document.getElementById("write").value;
        var text = document.getElementById("message").textContent.split(" ");

        if(write === " "){
            document.getElementById("write").value = "";
        }

        if(write === text[pos]){
            pos++;
            document.getElementById("write").value = "";
            document.getElementById("message").textContent = "";
            for(var i = 0; i < pos; i++){
                document.getElementById("message").innerHTML += '<span class="green">' + text[i] + ' </span>';
            }
            for(let i = 0; i < text.length - pos; i++){
                document.getElementById("message").innerHTML += text[pos + i] + ' ';
            }
        };

    }, 1000/60);
        
});