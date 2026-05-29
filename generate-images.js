/**
 * generate-images.js
 * ─────────────────────────────────────────────────────────────────
 * Uses Google Gemini Imagen 3 to generate all website images.
 * Run once: node generate-images.js
 *
 * Prerequisites:
 *   1. Set GEMINI_API_KEY in your .env file (project root)
 *   2. npm install @google/generative-ai dotenv (already done)
 *   3. Run: node generate-images.js
 * ─────────────────────────────────────────────────────────────────
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY || API_KEY === 'paste_your_key_here') {
  console.error('❌  GEMINI_API_KEY not set in .env file');
  console.error('    Edit /Users/dimple_1/MetaX/.env and replace paste_your_key_here with your real key');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const OUTPUT_DIR = path.join(__dirname, 'frontend', 'public', 'images');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── All images needed for the website ──────────────────────────────
const IMAGES = [
  // ── Hero Section ────────────────────────────────────────────────
  {
    file: 'hero-doctor-consultation.jpg',
    prompt: 'Warm, empathetic Indian doctor in white coat sitting across from a middle-aged Indian patient, compassionate consultation in a clean modern clinic, soft natural lighting, WHO public health style, photorealistic',
    aspect: '16:9',
  },
  {
    file: 'hero-healthy-food.jpg',
    prompt: 'Vibrant colourful Indian thali with fresh green vegetables, dal, brown rice, roti, salad, turmeric, spices on a traditional plate, top-down shot, warm natural lighting, photorealistic food photography',
    aspect: '16:9',
  },
  {
    file: 'hero-yoga-community.jpg',
    prompt: 'Diverse group of Indian men and women practising yoga outdoors in a park at sunrise, peaceful community wellness, soft golden morning light, WHO/PIB public health aesthetic, photorealistic',
    aspect: '16:9',
  },
  {
    file: 'hero-weight-monitoring.jpg',
    prompt: 'Indian person gently stepping on a modern digital weighing scale, clean bathroom, soft morning light, health journey beginning, empathetic non-stigmatising portrayal, photorealistic',
    aspect: '16:9',
  },

  // ── Management Pathway Cards ─────────────────────────────────────
  {
    file: 'pathway-lifestyle.jpg',
    prompt: 'Healthy Indian thali meal with green vegetables, lentils, dal, fresh salad, whole grain roti, vibrant colourful food spread on a wooden table, photorealistic food photography, warm tones',
    aspect: '3:2',
  },
  {
    file: 'pathway-medical.jpg',
    prompt: 'Compassionate Indian doctor in white coat warmly consulting with an overweight Indian patient in a modern clinic, inclusive and empathetic, soft warm clinic lighting, photorealistic portrait',
    aspect: '3:2',
  },
  {
    file: 'pathway-surgical.jpg',
    prompt: 'Clean modern hospital corridor with soft warm lighting, professional medical environment, blurred background, calm and reassuring healthcare setting, photorealistic architectural photography',
    aspect: '3:2',
  },

  // ── Government Initiatives ───────────────────────────────────────
  {
    file: 'govt-family-yoga.jpg',
    prompt: 'Diverse Indian family — grandparents, parents, children — walking and doing yoga together in a green park, morning light, Fit India Movement spirit, inclusive public health, photorealistic',
    aspect: '4:3',
  },
  {
    file: 'govt-fit-india.jpg',
    prompt: 'Large outdoor community yoga session in India, hundreds of people on yoga mats in a park or stadium, aerial view, Fit India Movement, colorful mats, morning light, photorealistic',
    aspect: '3:2',
  },
  {
    file: 'govt-poshan.jpg',
    prompt: 'Indian mother and child eating a nutritious colourful meal together, healthy Indian food on the table, warm home environment, POSHAN Abhiyaan nutrition mission theme, photorealistic',
    aspect: '3:2',
  },
  {
    file: 'govt-eat-right.jpg',
    prompt: 'Colourful fresh vegetables, fruits, millets, whole grains displayed at an Indian market stall, healthy eating, Eat Right India FSSAI campaign, vibrant colors, photorealistic',
    aspect: '3:2',
  },
  {
    file: 'govt-khelo-india.jpg',
    prompt: 'Young Indian athletes training on a sports field, running, jumping, teamwork, Khelo India Programme, energetic youth sports, photorealistic action photography',
    aspect: '3:2',
  },
  {
    file: 'govt-ayush.jpg',
    prompt: 'Indian yoga and Ayurveda wellness setting, woman in meditation pose surrounded by herbs and traditional Indian wellness elements, AYUSH ministry, calm serene photorealistic image',
    aspect: '3:2',
  },

  // ── Health Risks Section ─────────────────────────────────────────
  {
    file: 'health-modifiable-risks.jpg',
    prompt: 'Happy Indian person jogging in a green park, morning exercise, healthy lifestyle, weight management journey, empathetic non-stigmatising representation, photorealistic',
    aspect: '4:3',
  },

  // ── Lifestyle Page Hero ──────────────────────────────────────────
  {
    file: 'lifestyle-hero.jpg',
    prompt: 'Indian woman preparing healthy colourful vegetables in a bright modern kitchen, fresh greens, healthy cooking, lifestyle management for weight loss, warm natural light, photorealistic',
    aspect: '16:9',
  },

  // ── Medical Page Hero ────────────────────────────────────────────
  {
    file: 'medical-hero.jpg',
    prompt: 'Indian doctor explaining medical weight loss treatment to a patient, GLP-1 medication brochure on desk, compassionate modern clinic setting, medical weight management, photorealistic',
    aspect: '16:9',
  },

  // ── Surgical Page Hero ───────────────────────────────────────────
  {
    file: 'surgical-hero.jpg',
    prompt: 'Professional bariatric surgery team in a modern operating theatre, laparoscopic equipment, focused surgeons, clean clinical environment, soft overhead lighting, photorealistic medical photography',
    aspect: '16:9',
  },
];

// ── Generate images using Imagen 3 ────────────────────────────────
async function generateImage(item, index) {
  console.log(`\n[${index + 1}/${IMAGES.length}] Generating: ${item.file}`);
  console.log(`  Prompt: ${item.prompt.substring(0, 80)}...`);

  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await model.generateImages({
      prompt: item.prompt,
      numberOfImages: 1,
      aspectRatio: item.aspect || '16:9',
      safetyFilterLevel: 'BLOCK_ONLY_HIGH',
    });

    if (result.images && result.images.length > 0) {
      const imageData = result.images[0].imageData;
      const buffer = Buffer.from(imageData, 'base64');
      const outPath = path.join(OUTPUT_DIR, item.file);
      fs.writeFileSync(outPath, buffer);
      console.log(`  ✅  Saved → public/images/${item.file}`);
      return { file: item.file, success: true };
    } else {
      console.warn(`  ⚠️  No image returned for ${item.file}`);
      return { file: item.file, success: false };
    }
  } catch (err) {
    console.error(`  ❌  Failed: ${err.message}`);
    return { file: item.file, success: false, error: err.message };
  }
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('🎨  Gemini Imagen 3 — Website Image Generator');
  console.log('================================================');
  console.log(`📁  Output: ${OUTPUT_DIR}`);
  console.log(`🖼️   Generating ${IMAGES.length} images...\n`);

  const results = [];

  // Generate sequentially to avoid rate limits
  for (let i = 0; i < IMAGES.length; i++) {
    const result = await generateImage(IMAGES[i], i);
    results.push(result);
    // Small delay between requests to respect rate limits
    if (i < IMAGES.length - 1) await new Promise(r => setTimeout(r, 1500));
  }

  // ── Summary ──────────────────────────────────────────────────────
  const succeeded = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log('\n================================================');
  console.log(`✅  Generated: ${succeeded.length}/${IMAGES.length} images`);
  if (failed.length) {
    console.log(`❌  Failed: ${failed.length} images:`);
    failed.forEach(f => console.log(`    - ${f.file}: ${f.error || 'unknown error'}`));
  }

  // ── Print the import map for updating website ────────────────────
  console.log('\n📋  Image paths for your website:');
  succeeded.forEach(r => {
    console.log(`    /images/${r.file}`);
  });

  console.log('\n🚀  Done! Images saved to frontend/public/images/');
  console.log('    They are accessible in React as: <img src="/images/filename.jpg" />');
}

main().catch(console.error);
