import json
import navigate
import retrieve

# Get to the page
navigate.load_driver()
navigate.navigate_to_file()
source = navigate.get_page_source()

# Scrape the data and break it into a dictionary
data = retrieve.break_tables(source) # uses selenium for data

# Store the data in a file
print('Writing data to file...')
raw_data = json.dumps(data, indent=4, sort_keys=True, separators=(',', ': '))
with open('data/data.json', 'w+') as json_file:
   json_file.write(raw_data)

print("JSON file creation complete. Well done!")