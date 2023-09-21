const authController = require("../app/http/controllers/authController");
const cartController = require('../app/http/controllers/customers/cartController');
const homeController=require('../app/http/controllers/homeController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
//moddlewares
const guest=require("../app/http/middlewares/guest")
const auth=require("../app/http/middlewares/auth")
const admin = require('../app/http/middlewares/admin')


function initRoutes(app){
app.get('/',homeController().index);  
app.get('/login',guest,authController().login); 
app.post('/login',authController().postLogin); 
app.get('/register',guest,authController().register); 
app.post('/register',authController().postRegister);
app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
app.get('/cart',cartController().cart);
app.post('/update-cart',cartController().update)
//customers routes
app.post('/orders',auth,orderController().store)
app.get('/customers/orders',auth,orderController().index);

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

}


module.exports=initRoutes