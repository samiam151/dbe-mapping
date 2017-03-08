import json
import geo

if __name__ == "__main__":
    with open('./data/data_node.json', 'r+', encoding='utf8') as json_file:
        data = json.load(json_file)
        data_legnth = len(data)

        for index, datum in enumerate(data):
            data[index]['coords'] = geo.translate_one("{0}".format(datum['info']['BusinessAddress1']))
            print("{0} items left...".format(data_legnth - index))

        with open('./data/data_new.json', 'w+') as new_file:
            new_data = json.dumps(data, indent=4)
            new_file.write(new_data)