/* eslint-disable no-unused-vars */
/* eslint-disable indent */
//let taskbar = document.getElementsByClassName("taskbar")[0];
const os = require("os");
const {ipcRenderer, globalShortcut, app} = require("electron");
const process = require("process");
const path = require("path");
const file_system = require("fs");
let user_name = os.userInfo().username;


setInterval(()=>{
    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    
    document.getElementById("time").innerText = hh + ":" + mm;
    document.getElementById("date").innerText = month + "/" + day + "/" + year;
});
ipcRenderer.send("backend_json",true);
ipcRenderer.on("desktop_background",(evnt,data)=>{
    if(data == ""){
        let background_node = document.getElementById("background");
        background_node.innerHTML = "<video autoplay muted><source src='video.webm' type='video/webm'></video>";
    }
    else{
        let background_node = document.getElementById("background");
        background_node.style = "background:url(" + data + ");background-repeat: no-repeat;background-size: 100% 100%;";
    }
});
ipcRenderer.on("change_background",(evnt, data)=>{
    let background_node = document.getElementById("background");
    background_node.innerHTML = "";
    background_node.style = "background:url(" + data + ");background-repeat: no-repeat;background-size: 100% 100%;";
});


const {exec} = require("child_process");
let taskbar_json = require("./taskbar.json");

document.getElementById("user_name").innerText = user_name;


document.querySelectorAll(".tasks").forEach(item=>{
	item.addEventListener("click",()=>{
        let item_id = item.id;
        if(item_id == "startbutton"){
            let startmenu = document.getElementById("startmenu");
            if(startmenu.style.bottom == "50px"){
                document.getElementById("tiles").style.transform = "translate(0px,0)";
                startmenu.style.bottom = "-655px";
            }
            else{
                startmenu.style.bottom = "50px";
            }
        }
        else if (item_id == "exit") {
            process.exit(1);
        }
        else{
            exec(taskbar_json[item_id].run_command,function(err, data){
                console.log(err);
                console.log(data.toString());
            });
        }
	});
});


document.querySelectorAll(".appk").forEach(item=>{
    item.addEventListener("click",()=>{
        let images = item.getElementsByTagName("img");
        let item_id = images[0].id;
        if (item_id == "exit") {
            ipcRenderer.send("exit",true);
        }
        else{
            exec(taskbar_json[item_id].run_command,function(err, data){
                console.log(err);
                console.log(data.toString());
            });
        }
    });
});


document.querySelectorAll(".upcoming_feature").forEach(item=>{
    item.addEventListener("click",()=>{
        alert("This feature will introduce soon. Stay with us to enjoy it");
    });
});

document.body.addEventListener("contextmenu",(event)=>{
    var cX = event.clientX;
    var cy = event.clientY;
    document.getElementById("contextmenu").style.display = "block";
    document.getElementById("contextmenu").style.top = cy + "px";
    document.getElementById("contextmenu").style.left = cX + "px";
});



// eslint-disable-next-line no-unused-vars
function all_apps_button(){
    document.getElementById("tiles").style.transform = "translate(-650px,0)";
}

// eslint-disable-next-line no-unused-vars
function back_to_start_tile(){
    document.getElementById("tiles").style.transform = "translate(0px,0)";
}

function refresh(){
    ipcRenderer.send("refresh",true);
}

function contextCommand(clicked_id){
    exec(taskbar_json[clicked_id].run_command,function(err, data){
        console.log(err);
        console.log(data.toString());
    });
}



  

