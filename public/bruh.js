// Ban System
// Doge Chat

let x = false
let v = false

function ban() {
    x = true
    window.localStorage.setItem('.', '.')
    setInterval(( ) => {
        if(!window.localStorage.getItem('.')){
            window.localStorage.setItem('.', '.')
        }
    },0)
    if (v == false) {
        document.head.innerHTML = `<title><<< you</title>\n<link rel="icon" type="image/x-icon" href="/img/clown.ico">` + `
        <style>
        * {
        margin: 0;
        padding: 0;
        background-color: #000
        }
        video {
        width: 100%;
        height: 100%;
        }
        html {
        display: block;
        }
        </style>`
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
        setTimeout(() => {
            document.body.innerHTML = `<video autoplay="" name="media"><source src="/vid/skele.mp4" type="video/mp4"></video>`
            setInterval(() => {
                if(!document.querySelector('video')){
                    document.body.innerHTML = `<video autoplay="" name="media"><source src="/vid/skele.mp4" type="video/mp4"></video>`
                }else if(!document.querySelector('source')){
                    document.body.innerHTML = `<video autoplay="" name="media"><source src="/vid/skele.mp4" type="video/mp4"></video>`
                }
                // anti opera popouts
                if (document.querySelector('#detach-button-host')) {
                    document.querySelector('#detach-button-host').remove()
                }
                if (document.querySelector('#qr-host')) {
                    document.querySelector('#qr-host').remove()
                }
            }, 10)
        }, 0)

    }
}

window.onbeforeunload = () => {
    if (x == true) {
        window.localStorage.setItem('.', '.')
    }
}

if (window.localStorage.getItem('.')) {
    ban()
    x = true
}