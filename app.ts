/**
 * Bootstrap our app
 */
import { containInMessage, modernizrSupportedFeatures } from './lib/compatibility.fnc';

export function main(): Promise<any> {
    return Promise.resolve() // async init of your app
        .then(() => {
            try {
                if (!modernizrSupportedFeatures()) {
                    // notify of missing rest compatibility
                }
                // call rest off your app
            } catch (error) {
                if (error.message && containInMessage(error.message)) {
                    // notify of missing rest compatibility
                }
            }
        });
}

switch (document.readyState) {
    case 'loading':
        document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
        break;
    case 'interactive':
    case 'complete':
    default:
        main();
}

function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
}
