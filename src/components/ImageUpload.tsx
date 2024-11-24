'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
    currentImage?: string;
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(currentImage || null);

    const handleUpload = useCallback(async (file: File) => {
        setUploading(true);
        setError(null);

        try {
            // First get authentication parameters
            const authResponse = await fetch('/api/imagekit');
            const auth = await authResponse.json();

            if (!authResponse.ok) {
                throw new Error('Failed to get upload credentials');
            }

            // Create form data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('publicKey', 'public_c+Zi+e7Ltmnekh237lz+18bw6dM=');
            formData.append('signature', auth.signature);
            formData.append('expire', auth.expire);
            formData.append('token', auth.token);
            formData.append('fileName', `blog-${Date.now()}-${file.name}`);

            // Upload to ImageKit
            const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
                method: 'POST',
                body: formData
            });

            const uploadResult = await uploadResponse.json();

            if (!uploadResponse.ok) {
                throw new Error(uploadResult.message || 'Failed to upload image');
            }

            // Set preview and notify parent
            setPreview(uploadResult.url);
            onImageUpload(uploadResult.url);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    }, [onImageUpload]);

    return (
        <div className="space-y-4">
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {preview ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={300}
                                    height={200}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        ) : (
                            <>
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
                            </>
                        )}
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleUpload(file);
                            }
                        }}
                        disabled={uploading}
                    />
                </label>
            </div>

            {uploading && (
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                </div>
            )}
        </div>
    );
}
