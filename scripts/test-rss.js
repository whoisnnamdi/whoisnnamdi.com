// This script tests the RSS generation
require('dotenv').config();
const generateRSS = require('./generate-rss');

console.log('Testing RSS generation...');
generateRSS();