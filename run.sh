#!/bin/bash

bash ./build.sh
docker-compose up build-static
docker-compose up server    