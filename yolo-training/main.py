from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import io
import os
import re
from PIL import Image
from ultralytics import YOLO

app = FastAPI(title="NuLens.ai YOLOv8 Inference Server")

# Enable CORS for easy cross-origin queries if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model weights on startup
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "runs", "detect", "train", "weights", "best.pt")

if not os.path.exists(model_path):
    # Fallback to local default path if running from parent dir
    model_path = os.path.join(script_dir, "best.pt")
    if not os.path.exists(model_path):
        model_path = "yolov8n.pt"

print(f"Loading YOLOv8 model from: {model_path}")
model = YOLO(model_path)

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
    "carrot": {"foodId": "salad", "label": "Carrot (Gajor)"},
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
    "tomato": {"foodId": "salad", "label": "Tomato"},
    "cucumber": {"foodId": "salad", "label": "Shosha (Cucumber)"},
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

class ImagePayload(BaseModel):
    image: str  # Base64 data string (can include data URI header)

@app.get("/")
def read_root():
    return {"status": "running", "model": model_path}

@app.post("/predict")
def predict_image(payload: ImagePayload):
    try:
        # Strip data URI header if present
        base64_data = payload.image
        if "," in base64_data:
            base64_data = base64_data.split(",")[1]
            
        image_bytes = base64.b64decode(base64_data)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Run prediction
        results = model(image, verbose=False)
        
        detections = []
        for result in results:
            boxes = result.boxes
            img_w, img_h = image.size
            
            for box in boxes:
                cls_id = int(box.cls[0])
                name = model.names[cls_id].lower()
                conf = float(box.conf[0]) * 100
                
                mapped = CLASS_MAPPINGS.get(name, {"foodId": "rice", "label": name.capitalize()})
                
                xyxy = box.xyxy[0].tolist()
                x1, y1, x2, y2 = xyxy
                
                # Convert to relative percentages for UI mapping
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
                
        return {"detections": detections}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Bind to port 8000 by default
    uvicorn.run(app, host="0.0.0.0", port=8000)
