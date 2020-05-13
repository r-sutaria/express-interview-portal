const htmlParser = require('node-html-parser');
const express = require('express');
const path = require('path');
const axios = require('axios');
const hackerEarth = require('hackerearth-node');
const app = express();
const {Expo} = require('expo-server-sdk');
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
            let date = new Date();
            let month = (date.getMonth()+1).toString();
            if(month.length === 1) {
                month = "0"+month;
            }
            date = date.getFullYear() + "-" + month + "-" + date.getDate().toString();
            let experience={
                "company":data.company,
                "branch":data.branch,
                "jobtype":data.jobtype,
                "jobprofile":data.jobprofile,
                "ctc":data.ctc,
                "stipend":data.stipend,
                "rounds":data.rounds,
                "author":data.author,
                "date": date,
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
                // console.log(resp);
                client.close();
            });

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

app.post('/getNotifications',(req,res) => {
   const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            // console.log(data.username);
            let cursor=collection.find({_id:data.user});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp[0].notification);
                client.close();
            })
        }
    });
});

app.post('/username',(req,res,next) => {
   const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            // console.log(data.username);
            let cursor=collection.find({_id:data.username});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            })
        }
    });
});

app.post('/registerUser',(req,res,next) => {
    const data=req.body;
    MongoClient.connect(uri,function(err,client){
        if(err){
            res.status(500).send("Unable to connect to database");
        }else{
            const collection=client.db("Main").collection("Register");
            data.type = "N";
            data.notification = [];
            data.review = [];
            data.token = null;
            collection.insertOne(data,function(err,resp){
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

app.post('/loginUser',(req,res) => {
    const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            let cursor=collection.find({email:data.email,password:data.password});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                if(resp.length === 1) res.status(200).send(resp);
                else{
                    cursor=collection.find({_id:data.username,password:data.password});
                    cursor.toArray((err,resp)=>{
                        if(err) throw err;
                        if(resp.length === 1) res.status(200).send(resp);
                        else res.status(500).send("Invalid credentials");
                    });
                }
                client.close();
            });
        }
    });
});

app.post('/sendMessage',function(req,res) {
    const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            let cursor=collection.find({_id:data.id});
            cursor.toArray((err,resp)=>{
                res.status(200).send(resp[0].notification);
                client.close();
            });
        }
    });
});

app.post('/email',(req,res,next) => {
    const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            let cursor=collection.find({email:data.email});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            })
        }
    });
});

function addNotification(receiver,message,e_id,sender) {
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Register");
            let cursor=collection.find({_id:receiver});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                // client.close();
                // console.log(resp[0].notification)
                let notifications = resp[0].notification;
                notifications.push({
                    message:message,
                    e_id:e_id,
                    sender:sender
                });
                collection.updateOne({_id: receiver}, {$set: {notification: notifications}}, (err, response) => {
                    // console.log(response);
                    console.log(err);
                    client.close();
                })
            })
        }
    });
}

// app.get('/test',(req,res) => {
//     addNotification('kamiyab','test','test','rutvik');
// });



app.post('/updateExperience',(req,res,next) => {
    const data = req.body;
    console.log('Update Experience request.');
    MongoClient.connect(uri,(err,client) => {
        if(err){
            console.log(err);
        }
        else{
            const collection = client.db("Main").collection("Experience");
            if(data.rejectMessage === undefined) {
                collection.updateOne({_id: ObjectId(data.id)}, {$set: {accepted: data.accepted}}, (err, resp) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(resp);
                    }
                    client.close();
                });
            }
            else {
                collection.updateOne({_id: ObjectId(data.id)}, {$set: {accepted: data.accepted}}, (err, resp) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(resp);
                    }
                    addNotification(data.receiver,data.rejectMessage,data.e_id,data.sender);
                    client.close();
                });
            }
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
                // console.log(resp);
                client.close();
            })
        }
    });
});

app.get('/userExperiences/:user',(req,res,next) => {
    console.log('Experience Get Request');
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Main").collection("Experience");
            let cursor=collection.find({author:req.params.user});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                // console.log(resp);
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


app.get('/userQueries/:author',(req,res) => {
    MongoClient.connect(uri,function(err,client){
        if(err){
            console.log("Error while connecting to DB");
            res.status(500).send("Unable to connect to DB");
        }else{
            const collection=client.db("Main").collection("Queries");
            const cursor=collection.find({author:req.params.author});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp);
                client.close();
            });
        }
    });
});

