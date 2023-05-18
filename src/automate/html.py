from html2image import HtmlToImage
htmi = HtmlToImage()

URL = 'http://localhost:3903/d/_kSDQzm4z/color-bar-by-threshold?orgId=1'

htmi.size = (500, 200)

htmi.chrome_path = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

htmi.url_to_img(url=URL, output_file='python_org.png')
