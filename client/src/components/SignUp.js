import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import LazyLoad from 'parm-react-lazyload';
import Register from './Register';
import Profile from './Profile';
import Completed from './Completed';

function signUp(){
    const pageStage = useSelector(state => state.FormStage);

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <LazyLoad once>
                 <div className={styles.progressbar}>
                     <div className={pageStage==1 ? `${styles.progress_step} ${styles.progress_step_active}`: `${styles.progress_step}`} data-title="Create"></div>
                     <div className={pageStage==2 ? `${styles.progress_step} ${styles.progress_step_active}`: `${styles.progress_step}`} data-title="Profile"></div>
                     <div className={pageStage==3 ? `${styles.progress_step} ${styles.progress_step_active}`: `${styles.progress_step}`} data-title="Done"></div>
                </div>
            </LazyLoad>
            <div>
                {(pageStage==1)&&
                    <LazyLoad once>
                        <Register
                            pageTitle={'Register'} // form page stage title
                            submitButtonText={'Next'} // submit next button display text
                            previousButton={false} // show/hide previous button/>
                        />
                    </LazyLoad>  
                }

                {(pageStage==2) &&
                    <LazyLoad once>
                        <Profile
                         pageTitle={'Profile Form:'} // form page stage title
                        submitButtonText={'Next'} // submit next button display text
                        previousButton={true} // show/hide previous button
                        />
                    </LazyLoad>  
                }

                {(pageStage==3) &&
                    <LazyLoad once>
                        <Completed
                         pageTitle={'InProcess......'} 
                         errorMessage={'Error! Please verify your data to complete the registeration'}
                         successMessage={'Please verify your email address, you should have recieved an email from us already!'} // page success message
                        />
                    </LazyLoad>  
                }
            </div>
        </div>
    )
}

export default signUp;