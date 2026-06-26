import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix egg
    content = content.replace('"foodId": "chicken", "label": "Dim', '"foodId": "egg", "label": "Dim')
    content = content.replace('"foodId": "chicken", "label": "Boiled Egg"', '"foodId": "egg", "label": "Boiled Egg"')
    content = content.replace('"foodId": "chicken", "label": "Poached Egg"', '"foodId": "egg", "label": "Poached Egg"')
    
    # Fix vegetables
    content = content.replace('"foodId": "begun_bhaja", "label": "Mixed Vegetables"', '"foodId": "salad", "label": "Mixed Vegetables"')
    content = content.replace('"foodId": "begun_bhaja", "label": "Shosha (Cucumber)"', '"foodId": "salad", "label": "Shosha (Cucumber)"')
    content = content.replace('"foodId": "begun_bhaja", "label": "Salad (Cucumber & Onion)"', '"foodId": "salad", "label": "Salad (Cucumber & Onion)"')
    content = content.replace('"foodId": "begun_bhaja", "label": "Tomato"', '"foodId": "salad", "label": "Tomato"')
    content = content.replace('"foodId": "begun_bhaja", "label": "Carrot (Gajor)"', '"foodId": "salad", "label": "Carrot (Gajor)"')
    
    # Fix shak
    content = content.replace('"foodId": "begun_bhaja", "label": "Lal Shak', '"foodId": "lal_shak", "label": "Lal Shak')
    content = content.replace('"foodId": "begun_bhaja", "label": "Shak', '"foodId": "lal_shak", "label": "Shak')
    
    # Fix Biryani
    content = content.replace('"foodId": "khichuri", "label": "Biryani', '"foodId": "biryani", "label": "Biryani')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('yolo-training/predict.py')
fix_file('yolo-training/main.py')
print('Fixed mappings correctly.')
