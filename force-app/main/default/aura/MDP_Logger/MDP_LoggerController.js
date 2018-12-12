({
    handleActionError: function (component, event, helper) {
        let params = event.getParam('arguments');
        let response = params.response;
    },
    displayErrorMessage: function (component, event, helper) {
        let params = event.getParam('arguments');
        let message = params.message;
    }
})