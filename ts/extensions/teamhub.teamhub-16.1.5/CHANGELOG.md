## 16.1.5

- Fixed TypeError appearing in VSCode 1.76.0

## 16.1.4

- Fixed wrong changes showing in the repository view when behind multiple base branches.
- Fixed 'Branch from... existing branch' option when checking out an issue.
- Fixed setup issue tracker button not working if you have not installed GitLive yet.
- Fixed issue tracker notifications showing too often.
- Fixed the cherry pick action in the gutter not working after the first cherry pick.

## 16.1.3

New in this version:
 - **Get notified when you fall behind the remote.** Stay up-to-date with the latest changes on your remote with GitLive’s new pull reminders.
 - **Go live when you want to share your working tree changes.** You can now easily toggle the real-time sharing of your unpushed changes from the repository view.
 - **Specify which branches are not feature branches.** Use the new special branch setting to hoist matching branches to the top level in the repository view.
 - **More granular control over filtering stale branches.** You can now filter branches updated in just the last 24 hours up to the last 3 years.
 
## 16.0.4

- Fixed exec error appearing in VSCode 1.74.0

## 16.0.3

- Fixed 404 on opening links on GitLab.com
- Fixed an error after checking out an issue in Azure
- Fixed default branch name not updating in the team view
- Fixed an error when clicking on "Open file in Azure" from the team view
- Fixed the "Opening file" message not to appear when there is no local clone of the repository 
- Fixed an issue causing the "Unsupported" error notification to appear
- Fixed checking out a detached head when switching branches via issue popup
- Restored ability to switch off all indicators in the gutter 

## 16.0.2

New feature: The Repository View
- By default, the GitLive sidebar now shows all the branches ahead of your local in the tree grouped by contributor, so you can easily see the changes from others relative to your current branch 
- Also by default, if you are signed in, the branches will include any local changes made in a clone of the repository by other signed-in contributors
- If you are behind the remote branch your local branch is tracking or the default branch, these will show at the top level of the tree
- New tree view options let you change what is shown in the repository view:
  * You can see the changes relative to the *common ancestor* between your local branch and theirs (the default) or relative to *their remote branch* meaning you would only see changes not yet pushed to the remote
  * The changes can also be restricted to *their remote branch* meaning you would only see the changes pushed to the remote, or *their working tree* which would include unpushed changes
- Also, new diff view options let you change what is shown in the diff view:
  * Just like the tree view options you can change the left-hand side of the diff between the *common ancestor* and *their remote branch* and the right-hand side between *their remote branch* and *their working tree*
  * The diff view options also support changing the left-hand side to *your working tree* which allows you to see the changes compared to your local version of the file and easily cherry-pick individual changes to your file  
  * The right-hand side view options are also available for your local files open in the main editor to change what is shown in the gutter
- Finally, you can select which repository to show if your workspace contains more than one repository via the team navigation button. Here you can also select the organization for a repository to see all the branches ahead of the default branch grouped by a contributor for every repository in the organization (this was the only view in the previous version of the extension)

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.


## 15.0.11

- Added support for vscode insiders 1.70

## 15.0.9

- Various performance and memory enhancements

## 15.0.8

- Fixed "Unknown icon" error after connecting an issue tracker

## 15.0.7

- Added commit messages to the gutter popup
- Fixed various issues related to updating state based on listening to git change events
- Fixed the infinite loading when clicking "Manage your accounts" while not signed in 
- Fixed the settings only working after multiple clicks

## 15.0.6

- Added support for gutter conflicts for new unpushed files
- Fixed follow cursor not switching off when changing files during codeshare
- Fixed liveshare not being available during a call
- Fixed crash when signing out of last account
- Fixed manage accounts continuously loading
- Fixed link for custom self-hosted URL not showing

## 15.0.5

