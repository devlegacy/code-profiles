# GitKraken Authentication for Visual Studio Code

This extension provides support for authenticating to GitKraken. It registers the `gitkraken` Authentication Provider that can be leveraged by other extensions.

## Using the Authentication Provider

Once the extension is installed, you can use VS Code API to get a session using the `gitkraken` provider:

```ts
const session = await vscode.authentication.getSession('gitkraken', ['login'], { createIfNone: true });
vscode.window.showInformationMessage('Session:' + session.account.label);
```

This will launch the browser and will request the user to login with their GitKraken account and will return back Visual Studio Code.

## Release Notes

### 1.0.0

Initial release
