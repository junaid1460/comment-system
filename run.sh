#!/bin/bash

bash ./build.sh
freemem=`cat /proc/meminfo |grep MemFree|xargs  echo|cut -d' ' -f2`
freemem=$(($freemem / 1000 ))
if [ "$(( $freemem > 1500 ))" == "1" ]
then
    echo "Having enough free memory : running all services at once"
    docker-compose up build-and-run
else
    echo "Not enough menory: building static files first and then running server"    
    docker-compose up build-static
    docker-compose up server    
fi

