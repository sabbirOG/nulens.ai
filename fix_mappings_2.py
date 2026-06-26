import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix snacks mapping
    content = content.replace('"foodId": "singara", "label": "Peyaju', '"foodId": "peyaju", "label": "Peyaju')
    content = content.replace('"foodId": "singara", "label": "Alur Chop', '"foodId": "alur_chop", "label": "Alur Chop')
    content = content.replace('"foodId": "begun_bhaja", "label": "Beguni', '"foodId": "beguni", "label": "Beguni')
    content = content.replace('"foodId": "fuchka", "label": "Chola Boot', '"foodId": "chola", "label": "Chola Boot')
    
    # Fix drinks and fruits mapping
    content = content.replace('"foodId": "roshogolla", "label": "Fruit Juice', '"foodId": "juice", "label": "Fruit Juice')
    content = content.replace('"foodId": "begun_bhaja", "label": "Watermelon', '"foodId": "watermelon", "label": "Watermelon')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('yolo-training/predict.py')
fix_file('yolo-training/main.py')
print('Fixed mappings correctly 2.')
