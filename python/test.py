from bs4 import BeautifulSoup

def print_num_tables(data_source):
    soup = BeautifulSoup(data_source, "html.parser")
    tables = soup.select('ul.ul')
    return tables

def objectize(array):
    for item in array:
        print(item)

if __name__ == "__main__":
    html_file = open('C:\\Users\\samia\\Development\\black-data\\python\\test.html')
    html = html_file.read()

    tables = print_num_tables(html)
    arr_tables = tables

    objectize(arr_tables)