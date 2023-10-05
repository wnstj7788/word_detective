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


dictionary = {
    "apple": "사과",
    "banana": "바나나",
    "cherry": "체리",
    "grape": "포도",
    "melon": "멜론",
    "orange": "오렌지",
    "peach": "복숭아",
    "strawberry": "딸기",
    "tomato": "토마토",
    "watermelon": "수박",
    "cat": "고양이",
    "elephant": "코끼리",
    "lion": "사자",
    "Octopus": "문어",
    "panda": "판다",
    "rabbit": "토끼",
    "Turtle": "거북이",
    "dog": "강아지",
    "bird": "새",
    "frog": "개구리",
    "glasses": "안경",
    "laptop": "노트북",
    "pen": "연필",
    "scissors": "가위",
    "shoes": "신발",
    "toothbrush": "칫솔",
    "cup": "컵",
    "chair": "의자",
    "eraser": "지우개",
    "desk": "책상",
}


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
            os.mkdir(
                f"segmentation/result/{user_id}/{dictionary[result.names[result_cls[i]]]}"
            )
        except:
            pass
        try:
            file_name = f"{user_id}/{dictionary[result.names[result_cls[i]]]}/{i}"
            file_paths[dictionary[result.names[result_cls[i]]]].append(file_name)
        except:
            pass

        make_image(image_path, file_name)
    return file_paths
