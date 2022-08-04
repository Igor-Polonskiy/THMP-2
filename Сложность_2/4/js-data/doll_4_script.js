(() => {
    const wrapper = document.querySelector('.doll_4_wrapper');

    const resetBtn = wrapper.querySelector('.doll_4_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_4_MuteSound');
    const fullScreenBtn = wrapper.querySelector('.doll_4_FullScreenBtn');
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
    const head = wrapper.querySelector('#head')  // head **** head_move
    const earleft = wrapper.querySelector('#ear-left')
    const earright = wrapper.querySelector('#ear-right')
    const face = wrapper.querySelector('#face')
    const mouth = wrapper.querySelector('#mouth')
    const hair = wrapper.querySelectorAll('.hair')



    const leftLeg = wrapper.querySelector('#left-leg'); //left-leg **** left_leg_move
    const rightLeg = wrapper.querySelector('#right-leg'); //right-leg **** right_leg_move
    const sandalsLeft = wrapper.querySelector('#sandals-left_1_'); //sandals_left **** sandals_left_move
    const sandalsRight = wrapper.querySelector('#sandals-right'); //sandals_right **** sandals_right_move

    const leftHand = wrapper.querySelector('#left-hand'); //left-hand **** left_hand_move
    const rightHand = wrapper.querySelector('#right-hand'); //right-hand **** right_hand_move

    const bow = wrapper.querySelector('#bow'); //bow **** bow_move

    const closedEyes = wrapper.querySelector('#closed-eyes'); //closed-eyes **** closed_eyes_view
    const eyelashesLeft = wrapper.querySelector('#eyelashes-left'); //eyelashes_left **** eyelashes_move
    const eyelashesRight = wrapper.querySelector('#eyelashes-right'); //eyelashes_right **** eyelashes_move

    const topLip = wrapper.querySelector('#top-lip'); //top-lip **** top_lip_move
    const bottomLip = wrapper.querySelector('#bottom-lip'); //bottom-lip ****  bottom_lip_move



    function legsMove() {
        leftLeg.classList.add('left_leg_move')
        rightLeg.classList.add('right_leg_move')
        sandalsLeft.classList.add('sandals_left_move')
        sandalsRight.classList.add('sandals_right_move')
    }

    function headMove() {
        head.classList.add('head_move')
        bow.classList.add('bow_move')
    }

    function handsMove() {
        leftHand.classList.add('left_hand_move')
        rightHand.classList.add('right_hand_move')
    }

    function eyesMove() {
        closedEyes.classList.add('closed_eyes_view')
        eyelashesLeft.classList.add('eyelashes_move')
        eyelashesRight.classList.add('eyelashes_move')
    }

    function lipsMove() {
        topLip.classList.add('top_lip_move')
        bottomLip.classList.add('bottom_lip_move')
    }

    function resetMoving() {
        leftLeg.classList.remove('left_leg_move')
        rightLeg.classList.remove('right_leg_move')
        sandalsLeft.classList.remove('sandals_left_move')
        sandalsRight.classList.remove('sandals_right_move')
        head.classList.remove('head_move')
        bow.classList.remove('bow_move')
        leftHand.classList.remove('left_hand_move')
        rightHand.classList.remove('right_hand_move')
        closedEyes.classList.remove('closed_eyes_view')
        eyelashesLeft.classList.remove('eyelashes_move')
        eyelashesRight.classList.remove('eyelashes_move')
        topLip.classList.remove('top_lip_move')
        bottomLip.classList.remove('bottom_lip_move')
    }


    let win = 0
    // hide" draggable="true" ondrop="return false"
    //Head
    head.addEventListener('mouseover', () => {
        if (!eyes[0].classList.contains('hoveredEye') && !mouth.classList.contains('hoveredEye')) {
            head.classList.add('hovered')
            face.classList.add('hovered')
            earleft.classList.add('hovered')
            earright.classList.add('hovered')
            hair.forEach(item => item.classList.add('hoveredHair'))

        }
    })
    head.addEventListener('mouseenter', () => {
        if (!head.classList.contains('selected')) {
            playSound(soundRing)
        }
    })
    head.addEventListener('mouseout', () => {
        head.classList.remove('hovered')
        face.classList.remove('hovered')
        earleft.classList.remove('hovered')
        earright.classList.remove('hovered')
        hair.forEach(item => item.classList.remove('hoveredHair'))

    })
    head.addEventListener('click', (e) => {
        if (!eyes[0].classList.contains('hoveredEye') && !mouth.classList.contains('hoveredEye')) {
            if (!head.classList.contains('selected')) {
                headMove();
                head.classList.add('selected')
                face.classList.add('selected')
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
                legsMove();
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
                handsMove();
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
                eyesMove();
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
            if (!mouth.classList.contains('selectedEye')) {
                lipsMove();
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
        head.classList.remove('selected')
        face.classList.remove('selected')
        mouth.classList.remove('selectedEye')
        win = 0
        well_done.classList.remove('onViewdoll_4');
        doll.classList.remove('hide')
        resetMoving();
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


    function winCheker() {
        if (win === 5) {

            winTextSwitcher();
        }
    };

    function winTextSwitcher() {
        setTimeout(() => {
            well_done.classList.add('onViewdoll_4');
            doll.classList.add('hide')
            soundOn && playSound(soundWin);
        }, 2000)

    };
})();