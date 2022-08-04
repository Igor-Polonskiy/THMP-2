(() => {


    const wrapper = document.querySelector('.doll_3_wrapper');

    const divMain = wrapper.querySelector('.doll_3_Main');
    const resetBtn = wrapper.querySelector('.doll_3_ResetBtn');
    const soundBtn = wrapper.querySelector('.doll_3_MuteSound');
    const fullScreenBtn = wrapper.querySelector('.doll_3_FullScreenBtn');
    const container = wrapper.querySelector('.container');
    const insideBox = wrapper.querySelector('.doll_3_insideBox');
    const contentBlocker = 'doll_3_ContentBlocker';
    const well_done = wrapper.querySelector('.doll_3_Well_done');
    const imgs = wrapper.querySelectorAll('.doll_3_svg')
    const soundFun = document.querySelector('#doll_3_1_mmr')
    const soundSad = document.querySelector('#doll_3_2_mmr')
    const doll = wrapper.querySelector('#Doll')
    


    // doll_3_hide" draggable="true" ondrop="return false"

    const elemsdoll_3_ = wrapper.querySelectorAll('.doll_3_item');
    imgs.forEach(item => {
        item.addEventListener('mouseenter', () => { mouseover(item) })
        item.addEventListener('mouseleave', () => { mouseleave(item) })
        item.addEventListener('click', () => {
            if (item.classList.contains('notDoll')) {
                playSound(soundSad)
                item.classList.add('hoveredClicked')
                setTimeout(() => {
                    item.classList.remove('hoveredClicked')
                    item.classList.remove('hovered')
                }, 2000)
            }
            else {
                item.classList.add('hoveredDoll')
                playSound(soundFun)
                setTimeout(()=>{
                    insideBox.classList.add('doll_3_hide')
                    well_done.classList.add('onViewdoll_3');
                },2000)
            }
        })
    })


    function mouseover(item) {
        item.classList.add('hovered')
    }
    function mouseleave(item) {
        item.classList.remove('hovered')
    }

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
        insideBox.classList.remove('doll_3_hide')
        well_done.classList.remove('onViewdoll_3');
        doll.classList.remove('hoveredDoll')
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


})();