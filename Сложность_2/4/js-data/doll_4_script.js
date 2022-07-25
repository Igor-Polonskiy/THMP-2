(() => {
    const wrapper = document.querySelector('.doll_4_wrapper');

    const resetBtn = wrapper.querySelector('.doll_4_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_4_MuteSound');
    const soundBtfullScreenBtn = wrapper.querySelector('.doll_4_FullScreenBtn');
    const doll = wrapper.querySelector('#Layer_1')
    const well_done = wrapper.querySelector('.doll_4_Well_done');
    const legs = wrapper.querySelectorAll('.leg')
    const hands = wrapper.querySelectorAll('.hand')
    const eyes = wrapper.querySelectorAll('.eye')
    const soundEyes = document.querySelector('#doll_4_1_dictor')
    const soundRing = document.querySelector('#doll_4_1_mmr')
    const soundWin = document.querySelector('#doll_4_2_mmr')
    const soundHands = document.querySelector('#doll_4_2_dictor')
    const soundLegs = document.querySelector('#doll_4_3_dictor')
    const soundHead = document.querySelector('#doll_4_4_dictor')
    const soundMouth = document.querySelector('#doll_4_5_dictor')

    const contentBlocker = 'doll_4_ContentBlocker';
    const head = wrapper.querySelector('#head')
    const mouth = wrapper.querySelector('#mouth')



    let win = 0
    // hide" draggable="true" ondrop="return false"
    //Head
    head.addEventListener('mouseover', () => {
        if (!eyes[0].classList.contains('hoveredEye')&&!mouth.classList.contains('hoveredEye')) {
            head.classList.add('hovered')
        }
    })
    head.addEventListener('mouseenter', () => {
        if (!head.classList.contains('selected')) {
            playSound(soundRing)
        }
    })
    head.addEventListener('mouseout', () => {
        head.classList.remove('hovered')
    })
    head.addEventListener('click', (e) => {
        if (!eyes[0].classList.contains('hoveredEye')&&!mouth.classList.contains('hoveredEye')) {
            if(!head.classList.contains('selected')){
                head.classList.add('selected')
            win++
            setTimeout(() => winCheker(), 1500)
            }
            
            playSound(soundHead)
        }

    })
    /////////////////////////////////////////////
    //Legs
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
    //////////////////////////////////////////////
    //Hands
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
    //////////////////////////////////////////////
    //eyes

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
        item.addEventListener('mouseleave', (e) => {
            eyes.forEach(item => {
                item.classList.remove('hoveredEye')
            })
            if (!head.classList.contains('selected')) {
                playSound(soundRing)
            }
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
    //////////////////////////////////////////////////
    //mouth

    mouth.addEventListener('mouseover', () => {
        if (!eyes[0].classList.contains('hoveredEye')) {
            mouth.classList.add('hoveredEye')
        }

    })
    mouth.addEventListener('mouseenter', () => {
        if (!mouth.classList.contains('selectedEye')) {
            playSound(soundRing)
            console.log('mouth')
        }
    })
    mouth.addEventListener('mouseleave', () => {
        mouth.classList.remove('hoveredEye')
        if (!head.classList.contains('selected')) {
            playSound(soundRing)
        }
    })
    mouth.addEventListener('click', (e) => {
        if (!eyes[0].classList.contains('hoveredEye')) {
            if(!mouth.classList.contains('selectedEye')){
                mouth.classList.add('selectedEye')
            win++
            setTimeout(() => winCheker(), 1500)
            }
            
            playSound(soundMouth)
        }

    })
    /////////////////////////////////////////////////

    soundBtn.addEventListener('click', soundChanger);
    let soundOn = false;

    function soundChanger() {
        soundOn = !soundOn;
        if (soundOn) {
            soundBtn.src = "Images_1/doll_4_img/onSound.svg";
        } else {
            soundBtn.src = "Images_1/doll_4_img/mute.svg";
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
        head.classList.remove('selected')
        mouth.classList.remove('selectedEye')
        win = 0
        well_done.classList.remove('onViewdoll_4');
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
        if (win === 5) {
            winTextSwitcher();
        }
    };

    function winTextSwitcher() {

        well_done.classList.add('onViewdoll_4');
        doll.classList.add('hide')
        soundOn && playSound(soundWin);

    };
})();