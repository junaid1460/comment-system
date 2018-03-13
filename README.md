# Comment System

## Steps
1. Build image first :
    - run `bash build.sh`
2. First time setup / maintainance :
    - to get django container shell run `docker-compose run shell bash`.
    - then run `python manage.py shell` and do the job.
3. After setup, to deploy server :
    1. if you don't have enough RAM (at least 2gb)
        - run `docker-compose up build-static` (for building front-end static files) and wait for it to exit.
        - then run `docker-compose up server`
    2. If you 2GB+ ram `docker-compose up build-run-server` (build and run together)
4. How to handle VM reboots or security threats? :
    - do not run docker containers as root.
    - create a group `docker`.
    - create a user with `nologin` shell under group `docker`.
    - setup a systemd service file run docker containers and copy it to `/etc/systemd/system/`.
    - enable the service `sudo systemctl enable $SERVICE_NAME`.
    - run the service `sudo service $SERVICE_NAME start`.

## LICENCE
MIT
