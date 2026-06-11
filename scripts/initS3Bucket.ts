import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
} from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || '',
    secretAccessKey:
      process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || '',
  },
  region: process.env.S3_REGION || 'us-east-1',
  forcePathStyle: true,
});

const bucket = process.env.S3_BUCKET_NAME || process.env.S3_BUCKET || '';

async function createBucketIfNotExists(): Promise<void> {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`Bucket ${bucket} already exists`);
  } catch (error: any) {
    const statusCode = error?.$metadata?.httpStatusCode ?? error?.statusCode;
    if (statusCode === 404 || error?.name === 'NotFound') {
      console.log(`Creating bucket ${bucket}...`);
      await s3.send(new CreateBucketCommand({ Bucket: bucket }));
      console.log(`Bucket ${bucket} created successfully`);
    } else {
      console.error('Error checking bucket existence:', error);
      throw error;
    }
  }
}

createBucketIfNotExists()
  .then(() => {
    console.log('S3 bucket initialization complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error initialising S3 bucket:', error);
    process.exit(1);
  });
