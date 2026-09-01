/* =========================================
   CONTACT
   SYSTEM BUILD v1

   One system:

   MOUSE
      ↓
    SIGIL
      ↓
   CONTACT
      ↓
 OBJECT REACTION
      ↓
 TEMPORARY GLOW

   Visual Register

   Background: #050509
   Accent:     #8FE8FF
========================================= */


/* =========================================
   SHARED SETTINGS
========================================= */

const BACKGROUND = "#050509";
const CYAN = "#8FE8FF";


/* =========================================
   CANVAS
========================================= */

const canvas = document.getElementById("systemCanvas");
const ctx = canvas.getContext("2d");


let width = 0;
let height = 0;
let dpr = window.devicePixelRatio || 1;


/* =========================================
   RESIZE
========================================= */

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


/* =========================================
   MOUSE
========================================= */

const mouse = {

    x: 0,
    y: 0,

    targetX: 0,
    targetY: 0,

    active: false,

    down: false

};


/* =========================================
   SIGIL
========================================= */

const sigil = {

    x: 0,
    y: 0,

    radius: 25,

    rotation: 0,

    tension: 0,

    glow: 0

};


/* =========================================
   OBJECTS
========================================= */

const objects = [

    {
        x: 0,
        y: 0,

        size: 52,

        vx: 0,
        vy: 0,

        glow: 0
    },

    {
        x: 0,
        y: 0,

        size: 42,

        vx: 0,
        vy: 0,

        glow: 0
    },

    {
        x: 0,
        y: 0,

        size: 60,

        vx: 0,
        vy: 0,

        glow: 0
    },

    {
        x: 0,
        y: 0,

        size: 36,

        vx: 0,
        vy: 0,

        glow: 0
    },

    {
        x: 0,
        y: 0,

        size: 48,

        vx: 0,
        vy: 0,

        glow: 0
    },

    {
        x: 0,
        y: 0,

        size: 40,

        vx: 0,
        vy: 0,

        glow: 0
    }

];


/* =========================================
   TRAIL
========================================= */

const trail = [];

const MAX_TRAIL = 28;


/* =========================================
   INITIALIZE OBJECTS
========================================= */

function initializeObjects() {

    objects[0].x = width * 0.25;
    objects[0].y = height * 0.25;

    objects[1].x = width * 0.52;
    objects[1].y = height * 0.22;

    objects[2].x = width * 0.75;
    objects[2].y = height * 0.32;

    objects[3].x = width * 0.30;
    objects[3].y = height * 0.68;

    objects[4].x = width * 0.62;
    objects[4].y = height * 0.72;

    objects[5].x = width * 0.80;
    objects[5].y = height * 0.62;
}


/* =========================================
   MOUSE POSITION
========================================= */

function updateMousePosition(event) {

    const rect = canvas.getBoundingClientRect();

    mouse.targetX =
        event.clientX - rect.left;

    mouse.targetY =
        event.clientY - rect.top;

    mouse.active = true;
}


canvas.addEventListener(
    "mousemove",
    updateMousePosition
);


canvas.addEventListener(
    "mouseenter",
    function () {

        mouse.active = true;

    }
);


canvas.addEventListener(
    "mouseleave",
    function () {

        mouse.active = false;

    }
);


canvas.addEventListener(
    "mousedown",
    function () {

        mouse.down = true;

    }
);


window.addEventListener(
    "mouseup",
    function () {

        mouse.down = false;

    }
);


/* =========================================
   START POSITION
========================================= */

function initializeSigil() {

    sigil.x = width / 2;
    sigil.y = height / 2;

    mouse.x = width / 2;
    mouse.y = height / 2;

    mouse.targetX = width / 2;
    mouse.targetY = height / 2;
}


/* =========================================
   SIGIL DRAWING
========================================= */

function drawSigil(
    context,
    x,
    y,
    size,
    rotation,
    glowStrength
) {

    context.save();

    context.translate(x, y);

    context.rotate(rotation);


    /* -------------------------------------
       Glow
    ------------------------------------- */

    if (glowStrength > 0) {

        context.shadowColor = CYAN;

        context.shadowBlur =
            20 + glowStrength * 30;

    }


    /* -------------------------------------
       Outer circle
    ------------------------------------- */

    context.strokeStyle = CYAN;

    context.lineWidth = 2;

    context.globalAlpha =
        0.65 + glowStrength * 0.35;


    context.beginPath();

    context.arc(
        0,
        0,
        size,
        0,
        Math.PI * 2
    );

    context.stroke();


    /* -------------------------------------
       Vertical line
    ------------------------------------- */

    context.beginPath();

    context.moveTo(
        0,
        -size * 1.45
    );

    context.lineTo(
        0,
        size * 1.45
    );

    context.stroke();


    /* -------------------------------------
       Diagonal
    ------------------------------------- */

    context.beginPath();

    context.moveTo(
        -size * 0.8,
        -size * 0.8
    );

    context.lineTo(
        size * 0.8,
        size * 0.8
    );

    context.stroke();


    /* -------------------------------------
       Opposite diagonal
    ------------------------------------- */

    context.beginPath();

    context.moveTo(
        size * 0.8,
        -size * 0.8
    );

    context.lineTo(
        -size * 0.8,
        size * 0.8
    );

    context.stroke();


    context.restore();
}


