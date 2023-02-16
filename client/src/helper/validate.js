import toast from 'react-hot-toast';

export async function usernameValidate(values){
    const errors= userNameVerify({}, values);
    return errors;
}

export async function passwordValidate(values){
    const errors= passwordVerify({}, values);
    return errors;
}

export async function resetPasswordValidate(values){
    const errors= passwordVerify({},values);

    if(values.password !== values.confirm_password){
        errors.exist= toast.error("Password Mismatch");
    }

    return errors;
}

export async function profileValidate(values){
    const errors= lastNameVerify({},values);
    firstNameVerify(errors,values);
    return errors;
}

export async function registerValidate(values){
  const errors = userNameVerify({},values);
  passwordVerify(errors, values);
  emailVerfiy(errors,values);
  return errors;
}

function passwordVerify(errors = {}, values){
    
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(!values.password){
        errors.password= toast.error("Password required....");
    }
    else if(values.password.includes(" ")){
        errors.password= toast.error("Invalid Password...");
    }
    else if(values.password.length < 5){
        errors.password= toast.error("Password Not Valid...");
    }
    else if(!regularExpression.test(values.password)){
        errors.password= toast.error("Password must have valid char.");
    }

    return errors;
}

function userNameVerify(errors = {}, values){
    if(!values.username){
        errors.username= toast.error("Username required....");
    }
    else if(values.username.includes(" ")){
        errors.username= toast.error("Invalid Username...");
    }

    return errors;
}

function firstNameVerify(errors = {}, values){
    if(!values.firstName){
        errors.firstName= toast.error("firstName required....");
    }
    else if(values.firstName.includes(" ")){
        errors.firstName= toast.error("Invalid firstName...");
    }

    return errors;
}

function lastNameVerify(errors = {}, values){
    if(!values.lastName){
        errors.lastName= toast.error("lastName required....");
    }
    else if(values.lastName.includes(" ")){
        errors.lastName= toast.error("Invalid lastName...");
    }

    return errors;
}

function mobileVerify(errors = {}, values){
    if(!values.mobile){
        errors.mobile= toast.error("mobile required....");
    }
    else if(values.mobile.includes(" ") || !isNaN(values.mobile)){
        errors.mobile= toast.error("Invalid mobile...");
    }

    return errors;
}

function aboutYouVerify(errors = {}, values){
    if(!values.aboutYou){
        errors.aboutYou= toast.error("aboutYou required....");
    }
    else if(values.aboutYou.includes(" ")){
        errors.aboutYou= toast.error("Invalid aboutYou...");
    }

    return errors;
}

function emailVerfiy(errors={},values){
    //const emailRegex = /^!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;

    if(!values.email){
        errors.email = toast.error("Email Required..");
    }
    else if(values.email.includes(" ")){
        errors.email = toast.error("Wrong Email..");
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("Invalid Email...")
    }
    return errors;
}

