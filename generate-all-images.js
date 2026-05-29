/**
 * generate-all-images.js
 * Uses Pollinations SANA model — free, no API key, excellent quality
 * Run: node generate-all-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'frontend', 'public', 'images');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const IMAGES = [
  // ── Hero Section ──────────────────────────────────────────────
  {
    file: 'hero-doctor.jpg',
    w: 1920, h: 1080,
    prompt: 'Indian female doctor in white coat sitting across from an obese Indian middle-aged man in a clean modern clinic, compassionate consultation about obesity and diabetes, warm natural window light, photorealistic 4k, empathetic medical scene, Indian healthcare setting',
  },
  {
    file: 'hero-food.jpg',
    w: 1920, h: 1080,
    prompt: 'Split scene: left side overflowing junk food burgers fries sweets unhealthy Indian street food causing obesity, right side vibrant colourful healthy Indian thali green vegetables lentils fresh fruit, dramatic contrast, photorealistic 4k food photography, health awareness illustration',
  },
  {
    file: 'hero-yoga.jpg',
    w: 1920, h: 1080,
    prompt: 'Large group of overweight and obese Indian men and women doing yoga in a park at sunrise, Fit India Movement, inclusive diverse community wellness, soft golden morning light, photorealistic 4k, empowering health scene',
  },
  {
    file: 'hero-weighscale.jpg',
    w: 1920, h: 1080,
    prompt: 'Obese Indian woman gently stepping on a digital weighing scale in a clean bathroom, morning light, beginning her health journey, soft hopeful atmosphere, empathetic non-stigmatising portrayal, photorealistic 4k detailed',
  },

  // ── Pathway Cards ─────────────────────────────────────────────
  {
    file: 'pathway-lifestyle.jpg',
    w: 800, h: 600,
    prompt: 'Indian obese woman preparing healthy colourful vegetables in a bright modern kitchen, fresh greens and whole grains on counter, lifestyle change for weight loss, warm natural light, photorealistic 4k detailed illustration',
  },
  {
    file: 'pathway-medical.jpg',
    w: 800, h: 600,
    prompt: 'Indian doctor showing GLP-1 medication and BMI chart to an overweight Indian patient, modern clinic, medical weight management consultation, compassionate setting, photorealistic 4k',
  },
  {
    file: 'pathway-surgical.jpg',
    w: 800, h: 600,
    prompt: 'Clean modern bariatric surgery operation theatre in India, laparoscopic surgical team in scrubs, professional medical environment, soft overhead lighting, photorealistic 4k medical photography',
  },

  // ── Government Initiatives ────────────────────────────────────
  {
    file: 'govt-yoga.jpg',
    w: 800, h: 600,
    prompt: 'Hundreds of Indian people of various body sizes doing yoga together in a large park or stadium, aerial view, Fit India Movement, colourful yoga mats, morning golden light, photorealistic 4k',
  },
  {
    file: 'govt-poshan.jpg',
    w: 800, h: 600,
    prompt: 'Indian mother and healthy child eating nutritious colourful home-cooked meal together, POSHAN Abhiyaan nutrition mission, warm Indian home, vegetables millets lentils on table, photorealistic 4k',
  },
  {
    file: 'govt-eat-right.jpg',
    w: 800, h: 600,
    prompt: 'Vibrant colourful Indian market stall with fresh vegetables fruits millets whole grains, Eat Right India FSSAI campaign, healthy food choices, bright natural light, photorealistic 4k food photography',
  },
  {
    file: 'govt-khelo-india.jpg',
    w: 800, h: 600,
    prompt: 'Young Indian boys and girls athletes running and playing sports on a field, Khelo India programme, energetic diverse youth, teamwork, photorealistic 4k action sports photography',
  },
  {
    file: 'govt-ayush.jpg',
    w: 800, h: 600,
    prompt: 'Indian woman in peaceful yoga meditation pose surrounded by Ayurvedic herbs turmeric ginger ashwagandha, AYUSH ministry wellness, traditional Indian healing, serene golden light, photorealistic 4k',
  },

  // ── Health Risks Section ──────────────────────────────────────
  {
    file: 'health-risks.jpg',
    w: 800, h: 600,
    prompt: 'Medical illustration showing obese Indian person with highlighted body parts indicating health risks: heart disease diabetes joint pain hypertension, anatomical diagram style, clinical educational poster, photorealistic 4k',
  },

  // ── Page Heroes ───────────────────────────────────────────────
  {
    file: 'lifestyle-hero.jpg',
    w: 1920, h: 1080,
    prompt: 'Before and after lifestyle transformation: obese Indian woman jogging in park, healthy meal prep, drinking water, yoga session, collage of healthy lifestyle habits for weight loss, vibrant photorealistic 4k motivational imagery',
  },
  {
    file: 'medical-hero.jpg',
    w: 1920, h: 1080,
    prompt: 'Indian endocrinologist doctor explaining weight management treatment plan to obese Indian patient, GLP-1 Ozempic medication on desk, BMI chart on wall, warm modern clinic, compassionate medical consultation, photorealistic 4k',
  },
  {
    file: 'surgical-hero.jpg',
    w: 1920, h: 1080,
    prompt: 'Professional bariatric surgical team in Indian hospital operating theatre performing laparoscopic gastric bypass, advanced medical equipment, focused surgeons in scrubs, clean sterile environment, photorealistic 4k medical photography',
  },

  // ── Obesity Illustrations ─────────────────────────────────────
  {
    file: 'obesity-crisis.jpg',
    w: 1920, h: 1080,
    prompt: 'Powerful infographic illustration: silhouettes of Indian people of increasing body weight from thin to severely obese, Indian cityscape background, obesity epidemic data visualization, bold medical poster style, 4k detailed illustration',
  },
  {
    file: 'obesity-causes.jpg',
    w: 800, h: 800,
    prompt: 'Indian urban lifestyle causing obesity: person eating junk food watching TV on sofa, sedentary office work, fast food delivery, sugary drinks, stress eating, circular illustration medical diagram, vibrant 4k illustration',
  },
  {
    file: 'obesity-stats.jpg',
    w: 800, h: 800,
    prompt: 'India obesity statistics visualization: map of India with obesity heat map, NFHS data charts, 1 in 4 Indians overweight, bold infographic illustration style, teal green saffron colors, 4k detailed graphic',
  },
  {
    file: 'bmi-illustration.jpg',
    w: 800, h: 800,
    prompt: 'BMI body mass index scale illustration with Indian person silhouettes from underweight to obese, colour coded from green to red, medical educational chart, clean modern design, 4k detailed infographic illustration',
  },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadImage(item) {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(item.prompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=${item.w}&height=${item.h}&model=sana&nologo=true&seed=${Math.floor(Math.random()*9999)+1}&enhance=true`;
    const outPath = path.join(OUTPUT_DIR, item.file);

    console.log(`  → ${url.substring(0, 100)}...`);

    const req = https.get(url, { timeout: 90000 }, (res) => {
      if (res.statusCode !== 200) {
        console.log(`  ⚠️  HTTP ${res.statusCode} for ${item.file}`);
        res.resume();
        return resolve(false);
      }

      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        // Check it's actually an image (JPEG magic bytes)
        if (buf.length > 5000 && (buf[0] === 0xFF && buf[1] === 0xD8)) {
          fs.writeFileSync(outPath, buf);
          console.log(`  ✅  ${item.file} — ${(buf.length/1024).toFixed(0)}KB`);
          resolve(true);
        } else {
          console.log(`  ❌  ${item.file} — bad response (${buf.length}B): ${buf.toString().substring(0,80)}`);
          resolve(false);
        }
      });
    });

    req.on('timeout', () => { req.destroy(); console.log(`  ⏱️  Timeout: ${item.file}`); resolve(false); });
    req.on('error', (e) => { console.log(`  ❌  Error ${item.file}: ${e.message}`); resolve(false); });
  });
}

async function main() {
  console.log('🎨  Generating obesity-focused images via Pollinations SANA');
  console.log(`📁  Output: ${OUTPUT_DIR}`);
  console.log(`🖼️   ${IMAGES.length} images to generate\n`);

  const results = { ok: [], fail: [] };

  for (let i = 0; i < IMAGES.length; i++) {
    const item = IMAGES[i];
    console.log(`\n[${i+1}/${IMAGES.length}] ${item.file}`);
    const ok = await downloadImage(item);
    (ok ? results.ok : results.fail).push(item.file);
    // Respect rate limit — 1 at a time, small delay
    if (i < IMAGES.length - 1) await sleep(2500);
  }

  console.log('\n════════════════════════════════');
  console.log(`✅  Done: ${results.ok.length}/${IMAGES.length}`);
  if (results.fail.length) {
    console.log(`❌  Failed: ${results.fail.join(', ')}`);
    console.log('\nRetrying failed...');
    for (const file of results.fail) {
      const item = IMAGES.find(i => i.file === file);
      if (item) {
        await sleep(3000);
        const ok = await downloadImage(item);
        if (ok) results.ok.push(file);
      }
    }
  }
  console.log('\n🚀  All done! Images saved to frontend/public/images/');
}

main().catch(console.error);
