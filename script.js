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
 BLOCK-TO-BLOCK CONTACT

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
   OBJECTS / BLOCKS
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

    /*
        Reset block velocity and glow
        when the canvas is resized.
    */

    for (const object of objects) {

        object.vx = 0;
        object.vy = 0;
        object.glow = 0;

    }
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

       The glow fades gradually because
       object.glow is continuously reduced
       in updateObjects().
    ------------------------------------- */

    if (object.glow > 0.001) {

        ctx.shadowColor = CYAN;

        ctx.shadowBlur =
            10 + object.glow * 30;

        ctx.strokeStyle = CYAN;

        ctx.globalAlpha =
            0.45 + object.glow * 0.55;

    } else {

        ctx.shadowBlur = 0;

        ctx.strokeStyle =
            "rgba(83,96,102,0.8)";

        ctx.globalAlpha = 1;
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
       Inner contact point
    ------------------------------------- */

    if (object.glow > 0.01) {

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

    }


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
        SIGIL CONTACT RANGE

        Objects begin reacting when the
        sigil gets within 50 pixels of them.
    */

    const CONTACT_RANGE = 50;


    /*
        BLOCK COLLISION STRENGTH

        This controls how strongly blocks
        push each other.
    */

    const BLOCK_PUSH = 0.28;


    /*
        LOOP 1
        -------------------------------
        Sigil → blocks
    */

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
           SIGIL CONTACT
        --------------------------------- */

        if (
            distance <
            minimumDistance + CONTACT_RANGE
        ) {

            /*
                Set glow to full brightness
                whenever contact happens.

                It will then slowly fade
                instead of instantly disappearing.
            */

            object.glow = 1;


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


            /*
                Stronger push when actual
                physical contact happens.
            */

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
    }


    /*
        LOOP 2
        -------------------------------
        Block → block

        Every block checks every other
        block for collision.
    */

    for (
        let i = 0;
        i < objects.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < objects.length;
            j++
        ) {

            const a = objects[i];
            const b = objects[j];


            const dx =
                b.x - a.x;

            const dy =
                b.y - a.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            /*
                Each block is treated as
                a circle for collision math.
            */

            const minimumDistance =
                (a.size / 2) +
                (b.size / 2);


            if (
                distance <
                minimumDistance
            ) {

                /*
                    Make both blocks glow.
                */

                a.glow = 1;
                b.glow = 1;


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


                const pushX =
                    Math.cos(angle) *
                    BLOCK_PUSH;

                const pushY =
                    Math.sin(angle) *
                    BLOCK_PUSH;


                /*
                    Push A away from B.
                */

                a.vx -= pushX;
                a.vy -= pushY;


                /*
                    Push B away from A.
                */

                b.vx += pushX;
                b.vy += pushY;


                /*
                    Separate overlapping blocks.

                    This prevents two blocks from
                    becoming permanently stuck
                    inside each other.
                */

                const overlap =
                    minimumDistance -
                    distance;


                if (distance > 0.001) {

                    const separationX =
                        Math.cos(angle) *
                        overlap *
                        0.5;

                    const separationY =
                        Math.sin(angle) *
                        overlap *
                        0.5;


                    a.x -= separationX;
                    a.y -= separationY;


                    b.x += separationX;
                    b.y += separationY;
                }

            }

        }

    }


    /*
        LOOP 3
        -------------------------------
        Apply movement and fade glow.
    */

    for (const object of objects) {

        /* ---------------------------------
           Movement
        --------------------------------- */

        object.x += object.vx;
        object.y += object.vy;


        /* ---------------------------------
           Friction
        --------------------------------- */

        object.vx *= 0.94;
        object.vy *= 0.94;


        /* ---------------------------------
           SLOW GLOW FADE
        ---------------------------------

           0.92 means the glow decreases
           gradually every frame.

           Lower number = faster fade.
           Higher number = slower fade.
        */

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


        ctx.lineWidth = 1;


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
       UPDATE
    ------------------------------------- */

    updateSigil();

    updateObjects();

    updateTrail();


    /* -------------------------------------
       TRAIL
    ------------------------------------- */

    drawTrail();


    /* -------------------------------------
       OBJECTS
    ------------------------------------- */

    for (const object of objects) {

        drawObject(object);

    }


    /* -------------------------------------
       SIGIL
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
       VIGNETTE
    ------------------------------------- */

    drawVignette();


    requestAnimationFrame(draw);
}


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

        initializeObjects();

        initializeSigil();

    }
);


/* =========================================
   START
========================================= */

resizeCanvas();

initializeObjects();

initializeSigil();

draw();