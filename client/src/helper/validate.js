import toast from "react-hot-toast"
import { authenticate } from "./helper";

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        ///check user exist or not
        const {status} = await authenticate(values.username)
        if(status !== 200){
            errors.exist = toast.error('User doesnt exist')
        }
    }
    return errors;
}
/**validate reset password */
export async function resetPasswordValidate(values){
    const errors = passwordVerify({},values)
    if(values.password !== values.confirmpsw){
        errors.exist = toast.error("Password doesn't match");
    }
    return errors;
}

/**validate password */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

/**validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({},values);
    return errors;
}

/**validate register form */
export async function registerValidate(values){
    const errors = usernameVerify({},values);
    passwordVerify(errors, values);
    emailVerify(errors,values);
    return errors;

}

/**validate password */
function passwordVerify(errors= {}, values) {

    const specialsChars = /[~!@#$%^&*()_+\-=[]{};:'",.\/<>?|]/;

    if(!values.password){
        errors.password = toast.error("Password Required!!!")
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong password!!!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters");
    }else if(!specialsChars.test(values.password)){
        errors.password = toast.error("Password must have atleast one special character");
    }
    return errors;
}

/** validate username */
function usernameVerify(error = {}, values) {
    if(!values.username){
        error.username = toast.error('Username Required!!!');

    }else if(values.username.includes(" ")){
        error.username = toast.error(" Invalid username !!!")
    }
    
    return error;
}

function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required!!")
    }else if(values.email.includes(" ")){
        error.email = toast.error("Incorrect Email")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address")
    }
    return error;
}

