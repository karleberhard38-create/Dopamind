import { useState, useRef } from "react";

const ALL_CARDS = [
  { id: "IMM-001", kategorie: "Biologie", set: "Wie das Immunsystem Krebs bekaempft", order: 1, text: "Jeden Tag entstehen in deinem Koerper bis zu 10.000 Krebszellen - und du merkst nichts davon. Dein Immunsystem kaempft gerade jetzt. Aber wie erkennt es den Feind?", emoji: "🦠", color: ["#0f0c29", "#302b63", "#24243e"], accent: "#a78bfa" },
  { id: "IMM-002", kategorie: "Biologie", set: "Wie das Immunsystem Krebs bekaempft", order: 2, text: "T-Killer-Zellen patrouillieren durch dein Blut. Sie scannen jede Zelle nach einem Ausweis - dem MHC-Protein. Krebszellen faelschen diesen Ausweis. Und manche kommen damit durch.", emoji: "🔬", color: ["#0f0c29", "#302b63", "#24243e"], accent: "#a78bfa" },
  { id: "IMM-003", kategorie: "Biologie", set: "Wie das Immunsystem Krebs bekaempft", order: 3, text: "NK-Zellen - Natural Killer - schlagen zu, wenn der Ausweis fehlt. Sie injizieren Gift direkt in die Krebszelle. Diese platzt von innen. Doch Krebs hat noch eine geheime Waffe...", emoji: "💉", color: ["#0f0c29", "#302b63", "#24243e"], accent: "#a78bfa" },
  { id: "IMM-004", kategorie: "Biologie", set: "Wie das Immunsystem Krebs bekaempft", order: 4, text: "Tumoren senden Signale, die deine Immunzellen in Schlaf versetzen - wie ein Hacker, der Kameras abschaltet. PD-L1 heisst dieser Schalter. Forscher haben ihn gefunden. Und umgekehrt.", emoji: "🧬", color: ["#0f0c29", "#302b63", "#24243e"], accent: "#a78bfa" },
  { id: "IMM-005", kategorie: "Biologie", set: "Wie das Immunsystem Krebs bekaempft", order: 5, text: "Immuntherapie programmiert deine T-Zellen um - sie werden zu gezielten Krebsjaegern. Bei manchen Patienten verschwinden Tumoren komplett. Aber warum funktioniert es nicht bei allen?", emoji: "🏥", color: ["#0f0c29", "#302b63", "#24243e"], accent: "#a78bfa" },

  { id: "SLP-001", kategorie: "Gesundheit", set: "Wie Schlaf dein Gehirn reinigt", order: 1, text: "Nachts, waehrend du schlaefst, schrumpft dein Gehirn um 60 %. Kein Fehler - es ist Absicht. Denn genau jetzt beginnt die gefaehrlichste Reinigungsaktion deines Koerpers...", emoji: "🌙", color: ["#0d1b2a", "#1b2838", "#0a192f"], accent: "#38bdf8" },
  { id: "SLP-002", kategorie: "Gesundheit", set: "Wie Schlaf dein Gehirn reinigt", order: 2, text: "Das glymphatische System pumpt Hirnfluessigkeit durch dein Gehirn wie ein Hochdruckreiniger. Es spuelt Giftstoffe raus - darunter Amyloid-Beta, der Stoff, der Alzheimer ausloest.", emoji: "🧠", color: ["#0d1b2a", "#1b2838", "#0a192f"], accent: "#38bdf8" },
  { id: "SLP-003", kategorie: "Gesundheit", set: "Wie Schlaf dein Gehirn reinigt", order: 3, text: "Dieser Reinigungsprozess laeuft fast ausschliesslich im Tiefschlaf. Wer regelmaessig unter 6 Stunden schlaeft, haeuft messbar mehr Giftstoffe an. Aber das ist noch nicht das Schlimmste...", emoji: "⚠️", color: ["#0d1b2a", "#1b2838", "#0a192f"], accent: "#38bdf8" },
  { id: "SLP-004", kategorie: "Gesundheit", set: "Wie Schlaf dein Gehirn reinigt", order: 4, text: "Schon eine einzige Nacht Schlafentzug verdoppelt die Amyloid-Beta-Konzentration im Gehirn. Forscher sehen das als direkten Ausloser fuer Demenz. Doch es gibt einen Rettungsanker.", emoji: "🔬", color: ["#0d1b2a", "#1b2838", "#0a192f"], accent: "#38bdf8" },
  { id: "SLP-005", kategorie: "Gesundheit", set: "Wie Schlaf dein Gehirn reinigt", order: 5, text: "Seitenschlaefer profitieren am staerksten - ihr glymphatisches System arbeitet bis zu 25 % effizienter. Aber welche Schlafposition zerstoert die Reinigung fast vollstaendig?", emoji: "😴", color: ["#0d1b2a", "#1b2838", "#0a192f"], accent: "#38bdf8" },

  { id: "SGR-001", kategorie: "Gesundheit", set: "Was Zucker wirklich mit deinem Koerper macht", order: 1, text: "30 Sekunden nach dem ersten Schluck Cola explodiert dein Blutzucker. Dein Koerper reagiert wie auf einen Angriff. Was jetzt passiert, laeuft in jedem Menschen gleich ab - und macht suechtig.", emoji: "🥤", color: ["#1a0a00", "#2d1200", "#1a0800"], accent: "#fb923c" },
  { id: "SGR-002", kategorie: "Gesundheit", set: "Was Zucker wirklich mit deinem Koerper macht", order: 2, text: "Insulin schiesst ins Blut und reisst die Zellen auf. Glukose stroemt rein, der Spiegel faellt zu schnell - und du bekommst Heisshunger. Dein Gehirn ist jetzt chemisch dem Kokain aehnlich aktiviert.", emoji: "⚡", color: ["#1a0a00", "#2d1200", "#1a0800"], accent: "#fb923c" },
  { id: "SGR-003", kategorie: "Gesundheit", set: "Was Zucker wirklich mit deinem Koerper macht", order: 3, text: "Fruktose - der natuerliche Zucker in Fruchtsaft - umgeht dieses System komplett. Sie landet direkt in der Leber und wird zu Fett umgebaut. Selbst wenn du dich schlank fuehlst.", emoji: "🍊", color: ["#1a0a00", "#2d1200", "#1a0800"], accent: "#fb923c" },
  { id: "SGR-004", kategorie: "Gesundheit", set: "Was Zucker wirklich mit deinem Koerper macht", order: 4, text: "Chronisch hoher Zucker klebt sich an Proteine im Blut - dieser Prozess heisst Glykierung. Er laesst Haut altern, Gefaesse verhaerten und Nerven absterben. Und er ist kaum umkehrbar.", emoji: "💀", color: ["#1a0a00", "#2d1200", "#1a0800"], accent: "#fb923c" },
  { id: "SGR-005", kategorie: "Gesundheit", set: "Was Zucker wirklich mit deinem Koerper macht", order: 5, text: "Doch Forscher entdecken: Bestimmte Darmbakterien koennen den Blutzuckeranstieg bei identischer Mahlzeit um 50 % reduzieren. Welche Bakterien - und wie bekommst du sie?", emoji: "🦠", color: ["#1a0a00", "#2d1200", "#1a0800"], accent: "#fb923c" },

  { id: "GUT-001", kategorie: "Gesundheit", set: "Das Geheimnis des menschlichen Darms", order: 1, text: "Du traegst mehr fremde Zellen in dir als eigene. 38 Billionen Bakterien leben in deinem Darm - und sie treffen Entscheidungen, die dein Gehirn beeinflussen. Wer kontrolliert hier wen?", emoji: "🦠", color: ["#0a1a0a", "#0d2b0d", "#051405"], accent: "#4ade80" },
  { id: "GUT-002", kategorie: "Gesundheit", set: "Das Geheimnis des menschlichen Darms", order: 2, text: "Der Darm produziert 90 % deines Serotonins - dem Glueckshormon. Nicht das Gehirn. Menschen mit Depressionen zeigen messbar andere Darmbakterien. Kein Zufall.", emoji: "😊", color: ["#0a1a0a", "#0d2b0d", "#051405"], accent: "#4ade80" },
  { id: "GUT-003", kategorie: "Gesundheit", set: "Das Geheimnis des menschlichen Darms", order: 3, text: "Der Vagusnerv ist die direkte Datenleitung zwischen Darm und Gehirn. Bakterien schicken darueber chemische Signale. Experimente zeigen: Maeuese uebernehmen Angstverhalten des Spenders beim Stuhltransfer.", emoji: "⚡", color: ["#0a1a0a", "#0d2b0d", "#051405"], accent: "#4ade80" },
  { id: "GUT-004", kategorie: "Gesundheit", set: "Das Geheimnis des menschlichen Darms", order: 4, text: "Antibiotika toeten in 5 Tagen bis zu 30 % deiner Darmbakterien. Manche Staemme kehren nie zurueck. Was das langfristig mit deinem Immunsystem macht, erschreckt Forscher bis heute.", emoji: "💊", color: ["#0a1a0a", "#0d2b0d", "#051405"], accent: "#4ade80" },
  { id: "GUT-005", kategorie: "Gesundheit", set: "Das Geheimnis des menschlichen Darms", order: 5, text: "Stuhltransplantationen heilen bestimmte Darminfektionen mit 90 % Erfolgsrate - weit besser als jedes Antibiotikum. Jetzt testen Aerzte sie gegen Uebergewicht und Alzheimer. Was finden sie?", emoji: "🔬", color: ["#0a1a0a", "#0d2b0d", "#051405"], accent: "#4ade80" },

  { id: "SPT-001", kategorie: "Gesundheit", set: "Warum Sport dein Gehirn veraendert", order: 1, text: "20 Minuten nach dem Joggen ist dein Gehirn messbar anders. Neue Neuronen spriessen, Verbindungen verdichten sich. Kein Medikament der Welt erzeugt diesen Effekt so schnell und stark.", emoji: "🏃", color: ["#0f0a1e", "#1a0f3a", "#120d2e"], accent: "#e879f9" },
  { id: "SPT-002", kategorie: "Gesundheit", set: "Warum Sport dein Gehirn veraendert", order: 2, text: "BDNF - Wachstumsduenger fuers Gehirn - flutet nach Sport dein Blut. Es schuetzt bestehende Neuronen und baut neue. Alzheimer-Patienten haben kaum noch davon. Bewegung produziert es gratis.", emoji: "🧬", color: ["#0f0a1e", "#1a0f3a", "#120d2e"], accent: "#e879f9" },
  { id: "SPT-003", kategorie: "Gesundheit", set: "Warum Sport dein Gehirn veraendert", order: 3, text: "Der Hippocampus - dein Gedaechtniszentrum - waechst bei aktiven Menschen nachweislich. Bei Inaktiven schrumpft er um 1-2 % pro Jahr. Das entspricht einem kuenstlichen Alterungsprozess.", emoji: "📉", color: ["#0f0a1e", "#1a0f3a", "#120d2e"], accent: "#e879f9" },
  { id: "SPT-004", kategorie: "Gesundheit", set: "Warum Sport dein Gehirn veraendert", order: 4, text: "Hochintensives Intervalltraining steigert die kognitive Leistung staerker als Ausdauersport. 4 Minuten reichen aus. Der Mechanismus dahinter ueberrascht selbst Neurowissenschaftler.", emoji: "⏱️", color: ["#0f0a1e", "#1a0f3a", "#120d2e"], accent: "#e879f9" },
  { id: "SPT-005", kategorie: "Gesundheit", set: "Warum Sport dein Gehirn veraendert", order: 5, text: "Kinder, die vor Schularbeiten 10 Minuten springen, loesen danach Matheaufgaben signifikant besser. Doch eine Sportart uebertrifft alle anderen fuers Gehirn. Welche ist es?", emoji: "🏆", color: ["#0f0a1e", "#1a0f3a", "#120d2e"], accent: "#e879f9" },

  { id: "STR-001", kategorie: "Gesundheit", set: "Wie Stress deinen Koerper von innen zerstoert", order: 1, text: "Dein Koerper kann nicht zwischen einem Loewen und einer E-Mail unterscheiden. Chronischer Stress aktiviert denselben Notfallmodus - 24 Stunden am Tag. Was das anrichtet, ist brutal.", emoji: "😰", color: ["#1a0000", "#2d0000", "#140000"], accent: "#f87171" },
  { id: "STR-002", kategorie: "Gesundheit", set: "Wie Stress deinen Koerper von innen zerstoert", order: 2, text: "Kortisol faehrt das Immunsystem runter, erhoeht Blutdruck und loest Entzuendungen aus. Gleichzeitig schrumpft der Praefrontale Kortex - der Teil, der rationale Entscheidungen trifft.", emoji: "🧠", color: ["#1a0000", "#2d0000", "#140000"], accent: "#f87171" },
  { id: "STR-003", kategorie: "Gesundheit", set: "Wie Stress deinen Koerper von innen zerstoert", order: 3, text: "Chronischer Stress verkuerzt Telomere - die Schutzkappen deiner DNA. Das entspricht einer biologischen Alterung von bis zu 10 Jahren. Menschen in Pflegeberufen zeigen das besonders extrem.", emoji: "⏳", color: ["#1a0000", "#2d0000", "#140000"], accent: "#f87171" },
  { id: "STR-004", kategorie: "Gesundheit", set: "Wie Stress deinen Koerper von innen zerstoert", order: 4, text: "Epigenetik zeigt: Stress veraendert, welche Gene aktiv sind - und diese Veraenderungen koennen an Kinder weitergegeben werden. Trauma vererbt sich biologisch. Das veraendert alles.", emoji: "🧬", color: ["#1a0000", "#2d0000", "#140000"], accent: "#f87171" },
  { id: "STR-005", kategorie: "Gesundheit", set: "Wie Stress deinen Koerper von innen zerstoert", order: 5, text: "Doch eine einzige Technik senkt Kortisol in unter 5 Minuten nachweislich auf Normalwerte. Keine App, keine Pille. Etwas, das du immer dabei hast. Was ist es?", emoji: "🌬️", color: ["#1a0000", "#2d0000", "#140000"], accent: "#f87171" },
];

