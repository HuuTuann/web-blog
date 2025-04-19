namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ACCESS_TOKEN: string;
    NEXT_PUBLIC_WEB_URL: string;
    NEXT_PUBLIC_SERVICE_URL: string;
    NEXT_PUBLIC_ENVIRONMENT: "development" | "production";
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
  }
}
