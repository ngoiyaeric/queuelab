const fs = require('fs');
const path = 'src/components/features.tsx';
let code = fs.readFileSync(path, 'utf8');

// We need to swap the images for EVA and FIX .
// EVA currently has evaScreenshot, FIX has fixScreenshot.

code = code.replace(/title: "EVA",\s+isNew: false,\s+backgroundPositionX: 50,\s+backgroundPositionY: 50,\s+backgroundSizeX: 100,\s+image: evaScreenshot,/, `title: "EVA",
    isNew: false,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: fixScreenshot,`);

code = code.replace(/title: "FIX \.",\s+isNew: true,\s+backgroundPositionX: 50,\s+backgroundPositionY: 50,\s+backgroundSizeX: 100,\s+image: fixScreenshot,/, `title: "FIX .",
    isNew: true,
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundSizeX: 100,
    image: evaScreenshot,`);

fs.writeFileSync(path, code);
