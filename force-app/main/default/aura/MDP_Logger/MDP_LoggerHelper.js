({
    parseResponse: function (response) {
        return new Promise(function (resolve, reject) {
            if (typeof response.getState !== 'function') {
                reject('Failed to extract the error message from the response, response: ' + response);
            }
            let messages = [];
            if (response.getState() === "INCOMPLETE") {
                resolve('Server could not be reached. Check your internet connection.');
            } else if (response.getState() === "ERROR") {
                var errors = response.getError();
                if (Array.isArray(errors) && errors.length > 0) {
                    for (const error of errors) {
                        if (error.pageErrors) {
                            for (const pageError of error.pageErrors) {
                                messages.push(pageError.message);
                            }
                        }
                        if (error.fieldErrors) {
                            for (const field in error.fieldErrors) {
                                for(error of error.fieldErrors[field]) {
                                    messages.push('['+error.statusCode+'] '+field+': '+ error.message);
                                }
                            }
                        }
                        if (error.message) {
                            messages.push(error.message);
                        }
                    }
                }
                resolve(messages.join('\n'));
            } else {
                resolve('Unknown error');
            }
        });
    },
    postMessage : function(message) {
        // TODO: implement display functionality
    }
})