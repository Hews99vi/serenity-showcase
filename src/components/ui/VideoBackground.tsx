import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlayClassName?: string;
}

const VideoBackground = ({ src, className = "", overlayClassName }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        // Ensure video is muted for autoplay
        video.muted = true;
        video.volume = 0;
        video.defaultMuted = true;
        
        // Attempt to play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('Initial autoplay failed, waiting for user interaction:', error);
        
        // Fallback: wait for any user interaction
        const handleInteraction = async () => {
          try {
            await video.play();
            setIsLoaded(true);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
          } catch (e) {
            console.error('Video play failed after interaction:', e);
          }
        };
        
        document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
        document.addEventListener('click', handleInteraction, { once: true });
        document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
      }
    };

    // Wait for video to be ready
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused && !hasError) {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      video.removeEventListener('loadeddata', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasError]);

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video loading error:', e);
    setHasError(true);
    setIsLoaded(true); // Show overlay if video fails
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient placeholder - visible while video loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal transition-opacity duration-1000 ${isLoaded && !hasError ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Video with fade-in */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'} ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        onError={handleError}
        // @ts-expect-error - webkit specific attributes for iOS
        webkit-playsinline="true"
        x-webkit-airplay="deny"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay */}
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
};

export default VideoBackground;

