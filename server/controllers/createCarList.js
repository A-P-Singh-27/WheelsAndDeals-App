const MyCar = require('../models/carDetails');

exports.CreateCarList = async (req, res) => {
    try {
        // console.log(req.body);
        
        const carListing = await MyCar.create(req.body);
        res.status(201).json(carListing);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}
exports.UpdateCarList = async (req, res) => {
    try {
        const {id} = req.query;
        console.log(req.body);
        const updatedCarList = req.body;
        
        const UpdatedcarListing = await MyCar.findByIdAndUpdate({_id:id} , updatedCarList , {new:true});
        console.log(updatedCarList);
        
        res.status(201).json(updatedCarList);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}