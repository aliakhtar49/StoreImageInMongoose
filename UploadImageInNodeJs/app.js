
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var form = require('connect-form');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/upload',function(req,res)
{
    var fs = require('fs');
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
//app.use(express.static(path.join(__dirname, 'public')));
// img path
    var imgPath = req.body.file;

// connect to mongo
    mongoose.connect('localhost', 'UploadInNodeJs');

// example schema
    var schema = new Schema({
        img: { data: Buffer, contentType: String }
    });

// our model
    var A = mongoose.model('A', schema);


        var a = new A;
        a.img.data = fs.readFileSync(imgPath);
        a.img.contentType = 'image/png';
        a.save(function (err, a) {
            if (err) throw err;

            console.error('saved img to mongo');


                A.findById(a, function (err, doc) {
                    if (err) return next(err);
                    res.contentType(doc.img.contentType);
                    res.send(doc.img.data);

            });
        });
   // path = req.basename()
   // var newpath = req.body.file;

    console.log(req.body.file);
    res.send("Done");
    });

/*app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);


    res.send("working");


 <form method="post" enctype="multipart/form-data" action="/file-upload">
 <input type="text" name="username">
 <input type="password" name="password">
 <input type="file" name="thumbnail">
 <input type="submit">
 </form>
});*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