async function getPractice(req,res,link) {
    let resp = await axios.get(link);
    try{
        const root = htmlParser.parse(resp.data);
        const description = root.querySelectorAll('.problemQuestion')[0].innerHTML;
        const title = root.querySelectorAll('.col-lg-12')[0].innerHTML;
        res.status(200).send(JSON.stringify({description: description, title: title}));
    }
    catch(err) {
        console.log(err);
    }
}

app.get('/practice/:id',function (req,res) {
    MongoClient.connect(uri,function(err,client){
        if(err)
            console.log("Error while connecting to DB");
        else{
            const collection = client.db("Questions").collection("gfg");
            let cursor=collection.find({_id:ObjectId(req.params.id)});
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                getPractice(req,res,resp[0].link);
                client.close();
            })
        }
    });
    getPractice(req,res);
});

app.get('/getQuestions/:pg',function (req,res) {
    MongoClient.connect(uri,function(err,client){
        if(err){
            console.log("Error while connecting to DB");
            res.status(500).send("Unable to connect to DB");
        }else{
            const collection=client.db("Questions").collection("gfg");
            const cursor=collection.find();
            const page = req.params.pg*10;
            cursor.toArray((err,resp)=>{
                if(err) throw err;
                res.status(200).send(resp.slice(page-10,page));
                // console.log()
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

let hE = new hackerEarth('a249b98ec56b0a7e52d802c5e4fe57dffa7b3d0f');
app.post('/api/compile',(req,res,next) => {
    const data = req.body;
    let config = {};
    config.time_limit = 1;
    config.memory_limit = 323244;
    config.source = data.code;
    config.language = data.language;
    config.input=data.input;
    hE.compile(config)
        .then(resp => res.status(200).send(resp))
        .catch(err => console.log("Error: "+err));
});

app.post('/api/run',(req,res,next) => {
    const data = req.body;
    let config = {};
    config.time_limit = 1;
    config.memory_limit = 323244;
    config.source = data.code;
    config.language = data.language;
    config.input=data.input;

    hE.run(config)
        .then(resp => res.status(200).send(resp))
        .catch(err => console.log(err));
});

app.get('/token/:id',function(req,res){
    const id=req.params.id;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    MongoClient.connect(uri,function(err,client){
        if(err){
            res.status(500).send("Unable to connect to database");
            client.close();
        }else{
            const collection=client.db("Main").collection("Register");
            collection.findOne({"_id":id},function(err,result){
                if(err||result==null){
                    res.status(500).send({"token":"not a user"});
                }
                else{
                    res.status(200).send({"token":result.token});
                }
                client.close();
            });
        }
    });
});

async function sendNotification(tokenNumber,message) {
    let expo = new Expo();
    let messages = [];
    messages.push({
        to: tokenNumber,
        sound: 'default',
        body: message,
        data: { withSome: 'data' },
    });

    let chunks = expo.chunkPushNotifications(messages);
    for(let chunk of chunks) {
        try{
            return await expo.sendPushNotificationsAsync(chunk);
        }
        catch (e) {
            console.log(e);
        }
    }
}

app.post('/notifyRejection',function(req,res) {
    const data = req.body;
    const tokenNumber = data.tokenNumber,message = data.title+"has been rejected";
    sendNotification(tokenNumber,message)
        .then(resp => {
            res.status(200).send(resp);
            // console.log(resp);
        })
        .catch(err => console.log(err));
});

app.post('/notifyAccept',function(req,res) {
    const data = req.body;
    const tokenNumber = data.tokenNumber,message = data.title+"has been accepted";
    sendNotification(tokenNumber,message)
        .then(resp => {
            res.status(200).send(resp);
        })
        .catch(err => console.log(err));
});

app.get('/getSuggestions/:usr',(req,res) => {
    axios.get('https://portal-python-server.herokuapp.com/getSuggestions/'+req.params.usr)
        .then(resp=>resp.data)
        .then(resp=>res.status(200).send(resp.result))
        .catch(err=>console.log("Error: "+err))
});

app.post('/getProblemId',(req,res) => {
   const data = req.body;
    MongoClient.connect(uri,function(err,client){
        if(err){
            res.status(500).send("Unable to connect to database");
            client.close();
        }else{
            const collection=client.db("Questions").collection("gfg");
            collection.findOne({"link":data.link},function(err,result){
                res.status(200).send({problem:result});
                client.close();
            });
        }
    });
});





app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/interview-portal-master/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on ${port}`);
