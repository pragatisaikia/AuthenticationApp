import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt'
import ENV from '../config.js'
import pkg from 'jsonwebtoken';
const { sign} = pkg;
import otpGenerator from 'otp-generator'

/**middleware for verify user */
export async function verifyUser(req,res,next){
    try {
        const {username} = req.method == "GET" ? req.query : req.body;       
        //check the user existence
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error :  "Cannot find user"})
        next() 
    } catch (error) {
        return res.status(404).send({error : "Authentication error"})
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas L ight, Gwenborough",
  "profile": ""
}
*/
export async function register(req,res){

    try {
        const { username, password, profile, email } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }).then((err,user) => {
                if(err) reject(new Error(err))
                if(user) reject({ error: "Please use unique username"});

                resolve();
            }).catch(err => reject({error: "exist username findone error"}));
        });

         // check for existing email
         const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }).then((err,email) => {
                if(err) reject(new Error(err))
                if(email) reject({ error: "Please use unique email"});

                resolve();
            }).catch(err => reject({error: "exist username findone error"}));
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error})
            })


    } catch (error) {
        return res.status(500).send({error});
    }

}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });  
                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username || username.trim() === '') {
            return res.status(400).send({ error: "Invalid username" });
        }

        UserModel.findOne({ username }).then(user => {
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }

            /**remove password for user   */
            //mongoose return unnecessary data with object convert it to json
            const {password, ...rest} = Object.assign({}, user.toJSON());
            return res.status(200).send(rest);
        }).catch(error => {
            console.error("Error while finding user:", error);
            return res.status(500).send({ error: "Internal server error" });
        });

    } catch (error) {
        console.error("Error while processing request:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}



/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "id" : "<userid>""
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
// export async function updateUser(req, res) {
//     try {
//         const id = req.query.id;

//         if (!id) {
//             return res.status(400).send({ error: "Invalid ID" });
//         }

//         const body = req.body;

//         // Update data
//         UserModel.updateOne({ _id: id }, body)
//             .then(result => {
//                 if (result.nModified === 1) {
//                     return res.status(200).send({ msg: "Record updated" });
//                 } else {
//                     return res.status(404).send({ error: "User not found" });
//                 }
//             })
//             .catch(error => {
//                 console.error("Error while updating user:", error);
//                 return res.status(500).send({ error: "Internal server error" });
//             });
//     } catch (error) {
//         console.error("Error while processing request:", error);
//         return res.status(500).send({ error: "Internal server error" });
//     }
// }
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const {userId} = req.user;

        // console.log("ID:", id); // Log ID

        if (!userId) {
            return res.status(400).send({ error: "Invalid ID" });
        }

        const body = req.body;

        // console.log("Update Data:", body); // Log update data

        // Update data
        UserModel.updateOne({ _id: userId }, body)
            .then(result => {
                // console.log("Update Result:", result); // Log update result

                if (result.modifiedCount === 1) {
                    return res.status(200).send({ msg: "Record updated" });
                } else {
                    return res.status(404).send({ error: "User not found" });
                }
            })
            .catch(error => {
                console.error("Error while updating user:", error);
                return res.status(500).send({ error: "Internal server error" });
            });
    } catch (error) {
        console.error("Error while processing request:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets : false, upperCaseAlphabets: false, specialChars : false})
    res.status(201).send({code : req.app.locals.OTP})
}

export async function verifyOTP(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true; //start the session for reset password
        return res.status(201).send({msg : "Verified Successfully"})
    }
    return res.status(400).send({error : "Invalid OTP"})
}

//successfully redirect user whenOTP is valid
/**GET  */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false; //allow access to this route only once
        return res.status(201).send({msg :"access granted"})
    }
    return res.status(440).send({error : "Session expired"})
}

// update the password when we have a valid session
export function resetPassword(req, res) {
    if(!req.app.locals.resetSession){
        return res.status(440).send({error : "Session expired"})
    }


    const { username, password } = req.body;

    UserModel.findOne({ username })
        .then(user => {
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    UserModel.updateOne({ username: user.username }, { password: hashedPassword })
                        .then(() => {
                            req.app.locals.resetSession = false;
                            return res.status(201).send({ msg: "Record updated." });

                        })
                        .catch(err => {
                            return res.status(500).send({ error: "Unable to update password." });
                        });
                })
                .catch(e => {
                    return res.status(500).send({ error: "Unable to hash password." });
                });
        })
        .catch(error => {
            return res.status(404).send({ error: "Username not found" });
        });
}


