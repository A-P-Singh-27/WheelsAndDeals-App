const express = require('express');
const app = express();
const cors = require('cors');
const dbconnect = require('./config/database');
require('dotenv').config();
const carRoutes = require('./routes/carRoutes'); // Import car-related routes
const chatRoutes = require('./routes/chatRoutes'); // Import chat-related routes
const cloudinary = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

// app.use(cors());// freeing cors to all origin
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,       // Optional: Use temp files instead of RAM
    tempFileDir: '/tmp/',     // Optional: Directory for temp files
    createParentPath: true,   // Optional: Automatically create parent directories
}));

//enabling preflight request
app.options('*', cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Register routes
app.use('/api/cars', carRoutes); // Prefix routes with '/api/cars'
app.use('/api/chat', chatRoutes); // Prefix routes with '/api/chat'


// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "https://wheels-and-deals.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"], // Force WebSockets instead of polling
});

io.on('connection' , (socket)=>{
    console.log("connected to socket .io");

    socket.on('setup' , (userdata)=>{
        socket.join(userdata._id);
        console.log(userdata._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room)=>{
        socket.join(room);
        console.log('user joined ', room);
        
    });

    socket.on('new message', (newMessageReceived)=>{
        // console.log('hello bhhai' , newMessageReceived);
        
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log('chat.users not defined');
        
        chat.users.forEach(user => {
            console.log(user._id);
            
            if (user._id == newMessageReceived.sender._id) {
                return
            }else{
              socket.in(user._id).emit('message recieved' , newMessageReceived)
            }
        });
        
    });
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        // Perform cleanup here if necessary, such as marking the user as offline
    });

    // Handle custom inactivity event (optional)
    socket.on('inactive', () => {
        console.log(`Socket marked as inactive: ${socket.id}`);
        socket.disconnect(true); // Forcefully disconnect the socket
    });
    
})

// Connect to the database
dbconnect();
cloudinary.cloudinaryConnect();
