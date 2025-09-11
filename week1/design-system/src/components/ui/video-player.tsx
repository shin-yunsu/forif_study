"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const videoPlayerVariants = cva(
  "relative overflow-hidden bg-black",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      aspectRatio: {
        video: "aspect-video",
        square: "aspect-square",
        "4/3": "aspect-[4/3]",
        "21/9": "aspect-[21/9]",
      },
    },
    defaultVariants: {
      rounded: "lg",
      aspectRatio: "video",
    },
  }
)

interface VideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement>,
    VariantProps<typeof videoPlayerVariants> {
  src: string
  poster?: string
  thumbnailOverlay?: boolean
  showControls?: boolean
  onPlay?: () => void
  onPause?: () => void
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({
    className,
    rounded,
    aspectRatio,
    src,
    poster,
    thumbnailOverlay = true,
    showControls = true,
    onPlay,
    onPause,
    ...props
  }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isMuted, setIsMuted] = React.useState(false)
    const [showOverlay, setShowOverlay] = React.useState(true)
    const videoRef = React.useRef<HTMLVideoElement>(null)

    React.useImperativeHandle(ref, () => videoRef.current!, [])

    const togglePlay = () => {
      const video = videoRef.current
      if (!video) return

      if (video.paused) {
        video.play()
        setIsPlaying(true)
        setShowOverlay(false)
        onPlay?.()
      } else {
        video.pause()
        setIsPlaying(false)
        setShowOverlay(true)
        onPause?.()
      }
    }

    const toggleMute = () => {
      const video = videoRef.current
      if (!video) return

      video.muted = !video.muted
      setIsMuted(video.muted)
    }

    const toggleFullscreen = () => {
      const video = videoRef.current
      if (!video) return

      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        video.requestFullscreen()
      }
    }

    const handleMouseEnter = () => {
      setShowOverlay(true)
    }

    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowOverlay(false)
      }
    }

    return (
      <div 
        className={cn(videoPlayerVariants({ rounded, aspectRatio }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          onClick={togglePlay}
          {...props}
        />

        {/* Thumbnail Overlay */}
        {thumbnailOverlay && showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200">
            <Button
              size="icon"
              variant="secondary"
              className="h-16 w-16 rounded-full bg-white/90 hover:bg-white"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-black" />
              ) : (
                <Play className="ml-1 h-8 w-8 text-black" />
              )}
            </Button>
          </div>
        )}

        {/* Controls */}
        {showControls && showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
)

VideoPlayer.displayName = "VideoPlayer"

export { VideoPlayer, type VideoPlayerProps }