import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sweepstakes Terms and Conditions',
  description: 'Read the official rules, terms, and conditions for the StreetFeast $1,000 Sweepstakes.',
  openGraph: {
    title: 'Sweepstakes Terms and Conditions | StreetFeast',
    description: 'Read the official rules, terms, and conditions for the StreetFeast $1,000 Sweepstakes.',
    url: 'https://streetfeastapp.com/giveaway',
  },
};

export default function GiveawayTerms() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Sweepstakes Terms &amp; Conditions</h1>
        <p className={styles.lastUpdated}>StreetFeast $1,000 Sweepstakes — Official Rules</p>

        <section className={styles.section}>
          <p>
            NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER OR WIN. A PURCHASE OR PAYMENT OF ANY KIND
            WILL NOT INCREASE OR IMPROVE YOUR CHANCES OF WINNING.
          </p>
          <p>
            You are not authorized to participate in the Sweepstakes if you are not located within
            the fifty (50) United States or within the District of Columbia. Void where prohibited
            by law. This Sweepstakes shall not be published without the written permission of the
            Sponsor.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Eligibility</h2>
          <p>
            The Sweepstakes is open only to legal residents of the fifty (50) States that comprise
            the United States of America and the District of Columbia, who are eighteen (18) years
            of age or older or the age of majority in their eligible place of residence (which is
            nineteen (19) in Alabama and Nebraska; twenty-one (21) in Mississippi, and eighteen (18)
            in all other States and in the District of Columbia) as of the date of entry (the
            &quot;Entrant&quot;). Void outside of the fifty (50) States that comprise the United
            States of America, the District of Columbia and where prohibited, taxed or restricted by
            law. The Entrant&apos;s proof of residency and age may be required.
          </p>
          <p>
            Officers, directors, managers and employees of Streetfeast (the &quot;Sponsor&quot;) and
            each of its respective parents, subsidiaries, divisions, affiliates, and related
            companies and their respective advertising or promotional agencies, consultants and
            agents, as well as Immediate Family Members and/or Household Members of each such
            person, and any others engaged in the development, production, execution or distribution
            of this Sweepstakes (collectively the &quot;Sweepstakes Entities&quot;) are not eligible
            to participate and household members of such individuals, are not eligible to enter or
            win.
          </p>
          <p>
            &quot;Immediate Family Members&quot; shall mean parents, stepparents, children,
            stepchildren, siblings, step-siblings, spouses, brother in-law, or sister in-law
            regardless of where they live. &quot;Household Members&quot; shall mean people who share
            the same residence at least three months a year, whether related or not.
          </p>
          <p>
            To enter the Sweepstakes or receive a prize, you must fully comply with the Official
            Rules and, by entering, you represent and warrant that you agree to be bound by these
            Official Rules and the decisions of the Sponsor, whose decisions shall be binding and
            final in all respects relating to this Sweepstakes. The Sweepstakes may only be entered
            in or from the fifty (50) United States and the District of Columbia, and entries
            originating from any other jurisdiction are not eligible for entry. All federal, state
            and local laws and regulations apply. The Sweepstakes is governed by these Official
            Rules and is subject to all applicable federal, state, and local laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Dates of Sweepstakes</h2>
          <p>
            The Sweepstakes includes all registered users of the StreetFeast app prior to May 2,
            2026 at 12:00 PM Central Time (the &quot;Sweepstakes Period&quot;).
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. How to Enter</h2>
          <p>
            Within the Sweepstakes Period the Entrant must download the StreetFeast app by
            navigating to{' '}
            <a href="https://www.streetfeastapp.com/download">
              https://www.streetfeastapp.com/download
            </a>{' '}
            and then registering during the Sweepstakes Period to receive one (1) entry into the
            Sweepstakes. Registering for the StreetFeast app is free. Limit of one (1) entry into
            the Sweepstakes per person or company.
          </p>
          <p>
            Registering for the StreetFeast app multiple times by the same individual or company is
            prohibited and will result in disqualification of all entries into the Sweepstakes by
            that individual or company. By entering the Sweepstakes, Entrants fully and
            unconditionally agree to be bound by these Official Rules and the decisions of the
            Sponsor and Sweepstakes Entities, which will be final and binding in all matters
            relating to the Sweepstakes.
          </p>
          <p>
            Entries into the Sweepstakes submitted by anyone other than the Entrant are void. In
            case of dispute as to the identity of any Entrant, the Sweepstakes entry will be
            declared made by the registered name and address on such entry. Any potential prize
            winner of the Sweepstakes may be requested to provide Sponsor with proof that such
            person is the prize winner and that person is eligible to win said prize.
          </p>
          <p>
            Any attempt by any person or company to obtain more than one entry into the Sweepstakes
            by using multiple/different email addresses, registrations and logins, or any other
            methods will void that person&apos;s or company&apos;s entries in their entirety and
            that person or company will be disqualified.
          </p>
          <p>
            Use of any automated system to participate in the Sweepstakes is strictly prohibited and
            will result in disqualification.
          </p>
          <p>
            Neither Sponsor nor any Sweepstakes Entity is responsible for lost, late, incomplete,
            invalid, unintelligible or misdirected registrations, including, but not limited to
            whether due to system errors, omissions, interruption, deletions, defects, delay in
            operations or transmissions, theft or destruction or failures, faulty transmissions or
            other telecommunications malfunctions, human error, entries not received resulting from
            any hardware or software failures of any kind, lost or unavailable network connections,
            failed, incomplete or garbled computer transmissions, typographical or system errors and
            failures, faulty transmissions, technical malfunctions, or otherwise. Only fully
            completed entries are eligible, all other entries will be disqualified. Proof of
            submission will not be deemed to be proof of receipt by Sponsor or Sweepstakes Entity.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Winner Determination</h2>
          <p>
            On May 2, 2026 at 1PM Central Time at 302 State St, Bowling Green, Kentucky 42101, the
            Sponsor will conduct a live random drawing of all valid and eligible entries received by
            the Sponsor and Sponsor will announce all winners at said live drawing.
          </p>
          <p>
            Failure by potential Sweepstakes winner to be present at the live drawing and respond
            when chosen as a winner will result in disqualification and the Sponsor will select an
            alternate potential Sweepstakes winner, at Sponsor&apos;s sole discretion, at random
            from among the remaining non-winning eligible entries received during the Sweepstakes
            Period in the same manner. Limit of one (1) Grand Prize per person for the Sweepstakes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Prizes</h2>
          <p>
            Twenty (20) grand prizes will be awarded, each consisting of a $50.00 in cash (each a
            &quot;Grand Prize&quot;). Total approximate retail value (&quot;ARV&quot;) of all Grand
            Prizes is $1,000.
          </p>
          <p>
            Winner is responsible for all taxes, duties, and fees associated with prize receipt
            and/or use. All federal, state, and local tax liabilities, as well as any other costs
            and expenses not specified herein as being awarded are the sole responsibility of the
            winner. Winner may be required to complete and return an IRS W-9 form (i.e. Request for
            Taxpayer Identification Number and Certification). A Grand Prize will be awarded only if
            the winner fully complies with these Official Rules.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Odds</h2>
          <p>
            Odds of winning a prize depend on the number of valid and eligible entries received
            during the Sweepstakes Period.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Verification of Potential Sweepstakes Winners</h2>
          <p>
            POTENTIAL SWEEPSTAKES WINNERS ARE SUBJECT TO VERIFICATION BY SPONSOR. SPONSOR&apos;S
            DECISIONS ARE FINAL AND BINDING IN ALL MATTERS RELATED TO THE ADMINISTRATION, OPERATION,
            SELECTION OF THE WINNER AND OTHER MATTERS RELATED TO THE SWEEPSTAKES.
          </p>
          <p>
            Potential Sweepstakes winners may be required to complete and return an Affidavit of
            Eligibility, Release of Liability and Publicity Release (where permitted by law)
            (collectively, the &quot;Affidavit&quot;) by the date specified by Sponsor, or an
            alternate potential Sweepstakes winner may be selected by the Sponsor.
          </p>
          <p>
            In the event: (a) the Affidavit is not completed; (b) the potential Sweepstakes winner
            declines or cannot accept, receive or use the prize for any reason; (c) of
            noncompliance with the above or within any of the aforesaid time periods; (d) the
            potential Sweepstakes winner is found to be ineligible to enter the Sweepstakes or
            receive the prize; (e) the potential Sweepstakes winner cannot or does not comply with
            the Official Rules; or (f) the potential Sweepstakes winner fails to fulfill the
            Affidavit-related obligations, then the potential Sweepstakes winner shall be
            disqualified from the Sweepstakes and an alternate potential Sweepstakes winner may be
            selected, at Sponsor&apos;s sole discretion, at random from among the remaining
            non-winning eligible entries received during the Sweepstakes Period.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Entry Conditions and Release</h2>
          <p>
            The Sweepstakes is conducted in English. All federal, state, and local tax liabilities,
            as well as any other costs and expenses not specified herein as being awarded are the
            sole responsibility of the winner. Sponsor reserves the right to disqualify permanently
            from this Sweepstakes any Entrant that Sponsor believes has violated these Official
            Rules and to verify the eligibility of Entrants. Neither Sponsor nor anyone acting on
            its behalf will enter into any communications with any Entrant regarding this
            Sweepstakes, except as expressly set forth in these Official Rules.
          </p>
          <p>
            Each Entrant agrees to: (a) comply with and be bound by these Official Rules and the
            decisions of Sponsor which are binding and final in all matters relating to this
            Sweepstakes; (b) defend, indemnify, release and hold harmless the Sponsor and its
            respective parent, subsidiary, and affiliated companies, celebrities, and any other
            person and organization responsible for sponsoring, fulfilling, administering,
            advertising or promoting the Sweepstakes, and all of their respective past and present
            officers, directors, employees, agents and representatives (collectively, the
            &quot;Released Parties&quot;) from and against any and all claims, expenses, and
            liability, including but not limited to negligence and damages of any kind to persons
            and property, including but not limited to invasion of privacy, defamation, slander,
            libel, violation of right of publicity, infringement of trademark, copyright or other
            intellectual property rights, property damage, or death or personal injury arising out
            of or relating to a participant&apos;s entry, creation of an entry or submission of an
            entry, participation in the Sweepstakes, acceptance, possession, attendance at, defect
            in, delivery of, inability to use, use or misuse of prize and/or the broadcast,
            exploitation or use of entry. Winner acknowledges that all prizes are awarded as-is
            without warranty of any kind.
          </p>
          <p>
            By participating in this Sweepstakes, Entrants release the Sponsor and each and all of
            the Sweepstakes Entities, from any and all liability, damages or causes of action
            (however named or described) with respect to or arising out of participation in the
            Sweepstakes, and/or the receipt or use/misuse of any prize awarded, including, without
            limitation, liability for personal injury, death or property damage.
          </p>
          <p>
            Failure to comply with these Official Rules may result in disqualification from the
            Sweepstakes. All Sweepstakes materials are subject to verification and are void if:
            (a) not obtained in accordance with these Official Rules and through legitimate
            channels; (b) any part is counterfeited, altered, defective, damaged, illegible,
            reproduced, tampered with, mutilated or irregular in any way; (c) are obtained where
            prohibited; or (d) they contain printing, typographical, mechanical, or other errors.
          </p>
          <p>
            Entrants assume all risk of loss, damage, destruction, delay or misdirection of
            Sweepstakes materials submitted to Sponsor. In the event any portion of this Sweepstakes
            is compromised by activities beyond the control of the Sponsor which, in the sole
            opinion of the Sponsor, corrupt or impair the administration, security, fairness or
            proper play of the Sweepstakes or this Sweepstakes, Sponsor reserves the right at its
            sole discretion to modify, suspend or terminate the Sweepstakes.
          </p>
          <p>
            Sponsor may prohibit an Entrant from participating in the Sweepstakes or winning a prize
            if, in Sponsor&apos;s sole discretion, the Sponsor determines that said Entrant is
            attempting to undermine the legitimate operation of the Sweepstakes by cheating,
            deception, or other unfair playing practices or intending to annoy, abuse, threaten or
            harass any other Entrants, Sponsor, or Sweepstakes Entities.
          </p>
          <p>
            If for any reason this Sweepstakes is not able to be conducted as planned, including,
            but not limited to, by reason of infection by computer virus, bugs, tampering,
            unauthorized intervention, fraud or any other causes beyond the reasonable control of
            Sponsor which corrupt or affect the administration, security, fairness, integrity or
            proper conduct of the Sweepstakes, then Sponsor reserves the right at its sole
            discretion to cancel, terminate, modify or suspend the Sweepstakes and randomly draw
            from those entries received up to the cancellation/suspension date to award prizes.
          </p>
          <p>
            CAUTION: ANY ATTEMPT TO DELIBERATELY DAMAGE OR UNDERMINE THE LEGITIMATE OPERATION OF THE
            SWEEPSTAKES MAY BE IN VIOLATION OF CRIMINAL AND CIVIL LAWS AND SHOULD SUCH AN ATTEMPT
            BE MADE, SPONSOR RESERVES THE RIGHT TO SEEK REMEDIES AND DAMAGES (INCLUDING BUT NOT
            LIMITED TO ATTORNEY&apos;S FEES) FROM ANY SUCH PERSON TO THE FULLEST EXTENT OF THE LAW,
            INCLUDING BUT NOT LIMITED TO CRIMINAL PROSECUTION. SPONSOR&apos;S FAILURE TO ENFORCE ANY
            TERM OF THESE OFFICIAL RULES SHALL NOT CONSTITUTE A WAIVER OF THESE PROVISIONS.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Publicity and Marketing Communications</h2>
          <p>
            Except where prohibited or restricted by law, winner&apos;s acceptance of prize
            constitutes the winner&apos;s agreement and consent for Sponsor and any of its designees
            to use and/or publish winner&apos;s full name, city and state of residence, photographs
            or other likenesses, pictures, portraits, video, voice, testimonials, biographical
            information (in whole or in part), and/or statements made by winner regarding the
            Sweepstakes or Sponsor, worldwide and in perpetuity for any and all purposes, including,
            but not limited to, advertising, trade and/or promotion on behalf of Sponsor, in any and
            all forms of media, now known or hereafter devised, including, but not limited to,
            print, TV, radio, electronic, cable, or World Wide Web, without further limitation,
            restriction, compensation, notice, review, or approval.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. No Liability</h2>
          <p>
            By participating, Entrants and prize winners agree to release, discharge, indemnify and
            hold harmless the Sponsor, the Sweepstakes Entities, and each of their respective
            officers, directors, employees, representatives and agents (collectively, the
            &quot;Released Parties&quot;) from and against any claims made by any Entrant, prize
            winner, or any other third parties, related in any way to the operation of this
            Sweepstakes as well as any other claims, damages or liability due to any injuries,
            damages or losses to any person (including, but not limited to death) or property of any
            kind resulting in whole or in part, directly or indirectly, from receipt, acceptance,
            possession, misuse or use of a prize or participation in any promotion related activity
            or participation in this Sweepstakes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. General Conditions</h2>
          <p>
            Sponsor and its subsidiaries, affiliates, divisions, partners, representatives, agents,
            successors, assigns, employees, officers and directors shall not have any obligation or
            responsibility, including any responsibility to award any prize to entrants, with regard
            to:
          </p>
          <ul>
            <li>
              Entries that contain inaccurate information or do not comply with or violate the
              Official Rules;
            </li>
            <li>
              Entries, prize claims or notifications that are lost, late, incomplete, illegible,
              unintelligible, damaged or otherwise not received by the intended recipient, in whole
              or in part, due to computer, human or technical error of any kind;
            </li>
            <li>
              Entrants who have committed fraud or deception in entering or participating in the
              Sweepstakes or claiming the prize;
            </li>
            <li>
              Telephone, electronic, hardware, software, network, Internet or computer malfunctions,
              failures or difficulties;
            </li>
            <li>
              Any inability of the winner to accept the prize for any reason;
            </li>
            <li>
              If a prize cannot be awarded due to delays or interruptions due to Acts of God,
              natural disasters, terrorism, weather or any other similar event beyond Sponsor&apos;s
              reasonable control; or
            </li>
            <li>
              Any damages, injuries or losses of any kind caused by any prize or resulting from
              awarding, acceptance, possession, use, misuse, loss or misdirection of any prize or
              resulting from participating in this Sweepstakes or any promotion or prize related
              activities.
            </li>
          </ul>
          <p>
            Sponsor reserves the right, in its sole discretion, to disqualify any individual it
            finds to be: (i) tampering with the entry process or the operation of the Sweepstakes,
            or with any Website promoting the Sweepstakes; (ii) acting in violation of the Official
            Rules; or (iii) entering or attempting to enter the Sweepstakes multiple times through
            the use of multiple email addresses or the use of any robotic or automated devices to
            submit entries.
          </p>
          <p>
            If Sponsor determines, in its sole discretion, that technical difficulties or unforeseen
            events compromise the integrity or viability of the Sweepstakes, Sponsor reserves the
            right to void the entries at issue, and/or terminate the relevant portion of the
            Sweepstakes, including the entire Sweepstakes, and/or modify the Sweepstakes and/or
            award the prize from all eligible entries received as of the termination date.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Limitations of Liability</h2>
          <p>
            The Released Parties are not responsible for: (a) any incorrect or inaccurate
            information, whether caused by entrants, printing errors or by any of the equipment or
            programming associated with or utilized in the Sweepstakes; (b) technical failures of
            any kind, including, but not limited to malfunctions, interruptions, or disconnections in
            phone lines or network hardware or software; (c) unauthorized human intervention in any
            part of the entry process or the Sweepstakes; (d) technical or human error in the
            administration of the Sweepstakes or the processing of registrations; or (e) any injury
            or damage to persons or property which may be caused, directly or indirectly, in whole
            or in part, from entrant&apos;s participation in the Sweepstakes or receipt or use or
            misuse of any prize.
          </p>
          <p>
            If for any reason an entrant&apos;s registration is confirmed to have been erroneously
            deleted, lost, or otherwise destroyed or corrupted, entrant&apos;s sole remedy is
            another entry in the Sweepstakes. No more than the stated number of each prize will be
            awarded.
          </p>
          <p>
            By participating, Entrants and prize winners agree to release, discharge, indemnify and
            hold harmless the Sponsor, the Sweepstakes Entities, and each of their respective
            officers, directors, employees, representatives and agents (collectively, the
            &quot;Released Parties&quot;) from and against any claims made by any Entrant, prize
            winner, or any other third parties, related in any way to the operation of this
            Sweepstakes as well as any other claims, damages or liability due to any injuries,
            damages or losses to any person (including death) or property of any kind resulting in
            whole or in part, directly or indirectly, from receipt, acceptance, possession, misuse
            or use of a prize or participation in any promotion related activity or participation in
            this Sweepstakes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Disputes</h2>
          <p>
            <strong>
              PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR
              RIGHT TO FILE A LAWSUIT IN COURT AND TO HAVE A JURY HEAR YOUR CLAIMS.
            </strong>
          </p>

          <h3>13.1 Informal Resolution</h3>
          <p>
            As a condition precedent to initiating any arbitration or court proceeding, Entrant and
            StreetFeast agree to first attempt to resolve any dispute, claim, or controversy arising
            out of or relating to these Terms or the Service (&quot;Dispute&quot;) informally. The
            party asserting the Dispute shall send written notice to the other party describing the
            facts and circumstances of the Dispute, including any supporting documentation. For
            notices to StreetFeast, please send to:{' '}
            <a href="mailto:customer-support@streetfeastapp.com">
              customer-support@streetfeastapp.com
            </a>
            . For notices to you, StreetFeast will use the email address or phone number associated
            with your registration. The receiving party shall have thirty (30) days from receipt of
            such notice to respond to or attempt to resolve the Dispute. Neither party may initiate
            arbitration or court proceedings until this thirty (30) day period has expired.
          </p>

          <h3>13.2 Binding Arbitration</h3>
          <p>
            If a Dispute cannot be resolved through the informal resolution process described above,
            the Dispute shall be exclusively and finally resolved by binding individual arbitration
            administered by the American Arbitration Association (&quot;AAA&quot;) in accordance with
            its Consumer Arbitration Rules (&quot;AAA Rules&quot;), as modified by this Section. The
            AAA Rules are available at www.adr.org or by calling the AAA at (800) 778-7879. Entrant
            and StreetFeast each expressly delegate to the arbitrator the authority to determine the
            arbitrability of any Dispute, including but not limited to the scope, applicability,
            validity, and enforceability of this arbitration provision.
          </p>
          <p>
            The arbitration shall be conducted by a single arbitrator selected in accordance with the
            AAA Rules. Entrant may elect to have the arbitration conducted by telephone, video
            conference, or other remote means, based on written submissions, or in person in the
            county where you reside or at another mutually agreed location. The arbitration shall be
            conducted in the English language. Each party shall be responsible for paying its own
            attorneys&apos; fees, costs, and expenses in connection with the arbitration, unless
            otherwise required by applicable law or as determined by the arbitrator pursuant to the
            AAA Rules. The arbitrator may award on an individual basis any relief that would be
            available in a court, including but not limited to injunctive or declaratory relief, and
            must follow and enforce these Official Rules as a court would. The arbitrator shall issue
            a reasoned written decision sufficient to explain the essential findings and conclusions
            on which the award is based. Any arbitration proceedings shall be confidential, and
            neither party may disclose the existence, content, or results of any arbitration except
            as required by law or for purposes of enforcement of the arbitration award. Judgment on
            any arbitration award may be entered in any court of competent jurisdiction.
          </p>

          <h3>13.3 Arbitration Fees</h3>
          <p>
            Payment of all filing, administration, and arbitrator fees will be governed by the AAA
            Rules. If Entrant demonstrates that the costs of arbitration will be prohibitive as
            compared to the costs of litigation, StreetFeast will pay as much of the filing,
            administration, and arbitrator fees as the arbitrator deems necessary to prevent the
            arbitration from being cost-prohibitive.
          </p>
          <p>
            This arbitration provision is made pursuant to a transaction involving interstate
            commerce and shall be governed by the Federal Arbitration Act, 9 U.S.C. &sect; 1 et
            seq., and not by state arbitration law.
          </p>

          <h3>13.4 Class Action and Jury Waiver</h3>
          <p>
            ENTRANT AND STREETFEAST EACH AGREE THAT ANY DISPUTE SHALL BE CONDUCTED ONLY ON AN
            INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. ENTRANT AND
            STREETFEAST EACH WAIVE THE RIGHT TO A TRIAL BY JURY. ENTRANT AND STREETFEAST EACH WAIVE
            THE RIGHT TO PARTICIPATE IN A CLASS ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER
            REPRESENTATIVE OR COLLECTIVE ACTION. If a court or arbitrator determines that this class
            action waiver is unenforceable as to a particular Dispute, then the arbitration agreement
            in this Section shall be deemed void as to that Dispute, and such Dispute shall proceed
            in a court of competent jurisdiction.
          </p>

          <h3>13.5 Exceptions</h3>
          <p>
            Notwithstanding the foregoing: (a) either party may bring an individual claim in small
            claims court consistent with the jurisdictional and dollar limits that may apply, provided
            the claim is brought and maintained as an individual claim; and (b) either party may seek
            injunctive or other equitable relief in a court of competent jurisdiction to prevent the
            actual or threatened infringement, misappropriation, or violation of intellectual
            property rights or confidential information.
          </p>

          <h3>13.6 Statute of Limitations</h3>
          <p>
            Entrant agrees that any Dispute must be commenced within one (1) year after the claim
            arises; otherwise, such Dispute is permanently barred. This provision shall not modify
            any statutory limitation period that cannot be shortened by agreement under applicable
            law.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Use of Data</h2>
          <p>
            Sponsor will be collecting personal data about Entrants online, in accordance with its
            Privacy Policy. Please review the Sponsor&apos;s Privacy Policy. By participating in the
            Sweepstakes, Entrants hereby agree to Sponsor&apos;s collection and usage of their
            personal information and acknowledge that they have read and accepted Sponsor&apos;s
            Privacy Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>15. Sweepstakes Results</h2>
          <p>
            To obtain the prize winner list, send us an Email to{' '}
            <a href="mailto:customer-support@streetfeastapp.com">
              customer-support@streetfeastapp.com
            </a>{' '}
            or contact us on our Website at{' '}
            <a href="https://www.streetfeastapp.com/contact">streetfeastapp.com/contact</a>.
            Requests must be received within two months of the end of the Sweepstakes Period.
          </p>
        </section>
      </main>
    </div>
  );
}
