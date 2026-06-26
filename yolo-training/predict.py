import os
import sys
import json
import warnings
import logging

# Suppress warnings and logger noise from PyTorch and Ultralytics
warnings.filterwarnings("ignore")
logging.getLogger("ultralytics").setLevel(logging.ERROR)

import torch
from ultralytics import YOLO

# Mappings from model class names to database foodIds and human labels
CLASS_MAPPINGS = {
    # Staples (Rice, Roti, Lal Bhat, Khichuri, Luchi)
    "rice": {"foodId": "rice", "label": "Plain Rice (Sada Bhat)"},
    "puffed-rice": {"foodId": "rice", "label": "Muri (Puffed Rice)"},
    "lal bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "lal-bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "khichuri": {"foodId": "khichuri", "label": "Bhuna Khichuri (Spiced Rice & Lentils)"},
    "biriyani": {"foodId": "biryani", "label": "Biryani (Rich Spiced Rice)"},
    "luchi": {"foodId": "luchi", "label": "Luchi (Deep-fried Puffed Bread)"},
    "puri": {"foodId": "luchi", "label": "Puri (Deep-fried Bread)"},
    "ruti": {"foodId": "roti", "label": "Atta Roti (Flatbread)"},
    "bread": {"foodId": "roti", "label": "Atta Roti (Flatbread)"},
    "noodles": {"foodId": "rice", "label": "Noodles"},

    # Proteins (Beef, Chicken, Dal, Haleem, Ilish, Rui Mach)
    "beef": {"foodId": "beef", "label": "Beef Bhuna (Spicy Beef)"},
    "chicken": {"foodId": "chicken", "label": "Chicken Curry (Murgir Jhol)"},
    "kabab": {"foodId": "beef", "label": "Kebab (Grilled Meat)"},
    "daal": {"foodId": "dal", "label": "Masoor Dal (Red Lentil Curry)"},
    "haleem": {"foodId": "haleem", "label": "Haleem (Spiced Lentil & Beef Stew)"},
    "fish": {"foodId": "rui_mach", "label": "Rui Macher Jhol (Rui Fish Curry)"},
    "rui fish": {"foodId": "rui_mach", "label": "Rui Macher Jhol (Rui Fish Curry)"},
    "egg": {"foodId": "egg", "label": "Dim (Egg Curry)"},
    "egg-boiled": {"foodId": "egg", "label": "Boiled Egg"},
    "egg-poached": {"foodId": "egg", "label": "Poached Egg"},

    # Vegetables & Bhortas (Begun Bhaja, Aloo Bhorta)
    "begun-vaji": {"foodId": "begun_bhaja", "label": "Begun Bhaja (Fried Eggplant)"},
    "beguni": {"foodId": "beguni", "label": "Beguni (Fried Eggplant in Batter)"},
    "aloo bhorta": {"foodId": "aloo_bhorta", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "vorta": {"foodId": "aloo_bhorta", "label": "Bhorta (Mashed Seasoned Side)"},
    "potato-mashed": {"foodId": "aloo_bhorta", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "potato": {"foodId": "aloo_bhorta", "label": "Potato (Alu)"},
    "chop-alu": {"foodId": "alur_chop", "label": "Alur Chop (Potato Snack)"},
    "lal-shak": {"foodId": "lal_shak", "label": "Lal Shak (Red Spinach)"},
    "shak": {"foodId": "lal_shak", "label": "Shak (Spinach/Greens)"},
    "vaji": {"foodId": "begun_bhaja", "label": "Vaji (Stir-fried Vegetables)"},
    "vegetable": {"foodId": "salad", "label": "Mixed Vegetables"},
    "cabbage": {"foodId": "begun_bhaja", "label": "Cabbage Vaji"},
    "carrot": {"foodId": "carrot", "label": "Carrot (Gajor)"},
    "cauliflower": {"foodId": "begun_bhaja", "label": "Cauliflower (Fulkopi)"},
    "chichinga-vaji": {"foodId": "begun_bhaja", "label": "Chichinga Vaji (Snake Gourd)"},
    "dundol": {"foodId": "begun_bhaja", "label": "Dundol (Sponge Gourd)"},
    "kochu": {"foodId": "begun_bhaja", "label": "Kochu (Taro Root)"},
    "korola-vaji": {"foodId": "begun_bhaja", "label": "Korola Vaji (Bitter Gourd)"},
    "kumra-vaji": {"foodId": "begun_bhaja", "label": "Kumra Vaji (Sweet Pumpkin)"},
    "lau": {"foodId": "begun_bhaja", "label": "Lau (Bottle Gourd)"},
    "okra": {"foodId": "begun_bhaja", "label": "Dharosh (Okra)"},
    "potol": {"foodId": "begun_bhaja", "label": "Potol (Pointed Gourd)"},
    "shim": {"foodId": "begun_bhaja", "label": "Shim (Flat Beans)"},
    "tomato": {"foodId": "tomato", "label": "Tomato"},
    "cucumber": {"foodId": "cucumber", "label": "Shosha (Cucumber)"},
    "salad": {"foodId": "salad", "label": "Salad (Cucumber & Onion)"},
    "green-pea": {"foodId": "begun_bhaja", "label": "Green Peas"},

    # Snacks & Sweets (Singara, Roshogolla, Fuchka)
    "singara": {"foodId": "singara", "label": "Singara (Potato Pastry)"},
    "fuchka": {"foodId": "fuchka", "label": "Fuchka (Spiced Chickpea Street Snack)"},
    "chola": {"foodId": "chola", "label": "Chola Boot (Chickpeas)"},
    "peyaju": {"foodId": "peyaju", "label": "Peyaju (Onion Lentil Fritter)"},
    "piyaju": {"foodId": "peyaju", "label": "Peyaju (Onion Lentil Fritter)"},
    "roll": {"foodId": "singara", "label": "Spring Roll"},
    "roshogolla": {"foodId": "roshogolla", "label": "Roshogolla (Sweet Syrup Ball)"},
    "sweets": {"foodId": "roshogolla", "label": "Mishti (Sweets)"},
    "jilapi": {"foodId": "roshogolla", "label": "Jilapi (Sweet Jalebi)"},
    "chomchom": {"foodId": "roshogolla", "label": "Chomchom (Sweet Cham Cham)"},
    "payesh": {"foodId": "roshogolla", "label": "Payesh (Rice Pudding)"},
    "burinda": {"foodId": "roshogolla", "label": "Boondi Sweet"},

    # Fruits (mapped to low calorie/healthy vegetable/side database entries)
    "apple": {"foodId": "begun_bhaja", "label": "Apple"},
    "banana": {"foodId": "begun_bhaja", "label": "Banana (Kola)"},
    "grapes": {"foodId": "begun_bhaja", "label": "Grapes (Angur)"},
    "guava": {"foodId": "begun_bhaja", "label": "Guava (Peyara)"},
    "mango": {"foodId": "begun_bhaja", "label": "Mango (Aam)"},
    "orange": {"foodId": "begun_bhaja", "label": "Orange (Komola)"},
    "papaya": {"foodId": "begun_bhaja", "label": "Papaya (Pepe)"},
    "pineapple": {"foodId": "begun_bhaja", "label": "Pineapple (Anarosh)"},
    "watermelon": {"foodId": "watermelon", "label": "Watermelon (Tormuj)"},
    "badam": {"foodId": "dal", "label": "Badam (Nuts)"},
    "dates": {"foodId": "roshogolla", "label": "Khejur (Dates)"},

    # Drinks & Condiments
    "cha": {"foodId": "roshogolla", "label": "Cha (Sweet Milk Tea)"},
    "milk": {"foodId": "dal", "label": "Milk"},
    "juice": {"foodId": "juice", "label": "Fruit Juice"},
    "achar": {"foodId": "begun_bhaja", "label": "Achar (Pickle)"},
    "lemon": {"foodId": "begun_bhaja", "label": "Lemon (Lebo)"},
}

def predict(image_path):
    # Determine which model weights to load:
    # 1. Custom trained model if it exists
    # 2. Pretrained model as fallback
    script_dir = os.path.dirname(os.path.abspath(__file__))
    custom_model_path = os.path.join(script_dir, "runs", "detect", "train", "weights", "best.pt")
    
    if os.path.exists(custom_model_path):
        model_path = custom_model_path
    else:
        model_path = "yolov8n.pt" # Download automatically if needed

    # Load YOLO model
    model = YOLO(model_path)
    
    # Run prediction
    results = model(image_path, verbose=False)
    
    detections = []
    
    for result in results:
        boxes = result.boxes
        orig_shape = result.orig_shape # (height, width)
        img_h, img_w = orig_shape
        
        for box in boxes:
            cls_id = int(box.cls[0])
            name = model.names[cls_id].lower()
            conf = float(box.conf[0]) * 100 # percentage 0-100
            
            # Map name to app dataset
            mapped = CLASS_MAPPINGS.get(name, {"foodId": "rice", "label": name.capitalize()})
            
            # YOLO xyxy coordinates
            xyxy = box.xyxy[0].tolist()
            x1, y1, x2, y2 = xyxy
            
            # Convert to relative percentage dimensions for the CSS overlay
            left = (x1 / img_w) * 100
            top = (y1 / img_h) * 100
            width = ((x2 - x1) / img_w) * 100
            height = ((y2 - y1) / img_h) * 100
            
            detections.append({
                "foodId": mapped["foodId"],
                "label": mapped["label"],
                "confidence": round(conf, 1),
                "top": round(top, 1),
                "left": round(left, 1),
                "width": round(width, 1),
                "height": round(height, 1)
            })
            
    # Output detections as JSON to stdout
    print(json.dumps(detections))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    predict(image_path)
