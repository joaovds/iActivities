import * as azure from 'azure-storage';
import * as crypto from 'crypto';

export function azureCreate(blobContainerName: string, image: string): string {
  const blobService = azure.createBlobService(process.env.AZURE_STORAGE_KEY);

  let fileName = crypto.randomBytes(20).toString('hex') + '.png';

  const rawDataImage = image;
  const matches = rawDataImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const type = matches[1];
  const buffer = new Buffer.from(matches[2], 'base64');

  const publisher_logo =
    `https://gitbook.blob.core.windows.net/${blobContainerName}/${fileName}`;

  blobService.createBlockBlobFromText(blobContainerName, fileName, buffer, {
    contentType: type
  }, (err, result, response) => {
    if (err) {
      fileName = 'default-publisher.png'
    }
  });

  return publisher_logo;
}