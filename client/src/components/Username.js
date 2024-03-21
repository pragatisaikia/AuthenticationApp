import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast' ;
import {useFormik} from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername)
  // const username = useAuthStore(state => state.auth.username)

  // useEffect(() =>{
  //   console.log(username)
  // })

  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
    validate : usernameValidate ,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values =>{
      setUsername(values.username)
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
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
              <button type='submit' className={styles.btn}>Let's Go</button>
            </div>

            <div className='text-center py-4'>
              <span>Not a Member <Link className='text-gray-500'
                to="/register">Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
