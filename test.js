import { startServer } from './dist/index.js';

console.log('Starting test...');

process.env.TERRAKUBE_API_URL = 'http://localhost:8080';
process.env.TERRAKUBE_PAT_TOKEN = 'test';
process.env.TERRAKUBE_ORGANIZATION = 'test';

startServer().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 