from playwright.sync_api import sync_playwright

def verify_about_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the about page
        page.goto("http://localhost:3000/about")

        # Wait for the Manifesto text to appear
        page.wait_for_selector("text=AVENUE PROFESSIONAL")

        # Take a screenshot of the Manifesto section
        page.screenshot(path="verification/manifesto.png")

        # Scroll down to the Ingredient Map
        page.evaluate("window.scrollBy(0, window.innerHeight)")
        page.wait_for_timeout(1000) # Wait for animations

        # Wait for map or carousel
        page.wait_for_selector("text=Карта Ингредиентов")

        # Take a screenshot of the Map section
        page.screenshot(path="verification/ingredient_map.png")

        browser.close()

if __name__ == "__main__":
    verify_about_page()
