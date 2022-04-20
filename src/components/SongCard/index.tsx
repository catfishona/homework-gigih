import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSelectedTracks } from "../../redux/trackSlice";

interface SongProps {
  imageUrl: string;
  title: string;
  artist: string;
  album: string;
  trackUri: string;
}

export function SongCard(props: SongProps) {
  const dispatch = useAppDispatch();
  let { selectedTracks } = useAppSelector((state: any) => state.track);

  const handleSelect = (trackUri: string) => {
    if (selectedTracks.includes(trackUri)) {
      // TODO: make track a global type ?
      dispatch(
        setSelectedTracks(selectedTracks.filter((track: any) => track !== trackUri))
      );
    } else {
      dispatch(setSelectedTracks([...selectedTracks, trackUri]));
    }
  };

  return (
    <div data-testId="songCard" className="song-area">
      <div className="album-img">
        <img src={props.imageUrl} className="song-img" alt={props.title} />
      </div>
      <div className="song-details">
        <div className="song-item title">
          <p>{props.title}</p>
        </div>
        <div className="song-item artist">
          <p>{props.artist}</p>
        </div>
        <div className="song-item album">
          <p>{props.album}</p>
        </div>
        <div>
          <button
            data-testId="selectButton"
            className="text-sm w-20text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-1 px-4 rounded"
            type="button"
            onClick={() => handleSelect(props.trackUri)}
          >
            {selectedTracks.includes(props.trackUri) ? "deselect" : "select"}
          </button>
        </div>
      </div>
    </div>
  );
}