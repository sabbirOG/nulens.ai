import os
import json
from pathlib import Path
import logging

# Set up logging for data cleaning warnings
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

# =====================================================================
# CONFIGURATION
# =====================================================================
# TODO: Update these paths to point to your raw FoodBD dataset
SOURCE_IMAGES_DIR = "path/to/your/raw/images"
SOURCE_ANNOTATIONS_FILE = "path/to/your/annotations.json"  # Example: JSON format

# Output directory for YOLO labels
# This maps to the existing yolo-training structure
OUTPUT_LABELS_DIR = "yolo-training/dataset/labels/train" 

# =====================================================================
# CLASS MAPPING
# =====================================================================
# Map your FoodBD string labels to YOLO integer class IDs (0-indexed)
CLASS_MAPPING = {
    "Biryani": 0,
    "Dal": 1,
    "Bhorta": 2,
    "Fish_Curry": 3,
    "Fuchka": 4,
    # Add all other FoodBD classes here...
}

def convert_bbox_to_yolo(img_width, img_height, bbox):
    """
    Convert bounding box to YOLO format.
    Assumes input bbox is [x_min, y_min, width, height] (COCO format)
    Returns [x_center, y_center, width_norm, height_norm]
    """
    x_min, y_min, w, h = bbox
    
    # Calculate center coordinates
    x_center = x_min + (w / 2.0)
    y_center = y_min + (h / 2.0)
    
    # Normalize by image dimensions (YOLO requires values between 0 and 1)
    x_center /= img_width
    y_center /= img_height
    w_norm = w / img_width
    h_norm = h / img_height
    
    return [x_center, y_center, w_norm, h_norm]

def process_annotations():
    # Ensure output directory exists
    os.makedirs(OUTPUT_LABELS_DIR, exist_ok=True)
    
    # Check if annotations file exists
    if not os.path.exists(SOURCE_ANNOTATIONS_FILE):
        logging.error(f"Annotations file not found: {SOURCE_ANNOTATIONS_FILE}")
        logging.info("Please update the SOURCE_ANNOTATIONS_FILE path in the configuration section.")
        return

    try:
        # Load annotations (Assuming COCO-style JSON for this example)
        # Structure: {"images": [...], "annotations": [...], "categories": [...]}
        with open(SOURCE_ANNOTATIONS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        # Create a mapping of image_id to filename and dimensions for quick lookup
        image_info_map = {}
        if "images" in data:
            for img in data["images"]:
                image_info_map[img["id"]] = {
                    "filename": img["file_name"],
                    "width": img["width"],
                    "height": img["height"]
                }
        else:
            # If it's a simpler JSON format where keys are filenames
            # You might need to adjust this depending on your exact JSON structure
            pass
            
        processed_count = 0
        skipped_count = 0
        
        # Group annotations by image
        annotations_by_image = {}
        for ann in data.get("annotations", []):
            img_id = ann["image_id"]
            if img_id not in annotations_by_image:
                annotations_by_image[img_id] = []
            annotations_by_image[img_id].append(ann)
            
        # Process each image's annotations
        for img_id, anns in annotations_by_image.items():
            img_info = image_info_map.get(img_id)
            if not img_info:
                continue
                
            filename = img_info["filename"]
            img_width = img_info["width"]
            img_height = img_info["height"]
            
            # --- DATA CLEANING: Check if source image actually exists ---
            source_img_path = os.path.join(SOURCE_IMAGES_DIR, filename)
            if not os.path.exists(source_img_path):
                logging.warning(f"Image missing, skipping annotations: {filename}")
                skipped_count += 1
                continue
                
            # Create corresponding .txt filename
            txt_filename = Path(filename).stem + ".txt"
            txt_filepath = os.path.join(OUTPUT_LABELS_DIR, txt_filename)
            
            # Write YOLO format lines to the text file
            with open(txt_filepath, 'w', encoding='utf-8') as txt_file:
                for ann in anns:
                    # Map the category ID to the string label, then to our YOLO ID
                    # (This depends on how your JSON links annotations to category names)
                    # For this example, let's assume 'category_name' is provided, 
                    # or you have a way to look it up.
                    category_name = ann.get("category_name", "Unknown") # Adjust based on your JSON
                    
                    if category_name not in CLASS_MAPPING:
                        logging.warning(f"Class '{category_name}' not in CLASS_MAPPING. Skipping bounding box in {filename}")
                        continue
                        
                    yolo_class_id = CLASS_MAPPING[category_name]
                    
                    # Get bbox and convert
                    bbox = ann["bbox"] # Assumes [x, y, width, height]
                    yolo_bbox = convert_bbox_to_yolo(img_width, img_height, bbox)
                    
                    # Format: <class_id> <x_center> <y_center> <width> <height>
                    line = f"{yolo_class_id} {yolo_bbox[0]:.6f} {yolo_bbox[1]:.6f} {yolo_bbox[2]:.6f} {yolo_bbox[3]:.6f}\n"
                    txt_file.write(line)
            
            processed_count += 1
            
        logging.info(f"Conversion complete!")
        logging.info(f"Successfully processed: {processed_count} images")
        logging.info(f"Skipped (missing images): {skipped_count} images")
        logging.info(f"Labels saved to: {OUTPUT_LABELS_DIR}")

    except Exception as e:
        logging.error(f"An error occurred during conversion: {str(e)}")

if __name__ == "__main__":
    process_annotations()
