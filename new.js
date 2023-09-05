const express = require('express');
const app = express();
const port = 3000;

const { createPool } = require('mysql');
const pool = createPool({
  host: "localhost",
  user: "root",
  password:"",
  database: "users",
});

app.get('/users', (req, res) => {
  pool.query('select*from person', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});
app.get('/users/:id/:userid/:name/:gender/:username', (req, res) => {
  let { id, userid, name, gender, username } = req.params;
  let insert = `INSERT INTO person (id, userid, name, gender, username) VALUES ('${id}', '${userid}', '${name}', '${gender}', '${username}')`;
   pool.query(insert, (err, result) => {
    if (err) {
      console.log('ERROR');
      res.send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.send({ id, userid, name, gender, username });
    }
  });
});
app.get('/users/:b/:name',(req,res)=>{
  let  name=req.params.name;
  let  id=req.params.b;
  let update=`update person set name='${name}'where id='${id}'`;
  pool.query(update,(err,result)=>{
    if (err) {
      console.log('ERROR');
      res.send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.json({msg:"inserted data successfully",name});
    }
  });
});
app.get('/users/:a',(req,res)=>{
let id=req.params.a;
let del=`delete from person where id='${id}'`;
pool.query(del,(err,result)=>{
  if (err) {
    console.log('ERROR');
    res.send('Errorin delete  data');
  } else {
    console.log('Data delete successfully');
    res.send("delete successfully :",id);
  }
});
});

app.get('/products', (req, res) => {
  pool.query('select*from products', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.get('/fav', (req, res) => {
  pool.query('select*from fav', (err, result) => {

    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});
app.get('/fav/:userid/:product_id',(req,res)=>{
  let userid=req.params.userid;
  let product_id=req.params.product_id;
  let shweta=`insert into fav (userid,product_id) values('${userid}','${product_id}')`;
  pool.query(shweta,(err,result)=>{
    if (err) {
      console.log('ERROR');
      res.send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.send({msg:"inserted data successfully",userid});
    }
  })
});
app.get('/fav/:s', (req, res) => {
  let id=req.params.s;
  pool.query('select*from fav', (err, result) => {
    if (err) {
      console.log(err);
    }
    let data=result.filter(e=>e.userid==id);
    res.send(data);
  });
});
app.get('/favo/:q',(req,res)=>{
   let product=req.params.q;
   pool.query('select*from fav',(err,result)=>{
    if(err){
      console.log(err);
    }
    let data1=result.filter(e=>e.product_id==product);
    res.send(data1);
   });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});