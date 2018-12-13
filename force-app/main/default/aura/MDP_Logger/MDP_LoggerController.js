({
    handleActionError: function (component, event, helper) {
        let params = event.getParam('arguments');
        let response = params.response;

        helper.parseResponse(response)
        .then($A.getCallback(function(message) {
            helper.postMessage(message);
        }))
        .catch($A.getCallback(function(error) {
            console.error(error);
        }));
    },
    displayErrorMessage: function (component, event, helper) {
        let params = event.getParam('arguments');
        let message = params.message;
    }
})