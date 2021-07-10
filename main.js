const {app, BrowserWindow, ipcMain} = require("electron");
const process = require("process");

ipcMain.on("exit",(evnt, data)=>{
	if(data){
		process.exit(1);
	}
});


function createWindow(){
	const window = new BrowserWindow({
		height: 715,
		width: 1200,
		icon:"icons/startbutton(1).png",
		minWidth: 720,
		minHeight: 200,
		webPreferences:{
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	});
	window.removeMenu();
	window.maximize();
	window.loadFile("index.html");
	// window.webContents.openDevTools();
    
}

app.whenReady().then(createWindow);

