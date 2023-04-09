const express = require("express");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const videoRoutes = require("./routes/video");
const userRoutes = require("./routes/user");
const marketplaceRoutes = require("./routes/marketplace");
const adminRoutes = require("./routes/admin");

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, path.join("uploads", Date.now().toString() + "-" + file.originalname));
    }
  })
});

app.use("/video", upload.single("videoFile"), videoRoutes);
app.use("/user", userRoutes);
app.use("/marketplace", marketplaceRoutes);
app.use("/admin", adminRoutes);

// Error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
