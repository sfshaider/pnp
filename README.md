# PNP

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Starting Express Server

From within the root directory:

```sh
npm start
```

### Run Jest Testing

From within the root directory:

```sh
npm test
```
### Shell Script
build.sh file to build and run on docker

### Docker Pull
docker pull sfshaider/pnpsampletask

docker images are set to auto-build on each git push

### API Operations

| HTTP Verb |           Endpoint          |            Action                      |
|-----------| --------------------------- | -------------------------------------- |
| **GET**   |       /contacts/            |  READ data and return all data         |
| **POST**  |       /contacts/            |  CREATE a new contact into DB          |
| **PUT**   |       /contacts/:id         |  UPDATE contact based on id            |
| **GET**   |       /contacts/:id         |  READ data and return contact with id  |
| **DELETE**|       /contacts/:id         |  DELETE contact based on id            |
| **GET**   |       /find/                |  READ contacts with partial search     |

### DB schema
 var doc = { <br>
     "name": { <br>
       "first": String, <br>
       "middle": String, <br>
       "last": String <br>
     }, <br>
     "address": { <br>
       "street": String, <br>
       "city": String, <br>
       "state": String, <br>
       "zip": String <br>
     }, <br>
     "phone": [ <br>
       { <br>
         "number": String, <br>
         "type": String ["home" | "work" | "mobile"] <br>
       } <br>
     ], <br>
     "email": String (unique) <br>
   }; <br>

### Considerations made

a. No unique index was suggested so email field was used to prevent duplicates in post request. <br>
b. Unique id generated by Nedb was used to identify individual records. <br>
c. Nedb auto-loads so does not need to setup. Database appends to only refreshes on restart of server. <br>
d. Console logs on server were retained to make troubleshooting easier. <br>
e. Sample db included. 

### Future enhancements
a. Aynchronous functions on server can be added. <br>
b. Auto-incrementing id in addition to Nedb can be added if required. <br>
c. Individual field update requests can be added. <br>
d. Delete function can be enhanced to identify entry by other fields (currently unique Nedb id). <br>
e. Sort retreived data using a particular field. <br>
f. Add time-stamps for record keeping. <br>
g. Further tests can be written to test above functionalities. <br>

### Technologies used

Express <br>
Nedb <br>
Jest <br>
SuperTest <br>
Faker <br>
Postman <br>
Docker <br>
