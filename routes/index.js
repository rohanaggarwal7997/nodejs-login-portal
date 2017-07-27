var express = require('express');
var router = express.Router();
var mongo=require('mongodb').MongoClient;
var assert=require('assert');
var url='mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Login Server'});
});
router.get('/userregister', function(req, res, next) {
    res.render('userregister', { title: 'User Register'});
});
router.get('/test/:id',function(req,res,next){

  res.render('test',{output:req.params.id})

 })
router.get('/wrong',function(req,res,next){

    res.render('wrong')

})
router.post('/test/submit',function(req,res,next){
  var result=[]
  var id=req.body.id;
  var pass=req.body.pass;
  mongo.connect(url,function (err,db) {
    assert.equal(null,err);
    var cursor=db.collection('userdata').find();
    cursor.forEach(function (doc,err) {
      assert.equal(null,err);
        //if(id==doc.username && pass==doc.pass)
        //{res.redirect('/test/'+id);}
       result.push(doc);
        db.close()
    },function(){
        db.close();
        var condition=false;
        result.forEach(function(item){
            if(id==item.username && pass==item.pass)
            {
                condition=true;
            }
        });
        res.render('check',{condition:condition,id:id,pass:pass});

    });
         // res.redirect('/wrong');

  });
  /*

  */
})

router.post('/register',function(req,res,next){

   var item={
     username:req.body.id,
       pass:req.body.pass
   };

   mongo.connect(url,function(err,db){
     assert.equal(null,err);
     db.collection('userdata').insertOne(item,function(err,result){
       assert.equal(null,err);
       db.close();
     })
   })
   res.redirect('/');
})


module.exports = router;
