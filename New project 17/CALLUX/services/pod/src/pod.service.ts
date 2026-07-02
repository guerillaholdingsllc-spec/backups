import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createHash } from 'crypto';

export class PodService {
  private readonly s3 = new S3Client({ region: process.env.AWS_REGION ?? 'us-west-1' });

  async uploadArtifact(callId: string, buf: Buffer, key: string) {
    const sha = createHash('sha256').update(buf).digest('hex');
    const s3Key = `pod/${callId}/${key}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: s3Key,
        Body: buf,
        Metadata: { sha256: sha, callId }
      })
    );
    return { key: s3Key, sha256: sha };
  }
}

