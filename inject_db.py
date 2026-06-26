import re
import json

# Read main.py mapping
with open('yolo-training/main.py', 'r') as f:
    main_py = f.read()

# Find all mappings
pattern = r'"([^"]+)": \{"foodId": "([^"]+)", "label": "([^"]+)"\}'
matches = re.findall(pattern, main_py)

# Read food-db.ts
with open('src/lib/food-db.ts', 'r', encoding='utf-8') as f:
    food_db = f.read()

# Find existing IDs
existing_ids = re.findall(r'id:\s*"([^"]+)"', food_db)

new_entries = ""
missing_count = 0

for key, foodId, label in matches:
    if foodId not in existing_ids:
        # Prevent duplicates
        existing_ids.append(foodId)
        missing_count += 1
        
        is_fruit = key in ['apple', 'banana', 'grapes', 'guava', 'mango', 'orange', 'papaya', 'pineapple', 'watermelon']
        is_sweet = key in ['roshogolla', 'sweets', 'jilapi', 'chomchom', 'payesh', 'burinda', 'cha']
        category = 'snack' if is_fruit else ('sweet' if is_sweet else 'vegetable')
        cal = 60 if is_fruit else 40
        
        new_entries += f"""  {foodId}: {{
    id: "{foodId}",
    name: "{label}",
    banglaName: "{label}",
    calories: {cal},
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "{category}",
    description: "{label} detected by AI."
  }},
"""

if missing_count > 0:
    # Inject before the end of BANGLADESHI_FOOD_DB
    # We look for "export const BANGLADESHI_FOOD_DB" and the matching closing brace
    # Actually, we can just find the end of the last item.
    # A safe way is to find "export const PROFILE_RECOMMENDATIONS" and insert right before the closing brace above it
    insert_pos = food_db.find("export const PROFILE_RECOMMENDATIONS")
    
    # find the brace before insert_pos
    brace_pos = food_db.rfind("};", 0, insert_pos)
    
    updated_db = food_db[:brace_pos] + new_entries + food_db[brace_pos:]
    
    with open('src/lib/food-db.ts', 'w', encoding='utf-8') as f:
        f.write(updated_db)
    print(f"Added {missing_count} missing entries to food-db.ts")
else:
    print("No missing entries found.")
