var mysql=require('mysql')
var express = require('express');
var router = express.Router();
var fs=require('fs');
var path=require('path');
var multer  = require('multer');
var upload = multer();
var handlebars = require('express-handlebars')
var app = express();


app.use(express.static('public'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/video'));



var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'pandu@123',
  database : 'node'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected 3000 ... nn");    
} else {
    console.log("Error connecting database ... nn"+err);    
}
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('index');
});


router.get('/single', function(req,res,next){
  res.render('video');
});
router.get('/single1', function(req,res,next){
  res.render('video1');
});
router.get('/single2', function(req,res,next){
  res.render('video2');
});
router.get('/single3', function(req,res,next){
  res.render('video3');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/products', function(req, res, next) {
  res.render('products');
});
router.get('/productdetail', function(req, res, next) {
  res.render('productdetail');
});

router.get('/admin', function(req,res,next){
  res.render('admin');
});
router.post('/login',function(req,res)
{
var userid=req.body.username;
var password=req.body.password;
var values=[userid,password];
connection.query('select * from login where username=? and password=?',values,function(err, rows, fields) {

if (!err)
    {
       if(rows.length==1)
          {
              var data ={  
                   child:rows[0],
                      };
           res.render('success',data);
       
          }
     

      else{
            res.sendfile('views/invalid.html');
           }

  }

  else{
    console.log('error while performing query.'+err);
     res.write("error");
      res.end();
     }
 
  });
});
router.get('/client1', function(req,res,next){
  res.render('client');
});


router.post('/upload1',function(req,res)
{
 console.log('req.body');
var x=[req.body.plant_name,req.body.plant_image,req.body.plant_video];

connection.query("insert into plant_details (plant_name,plant_image,plant_video) VALUES (?,?,?)",x,function(err,rows,result) {
   if (!err){
   console.log('ok ', rows);
   res.send(JSON.stringify(rows));
 }
 else{
   console.log('Error while performing Query.'+err);
  res.end();
}
 
});
});



router.get('/plant1',function(req,res){
connection.query('select * from  plant_details ',function(err,rows){
    
if(err) {     
          console.log(err);
          //render the template with error to be alerted//
          res.render('error',{data:null,error:err});                
      }
  console.log(rows);

      //render the template with fetched data//
      
     // res.json({data:rows,error:null});//


     var data ={
         child:rows,
     };
     console.log("message : " + JSON.stringify(data));
     res.render('plant',data);    
});
});

router.get('/single/:plant_id',function(req,res){
  var plant_id = req.params.plant_id;
  console.log("plant_id is"+plant_id);
  var values = [];
  values[0]=plant_id;
    connection.query('SELECT * FROM plant_details WHERE plant_id=?', values,function(err,rows){
      console.log("result : "+rows);

      //render the template with fetched data
     // res.json({data:rows,error:null});
    
     var data ={
         ramya:rows,
    };
     
     console.log("message : " + JSON.stringify(data));
       res.render('video',data);
      
});
});


module.exports = router;
