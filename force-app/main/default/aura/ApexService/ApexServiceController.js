({
    execute : function(component, event, helper) {
        let params = event.getParam('arguments');

        return new Promise(function(resolve, reject) {
            let action = params.action;
            action.setParams(params.params);
            action.setCallback(this, function(response) {
                if (response.getState() === 'SUCCESS') {
                    resolve(response.getReturnValue());
                } else {
                    reject(response);
                }
            });
            $A.enqueueAction(action);
        });

    }
})
