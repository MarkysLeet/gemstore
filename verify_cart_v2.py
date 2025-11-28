from playwright.sync_api import sync_playwright

def verify_cart_drawer():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        try:
            # Go to home page
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")

            # Open Cart
            # The header cart button
            cart_btn = page.locator("header button").filter(has=page.locator("svg.lucide-shopping-bag")).first
            if cart_btn.count() == 0:
                 # Fallback to any button with that icon
                 cart_btn = page.locator("button").filter(has=page.locator("svg.lucide-shopping-bag")).first

            cart_btn.click()

            # Wait for drawer header
            drawer_header = page.get_by_role("heading", name="Ваша корзина")
            drawer_header.wait_for(state="visible", timeout=5000)
            page.wait_for_timeout(1000) # Animation wait

            # Screenshot Empty State
            page.screenshot(path="cart_empty_desktop.png")
            print("Captured Empty Cart (Desktop)")

            # Add Item Logic
            # Close drawer
            page.locator("button").filter(has=page.locator("svg.lucide-x")).first.click()

            # Go to Shop
            page.goto("http://localhost:3000/shop")
            page.wait_for_load_state("networkidle")

            # Add item
            add_btn = page.locator("button").filter(has=page.locator("svg.lucide-plus")).first
            if add_btn.count() > 0:
                add_btn.click()
                page.wait_for_timeout(500)

                # Open cart again
                # Re-locate button as page changed
                cart_btn = page.locator("header button").filter(has=page.locator("svg.lucide-shopping-bag")).first
                if cart_btn.count() == 0:
                     cart_btn = page.locator("button").filter(has=page.locator("svg.lucide-shopping-bag")).first
                cart_btn.click()

                drawer_header.wait_for(state="visible", timeout=5000)
                page.wait_for_timeout(1000)

                # Screenshot Non-Empty State
                page.screenshot(path="cart_items_desktop.png")
                print("Captured Cart with Items (Desktop)")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_cart_drawer()
