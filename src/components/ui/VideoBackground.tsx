import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayClassName?: string;
}

const VideoBackground = ({ src, className = "", overlayClassName }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video is already loaded (cached)
    if (video.readyState >= 3) {
      setIsLoaded(true);
    }

    // Force play on mobile - handle autoplay restrictions
    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        const handleInteraction = async () => {
          try {
            await video.play();
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('click', handleInteraction);
          } catch (e) {
            console.log('Video play failed:', e);
          }
        };
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('click', handleInteraction, { once: true });
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient placeholder - visible while video loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Video with fade-in */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        // @ts-ignore - webkit specific attributes for iOS
        webkit-playsinline="true"
        x-webkit-airplay="deny"
        disablePictureInPicture
        disableRemotePlayback
      />
      
      {/* Optional overlay */}
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
};

export default VideoBackground;
