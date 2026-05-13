"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  Film,
  Gauge,
  Info,
  LayoutDashboard,
  ListPlus,
  LogOut,
  MessageCircle,
  MonitorPlay,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UploadCloud,
  Users,
  Volume2,
  Wand2,
  X,
} from "lucide-react";
import styles from "./page.module.css";

const VIEWER_CODE = "password";
const CREATOR_CODE = "smba";
const SHOWS_STORAGE_KEY = "smbaflex-shows";
const LIST_STORAGE_KEY = "smbaflex-list";
const REACTIONS_STORAGE_KEY = "smbaflex-reactions";
const PROGRESS_STORAGE_KEY = "smbaflex-progress";

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
    tagline: "Every hallway hides a signal.",
    description:
      "A prestige student mystery series where late bells, secret clubs, and strange clues pull an entire campus into one cinematic conspiracy.",
    banner:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    trailer:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
    featured: true,
    published: true,
    genre: "Drama",
    year: "2026",
    rating: "TV-14",
    match: "98%",
    duration: "42m",
    seasons: 2,
    views: "1.8M",
    heat: 94,
    episodes: [
      {
        id: "ep-1",
        title: "The First Bell",
        description: "A normal day at school becomes the first clue in a much bigger pattern.",
        duration: "42m",
        rating: "TV-14",
        season: 1,
        progress: 62,
        thumbnail:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "ep-2",
        title: "Rumors",
        description: "Everybody knows something, but nobody knows enough to stay safe.",
        duration: "38m",
        rating: "TV-14",
        season: 1,
        progress: 18,
        thumbnail:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  },
  {
    id: "show-2",
    title: "Hallway Tapes",
    tagline: "Different stories. Same school.",
    description:
      "An anthology of campus stories captured in fragments, rumors, messages, and half-lit conversations after the final bell.",
    banner:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=900&auto=format&fit=crop",
    trailer:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1400&auto=format&fit=crop",
    featured: false,
    published: true,
    genre: "Drama",
    year: "2025",
    rating: "TV-PG",
    match: "94%",
    duration: "33m",
    seasons: 1,
    views: "943K",
    heat: 81,
    episodes: [
      {
        id: "ep-3",
        title: "Locker 18",
        description: "One locker. Too many stories.",
        duration: "33m",
        rating: "TV-PG",
        season: 1,
        progress: 0,
        thumbnail:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: "show-3",
    title: "After Class",
    tagline: "The night starts when school ends.",
    description:
      "Late-night plans, tense friendships, sharp laughs, and private problems collide in a glossy coming-of-age series.",
    banner:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1800&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
    trailer:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop",
    featured: false,
    published: true,
    genre: "Comedy",
    year: "2026",
    rating: "TV-14",
    match: "91%",
    duration: "29m",
    seasons: 1,
    views: "721K",
    heat: 76,
    episodes: [
      {
        id: "ep-4",
        title: "Group Chat",
        description: "One message changes the whole night.",
        duration: "29m",
        rating: "TV-14",
        season: 1,
        progress: 44,
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  },
  {
    id: "show-4",
    title: "Red Signal",
    tagline: "The broadcast never ended.",
    description:
      "A sci-fi thriller about students who discover a coded transmission hiding inside old media lab equipment.",
    banner:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1800&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=900&auto=format&fit=crop",
    trailer:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1400&auto=format&fit=crop",
    featured: false,
    published: true,
    genre: "Sci-Fi",
    year: "2026",
    rating: "TV-14",
    match: "96%",
    duration: "48m",
    seasons: 1,
    views: "1.2M",
    heat: 89,
    episodes: [
      {
        id: "ep-5",
        title: "Static",
        description: "A corrupted tape points to a room that is not on the school map.",
        duration: "48m",
        rating: "TV-14",
        season: 1,
        progress: 0,
        thumbnail:
          "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    id: "show-5",
    title: "The Final Take",
    tagline: "One shot. No reset.",
    description:
      "A kinetic action drama following a student film crew racing to finish their movie before everything falls apart.",
    banner:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1800&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=900&auto=format&fit=crop",
    trailer:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop",
    featured: false,
    published: true,
    genre: "Action",
    year: "2025",
    rating: "TV-14",
    match: "93%",
    duration: "51m",
    seasons: 1,
    views: "864K",
    heat: 84,
    episodes: [
      {
        id: "ep-6",
        title: "Rolling",
        description: "The crew gets one chance to capture the scene that could save the project.",
        duration: "51m",
        rating: "TV-14",
        season: 1,
        progress: 0,
        thumbnail:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  },
];

const rowPlan = [
  { title: "Featured", filter: (show) => show.featured },
  { title: "Trending Now", filter: (show) => show.heat > 80 },
  { title: "Continue Watching", filter: (show) => show.episodes.some((ep) => ep.progress > 0) },
  { title: "Recently Added", filter: () => true },
  { title: "SMBA Originals", filter: (show) => show.published },
  { title: "Action", filter: (show) => show.genre === "Action" },
  { title: "Drama", filter: (show) => show.genre === "Drama" },
  { title: "Sci-Fi", filter: (show) => show.genre === "Sci-Fi" },
  { title: "Recommended For You", filter: (show) => Number(show.match.replace("%", "")) > 90 },
  { title: "All Shows", filter: () => true },
];

const creatorNav = [
  ["Dashboard", LayoutDashboard],
  ["Shows", MonitorPlay],
  ["Episodes", Film],
  ["Uploads", UploadCloud],
  ["Analytics", BarChart3],
  ["Comments", MessageCircle],
  ["Users", Users],
  ["Settings", Settings],
];

function IntroAnimation({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4200);
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

function LoginScreen({ code, setCode, error, onEnter, onGuest }) {
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
          <div className={styles.loginDivider}>
            <span />
            <p>OR</p>
            <span />
          </div>
          <button onClick={onGuest} className={styles.guestButton}>
            <Users size={18} />
            Continue as Guest
          </button>
          {error && <p className={styles.loginError}>{error}</p>}
        </div>
      </div>
    </main>
  );
}

function Navbar({ activeView, setView, mode, query, setQuery, logout, compact }) {
  return (
    <header className={`${styles.appHeader} ${compact ? styles.appHeaderCompact : ""}`}>
      <div className={styles.headerLeft}>
        <button className={styles.wordmarkSmall} onClick={() => setView("home")}>
          SMBAFLEX
        </button>
        <nav className={styles.navLinks}>
          {["home", "watch"].map((item) => (
            <button
              key={item}
              className={`${styles.headerLink} ${activeView === item ? styles.headerLinkActive : ""}`}
              onClick={() => setView(item)}
            >
              {item === "home" ? "Home" : "Watch"}
            </button>
          ))}
          {mode === "creator" && (
            <button
              className={`${styles.headerLink} ${activeView === "creator" ? styles.headerLinkActive : ""}`}
              onClick={() => setView("creator")}
            >
              Creator
            </button>
          )}
        </nav>
      </div>
      <div className={styles.headerRight}>
        <label className={styles.searchBox}>
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, genres, episodes"
          />
        </label>
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={18} />
          <span />
        </button>
        <button className={styles.profileButton} aria-label="Profile menu">
          <span>SM</span>
          <ChevronDown size={16} />
        </button>
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={16} />
          Exit
        </button>
      </div>
    </header>
  );
}

function Hero({ show, onPlay, onInfo, onToggleList, inList }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia} style={{ backgroundImage: `url(${show.banner})` }} />
      <div className={styles.heroNoise} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.featuredBadge}>
          <Sparkles size={15} />
          Featured SMBA Original
        </div>
        <h1 className={styles.heroTitle}>{show.title}</h1>
        <p className={styles.heroTagline}>{show.tagline}</p>
        <p className={styles.heroText}>{show.description}</p>
        <div className={styles.metadata}>
          <strong>{show.match} Match</strong>
          <span>{show.year}</span>
          <span>{show.rating}</span>
          <span>{show.seasons} Season{show.seasons > 1 ? "s" : ""}</span>
          <span>{show.duration}</span>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} onClick={() => onPlay(show)}>
            <Play size={19} fill="currentColor" />
            Play
          </button>
          <button className={styles.secondaryBtn} onClick={() => onInfo(show)}>
            <Info size={18} />
            More Info
          </button>
          <button className={styles.glassBtn} onClick={() => onToggleList(show.id)}>
            {inList ? <Check size={18} /> : <ListPlus size={18} />}
            {inList ? "In My List" : "Add to List"}
          </button>
        </div>
      </div>
      <div className={styles.trailerPreview}>
        <img src={show.trailer} alt="" />
        <span>Trailer Preview</span>
      </div>
    </section>
  );
}

function ContentCard({ show, onPlay, onInfo, onToggleList, inList, progress }) {
  const episodeCount = show.episodes.length;

  return (
    <article className={styles.contentCard}>
      <button className={styles.posterButton} onClick={() => onPlay(show)}>
        <img src={show.cover} alt={show.title} />
        <span className={styles.posterGlow} />
        <span className={styles.posterInfo}>
          <strong>{show.title}</strong>
          <small>{episodeCount} episode{episodeCount === 1 ? "" : "s"}</small>
        </span>
      </button>
      <div className={styles.cardHover}>
        <img src={show.trailer} alt="" />
        <div className={styles.cardShade} />
        <div className={styles.cardHoverBody}>
          <div className={styles.cardControls}>
            <button onClick={() => onPlay(show)} aria-label={`Play ${show.title}`}>
              <Play size={15} fill="currentColor" />
            </button>
            <button onClick={() => onToggleList(show.id)} aria-label="Add to list">
              {inList ? <Check size={15} /> : <Plus size={15} />}
            </button>
            <button onClick={() => onInfo(show)} aria-label="More info">
              <Info size={15} />
            </button>
          </div>
          <h3>{show.title}</h3>
          <div className={styles.cardMeta}>
            <strong>{show.match}</strong>
            <span>{show.rating}</span>
            <span>{show.duration}</span>
          </div>
          <p>{show.genre} • {show.year} • {episodeCount} episode{episodeCount === 1 ? "" : "s"}</p>
          {progress > 0 && (
            <div className={styles.progressRail}>
              <span style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ContentRow({ title, shows, onPlay, onInfo, onToggleList, myList, progressMap }) {
  if (!shows.length) return null;

  return (
    <section className={styles.contentRow}>
      <div className={styles.rowHeader}>
        <h2>{title}</h2>
        <button>
          Explore <ChevronRight size={16} />
        </button>
      </div>
      <div className={styles.scroller}>
        {shows.map((show) => (
          <ContentCard
            key={`${title}-${show.id}`}
            show={show}
            onPlay={onPlay}
            onInfo={onInfo}
            onToggleList={onToggleList}
            inList={myList.includes(show.id)}
            progress={progressMap[show.episodes[0]?.id] || show.episodes[0]?.progress || 0}
          />
        ))}
      </div>
    </section>
  );
}

function HomeExperience({
  shows,
  featuredShow,
  myList,
  progressMap,
  query,
  onPlay,
  onInfo,
  onToggleList,
  selectedGenre,
  setSelectedGenre,
}) {
  const genres = ["All", ...Array.from(new Set(shows.map((show) => show.genre)))];
  const normalized = query.trim().toLowerCase();
  const filteredShows = shows.filter((show) => {
    const genreMatch = selectedGenre === "All" || show.genre === selectedGenre;
    const queryMatch =
      !normalized ||
      [show.title, show.description, show.genre, show.tagline].some((item) =>
        item.toLowerCase().includes(normalized)
      );
    return genreMatch && queryMatch;
  });

  return (
    <div className={styles.pageFade}>
      <Hero
        show={featuredShow}
        onPlay={onPlay}
        onInfo={onInfo}
        onToggleList={onToggleList}
        inList={myList.includes(featuredShow.id)}
      />
      <section className={styles.filterStrip}>
        <div>
          <SlidersHorizontal size={18} />
          <span>Browse by mood</span>
        </div>
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? styles.filterActive : ""}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </section>
      {normalized && (
        <ContentRow
          title={`Search results for "${query}"`}
          shows={filteredShows}
          onPlay={onPlay}
          onInfo={onInfo}
          onToggleList={onToggleList}
          myList={myList}
          progressMap={progressMap}
        />
      )}
      {normalized && filteredShows.length === 0 && (
        <div className={styles.emptyState}>
          <Search size={28} />
          <h2>No titles found</h2>
          <p>Try another title, genre, or episode keyword.</p>
        </div>
      )}
      {myList.length > 0 && (
        <ContentRow
          title="My List"
          shows={shows.filter((show) => myList.includes(show.id))}
          onPlay={onPlay}
          onInfo={onInfo}
          onToggleList={onToggleList}
          myList={myList}
          progressMap={progressMap}
        />
      )}
      {rowPlan.map((row) => (
        <ContentRow
          key={row.title}
          title={row.title}
          shows={filteredShows.filter(row.filter)}
          onPlay={onPlay}
          onInfo={onInfo}
          onToggleList={onToggleList}
          myList={myList}
          progressMap={progressMap}
        />
      ))}
    </div>
  );
}

function WatchExperience({ show, episode, onSelectEpisode, onBack, onLike, liked, disliked, progressMap, setProgressMap }) {
  const [playing, setPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [speed, setSpeed] = useState("1x");
  const [subtitles, setSubtitles] = useState(false);
  const playerRef = useRef(null);
  const activeProgress = progressMap[episode?.id] || episode?.progress || 0;

  useEffect(() => {
    setControlsVisible(true);
    const timer = setTimeout(() => setControlsVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [episode, playing]);

  if (!show || !episode) {
    return (
      <section className={`${styles.watchPage} ${styles.pageFade}`}>
        <div className={styles.emptyState}>
          <Film size={34} />
          <h2>No episode available</h2>
          <p>This show does not have a playable episode yet.</p>
          <button className={styles.primaryBtn} onClick={onBack}>
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  const activeIndex = show.episodes.findIndex((item) => item.id === episode.id);
  const nextEpisode = show.episodes[(activeIndex + 1) % show.episodes.length];

  return (
    <section className={`${styles.watchPage} ${styles.pageFade}`}>
      <div className={styles.ambientGlow} style={{ backgroundImage: `url(${show.banner})` }} />
      <div className={styles.watchGrid}>
        <div className={styles.playerShell} onMouseMove={() => setControlsVisible(true)}>
          <video
            ref={playerRef}
            className={styles.videoPlayer}
            src={episode.videoUrl}
            poster={episode.thumbnail}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (video.duration) {
                const percent = Math.round((video.currentTime / video.duration) * 100);
                setProgressMap((prev) => {
                  const next = { ...prev, [episode.id]: percent };
                  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
                  return next;
                });
              }
            }}
          />
          <button className={styles.skipIntro}>Skip Intro</button>
          <div className={`${styles.customControls} ${controlsVisible ? styles.controlsVisible : ""}`}>
            <div className={styles.progressRail}>
              <span style={{ width: `${activeProgress}%` }} />
            </div>
            <div className={styles.controlsRow}>
              <button
                onClick={() => {
                  if (!playerRef.current) return;
                  if (playerRef.current.paused) playerRef.current.play();
                  else playerRef.current.pause();
                }}
              >
                {playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}
              </button>
              <button>
                <Volume2 size={19} />
              </button>
              <strong>{show.title}</strong>
              <span>{episode.title}</span>
              <button onClick={() => setSubtitles((value) => !value)}>
                CC {subtitles ? "On" : "Off"}
              </button>
              <button onClick={() => setSpeed(speed === "1x" ? "1.5x" : speed === "1.5x" ? "2x" : "1x")}>
                {speed}
              </button>
              <button onClick={() => onSelectEpisode(nextEpisode)}>
                <SkipForward size={19} />
              </button>
            </div>
          </div>
        </div>
        <aside className={styles.episodeSidebar}>
          <div className={styles.sidebarTop}>
            <button className={styles.backBtn} onClick={onBack}>
              <X size={17} /> Back to Home
            </button>
            <label>
              Season
              <select defaultValue="1">
                <option>1</option>
                {show.seasons > 1 && <option>2</option>}
              </select>
            </label>
          </div>
          <h1>{episode.title}</h1>
          <div className={styles.watchMetadata}>
            <span>{show.title}</span>
            <span>S{episode.season || 1}:E{activeIndex + 1}</span>
            <span>{episode.duration}</span>
            <span>{episode.rating}</span>
          </div>
          <p>{episode.description}</p>
          <div className={styles.reactionRow}>
            <button className={liked ? styles.reactionActive : ""} onClick={() => onLike(show.id, "like")}>
              <ThumbsUp size={17} /> Like
            </button>
            <button className={disliked ? styles.reactionActive : ""} onClick={() => onLike(show.id, "dislike")}>
              <ThumbsDown size={17} /> Not for me
            </button>
          </div>
          <div className={styles.episodeListPremium}>
            {show.episodes.map((item, index) => (
              <button
                key={item.id}
                className={item.id === episode.id ? styles.episodeActive : ""}
                onClick={() => onSelectEpisode(item)}
              >
                <img src={item.thumbnail} alt="" />
                <span>S{item.season || 1}:E{index + 1}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.duration} • {item.rating}</p>
                  <small>{item.description}</small>
                  <div className={styles.progressRail}>
                    <span style={{ width: `${progressMap[item.id] || item.progress || 0}%` }} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function CreatorDashboard({
  shows,
  selectedShow,
  setSelectedShowId,
  addShow,
  addEpisode,
  deleteCurrentShow,
  makeFeatured,
  togglePublish,
  deleteEpisode,
  selectedEpisode,
  setSelectedEpisode,
  notice,
  form,
  setForm,
}) {
  const [creatorView, setCreatorView] = useState("Dashboard");
  const totalEpisodes = shows.reduce((sum, show) => sum + show.episodes.length, 0);

  return (
    <section className={`${styles.creatorStudio} ${styles.pageFade}`}>
      <aside className={styles.creatorSidebar}>
        <div className={styles.creatorBrand}>
          <Wand2 size={20} />
          Creator Studio
        </div>
        {creatorNav.map(([item, Icon]) => (
          <button
            key={item}
            className={creatorView === item ? styles.creatorNavActive : ""}
            onClick={() => setCreatorView(item)}
          >
            <Icon size={18} />
            {item}
          </button>
        ))}
      </aside>
      <div className={styles.creatorMain}>
        <div className={styles.creatorHero}>
          <div>
            <p>SMBAFLEX Command Center</p>
            <h1>{creatorView}</h1>
          </div>
          <button className={styles.primaryBtn}>
            <UploadCloud size={18} />
            New Upload
          </button>
        </div>
        {notice && (
          <div className={`${styles.notice} ${notice.type === "error" ? styles.noticeError : ""}`}>
            {notice.message}
          </div>
        )}
        <div className={styles.analyticsGrid}>
          {[
            ["Total Views", "4.7M", Eye],
            ["Watch Time", "128K hrs", Clock3],
            ["Subscribers", "42.8K", Users],
            ["Trending Score", "94%", Gauge],
          ].map(([label, value, Icon]) => (
            <article key={label} className={styles.analyticsCard}>
              <Icon size={21} />
              <span>{label}</span>
              <strong>{value}</strong>
              <div className={styles.miniChart}><span /><span /><span /><span /><span /></div>
            </article>
          ))}
        </div>
        <div className={styles.creatorGrid}>
          <article className={styles.creatorPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span>Add Show</span>
                <h2>Create a new title</h2>
              </div>
              <MonitorPlay size={21} />
            </div>
            <input
              className={styles.creatorInput}
              placeholder="Show title"
              value={form.showTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, showTitle: e.target.value }))}
            />
            <textarea
              className={styles.creatorTextarea}
              placeholder="Show description"
              value={form.showDescription}
              onChange={(e) => setForm((prev) => ({ ...prev, showDescription: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Cover image URL or uploaded asset"
              value={form.showCover}
              onChange={(e) => setForm((prev) => ({ ...prev, showCover: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Banner image URL or uploaded asset"
              value={form.showBanner}
              onChange={(e) => setForm((prev) => ({ ...prev, showBanner: e.target.value }))}
            />
            <div className={styles.switchRow}>
              <span>Publish immediately</span>
              <button><Check size={15} /> Published</button>
            </div>
            <button className={styles.primaryBtn} onClick={addShow}>
              <Plus size={17} />
              Create Show
            </button>
          </article>
          <article className={styles.creatorPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span>Upload/URL Video</span>
                <h2>Media package</h2>
              </div>
              <UploadCloud size={21} />
            </div>
            <div className={styles.dropZone}>
              <UploadCloud size={32} />
              <strong>Drag video, trailer, cover, or subtitles</strong>
              <p>MP4 links, subtitle files, thumbnails, and banners are supported.</p>
              <div><span /></div>
            </div>
            <input
              className={styles.creatorInput}
              placeholder="Direct MP4 link"
              value={form.episodeUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, episodeUrl: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Trailer link"
              value={form.trailerUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, trailerUrl: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Subtitle URL (.vtt)"
              value={form.subtitleUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, subtitleUrl: e.target.value }))}
            />
          </article>
          <article className={styles.creatorPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span>Manage Shows</span>
                <h2>Library control</h2>
              </div>
              <SlidersHorizontal size={21} />
            </div>
            <div className={styles.managerList}>
              {shows.length === 0 && (
                <div className={styles.emptyMini}>
                  <Film size={22} />
                  <p>No shows in the library yet.</p>
                </div>
              )}
              {shows.map((show) => (
                <button
                  key={show.id}
                  className={show.id === selectedShow.id ? styles.managerActive : ""}
                  onClick={() => setSelectedShowId(show.id)}
                >
                  <img src={show.cover} alt="" />
                  <div>
                    <strong>{show.title}</strong>
                    <p>{show.episodes.length} episodes • {show.published ? "Published" : "Draft"}</p>
                  </div>
                  <span className={show.published ? styles.statusPublished : styles.statusDraft}>
                    {show.featured ? <Star size={15} fill="currentColor" /> : null}
                    {show.published ? "Live" : "Draft"}
                  </span>
                </button>
              ))}
            </div>
            <div className={styles.creatorButtonRow}>
              <button className={styles.secondaryBtn} onClick={() => makeFeatured(selectedShow.id)}>
                <Star size={16} />
                Mark Featured
              </button>
              <button className={styles.secondaryBtn} onClick={() => togglePublish(selectedShow.id)}>
                {selectedShow.published ? <X size={16} /> : <Check size={16} />}
                {selectedShow.published ? "Unpublish" : "Publish"}
              </button>
              <button className={styles.deleteBtn} onClick={deleteCurrentShow}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </article>
          <article className={styles.creatorPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span>Add Episode</span>
                <h2>Episode metadata</h2>
              </div>
              <Plus size={21} />
            </div>
            <input
              className={styles.creatorInput}
              placeholder="Episode title"
              value={form.episodeTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, episodeTitle: e.target.value }))}
            />
            <textarea
              className={styles.creatorTextarea}
              placeholder="Episode description"
              value={form.episodeDescription}
              onChange={(e) => setForm((prev) => ({ ...prev, episodeDescription: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Duration, e.g. 42m"
              value={form.episodeDuration}
              onChange={(e) => setForm((prev) => ({ ...prev, episodeDuration: e.target.value }))}
            />
            <input
              className={styles.creatorInput}
              placeholder="Thumbnail URL"
              value={form.thumbnailUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
            />
            <div className={styles.orderList}>
              {selectedShow.episodes.length === 0 && (
                <div className={styles.emptyMini}>
                  <Film size={22} />
                  <p>No episodes yet. Add a title and MP4 URL to publish the first one.</p>
                </div>
              )}
              {selectedShow.episodes.map((episode, index) => (
                <button key={episode.id} onClick={() => setSelectedEpisode(episode)}>
                  <span>{index + 1}</span>
                  <p>{episode.title}</p>
                  <ChevronDown size={16} />
                </button>
              ))}
            </div>
            <button className={styles.primaryBtn} onClick={addEpisode}>
              <Plus size={17} />
              Add Episode
            </button>
          </article>
        </div>
        <div className={styles.episodeManagerPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span>Edit/Delete Episode</span>
              <h2>Currently selected episode</h2>
            </div>
            <Film size={21} />
          </div>
          {selectedEpisode ? (
            <div className={styles.episodeManageCard}>
              <img src={selectedEpisode.thumbnail} alt="" />
              <div>
                <strong>{selectedEpisode.title}</strong>
                <p>{selectedEpisode.description}</p>
                <div className={styles.watchMetadata}>
                  <span>S{selectedEpisode.season || 1}</span>
                  <span>{selectedEpisode.duration}</span>
                  <span>{selectedEpisode.videoUrl}</span>
                </div>
              </div>
              <button className={styles.deleteBtn} onClick={() => deleteEpisode(selectedEpisode.id)}>
                <Trash2 size={16} />
                Delete Episode
              </button>
            </div>
          ) : (
            <div className={styles.emptyMini}>
              <Film size={22} />
              <p>Select an episode from the metadata list to manage it.</p>
            </div>
          )}
        </div>
        <div className={styles.trendPanel}>
          <div className={styles.panelHeader}>
            <div>
              <span>Featured Content</span>
              <h2>Trending Content</h2>
            </div>
            <BarChart3 size={21} />
          </div>
          <div className={styles.trendBars}>
            {shows.map((show) => (
              <div key={show.id}>
                <span>{show.title}</span>
                <strong>{show.views}</strong>
                <div><span style={{ width: `${show.heat}%` }} /></div>
              </div>
            ))}
          </div>
          <p>{totalEpisodes} episodes currently available across {shows.length} managed shows.</p>
        </div>
      </div>
    </section>
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
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [myList, setMyList] = useState([]);
  const [reactions, setReactions] = useState({});
  const [progressMap, setProgressMap] = useState({});
  const [compactNav, setCompactNav] = useState(false);
  const [notice, setNotice] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState({
    showTitle: "",
    showDescription: "",
    showCover: "",
    showBanner: "",
    episodeTitle: "",
    episodeDescription: "",
    episodeUrl: "",
    thumbnailUrl: "",
    trailerUrl: "",
    subtitleUrl: "",
    episodeDuration: "",
  });

  useEffect(() => {
    setShows(JSON.parse(localStorage.getItem(SHOWS_STORAGE_KEY) || "null") || initialShows);
    setMyList(JSON.parse(localStorage.getItem(LIST_STORAGE_KEY) || "[]"));
    setReactions(JSON.parse(localStorage.getItem(REACTIONS_STORAGE_KEY) || "{}"));
    setProgressMap(JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || "{}"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(shows));
  }, [shows, hydrated]);

  useEffect(() => {
    const onScroll = () => setCompactNav(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedShow = useMemo(
    () => shows.find((show) => show.id === selectedShowId) || shows[0],
    [shows, selectedShowId]
  );

  const featuredShow = useMemo(
    () => shows.find((show) => show.featured) || shows[0],
    [shows]
  );

  useEffect(() => {
    if (!selectedShow && shows[0]) setSelectedShowId(shows[0].id);
  }, [selectedShow, shows]);

  useEffect(() => {
    if (!selectedShow) return;
    const episodeBelongsToShow = selectedShow.episodes.some(
      (episode) => episode.id === selectedEpisode?.id
    );
    if (!episodeBelongsToShow) {
      setSelectedEpisode(selectedShow.episodes[0] || null);
    }
  }, [selectedShow, selectedEpisode]);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.clearTimeout(window.__smbaflexNoticeTimer);
    window.__smbaflexNoticeTimer = window.setTimeout(() => setNotice(null), 3600);
  };

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

  const handleGuestEnter = () => {
    setMode("viewer");
    setError("");
    setEnteredCode("");
    setShowIntro(true);
  };

  const logout = () => {
    setMode(null);
    setEnteredCode("");
    setError("");
    setView("home");
  };

  const playShow = (show) => {
    const episode = show.episodes[0];
    if (!episode) {
      setSelectedShowId(show.id);
      setSelectedEpisode(null);
      setView("watch");
      return;
    }
    setSelectedShowId(show.id);
    setSelectedEpisode(episode);
    setProgressMap((prev) => {
      const next = { ...prev, [episode.id]: prev[episode.id] || episode.progress || 3 };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setView("watch");
  };

  const toggleList = (id) => {
    setMyList((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleReaction = (id, type) => {
    setReactions((prev) => {
      const next = { ...prev, [id]: prev[id] === type ? null : type };
      localStorage.setItem(REACTIONS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const addShow = () => {
    if (!form.showTitle.trim()) {
      showNotice("error", "Add a show title before creating a new title.");
      return;
    }
    const show = {
      id: `show-${Date.now()}`,
      title: form.showTitle,
      tagline: "New on SMBAFLEX.",
      description: form.showDescription || "A new cinematic series on SMBAFLEX.",
      cover:
        form.showCover ||
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop",
      banner:
        form.showBanner ||
        form.showCover ||
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1800&auto=format&fit=crop",
      trailer:
        form.showBanner ||
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop",
      featured: false,
      published: true,
      genre: "Drama",
      year: "2026",
      rating: "TV-14",
      match: "89%",
      duration: "36m",
      seasons: 1,
      views: "0",
      heat: 42,
      episodes: [],
    };
    setShows((prev) => [...prev, show]);
    setSelectedShowId(show.id);
    setForm((prev) => ({ ...prev, showTitle: "", showDescription: "", showCover: "", showBanner: "" }));
    showNotice("success", `${show.title} was added to the SMBAFLEX library.`);
  };

  const addEpisode = () => {
    if (!selectedShow) return;
    if (!form.episodeTitle.trim()) {
      showNotice("error", "Add an episode title before saving.");
      return;
    }
    if (!form.episodeUrl.trim()) {
      showNotice("error", "Add a direct MP4 video URL before saving the episode.");
      return;
    }
    const episode = {
      id: `ep-${Date.now()}`,
      title: form.episodeTitle,
      description: form.episodeDescription || "New episode.",
      duration: form.episodeDuration || "35m",
      rating: "TV-14",
      season: 1,
      progress: 0,
      thumbnail:
        form.thumbnailUrl ||
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop",
      videoUrl: form.episodeUrl,
      subtitleUrl: form.subtitleUrl,
    };
    setShows((prev) =>
      prev.map((show) =>
        show.id === selectedShowId ? { ...show, episodes: [...show.episodes, episode] } : show
      )
    );
    setSelectedEpisode(episode);
    setForm((prev) => ({
      ...prev,
      episodeTitle: "",
      episodeDescription: "",
      episodeUrl: "",
      thumbnailUrl: "",
      subtitleUrl: "",
      episodeDuration: "",
    }));
    showNotice("success", `${episode.title} was added to ${selectedShow.title}.`);
  };

  const deleteCurrentShow = () => {
    if (shows.length <= 1) {
      showNotice("error", "You need at least one show in the library.");
      return;
    }
    const nextShows = shows.filter((show) => show.id !== selectedShowId);
    setShows(nextShows);
    setSelectedShowId(nextShows[0].id);
    setSelectedEpisode(nextShows[0].episodes[0] || null);
    showNotice("success", "Show deleted from the library.");
  };

  const makeFeatured = (id) => {
    setShows((prev) => prev.map((show) => ({ ...show, featured: show.id === id })));
    showNotice("success", "Featured content updated.");
  };

  const togglePublish = (id) => {
    setShows((prev) =>
      prev.map((show) => (show.id === id ? { ...show, published: !show.published } : show))
    );
    showNotice("success", "Publish status updated.");
  };

  const deleteEpisode = (episodeId) => {
    if (!selectedShow) return;
    const nextEpisodes = selectedShow.episodes.filter((episode) => episode.id !== episodeId);
    setShows((prev) =>
      prev.map((show) => (show.id === selectedShow.id ? { ...show, episodes: nextEpisodes } : show))
    );
    setSelectedEpisode(nextEpisodes[0] || null);
    showNotice("success", "Episode deleted.");
  };

  if (!mode) {
    return (
      <LoginScreen
        code={enteredCode}
        setCode={setEnteredCode}
        error={error}
        onEnter={handleEnter}
        onGuest={handleGuestEnter}
      />
    );
  }

  if (showIntro) return <IntroAnimation onDone={() => setShowIntro(false)} />;

  return (
    <main className={styles.appPage}>
      <div className={styles.appGrain} />
      <Navbar
        activeView={view}
        setView={setView}
        mode={mode}
        query={query}
        setQuery={setQuery}
        logout={logout}
        compact={compactNav}
      />
      {view === "home" && (
        <HomeExperience
          shows={shows}
          featuredShow={featuredShow}
          myList={myList}
          progressMap={progressMap}
          query={query}
          onPlay={playShow}
          onInfo={(show) => {
            setSelectedShowId(show.id);
            setSelectedEpisode(show.episodes[0] || null);
            setView("watch");
          }}
          onToggleList={toggleList}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
      {view === "watch" && (
        <WatchExperience
          show={selectedShow}
          episode={selectedEpisode}
          onSelectEpisode={setSelectedEpisode}
          onBack={() => setView("home")}
          onLike={toggleReaction}
          liked={selectedShow ? reactions[selectedShow.id] === "like" : false}
          disliked={selectedShow ? reactions[selectedShow.id] === "dislike" : false}
          progressMap={progressMap}
          setProgressMap={setProgressMap}
        />
      )}
      {view === "creator" && mode === "creator" && (
        <CreatorDashboard
          shows={shows}
          selectedShow={selectedShow}
          setSelectedShowId={setSelectedShowId}
          addShow={addShow}
          addEpisode={addEpisode}
          deleteCurrentShow={deleteCurrentShow}
          makeFeatured={makeFeatured}
          togglePublish={togglePublish}
          deleteEpisode={deleteEpisode}
          selectedEpisode={selectedEpisode}
          setSelectedEpisode={setSelectedEpisode}
          notice={notice}
          form={form}
          setForm={setForm}
        />
      )}
    </main>
  );
}
