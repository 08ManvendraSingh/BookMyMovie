const validateSignupData=(req)=>{
    const {userName,email,password}=req.body;

    if(!userName || !email || !password){
        throw new Error('All fields are required');
    }
    
}

const validateLoginData=(req)=>{
    const {email,password}=req.body;

    if(!email.trim() || !password.trim()){
        throw new Error('All fields are required');
    }
    
}

const validateMovieData=()=>{

}

module.exports={validateSignupData,validateLoginData,validateMovieData};