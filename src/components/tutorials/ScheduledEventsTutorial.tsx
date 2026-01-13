import Image from "next/image";
import styles from "./tutorials.module.css";

export default function ScheduledEventsTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Scheduled events let your customers know when and where they can find your truck. Events appear on your truck&apos;s profile calendar and help customers plan their visits.
        </p>
      </section>

      <section id="accessing-the-schedule" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing the Schedule</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
          <li>Tap the <strong className={styles.strong}>Schedule</strong> tab at the bottom of the screen.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/01-schedule-calendar.png"
            alt="Schedule Calendar showing the current month with event indicators and Create New Event button"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Schedule Calendar</figcaption>
        </figure>
        <p className={styles.paragraph}>The calendar shows:</p>
        <ul className={styles.list}>
          <li>Current month view with navigation arrows</li>
          <li>Days with scheduled events are marked with colored dots</li>
          <li>Tap any day to see events for that date</li>
          <li>The <strong className={styles.strong}>Create New Event</strong> button at the bottom</li>
        </ul>
      </section>

      <section id="creating-a-new-event" className={styles.section}>
        <h2 className={styles.sectionTitle}>Creating a New Event</h2>
        <ol className={styles.list}>
          <li>From the Schedule screen, tap <strong className={styles.strong}>Create New Event</strong>.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/02-create-event-form.png"
            alt="Create Event Form showing fields for title, date, time, location, repeat, and menu"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Create Event Form</figcaption>
        </figure>
        <p className={styles.paragraph}>The event form includes:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Event Title</strong>: Name your event (e.g., &quot;Lunch at Downtown&quot;, &quot;Farmer&apos;s Market&quot;)</li>
          <li><strong className={styles.strong}>Date</strong>: Select the start date</li>
          <li><strong className={styles.strong}>Time</strong>: Set start and end times</li>
          <li><strong className={styles.strong}>Location</strong>: Choose where you&apos;ll be</li>
          <li><strong className={styles.strong}>Repeat</strong>: Set up recurring events</li>
          <li><strong className={styles.strong}>Menu</strong>: Select which menu to use during this event</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Setting the Date</h3>
        <p className={styles.paragraph}>Tap the <strong className={styles.strong}>Date</strong> field to open the date picker calendar.</p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/03-date-picker.png"
            alt="Date Picker calendar showing month navigation and selectable dates"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Date Picker</figcaption>
        </figure>
        <ul className={styles.list}>
          <li>Navigate between months using the arrows</li>
          <li>Tap a date to select it</li>
          <li>Tap <strong className={styles.strong}>Save</strong> to confirm your selection</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Setting the Time</h3>
        <p className={styles.paragraph}>Tap the <strong className={styles.strong}>Time</strong> field to set your event&apos;s hours.</p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/07-time-picker.png"
            alt="Time Picker showing start and end time selection with hours, minutes, and AM/PM"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Time Picker</figcaption>
        </figure>
        <ul className={styles.list}>
          <li>The left time is your start time</li>
          <li>The right time is your end time</li>
          <li>Scroll through hours, minutes, and AM/PM</li>
          <li>Tap <strong className={styles.strong}>Save</strong> to confirm</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Selecting a Location</h3>
        <p className={styles.paragraph}>Tap the <strong className={styles.strong}>Location</strong> field to choose where your event will be.</p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/08-location-picker.png"
            alt="Location Picker showing recent locations and option to add a new location"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Location Picker</figcaption>
        </figure>
        <p className={styles.paragraph}>Options include:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Recent Locations</strong>: Previously used locations for quick selection</li>
          <li><strong className={styles.strong}>Add New Location</strong>: Enter a new address or use the map</li>
        </ul>
      </section>

      <section id="setting-up-repeating-events" className={styles.section}>
        <h2 className={styles.sectionTitle}>Setting Up Repeating Events</h2>
        <p className={styles.paragraph}>
          The <strong className={styles.strong}>Repeat</strong> option lets you create recurring events automatically. This is essential for trucks with regular schedules.
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Repeat Options</h3>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/04-repeat-options.png"
            alt="Repeat Options showing Does not repeat, Every Day, Every Week, Every Month, and Every Year"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Repeat Options</figcaption>
        </figure>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong className={styles.strong}>Does not repeat</strong></td>
              <td>One-time event only</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Every Day</strong></td>
              <td>Event occurs every day at the same time</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Every Week</strong></td>
              <td>Event occurs on selected days each week</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Every Month</strong></td>
              <td>Event occurs on the same date each month</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Every Year</strong></td>
              <td>Event occurs on the same date each year</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Weekly Repeat Configuration</h3>
        <p className={styles.paragraph}>
          When you select <strong className={styles.strong}>Every Week</strong>, you can choose which days of the week the event should repeat.
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/05-weekly-repeat.png"
            alt="Weekly Repeat showing day selection buttons for S, M, T, W, T, F, S"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Weekly Repeat</figcaption>
        </figure>
        <p className={styles.paragraph}>Tap the day letters (S, M, T, W, T, F, S) to select or deselect days.</p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/scheduled-events/06-weekly-days-selected.png"
            alt="Weekly Repeat with Monday, Wednesday, and Friday selected"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Days Selected (M, W, F)</figcaption>
        </figure>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>End Repeat Options</h3>
        <p className={styles.paragraph}>You can also set when the repeating event should stop:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Never Ends</strong>: Event continues indefinitely</li>
          <li><strong className={styles.strong}>On [Date]</strong>: Event repeats until the specified end date</li>
        </ul>
      </section>

      <section id="common-repeating-patterns" className={styles.section}>
        <h2 className={styles.sectionTitle}>Common Repeating Patterns</h2>
        <p className={styles.paragraph}>Here are examples of how to set up common scheduling patterns:</p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Weekday Lunch Schedule</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Repeat</strong>: Every Week</li>
          <li><strong className={styles.strong}>Days</strong>: M, T, W, T, F (all weekdays)</li>
          <li><strong className={styles.strong}>Time</strong>: 11:00 AM - 2:00 PM</li>
          <li><strong className={styles.strong}>Use case</strong>: Daily lunch service at the same location</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Weekend Events Only</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Repeat</strong>: Every Week</li>
          <li><strong className={styles.strong}>Days</strong>: S, S (Saturday and Sunday)</li>
          <li><strong className={styles.strong}>Time</strong>: 10:00 AM - 4:00 PM</li>
          <li><strong className={styles.strong}>Use case</strong>: Weekend farmer&apos;s markets or events</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Weekly Food Truck Friday</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Repeat</strong>: Every Week</li>
          <li><strong className={styles.strong}>Days</strong>: F (Friday only)</li>
          <li><strong className={styles.strong}>Time</strong>: 5:00 PM - 9:00 PM</li>
          <li><strong className={styles.strong}>Use case</strong>: Weekly Friday night location</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Alternating Days (M/W/F Route)</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Repeat</strong>: Every Week</li>
          <li><strong className={styles.strong}>Days</strong>: M, W, F</li>
          <li><strong className={styles.strong}>Time</strong>: 11:00 AM - 2:00 PM</li>
          <li><strong className={styles.strong}>Use case</strong>: Rotating between different locations on different days</li>
        </ul>
      </section>

      <section id="selecting-a-menu-for-the-event" className={styles.section}>
        <h2 className={styles.sectionTitle}>Selecting a Menu for the Event</h2>
        <p className={styles.paragraph}>
          Tap the <strong className={styles.strong}>Menu</strong> field to choose which menu will be available during this event. This is useful if you have different menus for different types of events.
        </p>
      </section>

      <section id="creating-the-event" className={styles.section}>
        <h2 className={styles.sectionTitle}>Creating the Event</h2>
        <ol className={styles.list}>
          <li>Fill in all required fields (title, date, time, location)</li>
          <li>Configure repeat settings if needed</li>
          <li>Select a menu (optional)</li>
          <li>Tap the <strong className={styles.strong}>Create</strong> button</li>
        </ol>
        <p className={styles.paragraph}>The button is only active when all required fields are completed.</p>
      </section>

      <section id="managing-existing-events" className={styles.section}>
        <h2 className={styles.sectionTitle}>Managing Existing Events</h2>
        <p className={styles.paragraph}>Once created, events appear on your calendar:</p>
        <ul className={styles.list}>
          <li>Tap any day to see its events</li>
          <li>Tap an event to edit or delete it</li>
          <li>For repeating events, you can edit a single occurrence or all future occurrences</li>
        </ul>
      </section>

      <section id="tips-for-effective-scheduling" className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips for Effective Scheduling</h2>
        <ol className={styles.list}>
          <li><strong className={styles.strong}>Be consistent</strong>: Regular schedules help customers find you</li>
          <li><strong className={styles.strong}>Plan ahead</strong>: Schedule events in advance so customers can plan</li>
          <li><strong className={styles.strong}>Update promptly</strong>: If plans change, update your schedule immediately</li>
          <li><strong className={styles.strong}>Use descriptive titles</strong>: &quot;Downtown Lunch&quot; is better than &quot;Event 1&quot;</li>
          <li><strong className={styles.strong}>Set realistic hours</strong>: Include setup and breakdown time in your schedule</li>
        </ol>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <ul className={styles.list}>
          <li>Events are visible to all StreetFeast users</li>
          <li>Customers can set reminders for your events</li>
          <li>Conflicting events (overlapping times) will show a warning</li>
          <li>You can delete individual occurrences of repeating events without affecting the rest</li>
        </ul>
      </section>
    </>
  );
}
