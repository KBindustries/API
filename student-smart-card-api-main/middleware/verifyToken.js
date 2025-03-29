import jwt from "jsonwebtoken"

const verifyToken = (req,res,next)=>{
    const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(401).send({ message: "Unauthorized!", error: err });
    }
  
    req.userId = decoded.id;
    req.email = decoded.email;
    next();

    
  });

}

export const verifyUser =(req, res, next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.role=='user'){
            next()
        }else{
            return res.status(401).json({success: false, message: "You're not authenticated"})
        }
    })
}

//verify admin
export const verifyAdmin =(req, res, next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.role=='admin'){
            next()
        }else{
            return res.status(401).json({success: false, message: "You're not authenticated"})
        }
    })
}

//verify security guard
export const verifySecurity =(req, res, next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.role=='security'){
            next()
        }else{
            return res.status(401).json({success: false, message: "You're not authenticated"})
        }
    })
}

//verify class delegate
export const verifyDelegate =(req, res, next) =>{
    verifyToken(req,res,next,()=>{
        if(req.user.role=='delegate'){
            next()
        }else{
            return res.status(401).json({success: false, message: "You're not authenticated"})
        }
    })
}











    // const token = req.cookies.accessToken

    // if(!token){
    //     return(
    //         res.status(401).json({success: false, message: "You are not authorize"})
    //     )
    // }

    // // if token exist then verify the token
    // jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, user)=>{
    //     if(err){
    //         return(
    //             res.status(401).json({success: false, message: "token is invalid"})
    //         )
    //     }

    //     req.user = user
    //     next() 
    // })