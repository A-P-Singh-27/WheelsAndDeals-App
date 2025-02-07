const express = require('express');
const router = express.Router();
const { CreateCarList, UpdateCarList } = require('./../controllers/createCarList');
const { GetUserCarList, GetPopularCarList, GetCarlistById, GetCarsByCategory, GetCarsByConditionPriceMake, GetAllCarList } = require('./../controllers/getCarList');
const { DeleteCarListById } = require('./../controllers/deleteCarlist');
const { uploadImage } = require('../controllers/UploadImages');

// POST route to handle car listing creation
router.post('/addListing', CreateCarList);
router.put('/updateListing', UpdateCarList);
router.get('/getusercarlisting', GetUserCarList);
router.get('/getcarsbycategory', GetCarsByCategory);
router.get('/getcarsbyconditions', GetCarsByConditionPriceMake);
router.get('/getpopularcarlisting', GetPopularCarList);
router.get('/getallcarlist', GetAllCarList);
router.get('/getcarbyid', GetCarlistById);
router.delete('/deletecarlist', DeleteCarListById);

router.post('/upload-images', uploadImage);

module.exports = router;
