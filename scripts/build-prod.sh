#!/bin/bash

# In order to grant the terminal permission to run this file, run:
# chmod u+x path/to/this/file

# Also make sure you are using the correct .env.production so the
# npm run build:prod script works correctly.

echo "🤐 Zipping dist folder"

if [ -z "$1" ]; then
  echo "You need to run this command with a directory"
  exit 0
fi

distDir="${1}"

# versionNumber=$(npm run get-version)

# zipFileName="ethos-extension-v$versionNumber"

zipFileName="ethos-extension"

echo $zipFileName

# Get desktop path
test -f ${XDG_CONFIG_HOME:-~/.config}/user-dirs.dirs && source ${XDG_CONFIG_HOME:-~/.config}/user-dirs.dirs

zip -r "${XDG_DOWNLOADS_DIR:-$HOME/Downloads}/$zipFileName" "$distDir"

echo "✅ Saved to ${XDG_DOWNLOADS_DIR:-$HOME/Downloads}/$zipFileName"