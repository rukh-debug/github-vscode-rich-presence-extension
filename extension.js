// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const socketIOClient = require('socket.io-client')
const vscode = require('vscode');
const { basename } = require('path');

//import config
const config = vscode.workspace;
let ENDPOINT = config.getConfiguration('endpoint').get('OfSocketIoServer')
let SPEED = config.getConfiguration('speed').get('InSec')
// convert speed to ms
//

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('github-vscode-richpresence.testGithubVScode', function () {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage('github-vscoe-richpresence Working fine')
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);


	// my code goes hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
	// workspace info and everything

	let getTime = () => {
		var date = new Date();
		var timeMil = date.getTime();
		return timeMil
	}
	
	let getWorkspaceInfo = () => {
		let info = {
			filename: "no file opened",
			wspace: "idle",
			time: getTime()
		}
		if (vscode.window.activeTextEditor) {
				info[`filename`] = basename(vscode.window.activeTextEditor.document.fileName)
				info[`wspace`] = vscode.workspace.name
				info[`time`] = getTime()
		}
		return info
	}

	setTimeout(() => {
		setInterval(() => {
			const socket = socketIOClient(ENDPOINT);
			let info = getWorkspaceInfo()
			socket.emit('update', info)
		}, SPEED * 1000)

	}, 300)
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
