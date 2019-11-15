// tslint:disable:no-var-keyword prefer-const
var previous: any;

var errorStack: string[] = [];

export function errorStackPush(message: string) {
    if (errorStack.indexOf(message) === -1) {
        errorStack.push(message);
    }

    console.error(errorStack);
}

export function initHandleGlobalError() {
    previous = window.onerror;
    window.onerror = function(msg: ErrorEvent | string, url, lineNo, columnNo, error) {
        var errorMessage = '';
        window.onerror = previous;

        var text = typeof msg === 'string' ? msg.toLowerCase() : msg.message || msg.error || msg;
        if (text.indexOf('script error') > -1) {
            errorMessage = 'Script Error: See Browser Console for Detail';
        } else {
            errorMessage = [
                'Error message: ' + msg,
                'URL: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo,
                'Error object: ' + JSON.stringify(error)
            ].join(' - ');
        }

        errorStackPush(errorMessage);
        openIncompatibleBody();

        return false;
    };
}

export function openIncompatibleBody() {
    document.body.innerHTML = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '    <meta charset="utf-8">' +
        '    <title>Sorry, we found some error :(</title>' +
        '    <link rel="icon" type="image/png" href="favicon.png">' +
        '    <style>' +
        '    ::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}html{padding:30px 10px;font-size:20px;line-height:1.4;color:#737373;background:#fafafa;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html,input{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}body{max-width:500px;padding:30px 20px 50px;border:1px solid #b3b3b3;border-radius:4px;margin:0 auto;box-shadow:0 1px 10px #a7a7a7,inset 0 1px 0 #fff;background:#fefefe}h1{margin:0 10px;font-size:40px;text-align:center}h1 span{color:#bbb}h3{margin:1.5em 0 .5em}p{margin:1em 0}ul{padding:0 0 0 20px;margin:1em 0}.container{max-width:420px;margin:0 auto}#goog-fixurl ul{list-style:none;padding:0;margin:0}#goog-fixurl form{margin:0}#goog-wm-qt,#goog-wm-sb{border:1px solid #bbb;font-size:16px;line-height:normal;vertical-align:top;color:#444;border-radius:2px}#goog-wm-qt{width:220px;height:20px;padding:5px;margin:5px 10px 0 0;box-shadow:inset 0 1px 1px #ccc}#goog-wm-sb{display:inline-block;height:32px;padding:0 10px;margin:5px 0 0;white-space:nowrap;cursor:pointer;background-color:#f5f5f5;background-image:-webkit-linear-gradient(rgba(255,255,255,0),#f1f1f1);background-image:-moz-linear-gradient(rgba(255,255,255,0),#f1f1f1);background-image:-ms-linear-gradient(rgba(255,255,255,0),#f1f1f1);background-image:-o-linear-gradient(rgba(255,255,255,0),#f1f1f1);-webkit-appearance:none;-moz-appearance:none;appearance:none}#goog-wm-sb:focus,#goog-wm-sb:hover{border-color:#aaa;box-shadow:0 1px 1px rgba(0,0,0,.1);background-color:#f8f8f8}#goog-wm-qt:focus,#goog-wm-qt:hover{border-color:#105cb6;outline:0;color:#222}input::-moz-focus-inner{padding:0;border:0}' +
        '    </style>' +
        '</head>' +
        '<body>' +
        '<div class="container">' +
        '    <h1>Incompatible browser <span>:(</span></h1>' +
        '    <p>Sorry, but the page you were trying to view is open within an out-of-date browser.</p>' +
        '    <p>Please upgrade your favorite browser to latest version.</p>' +
        // '    <ul>' + errorStack.map(function(item) {return '<li><small>'+item+'</small></li>';}).join('') + '</ul>' +
        '</div>' +
        '</body>' +
        '</html>';
}

// to not hold whole time this event handler
export function resetOnError() {
    window.onerror = previous;
}



