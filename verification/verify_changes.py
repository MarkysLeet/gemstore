
from playwright.sync_api import sync_playwright, expect
import re

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a desktop viewport
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # 1. Verify Home Page
        print("Navigating to Home Page...")
        page.goto("http://localhost:3000")
        page.wait_for_selector("h1, h2")

        print("Checking for new products on Home Page...")
        expect(page.get_by_text("Серый Туман").first).to_be_visible()

        page.screenshot(path="verification/home_page.png", full_page=True)
        print("Home page verified.")

        # 2. Verify Shop Page
        print("Navigating to Shop Page...")
        page.goto("http://localhost:3000/shop")
        page.wait_for_selector("text=Каталог")

        expect(page.get_by_text("Холодный Фарфор").first).to_be_visible()

        page.screenshot(path="verification/shop_page.png", full_page=True)
        print("Shop page verified.")

        # 3. Verify Cart Interaction
        print("Adding product to cart...")
        card = page.locator("a.block.group.relative").filter(has_text="Холодный Фарфор")

        add_btn = card.locator("button")
        add_btn.click()

        page.wait_for_timeout(1000)

        print("Opening Cart Drawer...")
        cart_btn = page.locator("header button").last
        cart_btn.click()

        page.wait_for_selector("text=Ваша корзина")

        cart_drawer = page.locator(".fixed.z-\[70\].shadow-2xl")

        cart_item_img = cart_drawer.locator("img[alt*='Холодный Фарфор']")
        expect(cart_item_img).to_be_visible()
        src = cart_item_img.get_attribute("src")
        print(f"Cart item image src: {src}")
        if "004.png" not in src:
             print("WARNING: Image src does not contain 004.png")

        page.screenshot(path="verification/cart_drawer.png")
        print("Cart drawer verified.")

        # 4. Verify Navigation from Cart
        print("Clicking product in cart...")
        cart_item_link = cart_drawer.locator("a[href*='/product/']").filter(has_text="Холодный Фарфор").first
        cart_item_link.click()

        # Verify Navigation
        expect(page).to_have_url(re.compile(r".*/product/.*"))
        # We expect the H1 of the product page to contain the name
        expect(page.locator("h1").filter(has_text="Холодный Фарфор")).to_be_visible()

        # Verify Drawer Closed
        page.wait_for_timeout(500)
        backdrop = page.locator(".fixed.inset-0.bg-black\/20")
        expect(backdrop).not_to_be_visible()

        page.screenshot(path="verification/product_page_nav.png")
        print("Product page navigation verified.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
