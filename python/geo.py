import geocoder

def translate_one(address):
    g = geocoder.google(address)
    return {"Latitude": g.lat,"Longitude": g.lng, "Address": g.address}

def translate(dataset):
    print("Translating addresses to coordinates...")
    for datum in dataset:
        datum['Coordinates'] = translate_one(datum['BusinessAddress1'])
    return dataset

if __name__ == "__main__":
    k = translate_one('10631 Bent Tree Drive')
    print(k)