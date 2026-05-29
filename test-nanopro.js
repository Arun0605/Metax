require('dotenv').config({ path: '/Users/dimple_1/MetaX/.env' });
const https = require('https');
const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-3-pro-image-preview'; // Nano Banana Pro

function generateImage(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) { console.error('API Error:', json.error.message); return reject(json.error); }
          const parts = json.candidates?.[0]?.content?.parts || [];
          const imgPart = parts.find(p => p.inlineData);
          if (imgPart) {
            const buf = Buffer.from(imgPart.inlineData.data, 'base64');
            fs.writeFileSync(outputPath, buf);
            console.log(`✅ Saved ${outputPath} (${(buf.length/1024).toFixed(0)}KB)`);
            resolve(true);
          } else {
            console.log('No image in response. Parts:', JSON.stringify(parts).substring(0, 300));
            resolve(false);
          }
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

generateImage(
  'Photorealistic illustration of an obese Indian person standing on a weighing scale at home, soft morning light, empathetic non-stigmatizing portrayal, health awareness, medical style',
  '/tmp/test-nanopro.jpg'
).then(ok => console.log('Test:', ok ? 'SUCCESS' : 'FAILED'));
