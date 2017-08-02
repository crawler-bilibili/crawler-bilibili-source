// 'use strict'
import {isNumber} from "util";
var finished_anime= require('./model/finished_anime');
let author = require('./model/author');
var cheerio = require('cheerio');
// var Promise = require('promise');

var request = require('request');

//$.post("http://space.bilibili.com/ajax/member/GetInfo",{mid:44945505,csrf:(0,207)("bili_jct")})
let end_page1=1;
let png_no=1;
let redo=false;
function sleep(milliseconds:number) {
    var start = new Date().getTime();
    for (var i = 0; i < 3; i=(i++)%2) {
        if ((new Date().getTime() - start) > milliseconds){//console.log(new Date().getTime());
            break;
        }
    }
}

function get_end_page(){
}


function doIt(i:number) {

    setTimeout(function() {//console.log(i);
        request(
            {
                method: 'GET'
                ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
                url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn='+i+'&_=1499408247911'
                //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
                ,
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html#!page='+i+''
                },
                gzip: true
                ,
                encoding: 'utf-8'
            }
            , function (error: any, response: any, body: any) {
                // body is the decompressed response body
                // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
                // let tmp=body.split('(');
                // let pb: any = body.substring(41, body.length - 2);
                // console.log(body);
                // console.log(pb.length+"  ");
                let pb:any;
                try{pb= JSON.parse(body);}
                catch(err) {png_no=i;redo=true;doIt(i);return;};//crawler_anim()
                let countTime=0;
                for(let j=0;j<pb['data']['archives'].length;j++,countTime++) {
                    console.log(pb['data']['archives'][j]['create'] + ' title: ' + pb['data']['archives'][j]['title'] + ' (aid: ' + pb['data']['archives'][j]['aid']+' )');

                    // console.log('the played# is: ' + pb['data']['archives'][j]['play']);
                    // console.log('the danmu is: ' + pb['data']['archives'][j]['video_review']); // danmu shu
                    // console.log('the shoucang is: ' + pb['data']['archives'][j]['stat']['favorite']); // shoucang
                    // console.log('the upload time is: ' + pb['data']['archives'][j]['create']); // upload time
                    // console.log('the mid is: ' + pb['data']['archives'][j]['mid']); // user id
                    // console.log('the picture is: ' + pb['data']['archives'][j]['pic']); // uper
                    let playNum:number;
                    if(isNumber(pb['data']['archives'][j]['play']))
                        playNum = pb['data']['archives'][j]['play'];
                    else
                        playNum = 0;
                    let toSave = new finished_anime({
                        aid: pb['data']['archives'][j]['aid'],  //anime id
                        title: pb['data']['archives'][j]['title'],
                        play: playNum,
                        favorites: pb['data']['archives'][j]['stat']['favorite'],
                        danmaku: pb['data']['archives'][j]['video_review'],  //danmu
                        create: pb['data']['archives'][j]['create'], //date posted
                        mid: pb['data']['archives'][j]['mid'],    //author id
                        pic: pb['data']['archives'][j]['pic']
                    });

                    // toSave.save(function(err:any) {
                    //    if (err) {
                    //        console.log("fail to save finished_anime "+err);
                    //    }
                    //    else console.log('sample saved successfully!');
                    // });

                    author_crawler(pb['data']['archives'][j]['mid'], j, countTime);


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
                    // console.log('received ' + data.length + ' bytes of compressed data')
                })
            });
    }, 8000*i);//Math.random()*3000+

}

function author_crawler(mid:string, j:number, countTime:number){
    setTimeout(function() {
        request.post({
                url: 'http://space.bilibili.com/ajax/member/GetInfo',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'http://space.bilibili.com/'+mid
                }
                , formData: {'mid': mid, 'csrf': 'f06d59a54b82ea205f409267c7a5ab71'}
            }
            , function optionalCallback(err: any, httpResponse: any, body: any) {
                if (err) {
                    // author_crawler(pb, j);
                    console.error('213failed:', err.statusCode);
                }
                let authorData: any;
                try {
                    authorData = JSON.parse(body);
                }
                catch (err) {

                    author_crawler(mid, j,++countTime);
                    return;
                }
                ;

                console.log('Upload successful!  Server responded with:', authorData['data']['mid']);

                let regtime = authorData['data']['regtime'];
                if (regtime === undefined)
                    regtime = 0;
                let toSaveAuthor = new author({
                    mid: authorData['data']['mid'],  //author id
                    name: authorData['data']['name'],  //name
                    face: authorData['data']['face'],
                    regtime: regtime,
                    birthday: authorData['data']['birthday'],
                    article: authorData['data']['article'],
                    friend: authorData['data']['friend'],
                    attention: authorData['data']['attention'],
                    fans: authorData['data']['fans'],  //
                    playNum: authorData['data']['playNum']
                });
                toSaveAuthor.save(function (err: any) {
                    if (err) {
                        console.log(authorData['data']['mid'] + " fail to save author. " + err);
                    }
                    else console.log('author saved successfully!');
                });

            }
        );
    }, 8000*countTime);
}

function crawler_anim() {
    let set_end_pagePromise = new Promise((resolve:any, reject:any) => {
        // console.log(end_page1);
        request(
            {
                method: 'GET'
                ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
                url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn=1&_=1499408247911'
                //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
                ,
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html'
                },
                gzip: true,
                encoding: 'utf-8'
            }
            , function (error: any, response: any, body: any) {
                // body is the decompressed response body
                // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
                let pb:any;
                try{pb= JSON.parse(body);}
                catch(err) {console.log(err);return;}
                end_page1 = Math.ceil(pb['data']['page']['count']/pb['data']['page']['size']);
                resolve(end_page1);
            }
        );
    });

    set_end_pagePromise.then(()=>{
        console.log(png_no + ' of ' + end_page1);
        for(let i=png_no; i<=end_page1; i++) {
            doIt(i);
            // if(redo){
            //     redo = false;
            //     return;
            // }
        }
    });
}

crawler_anim();














//
//
// request(
//     {
//         method: 'GET'
//         ,//callback=jQuery17203145239116586096_1499408237655&type=jsonp&
//         url: 'http://comment.bilibili.com/346619.xml'
//         //,url:'http://space.bilibili.com/ajax/member/MyInfo?vmid=44945505'
//
//         ,
//         headers:{
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html#!page=1'
//         },
//         gzip: true
//         ,
//         // deflate:true,
//         encoding: 'utf-8'
//     }
//     , function (error: any, response: any, body: any) {
//         // body is the decompressed response body
//         // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
//         // let tmp=body.split('(');
//         // let pb: any = body.substring(41, body.length - 2);
//         // console.log(response);
//         console.log(body+"  ");
//         let pb:any;
//
//
//
//
//
//     }
// )
//     .on('data', function (data: any) {
//         //var $ = cheerio.load(data);
//         // console.log("&!!"+$.html());
//         // decompressed data as it is received
//         //  console.log('decoded chunk: ' + data)
//         // console.log(data+"  ");
//     })
//     .on('response', function (response: any) {
//         // unmodified http.IncomingMessage object
//         response.on('data', function (data: any) {
//             // compressed data as it is received
//             console.log('received ' + data.length + ' bytes of compressed data')
//             let tmp=data.toString('base64', 0, data.length);
//             console.log(tmp);console.log(tmp.toString('utf8'));
//         })
//     });