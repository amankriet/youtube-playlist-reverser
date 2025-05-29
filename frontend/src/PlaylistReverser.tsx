import { useEffect, useState } from "react";
import axios from "axios";

function extractPlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function PlaylistReverser() {
  const [url, setUrl] = useState("");
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [authUrl, setAuthUrl] = useState("");

  const fetchAuthUrl = async () => {
    const response = await axios.get("http://localhost:8000/auth-url");
    setAuthUrl(response.data.auth_url);
  };

  useEffect(() => {
    fetchAuthUrl();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const playlistId = extractPlaylistId(url);
    if (!playlistId) {
      setError("Invalid playlist URL");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/playlist/${playlistId}`
      );
      setVideoIds(res.data.video_ids);
      setCurrentIndex(0);
    } catch (err) {
      setError("Failed to fetch playlist videos");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < videoIds.length ? prev + 1 : 0));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Reverse YouTube Playlist Player
      </h1>

      <a href={authUrl}>
        <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
          Connect YouTube
        </button>
      </a>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Paste YouTube playlist URL..."
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
        >
          Load Playlist
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {videoIds.length > 0 && (
        <div className="space-y-4 w-[640px] mx-auto">
          <iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${videoIds[currentIndex]}?autoplay=1&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="grid grid-cols-4 gap-2 mt-4 h-[90px] overflow-y-auto">
            {videoIds.map((id, index) => (
              <button
                key={id}
                className={`text-sm px-4 py-2 rounded ${
                  index === currentIndex ? "bg-gray-300 font-bold" : "bg-white"
                } border hover:bg-gray-100`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next Video
          </button>
          <p className="text-sm text-gray-500">
            Video {currentIndex + 1} of {videoIds.length}
          </p>
        </div>
      )}
    </div>
  );
}
