
(() => {
    // doll_2_

    // Собираются элемненты в переменные
    const wrapper = document.querySelector('.doll_2_Wrapper');

    const soundBtn = wrapper.querySelector('.doll_2_MuteSound');
    const divSet = wrapper.querySelector('.doll_2_SliderWrapper');
    // const counter = wrapper.querySelector('.itemCount');
    const container = wrapper.querySelector('.doll_2_Container');
    const sliderwrapper = wrapper.querySelector('.doll_2_SliderWrapper');
    const resetBtn = wrapper.querySelector('.doll_2_ResetBtn');
    const house = wrapper.querySelector('.house');
    const fullScreenBtn = wrapper.querySelector('.doll_2_FullScreenBtn');
    const feedBackdoll_2_ = wrapper.querySelector('.smiledoll_2');
    const bed = wrapper.querySelector('.doll_2_bed')
 const doll = wrapper.querySelector('.doll_2_doll')


    // Собирается элементы в переменные, создаются вспомогательные переменные


    let windoll_2_ = false;
    // Обработчик кнопки "Вернуть к исходному состоянию"
    resetBtn.addEventListener('click', reset);

    function reset() {
        console.log('reset')
    }
    // Обработчик кнопки "Полный экран"

    fullScreenBtn.addEventListener('click', function (event) {
        if (wrapper.classList.contains('doll_2_Content-blocker')) {
            wrapper.classList.remove('doll_2_Content-blocker');
            document.getElementsByTagName('body')[0].style.overflowY = null;
        }
        else {
            wrapper.classList.add('doll_2_Content-blocker');
            document.getElementsByTagName('body')[0].style.overflowY = "hidden";
        }
        if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }, false);

    let soundOn = false;
    soundBtn.addEventListener('click', soundChanger);
    function soundChanger() {
        soundOn = !soundOn;
        if (soundOn) {
            soundBtn.src = "Images_1/doll_2_img/onSound.svg";
        }
        else {
            soundBtn.src = "Images_1/doll_2_img/mute.svg";
        }
    }

    function playSound(audio) {
        soundOn && audio.play();
    }

    function changeStylesAndAppend(dropPlace, draggingElem) {
        draggingElem.style.position = 'relative ';
        draggingElem.style.zIndex = null;
        draggingElem.style.top = null;
        draggingElem.style.left = null;
        dropPlace.appendChild(draggingElem);
    }

    doll.addEventListener('pointerdown', mouseDown)
   
 
    let draggingItem;
    let elemBelow;

    function mouseDown(event) {
        event.stopPropagation()
        if (event.button !== 0) return;
        draggingItem = event.target;
        draggingItem.style.cursor = "url(Images_1/doll_2_img/cursor.png), auto";
        const elemDraggingBanBorder = container;//элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = divSet;  //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        // let limits = {
        //     top: elemDraggingBanBorder.offsetTop,
        //     right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
        //     bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
        //     left: elemDraggingBanBorder.offsetLeft
        // };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        let currentDroppable = null;
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

            clickWithoutMove = false
            // moveAt(newLocation.x, newLocation.y);
            moveAt(event.pageX, event.pageY);
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


            let droppableBelow = elemBelow.closest('.houseElement'); // БЕРЁМ НУЖНЫЙ БЛОК 

            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
                if (currentDroppable) {
                    enterDroppable(currentDroppable);
                }
            }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            currentDroppable.classList.add('houseElementsShadowRed');
        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {
            currentDroppable.classList.remove('houseElementsShadowRed');

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
        draggingItem.addEventListener('pointerup', onpointerup)
        function onpointerup() {
            startAction = true;
            if (clickWithoutMove) {
                smoothTransition(draggingItem)
                setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 1000)
            }

            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('houseElement')) {
                changeStylesAndAppend(elemBelow, draggingItem);
                house.childNodes.forEach(item => {
                    item.classList?.remove('houseElementsShadowRed');
                });
                houseGameResult();
            } else {
                smoothTransition(draggingItem)
                setTimeout(() => changeStylesAndAppend(elemDraggingStartPlace, draggingItem), 1000)

            }
            draggingItem.removeEventListener('pointerup', onpointerup)
        };

        function smoothTransition(draggingElem) {
            //document.body.style.pointerEvents = 'none'
            
                doll.removeEventListener('pointerdown', mouseDown);
            
            let coordX,
                coordY
            draggingElem.classList.add('dragTransition')
            coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width
            coordY = elemDraggingStartPlace.getBoundingClientRect().top + window.pageYOffset
            draggingElem.style.left = `${coordX}px`
            draggingElem.style.top = `${coordY}px`
            setTimeout(() => {
                draggingElem.classList.remove('dragTransition')
                //document.body.style.pointerEvents = 'auto'
                
                    doll.addEventListener('pointerdown', mouseDown);
                

            }, 1000)
        }


    };





    // обработка положительного или отрицательного результата сбора домика

   




    function winTextSwitcherdoll_2_(feedBack) {
        if (windoll_2_) {
            if (wrapper.querySelector('.doll_2_Well_done').classList.contains('fadedoll_2_')) {

                wrapper.querySelector('.doll_2_Well_done').classList.remove('fadedoll_2_');
                wrapper.querySelector('.doll_2_Well_done').classList.add('onViewdoll_2_');
                feedBackdoll_2_.src = feedBack;
            }
            else if (wrapper.querySelector('.doll_2_Well_done').classList.contains('onViewdoll_2_')) {
                wrapper.querySelector('.doll_2_Well_done').classList.remove('onViewdoll_2_');
                wrapper.querySelector('.doll_2_Well_done').classList.add('fadedoll_2_');

            }
        }

    }
})()