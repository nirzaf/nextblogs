import ImageKit from 'imagekit';
import crypto from 'crypto';

// Initialize ImageKit
export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_c+Zi+e7Ltmnekh237lz+18bw6dM=",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/quadrate"
});

// Generate authentication parameters for client-side upload
export const getAuthenticationParameters = () => {
    // Get timestamp in seconds
    const token = crypto.randomBytes(32).toString('hex');
    const expire = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    
    // Create signature
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || '';
    const signature = crypto
        .createHmac('sha1', privateKey)
        .update(token + expire.toString())
        .digest('hex');

    return {
        token,
        expire,
        signature
    };
};
