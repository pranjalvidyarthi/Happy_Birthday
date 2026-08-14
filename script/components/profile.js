(function () {
    window.Components = window.Components || {};

    window.Components.profile = {

        render(container, section, config) {

            const div = document.createElement("div");

            div.className = "section section-profile";

            div.innerHTML = `
                <div class="profile-wrapper">

                    <div class="profile-border-animation">

                        <div class="profile-image-container">

                            <video
                                class="profile-video"
                                autoplay
                                muted
                                loop
                                playsinline
                                webkit-playsinline
                                preload="auto"
                            >
                                <source
                                    src="./video/edit.mp4"
                                    type="video/mp4"
                                />

                                Your browser does not support
                                HTML5 video.
                            </video>

                        </div>

                    </div>

                </div>

                <div class="wish">

                    <h3 class="wish-hbd">
                        ${section.wishTitle || "Happy Birthday!"}
                    </h3>

                    <h5 class="wish-text">
                        ${section.wishText || ""}
                    </h5>

                </div>
            `;


            // =====================================================
            // GET ELEMENTS
            // =====================================================

            const video =
                div.querySelector(".profile-video");

            const border =
                div.querySelector(
                    ".profile-border-animation"
                );

            const hbd =
                div.querySelector(".wish-hbd");


            // =====================================================
            // VIDEO SETTINGS
            // =====================================================

            if (video) {

                // Explicitly force muted autoplay
                video.muted = true;
                video.defaultMuted = true;

                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;

                // -------------------------------------------------
                // Start video
                // -------------------------------------------------

                const startVideo = () => {

                    if (!video) return;

                    video.muted = true;

                    const playPromise =
                        video.play();

                    if (playPromise !== undefined) {

                        playPromise
                            .then(() => {

                                console.log(
                                    "▶️ Birthday video started."
                                );

                            })
                            .catch((error) => {

                                console.warn(
                                    "⚠️ Video autoplay was blocked:",
                                    error
                                );

                            });

                    }
                };


                // Try immediately
                startVideo();


                // Try again after rendering
                setTimeout(() => {

                    startVideo();

                }, 100);


                // Try again after section animation
                setTimeout(() => {

                    startVideo();

                }, 1000);


                // -------------------------------------------------
                // VIDEO LOADED
                // -------------------------------------------------

                video.addEventListener(
                    "loadeddata",
                    () => {

                        console.log(
                            "✅ Birthday video loaded successfully."
                        );

                        console.log(
                            "Video:",
                            "./video/edit.mp4"
                        );

                        startVideo();

                    }
                );


                // -------------------------------------------------
                // VIDEO CAN PLAY
                // -------------------------------------------------

                video.addEventListener(
                    "canplay",
                    () => {

                        console.log(
                            "▶️ Birthday video can play."
                        );

                    }
                );


                // -------------------------------------------------
                // VIDEO ERROR
                // -------------------------------------------------

                video.addEventListener(
                    "error",
                    (event) => {

                        console.error(
                            "❌ Birthday video could not be loaded."
                        );

                        console.error(
                            "Video path:",
                            "./video/edit.mp4"
                        );

                        console.error(
                            "Video element:",
                            video
                        );

                        console.error(
                            "Error:",
                            event
                        );

                    }
                );


                // -------------------------------------------------
                // Make sure it keeps playing
                // -------------------------------------------------

                video.addEventListener(
                    "pause",
                    () => {

                        if (
                            !video.ended
                        ) {

                            setTimeout(() => {

                                video.play()
                                    .catch(() => {});

                            }, 100);

                        }

                    }
                );


                // -------------------------------------------------
                // Extra loop fallback
                // -------------------------------------------------

                video.addEventListener(
                    "ended",
                    () => {

                        video.currentTime = 0;

                        video.play()
                            .catch(() => {});

                    }
                );

            }


            // =====================================================
            // SPLIT BIRTHDAY TITLE
            // =====================================================

            hbd.innerHTML = hbd.textContent
                .split("")
                .map((char) => {

                    if (char === " ") {

                        return "<span>&nbsp;</span>";

                    }

                    return `<span>${char}</span>`;

                })
                .join("");


            // =====================================================
            // BORDER ANIMATION
            // =====================================================

            let borderTimer = null;

            function animateBorder() {

                if (!border) return;

                border.classList.remove(
                    "profile-border-animate"
                );

                // Force browser repaint
                void border.offsetWidth;

                border.classList.add(
                    "profile-border-animate"
                );

            }


            borderTimer = setInterval(
                animateBorder,
                2200
            );


            // =====================================================
            // CLEANUP
            // =====================================================

            div._profileCleanup = () => {

                if (borderTimer) {

                    clearInterval(borderTimer);

                    borderTimer = null;

                }

                if (video) {

                    video.pause();

                    video.currentTime = 0;

                }

            };


            // =====================================================
            // ADD TO PAGE
            // =====================================================

            container.appendChild(div);

            return div;
        },


        // =========================================================
        // ENTER ANIMATION
        // =========================================================

        animate(tl, el) {

            const wrapper =
                el.querySelector(
                    ".profile-wrapper"
                );

            const border =
                el.querySelector(
                    ".profile-border-animation"
                );

            const video =
                el.querySelector(
                    ".profile-video"
                );

            const titleLetters =
                el.querySelectorAll(
                    ".wish-hbd span"
                );

            const wishText =
                el.querySelector(
                    ".wish-text"
                );


            // -----------------------------------------------------
            // Start video when section animation begins
            // -----------------------------------------------------

            if (video) {

                video.muted = true;

                video.play()
                    .then(() => {

                        console.log(
                            "▶️ Profile video playing."
                        );

                    })
                    .catch((error) => {

                        console.warn(
                            "⚠️ Could not start profile video:",
                            error
                        );

                    });

            }


            // -----------------------------------------------------
            // PROFILE WRAPPER
            // -----------------------------------------------------

            tl.from(wrapper, {

                duration: 0.9,

                scale: 0.7,

                rotation: -4,

                opacity: 0,

                ease: "back.out(1.5)"

            }, "-=1.5")


                // -------------------------------------------------
                // BORDER
                // -------------------------------------------------

                .from(border, {

                    duration: 0.7,

                    scale: 0.85,

                    rotation: 4,

                    opacity: 0,

                    ease: "back.out(1.7)"

                }, "-=0.6")


                // -------------------------------------------------
                // VIDEO
                // -------------------------------------------------

                .from(video, {

                    duration: 0.8,

                    scale: 0.9,

                    opacity: 0,

                    ease: "power2.out"

                }, "-=0.5")


                // -------------------------------------------------
                // TITLE
                // -------------------------------------------------

                .from(titleLetters, {

                    duration: 0.5,

                    opacity: 0,

                    y: -30,

                    rotation: -3,

                    ease: "back.out(1.7)",

                    stagger: 0.06

                })


                // -------------------------------------------------
                // TITLE COLOR
                // -------------------------------------------------

                .to(titleLetters, {

                    color: "var(--primary)",

                    duration: 0.4,

                    stagger: 0.04,

                    ease: "none"

                }, "-=0.3")


                // -------------------------------------------------
                // WISH TEXT
                // -------------------------------------------------

                .from(wishText, {

                    duration: 0.5,

                    opacity: 0,

                    y: 10

                }, "-=0.2");

        },


        // =========================================================
        // EXIT ANIMATION
        // =========================================================

        exit(tl, el) {

            if (el._profileCleanup) {

                el._profileCleanup();

            }


            tl.to(el, {

                duration: 0.6,

                opacity: 0,

                y: 20,

                ease: "power2.in"

            });

        }

    };

})();
