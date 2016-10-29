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
    tables = get_tables(html)[:]

    print("Creating tables object...")
    # Parse tables into dictionaries
    info = []
    for table in tables:
        spans = table.findAll('span')
        
        obj = {}
        for span in spans:      
            id = span.get('id').split("_")[-1:][0][3:]
            text = span.get_text()

            obj[id] = text
            
        try:
            if 'DBE' in obj['LsdbeOptions']:
                info.append(obj)
        except KeyError as error:
            print(id)
            print(obj[id])
    
    print("Tables organized created and organized.")
    print("Number of businesses: " + str(len(info)))
    return info

if __name__ == "__main__":  
    break_tables()