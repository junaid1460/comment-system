# Comment System

# Steps
1. Build image first (run `bash build.sh`)
2. First time setup / maintainance
    - to get django container shell run `docker-compose run shell bash`
    - then run `python manage.py shell` and do the job.
3. After setup, to deploy server
    - run `docker-compose up server`
4. How to handle VM reboots or security threats?
    - do not run docker as root.
    - create group `docker`.
    - create user with `nologin` shell under group `docker`.
    - setup a systemd service file and copy it to `/etc/systemd/system/`
    - enable the service `sudo systemctl enable $SERVICE_NAME`
    - run the service `sudo service $SERVICE_NAME start`

# LICENCE
MIT
