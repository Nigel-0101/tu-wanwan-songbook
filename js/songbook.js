(function (root) {
  const PAGE_SIZE = 10;
  const norm = value => String(value || "").trim().toLowerCase();

  function filterSongs(songs, filters = {}) {
    const q = norm(filters.query);
    return songs.filter(song => {
      const hay = norm([song.title,song.artist,song.language,song.genre,song.type].join(" "));
      return (!q || hay.includes(q)) &&
        (!filters.language || song.language === filters.language) &&
        (!filters.genre || song.genre === filters.genre) &&
        (!filters.type || song.type === filters.type);
    });
  }

  function pageCount(songs, size = PAGE_SIZE) {
    return Math.max(1, Math.ceil(songs.length / size));
  }

  function paginate(songs, page = 1, size = PAGE_SIZE) {
    const safe = Math.min(Math.max(1, Number(page) || 1), pageCount(songs, size));
    return {page:safe,pages:pageCount(songs,size),items:songs.slice((safe-1)*size,safe*size)};
  }

  function pageWindow(page, pages) {
    if (pages <= 7) return Array.from({length:pages},(_,index)=>index+1);
    if (page <= 3) return [1,2,3,"…",pages];
    if (page >= pages - 2) return [1,"…",pages-2,pages-1,pages];
    return [1,"…",page-1,page,page+1,"…",pages];
  }

  function resolvePageInput(value, pages, currentPage = 1) {
    if (String(value).trim() === "") return currentPage;
    const numeric = Number.parseInt(value,10);
    if (!Number.isFinite(numeric)) return currentPage;
    return Math.min(Math.max(1,numeric),Math.max(1,pages));
  }

  function randomSong(songs, random = Math.random) {
    return songs.length ? songs[Math.floor(random()*songs.length)] : null;
  }

  function formatOrder(song) {
    return `点歌 ${song.title}（${song.artist}）`;
  }

  const api = {PAGE_SIZE,filterSongs,pageCount,paginate,pageWindow,resolvePageInput,randomSong,formatOrder};
  root.Songbook = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
