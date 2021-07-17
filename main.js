/* eslint-disable no-undef */
const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const process = require("process");
const editJsonFile = require("edit-json-file");
const path = require("path");
// const file_system = require("fs");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";



ipcMain.on("exit",(evnt, data)=>{
	if(data){
		process.exit(1);
	}
});


function createWindow(){
	const window = new BrowserWindow({
		icon:"icons/startbutton(1).png",
		titleBarStyle: "hiddenInset",
		webPreferences:{
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	});

	let predefined_desktop_json = {
		"background":""
	};

	const file_system = require("fs");
	let file_dir = path.join(app.getPath("userData"),"/desktop.json");
	if(!file_system.existsSync(file_dir)){
		file_system.writeFileSync(file_dir,JSON.stringify(predefined_desktop_json));
	}

	//window.removeMenu();
	window.maximize();
	window.loadFile("index.html");
	window.setResizable(false);
	// window.webContents.openDevTools();
	

	ipcMain.on("backend_json",(evnt,data)=>{
		if(data){
			let desktop_json = require(path.join(app.getPath("userData"),"/desktop.json"));
			evnt.reply("desktop_background",desktop_json.background);
		}
	});


	ipcMain.on("refresh",(evnt, data)=>{
		if(data){
			window.reload();
		}
	});
	ipcMain.on("bg_dialog",(event, data)=>{
		if(data){
			dialog.showOpenDialog({
				filters:[
					{ name: "Images", extensions: ["jpg", "png", "gif"] }
				]
			}).then((result)=>{
				let desktop_json = editJsonFile(path.join(app.getPath("userData"), "/desktop.json"));
				let file_location = result.filePaths[0];
				let file_location_splited = file_location.split(path.sep);
				var file_location_css = "";
				for(var i = 0;i < file_location_splited.length;i++){
					if(i == 0){
						file_location_css += file_location_splited[i] + "//";
					}
					else{
						file_location_css += file_location_splited[i] + "/";
					}
				}
				file_location_css = file_location_css.substr(0,file_location_css.length - 1);
				desktop_json.set("background",file_location_css);
				desktop_json.save();
				event.reply("change_background",file_location_css);
			});
		}
	});
    
}

app.whenReady().then(createWindow);

