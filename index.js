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
app.post('/saveExperience',function(req,res){
    const data=req.body;
    const uri = "mongodb+srv://kd_321:1234@interviewportal-eiozy.mongodb.net/test?retryWrites=true&w=majority";
    console.log('got here');
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
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
        }
    });

});
app.get('/experiences',(req,res,next) => {
    console.log('Experience Get Request');
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://kd_321:1234@interviewportal-eiozy.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Experience");
            let cursor=collection.find();
            let arr=[];
            cursor.each(function(err,doc){
                if(doc!=null){
                    if(doc.accepted==="Y"){

                        arr.push({
                            "id":doc._id,
                            "company":doc.company,
                            "branch":doc.branch,
                            "jobtype":doc.jobtype,
                            "jobprofile":doc.jobprofile,
                            "receivedOffer":doc.receivedOffer,
                            "ctc":doc.ctc,
                            "stipend":doc.stipend,
                            "rounds":doc.rounds,
                            "author":doc.author,
                            "likes":doc.likes,
                            "accepted":doc.accepted,
                            "date":doc.date
                        });
                    }
                }
                else{
                    client.close();
                    res.status(200).send(arr);
                }
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
