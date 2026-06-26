const fs = require('fs');

const mainPy = fs.readFileSync('yolo-training/main.py', 'utf8');
const foodDbRaw = fs.readFileSync('src/lib/food-db.ts', 'utf8');

// Get all foodIds and labels from main.py
const pattern = /"([^"]+)": \{"foodId": "([^"]+)", "label": "([^"]+)"\}/g;
let match;
const missing = {};

// We need a way to parse the existing DB to know what's there
const existingIds = new Set([...foodDbRaw.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]));

while ((match = pattern.exec(mainPy)) !== null) {
  const foodId = match[2];
  const label = match[3];
  
  if (!existingIds.has(foodId) && !missing[foodId]) {
    missing[foodId] = label;
  }
}

console.log("Missing IDs:", Object.keys(missing).length);

if (Object.keys(missing).length > 0) {
  let newEntries = '';
  for (const [id, label] of Object.entries(missing)) {
    // Generate a basic entry
    const isFruit = ['apple', 'banana', 'grapes', 'guava', 'mango', 'orange', 'papaya', 'pineapple', 'watermelon'].includes(id);
    const isSweet = ['roshogolla', 'sweets', 'jilapi', 'chomchom', 'payesh', 'burinda'].includes(id);
    const category = isFruit ? 'snack' : (isSweet ? 'sweet' : 'vegetable');
    const cal = isFruit ? 60 : 40;
    
    newEntries += `  ${id}: {
    id: "${id}",
    name: "${label}",
    banglaName: "${label}",
    calories: ${cal},
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "${category}",
    description: "${label} detected by AI."
  },
`;
  }

  // Insert into src/lib/food-db.ts right before the last closing brace
  const lastBraceIdx = foodDbRaw.lastIndexOf('}');
  const updatedDb = foodDbRaw.slice(0, lastBraceIdx) + newEntries + foodDbRaw.slice(lastBraceIdx);
  
  fs.writeFileSync('src/lib/food-db.ts', updatedDb);
  console.log("Added missing entries to food-db.ts");
}
