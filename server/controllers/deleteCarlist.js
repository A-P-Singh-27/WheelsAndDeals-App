const MyCar = require('../models/carDetails');

exports.DeleteCarListById = async (req, res) => {
    try {
        const {id} = req.query;
        
        const DeletedCarList = await MyCar.findByIdAndDelete({_id:id});
        console.log('DeletedCarList' , DeletedCarList);
        
        res.status(201).json({
            success:true,
            message:'dleted succesfuly'
        });
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}