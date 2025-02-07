const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload's handler function
exports.localFileUpload = async (req, res) => {
  try {
    //Fetching the file
    const file = req.files.file;
    console.log("File is =>", file);
    let path =
      __dirname + "/files/" + Date.now() + .${file.name.split(".")[1]}; //Path of server
    console.log("Path =>", path);
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully.",
    });
  } catch (error) {
    if (error) console.log("Couldn't upload file to server");
    console.log(error);
  }
};

//Function to check if file is supported
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

//Function to upload to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//Image Upload handler
exports.imageUpload = async (req, res) => {
  try {
    //Fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile; //imageFile is name of the file
    console.log(file);

    //Validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("FILE NAME =>", fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Filetype is not supported.",
      });
    }

    //File is supported
    const response = await uploadFileToCloudinary(file, "Anmol_MediaUpload");
    //Saving entry in DB
    console.log("_RESPONSE_");
    console.log(response);
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Image couldn't be uploaded successfully.",
    });
  }
};

//Video upload handler
exports.videoUpload = async (req, res) => {
  try {
    //Fetching data from request body
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;

    //Validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("FILE NAME =>", fileType);

    //HW: Add an upper limit of 5MB as well
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Filetype is not supported.",
      });
    }
    const response = await uploadFileToCloudinary(file, "Anmol_MediaUpload");
    console.log("----RESPONSE----");
    console.log(response);
    const fileData = await File.create({
      name,
      tags,
      email,
      Url: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Video upload failed.",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    //Fetch data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile; //imageFile is name of the file
    console.log(file);

    //Validation
    const supportedTypes = ["jpeg", "png", "jpg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("FILE NAME =>", fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Filetype is not supported.",
      });
    }

    //File is supported
    const response = await uploadFileToCloudinary(
      file,
      "Anmol_MediaUpload",
      30
    );
    //Saving entry in DB
    console.log("_RESPONSE_");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Video upload failed.",
    });
  }
};