from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

model = load_model('damage_assessment_model.h5')

def assess_damage(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)
    return prediction[0]
