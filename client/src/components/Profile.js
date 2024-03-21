import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'

export default function Profile() {

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName : '',
      lastName : '',
      email: '',
      mobile: '',
      address: ''
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' })
      console.log(values);
    }
  })

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }


  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="h-screen flex justify-center items-center">
        <div className={`${styles.glass} ${extend.glass}` }>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold' >Profile</h1>
            <span className='pt-2 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4 '>
              <label htmlFor="profile">

                <img className={`${styles.profile_img} ${extend.profile_img}`} src={file || avatar} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className='textbox flex flex-col items-center gap-2'>
              <div className="name flex w-9/12 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Last Name' />
              </div>

              <div className="name flex w-9/12 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile no.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email' />
              </div>

              
                <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
                <button type='submit' className={`${styles.btn} ${extend.btn}`}>Register</button>
              



            </div>

            <div className='text-center py-2'>
              <span>Come back later?<Link className='text-gray-500'
                to="/"> Logout</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