/* =========================================
   SIGIL CORE
========================================= */

function drawSigilCore() {

    const coreGlow =
        ctx.createRadialGradient(
            sigil.x,
            sigil.y,
            0,
            sigil.x,
            sigil.y,
            sigil.radius * 2.5
        );


    coreGlow.addColorStop(
        0,
        "rgba(143,232,255,0.35)"
    );

    coreGlow.addColorStop(
        0.35,
        "rgba(143,232,255,0.12)"
    );

    coreGlow.addColorStop(
        1,
        "rgba(143,232,255,0)"
    );


    ctx.fillStyle = coreGlow;

    ctx.beginPath();

    ctx.arc(
        sigil.x,
        sigil.y,
        sigil.radius * 2.5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = CYAN;

    ctx.globalAlpha = 0.9;

    ctx.beginPath();

    ctx.arc(
        sigil.x,
        sigil.y,
        3 + sigil.tension * 4,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.globalAlpha = 1;
}


/* =========================================
   DRAW OBJECT
========================================= */

function drawObject(object) {

    const half =
        object.size / 2;


    ctx.save();


    /* -------------------------------------
       Contact glow
    ------------------------------------- */

    if (object.glow > 0) {

        ctx.shadowColor = CYAN;

        ctx.shadowBlur =
            12 + object.glow * 30;

        ctx.strokeStyle = CYAN;

    } else {

        ctx.shadowBlur = 0;

        ctx.strokeStyle =
            "rgba(83,96,102,0.8)";
    }


    ctx.lineWidth = 1.5;


    /* -------------------------------------
       Square
    ------------------------------------- */

    ctx.strokeRect(
        object.x - half,
        object.y - half,
        object.size,
        object.size
    );


    /* -------------------------------------
       Inner mark
    ------------------------------------- */

    ctx.globalAlpha =
        object.glow * 0.5;


    ctx.beginPath();

    ctx.arc(
        object.x,
        object.y,
        3,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.restore();
}


/* =========================================
   DISTANCE
========================================= */

function distanceBetween(
    x1,
    y1,
    x2,
    y2
) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


/* =========================================
   BEHAVIOR ENGINE
========================================= */

function updateObjects() {

    /*
        Tightened contact rule:

        Objects react only when the
        sigil comes within this range.
    */

    const CONTACT_RANGE = 50;


    for (const object of objects) {

        const dx =
            object.x - sigil.x;

        const dy =
            object.y - sigil.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const minimumDistance =
            sigil.radius +
            object.size / 2;


        /* ---------------------------------
           CONTACT
        --------------------------------- */

        if (
            distance <
            minimumDistance + CONTACT_RANGE
        ) {

            object.glow = 1;


            /*
                Push the object away
                from the sigil.
            */

            let angle;

            if (distance > 0.001) {

                angle =
                    Math.atan2(
                        dy,
                        dx
                    );

            } else {

                angle =
                    Math.random() *
                    Math.PI * 2;
            }


            const strength =
                distance <
                minimumDistance
                    ? 0.8
                    : 0.25;


            object.vx +=
                Math.cos(angle) *
                strength;


            object.vy +=
                Math.sin(angle) *
                strength;

        }


        /* ---------------------------------
           MOVEMENT
        --------------------------------- */

        object.x += object.vx;
        object.y += object.vy;


        /* ---------------------------------
           FRICTION
        --------------------------------- */

        object.vx *= 0.94;
        object.vy *= 0.94;


        /* ---------------------------------
           GLOW DECAY
        --------------------------------- */

        object.glow *= 0.92;


        /* ---------------------------------
           WALLS
        --------------------------------- */

        const half =
            object.size / 2;


        if (
            object.x - half < 0
        ) {

            object.x = half;

            object.vx *= -0.6;
        }


        if (
            object.x + half > width
        ) {

            object.x =
                width - half;

            object.vx *= -0.6;
        }


        if (
            object.y - half < 0
        ) {

            object.y = half;

            object.vy *= -0.6;
        }


        if (
            object.y + half > height
        ) {

            object.y =
                height - half;

            object.vy *= -0.6;
        }

    }
}


/* =========================================
   SIGIL UPDATE
========================================= */

function updateSigil() {

    /*
        Smooth mouse following.
        This keeps movement direct while
        giving the sigil a slight physical feel.
    */

    sigil.x +=
        (
            mouse.targetX -
            sigil.x
        ) * 0.16;


    sigil.y +=
        (
            mouse.targetY -
            sigil.y
        ) * 0.16;


    /* -------------------------------------
       Tension
    ------------------------------------- */

    const targetTension =
        mouse.down
            ? 1
            : 0;


    sigil.tension +=
        (
            targetTension -
            sigil.tension
        ) * 0.12;


    /* -------------------------------------
       Rotation
    ------------------------------------- */

    sigil.rotation +=
        0.002 +
        sigil.tension * 0.008;


    /* -------------------------------------
       Contact glow
    ------------------------------------- */

    let touching = false;


    for (const object of objects) {

        const distance =
            distanceBetween(
                sigil.x,
                sigil.y,
                object.x,
                object.y
            );


        if (
            distance <
            sigil.radius +
            object.size / 2
        ) {

            touching = true;

            break;
        }
    }


    const targetGlow =
        touching
            ? 1
            : 0;


    sigil.glow +=
        (
            targetGlow -
            sigil.glow
        ) * 0.15;
}


/* =========================================
   TRAIL
========================================= */

function updateTrail() {

    /*
        The trail is atmosphere only.
        It does not affect behavior.
    */

    trail.push({

        x: sigil.x,
        y: sigil.y,

        life: 1

    });


    while (
        trail.length >
        MAX_TRAIL
    ) {

        trail.shift();

    }


    for (const point of trail) {

        point.life *= 0.94;

    }
}


/* =========================================
   DRAW TRAIL
========================================= */

function drawTrail() {

    if (trail.length < 2) {
        return;
    }


    ctx.save();


    for (
        let i = 1;
        i < trail.length;
        i++
    ) {

        const previous =
            trail[i - 1];

        const current =
            trail[i];


        const progress =
            i / trail.length;


        ctx.beginPath();


        ctx.moveTo(
            previous.x,
            previous.y
        );


        ctx.lineTo(
            current.x,
            current.y
        );


        ctx.strokeStyle =
            `rgba(143,232,255,${progress * 0.12})`;


        ctx.lineWidth =
            1;


        ctx.stroke();

    }


    ctx.restore();
}


/* =========================================
   VIGNETTE
========================================= */

function drawVignette() {

    const vignette =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            Math.min(width, height) * 0.15,

            width / 2,
            height / 2,
            Math.max(width, height) * 0.72
        );


    vignette.addColorStop(
        0,
        "rgba(5,5,9,0)"
    );


    vignette.addColorStop(
        0.55,
        "rgba(5,5,9,0.08)"
    );


    vignette.addColorStop(
        1,
        "rgba(0,0,0,0.85)"
    );


    ctx.fillStyle = vignette;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


/* =========================================
   SUBTLE CENTER FIELD
========================================= */

function drawCenterField() {

    const gradient =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            Math.max(width, height) * 0.45
        );


    gradient.addColorStop(
        0,
        "rgba(143,232,255,0.025)"
    );


    gradient.addColorStop(
        1,
        "rgba(143,232,255,0)"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


/* =========================================
   MAIN DRAW
========================================= */

function draw() {

    /* -------------------------------------
       Background
    ------------------------------------- */

    ctx.fillStyle = BACKGROUND;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* -------------------------------------
       Atmosphere
    ------------------------------------- */

    drawCenterField();


    /* -------------------------------------
       Update
    ------------------------------------- */

    updateSigil();

    updateObjects();

    updateTrail();


    /* -------------------------------------
       Trail
    ------------------------------------- */

    drawTrail();


    /* -------------------------------------
       Objects
    ------------------------------------- */

    for (const object of objects) {

        drawObject(object);

    }


    /* -------------------------------------
       Sigil
    ------------------------------------- */

    drawSigil(
        ctx,
        sigil.x,
        sigil.y,
        sigil.radius +
            sigil.tension * 7,
        sigil.rotation,
        sigil.glow
    );


    drawSigilCore();


    /* -------------------------------------
       Vignette
    ------------------------------------- */

    drawVignette();


    requestAnimationFrame(draw);
}


/* =========================================
   RESIZE HANDLER
========================================= */

window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

        initializeObjects();

        if (
            sigil.x === 0 &&
            sigil.y === 0
        ) {

            initializeSigil();

        }

    }
);


/* =========================================
   START
========================================= */

resizeCanvas();

initializeObjects();

initializeSigil();

draw();