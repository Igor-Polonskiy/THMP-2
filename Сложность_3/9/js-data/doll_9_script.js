(() => {
  // Собираются элементы в переменные
  const wrapper = document.querySelector(".doll_9_Wrapper");

  const soundBtn = wrapper.querySelector(".doll_9_MuteSound");

  const container = wrapper.querySelector(".doll_9_Container");

  const divSet = wrapper.querySelector(".doll_9_SliderWrapper");
  const resetBtn = wrapper.querySelector(".doll_9_ResetBtn");
  const dollSvg = wrapper.querySelector(".doll_9_dropSvg");

  const fullScreenBtn = wrapper.querySelector(".doll_9_FullScreenBtn");
  const captureSound = wrapper.querySelector("#doll_9_1_mmr");
  const bellSound = wrapper.querySelector("#doll_9_2_mmr");
  const winSound = wrapper.querySelector("#doll_9_3_mmr");

  const wellDone = wrapper.querySelector(".doll_9_Well_done");

  // Собирается элементы в переменные, создаются вспомогательные переменные

  let soundOn = false;
  let draggingItem;
  let elemBelow;

  let winCount = 0;

  const hideElements = [...dollSvg.children].filter((el) =>
    el.classList.contains("hide")
  );

  const dollsClothes = [
    {
      id: 1,
      src: "Images_1/doll_9_img/bow.svg",

      name: "bow",
    },
    {
      id: 2,
      src: "Images_1/doll_9_img/dress.svg",

      name: "dress",
    },
    {
      id: 3,
      src: "Images_1/doll_9_img/sandals.svg",

      name: "sandals",
    },
  ];

  divSet.insertAdjacentHTML("beforeend", createMarkup(dollsClothes));

  // Обработчик кнопки "Вернуть к исходному состоянию"
  resetBtn.addEventListener("click", reset);
  // обработчик кнопки вкл/выкл звука
  soundBtn.addEventListener("click", soundChanger);
  // обработчик перемещения элементов

  divSet.addEventListener("pointerdown", mouseDown);

  function reset() {
    winCount = 0;
    draggingItem = null;
    divSet.innerHTML = "";
    divSet.insertAdjacentHTML("beforeend", createMarkup(dollsClothes));

    hideElements.forEach((el) => el.classList.add("hide"));

    wellDone.classList.remove("onViewdoll_9");
    wellDone.classList.add("fadedoll_9");
  }
  // Обработчик кнопки "Полный экран"

  fullScreenBtn.addEventListener(
    "click",
    function (event) {
      if (wrapper.classList.contains("doll_9_Content-blocker")) {
        wrapper.classList.remove("doll_9_Content-blocker");
        document.getElementsByTagName("body")[0].style.overflowY = null;
      } else {
        wrapper.classList.add("doll_9_Content-blocker");
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

  function createMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        return `<div
                            class='doll_9_clothes doll_9_clothes_${picture.name}'
                            style="background-image:url(${picture.src})"
                            draggable="false"
                            data-name=${picture.name}

                            >
                      </div>
                `;
      })
      .join("");
  }

  function soundChanger() {
    soundOn = !soundOn;
    if (soundOn) {
      soundBtn.src = "Images_1/doll_9_img/onSound.svg";
    } else {
      soundBtn.src = "Images_1/doll_9_img/mute.svg";
    }
  }

  function playSound(audio) {
    soundOn && audio.play();
  }

  // function changeStylesAndAppend(dropPlace, draggingElem) {
  //   draggingElem.style.position = "relative ";
  //   draggingElem.style.zIndex = null;
  //   draggingElem.style.top = null;
  //   draggingElem.style.left = null;
  //   dropPlace.appendChild(draggingElem);
  // }
  // функция для смены стилей
  function changeStyles(draggingElem) {
    draggingElem.style.position = "relative ";
    draggingElem.style.zIndex = null;
    draggingElem.style.top = null;
    draggingElem.style.left = null;
  }

  // функция для возврата элемента в первоначальную область
  function dragAppend(dropPlace, draggingElem, findIdx) {
    const referenceElement = [...dropPlace.children][findIdx];
    dropPlace.insertBefore(draggingElem, referenceElement);
    changeStyles(draggingElem);
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    playSound(captureSound);
    if (!event.target.classList.contains("doll_9_clothes")) return;
    draggingItem = event.target;

    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...divSet.children].findIndex((el) => el === draggingItem);

    draggingItem.style.cursor = "url(Images_1/doll_9_img/cursor.png), auto";
    const elemDraggingBanBorder = container; //элемент за границы которого запрещён вылет перетаскиваемой фигуры
    const elemDraggingStartPlace = divSet; //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // console.log(draggingItem.getBoundingClientRect());
    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    // let limits = {
    //     top: elemDraggingBanBorder.offsetTop,
    //     right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
    //     bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
    //     left: elemDraggingBanBorder.offsetLeft
    // };

    draggingItem.style.position = "absolute";
    draggingItem.style.zIndex = 1000;
    // document.body.appendChild(draggingItem);
    wrapper.appendChild(draggingItem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    // let currentDroppable = null;
    let clickWithoutMove = true;
    function onMouseMove(event) {
      // let newLocation = {
      //     x: limits.left,
      //     y: limits.top
      // };
      // if (event.pageX > limits.right) {
      //     newLocation.x = limits.right;
      // }
      // else if (event.pageX > limits.left) {
      //     newLocation.x = event.pageX;
      // }
      // if (event.pageY > limits.bottom) {
      //     newLocation.y = limits.bottom;
      // }
      // else if (event.pageY > limits.top) {
      //     newLocation.y = event.pageY;
      // }

      clickWithoutMove = false;
      // moveAt(newLocation.x, newLocation.y);
      moveAt(event.pageX, event.pageY);

      if (!event.composedPath().includes(draggingItem)) {
        window.addEventListener("pointerup", moveOut);
      }
      if (event.composedPath().includes(draggingItem)) {
        window.removeEventListener("pointerup", moveOut);
      }

      draggingItem.hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.hidden = false;

      if (!elemBelow) return;

      // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

      // let droppableBelow = elemBelow.closest(".houseElement"); // БЕРЁМ НУЖНЫЙ БЛОК

      // if (currentDroppable != droppableBelow) {
      //   if (currentDroppable) {
      //     // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
      //     leaveDroppable(currentDroppable);
      //   }
      //   currentDroppable = droppableBelow;
      //   // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
      //   if (currentDroppable) {
      //     enterDroppable(currentDroppable);
      //   }
      // }
    }

    // // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
    // function enterDroppable(currentDroppable) {
    //   currentDroppable.classList.add("houseElementsShadowRed");
    // }
    // // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
    // function leaveDroppable(currentDroppable) {
    //   currentDroppable.classList.remove("houseElementsShadowRed");
    // }
    document.addEventListener("pointermove", onMouseMove);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА

    function moveOut(e) {
      smoothTransition(draggingItem);
      setTimeout(
        // () => changeStylesAndAppend(elemDraggingStartPlace, draggingItem),
        () => dragAppend(elemDraggingStartPlace, draggingItem, findIdx),
        1000
      );

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup() {
      if (clickWithoutMove) {
        smoothTransition(draggingItem);
        setTimeout(
          // () => changeStylesAndAppend(elemDraggingStartPlace, draggingItem),
          () => dragAppend(elemDraggingStartPlace, draggingItem, findIdx),
          1000
        );
      }

      document.removeEventListener("pointermove", onMouseMove);

      // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ

      if (elemBelow.parentElement?.id === draggingItem.dataset.name) {
        addHiddenClasses(elemBelow.parentElement, draggingItem);

        playSound(bellSound);
        winCount += 1;
      } else if (
        elemBelow.parentElement?.parentElement?.id === draggingItem.dataset.name
      ) {
        addHiddenClasses(elemBelow.parentElement.parentElement, draggingItem);

        playSound(bellSound);
        winCount += 1;
      } else if (
        (elemBelow.parentElement?.id === "left-leg" ||
          elemBelow.parentElement?.id === "right-leg") &&
        draggingItem.dataset.name === dollSvg.children[6].id
      ) {
        addHiddenClasses(dollSvg.children[6], draggingItem);

        playSound(bellSound);
        winCount += 1;
      } else {
        smoothTransition(draggingItem);

        setTimeout(
          // () => changeStylesAndAppend(elemDraggingStartPlace, draggingItem),
          () => dragAppend(elemDraggingStartPlace, draggingItem, findIdx),
          1000
        );
      }

      if (winCount === dollsClothes.length) {
        winTextSwitcherdoll_9();
        playSound(winSound);
      }
      draggingItem.removeEventListener("pointerup", onpointerup);
    }

    function addHiddenClasses(dropElem, draggingElem) {
      dropElem.classList.remove("hide");

      draggingElem.classList.add("hidden");
    }

    function smoothTransition(draggingElem) {
      document.body.style.pointerEvents = "none";

      let coordX, coordY;
      draggingElem.classList.add("dragTransition");

      coordX =
        elemDraggingStartPlace.getBoundingClientRect().left +
        elemDraggingStartPlace.getBoundingClientRect().width / 4;

      coordY = elemDraggingStartPlace.getBoundingClientRect().height / 2;
      // +
      // window.pageYOffset;
      draggingElem.style.left = `${coordX}px`;
      draggingElem.style.top = `${coordY}px`;
      setTimeout(() => {
        draggingElem.classList.remove("dragTransition");
        document.body.style.pointerEvents = "auto";
      }, 1000);
      draggingElem.removeEventListener("pointerup", onpointerup);
    }
  }

  // обработка положительного или отрицательного результата сбора домика

  function winTextSwitcherdoll_9() {
    if (wellDone.classList.contains("fadedoll_9")) {
      wellDone.classList.remove("fadedoll_9");

      wellDone.classList.add("onViewdoll_9");
    } else if (wellDone.classList.contains("onViewdoll_9")) {
      wellDone.classList.remove("onViewdoll_9");

      wellDone.classList.add("fadedoll_9");
    }
  }
})();
