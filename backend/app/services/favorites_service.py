from app.files_util import read_file, write_to_file

def get_favorites_service(explorer_name: str):
    favorites = read_file()
    return favorites.get(explorer_name, [])

def add_favorite_service(explorer_name: str, favorite):
    favorites = read_file()
    explorer = favorites.get(explorer_name, [])
    explorer.append(favorite.model_dump())
    favorites[explorer_name] = explorer
    write_to_file(favorites)

def delete_favorite_service(explorer_name: str, latitude: float, longitude: float):
    favorites = read_file()
    explorer_favorites = favorites.get(explorer_name, [])
    updated_favorites = [
        fav for fav in explorer_favorites
        if not (fav["latitude"] == latitude and fav["longitude"] == longitude)
          ]

    if len(explorer_favorites) == len(updated_favorites):
        return False
    
    favorites[explorer_name] = updated_favorites
    write_to_file(favorites)
    return True

    