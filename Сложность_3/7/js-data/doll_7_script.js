(() => {


    const wrapper = document.querySelector('.doll_7_wrapper');

    const divMain = wrapper.querySelector('.doll_7_Main');
    const resetBtn = wrapper.querySelector('.doll_7_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_7_MuteSound');
    const soundBtfullScreenBtn = wrapper.querySelector('.doll_7_FullScreenBtn');
    const container = wrapper.querySelector('.containerdoll_7');
    const insideBox = wrapper.querySelector('.doll_7_insideBox');
    const contentBlocker = 'doll_7_ContentBlocker';
    const well_done = wrapper.querySelector('.doll_7_Well_done');
    const gameActionWrapper = wrapper.querySelector('.gameAction_wrapper_dall_7');
    const play_buttonWrapper = wrapper.querySelector('.play_button_wrapper_dall_7');
    const play_button = wrapper.querySelector('.play_button_doll_7');


    const click_sound = document.querySelector('#doll_7_1_mmr');
    const bantOff_sound = document.querySelector('#doll_7_1_dictor');
    const dressOff_sound = document.querySelector('#doll_7_2_dictor');
    const flipping_sound = document.querySelector('#doll_7_2_mmr');
    const shoesOff_sound = document.querySelector('#doll_7_3_dictor');
    const win_sound = document.querySelector('#doll_7_3_mmr');

    let win = false;
    let startAction = false;

    let numberAction = 0;
    const clothes = [
        {
            id: 'bant_doll_7',
            src: 'Images_1/doll_7_img/bow.svg',
            sound: bantOff_sound
        },
        {
            id: 'dress_doll_7',
            src: 'Images_1/doll_7_img/dress.svg',
            sound: dressOff_sound
        },
        {
            id: 'shoes_doll_7',
            src: 'Images_1/doll_7_img/sandals.svg',
            sound: shoesOff_sound
        }
    ];

    play_button.addEventListener('click', playHandlerStart, false);

    function playHandlerStart() {
        playSound(click_sound);
        startAction = true;
        play_buttonWrapper.classList.add('doll_7__opacity')
        setTimeout(() => {
            // gameActionWrapper.removeChild(play_buttonWrapper);
            play_buttonWrapper.style.position = 'absolute';
            play_buttonWrapper.style.pointerEvents = 'none';

            startActionView(clothes[numberAction].src, clothes[numberAction].id, clothes[numberAction].sound);
        }, 1000);
        play_button.removeEventListener('click', playHandlerStart, false);
    }
    function startActionView(src, id, sound) {
        changeClothes(src, id, sound);
        numberAction = numberAction + 1;
    }

    function changeClothes(clothes, id, sound) {
        let divWrapper = document.createElement('div');
        divWrapper.classList.add('clothes_wrapper_doll_7');
        divWrapper.classList.add('doll_7__opacity');
        let imgClothes = document.createElement('img');
        imgClothes.setAttribute('src', clothes);
        imgClothes.setAttribute('id', id);
        imgClothes.classList.add(`clothes_img`);
        imgClothes.setAttribute('draggable', 'false');
        divWrapper.appendChild(imgClothes);
        const theFirstChild = gameActionWrapper.firstChild;
        gameActionWrapper.insertBefore(divWrapper, theFirstChild);
        setTimeout(() => {
            divWrapper.classList.remove('doll_7__opacity');
        }, 0);

        divWrapper.addEventListener('click', playHandlerInAction, false);
        setTimeout(() => {
            playSound(sound);
        }, 500);
    }

    function playHandlerInAction() {
        playSound(flipping_sound);
        const clothes_wrapper = wrapper.querySelector('.clothes_wrapper_doll_7')
        clothes_wrapper.classList.add('doll_7__opacity')
        setTimeout(() => {
            gameActionWrapper.removeChild(gameActionWrapper.firstChild);

            if (numberAction > (clothes.length - 1)) {
                win = true;
                winTextSwitcher();
                return;
            }
            startActionView(clothes[numberAction].src, clothes[numberAction].id, clothes[numberAction].sound);
        }, 1000);
        clothes_wrapper.removeEventListener('click', playHandlerInAction, false);
    }

    soundBtn.addEventListener('click', soundChanger);
    let soundOn = false;

    function soundChanger() {
        soundOn = !soundOn;
        if (soundOn) {
            soundBtn.src = "Images_1/doll_7_img/onSound.svg";
        } else {
            soundBtn.src = "Images_1/doll_7_img/mute.svg";
        }
    }

    function playSound(audio) {
        soundOn && audio.play();
    }

    // Обработчик кнопки "Вернуть к исходному состоянию"
    resetBtn.addEventListener('click', () => {
     
        if (startAction) {
            // gameActionWrapper.removeChild(gameActionWrapper.firstChild);
            play_buttonWrapper.classList.remove('doll_7__opacity')
            play_buttonWrapper.style.position = 'relative';
            play_buttonWrapper.style.pointerEvents = 'auto';
            play_button.addEventListener('click', playHandlerStart, false);
            numberAction = 0;
            startAction = false;
        }

        if (win) {
            winTextSwitcher();
        }
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


    function winTextSwitcher() {

        if (!well_done.classList.contains('onViewdoll_7')) {
            // well_done.classList.remove('hide');
            well_done.classList.add('onViewdoll_7');
            soundOn && playSound(win_sound);

        } else if (well_done.classList.contains('onViewdoll_7')) {
            win = false;
            // well_done.classList.add('hide');
            well_done.classList.remove('onViewdoll_7');
        }

    };
})();