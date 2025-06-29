import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const interpreterPath = path.join(context.extensionPath, 'interpreter', 'run.py');

  const runCommand = vscode.commands.registerCommand('guython.runFile', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor!');
      return;
    }
    const document = editor.document;
    if (!document.fileName.endsWith('.gy')) {
      vscode.window.showErrorMessage('Please open a .gy Guython file!');
      return;
    }

    const terminal = vscode.window.terminals.find(t => t.name === 'Guython Terminal') || 
                     vscode.window.createTerminal('Guython Terminal');

    terminal.show();

    // Wrap the interpreter path in quotes for safety
    terminal.sendText(`python3 "${interpreterPath}" "${document.fileName}"`);
  });

  context.subscriptions.push(runCommand);
}
