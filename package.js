const vsce = require('@vscode/vsce');

async function packageExtension() {
  try {
    await vsce.createVSIX();
    console.log('Packaged successfully!');
  } catch (e) {
    console.error('Packaging failed:', e);
  }
}

packageExtension();
