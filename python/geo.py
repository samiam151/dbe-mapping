import geocoder

def translate_one(address):
    g = geocoder.google(address)
    coords = {"Latitude": g.lat,"Longitude": g.lng, "Address": g.address}
    return coords

def translate(dataset):
    print("Translating addresses to coordinates...")
    for datum in dataset:
        # datum['Coordinates'] = translate_one(datum['BusinessAddress1'])
        datum['Coordinates'] = translate_one("{0} {1}".format(datum['BusinessAddress1'], datum['BusinessAddress3']))
    return dataset

if __name__ == "__main__":
    # k = translate_one('10631 Bent Tree Drive, Fredericksburg, VA, 22407')
    k = translate_one("1207 46th Street SE washington dc 20019")
    print(k)