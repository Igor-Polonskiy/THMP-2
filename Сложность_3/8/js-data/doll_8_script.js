(() => {
  const wrapper = document.querySelector(".doll_8_wrapper");

  const divMain = wrapper.querySelector(".doll_8_Main");
  const resetBtn = wrapper.querySelector(".doll_8_ResetBtn");
  const soundBtn = wrapper.querySelector(".doll_8_MuteSound");
  const soundBtfullScreenBtn = wrapper.querySelector(".doll_8_FullScreenBtn");

  const contentBlocker = "doll_8_ContentBlocker";
  const well_done = wrapper.querySelector(".doll_8_Well_done");

  //звуки
  const bowSound = wrapper.querySelector("#doll_8_1_dictor");
  const flippingSound = wrapper.querySelector("#doll_8_2_mmr");
  const dressSound = wrapper.querySelector("#doll_8_2_dictor");
  const shoesSound = wrapper.querySelector("#doll_8_3_dictor");
  const btnSound = wrapper.querySelector("#doll_8_1_mmr");
  const winSound = wrapper.querySelector("#doll_8_3_mmr");

  let soundOn = false;

  let currentSound;

  const elementsForRender = [
    {
      id: 1,
      name: "playBtn",
      src: "Images_1/doll_8_img/buttons-play.svg",
      sound: btnSound,
    },
    {
      id: 2,
      name: "doll-bow",
      src: "Images_1/doll_8_img/bow.svg",
      sound: bowSound,
    },
    {
      id: 3,
      name: "doll-dress",
      src: "Images_1/doll_8_img/dress.svg",
      sound: dressSound,
    },
    {
      id: 4,
      name: "doll-shoes",
      src: "Images_1/doll_8_img/sandals.svg",
      sound: shoesSound,
    },
  ];

  divMain.insertAdjacentHTML("beforeend", createMarkup(elementsForRender));
  const allActionsBlocks = wrapper.querySelectorAll(".doll_8_action");
  const allImages = wrapper.querySelectorAll(".doll_8_image");

  soundBtn.addEventListener("click", soundChanger);

  allImages.forEach((el) => el.addEventListener("click", onImgClick));

  function onImgClick(e) {
    if (Number(e.target.dataset.id) === 1) {
      playSound(btnSound);
    } else if (Number(e.target.dataset.id) < 4) {
      playSound(flippingSound);
    }
    if (Number(e.target.dataset.id) < 4) {
      e.target.parentElement.classList.add("hide");

      setTimeout(() => {
        allActionsBlocks[
          Number(e.target.parentElement.dataset.id)
        ].classList.remove("hide");
      }, 1000);

      setTimeout(() => {
        playSound(
          elementsForRender[Number(e.target.parentElement.dataset.id)].sound
        );
      }, 1500);

    } else {
      playSound(flippingSound);
      e.target.parentElement.classList.add("hide");
      setTimeout(() => {
        winTextSwitcher();
      }, 1000);
    }
  }

  function resetSound(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound = null;
    }
  }

  function soundChanger() {
    soundOn = !soundOn;
    if (soundOn) {
      soundBtn.src = "Images_1/doll_8_img/onSound.svg";
    } else {
      soundBtn.src = "Images_1/doll_8_img/mute.svg";
    }
  }

  function playSound(audio) {
    soundOn && audio.play();
  }

  function createMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        const isVisible = index === 0 ? "" : "hide";

        return `<div class="doll_8_action ${isVisible}" data-id=${picture.id}>
                      <div style="background-image:url(${picture.src})" data-id=${picture.id} class='doll_8_image'></div>
                </div>
                `;
      })
      .join("");
  }

  // Обработчик кнопки "Вернуть к исходному состоянию"
  resetBtn.addEventListener("click", () => {
    allActionsBlocks.forEach((el, index) => {
      if (index === 0) {
        el.classList.remove("hide");
      } else {
        el.classList.add("hide");
      }
    });
    resetSound(currentSound);
    well_done.classList.remove("onViewdoll_8");
  });

  // Обработчик кнопки "Полный экран"
  soundBtfullScreenBtn.addEventListener(
    "click",
    function (event) {
      if (wrapper.classList.contains(contentBlocker)) {
        wrapper.classList.remove(contentBlocker);
        document.getElementsByTagName("body")[0].style.overflowY = null;
      } else {
        wrapper.classList.add(contentBlocker);
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      }
      if (!event.target.hasAttribute("data-toggle-fullscreen")) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    },
    false
  );

  function winTextSwitcher() {
    if (!well_done.classList.contains("onViewdoll_8")) {
      well_done.classList.add("onViewdoll_8");
      soundOn && playSound(winSound);
    }
  }
})();
