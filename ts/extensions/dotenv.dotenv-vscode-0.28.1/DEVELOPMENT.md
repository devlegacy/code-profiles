# DEVELOPMENT

## Setup

```
npx dotenv-vault pull
```

## Running in Debug Mode

Open this project in VSCode.

Then in VSCode click `Run` > `Start Debugging`.

That will open up a second VSCode that you can refresh when making changes. [see more](https://www.youtube.com/watch?v=a5DX5pQ9p5M)

CMD + R to refresh the extension, after making changes.

## Tests

```
npm test
```

## Packaging

Package it locally.

```
npm run package
```

## Installing

Install it locally.

```
npm run install-package dotenv-vscode-x.x.x.vsix
```

or install it by hand through Visual Studio Code.

Click `Extensions` > `...` > `Install from VSIX` > `Select dotenv-vscode-*-*-*.vsix`

[1] https://community.particle.io/t/how-to-install-a-vscode-extension-from-a-vsix-file/51014
[2] https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix

## Publishing

For those with access.

```
npm version patch
npm run publish
```

[1] https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions
[2] https://marketplace.visualstudio.com/manage/publishers/dotenv

## Icons

List of all icons [https://code.visualstudio.com/api/references/icons-in-labels](https://code.visualstudio.com/api/references/icons-in-labels)
List of all icons [https://microsoft.github.io/vscode-codicons/dist/codicon.html](https://microsoft.github.io/vscode-codicons/dist/codicon.html)

## List of keywords

Find list of keywords here: https://stackoverflow.com/questions/10834765/where-to-find-a-list-of-scopes-for-sublime2-or-textmate

## Reference Theme Colors

https://stackoverflow.com/questions/47117621/how-to-get-the-vscode-theme-color-in-vscode-extensions

## Inspiration

[GitHub Pull Request Extension](https://github.com/microsoft/vscode-pull-request-github/blob/main/package.json)
