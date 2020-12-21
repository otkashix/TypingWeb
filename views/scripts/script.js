$(document).ready(function() {
    var mode = "dark";
    var time = 0;
    var words = 0;
    var speed = 0;
    var goal = 0;
    var lang = navigator.language;
    var msg = "Al amanecer del quinto día, al alba, mira al este.";
    var pos = 0;

    document.getElementById("message").innerHTML = msg;
    document.getElementById("lang").innerHTML = lang;

    document.getElementById("mode").addEventListener("click",
        function changeMode(){
            if(mode === "dark"){
                mode = "light";
                document.body.style.backgroundColor = "#ffffff";
                document.getElementById("mode").textContent = "Dark";
                document.body.style.color = "black";
                document.getElementById("mode").style.backgroundColor = "#011d20";
                document.getElementById("mode").style.color = "white";
                document.getElementById("write").style.backgroundColor = "#ffffff";
                document.getElementById("message").style.backgroundColor = "#ffffff"; 
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