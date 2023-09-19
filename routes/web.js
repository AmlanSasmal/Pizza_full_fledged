const authController = require("../app/http/controllers/authController");
const cartController = require('../app/http/controllers/cartController');
const homeController=require('../app/http/controllers/homeController');

const guest=require("../app/http/middlewares/guest")

function initRoutes(app){
app.get('/',homeController().index);  
app.get('/login',guest,authController().login); 
app.post('/login',authController().postLogin); 
app.get('/register',guest,authController().register); 
app.post('/register',authController().postRegister);
// app.post('/logout',authController().logout);
app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
app.get('/cart',cartController().cart);
app.post('/update-cart',cartController().update)
}

module.exports=initRoutes