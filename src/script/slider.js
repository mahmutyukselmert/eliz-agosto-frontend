export default class SmartCarousel {
    constructor(element, options = {}) {
        this.container = element;
        if (!this.container) return;

        this.players = {};

        this.carousel = new bootstrap.Carousel(this.container, {
            interval: false,
            pause: false,
            keyboard: true,
            ...options
        });

        this.timer = null;
        this.startTime = null;
        this.duration = 0;
        this.init();
    }

    init() {
        this.setupObserver(); 
        this.container.addEventListener("slid.bs.carousel", () => this.playSlide());
        
        // "e" (event) parametresini aldık ki sıradaki slayt
        this.container.addEventListener("slide.bs.carousel", (e) => {
            clearTimeout(this.timer);
            this.stopAllVideos();
            this.emitEvent('carousel:stop'); 

            // Bir sonraki slayt YouTube ise, API'yi geçiş sırasında önden indirmeye başla
            if (e.relatedTarget && e.relatedTarget.getAttribute("data-type") === "youtube") {
                this.loadYouTubeAPI();
            }
        });
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playSlide();
                } else {
                    clearTimeout(this.timer);
                    this.stopAllVideos(); 
                }
            });
        }, { threshold: 0.1 });
        observer.observe(this.container);
    }

    loadYouTubeAPI() {
        if (document.getElementById('yt-api-script')) return;
        const tag = document.createElement('script');
        tag.id = 'yt-api-script'; 
        tag.src = "https://www.youtube.com/iframe_api";
        
        document.head.appendChild(tag); 
    }

    playSlide() {
        const activeItem = this.container.querySelector(".carousel-item.active");
        if (!activeItem) return;

        const type = activeItem.getAttribute("data-type");
        const video = activeItem.querySelector("video");

        if (type === "youtube") {
            this.handleYouTube(activeItem);
        } else if (type === "video" && video) {
            if (video.readyState < 2) {
                video.onloadedmetadata = () => this.handleVideo(video);
            } else {
                this.handleVideo(video);
            }
        } else {
            this.handleImage(activeItem);
        }
    }

    handleYouTube(item) {
        // EĞER 1. SLAYT YOUTUBE İSE (Sayfa açılışında API buraya kadar inmediyse diye güvenlik önlemi)
        this.loadYouTubeAPI();

        if (typeof window.YT === 'undefined' || typeof window.YT.Player === 'undefined') {
            setTimeout(() => this.handleYouTube(item), 100);
            return;
        }

        window.YT.ready(() => {
            const videoId = item.getAttribute("data-video-id");
            const playerDivId = `player-${videoId}`;
            
            const isMuted = item.getAttribute("data-muted") !== "false"; 

            if (!this.players[videoId]) {
                this.players[videoId] = new window.YT.Player(playerDivId, {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    playerVars: { 
                        'autoplay': 1, 
                        'mute': isMuted ? 1 : 0, 
                        'controls': isMuted ? 0 : 1, 
                        'rel': 0,
                        'playsinline': 1
                    },
                    events: {
                        'onReady': (event) => {
                            if (isMuted) {
                                event.target.mute();
                            } else {
                                event.target.unMute();
                                event.target.setVolume(100);
                            }
                            event.target.playVideo();
                        },
                        'onStateChange': (event) => {
                            if (event.data === 0) {
                                this.carousel.next();
                            }
                        }
                    }
                });
            } else {
                this.players[videoId].seekTo(0);
                if (isMuted) {
                    this.players[videoId].mute();
                } else {
                    this.players[videoId].unMute();
                }
                this.players[videoId].playVideo();
            }
        });
    }

    handleVideo(video) {
        const duration = video.duration * 1000;
        this.emitEvent('carousel:start', { duration });

        video.currentTime = 0;
        video.play().catch(err => {
            console.warn("Otomatik oynatma engellendi, 4sn sonra geçiliyor.");
            this.setFallbackTimer(4000);
        });

        video.onended = () => this.carousel.next();
    }

    handleImage(item) {
        let duration = parseInt(item.getAttribute("data-interval")) || 5000;
        this.emitEvent('carousel:start', { duration });

        this.timer = setTimeout(() => {
            this.carousel.next();
        }, duration);
    }

    stopAllVideos() {
        const videos = this.container.querySelectorAll("video");
        videos.forEach(v => {
            v.pause();
            v.currentTime = 0; 
        });
        Object.values(this.players).forEach(player => {
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
                if (typeof player.seekTo === 'function') {
                    player.seekTo(0);
                }
            }
        });
    }

    setFallbackTimer(ms) {
        this.timer = setTimeout(() => this.carousel.next(), ms);
    }

    emitEvent(name, detail = {}) {
        const event = new CustomEvent(name, { detail });
        this.container.dispatchEvent(event);
    }
}