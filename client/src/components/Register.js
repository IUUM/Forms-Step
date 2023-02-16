import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import avatar from '../assets/profile.png';
import {Link} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {registerValidate} from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { formStage, formSignup } from '../store/rootSlice';

function register({ pageTitle, submitButtonText, previousButton }) {

  const dispatch = useDispatch();
  const currentStage= useSelector(state=>state.FormStage);
  const formstageName = useSelector(state => state.FormUserSignup.username)
  const formstageEmail = useSelector(state => state.FormUserSignup.email)
  const formstagePass = useSelector(state => state.FormUserSignup.password)
  const formstageFile = useSelector(state => state.FormUserSignup.file)
  
  const [isSubmitted, setIsSubmitted] = useState(false) 

  const [file,setFile]= useState();
  
  const formik= useFormik({
    initialValues:{
        email:formstageEmail || '',
        username: formstageName || '',
        password: formstagePass || ''
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values=>{
        values= await Object.assign(values , {profile: file || ''});
        setIsSubmitted(true);
        dispatch(
          formStage(2) 
        )
        dispatch(
          formSignup({ 
            username: values.username,
            email: values.email,
            password: values.password
          })
        );
        console.log(values);
    }
  })

  
  const onUpload= async e => {
    const base64= await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
  return (
    <div className="container mx-auto">
       <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className='flex justify-center items-center'>
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-2xl font-bold">
                       {pageTitle}
                    </h4>
                    <span className="py-1 text-xl w-2/3 text-center text-gray-500">
                     Happy to Join you
                    </span>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-2'>
                      <label htmlFor='profile'>
                        <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                      </label>

                      <input type="file" id="profile" name='profile' onChange={onUpload} />
                    </div>
                    <div className="textbox flex flex-col items-center gap-4">
                        <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='UserName*' />
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Passsword*' />
                        <button className={styles.btn} type='submit'>{submitButtonText} </button>
                    </div>
                    <div className="text-center py-4">
                        {(previousButton) && <button className={styles.btn} type='submit' onClick={()=>{dispatch(formStage(currentStage-1))}}>{previousButton}</button>}
                        <span className='text-gray-500'>Already Register?<Link className='text-red-500' to="/">Login </Link></span>
                    </div>
                </form> 
            </div>
          </div>
    </div>
  )
}

export default register