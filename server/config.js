module.exports = {
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.S3_BUCKET,
  },
  database: {
    mongoURI: process.env.MONGO_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
  polygon: {
    infuraProjectId: process.env.INFURA_PROJECT_ID,
    polygonPrivateKey: process.env.POLYGON_PRIVATE_KEY,
    gasPrice: 8000000000, // 8 Gwei
  },
  paymentGateway: {
    apiKey: process.env.PAYMENT_GATEWAY_API_KEY,
    apiSecret: process.env.PAYMENT_GATEWAY_API_SECRET,
  },
};
