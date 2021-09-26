let checkPassword = (password, repeatedPass)=>{
    let err = {errMsg : ""}
    let state = true;
    if(password !== repeatedPass){
        err.errMsg = "passwords don't match";
        state = false;
    }else if(password.length < 8){
        err.errMsg = "password too short";
        state = false;
    }else if(password.length > 30){
        err.errMsg = "password too long";
        state = false;
    }
    return [state, err];
}
exports.passwordChecker = checkPassword;