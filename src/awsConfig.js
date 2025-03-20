import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;
export const REGION = process.env.REACT_APP_AWS_REGION;
export const FILE_KEY = process.env.REACT_APP_S3_FILE_KEY; // Path of the file in the bucket

if (!BUCKET_NAME || !REGION || !FILE_KEY) {
  console.error("❌ Missing required AWS environment variables!");
}

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${FILE_KEY}`;

// Fetch Data from S3
export const fetchDataFromS3 = async () => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: FILE_KEY,
    };

    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    const body = await response.Body.transformToString();
    return JSON.parse(body);
  } catch (error) {
    console.error("Error fetching data from S3:", error);
    return [];
  }
};

// Upload Data to S3
export const uploadDataToS3 = async (data) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: FILE_KEY,
      Body: JSON.stringify(data),
      ContentType: "application/json",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("✅ Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data to S3:", error);
  }
};
