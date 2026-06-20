import os
import torch
from ultralytics import YOLO

def main():
    # Resolve absolute path of dataset.yaml relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_yaml_path = os.path.join(script_dir, "dataset.yaml")

    # Load a pretrained YOLOv8n (nano) model
    # It will be downloaded to the current working directory if not present
    model = YOLO("yolov8n.pt")

    # Check for GPU (CUDA) availability
    device = 0 if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device} (CUDA available: {torch.cuda.is_available()})")

    # Train the model
    # On Windows, workers=0 or workers=2 is recommended to prevent multiprocessing issues
    results = model.train(
        data=data_yaml_path,
        epochs=50,
        imgsz=640,
        device=device,
        workers=0 if os.name == 'nt' else 4, # Use 0 workers on Windows to prevent multiprocessing errors
        plots=True
    )
    print("Training finished successfully!")

if __name__ == "__main__":
    main()
