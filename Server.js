var cheerio = require('cheerio');
var request = require('request');
//
// var options = {
//     url: 'https://www.bilibili.com/video/av11811160/',
//     headers: {
//         'Referer':'http://www.bilibili.com',
//     'User-Agent': 'Chrome/58.0.3029.110 Safari/537.36'
//        // 'User-Agent': 'request'
//     }
// };
//
// function callback(error:any, response:any, body:any) {
//     if (!error && response.statusCode == 200) {
//         //var info = JSON.parse(body);
//         console.log("!!"+body);
//        // console.log(info.forks_count + " Forks");
//     }
//     console.log("@@$"+(!error ));
// }
//
// request(options, callback);
//$.post("http://space.bilibili.com/ajax/member/GetInfo",{mid:44945505,csrf:(0,207)("bili_jct")})
request({ method: 'GET',
    url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?callback=jQuery17203145239116586096_1499408237655&type=jsonp&tid=32&pn=3&_=1499408247912'
    //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
    ,
    gzip: true,
    encoding: 'utf-8'
}, function (error, response, body) {
    // body is the decompressed response body
    console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
    // let tmp=body.split('(');
    //let pb:any=body.substring(41,body.length-2);
    console.log(body);
    // console.log(pb.length+"  ");
    //       pb=JSON.parse(pb);
    //        console.log('the decoded data is: ' + pb['data']['archives'][0]['tname'])
})
    .on('data', function (data) {
    var $ = cheerio.load(data);
    // console.log("&!!"+$.html());
    // decompressed data as it is received
    //  console.log('decoded chunk: ' + data)
})
    .on('response', function (response) {
    // unmodified http.IncomingMessage object
    response.on('data', function (data) {
        // compressed data as it is received
        console.log('received ' + data.length + ' bytes of compressed data');
    });
});
request.post({ url: 'http://space.bilibili.com/ajax/member/GetInfo',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://space.bilibili.com/7295246'
    },
    formData: { 'mid': '91924849', 'csrf': 'f06d59a54b82ea205f409267c7a5ab71' } }, function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error('upload failed:', err.statusCode);
    }
    console.log('Upload successful!  Server responded with:', body);
});
