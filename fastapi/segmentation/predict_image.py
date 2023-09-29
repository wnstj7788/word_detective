import os
import shutil

from PIL import Image, ImageDraw
from ultralytics import YOLO

model = YOLO("best.pt")


def make_image(image_path, file_name):
    image = Image.open(image_path)
    mask = Image.new("L", (image.width, image.height), 0)
    draw = ImageDraw.Draw(mask)

    draw.polygon([tuple(coord) for coord in polygon], fill=255)

    rgba_image = image.convert("RGBA")

    new_image = Image.new("RGBA", (image.width, image.height))

    new_image.paste(rgba_image, mask=mask)

    save_file = f"result/{file_name}.png"
    new_image.save(save_file)


def segmentation(image_path: str):
    global masks, polygon
    result = model.predict(image_path)[0]
    result_cls = result.boxes.cls.tolist()
    masks = result.masks
    try:
        shutil.rmtree("result")
    except:
        pass
    for i, mask in enumerate(masks):
        mask.data[0].numpy()
        polygon = mask.xy[0]
        try:
            os.mkdir(f"result")
        except:
            pass
        try:
            os.mkdir(f"result/{result.names[result_cls[i]]}")
        except:
            pass
        file_name = f"{result.names[result_cls[i]]}/{i}"
        make_image(image_path, file_name)


segmentation(image_path="orange.JPG")
