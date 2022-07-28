
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
    const soundTake = document.querySelector('#doll_2_1_mmr')
    const soundPut = document.querySelector('#doll_2_2_mmr')
    const soundSong = document.querySelector('#doll_2_3_mmr')
    const well_done = wrapper.querySelector('.doll_2_Well_done')
    const eyes = wrapper.querySelector('.doll_2_eyes')


    // Собирается элементы в переменные, создаются вспомогательные переменные


    // Обработчик кнопки "Вернуть к исходному состоянию"
    resetBtn.addEventListener('click', reset);

    function reset() {
        bed.src = 'Images_1/doll_2_img/crib.png'
        doll.classList.remove('hide')
        well_done.classList.remove('onViewdoll_2');
        doll.classList.remove('doll_2_rotate')
        eyes.style.display = 'none'

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
        dropPlace.append(draggingElem);
        draggingItem = null
    }

    doll.addEventListener('pointerdown', mouseDown)


    let draggingItem;
    let elemBelow;
    function bedShake(e){
        bed.src = 'Images_1/doll_2_img/doll-sleeping.gif'
        playSound(soundSong)
        bed.removeEventListener('pointerdown' , bedShake)
        well_done.classList.add('onViewdoll_2');
    }

    function mouseDown(event) {
        event.stopPropagation()
        playSound(soundTake)
        if (event.button !== 0) return;
        draggingItem = doll;
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
            if(elemBelow.classList.contains('doll_2_bed')){
                draggingItem.classList.add('doll_2_rotate')
                eyes.style.display = 'inherit'
            }else {
                draggingItem.classList.remove('doll_2_rotate')
                eyes.style.display = 'none'
        }

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)
           
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
            if (elemBelow.classList.contains('doll_2_bed')) {
                draggingItem.classList.add('hide')
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
                bed.src = 'Images_1/doll_2_img/doll-sleeping-cover.png'
                playSound(soundPut)
                bed.addEventListener('pointerdown' , bedShake)
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
            coordX = elemDraggingStartPlace.getBoundingClientRect().left + elemDraggingStartPlace.getBoundingClientRect().width / 2 - doll.getBoundingClientRect().width / 2
            coordY = elemDraggingStartPlace.getBoundingClientRect().top + window.pageYOffset  + elemDraggingStartPlace.getBoundingClientRect().height / 2  - doll.getBoundingClientRect().height / 2
            draggingElem.style.left = `${coordX}px`
            draggingElem.style.top = `${coordY}px`
            setTimeout(() => {
                draggingElem.classList.remove('dragTransition')
                //document.body.style.pointerEvents = 'auto'

                doll.addEventListener('pointerdown', mouseDown);


            }, 1000)
        }


    };


})()