"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Play, LogOut } from "lucide-react";
import styles from "./page.module.css";

const VIEWER_CODE = "famwatch2026";
const CREATOR_CODE = "amancreator2026";

const collageImages = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?q=80&w=1200&auto=format&fit=crop",
];

const starterShows = [
  {
    id: "show-1",
    title: "Shadow School",
    description: "A student-made mystery series with secrets, rivalries, and strange clues.",
    banner:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    episodes: [
      {
        id: "ep-1",
        title: "The First Bell",
        description: "A normal day at school turns into something bigger.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "ep-2",
        title: "Rumors",
        description: "Everybody knows something, but nobody knows enough.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  },
  {
    id: "show-2",
    title: "Hallway Tapes",
    description: "Different stories, same school, every hallway has a history.",
    banner:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=900&auto=format&fit=crop",
    episodes: [
      {
        id: "ep-3",
        title: "Locker 18",
        description: "One locker. Too many stories.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
];

function IntroAnimation({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={styles.introScreen}>
      <div className={styles.introGlow} />
      <div className={styles.introBars}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.introLogo}>SMBAFLEX</div>
      <div className={styles.introSweep} />
    </div>
  );
}

function LoginScreen({ code, setCode, error, onEnter }) {
  return (
    <main className={styles.loginPage}>
      <div className={styles.collage}>
        {collageImages.map((src, i) => (
          <img key={i} src={src} alt="" className={styles.collageImage} />
        ))}
      </div>

      <div className={styles.loginOverlay} />

      <div className={styles.loginContent}>
        <div className={styles.loginTop}>
          <div className={styles.wordmark}>SMBAFLEX</div>
        </div>

        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Sign In</h1>
          <p className={styles.loginSub}>Enter your access code to continue.</p>

          <input
            type="password"
            placeholder="Access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onEnter()}
            className={styles.loginInput}
          />

          <button onClick={onEnter} className={styles.loginButton}>
            Sign In
          </button>

          {error && <p className={styles.loginError}>{error}</p>}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [view, setView] = useState("home");
  const [shows] = useState(starterShows);
  const [selectedShowId, setSelectedShowId] = useState(starterShows[0].id);
  const [selectedEpisode, setSelectedEpisode] = useState(starterShows[0].episodes[0]);

  const selectedShow = useMemo(
    () => shows.find((show) => show.id === selectedShowId) || shows[0],
    [shows, selectedShowId]
  );

  const handleEnter = () => {
    if (enteredCode === CREATOR_CODE) {
      setMode("creator");
      setError("");
      setShowIntro(true);
      return;
    }

    if (enteredCode === VIEWER_CODE) {
      setMode("viewer");
      setError("");
      setShowIntro(true);
      return;
    }

    setError("Incorrect access code");
  };

  const logout = () => {
    setMode(null);
    setEnteredCode("");
    setError("");
    setView("home");
    setSelectedShowId(starterShows[0].id);
    setSelectedEpisode(starterShows[0].episodes[0]);
  };

  if (!mode) {
    return (
      <LoginScreen code={enteredCode} setCode={setEnteredCode} error={error} onEnter={handleEnter} />
    );
  }

  if (showIntro) {
    return <IntroAnimation onDone={() => setShowIntro(false)} />;
  }

  return (
    <main className={styles.appPage}>
      <header className={styles.appHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.wordmarkSmall}>SMBAFLEX</div>
          <button className={styles.headerLink} onClick={() => setView("home")}>
            Home
          </button>
          <button className={styles.headerLink} onClick={() => setView("watch")}>
            Watch
          </button>
          {mode === "creator" && (
            <button className={styles.headerLink} onClick={() => setView("creator")}>
              Creator
            </button>
          )}
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <Search size={16} />
            <span>Search</span>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={16} />
            Exit
          </button>
        </div>
      </header>

      {view === "home" && (
        <>
          <section
            className={styles.hero}
            style={{ backgroundImage: `url(${selectedShow.banner})` }}
          >
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <p className={styles.heroTag}>{mode === "creator" ? "Creator Preview" : "Featured Series"}</p>
              <h1 className={styles.heroTitle}>{selectedShow.title}</h1>
              <p className={styles.heroText}>{selectedShow.description}</p>
              <div className={styles.heroActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setSelectedEpisode(selectedShow.episodes[0]);
                    setView("watch");
                  }}
                >
                  <Play size={16} />
                  Play
                </button>
                {mode === "creator" && (
                  <button className={styles.secondaryBtn} onClick={() => setView("creator")}>
                    <Plus size={16} />
                    Creator Tools
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className={styles.rowSection}>
            <h2 className={styles.sectionTitle}>Watch Now</h2>
            <div className={styles.cardRow}>
              {shows.map((show) => (
                <button
                  key={show.id}
                  className={styles.showCard}
                  onClick={() => setSelectedShowId(show.id)}
                >
                  <img src={show.cover} alt={show.title} className={styles.showCardImage} />
                  <div className={styles.showCardShade} />
                  <div className={styles.showCardInfo}>
                    <h3>{show.title}</h3>
                    <p>{show.episodes.length} episode(s)</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.rowSection}>
            <h2 className={styles.sectionTitle}>Episodes</h2>
            <div className={styles.episodeList}>
              {selectedShow.episodes.map((ep) => (
                <div key={ep.id} className={styles.episodeCard}>
                  <div>
                    <h3 className={styles.episodeTitle}>{ep.title}</h3>
                    <p className={styles.episodeText}>{ep.description}</p>
                  </div>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => {
                      setSelectedEpisode(ep);
                      setView("watch");
                    }}
                  >
                    <Play size={16} />
                    Watch
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === "watch" && (
        <section className={styles.watchWrap}>
          <div className={styles.watchCard}>
            <video className={styles.videoPlayer} controls src={selectedEpisode.videoUrl} />
            <div className={styles.watchInfo}>
              <h2>{selectedEpisode.title}</h2>
              <p>{selectedEpisode.description}</p>
            </div>
          </div>
        </section>
      )}

      {view === "creator" && mode === "creator" && (
        <section className={styles.creatorWrap}>
          <div className={styles.creatorCard}>
            <h2 className={styles.sectionTitle}>Creator Dashboard</h2>
            <p className={styles.creatorText}>
              This is the clean creator area. Next we’ll add show uploads, seasons, and episode management here.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
