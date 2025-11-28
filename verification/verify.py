from playwright.sync_api import sync_playwright
import time

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # 1. Verify Hero Scroll Text
        print("Navigating to home...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(3000) # Wait for entrance animations

        print("Screenshotting Hero Section...")
        page.screenshot(path="verification/hero_scroll.png", clip={"x": 0, "y": 600, "width": 1280, "height": 400})

        # 2. Verify Add to Cart Animation (Desktop)
        print("Navigating to Shop...")
        page.goto("http://localhost:3000/shop")
        page.wait_for_timeout(2000)

        # Locate a product card button
        # Finding the first "Plus" icon button inside a ProductCard
        # Structure: ProductCard -> button -> Plus icon
        # We can find the button by the Plus icon

        print("Finding product button...")
        # Hover over the first product card to ensure visibility if needed (though logic doesn't strictly require hover for button to exist, visually it might be better)
        # However, button is absolute positioned.

        # Click the first button found
        # In the code: <motion.button onClick={handleAddToCart} ...> <Plus .../> </motion.button>
        # The button has text-white, rounded-full.

        # Use a selector that targets the button containing the SVG
        buttons = page.locator("button:has(svg.lucide-plus)")
        if buttons.count() > 0:
            first_btn = buttons.first
            print("Clicking button...")

            # Click and immediately screenshot a sequence to catch the orb
            first_btn.click()

            # Capture a few frames to try and catch the flying orb
            time.sleep(0.2)
            page.screenshot(path="verification/cart_anim_0_2s.png")
            time.sleep(0.2)
            page.screenshot(path="verification/cart_anim_0_4s.png")
            time.sleep(0.2)
            page.screenshot(path="verification/cart_anim_0_6s.png")

            # 3. Verify Check Icon
            # After click, button should have Check icon
            time.sleep(0.2)
            page.screenshot(path="verification/cart_check_icon.png")

        else:
            print("No add to cart buttons found!")

        browser.close()

if __name__ == "__main__":
    verify_changes()
