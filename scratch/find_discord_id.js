const fs = require('fs');
const path = require('path');

const candidates = [
  'D:\\projects\\Hayato_Bot',
  'D:\\projects\\discord-selfbot-panel',
  'D:\\projects\\music-bot',
  'D:\\projects\\OTP_Bot',
  'D:\\projects\\VoiceClaw'
];

candidates.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  try {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      if (f.endsWith('.env') || f.endsWith('.json') || f.endsWith('.js')) {
        const str = fs.readFileSync(path.join(dir, f), 'utf8');
        const matches = str.match(/\b\d{17,20}\b/g);
        if (matches) {
          console.log(dir, f, matches.slice(0, 5));
        }
      }
    });
  } catch (e) {}
});

