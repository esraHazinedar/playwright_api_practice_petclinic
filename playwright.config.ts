import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [['html'], ['list']],
  use: {
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'api-testing'
    }
  ],
});
