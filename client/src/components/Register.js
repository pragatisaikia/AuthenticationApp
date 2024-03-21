import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast' ;
import {useFormik} from 'formik';
import { registerValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';

export default function Register() {

  const [file,setFile] = useState();

  const formik = useFormik({
    initialValues : {
      email :'admin@gmail.com',
      username : 'admin123',
      password : ''
    },
    validate : registerValidate ,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values =>{
      values = await Object.assign(values,{profile : file || ''})
      console.log(values);
    }
  })
  
  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    <div className="container mx-auto">
    <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="h-screen flex justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold' >Register</h1>
            <span className='pt-2 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4 '>
              <label htmlFor="profile">

              <img className={styles.profile_img} src={file || avatar} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile'/>
            </div>

            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <button type='submit' className={styles.btn}>Register</button>
            </div>

            <div className='text-center py-2'>
              <span>Already Registered?<Link className='text-gray-500'
                to="/"> Login Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
