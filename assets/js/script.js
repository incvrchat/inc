(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const assetBase = document.body.dataset.assetBase || "/inc/assets/";

    // @@@ 螟ｧ蟄ｦ繝ｭ繧ｴ繧帝＆縺・ｦ∫ｴ縺ｫ隍・｣ｽ縺吶ｋ
    const targetLogo = document.querySelector(".logo-university img");
    const targetLogoPcImg = document.querySelector(".logo-university-pc img");
    if (targetLogo && targetLogoPcImg) {
      const src = targetLogo.getAttribute("src");
      targetLogoPcImg.setAttribute("src", src);
    }

    // @@@@ 繧ｳ繝ｳ繝・Φ繝・・繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ繧定ｦ九※繧ｰ繝ｭ繝ｼ繝舌Ν繝翫ン縺ｫ鬆・岼繧堤函謌・    const globalNav = document.getElementById("nav-list");
    const sections = document.querySelectorAll("section");
    const dropLists = document.querySelectorAll(".tab-wrapp div");
    function createGlobalNav() {
      const navList = document.createElement("ul");
      sections.forEach((section, index) => {
        const sectionTitle = section.getAttribute("data-title");
        const sectionUniqeClass = section.getAttribute("data-class");
        const sectionIsAccordion = section.getAttribute("data-accordion");

        const navItem = document.createElement("li");
        navItem.classList.add(sectionUniqeClass, sectionIsAccordion);
        const link = document.createElement("a");
        link.href = `#${section.id}`;
        link.textContent = sectionTitle;

        if (sectionIsAccordion === "nav-drop") {
          const dropDiv = document.createElement("div");
          dropDiv.classList.add("nav-drop-main");
          dropDiv.appendChild(link);

          const dropdownImg = document.createElement("div");
          dropdownImg.innerHTML = `<img src="${assetBase}images/ico/no-farames/ico-dropdown.svg">`;

          const ul = document.createElement("ul");

          navItem.appendChild(dropDiv);
          dropDiv.appendChild(dropdownImg);
          navItem.appendChild(ul);
        } else {
          navItem.appendChild(link);
        }

        navList.appendChild(navItem);
      });

      globalNav.appendChild(navList);
    }

    createGlobalNav();

    const hashTarget = document.querySelector(".nav-drop-main a");
    const hash = hashTarget ? hashTarget.getAttribute("href") : null;

    if (hash) {
      dropLists.forEach((dropList, index) => {
        const accordionWrapp = document.querySelector(".nav-drop ul");
        if (!accordionWrapp) {
          return;
        }
        const acoItem = document.createElement("li");
        const acoHref = document.createElement("a");
        acoHref.href = hash;
        acoHref.textContent = dropList.getAttribute("data-index");
        acoItem.setAttribute("data-slide", index + 1);
        acoItem.appendChild(acoHref);
        accordionWrapp.appendChild(acoItem);
      });
    }

    // @@@@@ window繝ｪ繧ｵ繧､繧ｺ譎ゅ↓繝ｪ繝ｭ繝ｼ繝峨ｒ縺輔○繧・    const breakPoint = 769;
    let resizeFlag;
    window.addEventListener(
      "load",
      () => {
        if (breakPoint < window.innerWidth) {
          resizeFlag = false;
        } else {
          resizeFlag = true;
        }
        resizeWindow();
      },
      false
    );
    const resizeWindow = () => {
      window.addEventListener(
        "resize",
        () => {
          if (breakPoint < window.innerWidth && resizeFlag) {
            window.location.reload();
            resizeFlag = false;
          } else if (breakPoint >= window.innerWidth && !resizeFlag) {
            resizeFlag = true;
          }
        },
        false
      );
    };

    // 繝舌・繧ｬ繝ｼ繝｡繝九Η繝ｼ
    const trigger = document.getElementById("burger");
    const nav = document.getElementById("g-nav");
    const navInner = document.querySelector(".nav-inner");
    const closeTrigger = document.querySelectorAll("[data-close]");
    const lay = document.querySelector(".overlay");
    const body = document.body;
    let isOpen = false;

    trigger.addEventListener("click", toggleMenu, false);

    function toggleMenu() {
      isOpen = !isOpen;
      if (isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    }

    function wait() {
      body.classList.add("wait");
    }
    function able() {
      body.classList.remove("wait");
    }

    function setDisplay() {
      return new Promise((resolve) => {
        nav.style.display = "block";
        resolve();
      });
    }

    function fadeIn() {
      return new Promise((resolve) => {
        lay.style.opacity = 1;
        lay.addEventListener("transitionend", resolve, { once: true });
      });
    }

    function moveHorizontally() {
      return new Promise((resolve) => {
        navInner.style.transition = navInner.style.transform =
          "translate3d(0, 0, 0)";
        navInner.addEventListener("transitionend", resolve, { once: true });
      });
    }

    function moveNavInner() {
      return new Promise((resolve) => {
        navInner.style.transform = "translate3d(100%, 0, 0)";
        navInner.addEventListener("transitionend", resolve, { once: true });
      });
    }

    function fadeOutLay() {
      return new Promise((resolve) => {
        lay.style.opacity = 0;
        lay.addEventListener("transitionend", resolve, { once: true });
      });
    }

    function setNavDisplayNone() {
      nav.style.display = "none";
      return Promise.resolve();
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function openMenu() {
      isOpen = true;
      body.style.overflow = "hidden";
      body.classList.add("nav-open");
      setDisplay()
        .then(wait)
        .then(() => delay(200))
        .then(fadeIn)
        .then(moveHorizontally)
        .then(() => {
          able();
        });
    }

    function closeMenu() {
      isOpen = false;
      body.style.overflow = null;
      body.classList.remove("nav-open");
      setDisplay()
        .then(wait)
        .then(moveNavInner)
        .then(fadeOutLay)
        .then(() => delay(200))
        .then(setNavDisplayNone)
        .then(() => {
          able();
        });
    }

    const spMenus = document.querySelectorAll(".nav-default a");
    const windowSm = 768;

    function closeMenuOnMobile() {
      if (window.innerWidth <= windowSm) {
        spMenus.forEach((spMenu, i) => {
          spMenu.addEventListener("click", function (event) {
            if (isOpen) {
              event.preventDefault();
              closeMenu();
            }
          });
        });
      }
    }
    window.addEventListener("resize", closeMenuOnMobile);
    window.addEventListener("load", closeMenuOnMobile);

    // @@@@ 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ繧偵そ繧ｯ繧ｷ繝ｧ繝ｳ縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺ｨ騾｣蜍輔＆縺帙※繧ｫ繝ｬ繝ｳ繝医ｒ莉倥￠譖ｿ縺医ｋ
    // 蝓ｺ貅也せ縺ｮ貅門ｙ
    var elemTop = [];

    // 迴ｾ蝨ｨ蝨ｰ繧貞叙蠕励☆繧九◆繧√・險ｭ螳壹ｒ髢｢謨ｰ縺ｧ縺ｾ縺ｨ繧√ｋ
    function PositionCheck() {
      // header縺ｮ鬮倥＆繧貞叙蠕・      var header = document.getElementById("header");
      var headerH = header.offsetHeight;

      // .scroll-point繧ｯ繝ｩ繧ｹ縺後▽縺・◆繧ｨ繝ｪ繧｢縺ｮ菴咲ｽｮ繧貞叙蠕励☆繧玖ｨｭ螳・      var scrollPoints = document.querySelectorAll(".scroll-point");
      scrollPoints.forEach(function (point, i) {
        var rect = point.getBoundingClientRect();
        elemTop[i] = Math.round(rect.top + window.scrollY - headerH);
      });
    }

    // 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｫ迴ｾ蝨ｨ蝨ｰ縺ｮ繧ｯ繝ｩ繧ｹ繧偵▽縺代ｋ縺溘ａ縺ｮ險ｭ螳・    function ScrollAnime() {
      // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ蛟､繧貞叙蠕・      var scroll = Math.round(window.scrollY);
      var navItems = document.querySelectorAll("#g-nav .nav-default");

      // 蜈ｨ縺ｦ縺ｮ繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ迴ｾ蝨ｨ蝨ｰ繧ｯ繝ｩ繧ｹ繧帝勁蜴ｻ
      navItems.forEach(function (item) {
        item.classList.remove("current");
      });

      for (var i = 0; i < elemTop.length - 1; i++) {
        if (scroll >= elemTop[i] && scroll < elemTop[i + 1]) {
          navItems[i].classList.add("current");
          break;
        }
      }
      if (scroll >= elemTop[elemTop.length - 1]) {
        navItems[elemTop.length - 1].classList.add("current");
      }
    }

    // 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ繧偵け繝ｪ繝・け縺励◆髫帙・繧ｹ繝繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
    var navLinks = document.querySelectorAll("#g-nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var elmHash = this.getAttribute("href");
        if (!elmHash || !elmHash.startsWith("#")) {
          return;
        }

        event.preventDefault();
        var header = document.getElementById("header");
        var headerH = header.offsetHeight;
        var pos = Math.round(
          document.querySelector(elmHash).getBoundingClientRect().top +
            window.scrollY -
            headerH
        );
        window.scrollTo({
          top: pos,
          behavior: "smooth",
        });
      });
    });

    window.addEventListener("scroll", function () {
      ScrollAnime();
    });
    setTimeout(() => {
      PositionCheck();
    }, 400);

    ScrollAnime();

    window.addEventListener("resize", function () {
      PositionCheck();
    });

    // @@@@@ 繧｢繧ｳ繝ｼ繝・ぅ繧ｪ繝ｳ
    const accordionButtons = document.querySelectorAll(".nav-drop-main");

    accordionButtons.forEach((accordionBtn, index) => {
      accordionBtn.addEventListener("click", (e) => {
        const parentLi = e.target.closest("li");
        const content = parentLi.querySelector("ul");
        const isOpen = parentLi.classList.toggle("is-active");
        if (isOpen) {
          content.style.height = "auto";
          const h = content.offsetHeight;
          content.style.height = "0";
          content.style.transition = "height 300ms";
          content.offsetHeight;
          content.style.height = h + "px";
        } else {
          content.style.height = "0";
        }
        accordionButtons.forEach((btn, i) => {
          if (i !== index) {
            btn.closest("li").classList.remove("is-active");
            btn.nextElementSibling.style.height = "0";
          }
        });
        const container = parentLi.closest(".scroll-control");
        if (container !== null) {
          container.classList.toggle("is-active", isOpen);
        }
      });
    });

    // @@@@ 繧ｿ繝悶せ繝ｩ繧､繝・    const swiperTabs = document.querySelectorAll(".mySwiper .swiper-slide");
    const hasSwiper =
      typeof Swiper !== "undefined" &&
      document.querySelector(".mySwiper") &&
      document.querySelector(".mySwiper2") &&
      swiperTabs.length > 0;

    if (hasSwiper) {
      var pvs;
      var tabLength = swiperTabs.length;

      if (tabLength > 4) {
        pvs = "4.5";
      } else {
        pvs = tabLength;
      }

      var swiper = new Swiper(".mySwiper", {
        slidesPerView: pvs,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          init: () => {
            const navLinks = document.querySelectorAll(".nav-drop ul li");
            navLinks.forEach((link) => {
              link.addEventListener("click", (event) => {
                event.preventDefault();
                const slideNumber = link.getAttribute("data-slide");
                swiper2.slideTo(slideNumber - 1);
              });
            });
          },
        },
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        autoHeight: true,
        simulateTouch: false,
        thumbs: {
          swiper: swiper,
        },
      });

      const num = 6;
      const swiperWrap = document.querySelectorAll(".swiper-slide");

      for (var i = 0; i < swiperWrap.length; i++) {
        const swiperItemLists = swiperWrap[i].querySelectorAll(
          ".swiper-slide ul li"
        );
        for (var e = num; e < swiperItemLists.length; e++) {
          swiperItemLists[e].classList.add("is-hidden");
        }
      }
      const swiperBtns = document.querySelectorAll(".load-more");
      swiperBtns.forEach((swiperBtn) => {
        const wrap = swiperBtn.parentElement.querySelector("ul");
        if (!wrap) {
          return;
        }
        if (wrap.querySelectorAll("li").length <= num) {
          swiperBtn.style.display = "none";
        }

        swiperBtn.addEventListener("click", () => {
          const hiddenItems = wrap.querySelectorAll("li.is-hidden");
          for (var i = 0; i < num && i < hiddenItems.length; i++) {
            hiddenItems[i].classList.remove("is-hidden");
          }
          if (wrap.querySelectorAll("li.is-hidden").length === 0) {
            swiperBtn.style.display = "none";
          }
        });
      });

      setTimeout(() => {
        swiper2.update();
      }, 450);
    }

    // function initSlideMoreButton(slideIndex) {
    //   const currentSlide = swiper2.slides[slideIndex];
    //   const loadMoreButton = currentSlide.querySelector(".load-more");
    //   const listItems = currentSlide.querySelectorAll(".list-item");
    //   const itemsToShow = 6;
    //   let currentItemIndex = itemsToShow;

    //   if (listItems.length <= itemsToShow) {
    //     loadMoreButton.style.display = "none";
    //   }

    //   function toggleListItems() {
    //     for (let i = 0; i < listItems.length; i++) {
    //       if (i < currentItemIndex) {
    //         listItems[i].style.display = "block";
    //       } else {
    //         listItems[i].style.display = "none";
    //       }
    //     }
    //   }

    //   toggleListItems();

    //   loadMoreButton.addEventListener("click", function () {
    //     currentItemIndex += itemsToShow;
    //     toggleListItems();
    //     if (currentItemIndex >= listItems.length) {
    //       loadMoreButton.style.display = "none";
    //     }
    //   });
    // }

    // initSlideMoreButton(0); // 蛻晄悄蛹・
    // initSlideMoreButton(swiper2.activeIndex);

    // function initSlideMoreButton(slideIndex) {
    //   const currentSlide = swiper2.slides[slideIndex];
    //   const loadMoreButton = currentSlide.querySelector(".load-more");
    //   const listItems = currentSlide.querySelectorAll(".list-item");
    //   const itemsToShow = 6; // 1蝗槭↓陦ｨ遉ｺ縺吶ｋ繧｢繧､繝・Β謨ｰ
    //   let currentItemIndex = itemsToShow;

    //   if (listItems.length <= itemsToShow) {
    //     loadMoreButton.style.display = "none";
    //   }

    //   function toggleListItems() {
    //     for (let i = 0; i < listItems.length; i++) {
    //       if (i < currentItemIndex) {
    //         listItems[i].style.display = "block";
    //       } else {
    //         listItems[i].style.display = "none";
    //       }
    //     }
    //   }

    //   toggleListItems(); // 蛻晄悄陦ｨ遉ｺ

    //   loadMoreButton.addEventListener("click", function () {
    //     currentItemIndex += itemsToShow;
    //     toggleListItems();
    //     if (currentItemIndex >= listItems.length) {
    //       loadMoreButton.style.display = "none";
    //     }
    //   });
    // }

    // @@@@ 繧ゅ▲縺ｨ隕九ｋ繝懊ち繝ｳ
    function setupMoreButton(sectionSelector, moreNum) {
      var section = document.querySelector(sectionSelector);
      if (!section) {
        return;
      }

      var listItems = section.querySelectorAll("[data-more]");
      var listBtn = section.querySelector(".more-btn");
      if (!listBtn) {
        return;
      }

      for (var i = moreNum; i < listItems.length; i++) {
        listItems[i].classList.add("is-hidden");
      }

      if (listItems.length <= moreNum) {
        listBtn.style.display = "none";
      }

      listBtn.addEventListener("click", function () {
        var hiddenItems = section.querySelectorAll("[data-more].is-hidden");

        for (var i = 0; i < moreNum && i < hiddenItems.length; i++) {
          hiddenItems[i].classList.remove("is-hidden");
          hiddenItems[i].classList.add("is-visible");
          hiddenItems[i].style.display = "block";
          hiddenItems[i].style.opacity = 1;
        }

        if (section.querySelectorAll("[data-more].is-hidden").length === 0) {
          listBtn.style.display = "none";
        }
      });

    }
    setupMoreButton("#news", 3);
    setupMoreButton("#events", 4);
    setupMoreButton("#member", 2);

    // @@@@@ 繝｡繝ｼ繝ｫ縺ｮ繧ｳ繝斐・
    const copyButton = document.getElementById("contact-btn");
    const tagText = document.getElementById("tagText");
    const message = document.getElementById("message");

    if (copyButton && tagText && message) {
      copyButton.addEventListener("click", () => {
        const tagValue = tagText.value;
        copyToClipboard(tagValue);
      });
    }

    async function copyToClipboard(tagValue) {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(tagValue);
        } else {
          document.execCommand("copy");
        }

        messageActive();
      } catch (error) {
        console.error("繧ｯ繝ｪ繝・・繝懊・繝峨∈縺ｮ繧ｳ繝斐・縺ｫ螟ｱ謨励＠縺ｾ縺励◆:", error);
      }
    }

    function messageActive() {
      message.classList.add("is-active");
      setTimeout(() => {
        message.classList.remove("is-active");
      }, 1600);
    }
  });
})();

