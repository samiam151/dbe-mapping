import requests
from bs4 import BeautifulSoup
import pprint


# Returns every other table, the left side with the data
print("Retrieving tables...")
def get_tables(data_source):
    soup = BeautifulSoup(data_source, "html.parser")
    tables = soup.select('td.BORDER-BOTTOM')
    return tables[::2]

def break_tables():
    print("Breaking down tables...")
    # Store the html data file  
    html_file = open('C:\\Users\\samia\\Development\\black-data\\python\\actual_data.html')
    html = html_file.read()

    # Retrieve tables
    tables = get_tables(html)[:50]

    print("Creating tables object...")
    # Parse tables into dictionaries
    info = []
    for table in tables:
        spans = table.findAll('span')
        
        obj = {}
        for span in spans:      
            id = span.get('id')[18:]
            text = span.get_text()

            obj[id] = text
        
        if 'DBE' in obj['LsdbeOptions']:
            info.append(obj)

    return info

if __name__ == "__main__":  
    break_tables()