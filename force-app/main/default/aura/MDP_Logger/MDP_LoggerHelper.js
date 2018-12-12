({
    parseResponse : function(response) {
        return new Promise(function(resolve, reject) {
            if (typeof response.getState !== 'function') {
                reject('')
            }
            var errMsg = '';
            if (response.getState() === "INCOMPLETE") {
                errMsg = 'Server could not be reached. Check your internet connection.';
            } else if (response.getState() === "ERROR") {
                var errors = response.getError();

                if (errors) {
                    for (var i = 0; i < errors.length; i++) {
                        for (var j = 0; errors[i].pageErrors && j < errors[i].pageErrors.length; j++) {
                            errMsg += (errMsg.length > 0 ? '\n' : '') + errors[i].pageErrors[j].message;
                        }
                        if (errors[i].fieldErrors) {
                            for (var fieldError in errors[i].fieldErrors) {
                                var thisFieldError = errors[i].fieldErrors[fieldError];
                                for (var j = 0; j < thisFieldError.length; j++) {
                                    errMsg += (errMsg.length > 0 ? '\n' : '') + thisFieldError[j].message;
                                }
                            }
                        }
                        if (errors[i].message) {
                            errMsg += (errMsg.length > 0 ? '\n' : '') + errors[i].message;
                        }
                    }
                } else {
                    errMsg += (errMsg.length > 0 ? '\n' : '') + 'Unknown error';
                }
        });
    }
})
