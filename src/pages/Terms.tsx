import { Bullets, Clause, Defs, LegalPage, ReviewNotice } from "../components/Legal";
import { SITE } from "../lib/seo";

const M = `mailto:${SITE.email}`;

/**
 * Terms of service.
 *
 * The clause that earns its place is section 6: the customer, not FollowUpHub,
 * carries the CASL consent obligation and the Do Not Call List obligation for
 * the contacts they load. A platform that dials and messages on instruction
 * has to say plainly whose obligation that is, because the penalties under
 * CASL run to millions and the customer is the one who holds the consent.
 */
export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated="22 September 2026"
      intro={
        <>
          These terms govern your use of FollowUpHub. By opening an account or using the platform you
          agree to them. Please read section 6, which sets out the consent obligations you carry when
          you contact people through the platform.
        </>
      }
    >
      <div className="pb-2">
        <ReviewNotice />
      </div>

      <Clause id="definitions" heading="1. Definitions">
        <Defs
          items={[
            ["FollowUpHub, we, us", "FollowUpHub, operating in Canada."],
            ["You, the customer", "The individual or business that opens an account."],
            ["Platform", "The FollowUpHub software, its websites, APIs and related services."],
            ["Customer content", "Everything you put into the platform: contacts, conversations, pipelines, campaigns, files and settings."],
            ["Contact", "A person whose information you load into, or who is contacted through, the platform."],
          ]}
        />
      </Clause>

      <Clause id="account" heading="2. Your account">
        <p>
          You must be at least 18 and able to enter a contract. You are responsible for the accuracy
          of your account details, for everything done under your credentials, and for keeping those
          credentials secure. Tell us promptly at{" "}
          <a className="font-semibold text-teal underline underline-offset-4" href={M}>{SITE.email}</a> if you
          believe your account has been compromised.
        </p>
      </Clause>

      <Clause id="trial" heading="3. Free trial">
        <p>
          Both plans include a 14-day free trial with no card required. If you do not continue, the
          account pauses at the end of the trial. Your data stays exportable either way for the
          period set out in our privacy policy.
        </p>
      </Clause>

      <Clause id="fees" heading="4. Fees and billing">
        <Defs
          items={[
            ["Basic", "$49.99 CAD per month, or $499.90 CAD per year."],
            ["Advanced", "$49.99 CAD per month, or $499.90 CAD per year, plus a one-time setup fee of $299 CAD."],
          ]}
        />
        <p>
          Fees are in Canadian dollars and exclusive of applicable taxes, which are added at checkout.
          Subscriptions renew automatically for the same period until cancelled. Message, call and
          telephony charges passed through by carriers are billed in addition where your usage exceeds
          the allowances described at the point of sale.
        </p>
        <p>
          You may cancel at any time from your account settings. Cancellation takes effect at the end
          of the current billing period, and there is no cancellation fee. Except where Canadian
          consumer protection law requires otherwise, fees already paid are not refundable, and the
          setup fee is not refundable once onboarding has begun.
        </p>
        <p>
          We may change our prices. Existing subscribers get at least 30 days&rsquo; notice before a change
          applies to their renewal, and may cancel before it takes effect.
        </p>
      </Clause>

      <Clause id="use" heading="5. Acceptable use">
        <p>You agree not to use the platform to:</p>
        <Bullets
          items={[
            "Send messages or place calls to people who have not consented, or who have withdrawn consent.",
            "Send anything unlawful, deceptive, harassing, or designed to impersonate another person or business.",
            "Upload contact lists you bought, scraped, or otherwise obtained without a lawful basis.",
            "Circumvent the platform's rate limits, calling windows, or unsubscribe handling.",
            "Reverse engineer the platform, resell access without our written agreement, or probe it for vulnerabilities without permission.",
            "Break any law that applies to you, including telecommunications, privacy, anti-spam, fair housing and real estate advertising rules.",
          ]}
        />
        <p>
          We may suspend an account that puts the platform, our carriers or other customers at risk,
          and will tell you why.
        </p>
      </Clause>

      <Clause id="consent" heading="6. Consent, anti-spam and do-not-call obligations">
        <p>
          <strong className="font-semibold text-ink">
            The platform acts on your instructions, and the consent obligation is yours.
          </strong>{" "}
          You confirm that for every contact you load or message, you hold the consent that the law
          requires.
        </p>
        <Bullets
          items={[
            <>
              <strong className="font-semibold text-ink">CASL.</strong> Every commercial electronic
              message needs express or implied consent, must identify you, and must carry a working
              unsubscribe that you honour promptly. Keep your records of consent.
            </>,
            <>
              <strong className="font-semibold text-ink">Do Not Call.</strong> You are responsible for
              subscribing to and screening against Canada&rsquo;s National Do Not Call List, for honouring
              internal do-not-call requests, and for the equivalent rules in any other jurisdiction
              you call into.
            </>,
            <>
              <strong className="font-semibold text-ink">Calling hours.</strong> You are responsible
              for configuring calling windows that comply with the rules where the contact is
              located.
            </>,
            <>
              <strong className="font-semibold text-ink">Recording notice.</strong> AI calls are
              recorded. The platform announces this at the start of each call so consent can be given
              or refused; you must not disable or alter that announcement.
            </>,
            <>
              <strong className="font-semibold text-ink">Privacy.</strong> You are the organization
              accountable to your contacts under PIPEDA, and you must have given them the notice and
              choices the law requires.
            </>,
          ]}
        />
        <p>
          You indemnify us against claims, penalties and costs arising from your failure to meet these
          obligations.
        </p>
      </Clause>

      <Clause id="data" heading="7. Customer content and data processing">
        <p>
          You own your customer content. You grant us the limited licence needed to host, process,
          transmit and display it in order to run the platform for you, and for no other purpose. We
          process personal information within it as your service provider, on your documented
          instructions, as described in our privacy policy.
        </p>
        <p>
          You may export your content at any time. On termination we retain and then delete it on the
          schedule in our privacy policy.
        </p>
      </Clause>

      <Clause id="ip" heading="8. Our intellectual property">
        <p>
          The platform, its software, design, documentation and trade marks are ours and remain ours.
          These terms grant you a non-exclusive, non-transferable right to use the platform during
          your subscription, and nothing more. Feedback you send us may be used to improve the
          product without obligation to you.
        </p>
      </Clause>

      <Clause id="third-parties" heading="9. Third-party services">
        <p>
          The platform connects to services we do not control, including carriers, calendars, CRMs and
          payment providers. Your use of those services is governed by their terms. We are not
          responsible for their availability, their acts or their omissions.
        </p>
      </Clause>

      <Clause id="availability" heading="10. Availability">
        <p>
          We work to keep the platform available and will give notice of planned maintenance where we
          reasonably can. We do not guarantee uninterrupted service. Telephony and messaging depend on
          carrier networks that are outside our control.
        </p>
      </Clause>

      <Clause id="warranty" heading="11. Disclaimers">
        <p>
          Except as expressly stated and as Canadian consumer protection law requires, the platform is
          provided as is and as available, without warranties of any kind, whether express, implied or
          statutory, including merchantability and fitness for a particular purpose.
        </p>
        <p>
          The platform assists with follow-up. It does not guarantee any number of leads,
          appointments, transactions or commissions, and nothing on our website is a promise of a
          result. FollowUpHub does not provide legal, tax or real estate brokerage advice.
        </p>
      </Clause>

      <Clause id="liability" heading="12. Limitation of liability">
        <p>
          To the extent the law permits, neither party is liable for indirect, incidental, special,
          consequential or punitive damages, or for lost profits, lost revenue, lost business or lost
          data, however caused.
        </p>
        <p>
          Our total aggregate liability arising out of or relating to these terms is limited to the
          amount you paid us in the 12 months before the event giving rise to the claim.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law, including liability
          for fraud, or the rights you have under applicable Canadian consumer protection
          legislation.
        </p>
      </Clause>

      <Clause id="termination" heading="13. Termination">
        <p>
          You may terminate at any time by cancelling your subscription. We may terminate or suspend
          your account for a material breach of these terms that you do not cure within 15 days of
          notice, or immediately where the breach exposes us, our carriers or another person to legal
          or security risk. Sections on customer content, intellectual property, disclaimers,
          liability, indemnity and governing law survive termination.
        </p>
      </Clause>

      <Clause id="changes" heading="14. Changes to these terms">
        <p>
          We may update these terms. The date at the top reflects the current version. For material
          changes we will give at least 30 days&rsquo; notice by email or in the platform. Continuing to use
          the platform after a change takes effect means you accept it; if you do not, you may cancel.
        </p>
      </Clause>

      <Clause id="law" heading="15. Governing law">
        <p>
          These terms are governed by the laws of the Province of Ontario and the federal laws of
          Canada that apply there. The courts of Ontario have jurisdiction, and each party submits to
          them, except that consumers may bring proceedings in the courts of their own province where
          the law gives them that right.
        </p>
      </Clause>

      <Clause id="contact" heading="16. Contact">
        <p>
          Questions about these terms go to{" "}
          <a className="font-semibold text-teal underline underline-offset-4" href={M}>{SITE.email}</a>.
        </p>
      </Clause>
    </LegalPage>
  );
}
