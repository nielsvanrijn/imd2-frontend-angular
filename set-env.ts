const fs = require('fs');
const prodCheck = process.env.NODE_ENV === 'production';
const targetPath = `./src/environments/environment.${prodCheck ? 'prod.' : ''}ts`;
require('dotenv').config({path: prodCheck ? '.env.production' : '.env'});

fs.readFile('./src/environments/environment.prod.ts', 'utf8' , (err: any, data: any) => {
	if (err) {
	  console.error(err)
	  return
	}
	// `environment.ts` file structure
	const envConfigFile = `export const environment = {
	   production: '${process.env.PRODUCTION}',
	   apiUrl: '${process.env.APIURL}',
	   uploadApiUrl: '${process.env.UPLOADAPIURL}',
	   uploadUserName: '${process.env.UPLOADUSERNAME}',
	   uploadApiPass: '${process.env.UPLOADAPIPASS}',
	};
	`;
	fs.writeFile(targetPath, envConfigFile, function (err: any) {
	   if (err) {
		   throw console.error(err);
	   } else {
		   console.log(`${process.env.APIURL} | Angular environment.ts file generated correctly at ${targetPath}. \n`);
	
		   fs.readFile('./src/environments/environment.prod.ts', 'utf8' , (err: any, data: any) => {
			if (err) {
			  console.error(err)
			  return
			}
		})
	   }
	});
})