const SETS = [...new Set(ALL_CARDS.map(c => c.set))];

function ActionBtn({ onClick, icon, label, active, accent }) {
  const [pop, setPop] = useState(false);
  const handleClick = () => {
    setPop(true);
    setTimeout(() => setPop(false), 300);
    onClick();
  };
  return (
    <button onClick={handleClick} style={{
      background: "rgba(0,0,0,0.45)", border: "none", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
      backdropFilter: "blur(10px)", borderRadius: "12px", padding: "8px 6px",
      transform: pop ? "scale(1.35)" : "scale(1)",
      transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)"
    }}>
      <span style={{ fontSize: "26px", filter: active ? ("drop-shadow(0 0 6px " + accent + ")") : "none" }}>{icon}</span>
      <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{label}</span>
    </button>
  );
}

export default function BildungsApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSet, setActiveSet] = useState("Alle");
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [dragStart, setDragStart] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDir, setExitDir] = useState(null);
  const [showSetMenu, setShowSetMenu] = useState(false);

  const filteredCards = activeSet === "Alle" ? ALL_CARDS : ALL_CARDS.filter(c => c.set === activeSet);
  const card = filteredCards[currentIndex];
  const totalCards = filteredCards.length;
  const setCards = card ? filteredCards.filter(c => c.set === card.set) : [];
  const cardInSetIndex = card ? setCards.findIndex(c => c.id === card.id) : 0;

  const goTo = (dir) => {
    if (isAnimating) return;
    const next = currentIndex + dir;
    if (next < 0 || next >= totalCards) return;
    setExitDir(dir < 0 ? "down" : "up");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(next);
      setExitDir(null);
      setIsAnimating(false);
      setDragDelta(0);
    }, 280);
  };

  const handleDragStart = (e) => {
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart(y);
  };

  const handleDragMove = (e) => {
    if (dragStart === null) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setDragDelta(dragStart - y);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragDelta) > 60) {
      goTo(dragDelta > 0 ? 1 : -1);
    } else {
      setDragDelta(0);
    }
    setDragStart(null);
  };

  const switchSet = (s) => {
    setActiveSet(s);
    setCurrentIndex(0);
    setShowSetMenu(false);
  };

  if (!card) return (
    <div style={{ background: "#000", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      Keine Karten.
    </div>
  );

  const cardTranslate = exitDir === "up" ? -110 : exitDir === "down" ? 110 : Math.max(-30, Math.min(30, -dragDelta * 0.3));
  const cardOpacity = exitDir ? 0 : Math.max(0.6, 1 - Math.abs(dragDelta) / 400);
  const gradientBg = "linear-gradient(160deg, " + card.color[0] + " 0%, " + card.color[1] + " 50%, " + card.color[2] + " 100%)";

  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#111",
      display: "flex", justifyContent: "center", alignItems: "center",
      fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden"
    }}>
      <div style={{
        width: "min(420px, 100vw)", height: "min(820px, 100vh)",
        position: "relative", overflow: "hidden",
        borderRadius: "clamp(0px, 2vw, 32px)",
        boxShadow: "0 0 80px rgba(0,0,0,0.9)"
      }}>

        {/* Main card */}
        <div
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{
            position: "absolute", inset: 0,
            background: gradientBg,
            transform: "translateY(" + cardTranslate + "%)",
            opacity: cardOpacity,
            transition: isAnimating ? "all 0.28s cubic-bezier(0.4,0,0.2,1)" : "none",
            cursor: "grab", userSelect: "none",
            display: "flex", flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
            <button
              onClick={() => setShowSetMenu(v => !v)}
              style={{
                background: "rgba(255,255,255,0.13)", border: "none",
                color: "#fff", padding: "6px 14px", borderRadius: "20px",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
                backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: "6px"
              }}
            >
              <span style={{ opacity: 0.7 }}>&#9638;</span>
              {activeSet === "Alle" ? "Alle Sets" : activeSet.slice(0, 18) + "..."}
            </button>
            <div style={{
              background: "rgba(255,255,255,0.13)", borderRadius: "20px",
              padding: "4px 12px", fontSize: "12px", color: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)"
            }}>
              {currentIndex + 1} / {totalCards}
            </div>
          </div>

          {/* Set menu */}
          {showSetMenu && (
            <div style={{
              position: "absolute", top: "54px", left: "16px", right: "16px",
              background: "rgba(8,8,18,0.97)", borderRadius: "16px",
              padding: "8px", zIndex: 100, backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              {["Alle", ...SETS].map(s => (
                <button key={s} onClick={() => switchSet(s)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: activeSet === s ? "rgba(255,255,255,0.13)" : "transparent",
                  color: "#fff", border: "none", padding: "10px 14px",
                  borderRadius: "10px", cursor: "pointer", fontSize: "13px",
                  fontWeight: activeSet === s ? 700 : 400
                }}>
                  {s === "Alle" ? "Alle Sets" : s}
                </button>
              ))}
            </div>
          )}

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", padding: "12px 0 0", zIndex: 2 }}>
            {setCards.map((_, i) => (
              <div key={i} style={{
                width: i === cardInSetIndex ? "20px" : "6px",
                height: "4px", borderRadius: "2px",
                background: i === cardInSetIndex ? card.accent : "rgba(255,255,255,0.3)",
                transition: "all 0.3s ease"
              }} />
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px 28px", zIndex: 2 }}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{
                background: card.accent + "28",
                color: card.accent,
                border: "1px solid " + card.accent + "55",
                padding: "4px 12px", borderRadius: "20px",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}>
                {card.kategorie}
              </span>
            </div>
            <div style={{ fontSize: "52px", marginBottom: "20px", lineHeight: 1 }}>
              {card.emoji}
            </div>
            <p style={{
              color: "#fff", fontSize: "clamp(16px, 3.5vw, 20px)",
              lineHeight: 1.6, fontWeight: 500, margin: 0, letterSpacing: "-0.01em"
            }}>
              {card.text}
            </p>
            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "4px" }}>
                #{card.id} &middot; Karte {cardInSetIndex + 1}/{setCards.length}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                {card.set}
              </div>
            </div>
          </div>

          <div style={{ padding: "0 0 20px", textAlign: "center", zIndex: 2, color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
            Wischen zum Blaettern
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          position: "absolute", right: "16px", bottom: "120px",
          display: "flex", flexDirection: "column", gap: "20px", zIndex: 10, alignItems: "center"
        }}>
          <ActionBtn onClick={() => setLiked(p => ({ ...p, [card.id]: !p[card.id] }))} icon={liked[card.id] ? "❤️" : "🤍"} label={liked[card.id] ? "Gefaellt" : "Like"} active={!!liked[card.id]} accent={card.accent} />
          <ActionBtn onClick={() => setSaved(p => ({ ...p, [card.id]: !p[card.id] }))} icon={saved[card.id] ? "🔖" : "📌"} label={saved[card.id] ? "Gespeichert" : "Speichern"} active={!!saved[card.id]} accent={card.accent} />
          <ActionBtn onClick={() => {}} icon="🔗" label="Teilen" active={false} accent={card.accent} />
        </div>

        {/* Nav arrows */}
        <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
          {currentIndex > 0 && (
            <button onClick={() => goTo(-1)} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "15px", cursor: "pointer", backdropFilter: "blur(10px)" }}>
              &#8593;
            </button>
          )}
          {currentIndex < totalCards - 1 && (
            <button onClick={() => goTo(1)} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "15px", cursor: "pointer", backdropFilter: "blur(10px)" }}>
              &#8595;
            </button>
          )}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", justifyContent: "space-around", padding: "12px 0 16px", zIndex: 10
        }}>
          {[
            { icon: "🏠", label: "Home" },
            { icon: "🔍", label: "Suchen" },
            { icon: "➕", label: "", main: true },
            { icon: "❤️", label: "Likes" },
            { icon: "👤", label: "Profil" },
          ].map((item, i) => (
            <button key={i} style={{
              background: item.main ? ("linear-gradient(135deg, " + card.accent + ", rgba(255,255,255,0.1))") : "transparent",
              border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
              padding: item.main ? "0 16px" : "0 12px",
              borderRadius: item.main ? "8px" : "0",
              color: "#fff"
            }}>
              <span style={{ fontSize: item.main ? "20px" : "22px" }}>{item.icon}</span>
              {item.label ? <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.45)" }}>{item.label}</span> : null}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
