"use strict";
var util_1 = require("util");
var finished_anime = require('./model/finished_anime');
var author = require('./model/author');
var cheerio = require('cheerio');
var request = require('request');
var end_page1 = 1;
var png_no = 1;
var redo = false;
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 3; i = (i++) % 2) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function get_end_page() {
}
var authorList = {};
function doIt(i) {
    var p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            request({
                method: 'GET',
                url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn=' + i + '&_=1499408247911',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html#!page=' + i + ''
                },
                gzip: true,
                encoding: 'utf-8'
            }, function (error, response, body) {
                var pb;
                try {
                    pb = JSON.parse(body);
                }
                catch (err) {
                    png_no = i;
                    redo = true;
                    doIt(i);
                    return;
                }
                var countTime = 0;
                for (var j = 0; j < pb['data']['archives'].length; j++, countTime++) {
                    console.log(pb['data']['archives'][j]['create'] + ' title: ' + pb['data']['archives'][j]['title'] + ' (aid: ' + pb['data']['archives'][j]['aid'] + ' )');
                    var playNum = void 0;
                    var mid = pb['data']['archives'][j]['mid'];
                    if (util_1.isNumber(pb['data']['archives'][j]['play']))
                        playNum = pb['data']['archives'][j]['play'];
                    else
                        playNum = 0;
                    var toSave = new finished_anime({
                        aid: pb['data']['archives'][j]['aid'],
                        title: pb['data']['archives'][j]['title'],
                        play: playNum,
                        favorites: pb['data']['archives'][j]['stat']['favorite'],
                        danmaku: pb['data']['archives'][j]['video_review'],
                        create: pb['data']['archives'][j]['create'],
                        mid: mid,
                        pic: pb['data']['archives'][j]['pic']
                    });
                    authorList[mid] = mid;
                }
                resolve(1);
            })
                .on('data', function (data) {
            })
                .on('response', function (response) {
                response.on('data', function (data) {
                });
            });
        }, 3000 * i);
    });
    return p;
}
function author_crawler(mid, j) {
    setTimeout(function () {
        request.post({
            url: 'http://space.bilibili.com/ajax/member/GetInfo',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': 'http://space.bilibili.com/' + mid
            },
            formData: { 'mid': mid, 'csrf': 'f06d59a54b82ea205f409267c7a5ab71' }
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('213failed:', err.statusCode);
            }
            var authorData;
            try {
                authorData = JSON.parse(body);
            }
            catch (err) {
                author_crawler(mid, j);
                return;
            }
            console.log('Upload successful!  Server responded with:', authorData['data']['mid']);
            var regtime = authorData['data']['regtime'];
            if (regtime === undefined)
                regtime = 0;
            var toSaveAuthor = new author({
                mid: authorData['data']['mid'],
                name: authorData['data']['name'],
                face: authorData['data']['face'],
                regtime: regtime,
                birthday: authorData['data']['birthday'],
                article: authorData['data']['article'],
                friend: authorData['data']['friend'],
                attention: authorData['data']['attention'],
                fans: authorData['data']['fans'],
                playNum: authorData['data']['playNum']
            });
            toSaveAuthor.save(function (err) {
                if (err) {
                    console.log(authorData['data']['mid'] + " fail to save author. " + err);
                }
                else
                    console.log('author saved successfully!');
            });
        });
    }, 2000 * j);
}
function crawler_anim() {
    var set_end_pagePromise = new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: 'http://api.bilibili.com/archive_rank/getarchiverankbypartion?tid=32&pn=1&_=1499408247911',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': 'http://www.bilibili.com/video/part-twoelement-1.html'
            },
            gzip: true,
            encoding: 'utf-8'
        }, function (error, response, body) {
            var pb;
            try {
                pb = JSON.parse(body);
            }
            catch (err) {
                console.log(err);
                return;
            }
            end_page1 = Math.ceil(pb['data']['page']['count'] / pb['data']['page']['size']);
            resolve(end_page1);
        });
    });
    var promiseArr = [];
    set_end_pagePromise.then(function (num) {
        return new Promise(function (resolve, reject) {
            console.log(png_no + ' of ' + end_page1);
            for (var i = png_no; i <= end_page1; i++) {
                promiseArr.push(doIt(i));
            }
            console.log('3d19');
            resolve(num);
        });
    })
        .then(function () {
        Promise.all(promiseArr).then(function (res) {
            console.log('3dd ' + authorList.length);
            var j = 1;
            for (var k in authorList) {
                author_crawler(authorList[k], j);
                j++;
            }
            console.log(j);
        });
    });
}
crawler_anim();
//# sourceMappingURL=Server.js.map