//import autoprefixer from 'autoprefixer'
import React,{useState} from 'react'
import avatar from '../assets/file.png';
import { useSelector, useDispatch } from 'react-redux'
import { formStage, formProfile  } from '../store/rootSlice';
import {Link} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {profileValidate} from '../helper/validate';
import convertToBase64 from '../helper/convert';

function profile({ pageTitle, submitButtonText, previousButton }) {
  const dispatch = useDispatch();
  const[fileSizeError, setFileSizeError]= useState();
  const [file,setFile]= useState();
  const currentStage = useSelector(state => state.FormStage) // for previous button
  const formstagefirstName = useSelector(state => state.FormUserProfile.firstName)
  const formstagelastName = useSelector(state => state.FormUserProfile.lastName)
  const formstagemobile = useSelector(state => state.FormUserProfile.mobile)
  const formstageaboutyou = useSelector(state => state.FormUserProfile.aboutyou)
  const formstageIsInUs= useSelector(state => state.FormUserProfile.isInUs)
  const formstageFile = useSelector(state => state.FormUserProfile.file)
  
  const formik= useFormik({
    initialValues:{
        firstName:formstagefirstName || '',
        lastName:formstagelastName ||'',
        mobile:formstagemobile || '',
        aboutyou:formstageaboutyou || '',
        isInUs:formstageIsInUs || false,
        file: formstageFile || '',
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values=>{
        values= await Object.assign(values , {profile: file || ''});
        console.log(values);
        dispatch(
          formStage(3)
        )
        dispatch(
          formProfile({ 
            firstName: values.firstName,
            lastName: values.lastName,
            mobile: values.mobile,
            aboutyou: values.aboutyou,
            isInUs: values.isInUs,
            file: values.profile
          })
        );
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
    dispatch(formStage(currentStage-1))
  }
  const onUpload= async e => {
    var filesize = document.getElementById('profile').files[0].size;
    console.log(filesize);  
    if(filesize > 30000){ 
     setFileSizeError("File is too large! Please update")
    }
    else{
      setFileSizeError('');
    }
    const base64= await convertToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    
    <div className="container mx-auto">
       <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center'>
            <div className={`${styles.glass} ${extend.glass}`}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-2xl font-bold">
                        {pageTitle}
                    </h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-2'>
                      <label htmlFor='profile'>
                        <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                      </label>
                      <input type="file" id="profile" name='profile' onChange={onUpload} />
                      {fileSizeError && 
                        <h2 className='text-1xl font-bold'>{fileSizeError}
                        </h2> 
                      }
                    </div>

                    <div className="textbox flex flex-col items-center gap-4">
                        <div className="name flex w-3/4 gap-10">
                          <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${styles.textbox}`} type="text" placeholder='FirstName*' />
                          <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${styles.textbox}`} type="text" placeholder='LastName*' />
                        </div>

                        <div className="name flex w-3/4 gap-10">
                          <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${styles.textbox}`} type="text" placeholder='Mobile No.*' />
                          <input {...formik.getFieldProps('aboutyou')} className={`${styles.textbox} ${styles.textbox}`} type="text" placeholder='About You*' />
                        </div>
                        <div className="name flex w-3/4 gap-10">
                          <input {...formik.getFieldProps('isInUs')} id="isInUs" name="isInUs" type="checkbox" />
                          <label htmlFor="isInUs">'Do You live in US*'</label>
                        </div>
                        <div className="name flex w-3/4 gap-10">
                        <button className={styles.btn} type='submit'>{submitButtonText}</button>
                        {(previousButton) && <button className={styles.btn} onClick={handleSubmit}>Back</button>}
                        </div>
                      </div>
                </form> 
            </div>
        </div>
    </div>
  )
}

export default profile