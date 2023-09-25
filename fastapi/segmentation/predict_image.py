from PIL import Image, ImageDraw
from ultralytics import YOLO

model = YOLO('best.pt')
image_path = 'orange.jpg'


def make_image(image_path, file_name):
    image = Image.open(image_path)
    mask = Image.new('L', (image.width, image.height), 0)
    draw = ImageDraw.Draw(mask)

    draw.polygon([tuple(coord) for coord in polygon], fill=255)

    rgba_image = image.convert('RGBA')

    new_image = Image.new('RGBA', (image.width, image.height))

    new_image.paste(rgba_image, mask=mask)

    save_file = f'result_{file_name}.png'
    new_image.save(save_file)


result = model.predict(image_path)[0]

for r in result:
    print(r.tojson())

masks = result.masks
print(masks)

for i, mask in enumerate(masks):
    m = mask.data[0].numpy()
    polygon = mask.xy[0]
    file_name = f'{i}'
    make_image(image_path, file_name)