- Fixed mismatch hash error causing codeshare session to fail
- Fixed unpushed changes not always showing in the gutter
- Fixed filters causing no files to show
- Fixed sign in link not working when there were no branches ahead of the default branch
- Fixed "No git repositories found in this project" until a file is opened on linux

## 15.0.3

New feature: View changes from all branches in the team tree and via the change markers in gutter of the editor
- The team tree shows every branch ahead of main for each user instead of just their current branch
- The gutter change indicators show changes from all branches for each user instead of just their current branch
- Team tree status filters - Filter users (online or offline), branches/issues (todo, in progress, stale) and files (pushed or unpushed).
- Gutter status filters - Filters change indicators by status (pushed, unpushed, non-conflicting, stale)

Introducing Offline Mode
- The team window and gutter indicators now work offline so you can use them without having to sign-in or install GitLive on your Git hosting provider.
- Also in offline mode only the data from your local Git clone is accessed and nothing is sent outside your network.
- And you can still sign in to go real-time and see your teammate's unpushed changes in the gutter and team window.

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 14.0.8

- Fixed possible UI freezes due to sync file access

## 14.0.7

- Fixed crash when opening a project containing git submodules

## 14.0.6

- Fixed issue causing `Cannot find module text-encoding` after installing the extension
- Fixed crash with new repositories before initial branch is pushed

## 14.0.5

- Fixed issue where codesharing with someone without an IDE open would not open the sharing link
- Improved the compression of the plugin to reduce the size
- Handled opening a project with no git repository more gracefully
- Improved handling of files that cannot be opened by the vscode editor e.g. binary files
- Improved error handling when a MacOS user doesnt have xcrun setup on their operating system
- Fixed issue for windows users and long paths
- Fixed issue where creating a file and moving would show an incorrect file status

## 14.0.4

- Fixed crash when user opens a workspace not under git version control
- Changes in a git submodule are ignored
- Added support for repositories using a ssh host alias in a remote url
- Fixed crash when user opens a project not under git version control
- Fixed issue causing error message "Failed to load base revision"
- Fixed issue causing gutter indicators not to show

## 14.0.3

- Fixed issue where opening a teammate's diff would load indefinitely

## 14.0.2

- Fixed issue where viewing a teammate's changes might not show their latest pushed changes

## 14.0.1

- Fixed issue where indexed and unpushed commits were displaying incorrectly
- Fixed issue where submodule changes were appearing as local changes
- Fixed issue when diff was identical then diff content would show blank instead of the full content of the file
- Fixed issue causing diffs from local clones not to load
- Fixed crash when checking out a detached head
- Fixed the open folder or clone repository action

## 14.0.0

New features
- Codeshare without calling - You can now start sharing code with a teammate without getting on a call first.
- View a teammate’s pushed changes - you can now choose to see the changes your teammates have pushed in addition to their local changes in the GitLive window.
- OS-level calling notifications - Never miss a call again with push notifications when you receive a call from a teammate.
- Choose where to branch from when starting a new issue - You can see which branch is already connected to an issue or choose which branch to use as a starting point for a new issue when selecting an issue to work on.

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 13.0.0

New feature: Codeshare now supports Live Share!
- Whilst on a call you can now start a Live Share session with a few clicks
- Requires the sharer to have Live Share installed in VS Code
- Regular GitLive codeshare is still available for quick cross-editor codesharing sessions
- Seamlessly switch between a regular codeshare session and a Live Share session in the same call

Other notable changes
- Option to restrict codesharing to a single open project

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.
    
## 12.1.5

- Fix diagnostics losing sync with host during codeshare
- Changes will not show in the gutter if you have hidden changes in the settings
- Changes from branches deleted on the remote will not show in the gutter
- Added better handling of git failures

## 12.1.4

- Added better handling of git failures

## 12.1.3

- Fixed issue with telemetry

## 12.1.2

- Fixed issue with following across files switching back to previous file

## 12.1.1

- Added fixes for users with intermittent internet connections
- Fixed issue with calling notifications showing again after someone called
- Fixed crash when opening a project with no git credentials

