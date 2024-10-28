import Progress from "./Progress.js";
import https from 'node:https';
import fs from 'node:fs';

const downloadUrl = 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip'

const bar = new Progress({ cursorHide: true });
let val = 0;

https.get(downloadUrl, response => {
  const file = fs.createWriteStream('./chromium.zip');

  response.pipe(file);

  const len = parseInt(response['headers']["content-length"] ?? '0', 10);
  
  bar.start(len, 0);

  response.on('data', (chunk) => {
    val = val + chunk.length;

    bar.update(val)

    if (val >= len) {
      bar.stop();
    }

  })
})

