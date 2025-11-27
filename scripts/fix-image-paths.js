const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'pro', 'components', 'kokonutui', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

content = content.replace(/image: "\/images\//g, 'image: "/almani/images/');
content = content.replace(/images: \["\/images\//g, 'images: ["/almani/images/');
content = content.replace(/, "\/images\//g, ', "/almani/images/');

fs.writeFileSync(dataPath, content, 'utf8');
console.log('✅ Image paths fixed successfully!');
