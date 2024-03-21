import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast' ;
import {useFormik} from 'formik';
import { passwordValidate } from '../helper/validate';

export default function Password() {

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate ,
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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold'>Hello Again!</h1>
            <span className='pt-3 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4 '>
              <img className={styles.profile_img} src={avatar} alt="avatar" />
            </div>

            <div className='textbox flex flex-col items-center gap-4'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <button type='submit' className={styles.btn}>Sign Up</button>
            </div>

            <div className='text-center py-4'>
              <span>Forgot Password?<Link className='text-gray-500'
                to="/recovery">Reset here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
