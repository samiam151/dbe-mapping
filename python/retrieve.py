import requests
from bs4 import BeautifulSoup
import pprint


# Returns every other table, the left side with the data
print("Retrieving tables...")
def get_tables(data_source):
    soup = BeautifulSoup(data_source, "html.parser")
    tables = soup.select('td.BORDER-BOTTOM')
    return tables[::2]

def break_tables(source):
    print("Breaking down tables...")
    # Store the html data file  
    try:
        html_file = open(source)
    except FileNotFoundError as error:
        html_file = open('C:\\Users\\samia\\Development\\black-data\\python\\actual_data.html')
    html = html_file.read()

    # Retrieve tables
    tables = get_tables(source)[:]
    print(" ==> Number of total businesses: " + str(len(tables)))

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
            print("a")
    
    print("Tables organized created and organized.")
    print(" ==> Number of DBE businesses: " + str(len(info)))
    return info

if __name__ == "__main__":  
    break_tables()