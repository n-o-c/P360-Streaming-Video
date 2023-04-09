const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const awsServerlessExpress = require('aws-serverless-express');
const dotenv = require('dotenv');

dotenv.config();

// Set up AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up S3
const s3 = new AWS.S3();

// Set up Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer-S3 upload middleware
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Upload file to S3
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully' });
});

// Catch all other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start server
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
