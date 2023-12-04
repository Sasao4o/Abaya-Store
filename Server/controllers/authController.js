 

const user = require("../models/user");
const Model = require("../models");
const userModel = Model.User;
const authTools = require("../utilis/authTools");
const AppError = require("../utilis/AppError");
const catchAsync = require("../utilis/catchAsync");
exports.register = catchAsync(async (req,res,next) => {
 
    const data = {
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        gender:req.body.gender,
        phoneNumber:req.body.phoneNumber,
        image:req.body.image
         };
         
     if (!data.email || !data.password) return next(new AppError("Please Enter an email and password"), 404)
     const user =  await userModel.create(data)
     const filteredData = {
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        phoneNumber:req.body.phoneNumber,
        image:req.body.image
     };
     const token = authTools.generateToken(user) 
     res.cookie('jwt',token, { maxAge: 900000, httpOnly: true });
     res.status(200).json({
            data:filteredData,
            status:"sucess",
            token
        })
    
});

exports.logIn = catchAsync(async (req,res,next) => {
 
    const data = {
        email:req.body.email,
        password:req.body.password
     };
      const user = await userModel.findOne({
        attributes: ['id', 'firstName', 'email',  'password'],
          where:{email:data.email}
    });
    
      if (!user || !authTools.verifyPassword(data.password, user.password)) return next(new AppError("Please Enter a correct email and password", 404));
      const token = authTools.generateToken(user); 
       res.cookie('jwt',token, { maxAge: 900000, httpOnly: true });
      res.status(202).json({
         status:"Sucess",
         message:"You Have Logged In",
         data:user,
         token
        
      })
});
 exports.isLoggedIn = catchAsync(async (req, res, next) => {
   const token =  req.cookies.jwt;
     
   
   if (!token) return next();
   const tokenVeri = await authTools.tokenVerify(token);
   if (!tokenVeri) return next();
   const user = await userModel.findOne({where:{_id: tokenVeri.id}});
   if (!user)  return next();
   if (user.passwordUpdated) { 
   if (tokenVeri.iat * 1000 < user.passwordUpdatedAt) return next();
   }
  
   req.user = user;
 
   return next();
});

exports.protectRoute = catchAsync(async (req, res, next) => {
   const token =  req.cookies.jwt;
 
   if (!token) return next(new AppError("Please Sign In", 404));
   const tokenVeri = await authTools.tokenVerify(token); 
   if (!tokenVeri) return next(new AppError("Please Sign In Again", 404) );
   const user = await userModel.findOne({_id: tokenVeri.id});
   if (!user) return next(new AppError("Please sign in again error token is invalid", 404))
   if (user.passwordUpdated) { 
   if (tokenVeri.iat * 1000 < user.passwordUpdatedAt) return next(new AppError("Please Sign In Again as your pw changed recently"), 404);
   }
   req.user = user;
   next();
});

//Route Must Be Protected
exports.restrictedTo = (...roles) => {

   return (req, res, next) => {
      const role = req.user.role;
      if (!req.user) return next(new AppError("Please Login To Join This Route As it has restrictions", 404));
      if (!roles.includes(role)) return next(new AppError("You are not authorized to enter that route", 404));
      next()

   }
}