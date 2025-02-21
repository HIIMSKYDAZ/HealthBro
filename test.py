from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_homepage_elements(driver):
    driver.get("http://localhost:3000/")  # Modify the URL if needed
    
    # Wait for Hero Section to load
    hero_section = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "hero-container"))
    )
    assert hero_section is not None

    # Check if the video element is present
    video_element = driver.find_element(By.TAG_NAME, "video")
    assert video_element is not None
    #bejelntkezés tesztelése
def test_loginpage(driver):
    driver.get("http://localhost:3000/login") 
    

    name_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "name"))
    )
    password_input = driver.find_element(By.ID, "password")
    login_button = driver.find_element(By.CLASS_NAME, "btn--primary")


    assert name_input is not None
    assert password_input is not None
    assert login_button is not None

    error_message = driver.find_elements(By.CLASS_NAME, "alert-danger")
    assert len(error_message) == 0  


    name_input.send_keys("kerenyir") #teszt felhasználónév
    password_input.send_keys("a")  #teszt jelszó
    login_button.click()

    WebDriverWait(driver, 10).until(
        EC.url_to_be("http://localhost:3000/HomeMain") 
    )


    assert driver.current_url == "http://localhost:3000/HomeMain"  


def test_signup_page(driver):
    driver.get("http://localhost:3000/sign-up")  # Modify the URL to your sign-up page

    # Check for the presence of input fields and buttons
    login_name_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "loginName"))
    )
    email_input = driver.find_element(By.ID, "email")
    password_input = driver.find_element(By.ID, "password")
    confirm_password_input = driver.find_element(By.ID, "confirmPassword")
    register_button = driver.find_element(By.CLASS_NAME, "btn-primary")
    terms_checkbox = driver.find_element(By.ID, "terms")  # Locate the checkbox

    # Assert that the elements are present
    assert login_name_input is not None
    assert email_input is not None
    assert password_input is not None
    assert confirm_password_input is not None
    assert register_button is not None
    assert terms_checkbox is not None  # Assert checkbox is present

    # Check if error message is not visible initially
    error_message = driver.find_elements(By.CLASS_NAME, "alert-danger")
    assert len(error_message) == 0  # Ensure no error message is displayed initially

    # Test registration form with valid data
    login_name_input.send_keys("testuser")  # Enter a sample login name
    email_input.send_keys("testuser@example.com")  # Enter a sample email
    password_input.send_keys("password123")  # Enter a sample password
    confirm_password_input.send_keys("password123")  # Confirm the password
    terms_checkbox.click()  # Click the checkbox to accept terms
    register_button.click()

    # Wait for successful registration and redirection to login page
    WebDriverWait(driver, 10).until(
        EC.url_to_be("http://localhost:3000/login")  # Update with your login URL
    )

    # Assert that the user is redirected to the login page
    assert driver.current_url == "http://localhost:3000/login"  # Update the URL if necessary

def test_signup_error_handling(driver):
    driver.get("http://localhost:3000/sign-up")

    # Fill in the form with mismatched passwords
    driver.find_element(By.ID, "loginName").send_keys("testuser")
    driver.find_element(By.ID, "email").send_keys("testuser@example.com")
    driver.find_element(By.ID, "password").send_keys("password123")
    driver.find_element(By.ID, "confirmPassword").send_keys("password321")
    
    # Ensure the checkbox is checked
    driver.find_element(By.ID, "terms").click()

    # Submit the form
    driver.find_element(By.CLASS_NAME, "btn-primary").click()

    # Wait for the error message to appear
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "alert-danger"))
    )

    # Assert that the error message is displayed
    error_message = driver.find_element(By.CLASS_NAME, "alert-danger")
    assert error_message is not None
    assert "A jelszavak nem egyeznek!" in error_message.text