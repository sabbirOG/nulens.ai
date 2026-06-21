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
    # Custom training dataset classes (dataset.yaml)
    "khichuri": {"foodId": "khichuri", "label": "Bhuna Khichuri (Spiced Rice & Lentils)"},
    "luchi": {"foodId": "luchi", "label": "Luchi (Deep-fried Puffed Bread)"},
    "haleem": {"foodId": "haleem", "label": "Haleem (Spiced Lentil & Beef Stew)"},
    "fuchka": {"foodId": "fuchka", "label": "Fuchka (Spiced Chickpea Street Snack)"},
    "aloo bhorta": {"foodId": "aloo_bhorta", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "lal bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "rui fish": {"foodId": "rui_mach", "label": "Rui Macher Jhol (Rui Fish Curry)"},
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
