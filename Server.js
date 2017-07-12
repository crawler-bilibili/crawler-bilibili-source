var finished_anime = require('./finished_anime');
var cheerio = require('cheerio');
var request = require('request');
var end_page1 = 1;
var png_no = 1;
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
function doIt(i) {
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
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            console.log(body);
            var pb;
            try {
                pb = JSON.parse(body);
            }
            catch (err) {
                png_no = i;
                crawler_anim();
                return;
            }
            ;
            for (var j = 0; j < pb['data']['archives'].length; j++) {
                console.log('the title is: ' + pb['data']['archives'][j]['title']);
                console.log('the aid is: ' + pb['data']['archives'][j]['aid']);
                console.log('the played# is: ' + pb['data']['archives'][j]['play']);
                console.log('the danmu is: ' + pb['data']['archives'][j]['video_review']);
                console.log('the shoucang is: ' + pb['data']['archives'][j]['stat']['favorite']);
                console.log('the upload time is: ' + pb['data']['archives'][j]['create']);
                console.log('the mid is: ' + pb['data']['archives'][j]['mid']);
                console.log('the picture is: ' + pb['data']['archives'][j]['pic']);
                var toSave = new finished_anime({
                    aid: pb['data']['archives'][j]['aid'],
                    title: pb['data']['archives'][j]['title'],
                    play: pb['data']['archives'][j]['play'],
                    favorites: pb['data']['archives'][j]['stat']['favorite'],
                    danmaku: pb['data']['archives'][j]['video_review'],
                    create: pb['data']['archives'][j]['create'],
                    mid: pb['data']['archives'][j]['mid'],
                    pic: pb['data']['archives'][j]['pic']
                });
                toSave.save(function (err) {
                    if (err) {
                        console.log("fail to save finished_anime");
                    }
                    else
                        console.log('sample saved successfully!');
                });
            }
        })
            .on('data', function (data) {
        })
            .on('response', function (response) {
            response.on('data', function (data) {
                console.log('received ' + data.length + ' bytes of compressed data');
            });
        });
    }, Math.random() * 3000 + 8000 * i);
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
    set_end_pagePromise.then(function () {
        console.log(end_page1);
        for (var i = png_no; i <= end_page1; i++) {
            doIt(i);
        }
    });
}
crawler_anim();
//# sourceMappingURL=Server.js.map