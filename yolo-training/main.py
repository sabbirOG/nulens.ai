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
    "khichuri": {"foodId": "khichuri", "label": "Bhuna Khichuri (Spiced Rice & Lentils)"},
    "luchi": {"foodId": "luchi", "label": "Luchi (Deep-fried Puffed Bread)"},
    "haleem": {"foodId": "haleem", "label": "Haleem (Spiced Lentil & Beef Stew)"},
    "fuchka": {"foodId": "fuchka", "label": "Fuchka (Spiced Chickpea Street Snack)"},
    "aloo bhorta": {"foodId": "aloo_bhorta", "label": "Aloo Bhorta (Mashed Potatoes)"},
    "lal bhat": {"foodId": "lal_bhat", "label": "Lal Bhat (Red Rice)"},
    "rui fish": {"foodId": "rui_mach", "label": "Rui Macher Jhol (Rui Fish Curry)"},
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
