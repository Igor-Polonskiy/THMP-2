(() => {
  const wrapper = document.querySelector(".doll_5_wrapper");

  const divMain = wrapper.querySelector(".doll_5_Main");
  const resetBtn = wrapper.querySelector(".doll_5_ResetBtn");
  const soundBtn = wrapper.querySelector(".doll_5_MuteSound");
  const fullScreenBtn = wrapper.querySelector(".doll_5_FullScreenBtn");

  const contentBlocker = "doll_5_ContentBlocker";
  const well_done = wrapper.querySelector(".doll_5_Well_done");

  //звуки
  const walkingSound = wrapper.querySelector("#doll_5_1_dictor");
  const flippingSound = wrapper.querySelector("#doll_5_1_mmr");
  const sittingSound = wrapper.querySelector("#doll_5_2_dictor");
  const eatingSound = wrapper.querySelector("#doll_5_3_dictor");
  const sleepingSound = wrapper.querySelector("#doll_5_4_dictor");
  const winSound = wrapper.querySelector("#doll_5_2_mmr");

  let soundOn = false;
  let currentSound;

  const redBtn = wrapper.querySelectorAll(".doll_5_red-button");
  const allActionsBlocks = wrapper.querySelectorAll(".doll_5_action");
  const allImages = wrapper.querySelectorAll(".doll_5_image");

  soundBtn.addEventListener("click", soundChanger);
  redBtn.forEach((el) => el.addEventListener("click", onRedBtnClick));
  allImages.forEach((el) => el.addEventListener("click", imageChanger));

  function onRedBtnClick(e) {
    switch (e.target.id) {
      case "1":
        currentSound = walkingSound;
        playSound(currentSound);

        break;
      case "2":
        currentSound = sittingSound;
        playSound(currentSound);

        break;
      case "3":
        currentSound = eatingSound;
        playSound(currentSound);

        break;
      case "4":
        currentSound = sleepingSound;
        playSound(currentSound);

        if (soundOn) {
          currentSound.addEventListener("ended", () => {
            setTimeout(() => {
              e.target.parentElement.classList.add("semi-transparent");
              winTextSwitcher();
            }, 1500);
          });
        }
        break;

      default:
        break;
    }
  }

  function resetSound(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound = null;
    }
  }

  function imageChanger(e) {
    if (Number(e.target.parentElement.dataset.id) <= 3) {
      e.target.parentElement.classList.add("doll_5_hide");
      allActionsBlocks[
        Number(e.target.parentElement.dataset.id)
      ].classList.remove("doll_5_hide");
    }
    if (soundOn) {
      resetSound(currentSound);
      currentSound = flippingSound;
      playSound(currentSound);
    } else {
      if (Number(e.target.parentElement.dataset.id) === 4) {
        setTimeout(() => {
          e.target.parentElement.classList.add("semi-transparent");
          winTextSwitcher();
        }, 500);
      }
    }
  }

  function soundChanger() {
    soundOn = !soundOn;
    if (soundOn) {
      soundBtn.src = "Images_1/doll_img/onSound.svg";
    } else {
      soundBtn.src = "Images_1/doll_img/mute.svg";
    }
  }

  function playSound(audio) {
    soundOn && audio.play();
  }

  // Обработчик кнопки "Вернуть к исходному состоянию"
  resetBtn.addEventListener("click", () => {
    allActionsBlocks.forEach((el, index) => {
      if (index === 0) {
        el.classList.remove("doll_5_hide");
      } else if (index === allActionsBlocks.length - 1) {
        el.classList.add("doll_5_hide");
        el.classList.remove("semi-transparent");
      } else {
        el.classList.add("doll_5_hide");
      }
    });
    resetSound(currentSound);
    well_done.classList.remove("onViewdoll_5");
  });

  function blockWheel(e) {
    e.preventDefault();
  }

// Обработчик кнопки "Полный экран"
fullScreenBtn.addEventListener('click', function (event) {
    if (wrapper.classList.contains(contentBlocker)) {
        wrapper.classList.remove(contentBlocker);
        document.body.removeEventListener('mousewheel',blockWheel, {passive:false});
    } else {
        wrapper.classList.add(contentBlocker);
        document.body.addEventListener('mousewheel', blockWheel, {passive:false})
    }
    if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}, false);

  function winTextSwitcher() {
    if (!well_done.classList.contains("onViewdoll_5")) {
      well_done.classList.add("onViewdoll_5");
      soundOn && playSound(winSound);
    }
  }
})();
