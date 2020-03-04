const express = require('express');
const path = require('path');
const app = express();

const {exec} = require('child_process');
let py = exec('python ./PythonScripts/test.py',(err,stdout,stderr)=>{
    console.log('test');
    console.log(stdout);
    if(stderr) {
        exec('pip3 install camelcase',(err,stdout,stderr)=>{
           console.log(stdout);
           console.log(stderr);
        });
    }

});//hello
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/passwords',(req,res,next) => {
    const passwords = [1,2,3,4,5];
    res.json(passwords);
    console.log('Sent a json array.');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on ${port}`);
