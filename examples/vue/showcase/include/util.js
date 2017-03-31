function randomInt (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
},
function randomItemFromArr (arr) {
    if (!arr) return;
    return arr[randomInt(0, arr.length - 1)];
},
function httpurl (url) {
    var params = {};

    Object.defineProperty(this, 'params', {
        set: function (v) {
            if (typeof v === 'object') {
                for (var p in params) {
                    delete params[p];
                }
                for (var p in v) {
                    params[p] = v[p];
                }
            }
        },
        get: function () {
            return params;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'search', {
        set: function (v) {
            if (typeof v === 'string') {
                if (v.indexOf('?') === 0) {
                    v = v.substr(1);
                }
                var search = v.split('&');
                for (var p in params) {
                    delete params[p];
                }
                for (var i = 0; i < search.length; i++) {
                    var pair = search[i].split('=');
                    if (pair[0]) {
                        try {
                            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                        } catch (e) {
                            params[pair[0]] = pair[1] || '';
                        }
                    }
                }
            }
        },
        get: function () {
            var search = [];
            for (var p in params) {
                if (params[p]) {
                    try {
                        search.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
                    } catch (e) {
                        search.push(p + '=' + params[p]);
                    }
                } else {
                    try {
                        search.push(encodeURIComponent(p));
                    } catch (e) {
                        search.push(p);
                    }
                }
            }
            if (search.length) {
                return '?' + search.join('&');
            } else {
                return '';
            }
        },
        enumerable: true
    });

    var hash;
    Object.defineProperty(this, 'hash', {
        set: function (v) {
            if (typeof v === 'string') {
                if (v && v.indexOf('#') < 0) {
                    v = '#' + v;
                }
                hash = v || '';
            }
        },
        get: function () {
            return hash;
        },
        enumerable: true
    });

    this.set = function (v) {
        var matchArr;
        if ((matchArr = v.match(new RegExp('^([a-z0-9-]+\:)?' +    //protocol
                        '[/]{2}' +                            //slash x 2
                        '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
                        '([^:/?#]+)' +                        //hostname
                        '(?:[:]([0-9]+))?' +                  //port
                        '([/][^?#;]*)?' +                     //pathname
                        '(?:[?]([^?#]*))?' +                  //search
                        '(#[^#]*)?$'                          //hash
                        , 'i')))) {
            this.protocol = matchArr[1] || '';
            this.username = matchArr[2] || '';
            this.password = matchArr[3] || '';
            this.hostname = this.host = matchArr[4];
            this.port = matchArr[5] || '';
            this.pathname = matchArr[6] || '/';
            this.search = matchArr[7] || '';
            this.hash = matchArr[8] || '';
            this.origin = this.protocol + '//' + this.hostname;
        } else {
            throw new Error('Wrong uri scheme.');
        }
    };

    this.toString = function () {
        var string = this.protocol + '//';
        if (this.username) {
            string += this.username;
            if (this.password) {
                string += ':' + this.password;
            }
            string += '@';
        }
        string += this.host;
        if (this.port && this.port !== '80') {
            string += ':' + this.port;
        }
        if (this.pathname) {
            string += this.pathname;
        }
        if (this.search) {
            string += this.search;
        }
        if (this.hash) {
            string += this.hash;
        }
        return string;
    };

    this.set(url.toString());
}

module.exports = {
  randomInt: randomInt,
  randomItemFromArr: randomItemFromArr,
  httpurl: httpurl
}
