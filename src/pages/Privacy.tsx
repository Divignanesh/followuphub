import {
  Bullets,
  Clause,
  Defs,
  LegalPage,
  Related,
  SubprocessorTable,
  legalLink,
} from "../components/Legal";
import { LEGAL, RETENTION } from "../lib/legal";
import { SITE } from "../lib/seo";

const M = `mailto:${SITE.email}`;

/**
 * Privacy policy, written against PIPEDA's ten fair information principles,
 * Quebec's Law 25, and CASL.
 *
 * The distinction the document is built around is the one most SaaS policies
 * get wrong: FollowUpHub is the organization accountable for information about
 * its *customers*, and a service provider acting on instructions for
 * information about those customers' *leads*. Those are different legal
 * postures with different rights attached, and a lead who asks FollowUpHub to
 * delete their record has to be routed to the agent who collected it.
 *
 * Dates, retention periods and the sub-processor list come from
 * src/lib/legal.ts rather than being written inline, so there is one place to
 * correct them. That file also lists the details still to be added.
 */
export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={LEGAL.effective}
      intro={
        <>
          This policy explains what personal information FollowUpHub collects, why we collect it,
          who we share it with and how you exercise your rights. It is written to meet the federal{" "}
          <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA), Quebec&rsquo;s
          Law 25, and the provincial privacy acts of Alberta and British Columbia. Your agreement
          with us is set out separately in our{" "}
          <a className={legalLink} href="/terms">terms of service</a>.
        </>
      }
      related={
        <Related
          items={[
            {
              href: "/terms",
              label: "Terms of service",
              note: "The agreement that governs your account, and the consent obligations you carry.",
            },
            {
              href: M,
              label: "Contact our Privacy Officer",
              note: `Access, correction and deletion requests go to ${SITE.email}.`,
            },
            {
              href: "/",
              label: "FollowUpHub",
              note: "Back to the platform, the plans and what the product does.",
            },
          ]}
        />
      }
    >
      <Clause id="who" heading="1. Who we are, and the two roles we hold">
        <p>
          FollowUpHub is a real estate follow-up platform operated from Canada. You can reach us
          about anything in this policy at{" "}
          <a className={legalLink} href={M}>{SITE.email}</a>.
        </p>
        <p>
          We hold personal information in two distinct capacities, and your rights differ depending
          on which one applies to you.
        </p>
        <Defs
          items={[
            [
              "Information about our customers",
              "When you open an account, we are the organization accountable for your information under PIPEDA. This policy governs it in full.",
            ],
            [
              "Information about your leads and contacts",
              "When you load contacts into FollowUpHub, or our AI calls, texts or emails them on your behalf, we act as a service provider processing that information on your instructions. You remain the organization accountable to those individuals. We do not sell it, and we do not use it to market to them for our own purposes.",
            ],
          ]}
        />
        <p>
          If you are a lead who has been contacted through FollowUpHub and you want your information
          corrected or deleted, the fastest route is the agent or brokerage that contacted you. You
          can also write to us at <a className={legalLink} href={M}>{SITE.email}</a>{" "}
          and we will identify the customer responsible and pass your request to them.
        </p>
      </Clause>

      <Clause id="collect" heading="2. What we collect">
        <Defs
          items={[
            ["Account information", "Name, business email, phone number, brokerage, billing address and payment details. Payment card data is handled by our payment processor; we never store full card numbers."],
            ["Usage information", "Pages visited, features used, device and browser type, IP address, and timestamps. Used to keep the service running and to find faults."],
            ["Customer content", "The contacts, conversations, notes, pipelines, calendars and campaign material you put into the platform."],
            ["Call recordings and transcripts", "Where you enable AI calling, the audio and a written transcript of those calls, together with the outcome and a sentiment score."],
            ["Support correspondence", "What you send us when you contact support, including attachments."],
          ]}
        />
      </Clause>

      <Clause id="purposes" heading="3. Why we collect it">
        <p>We identify our purposes before or at the time of collection. They are:</p>
        <Bullets
          items={[
            "To provide, maintain and secure the platform you have subscribed to.",
            "To place, receive, record and transcribe calls, and to send messages, where you have switched those features on.",
            "To bill you, and to recover unpaid amounts.",
            "To provide support and to investigate faults and abuse.",
            "To meet legal, regulatory, tax and audit obligations.",
            "To send you service messages about your account, and, with your consent, occasional product news.",
          ]}
        />
        <p>
          We do not use customer content to train general-purpose AI models, and we do not sell
          personal information to anyone.
        </p>
      </Clause>

      <Clause id="consent" heading="4. Consent, and how to withdraw it">
        <p>
          We rely on your express consent where the information is sensitive or the purpose would not
          be obvious, and on implied consent where it plainly follows from the service you asked for.
          You can withdraw consent at any time, subject to legal and contractual limits, by writing to{" "}
          <a className={legalLink} href={M}>{SITE.email}</a>. Withdrawing
          consent for something the service depends on may mean we can no longer provide it.
        </p>
        <p>
          <strong className="font-semibold text-ink">Consent for your contacts is yours to obtain.</strong>{" "}
          Under CASL you must have express or implied consent before sending a commercial electronic
          message, every message must identify you and carry a working unsubscribe, and under
          Canada&rsquo;s telemarketing rules you are responsible for the National Do Not Call List and for
          calling only within permitted hours. FollowUpHub gives you the controls; the consent
          obligation stays with you, and it is set out in full in{" "}
          <a className={legalLink} href="/terms#consent">section 6 of our terms</a>.
        </p>
      </Clause>

      <Clause id="recording" heading="5. Call recording">
        <p>
          Where AI calling is enabled, calls are recorded and transcribed. The Office of the Privacy
          Commissioner requires that a person be told at the start of a call that it is being
          recorded, told why, and given the choice to continue. Our AI states this at the opening of
          every call. If the person continues, consent is implied; if they object, the recording
          stops.
        </p>
        <p>
          Recordings are used for the purpose stated on the call and for no other. They are retained
          for as long as your account is active unless you delete them sooner, and you can delete any
          recording from the platform at any time.
        </p>
      </Clause>

      <Clause id="automated" heading="6. Automated processing and AI">
        <p>
          FollowUpHub uses automated systems to decide when to contact a lead, what to say, how to
          score sentiment, and when to hand a conversation to a person. These decisions affect
          scheduling and prioritisation. They do not by themselves determine access to credit,
          housing, employment or any other entitlement.
        </p>
        <p>
          Where Law 25 applies, you may ask us to confirm that a decision was made by automated means,
          to tell you what personal information was used, and to have the decision reviewed by a
          person. Write to <a className={legalLink} href={M}>{SITE.email}</a>.
        </p>
      </Clause>

      <Clause id="sharing" heading="7. Who we share it with">
        <p>
          We share personal information only with the service providers below, each under a contract
          that limits them to our instructions and to a comparable standard of protection. We update
          this list when a provider changes.
        </p>
        <SubprocessorTable />
        <p>
          We will also disclose information where the law requires it, to enforce{" "}
          <a className={legalLink} href="/terms">our terms</a>, or to protect the rights and safety of
          any person. If FollowUpHub is ever involved in a merger or sale, information may transfer as
          part of that transaction, and you will be told.
        </p>
      </Clause>

      <Clause id="transfers" heading="8. Where your information is processed">
        <p>
          FollowUpHub is operated from Canada. As the table above shows, several of our service
          providers process information in the United States. While it is in another country, that
          information is subject to the laws of that country and may be accessible to its courts and
          public authorities.
        </p>
        <p>
          PIPEDA permits these transfers provided we remain accountable for the information and use
          contractual means to protect it, which we do. We are telling you here because transparency
          about cross-border processing is required, not optional.
        </p>
      </Clause>

      <Clause id="retention" heading="9. How long we keep it">
        <p>
          We keep personal information only as long as it serves the purpose it was collected for, or
          as long as the law requires.
        </p>
        <Defs items={RETENTION} />
      </Clause>

      <Clause id="safeguards" heading="10. How we protect it">
        <p>
          We apply safeguards proportionate to the sensitivity of the information: encryption in
          transit and at rest, access limited to staff who need it for their role, logged
          administrative access, and regular review. No system is perfectly secure, and we do not
          claim otherwise.
        </p>
        <p>
          If a breach creates a real risk of significant harm, we will report it to the Office of the
          Privacy Commissioner of Canada and notify affected individuals as soon as feasible, keep a
          record of it as PIPEDA requires, and, where Quebec residents are affected, notify the
          Commission d&rsquo;acc&egrave;s &agrave; l&rsquo;information.
        </p>
      </Clause>

      <Clause id="access" heading="11. Your rights">
        <Bullets
          items={[
            "Access. Ask what personal information we hold about you, how it has been used, and who it has been disclosed to.",
            "Correction. Have inaccurate or incomplete information corrected.",
            "Withdrawal. Withdraw consent, subject to legal and contractual limits.",
            "Deletion. Ask us to delete information we no longer need.",
            "Portability. Where Law 25 applies, receive your computerised personal information in a structured, commonly used technological format.",
            "Complaint. Challenge our compliance, with us first and then with a regulator.",
          ]}
        />
        <p>
          Write to <a className={legalLink} href={M}>{SITE.email}</a>. We
          respond within 30 days and will tell you in advance if we need an extension. There is no
          charge for a reasonable request. We may need to verify your identity before we act.
        </p>
      </Clause>

      <Clause id="cookies" heading="12. Cookies">
        <p>
          Our website uses cookies that are strictly necessary to make it work, and analytics cookies
          that tell us which pages are read. We do not use advertising cookies or sell browsing data.
          You can refuse or delete cookies in your browser; the site will still work, though some
          preferences will not persist.
        </p>
      </Clause>

      <Clause id="children" heading="13. Children">
        <p>
          FollowUpHub is a business tool and is not directed at children. We do not knowingly collect
          personal information from anyone under 16. If you believe a child&rsquo;s information has reached
          us, write to us and we will delete it.
        </p>
      </Clause>

      <Clause id="complaints" heading="14. Accountability and complaints">
        <p>
          Our {LEGAL.officerTitle} is accountable for compliance with this policy and can be
          reached at <a className={legalLink} href={M}>{SITE.email}</a>. Please raise any concern
          with us first, so we can investigate and respond.
        </p>
        <p>
          If you are not satisfied, you may complain to the Office of the Privacy Commissioner of
          Canada at priv.gc.ca. Quebec residents may complain to the Commission d&rsquo;acc&egrave;s &agrave;
          l&rsquo;information. Residents of Alberta and British Columbia may complain to their provincial
          Information and Privacy Commissioner.
        </p>
      </Clause>

      <Clause id="changes" heading="15. Changes to this policy">
        <p>
          We will update this policy as the service and the law change. The date at the top always
          reflects the current version. If a change materially affects how we handle your information,
          we will tell you by email or in the platform before it takes effect.
        </p>
      </Clause>
    </LegalPage>
  );
}
