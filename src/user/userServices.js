var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
    userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
        if(errorvalue) {
            reject({status: false, msg: "Error de datos"});
        }
        else {
            if(result !=undefined &&  result !=null) {

                resolve({status:false,msg: "El usuario ya existe"})

            }
            else {
                var userModelData = new userModel();

                userModelData.firstname = userDetails.firstname;
                userModelData.lastname = userDetails.lastname;
                userModelData.email = userDetails.email;
                userModelData.password = userDetails.password;
                var encrypted = encryptor.encrypt(userDetails.password);
                userModelData.password = encrypted;

                userModelData.save(function resultHandle(error, result) {

                    if (error) {
                        reject(false);
                    } else {
                        resolve({status:true,msg: "El usuario ha sido creado"});
                    }
                })   
            }
        }});
       
       });
   
}

module.exports.deleteUserDBService = (user) => {

    return new Promise(function myFn(resolve, reject)  {


        userModel.findOne({ email: user.email},function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Error de datos"});
            }
            else {
                if(result !=undefined &&  result !=null) {

                    if(result.email== user.email) {
                        userModel.deleteOne(function resultHandle(error, result) {

                            if (error) {
                                reject(false);
                            } else {
                                resolve({status: true, msg:"Usuario eliminado"});
                            }
                        });
                    }

                }
                else {
                    reject({status: false,msg: "El usuario no existe"});
                }
            }
        });
    });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email== userDetails.email) {
                  resolve({status: true,msg: "usuario encontrado: " + result.email});
               }
      
            }
            else {
               reject({status: false,msg: "Este usuario no existe"});
            }
         }
      });
   });
}

module.exports.putUserDBService = (userUpdate) => {
    userUpdate.password = encryptor.encrypt(userUpdate.password)

    return new Promise(function myFn(resolve, reject) {
        
        userModel.findOneAndUpdate({ email: userUpdate.email},userUpdate,function getresult(errorvalue, result) {
            if(errorvalue) {
               reject({status: false, msg: "Datos Invalidos"});
            }
            else {
               if(result !=undefined &&  result !=null) {
   
                    resolve({status: true, msg: "Los datos del usuario han sido actualizados"})
         
               }
               else {
                  reject({status: false,msg: "Ha fallado la actualización del usuario"});
               }
            }
         });
    });
}
