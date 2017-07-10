var finished_anime= require('./finished_anime');
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
let end_page=60;
function crawler_anim() {
    for(let i=1; i<=end_page; i++) {
        request(
            {
                method: 'GET'
                ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
                url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn='+i+'&_=1499408247912'
                //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'

                ,
                gzip: true
                ,
                encoding: 'utf-8'
            }
            , function (error: any, response: any, body: any) {
                // body is the decompressed response body
                console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
                // let tmp=body.split('(');
                // let pb: any = body.substring(41, body.length - 2);
                console.log(body);
                // console.log(pb.length+"  ");
                let pb = JSON.parse(body);
                for(let j=0;j<pb['data']['archives'].length;j++) {
                    console.log('the title is: ' + pb['data']['archives'][j]['title']);
                    console.log('the aid is: ' + pb['data']['archives'][j]['aid']);
                    console.log('the played# is: ' + pb['data']['archives'][j]['play']);
                    console.log('the danmu is: ' + pb['data']['archives'][j]['video_review']); // danmu shu
                    console.log('the shoucang is: ' + pb['data']['archives'][j]['stat']['favorite']); // shoucang
                    console.log('the upload time is: ' + pb['data']['archives'][j]['create']); // upload time
                    console.log('the mid is: ' + pb['data']['archives'][j]['mid']); // user id
                    console.log('the picture is: ' + pb['data']['archives'][j]['pic']); // uper
                    let toSave = new finished_anime({
                        aid: pb['data']['archives'][j]['aid'],  //anime id
                        title: pb['data']['archives'][j]['title'],
                        play: pb['data']['archives'][j]['play'],
                        favorites: pb['data']['archives'][j]['stat']['favorite'],
                        danmaku: pb['data']['archives'][j]['video_review'],  //danmu
                        create: pb['data']['archives'][j]['create'], //date posted
                        mid: pb['data']['archives'][j]['mid'],    //author id
                        pic: pb['data']['archives'][j]['pic']
                    });

                     toSave.save(function(err:any) {
                        if (err) {
                            console.log("fail to save finished_anime");
                        }
                        else console.log('sample saved successfully!');
                     });
                }
            }
        )
            .on('data', function (data: any) {
                //var $ = cheerio.load(data);
                // console.log("&!!"+$.html());
                // decompressed data as it is received
                //  console.log('decoded chunk: ' + data)
            })
            .on('response', function (response: any) {
                // unmodified http.IncomingMessage object
                response.on('data', function (data: any) {
                    // compressed data as it is received
                    console.log('received ' + data.length + ' bytes of compressed data')
                })
            });
    }
}

request.post({url:'http://space.bilibili.com/ajax/member/GetInfo',
    headers:{
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://space.bilibili.com/7295246'
    }
    ,formData:{ 'mid':'91924849','csrf':'f06d59a54b82ea205f409267c7a5ab71'}}, function optionalCallback(err:any, httpResponse:any, body:any) {
    if (err) {
        return console.error('upload failed:', err.statusCode);
    }
    console.log('Upload successful!  Server responded with:', body);

});

crawler_anim();