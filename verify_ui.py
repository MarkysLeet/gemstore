import time
from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )

        # Inject Mock Auth with correct key and structure
        context.add_init_script("""
            localStorage.setItem('avenue-user', JSON.stringify({ name: 'Test User', email: 'test@example.com', id: '1', role: 'user' }));
        """)

        page = context.new_page()

        # Wait for server
        print("Waiting for server...")
        for i in range(30):
            try:
                page.goto("http://localhost:3000")
                break
            except:
                time.sleep(1)

        # 1. Check Home Page (New Arrivals)
        print("Checking Home Page...")
        page.goto("http://localhost:3000")
        time.sleep(3) # Wait for animations/load
        page.evaluate("window.scrollTo(0, 1000)") # Scroll down to New Arrivals
        time.sleep(2)
        page.screenshot(path="/home/jules/verification/home_new_arrivals.png")

        # 2. Check Contacts Page (Light Theme)
        print("Checking Contacts Page...")
        page.goto("http://localhost:3000/contacts")
        time.sleep(3)
        page.screenshot(path="/home/jules/verification/contacts_light.png")

        # 3. Check Profile Page (Padding)
        print("Checking Profile Page...")
        page.goto("http://localhost:3000/profile")
        time.sleep(3)
        page.screenshot(path="/home/jules/verification/profile_padding.png")

        # 4. Check Product Page (Padding)
        print("Checking Product Page...")
        page.goto("http://localhost:3000/product/1") # Assuming ID 1 exists (mock data usually has '1')
        time.sleep(3)
        page.screenshot(path="/home/jules/verification/product_padding.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
