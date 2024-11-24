import ImageKit from 'imagekit';

// Initialize ImageKit
export const imagekit = new ImageKit({
    publicKey: "public_c+Zi+e7Ltmnekh237lz+18bw6dM=",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: "https://ik.imagekit.io/quadrate"
});

// Generate authentication parameters for client-side upload
export const getAuthenticationParameters = () => {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return authenticationParameters;
};
