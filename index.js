const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const {exec} = require('child_process');
let py = exec('python ./PythonScripts/test.py',(err,stdout,stderr)=>{
    if(stderr) {
        exec('pip3 install camelcase',(err,stdout,stderr)=>{
           console.log(stdout);
           console.log(stderr);
        });
    }

});
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const uri = "mongodb+srv://kd_321:1234@interviewportal-eiozy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
app.post('/saveExperience',function(req,res){
    const data=req.body;
    MongoClient.connect(uri,function(err,client){
        if(err){
            res.status(500).send("unable to connect to database");
        }else{
            const collection=client.db("Main").collection("Experience");
            let experience={
                "company":data.company,
                "branch":data.branch,
                "jobtype":data.jobtype,
                "jobprofile":data.jobprofile,
                "ctc":data.ctc,
                "stipend":data.stipend,
                "rounds":data.rounds,
                "author":data.author,
                "date": data.date,
                "receivedOffer": data.receivedOffer,
                "likes":0,
                "accepted":data.accepted
            };
            collection.insertOne(experience,function(err,resp){
                if(err) {
                    res.status(500).send("Error");
                    console.log(err);
                }
                else
                    res.status(200).send("Inserted");

            });
            client.close();
        }
    });

});
app.post('/getExperience',(req,res,next) => {
    // console.log('Experience Get Request');
    const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Experience");
            // console.log(req.params.id);
            let cursor=collection.find({_id:ObjectId(data.id)});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            })
        }
    });
});
app.post('/getQuery',(req,res,next) => {
    const data = req.body;
    // console.log('Query request.');
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Queries");
            let cursor=collection.find({_id:ObjectId(data.id)});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                // console.log(resp);
                client.close();
            })
        }
    });
});
app.post('/getAnswers',(req,res,next) => {
    const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Answers");
            const ids = data.id.map(id => ObjectId(id));
            let cursor=collection.find({_id:{$in: ids}});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            })
        }
    });
});

app.post('/updateExperience',(req,res,next) => {
    const data = req.body;
    console.log('Update Experience request.');
    MongoClient.connect(uri,(err,client) => {
        if(err){
            console.log(err);
        }
        else{
            const collection = client.db("Main").collection("Experience");
            collection.updateOne({_id:ObjectId(data.id)},{$set:{accepted:data.accepted}},(err,resp) => {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).send(resp);
                }
                client.close();
            });
        }
    });
});
app.get('/experiences',(req,res,next) => {
    console.log('Experience Get Request');
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Experience");
            let cursor=collection.find({});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            })
        }
    });
});
app.get('/queries',(req,res) => {
    MongoClient.connect(uri,function(err,client){
        if(err){
            console.log("Error while connecting to DB");
            res.status(500).send("Unable to connect to DB");
        }else{
            const collection=client.db("Main").collection("Queries");
            const cursor=collection.find();
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            });
        }
    });
});
app.use(express.static(path.join(__dirname, 'interview-portal-master/build')));
app.get('/api/passwords',(req,res,next) => {
    const passwords = [1,2,3,4,5];
    res.json(passwords);
    console.log('Sent a json array.');
});
app.get('/api/compile',(req,res,next) => {

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/interview-portal-master/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on ${port}`);
