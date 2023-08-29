function cartController(){
    return{
       cart(req,res){
          res.render('customers/cart')
      },
      update(req,res){
         //for the first time ccreating cart and adding basic obj structure
         if(!req.session.cart){
            req.session.cart={
               items:{},
               totalQty:0,
               totalPrice:0
            }
         }
          let cart=req.session.cart;
          //check if item doesn't exist in the cart
          if(!cart.items[req.body._id]){
            cart.items[req.body._id]={
               item: req.body,
               qty:1
            }
            cart.totalQty+=1;
            cart.totalPrice+=req.body.price;
          }
          else{//check if same pizza available then count++
            cart.items[req.body._id].qty+=1;
            cart.totalQty+=1;
            cart.totalPrice+=req.body.price;
          }

         return res.json({totalQty:req.session.cart.totalQty})
      }
   }
}

module.exports=cartController;