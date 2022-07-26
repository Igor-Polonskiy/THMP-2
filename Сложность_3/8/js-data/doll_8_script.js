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
      src: "Images_1/doll_8_img/play_button.png",
      sound: btnSound,
    },
    {
      id: 2,
      name: "doll-bow",
      src: "Images_1/doll_8_img/bant_doll.png",
      sound: bowSound,
    },
    {
      id: 3,
      name: "doll-dress",
      src: "Images_1/doll_8_img/dress_wear_doll.png",
      sound: dressSound,
    },
    {
      id: 4,
      name: "doll-shoes",
      src: "Images_1/doll_8_img/shoes_doll.png",
      sound: shoesSound,
    },
  ];

  divMain.insertAdjacentHTML("beforeend", createMarkup(elementsForRender));

  //   const redBtn = wrapper.querySelectorAll(".doll_8_red-button");
  const allActionsBlocks = wrapper.querySelectorAll(".doll_8_action");
  const allImages = wrapper.querySelectorAll(".doll_8_image");

  soundBtn.addEventListener("click", soundChanger);
  //   redBtn.forEach((el) => el.addEventListener("click", onRedBtnClick));
  //   allImages.forEach((el) => el.addEventListener("click", imageChanger));
  allImages.forEach((el) => el.addEventListener("click", onImgClick));
  //   allImages.forEach((el) => el.addEventListener("click", onImageClick));

  function onImgClick(e) {
    if (e.target.dataset.id === "1") {
      playSound(btnSound);
    } else {
      playSound(flippingSound);
    }
    if (e.target.dataset.id !== "4") {
      e.target.parentElement.classList.add("hide");
      allActionsBlocks[
        Number(e.target.parentElement.dataset.id)
      ].classList.remove("hide");
      playSound(
        elementsForRender[Number(e.target.parentElement.dataset.id)].sound
      );
    } else {
      e.target.parentElement.classList.add("hide");
      winTextSwitcher();
    }
    // if (e.target.dataset.id === "4") {
    //   winTextSwitcher();
    // }
  }
  //   function onImageClick(e) {
  function onImageClick(target) {
    // console.log(e.target);
    console.log(target);
    // switch (e.target.dataset.id) {
    // switch (e.target.id) {
    switch (target.dataset.id) {
      case "1":
        // console.log(789);
        currentSound = btnSound;

        playSound(currentSound);
        // imageChanger(e.target);
        // changeImgToGif(e, e.target.id);
        break;
      case "2":
        currentSound = bowSound;

        playSound(currentSound);

        // changeImgToGif(e, e.target.id);
        // imageChanger(e.target);

        break;
      case "3":
        currentSound = dressSound;

        playSound(currentSound);
        // imageChanger(e.target);

        // changeImgToGif(e, e.target.id);
        break;
      case "4":
        currentSound = shoesSound;

        playSound(currentSound);
        // imageChanger(e.target);

        // changeImgToGif(e, e.target.id);

        // currentSound.addEventListener("ended", () => {
        //   e.target.parentElement.classList.add("hide");

        //   winTextSwitcher();
        // });
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

  function findImage(id) {
    return dollActions.find((el) => el.id === Number(id));
  }

  function imageChanger(e) {
    // console.log(456);
    console.log(e.target);
    if (Number(e.target.parentElement.dataset.id) <= 3) {
      //   e.target.parentElement.classList.add("visually-hidden");
      e.target.parentElement.classList.add("hide");
      allActionsBlocks[
        Number(e.target.parentElement.dataset.id)
      ].classList.remove("hide");
      //   ].classList.remove("visually-hidden");
      if (e.target.parentElement.dataset.id === 1) {
        playSound(btnSound);
        setTimeout(() => {
          const findedSound = elementsForRender.find(
            (el) => el.id === Number(e.target.parentElement.dataset.id)
          );
          playSound(findedSound.sound);
        }, 1000);
      } else {
        playSound(flippingSound);

        setTimeout(() => {
          const findedSound = elementsForRender.find(
            (el) => el.id === Number(e.target.parentElement.dataset.id)
          );
          playSound(findedSound.sound);
        }, 1000);
      }
      //   playSound(bowSound);
      //   onImageClick(e.target);

      //   const findedImage = findImage(e.target.parentElement.dataset.id);

      //   setBackground(e.target, findedImage.src);

      //   resetSound(currentSound);
      //   currentSound = flippingSound;
      //   playSound(currentSound);
    }
  }
  //   function imageChanger(e) {
  //     console.log(456);
  //     if (Number(e.target.parentElement.dataset.id) <= 3) {
  //       e.target.parentElement.classList.add("visually-hidden");
  //       allActionsBlocks[
  //         Number(e.target.parentElement.dataset.id)
  //       ].classList.remove("visually-hidden");
  //       // onImageClick(e)

  //       //   const findedImage = findImage(e.target.parentElement.dataset.id);

  //       //   setBackground(e.target, findedImage.src);

  //       resetSound(currentSound);
  //       currentSound = flippingSound;
  //       playSound(currentSound);
  //     }
  //   }

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
        // const isVisible = index === 0 ? "" : "visually-hidden";
        const isVisible = index === 0 ? "" : "hide";

        // return `<div class="doll_8_action" data-id=${picture.id}>
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
        // el.classList.remove("visually-hidden");
        el.classList.remove("hide");
      } else if (index === allActionsBlocks.length - 1) {
        // el.classList.remove("hide");
        // el.classList.add("visually-hidden");
        el.classList.add("hide");
      } else {
        // el.classList.add("visually-hidden");
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

// (() => {

//     const wrapper = document.querySelector('.doll_8_wrapper');

//     const divMain = wrapper.querySelector('.doll_8_Main');
//     const resetBtn = wrapper.querySelector('.doll_8_ResetBtn');
//     const soundBtn = wrapper.querySelector('.doll_8_MuteSound');
//     const soundBtfullScreenBtn = wrapper.querySelector('.doll_8_FullScreenBtn');
//     const container = wrapper.querySelector('.container');
//     const insideBox = wrapper.querySelector('.doll_8_insideBox');
//     const contentBlocker = 'doll_8_ContentBlocker';
//     const well_done = wrapper.querySelector('.doll_8_Well_done');

//     // hide" draggable="true" ondrop="return false"

//     soundBtn.addEventListener('click', soundChanger);
//     let soundOn = false;

//     function soundChanger() {
//         soundOn = !soundOn;
//         if (soundOn) {
//             soundBtn.src = "Images_1/doll_8_img/onSound.svg";
//         } else {
//             soundBtn.src = "Images_1/doll_8_img/mute.svg";
//         }
//     }

//     function playSound(audio) {
//         soundOn && audio.play();
//     }

//     let winOpenBox = false;

//     // Обработчик кнопки "Вернуть к исходному состоянию"
//     resetBtn.addEventListener('click', () => {
//         for (let i = 0; i < elemsdoll_8_.length; i++) {
//             elemsdoll_8[i].classList.add("hide");
//             elemsdoll_8[i].style.position = 'relative ';
//             elemsdoll_8[i].style.top = '0px';
//             elemsdoll_8[i].style.left = '0px';
//             insideBox.append(elemsdoll_8_[i]);
//             // itemCounter();
//         }
//         removePointerEventsDraggableElems();
//         insideBox.addEventListener('mouseenter', showOpeningBox);
//         insideBox.addEventListener('mouseleave', fadeOpeningBox);
//         insideBox.addEventListener('click', openBox);
//         fadeOpeningBox();

//         if (winOpenBox) {
//             winTextSwitcher();
//             winOpenBox = false;
//         }
//     });

//     // Обработчик кнопки "Полный экран"
//     soundBtfullScreenBtn.addEventListener('click', function (event) {
//         if (wrapper.classList.contains(contentBlocker)) {
//             wrapper.classList.remove(contentBlocker);
//             document.getElementsByTagName('body')[0].style.overflowY = null;
//         } else {
//             wrapper.classList.add(contentBlocker);
//             document.getElementsByTagName('body')[0].style.overflowY = "hidden";
//         }
//         if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
//         if (document.fullscreenElement) {
//             document.exitFullscreen();
//         } else {
//             document.documentElement.requestFullscreen();
//         }
//     }, false);

//     function changeStylesAndAppend(dropPlace, draggingElem) {
//         draggingElem.style.position = 'relative ';
//         draggingElem.style.zIndex = null;
//         draggingElem.style.top = null;
//         draggingElem.style.left = null;
//         dropPlace.appendChild(draggingElem);
//     }

//     let draggingItem;
//     let elemBelow;

//     function mouseDown(event) {
//         if (event.button !== 0) return;
//         draggingItem = event.target;
//         draggingItem.style.cursor = "url(Images_1/doll_8_img/cursor.png), auto";
//         const elemDraggingBanBorder = divMain; //элемент за границы которого запрещён вылет перетаскиваемой фигуры
//         const elemDraggingStartPlace = insideBox; //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

//         draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)

//         let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
//         let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

//         // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
//         //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
//         let limits = {
//             top: elemDraggingBanBorder.offsetTop + scrollY,
//             right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft + scrollX,
//             bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop + scrollY,
//             left: elemDraggingBanBorder.offsetLeft + scrollX
//         };

//         draggingItem.style.position = 'absolute';
//         draggingItem.style.zIndex = 1000;
//         document.body.appendChild(draggingItem);

//         moveAt(event.pageX, event.pageY);

//         function moveAt(pageX, pageY) {
//             draggingItem.style.left = pageX - shiftX + 'px';
//             draggingItem.style.top = pageY - shiftY + 'px';
//         }

//         elemBelow = document.elementFromPoint(event.clientX, event.clientY);

//         let clickWithoutMove = true;

//         function onMouseMove(event) {
//             let newLocation = {
//                 x: limits.left,
//                 y: limits.top
//             };
//             if (event.pageX > limits.right) {
//                 newLocation.x = limits.right;
//             } else if (event.pageX > limits.left) {
//                 newLocation.x = event.pageX;
//             }
//             if (event.pageY > limits.bottom) {
//                 newLocation.y = limits.bottom;
//             } else if (event.pageY > limits.top) {
//                 newLocation.y = event.pageY;
//             }

//             clickWithoutMove = false
//             moveAt(newLocation.x, newLocation.y);
//             // moveAt(event.pageX, event.pageY);

//             if (!event.path.includes(draggingItem)) {
//                 window.addEventListener('pointerup', moveOut);
//             }
//             if (event.path.includes(draggingItem)) {
//                 window.removeEventListener('pointerup', moveOut);
//             }

//             draggingItem.hidden = true;
//             elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//             draggingItem.hidden = false;

//             if (!elemBelow) return;

//             // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

//             // let currentDroppable = null;

//             // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК

//             // if (currentDroppable != droppableBelow) {
//             //     if (currentDroppable) {
//             // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
//             //         leaveDroppable(currentDroppable);
//             //     }
//             //     currentDroppable = droppableBelow;
//             // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
//             //     if (currentDroppable) {
//             //         enterDroppable(currentDroppable);
//             //     }
//             // }
//         }

//         // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
//         function enterDroppable(currentDroppable) {
//             // currentDroppable
//         }
//         // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
//         function leaveDroppable(currentDroppable) {
//             // currentDroppable
//         }
//         document.addEventListener('pointermove', onMouseMove);

//         // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
//         function moveOut(e) {
//             smoothTransition(draggingItem)
//             setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 1000)

//             window.removeEventListener('pointerup', moveOut);
//             document.removeEventListener('pointermove', onMouseMove);
//         }

//         // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
//         draggingItem.onpointerup = function (e) {
//             startAction = true;
//             if (clickWithoutMove) {
//                 smoothTransition(draggingItem)
//                 setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 10000)

//             }

//             document.removeEventListener('pointermove', onMouseMove);

//             // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
//             if (elemBelow.classList.contains('doll_8_Main')) {
//                 let new_shiftX = (e.clientX - elemBelow.getBoundingClientRect().left) - shiftX - 40 + 'px';
//                 let new_shiftY = (e.clientY - elemBelow.getBoundingClientRect().top) - shiftY - 40 + 'px';
//                 draggingItem.style.left = new_shiftX;
//                 draggingItem.style.top = new_shiftY;
//                 elemBelow.appendChild(draggingItem);
//                 winFigursCounter();
//             } else {
//                 smoothTransition(draggingItem)
//                 setTimeout(() => changeStylesAndAppend(insideBox, draggingItem), 1000)

//             }

//             //winFigursCounter();

//         };

//         function smoothTransition(draggingElem) {
//             // document.body.style.pointerEvents = 'none'
//             elemsdoll_8_.forEach((e) => {
//                 e.removeEventListener('pointerdown', mouseDown);
//             });
//             let coordX,
//                 coordY
//             draggingElem.classList.add('dragTransition')
//             coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width / 2
//             coordY = elemDraggingStartPlace.getBoundingClientRect().top + elemDraggingStartPlace.getBoundingClientRect().height / 2 + window.pageYOffset
//             draggingElem.style.left = `${coordX}px`
//             draggingElem.style.top = `${coordY}px`
//             setTimeout(() => {
//                 draggingElem.classList.remove('dragTransition')
//                 // document.body.style.pointerEvents = 'auto'
//                 elemsdoll_8_.forEach((e) => {
//                     e.addEventListener('pointerdown', mouseDown);
//                 });

//             }, 1000)
//         }

//     };

//     function winFigursCounter() {
//         if (insideBox.getElementsByTagName('img').length == 0) {
//             winOpenBox = true;
//             winTextSwitcher();
//             elemsdoll_8_.forEach((e) => {
//                 e.style.pointerEvents = 'none';
//             });

//         }
//     };

//     function winTextSwitcher() {

//         if (!well_done.classList.contains('onViewdoll_8')) {
//             // well_done.classList.remove('hide');
//             well_done.classList.add('onViewdoll_8');
//             soundOn && playSound(winSound);

//         } else if (well_done.classList.contains('onViewdoll_8')) {
//             // well_done.classList.add('hide');
//             well_done.classList.remove('onViewdoll_8');
//         }

//     };
// })();
