const fs = require('fs');

const imagesPath = 'images.json';

async function run() {
  const images = JSON.parse(fs.readFileSync(imagesPath, 'utf-8'));

  // Add new image information to the images array
  const newImage = {
    name: process.env.GITHUB_SHA.slice(0, 8), // Use the commit hash as a unique identifier
    url: `https://${process.env.GITHUB_REPOSITORY.split('/')[0]}.github.io/${process.env.GITHUB_REPOSITORY.split('/')[1]}/images/${process.env.GITHUB_SHA.slice(0, 8)}.png`,
  };
  images.push(newImage);

  // Update the images.json file
  fs.writeFileSync(imagesPath, JSON.stringify(images, null, 2), 'utf-8');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
