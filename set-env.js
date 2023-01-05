const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envFile = `
export const environment = {
  production: ${process.env.PRODUCTION || false},
  API_URL: "${process.env.API_URL || ''}"
};
`;

fs.writeFile('./src/environment.ts', envFile, err => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('File environment.ts created:');
  console.log(envFile);
});
