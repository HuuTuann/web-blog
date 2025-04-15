namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ACCESS_TOKEN: string;
    NEXT_PUBLIC_WEB_URL: string;
    NEXT_PUBLIC_SERVICE_URL: string;
    NEXT_PUBLIC_ENVIRONMENT: "development" | "production";
  }
}
