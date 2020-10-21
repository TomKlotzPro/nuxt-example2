# nuxt-example2

## Build Setup


```bash
# copy env variable file 
$ cp /server/.local.server.config.example /server/local.server.config.js

# write a secret in the SESSION_SECRET variable

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

You can switch from POSTGRES to JSON in the featureflags files by changing the value of `STORAGE` with `JSON` or `POSTGRES` 


## POSTGRES 

Unsure you properly installed your db and you fill correctly the `/server/local.server.config.js` with your credentials. 

### Create or drop the table 

You can switch from creating and dropping table by changing the value of `TABLE` with `CREATE` or `DROP` 
Then you can run the script 
```bash 
$ node -r esm server/init-db.js
```

