
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
function setImg(){
    // let background_image_location = document.getElementById("background_image_location").files[0].path;
	// let background = document.getElementById("background");
    // background.innerHTML = "";
    // background.style = "background:url(" + background_image_location + ");background-repeat: no-repeat;background-size: 100% 100%;";
    const {ipcRenderer} = require("electron");
    ipcRenderer.send("bg_dialog",true);
}


document.body.addEventListener("click",(event)=>{
    // if(document.getElementById("display_image").style.display == "grid" && document.getElementById("contextmenu").style.display == "none"){
    //     let offsetTop = document.getElementById("display_image").offsetTop;
    //     let offsetLeft = document.getElementById("display_image").offsetLeft;
    //     let clicking_value = event.clientY > offsetTop - 160 && event.clientY < offsetTop + 180 && event.clientX > offsetLeft - 160 && event.clientX < offsetLeft + 180;
    //     console.log(clicking_value);
    //     if(!clicking_value){
    //         document.getElementById("display_image").style.display = "none";
    //      }
    // }
    if(document.getElementById("contextmenu").style.display == "block"){
        document.getElementById("contextmenu").style.display = "none";
    }
});