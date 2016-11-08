import json
import navigate
import retrieve
import geo

# Get to the page
navigate.load_driver()
navigate.navigate_to_file()
source = navigate.get_page_source()

# Close browser
navigate.close_browser()

# Scrape the data and break it into a dictionary
data = retrieve.break_tables(source) # uses selenium for data

# Translate addresses into coordinates
translated_data = geo.translate(data)

# Store the data in a file
print('Writing data to file...')
raw_data = json.dumps(translated_data, indent=4, sort_keys=True, separators=(',', ': '))
with open('data/data.json', 'w+') as json_file:
   json_file.write(raw_data)

print("JSON file creation complete. Well done!")