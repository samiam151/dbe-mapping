import json
import geo

if __name__ == "__main__":
    with open('../data/data.json', 'r+') as json_file:
        data = json.load(json_file)

        for datum in data:
            datum['Coordinates'] = geo.translate_one("{0}, {1}, {2}".format(datum['BusinessAddress1'], datum['BusinessAddress2'], datum['BusinessAddress3']))
            print(datum['Coordinates'])

        # with open('../data/data_fix.json', 'w+') as new_file:
        new_data = json.dumps(data, indent=4)
        json_file.write(new_data)