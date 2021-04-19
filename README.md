# File-Reporter

Action that adds the content of all files of a folder as Comment to the current Commit.

## Usage
```yml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@vx.x.x
      - uses: SamhammerAG/File-Reporter@vx.x.x
        where:
          folderPath: example1/files/
          token: ${{ secrets.GITHUB_TOKEN }}
```
