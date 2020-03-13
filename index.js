const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const {exec} = require('child_process');
let py = exec('python ./PythonScripts/test.py',(err,stdout,stderr)=>{
    // console.log('test');
    // console.log(stdout);
    if(stderr) {
        exec('pip3 install camelcase',(err,stdout,stderr)=>{
           console.log(stdout);
           console.log(stderr);
        });
    }

});

app.post('/saveExperience',function(req,res){
    const data=req.body;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://kd_321:1234@interviewportal-eiozy.mongodb.net/test?retryWrites=true&w=majority";
    console.log('got here');
    const client = new MongoClient(uri, { useNewUrlParser: true });
    MongoClient.connect(uri,function(err,client){
        if(err){
            res.status(500).send("unable to connect to database");
        }else{
            const collection=client.db("Main").collection("Experience");
            let sample={"company":data.company,
                "branch":data.branch,
                "jobtype":data.jobtype,
                "ctc":data.ctc,
                "stipend":data.stipend,
                "rounds":data.rounds,
                "author":data.author,
                "likes":0,
                "accepted":"N"
            };
            collection.insertOne(sample,function(err,resp){
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
