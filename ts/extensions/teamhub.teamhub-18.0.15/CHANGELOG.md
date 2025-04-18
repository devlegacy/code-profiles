## 18.0.15

- Fixed GitLab self-hosted incorrectly connecting via HTTP instead of HTTPS

## 18.0.14

- Fixed branches not showing in repo view before signing in
- Fixed diffs not opening when clicking files in the repo view

## 18.0.13

- Add support for signing in in Cursor
- Fixed possible race condition causing sign in not to succeed until restart of IDE
- Performance improvements and reduced diff loading times
- Fixed "This no longer exists on github.com" when a file was renamed but the diff is too large to detect renames
- Fixed unhandled NotFoundException
- Fixed GitException 128 on repositories containing paths with spaces
- Fixed  IndexOutOfBoundsException: Index 1 out of bounds for length 1

## 18.0.12

- Fixed GitLive has stopped due to an uncaught exception: aO
- Fixed unhandled NotFoundException
- Fixed This no longer exists on github.com

## 18.0.11

- Hide branches that don't share a merge base with head or the default branch
- Reduced Repository view loading time
- Fix issues signing in with Azure DevOps
- Fixed The Git process exited with the code 1
- Fixed IndexOutOfBoundsException: Index 1 out of bounds for length 1
- Fixed ClientRequestException: invalid: 401 Unauthorized
- Fixed PERMISSION_DENIED: Missing or insufficient permissions.
- Fix Cannot refresh due to API rate limit showing when not rate limited

## 18.0.10

- Only consider changes as conflicts if they conflict with the changes you've made on your branch stack
- Fixed AssertionError: startOffset: 1713
- Fixed IllegalArgumentException: Text contains windows line breaks
- Fixed GitException 128: M...

## 18.0.9

- Fixed ClientRequestException 400 Bad Request
- Fixed timeout of some GitHub API requests
- Fixed loading stuck on "No remotes found in this repository"
- Fixed "Could not determine repository hosting service" error for GitHub Enterprise Server
- Fixed GitException: 129: malformed object name 'HEAD'
- Fixed GitException: 128: No tags can describe
- Fixed "Something went wrong: Unexpected error" on sign in with Azure DevOps

## 18.0.8

- Stop showing commits to pull from a tracked branch if no files were changed
- Fixed Sorry, something went wrong: Failed to execute git error
- Fixed Sorry, something went wrong: This no longer exists
- Fixed PERMISSION_DENIED: Missing or insufficient permissions
- Fixed GitException: no merge base

## 18.0.7

- Add hide diff in hover popup option in gutter menu
- Fixed unhandled JsonDecodingException
- Fixed branches not present on the remote showing in tree
- Fixed unhandled error notification exit code 129
- Add open this file command when your local is left
- Show correct view option menu in python notebook diffs

- ## 18.0.6

- Fixed unhandled GitException: unknown option 
- Fixed unhandled TooLargeException
- Fixed high cpu and memory load issues
- Fixed Diff is too large to show
- Fixed 404 when clicking an added file in the repository view

## 18.0.5

Merge conflicts are now flagged in the following places:

- **Tracked branches** with commits to pull that conflict with the changes on your local branch are highlighted with an exclamation mark and the count of conflicting files is shown beside the branch.
- **Their branches** that conflict with your branch are also highlighted with exclamation marks, these appear beside the authors, branches and files as you expand each level.- **Diff editors** opened by selecting a file with conflicts from Tracked branches or Their branches will have their conflicting lines highlighted red in the right-hand gutter of the diff editor.
- **Text editors** contain bright red indicators in the gutter highlighting conflicts with other branches, these work just as they did before but with some added improvements.

NOTE: As this is a major version update make sure your whole team upgrades, all team members need to use the same major version of the plugin otherwise you may find some features do not work correctly.
