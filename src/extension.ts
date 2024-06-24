// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "coderbandhu" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "coderbandhu.getDiagrams",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      let info: any = await vscode.window.showInputBox();
      console.log("prrof i was : ", info);
      vscode.window.showInformationMessage(info);
      if (info) {
        // Create and show a new webview panel
        const panel = vscode.window.createWebviewPanel(
          "imagePreview", // Identifies the type of the webview. Used internally
          "Image Preview", // Title of the panel displayed to the user
          vscode.ViewColumn.One, // Editor column to show the new webview panel in.
          {
            localResourceRoots: [
              vscode.Uri.joinPath(context.extensionUri, "images"),
            ],
          } // Webview options. More on these later.
        );

        const imagePath = vscode.Uri.joinPath(
          context.extensionUri,
          "images",
          "ass.jpg"
        );
        const imageUri = panel.webview.asWebviewUri(imagePath);

        // And set its HTML content
        panel.webview.html = getWebviewContent(imageUri);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent(imageUrl: vscode.Uri): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Image Preview</title>
  </head>
  <body>
	<img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;" />
  </body>
  </html>`;
}
