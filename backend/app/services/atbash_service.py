def get_atbash(letter: str):
    if  96 < ord(letter) < 123:
        dig_letter = ord(letter) - 97
        return chr(122-dig_letter)

    if  64 < ord(letter) < 91:
            dig_letter = ord(letter) - 65
            return chr(90-dig_letter)
    if  1487 < ord(letter) < 1515:
                dig_letter = ord(letter) - 1488
                return chr(1514-dig_letter)
    return(letter)
    

def atbash_service(text):
       return "".join(map(get_atbash, text))



if __name__ == "__main__":
    print(atbash_service(atbash_service("שלום עולם")))