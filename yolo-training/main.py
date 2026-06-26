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
    "puffed-rice": {"foodId": "puffed_rice", "label": "Muri (Puffed Rice)"},
    "lal bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "lal-bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "khichuri": {"foodId": "khichuri", "label": "Bhuna Khichuri (Spiced Rice & Lentils)"},
    "biriyani": {"foodId": "biriyani", "label": "Biryani (Rich Spiced Rice)"},
    "luchi": {"foodId": "luchi", "label": "Luchi (Deep-fried Puffed Bread)"},
    "puri": {"foodId": "puri", "label": "Puri (Deep-fried Bread)"},
    "ruti": {"foodId": "ruti", "label": "Atta Roti (Flatbread)"},
    "bread": {"foodId": "bread", "label": "Atta Roti (Flatbread)"},
    "noodles": {"foodId": "noodles", "label": "Noodles"},

    # Proteins (Beef, Chicken, Dal, Haleem, Ilish, Rui Mach)
    "beef": {"foodId": "beef", "label": "Beef Bhuna (Spicy Beef)"},
    "chicken": {"foodId": "chicken", "label": "Chicken Curry (Murgir Jhol)"},
    "kabab": {"foodId": "kabab", "label": "Kebab (Grilled Meat)"},
    "daal": {"foodId": "daal", "label": "Masoor Dal (Red Lentil Curry)"},
    "haleem": {"foodId": "haleem", "label": "Haleem (Spiced Lentil & Beef Stew)"},
    "fish": {"foodId": "fish", "label": "Rui Macher Jhol (Rui Fish Curry)"},
    "rui fish": {"foodId": "rui_mach", "label": "Rui Macher Jhol (Rui Fish Curry)"},
    "egg": {"foodId": "egg", "label": "Dim (Egg Curry)"},
    "egg-boiled": {"foodId": "egg_boiled", "label": "Boiled Egg"},
    "egg-poached": {"foodId": "egg_poached", "label": "Poached Egg"},

    # Vegetables & Bhortas (Begun Bhaja, Aloo Bhorta)
    "begun-vaji": {"foodId": "begun_vaji", "label": "Begun Bhaja (Fried Eggplant)"},
    "beguni": {"foodId": "beguni", "label": "Beguni (Fried Eggplant in Batter)"},
    "aloo bhorta": {"foodId": "aloo_bhorta", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "vorta": {"foodId": "vorta", "label": "Bhorta (Mashed Seasoned Side)"},
    "potato-mashed": {"foodId": "potato_mashed", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "potato": {"foodId": "potato", "label": "Potato (Alu)"},
    "chop-alu": {"foodId": "chop_alu", "label": "Alur Chop (Potato Snack)"},
    "lal-shak": {"foodId": "lal_shak", "label": "Lal Shak (Red Spinach)"},
    "shak": {"foodId": "shak", "label": "Shak (Spinach/Greens)"},
    "vaji": {"foodId": "vaji", "label": "Vaji (Stir-fried Vegetables)"},
    "vegetable": {"foodId": "vegetable", "label": "Mixed Vegetables"},
    "cabbage": {"foodId": "cabbage", "label": "Cabbage Vaji"},
    "carrot": {"foodId": "carrot", "label": "Carrot (Gajor)"},
    "cauliflower": {"foodId": "cauliflower", "label": "Cauliflower (Fulkopi)"},
    "chichinga-vaji": {"foodId": "chichinga_vaji", "label": "Chichinga Vaji (Snake Gourd)"},
    "dundol": {"foodId": "dundol", "label": "Dundol (Sponge Gourd)"},
    "kochu": {"foodId": "kochu", "label": "Kochu (Taro Root)"},
    "korola-vaji": {"foodId": "korola_vaji", "label": "Korola Vaji (Bitter Gourd)"},
    "kumra-vaji": {"foodId": "kumra_vaji", "label": "Kumra Vaji (Sweet Pumpkin)"},
    "lau": {"foodId": "lau", "label": "Lau (Bottle Gourd)"},
    "okra": {"foodId": "okra", "label": "Dharosh (Okra)"},
    "potol": {"foodId": "potol", "label": "Potol (Pointed Gourd)"},
    "shim": {"foodId": "shim", "label": "Shim (Flat Beans)"},
    "tomato": {"foodId": "tomato", "label": "Tomato"},
    "cucumber": {"foodId": "cucumber", "label": "Shosha (Cucumber)"},
    "salad": {"foodId": "salad", "label": "Salad (Cucumber & Onion)"},
    "green-pea": {"foodId": "green_pea", "label": "Green Peas"},

    # Snacks & Sweets (Singara, Roshogolla, Fuchka)
    "singara": {"foodId": "singara", "label": "Singara (Potato Pastry)"},
    "fuchka": {"foodId": "fuchka", "label": "Fuchka (Spiced Chickpea Street Snack)"},
    "chola": {"foodId": "chola", "label": "Chola Boot (Chickpeas)"},
    "peyaju": {"foodId": "peyaju", "label": "Peyaju (Onion Lentil Fritter)"},
    "piyaju": {"foodId": "piyaju", "label": "Peyaju (Onion Lentil Fritter)"},
    "roll": {"foodId": "roll", "label": "Spring Roll"},
    "roshogolla": {"foodId": "roshogolla", "label": "Roshogolla (Sweet Syrup Ball)"},
    "sweets": {"foodId": "sweets", "label": "Mishti (Sweets)"},
    "jilapi": {"foodId": "jilapi", "label": "Jilapi (Sweet Jalebi)"},
    "chomchom": {"foodId": "chomchom", "label": "Chomchom (Sweet Cham Cham)"},
    "payesh": {"foodId": "payesh", "label": "Payesh (Rice Pudding)"},
    "burinda": {"foodId": "burinda", "label": "Boondi Sweet"},

    # Fruits (mapped to low calorie/healthy vegetable/side database entries)
    "apple": {"foodId": "apple", "label": "Apple"},
    "banana": {"foodId": "banana", "label": "Banana (Kola)"},
    "grapes": {"foodId": "grapes", "label": "Grapes (Angur)"},
    "guava": {"foodId": "guava", "label": "Guava (Peyara)"},
    "mango": {"foodId": "mango", "label": "Mango (Aam)"},
    "orange": {"foodId": "orange", "label": "Orange (Komola)"},
    "papaya": {"foodId": "papaya", "label": "Papaya (Pepe)"},
    "pineapple": {"foodId": "pineapple", "label": "Pineapple (Anarosh)"},
    "watermelon": {"foodId": "watermelon", "label": "Watermelon (Tormuj)"},
    "badam": {"foodId": "badam", "label": "Badam (Nuts)"},
    "dates": {"foodId": "dates", "label": "Khejur (Dates)"},

    # Drinks & Condiments
    "cha": {"foodId": "cha", "label": "Cha (Sweet Milk Tea)"},
    "milk": {"foodId": "milk", "label": "Milk"},
    "juice": {"foodId": "juice", "label": "Fruit Juice"},
    "achar": {"foodId": "achar", "label": "Achar (Pickle)"},
    "lemon": {"foodId": "lemon", "label": "Lemon (Lebo)"},
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
