import { useState, useEffect } from 'react';
import axios from 'axios';

function ReversedPlayer({ playlistId }: { playlistId: string }) {
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8000/playlist/${playlistId}`)
      .then(res => setVideoIds(res.data.video_ids));
  }, [playlistId]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < videoIds.length ? prev + 1 : 0));
  };

  if (!videoIds.length) return <p>Loading...</p>;

  const currentVideo = videoIds[currentIndex];

  return (
    <div className="space-y-4">
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default ReversedPlayer;