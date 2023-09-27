const Order = require('../../../models/order');

function statusController() {
  return {
    update(req, res) {
      const { orderId, status } = req.body;

      Order.updateOne({ _id: orderId }, { status })
        .then(() => {
          res.redirect('/admin/orders');
        })
        .catch((err) => {
          console.error('Error updating order:', err);
          res.redirect('/admin/orders');
        });
    }
  };
}

module.exports = statusController;
