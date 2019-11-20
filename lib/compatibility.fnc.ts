var textOccure: RegExp[] = [
    /^.*Navigation occurred/,
    /^.*Expected identifier/,
    /^.*Expected \'\:\'/,
    /^.*Object\..+/,
    /^.*String\..+/,
    /^.*Array\..+/,
    /^.*\[Symbol.iterator\].+/
];

export function isValidApplication(includeES6: boolean, includeModernizr: boolean) {
    includeES6 = includeES6 || true;
    try {
        var valid: boolean = defaultObjects() && animationFrame() && cancelAnimationFrame();
        if (valid && includeES6) {
            valid = isES6Eval() && isWebKit();
        }
        if (valid && includeModernizr) {
            valid = modernizrSupportedFeatures();
        }

        if (!valid) {
            console.error('Incompatible browser');
        }

        return valid;
    } catch (e) {
        console.error('Incompatible browser, core features');
        return false;
    }
}

// if you dont use Modernizr remove this function
export function modernizrSupportedFeatures() {
    var valid =  Modernizr.svg && Modernizr.flexbox && Modernizr.blobconstructor;
    if (!valid) {
        console.error('Incompatible browser, modernizr');
    }
    return valid;
}

export function containInMessage(message: string) {
    return !!textOccure.find(function(item) {
        return item.test(message);
    });
}

function defaultObjects() {
    return 'Promise' in window && 'fetch' in window && 'Symbol' in window;
}

function animationFrame() {
    return window.requestAnimationFrame       // Standard name
        || window.webkitRequestAnimationFrame // Fallback to webkit- (old versions of Chrome or Safari)
        || (window as any).mozRequestAnimationFrame    // Fallback to moz- (Mozilla Firefox)
        || false;
}

function cancelAnimationFrame() {
    // Same goes for cancelAnimationFrame
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || (window as any).mozCancelAnimationFrame || false;
}

function isES6Eval() {
    try {
        Function('for (const item of [\'Test\']) {\n' +
                    '    const newOne = new class {\n' +
                    '        get data() {\n' +
                    '            return () => {};\n' +
                    '        }\n' +
                    '    };\n' +
                    '    break;\n' +
                    '}');
        return true;
    } catch (exception) {
        return false;
    }
}

function isWebKit() {
    var v8string = 'function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D';
    var es6string = 'function%20javaEnabled%28%29%20%7B%0A%20%20%20%20%5Bnative%20code%5D%0A%7D';

    if (window.devicePixelRatio) {
        var s = escape(navigator.javaEnabled.toString());
        if (s === v8string) {
            // V099787 detected
            return true;
        } else if (s === es6string) {
            // ES6 detected
            return true;
        } else {
            // JSC detected
            return true;
        }
    }

    return false;
}
