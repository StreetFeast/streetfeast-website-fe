import Image from "next/image";
import styles from "./tutorials.module.css";

export default function UpdateProfileTutorial() {
  return (
    <>
      <section id="accessing-the-edit-profile-screen" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing the Edit Profile Screen</h2>
        <ol className={styles.list}>
          <li>
            Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab at the bottom of the screen.
          </li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/update-profile/01-my-truck-home.png"
            alt="My Truck Home Screen showing the main dashboard with Edit Profile button"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>My Truck Home Screen</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>
            Tap the <strong className={styles.strong}>Edit Profile</strong> button to open the profile editing screen.
          </li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/update-profile/02-edit-profile-screen.png"
            alt="Edit Profile Screen showing form fields for profile image, description, website, and cuisine type"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Edit Profile Screen</figcaption>
        </figure>
      </section>

      <section id="updating-your-profile-image" className={styles.section}>
        <h2 className={styles.sectionTitle}>Updating Your Profile Image</h2>
        <p className={styles.paragraph}>
          Your truck&apos;s profile images are the first thing customers see. You can add up to 5 images.
        </p>
        <ol className={styles.list}>
          <li>
            On the Edit Profile screen, tap the <strong className={styles.strong}>Add Image</strong> button (orange box with + icon).
          </li>
          <li>
            Choose how you want to add an image:
            <ul className={styles.nestedList}>
              <li><strong className={styles.strong}>Take a picture</strong>: Opens your device camera to capture a new photo</li>
              <li><strong className={styles.strong}>Upload from gallery</strong>: Browse your photo library to select an existing image</li>
            </ul>
          </li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/update-profile/03-image-picker-options.png"
            alt="Image picker showing options to take a picture or upload from gallery"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Image Picker Options</figcaption>
        </figure>
        <ol className={styles.list} start={3}>
          <li>
            After selecting an image, it will appear in the image gallery. You can:
            <ul className={styles.nestedList}>
              <li>Tap the <strong className={styles.strong}>X</strong> button on any image to remove it</li>
              <li>Add more images by tapping the <strong className={styles.strong}>Add Image</strong> button again</li>
              <li>Drag images to reorder them (the first image is your primary profile image)</li>
            </ul>
          </li>
        </ol>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Tips for great truck images:</p>
          <ul className={styles.tipContent}>
            <li>Use high-quality, well-lit photos</li>
            <li>Show your truck from different angles</li>
            <li>Include photos of your food and menu items</li>
            <li>Keep images up-to-date with your current branding</li>
          </ul>
        </div>
      </section>

      <section id="updating-your-description" className={styles.section}>
        <h2 className={styles.sectionTitle}>Updating Your Description</h2>
        <p className={styles.paragraph}>
          The description tells customers about your truck and what makes it special.
        </p>
        <ol className={styles.list}>
          <li>Tap the <strong className={styles.strong}>Description</strong> text field</li>
          <li>Enter your truck&apos;s description</li>
          <li>Keep it concise but informative - highlight your specialties and unique offerings</li>
        </ol>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Example descriptions:</p>
          <ul className={styles.tipContent}>
            <li>&quot;Authentic Mexican street tacos made with family recipes passed down for generations. Fresh ingredients, bold flavors!&quot;</li>
            <li>&quot;Gourmet burgers with locally-sourced beef and creative toppings. Voted Best Food Truck 2024!&quot;</li>
          </ul>
        </div>
      </section>

      <section id="adding-your-website" className={styles.section}>
        <h2 className={styles.sectionTitle}>Adding Your Website</h2>
        <p className={styles.paragraph}>
          If you have a website, you can add it to your profile so customers can learn more about you.
        </p>
        <ol className={styles.list}>
          <li>Tap the <strong className={styles.strong}>Website</strong> text field</li>
          <li>Enter your full website URL (e.g., <code className={styles.code}>https://www.mytruckwebsite.com</code>)</li>
        </ol>
      </section>

      <section id="selecting-your-cuisine-type" className={styles.section}>
        <h2 className={styles.sectionTitle}>Selecting Your Cuisine Type</h2>
        <p className={styles.paragraph}>
          Help customers find you by selecting the cuisine type that best describes your food.
        </p>
        <ol className={styles.list}>
          <li>Tap the <strong className={styles.strong}>Cuisines</strong> field</li>
          <li>
            A selection menu will appear with options like:
            <ul className={styles.nestedList}>
              <li>American</li>
              <li>BBQ</li>
              <li>Mexican</li>
              <li>Tex-Mex</li>
              <li>Latin</li>
              <li>Italian</li>
              <li>Mediterranean</li>
              <li>And more...</li>
            </ul>
          </li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/update-profile/04-cuisine-selector.png"
            alt="Cuisine selector showing a list of available cuisine types including American, BBQ, Mexican, and more"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Cuisine Selector</figcaption>
        </figure>
        <ol className={styles.list} start={3}>
          <li>Tap your cuisine type to select it</li>
          <li>Tap <strong className={styles.strong}>Save</strong> to confirm your selection</li>
        </ol>
      </section>

      <section id="saving-your-changes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Saving Your Changes</h2>
        <p className={styles.paragraph}>After making all your updates:</p>
        <ol className={styles.list}>
          <li>Review your changes to make sure everything looks correct</li>
          <li>Tap the orange <strong className={styles.strong}>Save</strong> button at the bottom of the screen</li>
          <li>Your profile will be updated and visible to customers immediately</li>
        </ol>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <ul className={styles.list}>
          <li>Changes are saved immediately when you tap Save</li>
          <li>Profile images may take a moment to upload depending on your connection speed</li>
          <li>Your profile information is visible to all StreetFeast users</li>
          <li>Keep your information accurate and up-to-date to attract more customers</li>
        </ul>
      </section>
    </>
  );
}
