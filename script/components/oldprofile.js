// (function () {
//   window.Components = window.Components || {};

//   window.Components.profile = {
//     render(container, section, config) {
//       const div = document.createElement("div");
//       div.className = "section section-profile";
//       div.innerHTML = `
//         <div class="profile-wrapper">
//           <img src="${config.photo}" alt="profile" class="profile-picture" />
//         </div>
//         <div class="wish">
//           <h3 class="wish-hbd">${section.wishTitle || "Happy Birthday!"}</h3>
//           <h5 class="wish-text">${section.wishText || ""}</h5>
//         </div>
//       `;
//       // Split wish title into spans for stagger animation
//       const hbd = div.querySelector(".wish-hbd");
//       hbd.innerHTML = hbd.textContent
//         .split("")
//         .map((ch) => `<span>${ch}</span>`)
//         .join("");

//       container.appendChild(div);
//       return div;
//     },

//     animate(tl, el) {
//       // Photo appears with gentle scale
//       tl.from(el.querySelector(".profile-picture"), {
//         duration: 0.8, scale: 0.5, opacity: 0, ease: "back.out(1.4)",
//       }, "-=2")
//       // Wish title letters stagger in
//       .from(el.querySelectorAll(".wish-hbd span"), {
//         duration: 0.5, opacity: 0, y: -30,
//         ease: "back.out(1.7)", stagger: 0.06,
//       })
//       // Color each letter
//       .to(el.querySelectorAll(".wish-hbd span"), {
//         color: "var(--primary)", duration: 0.4,
//         stagger: 0.04, ease: "none",
//       }, "-=0.3")
//       // Wish text fades in
//       .from(el.querySelector(".wish-text"), {
//         duration: 0.5, opacity: 0, y: 10,
//       }, "-=0.2");
//     },

//     exit(tl, el) {
//       tl.to(el, {
//         duration: 0.6, opacity: 0, y: 20,
//       });
//     },
//   };
// })();


(function () {
  window.Components = window.Components || {};

  window.Components.profile = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-profile";

      /*
       * You can provide multiple images in your config like:
       *
       * photos: [
       *   "./Photos-1-001/img01.jpg",
       *   "./Photos-1-001/img02.jpg",
       *   "./Photos-1-001/img03.jpg",
       *   "./Photos-1-001/img04.jpg"
       * ]
       *
       * If "photos" is not provided, the original "photo" is used.
       */

      const photos =
        Array.isArray(config.photos) && config.photos.length > 0
          ? config.photos
          : [config.photo];

      div.innerHTML = `
        <div class="profile-wrapper">
          <div class="profile-border-animation">
            <img
              src="${photos[0]}"
              alt="profile"
              class="profile-picture"
            />
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

      const image = div.querySelector(".profile-picture");
      const border = div.querySelector(".profile-border-animation");

      // ---------------------------------------------------------
      // Split wish title into spans for stagger animation
      // ---------------------------------------------------------

      const hbd = div.querySelector(".wish-hbd");

      hbd.innerHTML = hbd.textContent
        .split("")
        .map((ch) => {
          if (ch === " ") {
            return `<span>&nbsp;</span>`;
          }

          return `<span>${ch}</span>`;
        })
        .join("");

      // ---------------------------------------------------------
      // Store slideshow state
      // ---------------------------------------------------------

      let currentImage = 0;
      let imageTimer = null;
      let borderTimer = null;

      /*
       * Prevent the timers from continuing after the section
       * has been removed from the screen.
       */
      div._profileCleanup = () => {
        if (imageTimer) {
          clearInterval(imageTimer);
          imageTimer = null;
        }

        if (borderTimer) {
          clearInterval(borderTimer);
          borderTimer = null;
        }
      };

      // ---------------------------------------------------------
      // Image slideshow
      // ---------------------------------------------------------

      const changeImage = () => {
        if (photos.length <= 1) return;

        const nextImage = (currentImage + 1) % photos.length;

        // Fade image out
        image.classList.remove("profile-image-show");

        image.classList.add("profile-image-hide");

        setTimeout(() => {
          currentImage = nextImage;

          image.src = photos[currentImage];

          /*
           * Force browser to recognize the image change before
           * starting the fade-in animation.
           */
          requestAnimationFrame(() => {
            image.classList.remove("profile-image-hide");
            image.classList.add("profile-image-show");
          });
        }, 650);
      };

      // ---------------------------------------------------------
      // Border animation
      // ---------------------------------------------------------

      const animateBorder = () => {
        border.classList.remove("profile-border-animate");

        /*
         * Force reflow so the animation can restart every time.
         */
        void border.offsetWidth;

        border.classList.add("profile-border-animate");
      };

      // ---------------------------------------------------------
      // Start slideshow after initial animation
      // ---------------------------------------------------------

      imageTimer = setInterval(changeImage, 4000);

      borderTimer = setInterval(animateBorder, 2200);

      // ---------------------------------------------------------
      // Initial state
      // ---------------------------------------------------------

      image.classList.add("profile-image-show");

      // ---------------------------------------------------------
      // Add element to page
      // ---------------------------------------------------------

      container.appendChild(div);

      return div;
    },

    // =========================================================
    // ENTER ANIMATION
    // =========================================================

    animate(tl, el) {
      const image = el.querySelector(".profile-picture");
      const border = el.querySelector(".profile-border-animation");
      const titleLetters = el.querySelectorAll(".wish-hbd span");
      const wishText = el.querySelector(".wish-text");

      // -------------------------------------------------------
      // Initial image appearance
      // -------------------------------------------------------

      tl.from(image, {
        duration: 0.9,
        scale: 0.55,
        opacity: 0,
        rotation: -4,
        ease: "back.out(1.4)",
      }, "-=2")

        // -------------------------------------------------------
        // Border appears slightly after image
        // -------------------------------------------------------

        .from(border, {
          duration: 0.8,
          scale: 0.85,
          opacity: 0,
          rotation: 4,
          ease: "back.out(1.7)",
        }, "-=0.7")

        // -------------------------------------------------------
        // Gentle image zoom
        // -------------------------------------------------------

        .to(image, {
          duration: 2.5,
          scale: 1.04,
          ease: "power1.inOut",
        }, "-=0.3")

        // -------------------------------------------------------
        // Wish title letters stagger in
        // -------------------------------------------------------

        .from(titleLetters, {
          duration: 0.5,
          opacity: 0,
          y: -30,
          rotation: -3,
          ease: "back.out(1.7)",
          stagger: 0.06,
        })

        // -------------------------------------------------------
        // Color each letter
        // -------------------------------------------------------

        .to(titleLetters, {
          color: "var(--primary)",
          duration: 0.4,
          stagger: 0.04,
          ease: "none",
        }, "-=0.3")

        // -------------------------------------------------------
        // Wish text fades in
        // -------------------------------------------------------

        .from(wishText, {
          duration: 0.5,
          opacity: 0,
          y: 10,
        }, "-=0.2");
    },

    // =========================================================
    // EXIT ANIMATION
    // =========================================================

    exit(tl, el) {
      /*
       * Stop slideshow/border timers when leaving the section.
       */
      if (el._profileCleanup) {
        el._profileCleanup();
      }

      tl.to(el, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: "power2.in",
      });
    },
  };
})();