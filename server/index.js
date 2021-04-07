const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/contact.js');

const app = express();
const PORT = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ADD CONTACT (using unique email addresses only)
app.post('/contacts/', (req, res) => {
    var input = req.body;
    input.name.first = input.name.first.charAt(0).toLowerCase() + input.name.first.slice(1);
    input.name.last = input.name.last.charAt(0).toLowerCase() + input.name.last.slice(1);

    db.contactInfo.ensureIndex({ fieldName: 'email', unique: true }, function (err) {
        if (err) {
            res.status(400).send('unable to insert');
            // console.log('unable to insert ' + err)
        } else {
            db.contactInfo.insert(input, function (err, newDoc) {    
                if (err) {
                    res.status(404).send('user already exists');
                    // console.log('user already exists ' + err);
                } else {
                    res.status(201).send(req.body.name.first + " " + req.body.name.last + " was created");
                    // res.send(newDoc);
                    }
                });
        }
    });

});

//GET ALL CONTACTS LIST
app.get('/contacts/', (req, res) => {
    db.contactInfo.find({}, function (err, docs) {
        if (err) {
            res.status(404).send('unable to access contact list');
            // console.log('unable to access contact list ' + err);
        } else {
            var result = docs;
            result.forEach(function(user) {
                user.name.first = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1);
                user.name.last = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1);
              });
            res.status(200).send(result);
        }
    });
});

//FIND CONTACT (using unique id only)
app.get('/contacts/:id', (req, res) => {
    db.contactInfo.find({_id: req.params.id}, function (err, docs) {
        if (err) {
            res.status(404).send('invalid id or does not exist');
            // console.log('invalid id or does not exist ' + err);
        } else {
            if (docs.length === 0) {
                res.status(400).send('invalid id or does not exist');
            } else {
                docs[0].name.first = docs[0].name.first.charAt(0).toUpperCase() + docs[0].name.first.slice(1);
                docs[0].name.last = docs[0].name.last.charAt(0).toUpperCase() + docs[0].name.last.slice(1);
                res.status(200).send(docs);
             }
            }
        });
});

//FIND CONTACT (using partial first or last name - input to be provided as key) 
// http://localhost:{PORT}/find?=

app.get('/find', (req, res) => {
    let query = req._parsedUrl.query.substring(1);
    db.contactInfo.find( { $or: [ { 'name.first': new RegExp(query) }, { 'name.last': new RegExp(query) } ] }, function (err, docs) {
        if (err) {
            res.status(404).send('unable to access contact list');
            // console.log('unable to access contact list ' + err);
        } else {
            if (docs.length === 0) {
            res.status(400).send('no possible matches');
             } else {
                var result = docs;
                result.forEach(function(user) {
                    user.name.first = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1);
                    user.name.last = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1);
                  });
                res.status(200).send(result);
              };
        }
    });
});

//UPDATE CONTACT (using unique id)
app.put('/contacts/:id', (req, res) => {
    var input = req.body;
    input.name.first = input.name.first.charAt(0).toLowerCase() + input.name.first.slice(1);
    input.name.last = input.name.last.charAt(0).toLowerCase() + input.name.last.slice(1);

    db.contactInfo.update({ _id: req.params.id }, input, function (err, numReplaced) {
        if (err) {
            res.status(404).send('unable to update user ' + req.body.name.first + " " + req.body.name.last);
            // console.log('unable to update user ' + err);
        } else {
            if (numReplaced > 0){
                res.status(200).send(req.body.name.first + " " + req.body.name.last + " was updated");
            }
            else {
                res.status(400).send('no record updated');  
            }
            // console.log('documents updated: ', numReplaced);
        }
    });
});

//DELETE CONTACT (using unique id)
app.delete('/contacts/:id', (req, res) => {
    db.contactInfo.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        if (err) {
            res.status(404).send('unable to remove id: ' + req.params.id);
            // console.log('unable to remove id: ' + err);
        } else {
            if (numRemoved > 0) {
                res.status(200).send('id removed successfully: ' + req.params.id);
            }
            else {
                if (numRemoved > 0){
                    res.status(200).send(req.body.name.first + " " + req.body.name.last + " was deleted");
                                // console.log('documents removed: ', numRemoved);
                }
                else {
                    res.status(400).send('no record deleted');  
                }
            }
        }
    });
});

var server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
  
  module.exports = server;

