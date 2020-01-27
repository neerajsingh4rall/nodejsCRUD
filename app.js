const http = require('http');
const server = http.createServer(handleReqRes);
server.listen('12344',()=>{
    console.log('server started');
});

function handleReqRes(req,res){
    if(req.url=='/'){
        serveStaticContent('/index.html',res);
    }

    else
    if(isStaticContent(req.url)){
        serveStaticContent(req.url,res);
    }
   
    // else
    // if(request.url.indexOf('/register')>=0 && request.method=='GET'){
    //     const url = require('url');
    //     var obj = url.parse(request.url, true);
    //     console.log('INside GET ',request.url, " Obj ",obj.query);
    //     if(obj.query.userid == obj.query.pwd){
    //         response.write('Welcome '+obj.query.userid);
    //     }
    //     else{
    //         response.write('INvalid Userid or password');
    //     }
    //     response.end();
    // }
    // else
    // if(request.url.indexOf('/dologin')>=0 && request.method=='GET'){
    //     const url = require('url');
    //     var obj = url.parse(request.url, true);
    //     console.log('INside GET ',request.url, " Obj ",obj.query);
    //     if(obj.query.userid == obj.query.pwd){
    //         response.write('Welcome '+obj.query.userid);
    //     }
    //     else{
    //         response.write('INvalid Userid or password');
    //     }
    //     response.end();
    // }
    else
    if(req.url=='/register' && req.method=='POST'){
        const queryString = require('querystring');
        var postData = '';
        req.on('data',(chunk)=>{
            postData+=(chunk);
        })
        req.on('end',()=>{
            var obj = queryString.parse(postData);
            console.log('Data is ',postData, " Obj is ",obj);
              var userCrud = require('./helpers/usercrud');
              let msg = userCrud.add(obj);
           
              console.log(msg);
              res.setHeader('content-type','text/html');
              function submit() {
                var userCrud = require('./helpers/usercrud');
                obj.userid = h.value;
                userCrud.add(obj);
                console.log('i am submit');
                }
                let h =`<input name='name0' type='text' value='${obj.userid}'><br>`;
                let h1 =`<input name='name1' type='text' value='${obj.password}'><br>`;
                let h2 =`<input name='name2' type='text' value='${obj.name}'><br>`;
                let h3 =`<input name='name3' type='text' value='${obj.phnno}'><br>`; 

                let html =`<a href='login.html'>Login</a>`
                res.write('<h1>Welcome</h1>');
                res.write('<h1>'+obj.name+'</h1>');
                res.write('<h1>Your User Id is'+" "+obj.userid+'</h1>');
                res.write('<h1>Your Mobile No. is'+" "+obj.phnno+'</h1>');
                res.write('You Registed plz login now!!!'+'Click Here'+html);

                res.write('<html>');
                res.write('<head>');
                res.write('<title>Edit Page</title>');
                res.write('</head>');
                res.write('<body><h2>You Can Edit Here Your Profile</h2> <form action="/dashboard" method="GET"><div>Password :  <input  name="password" type="text" ></div> <div>Mobile no :  <input name="phnno" type="text" ></div><button>Update</button></form></body>');
                res.write('</html>');
                 
                res.end();  
        })
        req.on('error',()=>{
            res.write('Some Error During Post');
            res.end();
         });
    }
    else
    if(req.url=='/dashboard' && req.method=='GET'){
        console.log('Inside Form URL');
        var requestData = [];
        let finalData = "";

        req.on('data',(chunk)=>{
            requestData.push(chunk);
        })
        req.on('end',()=>{
            
            let parseData = Buffer.concat(requestData).toString();
            
            parseData = parseData.split('=')[1];
            parseData = parseData.split('+');
            

            for(let item of parseData)
                finalData +=item+' ';
                 res.write(finalData);
                console.log('inside ',finalData);
            })
        req.on('error',()=>{
            res.write('Some Error During GET');
            res.end();
         });
   
    }
    else
    if(req.url=='/dologin' && req.method=='POST'){
        const querystring = require('querystring');
        var postdata = '';
        req.on('data',(chunk)=>{
            postdata+=chunk;
        })
        req.on('end',()=>{
         var userObj = querystring.parse(postdata);
         console.log('Data is ',postdata, " Obj is ",userObj);
         const userCrud = require("./helpers/usercrud"); 
         userCrud.search(userObj);
         let msg = userCrud.search(userObj);
         
         if(msg =='Invalid User'){
            res.write(msg);
             res.end(); 
         }
         else {
          
         res.setHeader('content-type','text/html');
         let html =`<a href='index.html'>Home</a>
         <a href='dashboard.html'>Dashboard</a>`
         res.write(html+'<h1>'+msg+'</h1>');
          res.end(); 
         }
        });
    }
    else{
        res.write('Hello Client I am Server');
        res.end();
    }
    console.log('Inside Handle Req and Res',req.url);
}

function isStaticContent(fullpath){
    const path = require('path');
    let isStaticThings = ['.jpg','.jpeg','.html','.css','.js','.png'];
    let extname = path.extname(fullpath);
    return isStaticThings.indexOf(extname)>=0;
}
function serveStaticContent(uri,res){
    const fs = require('fs');
    const path = require('path');
    let fullpath = path.join(__dirname,'/public'+uri);
    const readStream = fs.createReadStream(fullpath);
    readStream.pipe(res);
    readStream.on('error',()=>{
        res.write('Error during file read');
        res.end();
    })
}