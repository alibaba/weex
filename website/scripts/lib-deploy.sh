#!/bin/bash

# copy foundation static file from npm source

F_PATH="node_modules/foundation-sites"
# foundation

for f in $(ls $F_PATH/dist/);
do
    if [[ $f =~ \.js$ ]];then
       echo "$f --> js"
       cp $F_PATH/dist/$f js/vendor/
    fi
    if [[ $f =~ \.css$ ]];then
       echo "$f --> css"       
       cp $F_PATH/dist/$f css/vendor/       
    fi
done

J_PATH="$F_PATH/node_modules/jquery/dist/"
# JQuery

for f in $(ls $J_PATH);
do
    echo "$f --> js"
    cp $J_PATH$f js/vendor/           
done

W_PATH="$F_PATH/node_modules/what-input/what-input.min.js"
echo "what-input.min.js --> js"
cp $W_PATH js/vendor/           

echo "foundation static file deployd"
