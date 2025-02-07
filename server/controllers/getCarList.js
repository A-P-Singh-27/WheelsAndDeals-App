const MyCar = require('../models/carDetails');

exports.GetUserCarList = async (req, res) => {
    try {
        // console.log(req.body);
        const { createdby } = req.query;
        if (!createdby) {
            return res.status(400).json({ message: 'Missing createdby query parameter' });
        }

        const carListing = await MyCar.find({ createdby: createdby });
        res.status(201).json(carListing);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}

exports.GetPopularCarList = async (req, res) => {
    try {
        // console.log(req.body);

        const carListing = await MyCar.find().limit(10);
        res.status(201).json(carListing);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}
exports.GetAllCarList = async (req, res) => {
    try {
        // console.log(req.body);

        const carListing = await MyCar.find();
        res.status(200).json(carListing);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}

exports.GetCarlistById = async (req, res) => {
    try {

        const { recordId } = req.query;

        if (!recordId) {
            return res.status(400).json({
                success: false,
                message: 'Car id is not present'
            })
        }

        const carListing = await MyCar.find({ _id: recordId });
        res.status(201).json(carListing);
    } catch (error) {
        console.error('Error creating car listing:', error);
        res.status(500).json({ message: 'Error creating car listing' });
    }
}

exports.GetCarsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Car category is not present'
            })
        }

        const Cars = await MyCar.find({ category:category});
        res.status(201).json(Cars);



    } catch (error) {
        console.error('Error in getting cars by category', error);
        res.status(500).json({ message: 'Error in getting cars by category' });
    }
}

exports.GetCarsByConditionPriceMake = async (req, res) => {
    try {
        const { condition , make, price } = req.query;
        if (!condition && !make&& !price) {
            console.log('missing');
            
            return res.status(400).json({
                success: false,
                message: 'all requirement is not present'
            })
        }
        console.log('hi');
        console.log({
            condition,
            make,
            price,
        });
        
        // $expr: { $lt: [{ $toDouble: "$sellingPrice" }, { $toDouble: price }] },
        
        const carlist = await MyCar.find({ condition:condition , make:make ,  $expr: { $lte: [{ $toDouble: "$sellingPrice" }, parseFloat(price)] }}).sort({sellingPrice:1});
        console.log(carlist);
        

        res.status(201).json(carlist);



    } catch (error) {
        console.error('Error in getting cars by category', error);
        res.status(500).json({ message: 'Error in getting cars by category' });
    }
}