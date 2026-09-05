import { z } from 'zod';

const envSchema = z.object({
  R2_ACCOUNT_ID: z.string().optional().or(z.literal('')),
  R2_ACCESS_KEY_ID: z.string().optional().or(z.literal('')),
  R2_SECRET_ACCESS_KEY: z.string().optional().or(z.literal('')),
  R2_BUCKET_NAME: z.string().optional().or(z.literal('')),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().or(z.literal('')),
});

// We read from process.env and safely trim them right away
// If we are in the browser, process.env might not have these (except NEXT_PUBLIC)
// So we only validate heavily on the server
const isServer = typeof window === 'undefined';

type EnvType = {
  R2_ACCOUNT_ID?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_BUCKET_NAME?: string;
  NEXT_PUBLIC_APP_URL?: string;
};

let parsedEnv: EnvType = {
  R2_ACCOUNT_ID: '',
  R2_ACCESS_KEY_ID: '',
  R2_SECRET_ACCESS_KEY: '',
  R2_BUCKET_NAME: '',
  NEXT_PUBLIC_APP_URL: '',
};

if (isServer) {
  const _env = envSchema.safeParse({
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID?.trim() || '',
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID?.trim() || '',
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY?.trim() || '',
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME?.trim() || '',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL?.trim() || '',
  });

  if (!_env.success) {
    console.error("❌ Invalid server environment variables:", JSON.stringify(_env.error.format(), null, 2));
    throw new Error("Invalid environment variables. See console logs for details.");
  }
  
  parsedEnv = _env.data;
}

export const env = parsedEnv;
