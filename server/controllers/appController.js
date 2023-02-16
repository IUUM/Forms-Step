import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';

/** POST: http://localhost:8000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "aboutyou" : "Apt. 556, Kulas Light, Gwenborough",
  "isInUs": true
  "file": ""
}
*/

export async function register(req,res){
    console.log('entered');
    console.log(req.body);
    try {
        const { username, password, file, email,firstName,lastName,mobile,isInUs,aboutyou } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                console.log("1"+err);
                if(user) reject({ error : "Please use unique username"});
                console.log("2"+err);

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                console.log(err);
                if(email) reject({ error : "Please use unique Email"});
                console.log(err);
                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                email,
                                firstName,
                                lastName,
                                mobile,
                                aboutyou,
                                isInUs,
                                file: file || '',
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
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }
}