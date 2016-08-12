/**
 * Created by baidu on 16/6/8.
 */


var stream = require('@weex-module/stream');
var modal = require('@weex-module/modal');
var apiURL = {
    baseurl: 'http://v3.wufazhuce.com:8000/api',
    homePage: '/hp/bymonth/',
    readingCarousel: '/reading/carousel',
    readingIndex: '/reading/index/',
    essay: '/essay/',
    serialcontent: '/serialcontent/',
    question: '/question/',
    carouselList: '/reading/carousel/',
    movieList: '/movie/list/',
    movieDetail: '/movie/detail/'

};
function getData(url, callback) {
    stream.sendHttp({
        method: 'GET',
        url: url
    }, function (ret) {
        var retdata = JSON.parse(ret);
        callback(retdata);
    });
}
exports.getHome = function (dateStr, callback) {
    getData(apiURL.baseurl + apiURL.homePage + dateStr, callback);
};
exports.getReadingCarousel = function (callback) {
    getData(apiURL.baseurl + apiURL.readingCarousel, callback);
};
exports.getReadingIndex = function (index, callback) {
    getData(apiURL.baseurl + apiURL.readingIndex + index, callback);
};
exports.getEssay = function (id, callback) {
    getData(apiURL.baseurl + apiURL.essay + id, callback);
};
exports.getSerialContent = function (id, callback) {
    getData(apiURL.baseurl + apiURL.serialcontent + id, callback);
};
exports.getQuestionDetail = function (id, callback) {
    getData(apiURL.baseurl + apiURL.question + id, callback);

};
exports.getCarouseList = function (id, callback) {
    getData(apiURL.baseurl + apiURL.carouselList + id, callback);
};
exports.getMovieList = function (id, callback) {
    getData(apiURL.baseurl + apiURL.movieList + id, callback);
};
exports.getMovieDetail = function (id, callback) {
    getData(apiURL.baseurl + apiURL.movieDetail + id, callback);

};