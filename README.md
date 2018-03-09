# Comment System

# Steps
1. Build image first (run `bash build.sh`)
2. setup mongodb
    - run `docker-compose run mongo-shell bash `
    - create mongo shell `mongo --host 10.10.10.2`
    - create user `db.createUser({user : 'junaid', pwd : 'root', roles : [ { role : "userAdminAnyDatabase", db : "admin" }]})`
    