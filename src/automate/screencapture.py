#coding=utf-8                                                                                                                                                                              
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(options=options)

URL = 'http://localhost:3903/d/_kSDQzm4z/color-bar-by-threshold?orgId=1'

driver.get(URL)
#sleep(1)

driver.get_screenshot_as_file("./web_screenshot.png")
driver.quit()
print("end...")

""" try:
  driver.get(URL)
  S = lambda X: driver.execute_script('return document.body.parentNode.scroll'+X)
  driver.set_window_size(S('Width'),S('Height')) # May need manual adjustment                                                                                                                
  driver.find_element_by_tag_name('body').screenshot('web_screenshot.png')
except:
  print("An exception occurred")

driver.quit() """