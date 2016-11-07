var postcss = require('postcss');
var mime = require('mime');
var fs = require('fs');
var path = require('path');

module.exports = postcss.plugin('postcss-b64i', function () {
    return function (css) {
        css.walkAtRules('font-face', function (rule) {
            rule.walkDecls(function (decl, i) {
                var value = decl.value;
                if (value.indexOf( 'inline-font-files(' ) !== -1) {
                    var url = value.match(/\(([^)]+)\)/)[1].replace(/["']/g, "");
                    var src_file = path.join(process.cwd(), url);
                    if (fs.existsSync(src_file)) {
                        var file = fs.readFileSync(url);
                        var mimeType = mime.lookup(url);
                        var re = /inline-font-files\(.+?\)/g;
                        re.exec(value)
                        var first_str = value.substr(0, value.indexOf('inline-font-files('));
                        var last_str = value.substr(re.lastIndex);
                        decl.value = first_str + 'url(data:' + mimeType + ';base64,' + new Buffer(file).toString('base64') + ')' + last_str;
                    }
                }
            });
        });

        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                var value = decl.value;
                if (value.indexOf( 'inline-image-files(' ) !== -1) {
                    var url = value.match(/\(([^)]+)\)/)[1].replace(/["']/g, "");
                    var src_file = path.join(process.cwd(), url);
                    if (fs.existsSync(src_file)) {
                        var file = fs.readFileSync(url);
                        var mimeType = mime.lookup(url);
                        var re = /inline-image-files\(.+?\)/g;
                        re.exec(value)
                        var first_str = value.substr(0, value.indexOf('inline-image-files('));
                        var last_str = value.substr(re.lastIndex);
                        decl.value = first_str + 'url(data:image' + mimeType + ';base64,' + new Buffer(file).toString('base64') + ')' + last_str;
                    }
                }
            });
        });
    }
});
