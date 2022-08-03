(() => {
    const wrapper = document.querySelector('.doll_1_wrapper');

    const resetBtn = wrapper.querySelector('.doll_1_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_1_MuteSound');
    const soundBtfullScreenBtn = wrapper.querySelector('.doll_1_FullScreenBtn');
    const doll = wrapper.querySelector('#Layer_1')
    const well_done = wrapper.querySelector('.doll_1_Well_done');
    const legs = wrapper.querySelectorAll('.leg')
    const hands = wrapper.querySelectorAll('.hand')
    const eyes = wrapper.querySelectorAll('.eye')
    const soundEyes = document.querySelector('#doll_1_1_dictor')
    const soundRing = document.querySelector('#doll_1_1_mmr')
    const soundWin = document.querySelector('#doll_1_2_mmr')
    const soundHands = document.querySelector('#doll_1_2_dictor')
    const soundLegs = document.querySelector('#doll_1_3_dictor')
    const contentBlocker = 'doll_1_ContentBlocker';


    let win = 0
    // hide" draggable="true" ondrop="return false"


    legs.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            legs.forEach(item => {
                item.classList.add('hovered')
            })
        })
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('selected')) {
                playSound(soundRing)
            }
        })
        item.addEventListener('mouseout', (e) => {
            legs.forEach(item => {
                item.classList.remove('hovered')
            })
        })
        item.addEventListener('click', (e) => {
            if (!item.classList.contains('selected')) {
                legs.forEach(item => {
                    item.classList.add('selected')
                })
                win++
                setTimeout(() => winCheker(), 1500)
            }
            playSound(soundLegs)
        })
    })

    hands.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            hands.forEach(item => {
                item.classList.add('hovered')
            })
        })
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('selected')) {
                playSound(soundRing)
            }
        })
        item.addEventListener('mouseout', (e) => {
            hands.forEach(item => {
                item.classList.remove('hovered')
            })
        })
        item.addEventListener('click', (e) => {
            if (!item.classList.contains('selected')) {
                hands.forEach(item => {
                    item.classList.add('selected')
                })
                win++
                setTimeout(() => winCheker(), 1500)
            }
            playSound(soundHands)
        })
    })

    eyes.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            eyes.forEach(item => {
                item.classList.add('hoveredEye')
            })

        })
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('selectedEye')) {
                playSound(soundRing)
            }
        })
        item.addEventListener('mouseout', (e) => {
            eyes.forEach(item => {
                item.classList.remove('hoveredEye')
            })
        })
        item.addEventListener('click', (e) => {
            if (!item.classList.contains('selectedEye')) {

                eyes.forEach(item => {
                    item.classList.add('selectedEye')
                })
                win++
                setTimeout(() => winCheker(), 1500)
            }
            playSound(soundEyes)
        })

    })


    soundBtn.addEventListener('click', soundChanger);
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


    // Обработчик кнопки "Вернуть к исходному состоянию"
    resetBtn.addEventListener('click', () => {
        legs.forEach(item => {
            item.classList.remove('selected')
        })
        hands.forEach(item => {
            item.classList.remove('selected')
        })
        eyes.forEach(item => {
            item.classList.remove('selectedEye')
        })
        win = 0
        well_done.classList.remove('onViewdoll_1');
        doll.classList.remove('hide')
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


    function winCheker() {
        if (win === 3) {
            winTextSwitcher();
        }
    };

    function winTextSwitcher() {

        well_done.classList.add('onViewdoll_1');
        doll.classList.add('hide')
        soundOn && playSound(soundWin);

    };
})();