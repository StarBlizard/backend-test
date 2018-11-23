module.exports = (req, res, next) => {
   if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/");
    }
}
