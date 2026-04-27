"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Play,
  LogOut,
  ChevronRight,
  Film,
  Tv,
  Edit3,
  Trash2,
} from "lucide-react";
import styles from "./page.module.css";

const VIEWER_CODE = "password";
const CREATOR_CODE = "smba";

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

const initialShows = [
  {
    id: "show-1",
    title: "Shadow School",
    description:
      "A student-made mystery series with secrets, rivalries, and strange clues.",
    banner:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    featured: true,
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
    featured: false,
    episodes: [
      {
        id: "ep-3",
        title: "Locker 18",
        description: "One locker. Too many stories.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: "show-3",
    title: "After Class",
    description: "Late-night plans, tension, laughs, and hidden problems.",
    banner:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
    featured: false,
    episodes: [
      {
        id: "ep-4",
        title: "Group Chat",
        description: "One message changes the whole night.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  },
];

function IntroAnimation({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3400);
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
function ShowCard({ show, active, onSelect }) {
  return (
    <button
      className={`${styles.showCard} ${active ? styles.showCardActive : ""}`}
      onClick={() => onSelect(show.id)}
    >
      <img src={show.cover} alt={show.title} className={styles.showCardImage} />
      <div className={styles.showCardShade} />
      <div className={styles.showCardInfo}>
        <h3>{show.title}</h3>
        <p>{show.episodes.length} episode(s)</p>
      </div>
    </button>
  );
}

function EpisodeCard({ episode, onWatch }) {
  return (
    <div className={styles.episodeCard}>
      <div>
        <h3 className={styles.episodeTitle}>{episode.title}</h3>
        <p className={styles.episodeText}>{episode.description}</p>
      </div>
      <button className={styles.primaryBtn} onClick={() => onWatch(episode)}>
        <Play size={16} />
        Watch
      </button>
    </div>
  );
}

export default function Home() {
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

  const [view, setView] = useState("home");
  const [shows, setShows] = useState(initialShows);
  const [selectedShowId, setSelectedShowId] = useState(initialShows[0].id);
  const [selectedEpisode, setSelectedEpisode] = useState(initialShows[0].episodes[0]);

  const [newShowTitle, setNewShowTitle] = useState("");
  const [newShowDescription, setNewShowDescription] = useState("");
  const [newShowCover, setNewShowCover] = useState("");
  const [newShowBanner, setNewShowBanner] = useState("");

  const [newEpisodeTitle, setNewEpisodeTitle] = useState("");
  const [newEpisodeDescription, setNewEpisodeDescription] = useState("");
  const [newEpisodeUrl, setNewEpisodeUrl] = useState("");

  const selectedShow = useMemo(
    () => shows.find((show) => show.id === selectedShowId) || shows[0],
    [shows, selectedShowId]
  );

  const featuredShow = useMemo(
    () => shows.find((show) => show.featured) || shows[0],
    [shows]
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
  };

  const watchEpisode = (episode) => {
    setSelectedEpisode(episode);
    setView("watch");
  };

  const addShow = () => {
    if (!newShowTitle.trim()) return;

    const show = {
      id: `show-${Date.now()}`,
      title: newShowTitle,
      description: newShowDescription || "New series on SMBAFLEX.",
      cover:
        newShowCover ||
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop",
      banner:
        newShowBanner ||
        newShowCover ||
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
      featured: false,
      episodes: [],
    };

    setShows((prev) => [...prev, show]);
    setSelectedShowId(show.id);
    setNewShowTitle("");
    setNewShowDescription("");
    setNewShowCover("");
    setNewShowBanner("");
  };

  const addEpisode = () => {
    if (!newEpisodeTitle.trim() || !newEpisodeUrl.trim()) return;

    const episode = {
      id: `ep-${Date.now()}`,
      title: newEpisodeTitle,
      description: newEpisodeDescription || "New episode.",
      videoUrl: newEpisodeUrl,
    };

    setShows((prev) =>
      prev.map((show) =>
        show.id === selectedShowId
          ? { ...show, episodes: [...show.episodes, episode] }
          : show
      )
    );

    setNewEpisodeTitle("");
    setNewEpisodeDescription("");
    setNewEpisodeUrl("");
  };

  const deleteCurrentShow = () => {
    if (shows.length <= 1) return;
    const nextShows = shows.filter((show) => show.id !== selectedShowId);
    setShows(nextShows);
    setSelectedShowId(nextShows[0].id);
    setSelectedEpisode(nextShows[0].episodes[0] || null);
  };

  const makeFeatured = (id) => {
    setShows((prev) =>
      prev.map((show) => ({
        ...show,
        featured: show.id === id,
      }))
    );
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
            style={{ backgroundImage: `url(${featuredShow.banner})` }}
          >
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <p className={styles.heroTag}>
                {mode === "creator" ? "Creator Preview" : "Featured Series"}
              </p>
              <h1 className={styles.heroTitle}>{featuredShow.title}</h1>
              <p className={styles.heroText}>{featuredShow.description}</p>
              <div className={styles.heroActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setSelectedShowId(featuredShow.id);
                    setSelectedEpisode(featuredShow.episodes[0]);
                    setView("watch");
                  }}
                >
                  <Play size={16} />
                  Play
                </button>

                <button
                  className={styles.secondaryBtn}
                  onClick={() => setSelectedShowId(featuredShow.id)}
                >
                  <Film size={16} />
                  Details
                </button>

                {mode === "creator" && (
                  <button className={styles.secondaryBtn} onClick={() => setView("creator")}>
                    <Edit3 size={16} />
                    Creator Tools
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className={styles.rowSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Watch Now</h2>
              <button className={styles.moreBtn}>
                Explore <ChevronRight size={16} />
              </button>
            </div>

            <div className={styles.cardRow}>
              {shows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  active={show.id === selectedShowId}
                  onSelect={setSelectedShowId}
                />
              ))}
            </div>
          </section>

          <section className={styles.rowSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{selectedShow.title} Episodes</h2>
            </div>

            <div className={styles.episodeList}>
              {selectedShow.episodes.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} onWatch={watchEpisode} />
              ))}
            </div>
          </section>
        </>
      )}

      {view === "watch" && selectedEpisode && (
        <section className={styles.watchWrap}>
          <div className={styles.watchCard}>
            <video className={styles.videoPlayer} controls src={selectedEpisode.videoUrl} />
            <div className={styles.watchInfo}>
              <h2>{selectedEpisode.title}</h2>
              <p>{selectedEpisode.description}</p>

              <div className={styles.watchActions}>
                <button className={styles.secondaryBtn} onClick={() => setView("home")}>
                  Back Home
                </button>
              </div>

              <div className={styles.episodeList}>
                {selectedShow.episodes
                  .filter((ep) => ep.id !== selectedEpisode.id)
                  .map((ep) => (
                    <EpisodeCard key={ep.id} episode={ep} onWatch={watchEpisode} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "creator" && mode === "creator" && (
        <section className={styles.creatorWrap}>
          <div className={styles.creatorGrid}>
            <div className={styles.creatorCard}>
              <h2 className={styles.sectionTitle}>Add Show</h2>
              <input
                className={styles.creatorInput}
                placeholder="Show title"
                value={newShowTitle}
                onChange={(e) => setNewShowTitle(e.target.value)}
              />
              <textarea
                className={styles.creatorTextarea}
                placeholder="Show description"
                value={newShowDescription}
                onChange={(e) => setNewShowDescription(e.target.value)}
              />
              <input
                className={styles.creatorInput}
                placeholder="Cover image URL"
                value={newShowCover}
                onChange={(e) => setNewShowCover(e.target.value)}
              />
              <input
                className={styles.creatorInput}
                placeholder="Banner image URL"
                value={newShowBanner}
                onChange={(e) => setNewShowBanner(e.target.value)}
              />
              <button className={styles.primaryBtn} onClick={addShow}>
                <Plus size={16} />
                Add Show
              </button>
            </div>

            <div className={styles.creatorCard}>
              <h2 className={styles.sectionTitle}>Manage Show</h2>
              <p className={styles.creatorText}>Current: {selectedShow.title}</p>

              <div className={styles.creatorButtonRow}>
                <button className={styles.secondaryBtn} onClick={() => makeFeatured(selectedShow.id)}>
                  <Tv size={16} />
                  Set Featured
                </button>
                <button className={styles.deleteBtn} onClick={deleteCurrentShow}>
                  <Trash2 size={16} />
                  Delete Show
                </button>
              </div>

              <hr className={styles.divider} />

              <h3 className={styles.subTitle}>Add Episode</h3>
              <input
                className={styles.creatorInput}
                placeholder="Episode title"
                value={newEpisodeTitle}
                onChange={(e) => setNewEpisodeTitle(e.target.value)}
              />
              <textarea
                className={styles.creatorTextarea}
                placeholder="Episode description"
                value={newEpisodeDescription}
                onChange={(e) => setNewEpisodeDescription(e.target.value)}
              />
              <input
                className={styles.creatorInput}
                placeholder="Direct video URL"
                value={newEpisodeUrl}
                onChange={(e) => setNewEpisodeUrl(e.target.value)}
              />
              <button className={styles.primaryBtn} onClick={addEpisode}>
                <Plus size={16} />
                Add Episode
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
