from selenium import webdriver 
from selenium.webdriver.chrome.options import Options
DRIVER = 'chromedriver'
chrome_options = Options()
chrome_options.add_argument("--window-size=1920,1080")
driver = webdriver.Chrome(DRIVER, chrome_options=chrome_options)



def testScreenshot():
    #driver.get('https://www.youtube.com/')
    driver.get('http://localhost:5000/')

    screenshot = driver.save_screenshot("lett"+'.png') 
    driver.quit()
#testScreenshot()