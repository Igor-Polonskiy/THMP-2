(() => {


    const wrapper = document.querySelector('.doll_1_wrapper');

    const divMain = wrapper.querySelector('.doll_1_Main');
    const resetBtn = wrapper.querySelector('.doll_1_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_1_MuteSound');
    const soundBtfullScreenBtn = wrapper.querySelector('.doll_1_FullScreenBtn');
    const container = wrapper.querySelector('.container');
    const insideBox = wrapper.querySelector('.doll_1_insideBox');
    const contentBlocker = 'doll_1_ContentBlocker';
    const well_done = wrapper.querySelector('.doll_1_Well_done');
    const doll = wrapper.querySelector('#Layer_1')
    const legs = wrapper.querySelectorAll('.leg')


    // hide" draggable="true" ondrop="return false"

    const elemsdoll_1_ = wrapper.querySelectorAll('.doll_1_item');
    let doll_1_doll_1_;
    legs.forEach(item => {
        item.addEventListener('mouseover', (e) => {

            legs.forEach(item => {
                item.classList.add('hovered')
            })
        })
        item.addEventListener('mouseout', (e) => {

            legs.forEach(item => {
                item.classList.remove('hovered')
            })
        })
        item.addEventListener('click', (e) => {

            legs.forEach(item => {
                item.classList.add('selected')
            })
        })

    })







    soundBtn.addEventListener('click', soundChanger);
    let soundOn = false;

    function soundChanger() {
        soundOn = !soundOn;
        if (soundOn) {
            soundBtn.src = "Images_1/doll_1_img/onSound.svg";
        } else {
            soundBtn.src = "Images_1/doll_1_img/mute.svg";
        }
    }

    function playSound(audio) {
        soundOn && audio.play();
    }

    function showOpeningBox(e) {
        container.classList.remove('closedBoxCardBoardBox')
        container.classList.add('openingBoxCardBoardBox')

        // openBoxCardBoardBox.style.backgroundImage = 'url(Images_1/doll_1_img/Box_opening_trueSize.png)';
        if (soundOn) {
            // start melody preOpen
            playSound(preOpenSound);
        }
    }

    function fadeOpeningBox(e) {
        if (container.classList.contains('openedBoxCardBoardBox')) {
            container.classList.remove('openedBoxCardBoardBox')
            container.classList.add('closedBoxCardBoardBox')

        }
        container.classList.remove('openingBoxCardBoardBox')
        container.classList.add('closedBoxCardBoardBox')

        // openBoxCardBoardBox.style.backgroundImage = 'url(Images_1/doll_1_img/Box_closed_trueSize.png)';
        if (soundOn) {
            // start melody closeBack
            playSound(preOpenSound);
        }
    }

    function openBox(e) {
        container.classList.remove('openingBoxCardBoardBox')
        container.classList.add('openedBoxCardBoardBox')
        // openBoxCardBoardBox.style.backgroundImage = 'url(Images_1/doll_1_img/Box_opened_trueSize.png)';
        if (soundOn) {
            // start melody opened
            playSound(openSound);
        }
        insideBox.removeEventListener('mouseenter', showOpeningBox);
        insideBox.removeEventListener('mouseleave', fadeOpeningBox);
        insideBox.removeEventListener('click', openBox);

        setTimeout(() => {
            elemsdoll_1_.forEach((e) => {
                e.classList.remove("hide");
            });
        }, 110);
    }


    let winOpenBox = false;

    // Обработчик кнопки "Вернуть к исходному состоянию"
    resetBtn.addEventListener('click', () => {
        legs.forEach(item => {
            item.classList.remove('selected')
        })
    });


    // Обработчик кнопки "Полный экран"
    soundBtfullScreenBtn.addEventListener('click', function (event) {
        if (wrapper.classList.contains(contentBlocker)) {
            wrapper.classList.remove(contentBlocker);
            document.getElementsByTagName('body')[0].style.overflowY = null;
        } else {
            wrapper.classList.add(contentBlocker);
            document.getElementsByTagName('body')[0].style.overflowY = "hidden";
        }
        if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }, false);



    function changeStylesAndAppend(dropPlace, draggingElem) {
        draggingElem.style.position = 'relative ';
        draggingElem.style.zIndex = null;
        draggingElem.style.top = null;
        draggingElem.style.left = null;
        dropPlace.appendChild(draggingElem);
    }

    elemsdoll_1_.forEach((e) => {
        e.addEventListener('pointerdown', mouseDown);
    });

    let draggingItem;
    let elemBelow;


    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;
        draggingItem.style.cursor = "url(Images_1/doll_1_img/cursor.png), auto";
        const elemDraggingBanBorder = divMain; //элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = insideBox; //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 


        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: elemDraggingBanBorder.offsetTop + scrollY,
            right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft + scrollX,
            bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop + scrollY,
            left: elemDraggingBanBorder.offsetLeft + scrollX
        };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;

        function onMouseMove(event) {
            let newLocation = {
                x: limits.left,
                y: limits.top
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            } else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            } else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);
            // moveAt(event.pageX, event.pageY);

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }
            if (event.path.includes(draggingItem)) {
                window.removeEventListener('pointerup', moveOut);
            }

            draggingItem.hidden = true;
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.hidden = false;

            if (!elemBelow) return;

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

            // let currentDroppable = null;

            // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК 

            // if (currentDroppable != droppableBelow) {
            //     if (currentDroppable) { 
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
            //         leaveDroppable(currentDroppable);
            //     }
            //     currentDroppable = droppableBelow;
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
            //     if (currentDroppable) {
            //         enterDroppable(currentDroppable);
            //     }
            // }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            // currentDroppable
        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {
            // currentDroppable
        }
        document.addEventListener('pointermove', onMouseMove);


        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            smoothTransition(draggingItem)
            setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 1000)

            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function (e) {
            startAction = true;
            if (clickWithoutMove) {
                smoothTransition(draggingItem)
                setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 10000)

            }

            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('doll_1_Main')) {
                let new_shiftX = (e.clientX - elemBelow.getBoundingClientRect().left) - shiftX - 40 + 'px';
                let new_shiftY = (e.clientY - elemBelow.getBoundingClientRect().top) - shiftY - 40 + 'px';
                draggingItem.style.left = new_shiftX;
                draggingItem.style.top = new_shiftY;
                elemBelow.appendChild(draggingItem);
                winFigursCounter();
            } else {
                smoothTransition(draggingItem)
                setTimeout(() => changeStylesAndAppend(insideBox, draggingItem), 1000)

            }

            //winFigursCounter();

        };

        function smoothTransition(draggingElem) {
            // document.body.style.pointerEvents = 'none'
            elemsdoll_1_.forEach((e) => {
                e.removeEventListener('pointerdown', mouseDown);
            });
            let coordX,
                coordY
            draggingElem.classList.add('dragTransition')
            coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width / 2
            coordY = elemDraggingStartPlace.getBoundingClientRect().top + elemDraggingStartPlace.getBoundingClientRect().height / 2 + window.pageYOffset
            draggingElem.style.left = `${coordX}px`
            draggingElem.style.top = `${coordY}px`
            setTimeout(() => {
                draggingElem.classList.remove('dragTransition')
                // document.body.style.pointerEvents = 'auto'
                elemsdoll_1_.forEach((e) => {
                    e.addEventListener('pointerdown', mouseDown);
                });

            }, 1000)
        }


    };




    function winFigursCounter() {
        if (insideBox.getElementsByTagName('img').length == 0) {
            winOpenBox = true;
            winTextSwitcher();
            elemsdoll_1_.forEach((e) => {
                e.style.pointerEvents = 'none';
            });

        }
    };

    function removePointerEventsDraggableElems() {
        elemsdoll_1_.forEach((e) => {
            e.style.pointerEvents = null;
        });
    };

    function winTextSwitcher() {

        if (!well_done.classList.contains('onViewdoll_1_')) {
            // well_done.classList.remove('hide');
            well_done.classList.add('onViewdoll_1_');
            soundOn && playSound(winSound);

        } else if (well_done.classList.contains('onViewdoll_1_')) {
            // well_done.classList.add('hide');
            well_done.classList.remove('onViewdoll_1_');
        }

    };
})();