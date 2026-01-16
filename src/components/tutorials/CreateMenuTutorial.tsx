import Image from "next/image";
import styles from "./tutorials.module.css";

export default function CreateMenuTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Menus are how customers see your offerings. Each menu can have:
        </p>
        <ul className={styles.list}>
          <li>A name and description</li>
          <li>Multiple categories (e.g., &quot;Burgers&quot;, &quot;Fries&quot;, &quot;Drinks&quot;)</li>
          <li>Products organized within categories</li>
          <li>Custom prices per product (can differ from default product prices)</li>
        </ul>
        <p className={styles.paragraph}>
          You can create multiple menus for different events, locations, or seasons.
        </p>
      </section>

      <section id="accessing-menus" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing Menus</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
          <li>Tap the <strong className={styles.strong}>Menu</strong> tab at the bottom of the screen.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/01-menu-list.png"
            alt="Menu List showing search bar, menu items with names and descriptions, and default badge"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Menu List</figcaption>
        </figure>
        <p className={styles.paragraph}>The Menu screen shows:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Search bar</strong>: Find menus by name</li>
          <li><strong className={styles.strong}>Menu list</strong>: All your menus with names and descriptions</li>
          <li><strong className={styles.strong}>Default badge</strong>: Indicates which menu is your primary menu</li>
          <li><strong className={styles.strong}>Create New Menu</strong> button: Add a new menu</li>
        </ul>
        <p className={styles.paragraph}>Each menu shows:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Menu name</strong> with &quot;(default)&quot; badge if it&apos;s the default</li>
          <li><strong className={styles.strong}>Menu description</strong></li>
          <li><strong className={styles.strong}>Three-dot menu</strong> (⋯): Access menu actions</li>
        </ul>
      </section>

      <section id="creating-a-new-menu" className={styles.section}>
        <h2 className={styles.sectionTitle}>Creating a New Menu</h2>
        <ol className={styles.list}>
          <li>From the Menu list, tap <strong className={styles.strong}>Create New Menu</strong>.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/06-new-menu-empty.png"
            alt="New Menu screen with empty name field and Add Category button"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>New Menu (Empty)</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>Enter a <strong className={styles.strong}>Menu Name</strong> (required)</li>
          <li>Add categories using the <strong className={styles.strong}>Add Category</strong> button</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/07-category-added.png"
            alt="Menu with a category added showing the category name and Add Products option"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Category Added</figcaption>
        </figure>
        <ol className={styles.list} start={4}>
          <li>Add products to categories using <strong className={styles.strong}>Add Products</strong></li>
          <li>
            Organize your menu:
            <ul className={styles.nestedList}>
              <li>Drag categories to reorder them</li>
              <li>Drag products within or between categories</li>
              <li>Edit prices as needed</li>
            </ul>
          </li>
          <li>Tap <strong className={styles.strong}>Create Menu</strong> to save</li>
        </ol>
      </section>

      <section id="adding-categories" className={styles.section}>
        <h2 className={styles.sectionTitle}>Adding Categories</h2>
        <p className={styles.paragraph}>
          Categories help customers navigate your menu. Common categories include:
        </p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Entrees</strong> / <strong className={styles.strong}>Main Dishes</strong></li>
          <li><strong className={styles.strong}>Sides</strong></li>
          <li><strong className={styles.strong}>Drinks</strong> / <strong className={styles.strong}>Beverages</strong></li>
          <li><strong className={styles.strong}>Desserts</strong></li>
          <li><strong className={styles.strong}>Combos</strong> / <strong className={styles.strong}>Specials</strong></li>
        </ul>
        <p className={styles.paragraph}>To rename a category:</p>
        <ol className={styles.list}>
          <li>Enter edit mode</li>
          <li>Tap on the category name</li>
          <li>Enter the new name</li>
        </ol>
      </section>

      <section id="adding-products-to-a-category" className={styles.section}>
        <h2 className={styles.sectionTitle}>Adding Products to a Category</h2>
        <ol className={styles.list}>
          <li>Tap <strong className={styles.strong}>Add Products</strong> button</li>
          <li>Select products from your product list</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/04-select-products.png"
            alt="Select Products screen showing a list of available products with checkboxes"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Select Products</figcaption>
        </figure>
        <ol className={styles.list} start={3}>
          <li>Check the boxes next to products you want to add</li>
          <li>Tap <strong className={styles.strong}>Add Product</strong> to add selected items</li>
        </ol>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Editing Prices</h3>
        <p className={styles.paragraph}>
          Prices shown in menus can be different from the product&apos;s default price:
        </p>
        <ul className={styles.list}>
          <li>Tap the price field next to any product</li>
          <li>Enter the new price</li>
          <li>This price only applies to this menu</li>
        </ul>
      </section>

      <section id="menu-actions" className={styles.section}>
        <h2 className={styles.sectionTitle}>Menu Actions</h2>
        <p className={styles.paragraph}>
          Tap the three-dot menu (⋯) on any menu to see available actions.
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/05-menu-actions.png"
            alt="Menu Actions popup showing Delete Menu, Mark as Default, and Duplicate Menu options"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Menu Actions</figcaption>
        </figure>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Action</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong className={styles.strong}>Delete Menu</strong></td>
              <td>Permanently remove the menu</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Mark as Default</strong></td>
              <td>Set this menu as your primary menu</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Duplicate Menu</strong></td>
              <td>Create a copy of this menu</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Default Menu</h3>
        <ul className={styles.list}>
          <li>The default menu is shown to customers on your profile</li>
          <li>You can only have one default menu at a time</li>
          <li>When you mark a new menu as default, the previous default is unmarked</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Duplicating Menus</h3>
        <p className={styles.paragraph}>This is useful when you want to:</p>
        <ul className={styles.list}>
          <li>Create a similar menu with small variations</li>
          <li>Make seasonal versions of your menu</li>
          <li>Test new menu structures without changing the original</li>
        </ul>
      </section>

      <section id="reordering-categories-and-products" className={styles.section}>
        <h2 className={styles.sectionTitle}>Reordering Categories and Products</h2>
        <p className={styles.paragraph}>
          Tap on any menu to view its contents.
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/02-menu-view.png"
            alt="Menu View showing categories with products, prices, and availability status"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Menu View</figcaption>
        </figure>
        <p className={styles.paragraph}>The menu view shows:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Categories</strong> (collapsible sections like &quot;Burgers&quot;, &quot;Fries&quot;, &quot;Drinks&quot;)</li>
          <li><strong className={styles.strong}>Products</strong> within each category</li>
          <li><strong className={styles.strong}>Availability status</strong> for each product</li>
          <li><strong className={styles.strong}>Prices</strong> for each product</li>
          <li><strong className={styles.strong}>Item counts</strong> per category</li>
          <li><strong className={styles.strong}>Edit button</strong> (pencil icon) to modify the menu</li>
        </ul>
        <p className={styles.paragraph}>
          Tap the <strong className={styles.strong}>edit icon</strong> (pencil) in the top right to enter edit mode.
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-menu/03-menu-edit-mode.png"
            alt="Menu Edit Mode showing drag handles for reordering and X buttons for removing items"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Menu Edit Mode</figcaption>
        </figure>
        <p className={styles.paragraph}>In edit mode you can:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Edit menu name</strong>: Tap the name field at the top</li>
          <li><strong className={styles.strong}>Add Category</strong>: Create new product categories</li>
          <li><strong className={styles.strong}>Add Products</strong>: Add existing products to the menu</li>
          <li><strong className={styles.strong}>Drag to reorder</strong>: Use the dots (⋮) on the left to drag categories or products</li>
          <li><strong className={styles.strong}>Remove items</strong>: Tap the X button to remove products or categories</li>
          <li><strong className={styles.strong}>Edit prices</strong>: Change prices for individual products</li>
          <li><strong className={styles.strong}>Save Menu</strong>: Confirm your changes</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Ordering Tips:</p>
          <ul className={styles.tipContent}>
            <li><strong>Categories</strong>: Drag using the handle to change category order</li>
            <li><strong>Products</strong>: Drag products to reorder within a category or move between categories</li>
            <li>Put your most popular items at the top for visibility</li>
          </ul>
        </div>
      </section>

      <section id="managing-multiple-menus" className={styles.section}>
        <h2 className={styles.sectionTitle}>Managing Multiple Menus</h2>
        <p className={styles.paragraph}>Create different menus for:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Regular service</strong>: Your standard everyday menu</li>
          <li><strong className={styles.strong}>Events</strong>: Limited menu for high-volume events</li>
          <li><strong className={styles.strong}>Catering</strong>: Larger portion options or platters</li>
          <li><strong className={styles.strong}>Seasonal</strong>: Holiday or seasonal specials</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Naming Menus</h3>
        <p className={styles.paragraph}>Use clear, descriptive names:</p>
        <ul className={styles.list}>
          <li>&quot;Main Menu&quot;</li>
          <li>&quot;Festival Menu&quot;</li>
          <li>&quot;Breakfast Menu&quot;</li>
          <li>&quot;Weekend Specials&quot;</li>
        </ul>
      </section>

      <section id="best-practices" className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Menu Organization</h3>
        <ul className={styles.list}>
          <li>Limit categories to 5-7 for easy navigation</li>
          <li>Put best-sellers at the top of each category</li>
          <li>Group similar items together</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Pricing Strategy</h3>
        <ul className={styles.list}>
          <li>Use menu-specific pricing for special events</li>
          <li>Consider value pricing for combos</li>
          <li>Keep prices consistent across similar items</li>
        </ul>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <ul className={styles.list}>
          <li>Products must be created before adding them to menus</li>
          <li>Price changes in a menu don&apos;t affect the product&apos;s default price</li>
          <li>Deleting a menu doesn&apos;t delete the products in it</li>
          <li>Only available products are shown to customers</li>
          <li>The default menu is displayed on your public profile</li>
          <li>You can link menus to specific scheduled events</li>
        </ul>
      </section>
    </>
  );
}
