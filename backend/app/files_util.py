import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_PATH = os.path.join(BASE_DIR, "data", "favorites.json")

def read_file():
    with open (FILE_PATH, "r", encoding= "utf8") as f:
            return json.load(f)

def write_to_file(data: dict):
      with open(FILE_PATH, "w") as f:
            json.dump(data, f)
