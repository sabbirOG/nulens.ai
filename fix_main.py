import re

with open("yolo-training/main.py", "r") as f:
    content = f.read()

# Replace any generic foodId with the actual key name
def repl(match):
    key = match.group(1)
    label = match.group(2)
    # We want "foodId": key, unless the key has hyphens, then replace with underscore
    food_id = key.replace('-', '_').replace(' ', '_')
    # Special cases we want to keep
    if key in ["rice", "beef", "chicken", "dal", "egg", "roti", "lal bhat", "lal-bhat", "rui fish"]:
        return match.group(0) # don't change
    return f'"{key}": {{"foodId": "{food_id}", "label": "{label}"}}'

# Pattern: "banana": {"foodId": "begun_bhaja", "label": "Banana (Kola)"}
pattern = r'"([^"]+)": \{"foodId": "[^"]+", "label": "([^"]+)"\}'
new_content = re.sub(pattern, repl, content)

with open("yolo-training/main.py", "w") as f:
    f.write(new_content)

print("Updated main.py")
