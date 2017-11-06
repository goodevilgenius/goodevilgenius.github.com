#!/bin/sh

jq . < "$1" > "$1.pp"
mv -v "$1.pp" "$1"
