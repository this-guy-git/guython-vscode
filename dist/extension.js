"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
function activate(context) {
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
exports.activate = activate;
