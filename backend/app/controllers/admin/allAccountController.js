const User = require('../../models/User');

// get[/allaccount] DS Don hang
exports.listAllAccount = (req, res) => {
    User.find().lean()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: error.message }));
};

// delete[/allaccount/:id]
exports.deleteOneAccount = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Order Product deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
}