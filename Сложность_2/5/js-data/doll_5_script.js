(() => {
  const wrapper = document.querySelector(".doll_5_wrapper");

  const divMain = wrapper.querySelector(".doll_5_Main");
  const resetBtn = wrapper.querySelector(".doll_5_ResetBtn");
  const soundBtn = wrapper.querySelector(".doll_5_MuteSound");
  const soundBtfullScreenBtn = wrapper.querySelector(".doll_5_FullScreenBtn");
  const container = wrapper.querySelector(".container");

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
  let winOpenBox = false;
  console.log("🚀 ~ file: doll_5_script.js ~ line 33 ~ winOpenBox", winOpenBox);
  let currentSound;
  const dollActions = [
    {
      id: 1,
      name: "doll_stands",
      src: "Images_1/doll_5_img/doll-walking-cover.png",
      gifSrc: "Images_1/doll_5_img/doll-walking.gif",
    },
    {
      id: 2,
      name: "doll-sitting",
      src: "Images_1/doll_5_img/doll-sitting.png",
      //   gifSrc: "Images_1/doll_5_img/doll-sitting.gif",
      gifSrc: "",
    },
    {
      id: 3,
      name: "doll-eating",
      src: "Images_1/doll_5_img/doll-eating-cover.png",
      gifSrc: "Images_1/doll_5_img/doll-eating.gif",
    },
    {
      id: 4,
      name: "doll-sleeping",
      src: "Images_1/doll_5_img/doll-sleeping-cover.png",
      gifSrc: "Images_1/doll_5_img/doll-sleeping.gif",
    },
  ];
  const redBtnSrc = "Images_1/doll_5_img/red-button.jpg";

  divMain.insertAdjacentHTML("beforeend", createMarkup(dollActions));
  //   console.log(
  //     "🚀 ~ file: doll_5_script.js ~ line 63 ~ divMain",
  //     divMain.children
  //   );
  const redBtn = wrapper.querySelectorAll(".doll_5_red-button");
  const allActionsBlocks = wrapper.querySelectorAll(".doll_5_action");
  //   console.log(
  //     "🚀 ~ file: doll_5_script.js ~ line 69 ~ allActionsBlocks",
  //     allActionsBlocks
  //   );
  const allImages = wrapper.querySelectorAll(".doll_5_image");
  //   console.log("🚀 ~ file: doll_5_script.js ~ line 65 ~ allImages", allImages);

  soundBtn.addEventListener("click", soundChanger);
  redBtn.forEach((el) => el.addEventListener("click", onRedBtnClick));
  //   allActionsBlocks.forEach((el) => el.addEventListener("click", imageChanger));
  //   allActionsBlocks.forEach((el) => el.addEventListener("click", imageChanger));
  allImages.forEach((el) => el.addEventListener("click", imageChanger));

  function onRedBtnClick(e) {
    switch (e.target.id) {
      case "1":
        currentSound = walkingSound;

        playSound(currentSound);

        changeImgToGif(e, e.target.id);
        break;
      case "2":
        currentSound = sittingSound;

        playSound(currentSound);

        changeImgToGif(e, e.target.id);
        break;
      case "3":
        currentSound = eatingSound;

        playSound(currentSound);

        changeImgToGif(e, e.target.id);
        break;
      case "4":
        currentSound = sleepingSound;

        playSound(currentSound);

        changeImgToGif(e, e.target.id);

        currentSound.addEventListener("ended", () => {
          e.target.parentElement.classList.add("hide");
          winOpenBox = true;
          if (winOpenBox) winTextSwitcher();
        });
        break;

      default:
        break;
    }
  }

  function changeImgToGif(e, id) {
    const findedImage = dollActions.find((el) => el.id === Number(id));

    if (
      e.target.previousElementSibling.src.indexOf(".png") > 0 &&
      findedImage.gifSrc
    ) {
      e.target.previousElementSibling.src = findedImage.gifSrc;
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
      // if (Number(e.target.parentElement.dataset.id) < 3) {
      e.target.parentElement.classList.add("visually-hidden");
      allActionsBlocks[
        Number(e.target.parentElement.dataset.id)
      ].classList.remove("visually-hidden");
      e.target.src = dollActions.find(
        (el) => el.id === Number(e.target.parentElement.dataset.id)
      ).src;
      resetSound(currentSound);
      currentSound = flippingSound;
      playSound(currentSound);
    }
  }

  function soundChanger() {
    soundOn = !soundOn;
    if (soundOn) {
      soundBtn.src = "Images_1/doll_5_img/onSound.svg";
    } else {
      soundBtn.src = "Images_1/doll_5_img/mute.svg";
    }
  }

  function playSound(audio) {
    soundOn && audio.play();
  }

  function createMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        // const isVisible = index === 0 ? "" : "hide";
        const isVisible = index === 0 ? "" : "visually-hidden";
        // <img src=${picture.src} alt=${picture.name} class='doll-image'/>
        // <img src=${picture.gifSrc} alt=${picture.name} class='doll-image'/>
        // onclick="this.src = (this.src.indexOf ('.png') > 0) ? '${picture.gifSrc}' : '${picture.src}'"
        // onclick=${toggleImgToGif()}
        return `<div class="doll_5_action ${isVisible}" data-id=${picture.id}>
                    <img src=${picture.src}
                    alt=${picture.name}
                    data-id=${picture.id}
                    class='doll_5_image'/>
                    <img id=${picture.id} src=${redBtnSrc} alt='red_button' class="doll_5_red-button"/>
            </div>
                `;
      })
      .join("");
  }

  // Обработчик кнопки "Вернуть к исходному состоянию"
  resetBtn.addEventListener("click", () => {
    allActionsBlocks.forEach((el, index) => {
      if (index === 0) {
        el.classList.remove("visually-hidden");
      } else if (index === allActionsBlocks.length - 1) {
        el.classList.remove("hide");
        el.classList.add("visually-hidden");
        el.firstElementChild.src = dollActions.find(
          (elem) => elem.id === Number(el.dataset.id)
        ).src;
      } else {
        el.classList.add("visually-hidden");
      }
    });
    resetSound(currentSound);

    if (winOpenBox) {
      winTextSwitcher();
      winOpenBox = false;
    }
    // winOpenBox = false;
    console.log(
      "🚀 ~ file: doll_5_script.js ~ line 286 ~ resetBtn.addEventListener ~ winOpenBox",
      winOpenBox
    );
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
    // console.log("well_done", well_done);
    // if (!well_done.classList.contains("hideSmiledoll_5")) {
    //   // well_done.classList.remove('hide');
    //   well_done.classList.add("hideSmiledoll_5");
    //   soundOn && playSound(winSound);
    // } else if (well_done.classList.contains("hideSmiledoll_5")) {
    //   // well_done.classList.add('hide');
    //   console.log(789);
    //   well_done.classList.remove("hideSmiledoll_5");
    //   console.log(123);
    // }
    if (!well_done.classList.contains("onViewdoll_5")) {
      // well_done.classList.remove('hide');
      well_done.classList.add("onViewdoll_5");
      soundOn && playSound(winSound);
    } else if (well_done.classList.contains("onViewdoll_5")) {
      // well_done.classList.add('hide');
      well_done.classList.remove("onViewdoll_5");
    }
  }
})();
