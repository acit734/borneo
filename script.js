document.addEventListener('DOMContentLoaded', () => {
    let video = document.getElementById('video-preview-borneo');
    fetch('data/video/video-preview-borneo.mp4')
    .then(response => response.blob())
    .then(blob => {
        document.getElementById('src-video-preview-pandatara').setAttribute('src', URL.createObjectURL(blob));
        video.load();
    })
    const video_observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                video.play();
            }
        })
    }, {threshold: 0});

    video_observer.observe(video);


    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });

    let running_text_element = document.getElementById('running-text');
    let array_for_running_text = [
        "Kalimantan Tengah",
        "Kalimantan Selatan",
        "Kalimantan Barat",
        "Kalimantan Timur",
        "Kalimantan Utara",
        "Penampilan Borneo",
        "PANDATARA KALIMANTAN"
    ];
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function running_text(i) {
        let delay = (5.0 - 0.05 * array_for_running_text[i].length) * 1000;

        for (const char of array_for_running_text[i]) {
            running_text_element.textContent += char;
            await wait(50);
        }

        let waiting = 10100 - parseFloat(video.currentTime.toFixed(3)) * 1000 % 10000
        await wait(waiting);

        while (parseFloat(video.currentTime.toFixed(3)) * 1000 % 10000  < delay) {
            await wait(1); 
        }

        for (let j = running_text_element.textContent.length - 1; j >= 0; j--) {
            running_text_element.textContent = running_text_element.textContent.substring(0, j);
            await wait(50)
        }

        if (i === 6) {
            running_text(0);
        } else {
            running_text(i + 1)
        }
    }

    async function setup_running_text() {
        let setup_text = "Selamat datang di PANDATARA BORNEO"
        running_text_element.textContent = setup_text;
        let delay = (5.0 - 0.05 * setup_text.length) * 1000;

        while (parseFloat(video.currentTime.toFixed(3)) * 1000 < delay) {
            await wait(1); 
        }

        for (let j = running_text_element.textContent.length - 1; j >= 0; j--) {
            running_text_element.textContent = running_text_element.textContent.substring(0, j);
            await wait(50);
        }
        running_text(1)
    }

    setup_running_text();

    let tombol_requestFullScreen = document.getElementById('request-open-in-fullscreen');
    tombol_requestFullScreen.addEventListener('click', () => {
        if (tombol_requestFullScreen.requestFullscreen) {
            tombol_requestFullScreen.requestFullscreen();
        } else if (tombol_requestFullScreen.webkitRequestFullscreen) { // Safari
            tombol_requestFullScreen.webkitRequestFullscreen();
        } else if (tombol_requestFullScreen.msRequestFullscreen) { // IE11
            tombol_requestFullScreen.msRequestFullscreen();
        }
        tombol_requestFullScreen.remove();
    });

    let deskripsi_provinsi;
    let cover_preview_borneo = document.getElementById('cover-preview-masked')
    let borneo_button = document.getElementById('borneo-button');
    let back_arrow = document.getElementById('back-arrow-borneo-image');
    let chevron_up_borneo_images = document.getElementById('chevron-up-borneo-images');
    let chevron_down_borneo_images = document.getElementById('chevron-down-borneo-images');
    let container_borneo_images = document.getElementById('container-borneo-images');
    let container_lambang_provinsi = document.getElementById('container-lambang-provinsi');
    let h1_nama_provinsi = document.getElementById('nama-provinsi');
    let p_deskripsi_provinsi = document.getElementById('deskripsi-provinsi');
    let container_borneo_images_layer1 = document.getElementById('container-borneo-images-layer1');
    let nama_provinsi_outer = document.getElementById('nama-provinsi-outer');
    let header_link_group = document.getElementById('header-link-group');
    
    let content_3_load = false;

    
    fetch('data/docs/deskripsi-provinsi.json', {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        deskripsi_provinsi = data;
    })
    .catch((err) => {
        console.error(err);
    });

    function borneo_button_mouseleave() {
        cover_preview_borneo.style.transform = 'scale(1)';
    }
    function borneo_button_mouseenter() {
        cover_preview_borneo.style.transform = 'scale(1.5)';
    }
    function back_button_arrow() {
        cover_preview_borneo.style.transform = 'scale(1)';
        cover_preview_borneo.style.opacity = '1';
        borneo_button.addEventListener('mouseleave', borneo_button_mouseleave);
        borneo_button.addEventListener('mouseenter', borneo_button_mouseenter);
        borneo_button.style.opacity = '1';
        borneo_button.style.cursor = 'pointer';
        back_arrow.style.opacity = '0';
        back_arrow.style.cursor = 'auto';
        back_arrow.removeEventListener('click', back_button_arrow)
        chevron_up_borneo_images.style.opacity = '1';
        chevron_down_borneo_images.style.opacity = '1';
        h1_nama_provinsi.style.transform = '';
        h1_nama_provinsi.style.opacity = '';
        p_deskripsi_provinsi.style.transform = '';
        p_deskripsi_provinsi.style.opacity = '';
        nama_provinsi_outer.style.opacity = '1';
        container_borneo_images_layer1.classList.remove('shows');
    }
    function chevron_up_borneo_images_click() {
        if (content_3_load) return;
        content_3_load = true;
        let index = borneo_button.getAttribute('data-info');
        borneo_button.setAttribute('data-info', index === "0" ? "4" : `${index - 1}`)
        borneo_images_changer(parseInt(borneo_button.getAttribute('data-info')));
        borneo_lambang_changer(parseInt(borneo_button.getAttribute('data-info')));
        change_outer_province_name(parseInt(borneo_button.getAttribute('data-info')));
        setTimeout(() => {
            content_3_load = false;
        }, 300);
    }
    function chevron_down_borneo_images_click() {
        if (content_3_load) return;
        content_3_load = true;
        let index = borneo_button.getAttribute('data-info');
        borneo_button.setAttribute('data-info', index === "4" ? "0" : `${parseInt(index) + 1}`);
        borneo_images_changer(parseInt(borneo_button.getAttribute('data-info')));
        borneo_lambang_changer(parseInt(borneo_button.getAttribute('data-info')));
        change_outer_province_name(parseInt(borneo_button.getAttribute('data-info')));
        setTimeout(() => {
            content_3_load = false;
        }, 300);
    }
    function borneo_images_changer(index) {
        for(let i = 0; i <= 4; i++) {
            if (i === index) {
                container_borneo_images.children[i].style.opacity = '1';
            }
            else {
                container_borneo_images.children[i].style.opacity = '0';
            }
        }
    }
    function borneo_lambang_changer(index) {
        let before = (index -1) === -1 ? 4 : index;
        for (let i = 0; i <= 4; i++) {
            if (i === ((index - 1) === (-1) ? 4 : (index - 1))) {
                container_lambang_provinsi.children[i].style.transform = 'translate(0, -200px)';
                setTimeout(() => {
                    container_lambang_provinsi.children[i].style.opacity = '1';
                }, 300)
            } else if (i === index) {
                container_lambang_provinsi.children[i].style.transform = '';
                container_lambang_provinsi.children[i].style.opacity = '1';
            } else if (i === ((index + 1) === 5 ? 0 : (index + 1))) {
                container_lambang_provinsi.children[i].style.transform = 'translate(0, 200px)';
                setTimeout(() => {
                    container_lambang_provinsi.children[i].style.opacity = '1';
                }, 300)
            } else {
                container_lambang_provinsi.children[i].style.opacity = '0';
                container_lambang_provinsi.children[i].style.transform = 'translate(0, -200px)';
            }
        }
    }
    function change_outer_province_name(i) {
        nama_provinsi_outer.style.opacity = '0';
        setTimeout(() => {
            nama_provinsi_outer.textContent = array_for_running_text[i];
            nama_provinsi_outer.style.opacity = '1';
        }, 300)
    }
    change_outer_province_name(0);
    borneo_images_changer(0);
    borneo_lambang_changer(0);

    borneo_button.addEventListener('mouseenter', borneo_button_mouseenter);
    borneo_button.addEventListener('mouseleave', borneo_button_mouseleave);
    borneo_button.addEventListener('click', () => {
        cover_preview_borneo.style.transform = 'scale(50)';
        cover_preview_borneo.style.opacity = '0';
        borneo_button.removeEventListener('mouseleave', borneo_button_mouseleave);
        borneo_button.removeEventListener('mouseenter', borneo_button_mouseenter);
        borneo_button.style.transform = 'scale(1.5)';
        borneo_button.style.opacity = '0';
        borneo_button.style.cursor = 'auto';
        chevron_up_borneo_images.style.opacity = '0';
        chevron_down_borneo_images.style.opacity = '0';
        h1_nama_provinsi.innerHTML = array_for_running_text[borneo_button.getAttribute('data-info')];
        p_deskripsi_provinsi.innerHTML = deskripsi_provinsi[borneo_button.getAttribute('data-info')];
        nama_provinsi_outer.style.opacity = '0';
        setTimeout(() => {
            borneo_button.style.transform = '';
            back_arrow.style.opacity = '1';
            back_arrow.style.cursor = 'pointer';
            h1_nama_provinsi.style.transform = 'translate(0, -25vh)';
            h1_nama_provinsi.style.opacity = '1';
            p_deskripsi_provinsi.style.transform = 'translate(0, 18vh)';
            p_deskripsi_provinsi.style.opacity = '1';
            container_borneo_images_layer1.classList.add('shows');
            back_arrow.addEventListener('click', back_button_arrow);
        }, 500)
    });
    chevron_up_borneo_images.addEventListener('click', chevron_up_borneo_images_click);
    chevron_down_borneo_images.addEventListener('click', chevron_down_borneo_images_click)

    let video_pandatara = document.getElementById('video-pandatara');
    video_pandatara.addEventListener('ended', () => {
        video_pandatara.currentTime = 0;
        video_pandatara.play()
    });

    let logo_pandatara = document.getElementById('logo-pandatara');
    let header = document.getElementById('header');
    let intersected;
    const header_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.classList.remove('intersected');
                intersected = false;
                header_observation(intersected)
            } else {
                header.classList.add('intersected');
                intersected = true;
                header_observation(intersected)
            }
        });
    });

    function header_observation(intersected) {
        if (intersected) {
            header.style.width = '50px';
            header.style.borderRadius = '3px';
            header_link_group.style.opacity = '0';
            setTimeout(() => {
                header.style.top = '5px';
                header.style.left = '5px';
            }, 500);
        } else {
            header_link_group.style.opacity = '1';
            header.style.top = '';
            header.style.left = '';
            setTimeout(() => {
                header.style.width = '';
                header.style.borderRadius = '';
            }, 100);
        }
    }
    
    header_observer.observe(logo_pandatara); 
    
    let p_pandatara_blobs = {};
    let used_pic = [];
    [
        'DSCF8026.JPG',
        'DSCF8175.JPG',
        'IMG-20221104-WA0190.jpg',
        'IMG-20221104-WA0194.jpg',
        'IMG-20221105-WA0139.jpg',
        'IMG-20221113-WA0010.jpg',
        'IMG-20221113-WA0011.jpg',
        'IMG-20221113-WA0019.jpg',
        'IMG-20221113-WA0021.jpg',
        'IMG-20221113-WA0022.jpg',
        'IMG-20221113-WA0023.jpg'
    ].forEach(gambar => {
        fetch(`data/image/pandatara-photo/${gambar}`)
        .then(response => response.blob())
        .then(blob => {
            p_pandatara_blobs[gambar] = URL.createObjectURL(blob);
        })
        .catch((err) => {
            console.error(err)
        });
    });

    function excludedRandNum(min, max, exclude) {
        let randomnumber;
        do {
            randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (exclude.includes(randomnumber));

        return randomnumber;
    }

    let p1 = document.getElementById('pandatara-photo-1');
    let p2 = document.getElementById('pandatara-photo-2');
    let p3 = document.getElementById('pandatara-photo-4');
    let p4 = document.getElementById('pandatara-photo-3');
    async function set_pandatara_pic() {
        setInterval(() => {
            let a = excludedRandNum(0, 10, used_pic);
            used_pic[0] = a;
            p1.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
        }, 9000);

        await wait(1000);

        setInterval(() => {
            let a = excludedRandNum(0, 10, used_pic);
            used_pic[1] = a;
            p2.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
        }, 9000);

        await wait(1000);

        setInterval(() => {
            let a = excludedRandNum(0, 10, used_pic);
            used_pic[2] = a;
            p3.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
        }, 9000);

        await wait(1000);

        setInterval(() => {
            let a = excludedRandNum(0, 10, used_pic);
            used_pic[3] = a;
            p4.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
        }, 9000);
    }

    function set_images() {
    let a = excludedRandNum(0, 10, used_pic);
    used_pic[0] = a
    p1.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
    a = excludedRandNum(0, 10, used_pic);
    used_pic[1] = a
    p2.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
    a = excludedRandNum(0, 10, used_pic);
    used_pic[2] = a
    p3.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
    a = excludedRandNum(0, 10, used_pic);
    used_pic[4] = a
    p4.style.backgroundImage = `url(${p_pandatara_blobs[Object.keys(p_pandatara_blobs)[a]]})`;
    }

    async function wait_to_set_images() {
        if (p_pandatara_blobs[Object.keys(p_pandatara_blobs)[9]] === undefined) {
            await wait(500)
            wait_to_set_images();
        } else {
            set_images();
        }
    }
    wait_to_set_images();
    set_pandatara_pic()

});