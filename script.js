/* eslint-disable no-unused-vars */
/* eslint-disable indent */
//let taskbar = document.getElementsByClassName("taskbar")[0];
const os = require("os");
const {ipcRenderer} = require("electron");
const process = require("process");
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
//let ms_store = document.getElementById("store");
const {exec} = require("child_process");
let taskbar_json = require("./taskbar.json");

document.getElementById("user_name").innerText = user_name;


document.querySelectorAll(".tasks").forEach(item=>{
	item.addEventListener("click",()=>{
        console.log(item.id);
        let item_id = item.id;
        if(item_id == "startbutton"){
            // let startmenu = document.getElementById("startmenu");
            // if(startmenu.style.bottom == "50px"){
            //     startmenu.style.bottom = "-655px";
            // }
            // else{
            //     startmenu.style.bottom = "50px";
            // }
            console.log("");
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


document.querySelectorAll(".icons").forEach(item=>{
	item.addEventListener("click",()=>{
        console.log(item.id);
        let item_id = item.id;
        if(item_id == "startbutton"){
            // let startmenu = document.getElementById("startmenu");
            // if(startmenu.style.bottom == "50px"){
            //     startmenu.style.bottom = "-655px";
            // }
            // else{
            //     startmenu.style.bottom = "50px";
            // }
            console.log("");
        }
        else if (item_id == "exit") {
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


function clicked(){
    let startmenu = document.getElementById("startmenu");

        if(startmenu.style.bottom == "50px"){
            document.getElementById("tiles").style.transform = "translate(0px,0)";
            startmenu.style.bottom = "-655px";
        }
        else{
            startmenu.style.bottom = "50px";
        }
}

// eslint-disable-next-line no-unused-vars
function all_apps_button(){
    document.getElementById("tiles").style.transform = "translate(-650px,0)";
}

// eslint-disable-next-line no-unused-vars
function back_to_start_tile(){
    document.getElementById("tiles").style.transform = "translate(0px,0)";
}

  

