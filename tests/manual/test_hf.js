const https = require('https');

const data = JSON.stringify({
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjNDQyNjc4PDwzJC85RDk5OTk5//2wBDAQsLCw8NDx0QEB04KSMpODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODj/wAARCABQAFADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAhEAACAQQDAQEBAQAAAAAAAAABAgMABBESEyExMkFRYf/EABUBAQEAAAAAAAAAAAAAAAAAAAMB/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAECERITMf/aAAwDAQACEQMRAD8AtgUUUUCFAUUUUAf/2Q=="
});

const options = {
  hostname: 'sabbirog-nulens-yolo-api.hf.space',
  port: 443,
  path: '/predict',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  let resData = '';
  res.on('data', d => {
    resData += d;
  });
  res.on('end', () => {
    console.log(resData);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
