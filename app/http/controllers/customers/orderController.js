const Order = require('../../../models/order')
const moment =require('moment');
function orderController() {

    return {
        store(req, res) {
            //validate request
            const { phone, address } = req.body
            if (!phone || !address) {

                req.flash('error', 'All fields are required')
                return res.redirect('/cart')


            }

            const order = new Order({
                userId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

            order.save().then(result => {

                req.flash('success', 'Order placed successfully!')
                delete req.session.cart;
                return res.redirect('/customers/orders');



            }).catch(err => {
                req.flash('error', 'Something went wrong!')
                return res.redirect('/cart')
            })
        },

       async index(req, res) {

            const orders= await Order.find({userId:req.user._id},null,{sort:{'createdAt':-1}})
            res.header('Cache-Control', 'no-store')
            res.render('customers/orders',{moment:moment,orders:orders})

            

        }
    }
}

module.exports = orderController