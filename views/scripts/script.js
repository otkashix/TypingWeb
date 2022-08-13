$(document).ready(function() {
    var fails = [];
    var corrects = [];
    var mode = localStorage.getItem('webTheme') ?? "dark";
    var time = 0;
    var words = 0;
    var speed = 0;
    var goal = localStorage.getItem('savedGoal') ?? 0;
    var lang = navigator.language ?? "en";
    var msg = "";
    var pos = 0;
    var started = false;
    var keys = 0;
    var kspeed = 0;
    var lastime;
    var lastmsg = -1;

    // Set the local storage
    if(typeof(Storage) !== "undefined") {
        goal = localStorage.getItem("savedGoal", 0);
    }else{
        goal = 0;
        localStorage.setItem('savedGoal', 0);
        localStorage.setItem('webTheme', "dark");
    }

    // Takes a text depending of the language
    function randomText(){
        fetch('/scripts/texts.json')
        .then(response => response.json())
        .then(data =>{
            number = Math.floor(Math.random() * data[lang].length);
            if(number == lastmsg){
                for(let i = 0; i < 1;){
                    number = Math.floor(Math.random() * data[lang].length);
                    if(number != lastmsg){
                        i++;
                    }
                }
            }
            lastmsg = number;
            msg = data[lang][lastmsg];
            document.getElementById("message").textContent = msg;
        });
    }
    randomText();

    function resetFinish(){
        started = false;
        pos = 0;
        time = 0;
    }

    function resetStart(){
        speed = 0;
        words = 0;
        keys = 0;
        kspeed = 0;
        corrects = [];
        fails = [];
    }

    document.getElementById("lang").innerHTML = lang;

    // Dark/light mode change
    document.getElementById("mode").addEventListener("click",
        function changeMode(){
            if(mode === "dark"){
                mode = "light";
                localStorage.setItem("webTheme", String(mode));
                document.body.style.backgroundColor = "#9cb9b4";
                document.getElementById("mode").textContent = "Dark";
                document.body.style.color = "black";
                document.getElementById("mode").style.backgroundColor = "#011d20";
                document.getElementById("mode").style.color = "white";
                document.getElementById("write").style.backgroundColor = "#9cb9b4";
                document.getElementById("message").style.backgroundColor = "#9cb9b4"; 
            }else if(mode === "light"){
                mode = "dark";
                localStorage.setItem("webTheme", String(mode));
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
            resetStart();
        }
    });

    // It's being executed 120 times each second
    setInterval(function() {
        document.getElementById("time").innerHTML = time;
        document.getElementById("words").innerHTML = words;
        document.getElementById("speed").innerHTML = speed;
        document.getElementById("goal").innerHTML = goal;
        document.getElementById("keys").innerHTML = keys;
        document.getElementById("cpm").innerHTML = kspeed;

        var write = document.getElementById("write").value;
        var text = msg.split(" ");

        // Add up the count
        if(started){
            if(Date.now() > (lastime + 1000)){
                lastime = Date.now();
                time++;
            }
        };
            
        if(pos >= text.length){

            pos = 0;

            speed = Math.floor((words / (time / 60)));
            kspeed = Math.floor((keys / (time / 60)));
            if(goal == 0){
                goal = speed;
                localStorage.setItem('savedGoal', Number(speed));
            }else if(speed > goal){
                goal = speed;
                localStorage.setItem('savedGoal', Number(speed));
            }
            randomText();
            resetFinish();
            resetStart();
        }
    }, 1000/120);


    document.body.onkeyup = function(e){
        if(e.code === 'Space'){ //e.keyCode == 32

            if(started){
                var write = document.getElementById("write").value;
                var write = write.replace(' ', '');
                var text = msg.split(" ");

                if(write === text[pos]){
                    corrects.push(pos);
                    //console.log("Correctas - " + corrects)
                }else{
                    fails.push(pos);
                    //console.log("No - " + fails)
                }

                // Update the position of the current word to be written
                pos++;

                // Add up words count
                if(text[pos] !== text[text.length - 1]){
                    words++;
                }

                // Clear the text and the writting bar
                document.getElementById("write").value = "";
                document.getElementById("message").textContent = "";

                // Set colors
                for(let i = 0; i < text.length; i++){
                    if(fails.includes(i)){
                        document.getElementById("message").innerHTML += '<span class="fail">' + text[i] + ' </span>';
                    } else if(corrects.includes(i)){
                        document.getElementById("message").innerHTML += '<span class="correct">' + text[i] + ' </span>';
                    }else if(i == pos){
                        document.getElementById("message").innerHTML += '<span class="current">' + text[i] + ' </span>';
                    }else{
                        document.getElementById("message").innerHTML += text[i] + ' ';
                    }
                }
            }
                        
        }
    }
        
});