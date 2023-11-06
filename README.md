# Code profiles for VS Code

- [How to Create Code Profiles in VSCode](https://dev.to/jsjoeio/how-to-create-code-profiles-in-vscode-3ofo)
- ["Profiles" for VS Code](https://github.com/avanslaars/code-profiles)

```sh
  mkdir -p ~/code-profiles/[profile]/data/User
  mkdir -p ~/code-profiles/[profile]/extensions
```

```sh
  code --extensions-dir ~/code-profiles/[profile]/extensions --user-data-dir ~/code-profiles/[profile]/data
```

```sh
  alias teach="code --extensions-dir ~/code_profiles/[profile]/extensions --user-data-dir ~/code_profiles/[profile]/data"
```

## Helper commands

```sh
  du -sh ./

  find . -name \*.log -delete

  find . -name logs -type d -not -path "./.git/*"

  # alternative and works
  find . -name logs -type d -not -path "./.git/*" -exec rm -Rf {} \;
```