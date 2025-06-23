import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'f-sanyo-plastic',
  apiKey: process.env.API_KEY,
});