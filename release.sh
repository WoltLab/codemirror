#!/bin/sh
set -e
cd "$(dirname "$0")"

npm run check
rm -rf dist
npm run build

target=../WCF/wcfsetup/install/files/js/3rdParty/codemirror6
rm -rf "$target"
cp -R dist "$target"
