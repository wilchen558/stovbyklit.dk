#!/bin/sh
rsync -av -e ssh public/* root@139.59.208.242:/var/www/stovbyklit.dk/html
