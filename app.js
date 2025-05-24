const App = () => {
  const videoRef = React.useRef(null);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [showStageButton, setShowStageButton] = React.useState(false);

  const handleEnableAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play()
        .then(() => {
          setAudioEnabled(true);
          setTimeout(() => setShowStageButton(true), 1000);
        })
        .catch(e => {
          console.warn("Auto-play failed:", e);
          document.addEventListener('click', () => {
            videoRef.current.play()
              .then(() => {
                setAudioEnabled(true);
                setTimeout(() => setShowStageButton(true), 1000);
              });
          }, { once: true });
        });
    }
  };

  return (
    <div>
      {/* Fullscreen Video */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={!audioEnabled}
        >
          <source src="video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Button Container (Same Position) */}
      <div className="button-container">
        {!audioEnabled && (
          <button 
            className="control-button"
            onClick={handleEnableAudio}
          >
            🟢 LET'S GO! 🟢
          </button>
        )}
        
        {showStageButton && (
          <a
            href="https://www.gofundme.com/f/digibuddy-ai-that-works-for-you-daily"
            className="control-button stage-button"
            target="_blank"
            rel="noopener noreferrer"
          >
           🔼 ENTER STAGE 1 🔼
          </a>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));