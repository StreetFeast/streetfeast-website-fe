import Image from "next/image";
import styles from "./tutorials.module.css";

export default function CreateProductsTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Products are the building blocks of your menus. Each product includes:
        </p>
        <ul className={styles.list}>
          <li>Name</li>
          <li>Price</li>
          <li>Photo</li>
          <li>Description</li>
          <li>Availability status</li>
        </ul>
        <p className={styles.paragraph}>
          Once you create products, you can organize them into menus that customers will see.
        </p>
      </section>

      <section id="accessing-products" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing Products</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
          <li>Tap the <strong className={styles.strong}>Product</strong> tab at the bottom of the screen.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-products/01-products-list.png"
            alt="Products List showing search bar, product items with images, names, and availability status"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Products List</figcaption>
        </figure>
        <p className={styles.paragraph}>The Products screen shows:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Search bar</strong>: Find products quickly by name</li>
          <li><strong className={styles.strong}>Product list</strong>: All your products with images, names, and availability status</li>
          <li><strong className={styles.strong}>Create New Product</strong> button: Add new items</li>
        </ul>
        <p className={styles.paragraph}>Each product in the list shows:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Product image</strong> (or placeholder if no image)</li>
          <li><strong className={styles.strong}>Product name</strong></li>
          <li><strong className={styles.strong}>Availability badge</strong>: Green &quot;Available&quot; or gray &quot;Unavailable&quot;</li>
          <li><strong className={styles.strong}>Arrow</strong>: Tap to edit the product</li>
        </ul>
      </section>

      <section id="creating-a-new-product" className={styles.section}>
        <h2 className={styles.sectionTitle}>Creating a New Product</h2>
        <ol className={styles.list}>
          <li>From the Products screen, tap the <strong className={styles.strong}>Create New Product</strong> button.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-products/03-add-product-form.png"
            alt="Add Product Form with fields for name, status, price, photo, and description"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Add Product Form</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>Fill in the product details:</li>
        </ol>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Product Name</h3>
        <p className={styles.paragraph}>Enter a clear, descriptive name for your product.</p>
        <ul className={styles.list}>
          <li>Keep it concise but specific</li>
          <li>Examples: &quot;Classic Cheeseburger&quot;, &quot;Loaded Nachos&quot;, &quot;Fresh Lemonade&quot;</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Product Status</h3>
        <p className={styles.paragraph}>Toggle between:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Available</strong>: Product appears on your menu and can be ordered</li>
          <li><strong className={styles.strong}>Unavailable</strong>: Product is hidden from customers (useful for seasonal items or when you run out)</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Default Price</h3>
        <p className={styles.paragraph}>Enter the base price for the product.</p>
        <ul className={styles.list}>
          <li>Use the format: ##.## (e.g., 8.99)</li>
          <li>This price can be adjusted in specific menus if needed</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Photo</h3>
        <p className={styles.paragraph}>Add a photo of your product to entice customers.</p>
        <ul className={styles.list}>
          <li>Tap <strong className={styles.strong}>Upload Image</strong> to add a photo</li>
          <li>Choose from camera or photo library</li>
          <li>High-quality, appetizing photos increase sales</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Photo Tips:</p>
          <ul className={styles.tipContent}>
            <li>Use natural lighting when possible</li>
            <li>Show the product clearly without clutter</li>
            <li>Make sure the image is in focus</li>
            <li>Use consistent styling across products</li>
          </ul>
        </div>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Description</h3>
        <p className={styles.paragraph}>Add a description that tells customers about the product.</p>
        <ul className={styles.list}>
          <li>Highlight key ingredients</li>
          <li>Mention any special preparation methods</li>
          <li>Note dietary information (vegetarian, gluten-free, etc.)</li>
          <li>Keep it brief but informative</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Example descriptions:</p>
          <ul className={styles.tipContent}>
            <li>&quot;Hand-pressed beef patty with melted American cheese, lettuce, tomato, and our secret sauce&quot;</li>
            <li>&quot;Crispy tortilla chips topped with seasoned ground beef, queso, jalapeños, and fresh pico de gallo&quot;</li>
          </ul>
        </div>
        <ol className={styles.list} start={3}>
          <li>Tap <strong className={styles.strong}>Create</strong> to save your new product.</li>
        </ol>
      </section>

      <section id="editing-an-existing-product" className={styles.section}>
        <h2 className={styles.sectionTitle}>Editing an Existing Product</h2>
        <ol className={styles.list}>
          <li>From the Products list, tap on any product to edit it.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/create-products/02-edit-product.png"
            alt="Edit Product screen showing editable fields for name, status, price, photo, and description"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Edit Product</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>
            The Edit Product screen shows:
            <ul className={styles.nestedList}>
              <li><strong className={styles.strong}>Name</strong>: Change the product name</li>
              <li><strong className={styles.strong}>Product Status</strong>: Toggle availability</li>
              <li><strong className={styles.strong}>Default Price</strong>: Update pricing</li>
              <li><strong className={styles.strong}>Photo</strong>: Edit, Replace, or Remove the current image</li>
              <li><strong className={styles.strong}>Description</strong>: Modify the product description</li>
            </ul>
          </li>
        </ol>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Photo Options</h3>
        <p className={styles.paragraph}>When editing a product with an existing photo:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Edit</strong>: Crop or adjust the current image</li>
          <li><strong className={styles.strong}>Replace</strong>: Upload a new image</li>
          <li><strong className={styles.strong}>Remove</strong>: Delete the image (shows placeholder instead)</li>
        </ul>
        <ol className={styles.list} start={3}>
          <li>Make your changes and tap <strong className={styles.strong}>Save</strong>.</li>
        </ol>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Deleting a Product</h3>
        <p className={styles.paragraph}>To delete a product:</p>
        <ol className={styles.list}>
          <li>Tap on the product to open the edit screen</li>
          <li>Scroll to the bottom</li>
          <li>Tap <strong className={styles.strong}>Delete Product</strong></li>
          <li>Confirm the deletion</li>
        </ol>
        <div className={styles.noteBox}>
          <p className={styles.noteTitle}>Warning:</p>
          <p className={styles.noteContent}>
            Deleting a product removes it from all menus. Consider marking it as &quot;Unavailable&quot; instead if you might offer it again in the future.
          </p>
        </div>
      </section>

      <section id="managing-product-availability" className={styles.section}>
        <h2 className={styles.sectionTitle}>Managing Product Availability</h2>
        <p className={styles.paragraph}>
          Availability is a quick way to temporarily hide products without deleting them.
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>When to Mark Products Unavailable</h3>
        <ul className={styles.list}>
          <li>Sold out for the day</li>
          <li>Seasonal items out of season</li>
          <li>Temporary ingredient shortage</li>
          <li>Testing new items before launch</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>How to Change Availability</h3>
        <ol className={styles.list}>
          <li>Tap on the product</li>
          <li>Toggle between <strong className={styles.strong}>Available</strong> and <strong className={styles.strong}>Unavailable</strong></li>
          <li>Tap <strong className={styles.strong}>Save</strong></li>
        </ol>
        <p className={styles.paragraph}>The change takes effect immediately across all menus.</p>
      </section>

      <section id="finding-products" className={styles.section}>
        <h2 className={styles.sectionTitle}>Finding Products</h2>
        <p className={styles.paragraph}>Use the search bar to quickly find products:</p>
        <ol className={styles.list}>
          <li>Tap the search field at the top of the Products screen</li>
          <li>Type part of the product name</li>
          <li>Results filter in real-time as you type</li>
        </ol>
        <p className={styles.paragraph}>This is especially useful if you have many products.</p>
      </section>

      <section id="best-practices" className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Naming Products</h3>
        <ul className={styles.list}>
          <li>Be descriptive but concise</li>
          <li>Use consistent naming conventions</li>
          <li>Include key differentiators (e.g., &quot;Small Fries&quot; vs &quot;Large Fries&quot;)</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Pricing</h3>
        <ul className={styles.list}>
          <li>Set competitive prices</li>
          <li>Consider your costs and desired margins</li>
          <li>Remember prices can be adjusted per menu</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Photos</h3>
        <ul className={styles.list}>
          <li>Use professional-looking photos</li>
          <li>Ensure consistent lighting and style</li>
          <li>Update photos when products change</li>
          <li>A good photo can significantly increase sales</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Descriptions</h3>
        <ul className={styles.list}>
          <li>Focus on what makes the item special</li>
          <li>Mention allergens and dietary info</li>
          <li>Keep descriptions scannable (2-3 lines max)</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Organization</h3>
        <ul className={styles.list}>
          <li>Create all products before building menus</li>
          <li>Keep availability status current</li>
          <li>Regularly review and update product info</li>
        </ul>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <ul className={styles.list}>
          <li>Products must be created before adding them to menus</li>
          <li>Product changes affect all menus using that product</li>
          <li>Prices set in menus override the default product price</li>
          <li>Unavailable products are hidden from customers but remain in your menus</li>
          <li>Consider seasonal products for limited-time offerings</li>
        </ul>
      </section>
    </>
  );
}
