/* ==================================================
   ELEMENT SELECTOR HELPERS
================================================== */

// Select ONE element
const $ = (selector) => {
    return document.querySelector(selector);
};


// Select MULTIPLE elements
const $$ = (selector) => {
    return document.querySelectorAll(selector);
};


/* ==================================================
   GET HTML ELEMENTS
================================================== */

const music = $("#music");
const musicButton = $("#musicBtn");

const openButton = $("#open");

const wishButton = $("#wishBtn");
const wishText = $("#wishText");

const partyButton = $("#party");

const loader = $(".loader");

const progressBar = $(".bar i");

const canvas = $("#fx");

const context = canvas.getContext("2d");


/* ==================================================
   LOADING SCREEN
================================================== */

setTimeout(() => {

    loader.classList.add("hide");

}, 700);


/* ==================================================
   OPEN SURPRISE BUTTON
================================================== */

openButton.onclick = () => {

    /*
        User button click karega,
        tab music start hoga.
    */

    music
        .play()
        .then(() => {

            // Music chal raha hai
            musicButton.textContent = "♪";

        })
        .catch(() => {

            /*
                Kuch browsers music ko
                automatically play nahi karne dete.
            */

        });


    /*
        Birthday wish section par
        smoothly scroll karo.
    */

    $(".wish").scrollIntoView({

        behavior: "smooth"

    });


    /*
        Thoda confetti.
    */

    burst(80);

};


/* ==================================================
   MUSIC PLAY / PAUSE
================================================== */

musicButton.onclick = () => {

    /*
        Check karo music currently
        paused hai ya nahi.
    */

    if (music.paused) {

        // Music start
        music.play();

        // Button icon
        musicButton.textContent = "♪";

    }

    else {

        // Music stop
        music.pause();

        // Button icon
        musicButton.textContent = "♫";

    }

};


/* ==================================================
   SCROLL PROGRESS BAR
================================================== */

window.addEventListener("scroll", () => {

    /*
        Total page height mein se
        viewport ki height minus kar rahe hain.
    */

    const pageHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;


    /*
        User kitna scroll kar chuka hai.
    */

    const scrollPercentage =
        (window.scrollY / pageHeight) * 100;


    /*
        Pink progress bar ki width
        change karo.
    */

    progressBar.style.width =
        scrollPercentage + "%";

});


/* ==================================================
   BLOW CANDLES
================================================== */

wishButton.onclick = () => {

    /*
        Page ke saare flames find karo.
    */

    const flames = $$(".flame");


    /*
        Har flame ko hide karo.
    */

    flames.forEach((flame) => {

        flame.style.display = "none";

    });


    /*
        Birthday message show karo.
    */

    wishText.classList.add("show");


    /*
        Confetti.
    */

    burst(150);

};


/* ==================================================
   FINAL CELEBRATION
================================================== */

partyButton.onclick = () => {

    /*
        Last button par
        bahut saara confetti.
    */

    burst(300);

};


/* ==================================================
   CONFETTI VARIABLES
================================================== */

let particles = [];


/* ==================================================
   CANVAS SIZE
================================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}


// Page load par canvas size set karo
resizeCanvas();


// Window resize hone par canvas resize karo
window.addEventListener(
    "resize",
    resizeCanvas
);


/* ==================================================
   CREATE CONFETTI
================================================== */

function burst(amount) {

    /*
        amount batata hai ki
        kitne particles create karne hain.
    */

    for (let i = 0; i < amount; i++) {

        particles.push({

            /*
                Starting X position.
            */

            x:
                window.innerWidth / 2
                + (Math.random() - 0.5) * 80,


            /*
                Starting Y position.
            */

            y:
                window.innerHeight * 0.45,


            /*
                Left/right movement.
            */

            vx:
                (Math.random() - 0.5) * 14,


            /*
                Upward movement.
            */

            vy:
                -Math.random() * 12 - 2,


            /*
                Gravity.
            */

            gravity: 0.25,


            /*
                Particle kitni der
                screen par rahega.
            */

            life:
                80 + Math.random() * 100,


            /*
                Particle ka size.
            */

            size:
                7 + Math.random() * 13,


            /*
                Particle rotation.
            */

            rotation:
                Math.random() * 6

        });

    }

}


/* ==================================================
   CONFETTI ANIMATION
================================================== */

function animateConfetti() {

    /*
        Previous frame ko clear karo.
    */

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        Jo particles khatam ho gaye
        unhe remove karo.
    */

    particles = particles.filter(
        (particle) => particle.life > 0
    );


    /*
        Har particle ko update karo.
    */

    particles.forEach((particle) => {


        // X position change
        particle.x += particle.vx;


        // Y position change
        particle.y += particle.vy;


        // Gravity apply
        particle.vy += particle.gravity;


        // Life kam karo
        particle.life--;


        // Rotation
        particle.rotation += 0.1;


        /*
            Drawing start
        */

        context.save();


        /*
            Particle ki position par move karo.
        */

        context.translate(
            particle.x,
            particle.y
        );


        /*
            Particle rotate karo.
        */

        context.rotate(
            particle.rotation
        );


        /*
            Particle dheere-dheere
            transparent hoga.
        */

        context.globalAlpha =
            Math.min(
                1,
                particle.life / 30
            );


        /*
            Font size.
        */

        context.font =
            particle.size + "px serif";


        /*
            Possible symbols.
        */

        const symbols = [
            "♥",
            "✦",
            "♡",
            "•"
        ];


        /*
            Random symbol choose karo.
        */

        const randomSymbol =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        /*
            Pink color.
        */

        context.fillStyle = "#eb709c";


        /*
            Symbol draw karo.
        */

        context.fillText(
            randomSymbol,
            0,
            0
        );


        /*
            Drawing finish.
        */

        context.restore();

    });


    /*
        Next animation frame.
    */

    requestAnimationFrame(
        animateConfetti
    );

}


/* ==================================================
   START CONFETTI LOOP
================================================== */

animateConfetti();