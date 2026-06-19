from ultralytics import YOLO

def main():
    # Load a pretrained YOLOv8n (nano) model
    model = YOLO("yolov8n.pt")

    # Train the model
    # epochs=50 is a reasonable default. adjust as needed.
    # imgsz=640 is standard for YOLOv8.
    results = model.train(
        data="dataset.yaml",
        epochs=50,
        imgsz=640,
        device="cpu"  # Change to 0 if CUDA-capable GPU is available
    )
    print("Training finished!")

if __name__ == "__main__":
    main()
