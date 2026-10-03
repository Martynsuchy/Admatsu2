import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Lock } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { LEGAL_UI_LABELS } from '../translations/legalTranslations';

export type LegalDocType = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { currentLang } = useCms();
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const labels = LEGAL_UI_LABELS[currentLang] || LEGAL_UI_LABELS.cs;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#090E17] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B101D]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {activeTab === 'privacy' ? (
                <ShieldCheck className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                {activeTab === 'privacy' ? labels.privacyTitle : labels.termsTitle}
              </h2>
              <p className="text-[11px] text-slate-400">
                {activeTab === 'privacy' ? labels.privacySubtitle : labels.termsSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={labels.closeBtn}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs Switcher */}
        <div className="flex border-b border-white/10 bg-black/30 px-6 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{currentLang === 'cs' ? 'Ochrana osobních údajů (GDPR)' : currentLang === 'de' ? 'Datenschutz (DSGVO)' : 'Privacy Policy (GDPR)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{currentLang === 'cs' ? 'Všeobecné obchodní podmínky' : currentLang === 'de' ? 'Geschäftsbedingungen (AGB)' : 'Terms of Service (B2B)'}</span>
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: GDPR / PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
                <Lock className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>{labels.privacyBadgeText}</p>
              </div>

              {/* CZECH VERSION */}
              {currentLang === 'cs' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. Základní ustanovení a správce osobních údajů
                    </h3>
                    <p className="mb-2">
                      Správcem osobních údajů podle čl. 4 bod 7 Nařízení Evropského parlamentu a Rady (EU) 2016/679 (dále jen „<strong>GDPR</strong>“) je:
                    </p>
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono text-xs text-slate-300">
                      <p><strong className="text-white font-sans">Obchodní firma:</strong> ADMATSU s.r.o.</p>
                      <p><strong className="text-white font-sans">IČO:</strong> 21394555</p>
                      <p><strong className="text-white font-sans">Sídlo:</strong> Korunní 2569/108, Vinohrady, 101 00 Praha 10</p>
                      <p><strong className="text-white font-sans">Spisová značka:</strong> C 400085 vedená u Městského soudu v Praze</p>
                      <p><strong className="text-white font-sans">E-mail:</strong> info@admatsu.com</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Jaké osobní údaje zpracováváme
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Identifikační údaje:</strong> Jméno a příjmení, případně název společnosti či IČO.</li>
                      <li><strong>Kontaktní údaje:</strong> E-mailová adresa.</li>
                      <li><strong>Údaje o poptávaném projektu:</strong> Požadovaný typ webu vybraný v nabídce (One-Page, firemní web apod.), kalkulované doplňky, odkaz na stávající web a text vaší zprávy/představy.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Účel a právní základ zpracování
                    </h3>
                    <p className="text-slate-300">
                      Právním základem je <em>čl. 6 odst. 1 písm. b) GDPR</em> — provedení opatření před uzavřením smlouvy na žádost subjektu údajů. Údaje potřebujeme, abychom vás mohli kontaktovat a připravit kalkulaci a plán realizace.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. Doba uchovávání údajů & příjemci
                    </h3>
                    <p className="text-slate-300">
                      Nezávazné poptávky uchováváme maximálně po dobu 12 měsíců od ukončení komunikace. Vaše osobní údaje nepředáváme žádným třetím stranám k reklamním účelům. Využíváme pouze bezpečné cloudové servery v rámci EU.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Vaše práva podle GDPR
                    </h3>
                    <p className="text-slate-300">
                      Máte právo na přístup, opravu, výmaz i omezení zpracování svých údajů. Svá práva můžete uplatnit na <a href="mailto:info@admatsu.com" className="text-cyan-400 hover:underline">info@admatsu.com</a>. Dozorovým úřadem je Úřad pro ochranu osobních údajů (ÚOOÚ), Pplk. Sochora 27, Praha 7.
                    </p>
                  </div>
                </>
              )}

              {/* ENGLISH VERSION */}
              {currentLang === 'en' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. General Provisions & Data Controller
                    </h3>
                    <p className="mb-2">
                      The Data Controller pursuant to Article 4(7) of Regulation (EU) 2016/679 of the European Parliament and of the Council (hereinafter „<strong>GDPR</strong>“) is:
                    </p>
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono text-xs text-slate-300">
                      <p><strong className="text-white font-sans">Company:</strong> ADMATSU s.r.o.</p>
                      <p><strong className="text-white font-sans">Company ID:</strong> 21394555</p>
                      <p><strong className="text-white font-sans">Registered Office:</strong> Korunní 2569/108, Vinohrady, 101 00 Prague 10, Czech Republic</p>
                      <p><strong className="text-white font-sans">Commercial Register:</strong> File C 400085 maintained by the Municipal Court in Prague</p>
                      <p><strong className="text-white font-sans">Email:</strong> info@admatsu.com</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Personal Data We Process
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Identity Data:</strong> First and last name, company name.</li>
                      <li><strong>Contact Details:</strong> Business email address.</li>
                      <li><strong>Project Details:</strong> Requested project scope (One-Page, corporate web), configured add-ons, existing URL, and your inquiry notes.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Purpose & Legal Basis for Processing
                    </h3>
                    <p className="text-slate-300">
                      The legal basis is <em>Article 6(1)(b) of the GDPR</em> — taking steps prior to entering into a contract at the request of the data subject. Data is processed solely to prepare your customized proposal and discuss technical requirements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. Data Retention & Third-Party Sharing
                    </h3>
                    <p className="text-slate-300">
                      Inquiry data is retained for a maximum of 12 months following initial contact. We do not sell, rent, or disclose personal data to third parties for marketing. All processing occurs on secure cloud infrastructure hosted strictly within the European Union.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Your Rights Under GDPR
                    </h3>
                    <p className="text-slate-300">
                      You maintain full rights to access, rectify, restrict, or erase your personal data. You may exercise your rights anytime by contacting us at <a href="mailto:info@admatsu.com" className="text-cyan-400 hover:underline">info@admatsu.com</a>.
                    </p>
                  </div>
                </>
              )}

              {/* GERMAN VERSION */}
              {currentLang === 'de' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. Grundlegende Bestimmungen & Verantwortlicher
                    </h3>
                    <p className="mb-2">
                      Verantwortlicher im Sinne von Art. 4 Nr. 7 der Verordnung (EU) 2016/679 (nachfolgend „<strong>DSGVO</strong>“) ist:
                    </p>
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono text-xs text-slate-300">
                      <p><strong className="text-white font-sans">Unternehmen:</strong> ADMATSU s.r.o.</p>
                      <p><strong className="text-white font-sans">IdNr. (IČO):</strong> 21394555</p>
                      <p><strong className="text-white font-sans">Sitz:</strong> Korunní 2569/108, Vinohrady, 101 00 Prag 10, Tschechische Republik</p>
                      <p><strong className="text-white font-sans">Handelsregister:</strong> Aktenzeichen C 400085 beim Stadtgericht Prag</p>
                      <p><strong className="text-white font-sans">E-Mail:</strong> info@admatsu.com</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Welche Daten wir verarbeiten
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Identifikationsdaten:</strong> Vor- und Nachname, Firmenname.</li>
                      <li><strong>Kontaktdaten:</strong> E-Mail-Adresse.</li>
                      <li><strong>Projektdaten:</strong> Gewünschter Website-Typ, konfigurierte Module, bestehende URL sowie Ihre Nachricht.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Zweck & Rechtsgrundlage der Verarbeitung
                    </h3>
                    <p className="text-slate-300">
                      Rechtsgrundlage ist <em>Art. 6 Abs. 1 lit. b DSGVO</em> — Durchführung vorvertraglicher Maßnahmen auf Anfrage der betroffenen Person. Die Daten dienen ausschließlich der Angebotserstellung und Abstimmung.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. Speicherdauer & Drittanbieter
                    </h3>
                    <p className="text-slate-300">
                      Anfragedaten werden maximal 12 Monate aufbewahrt. Ihre Daten werden niemals an Dritte für Werbezwecke weitergegeben. Das Hosting erfolgt ausschließlich auf abgesicherten EU-Servern.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Ihre Rechte gemäß DSGVO
                    </h3>
                    <p className="text-slate-300">
                      Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Wenden Sie sich hierzu einfach an <a href="mailto:info@admatsu.com" className="text-cyan-400 hover:underline">info@admatsu.com</a>.
                    </p>
                  </div>
                </>
              )}

            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE / VOP */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>{labels.termsBadgeText}</p>
              </div>

              {/* CZECH VERSION */}
              {currentLang === 'cs' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. Úvodní ustanovení a smluvní strany
                    </h3>
                    <p className="mb-2">
                      Tyto Všeobecné obchodní podmínky upravují poskytování služeb v oblasti tvorby webových stránek společností <strong>ADMATSU s.r.o.</strong>, IČO: 21394555, Korunní 2569/108, 101 00 Praha 10 (poskytovatel).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Termíny realizace a součinnost objednatele
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li>Veškeré termíny uvedené na webu či v komunikaci (např. 7–14 dní) jsou <strong>výhradně orientační a nejsou poskytovatelem garantované</strong>.</li>
                      <li>Doba vývoje se odvíjí od včasného předání podkladů objednatelem a poskytnutí nezbytné součinnosti.</li>
                      <li>Poskytovatel neodpovídá za případná zpoždění vzniklá v průběhu vývoje z důvodu technologické náročnosti nebo čekání na podklady.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Závaznost odsouhlasených fází a vícepráce
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Neměnnost po schválení:</strong> Jakmile objednatel odsouhlasí konkrétní fázi projektu (strukturu, grafiku, texty, prototyp), je tato fáze považována za schválenou a uzavřenou.</li>
                      <li>Po odsouhlasení již nelze dříve schválené prvky jednostranně měnit v rámci původní ceny.</li>
                      <li>Dodatečné úpravy či nové funkce představují vícepráce, které <strong>mohou být po předchozí domluvě doúčtovány</strong> a mohou přiměřeně posunout orientační termín dokončení.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. 100% vlastnictví a licence
                    </h3>
                    <p className="text-slate-300">
                      Po úplném zaplacení ceny díla přechází na objednatele veškerá práva k užití webu. Web není vázán na žádné měsíční licenční poplatky.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Odpovědnost za vady a rozsah záruky
                    </h3>
                    <p className="text-slate-300">
                      Poskytuje se akceptační lhůta 14 kalendářních dnů od nasazení na bezplatné odstranění technických vad kódu neodpovídajících specifikaci. Vzhledem k povaze B2B plnění se smluvní záruka za jakost nad rámec akceptace neposkytuje. Rozhodným právem je právo České republiky.
                    </p>
                  </div>
                </>
              )}

              {/* ENGLISH VERSION */}
              {currentLang === 'en' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. General Provisions & Contracting Parties
                    </h3>
                    <p className="mb-2">
                      These Terms of Service govern digital web engineering services delivered by <strong>ADMATSU s.r.o.</strong>, Company ID: 21394555, Korunní 2569/108, Vinohrady, 101 00 Prague 10, Czech Republic (hereinafter the „Provider“).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Delivery Timelines & Client Cooperation
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li>All timelines communicated on the website or in proposals (e.g. 7–14 days) are <strong>strictly indicative estimates and are not guaranteed</strong>.</li>
                      <li>Development speed relies on timely provision of necessary assets (copy, branding, hosting credentials) and prompt client feedback.</li>
                      <li>The Provider holds no liability for delivery delays stemming from technical complexity, asset bottlenecks, or pending approvals.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Scope Freeze & Change Requests
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Scope Finality:</strong> Once the client signs off on a milestone (wireframe, visual concept, copy, interactive logic, or functional prototype), that stage is officially concluded and frozen.</li>
                      <li>Following sign-off, previously approved components cannot be unilaterally modified within the original project budget.</li>
                      <li>Subsequent changes or new feature requests constitute change requests, which <strong>may be invoiced upon mutual agreement</strong> and will adjust estimated delivery schedules accordingly.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. 100% Code Ownership & Perpetual License
                    </h3>
                    <p className="text-slate-300">
                      Upon receipt of final payment, full, unrestricted, and perpetual rights to use the delivered web codebase are transferred to the client. The code is 100% yours, free from proprietary monthly vendor fees.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Acceptance Period & Warranty Limitations
                    </h3>
                    <p className="text-slate-300">
                      The client benefits from a 14-calendar-day acceptance period following production deployment to test and report any genuine technical bugs, which will be resolved free of charge. In accordance with standard European B2B trade practices, no statutory quality warranty applies beyond acceptance. Governing law is the law of the Czech Republic.
                    </p>
                  </div>
                </>
              )}

              {/* GERMAN VERSION */}
              {currentLang === 'de' && (
                <>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      1. Geltungsbereich & Vertragspartner
                    </h3>
                    <p className="mb-2">
                      Diese Allgemeinen Geschäftsbedingungen regeln die Erbringung von Webentwicklungsleistungen durch <strong>ADMATSU s.r.o.</strong>, IdNr.: 21394555, Korunní 2569/108, 101 00 Prag 10, Tschechische Republik (Auftragnehmer).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      2. Umsetzungsfristen & Mitwirkung des Kunden
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li>Alle auf der Website oder im Angebot genannten Fristen (z. B. 7–14 Tage) sind <strong>reine Orientierungswerte und werden nicht garantiert</strong>.</li>
                      <li>Die Entwicklungsdauer hängt von der rechtzeitigen Bereitstellung der Unterlagen (Texte, Bildmaterial, Zugangsdaten) sowie der zügigen Mitwirkung des Kunden ab.</li>
                      <li>Der Auftragnehmer haftet nicht für Verzögerungen infolge technischer Komplexität oder verspäteter Zuarbeit.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      3. Verbindlichkeit freigegebener Phasen & Mehrarbeiten
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      <li><strong>Bindung an Freigaben:</strong> Sobald der Kunde einen Projektschritt (Layout, Texte, Prototyp) freigibt, gilt dieser als final und abgeschlossen.</li>
                      <li>Nachträgliche Änderungen an bereits freigegebenen Bestandteilen sind im vereinbarten Festpreis nicht enthalten.</li>
                      <li>Zusätzliche Änderungswünsche gelten als Mehrarbeiten, die <strong>nach vorheriger Vereinbarung berechnet werden können</strong> und den Fertigstellungstermin angemessen verschieben.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      4. 100 % Eigentum & Nutzungsrechte
                    </h3>
                    <p className="text-slate-300">
                      Mit vollständiger Bezahlung der Vergütung erhält der Kunde das zeitlich und räumlich unbeschränkte Nutzungsrecht am erstellten Code. Es fallen keine laufenden Software-Lizenzgebühren an.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      5. Abnahmefrist & Haftungsbegrenzung
                    </h3>
                    <p className="text-slate-300">
                      Nach Live-Schaltung steht dem Kunden eine 14-tägige Test- und Abnahmefrist zur Verfügung, innerhalb derer technische Mängel kostenfrei behoben werden. Im B2B-Verkehr wird darüber hinaus keine vertragliche Beschaffenheitsgarantie übernommen. Es gilt das Recht der Tschechischen Republik.
                    </p>
                  </div>
                </>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0B101D] text-xs">
          <span className="text-slate-400">
            {labels.questionNotice} <a href="mailto:info@admatsu.com" className="text-cyan-400 hover:underline">info@admatsu.com</a>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
          >
            {labels.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
