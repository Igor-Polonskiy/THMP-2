(() => {
  const wrapper = document.querySelector(".doll_10_wrapper");

  const divMain = wrapper.querySelector(".doll_10_Main");
  const resetBtn = wrapper.querySelector(".doll_10_ResetBtn");
  const soundBtn = wrapper.querySelector(".doll_10_MuteSound");
  const fullScreenBtn = wrapper.querySelector(".doll_10_FullScreenBtn");
  const container = wrapper.querySelector(".container");
  const insideBox = wrapper.querySelector(".doll_10_insideBox");
  const contentBlocker = "doll_10_ContentBlocker";
  const well_done = wrapper.querySelector(".doll_10_Well_done");

  const imgs = wrapper.querySelectorAll(".doll_10_svg");

  const soundFun = document.querySelector("#doll_10_1_mmr");
  const soundSad = document.querySelector("#doll_10_2_mmr");
  const doll = wrapper.querySelector("#Doll");

  // hide" draggable="true" ondrop="return false"

  soundBtn.addEventListener("click", soundChanger);
  let soundOn = false;

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

  let winOpenBox = false;

  // Обработчик кнопки "Вернуть к исходному состоянию"
  resetBtn.addEventListener("click", () => {
    // insideBox.classList.remove('hide')
    insideBox.classList.remove("semi-transparent");
    well_done.classList.remove("onViewdoll_10");
    doll.classList.remove("hoveredDoll");
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

  imgs.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      mouseover(item);
    });
    item.addEventListener("mouseleave", () => {
      mouseleave(item);
    });
    item.addEventListener("click", () => {
      if (item.classList.contains("notDoll")) {
        playSound(soundSad);
        item.classList.add("hoveredClicked");
        setTimeout(() => {
          item.classList.remove("hoveredClicked");
          item.classList.remove("hovered");
        }, 2000);
      } else {
        item.classList.add("hoveredDoll");
        playSound(soundFun);
        setTimeout(() => {
          //   insideBox.classList.add("hide");
          insideBox.classList.add("semi-transparent");
          well_done.classList.add("onViewdoll_10");
        }, 2000);
      }
    });
  });

  function mouseover(item) {
    item.classList.add("hovered");
  }
  function mouseleave(item) {
    item.classList.remove("hovered");
  }

  function winFigursCounter() {
    if (insideBox.getElementsByTagName("img").length == 0) {
      winOpenBox = true;
      winTextSwitcher();
      elemsdoll_10_.forEach((e) => {
        e.style.pointerEvents = "none";
      });
    }
  }

  function winTextSwitcher() {
    if (!well_done.classList.contains("onViewdoll_10")) {
      // well_done.classList.remove('hide');
      well_done.classList.add("onViewdoll_10");
      soundOn && playSound(winSound);
    } else if (well_done.classList.contains("onViewdoll_10")) {
      // well_done.classList.add('hide');
      well_done.classList.remove("onViewdoll_10");
    }
  }
})();
