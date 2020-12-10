require('dotenv').config();
const app = require('express')();
const { functions } = require('./util/firebase');

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
const cors = require('cors');
app.use(cors({ origin: true }));

// Route imports
const { 
    getVideoToken,
    postVideoToken 
} = require('./handlers/tokenHandlers');

// Auth middleware
const authMiddleware = require('./util/authMiddleware');

// Routes
app.get('/video/token', getVideoToken);
app.post('/video/token', postVideoToken);

// API entry point
exports.api = functions.https.onRequest(app);