## 12.1.0

New features
 - Following during codeshare now includes opening the hosts files from outside of the shared repo such as library headers
 - You can now associate an issue with a pre-existing branch via the new prompt on checkout of a branch without a connected issue
 - Busy status: Other members of your team will now show as busy in the GitLive tab when on a call (and calling them is disabled)

Other notable changes
 - Fixed file opening on correct line when following during codeshare
 - Gutter popup renders another users changes correctly in the preview
 - Fixed bug where users were unable to add new accounts
 - GitLab self hosted profile images now supported
 - Fixed issue of incorrect url of user profile
 - Fixed issue of rendering of user profile images

## 12.0.3

- Fixed selecting issue in issue selector does not do anything

## 12.0.2

- Improved calling notifications
- Fixed pixelated avatars when calling

## 12.0.1

Fixed error with GitLab repo (#46)
## 12.0.0

New feature: Voice and video calling with screen & code share!
- Make one-to-one calls directly from your editor
- Screenshare any window or desktop
- Codeshare to see each others cursors and edit together simultaneously
- Interoperable between VS Code and all JetBrains IDEs

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.
    
## 11.1.1

Removed requirement for read access to code via API when installing GitLive on your repository hosting service

## 11.1.0

- Global setting to hide gutter conflicts
- Fixed bug with excessive new line on the gutter preview
- Fixed issue with gutter icons refreshing excessively
- Fixed issue where conflict markers cover an additional line

## 11.0.0

New feature: Instant merge conflict detection! 
- See other contributor's changes to a file in the gutter of your editor, updated in real-time
- Conflicts between their version and yours are shown in red 
- Hover over an affected line in the editor to popup the other contributor's branch and connected issue 
- Cherry pick their change from the popup straight into your local file

Other notable changes
 - Remove a local copy from GitLive via the context menu
 - Fixed issue preventing GitLive working in latest version of VS Code Insiders
 - Fixed synchronization issue whilst collaborating

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 10.0.5

- Add open on JIRA action to issues shown in the team window
- Fixed synchronization issue whilst collaborating on files with windows line endings
- Fixed issues with custom GitLab self hosted urls

## 10.0.4

- Fixed an issue causing an uncaught exception

## 10.0.3

- Fixed remote url parsing issues

## 10.0.0

This update brings GitLab Self Hosted support!
- Once installed, open a repository from your GitLab self-hosted instance in VS Code to get started.

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 9.0.1

- Fixed select issue tracker page opening in background

## 9.0.0

New feature: Issue tracking
- The GitLive window now shows which issue each of your teammates' are working on in realtime
- Share your current issue with your team by selecting an issue to work on
- See your current issue in the status bar and click to select a new issue
- Selecting a new issue to work on automatically creates a new branch

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 8.0.1

- Fixed possible synchronization issue whilst collaborating

## 8.0.0

Cherry pick a teammate's changes directly from their local files! Click the cherry icon next to their working copy to pick all their changes or the cherry icon next to their file to pick only the changes in that file.

### Other changes include:

- Improved the stability of real-time editing, in particular when collaborating across JetBrains & VSCode
- Added support for connecting to Azure DevOps via SSH and remote URLs using the old domain visualstudio.com

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 7.0.1

- Fixed sign into new account action on accounts list

## 7.0.0

Welcome to GitLive, the new name for TeamHub, this release upgrades our watch feature to full real-time editing! To work on a teammate's files click the pencil icon next to their name.

### Other changes include:

- Follow/Unfollow your teammates cursor option when collaborating
- New settings for offline mode, hide activity graph, hide working copy changes
- New accounts list to view and manage connected repository hosting service accounts
- Support for Azure DevOps cloud

### Note

As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.

## 5.0.3

- Fixed Bitbucket installation link

## 5.0.2

- Fixed issues with offline, away & online state changes

## 5.0.1

- Initial release
