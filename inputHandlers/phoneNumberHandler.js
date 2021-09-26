let phoneChecker = (phoneNum) => {
    let err = {errMsg: ''};
    let state = true;
    let num = phoneNum.toString();
    if(!num.startsWith('6')){
        if(!num.startsWith('7')){
            err.errMsg = 'phone number must start with 6 or 7';
            state = false;
        }else if(phoneNum.length != 9){
            err.errMsg = "phone number must have 9 digits (the 0 is equal to +212)";
            state = false;
        }
    }else if(phoneNum.length != 9){
        err.errMsg = "phone number must have 9 digits (the 0 is equal to +212)";
        state = false;
    }
    return [state, err];
}

exports.phoneChecker = phoneChecker;