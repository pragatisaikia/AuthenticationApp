import React from 'react'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast';

export default function Recovery() {
  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>




      <div className="h-screen flex justify-center items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className='text-4xl font-bold'>Recovery</h1>
            <span className='pt-3 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-20' >

            <div className='textbox flex flex-col items-center gap-4'>

              <div className="input text-center">


                <span className='py-4 text-sm text-left text-gray-500'>
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input className={styles.textbox} type="text" placeholder='6 Digit OTP' />
              </div>

              <button type='submit' className={styles.btn}>Let's Go</button>
            </div>

            <div className='text-center py-4'>
              <span>Can't get OTP?<button className='text-gray-500'>Resend</button></span>
              
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
