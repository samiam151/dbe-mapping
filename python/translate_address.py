from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

geolocator = Nominatim()

def toCoord(datum):
    obj = {}
    try:
        location = geolocator.geocode(datum, timeout=None)
        obj['address'] = location.address
        obj['long'] = location.longitude
        obj['lat'] = location.latitude
    except GeocoderTimedOut as e:
        print("Error: geocode failed on input %s with message %s"%(my_address, e.msg))
    return obj

def translate(data):
    print("Translating addresses to coordinates...")
    for datum in data:
        datum['coords'] = toCoord(datum['BusinessAddress1'])
    return data
    
if __name__ == "__main__":
    print('main')