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
            // VIDEO DEBUGGING
            // =====================================================

            video.addEventListener("loadeddata", () => {

                console.log(
                    "✅ Birthday photo video loaded successfully."
                );

            });


            video.addEventListener("error", (event) => {

                console.error(
                    "❌ Birthday photo video could not be loaded."
                );

                console.error(
                    "Video path:",
                    "./videos/birthday-photos.mp4"
                );

                console.error(
                    "Error:",
                    event
                );

            });


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
                el.querySelector(".profile-wrapper");

            const border =
                el.querySelector(
                    ".profile-border-animation"
                );

            const video =
                el.querySelector(".profile-video");

            const titleLetters =
                el.querySelectorAll(
                    ".wish-hbd span"
                );

            const wishText =
                el.querySelector(".wish-text");


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


                // -----------------------------------------------------
                // BORDER
                // -----------------------------------------------------

                .from(border, {

                    duration: 0.7,

                    scale: 0.85,

                    rotation: 4,

                    opacity: 0,

                    ease: "back.out(1.7)"

                }, "-=0.6")


                // -----------------------------------------------------
                // VIDEO
                // -----------------------------------------------------

                .from(video, {

                    duration: 0.8,

                    scale: 0.9,

                    opacity: 0,

                    ease: "power2.out"

                }, "-=0.5")


                // -----------------------------------------------------
                // TITLE
                // -----------------------------------------------------

                .from(titleLetters, {

                    duration: 0.5,

                    opacity: 0,

                    y: -30,

                    rotation: -3,

                    ease: "back.out(1.7)",

                    stagger: 0.06

                })


                // -----------------------------------------------------
                // TITLE COLOR
                // -----------------------------------------------------

                .to(titleLetters, {

                    color: "var(--primary)",

                    duration: 0.4,

                    stagger: 0.04,

                    ease: "none"

                }, "-=0.3")


                // -----------------------------------------------------
                // WISH TEXT
                // -----------------------------------------------------

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