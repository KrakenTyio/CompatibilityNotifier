import { errorStackPush, initHandleGlobalError, openIncompatibleBody, resetOnError } from './lib/compatibility.runner';
import { isValidApplication } from './lib/compatibility.fnc';

initHandleGlobalError();

// tslint:disable no-var-keyword prefer-const
var valid: boolean = isValidApplication(true, false);
if (!valid) {
    errorStackPush('Incompatible mandatory browser features');
    openIncompatibleBody();
}
setTimeout(function() {
    resetOnError();
}, 1000);
