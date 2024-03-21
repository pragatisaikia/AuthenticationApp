import React from 'react'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast' ;
import {useFormik} from 'formik';
import { resetPasswordValidate } from '../helper/validate';

export default function Reset() {

  const formik = useFormik({
    initialValues : {
      password : '',
      confirmpsw : ''
    },
    validate : resetPasswordValidate ,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values =>{
      console.log(values);
    }
  })

  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="h-screen flex justify-center items-center">
        <div className={styles.glass} style={{width: "50%"}}>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold'>Reset</h1>
            <span className='pt-3 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            

            <div className='textbox flex flex-col items-center gap-4'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password' />
              <input {...formik.getFieldProps('confirmpsw')} className={styles.textbox} type="password" placeholder='Re-enter Password' />
              <button type='submit' className={styles.btn}>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
