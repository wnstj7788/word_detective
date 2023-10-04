import os
import shutil
from collections import defaultdict

from PIL import Image, ImageDraw
from ultralytics import YOLO

model = YOLO("segmentation/best.pt")


def make_image(image_path, file_name):
    image = Image.open(image_path)
    mask = Image.new("L", (image.width, image.height), 0)
    draw = ImageDraw.Draw(mask)

    draw.polygon([tuple(coord) for coord in polygon], fill=255)

    rgba_image = image.convert("RGBA")

    new_image = Image.new("RGBA", (image.width, image.height))

    new_image.paste(rgba_image, mask=mask)

    save_file = f"segmentation/result/{file_name}.png"
    new_image.save(save_file)


def segmentation(image_path: str, user_id: int):
    global masks, polygon
    result = model.predict(image_path, conf=0.85)[0]
    result_cls = result.boxes.cls.tolist()
    masks = result.masks
    file_paths = defaultdict(list)
    try:
        shutil.rmtree(f"segmentation/result/{user_id}")
    except:
        pass
    for i, mask in enumerate(masks):
        mask.data[0].numpy()
        polygon = mask.xy[0]
        try:
            os.mkdir(f"segmentation/result/{user_id}")
        except:
            pass
        try:
            os.mkdir(f"segmentation/result/{user_id}/{result.names[result_cls[i]]}")
        except:
            pass
        file_name = f"{user_id}/{result.names[result_cls[i]]}/{i}"
        file_paths[result.names[result_cls[i]]].append(file_name)

        make_image(image_path, file_name)
    return file_paths
