import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import IMGgreentick from '../assets/green-tick.svg';
import { registerUser } from '../helper/helper';

function Completed({ pageTitle, successMessage , errorMessage }) {
    const state = useSelector(state => state);
    const [Response,setResponse]= useState();
    const [errResponse,setErrorResponse]= useState();
    const [pageTitleUpdated,setPageTitle]= useState();
    let response;
    let user ={};
    user.email= state.FormUserSignup.email;
    user.username= state.FormUserSignup.username;
    user.password = state.FormUserSignup.password;
    user.firstName= state.FormUserProfile.firstName;
    user.lastName= state.FormUserProfile.lastName;
    user.mobile= state.FormUserProfile.mobile;
    user.aboutyou= state.FormUserProfile.aboutyou;
    user.isInUs= state.FormUserProfile.isInUs;
    user.file= state.FormUserProfile.file;

    useEffect(()=>{
        try{
            let promiseCreated = registerUser(user);
            promiseCreated.then(res=>{
                response=res;
                setResponse(res);
                setPageTitle("Success");
                console.log(response);
            }).catch(error=>{
                setErrorResponse(error);
                setPageTitle("Error!");
                console.log(error);
             });
        }
        catch(error){
            console.log(error);
        }
    },[]);
    const stateOutput = (`JSON Data Form-Completed: ${JSON.stringify(state, null, 2)}`)
    console.log(stateOutput) // output to console.log  
    return (
        <div className="container mx-auto">
            <div className='flex justify-center items-center h-screen'>
                <div className={`${styles.glass} ${extend.glass}`}>
                    <div className="title flex flex-col items-center">
                        {!Response && !errResponse && <h4 className="text-2xl font-bold">
                            {pageTitle} 
                        </h4>}
                        {Response && <h4 className="text-2xl font-bold">{pageTitleUpdated}</h4>}
                        <span className="py-1 text-xl w-2/3 text-center text-gray-500">
                        {Response && <img 
                            className="fade-in-image"
                            src={IMGgreentick} 
                            alt={successMessage || 'Success!'}
                        />}
                        {errResponse && <h4 className="text-2xl font-bold">{pageTitleUpdated}</h4>}
                        {errResponse && <h4 className="text-2xl font-bold">{errorMessage}</h4>}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Completed;
