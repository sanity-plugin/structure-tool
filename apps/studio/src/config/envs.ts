const envs = {
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID as string,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET as string,
} as const;

export default envs;
