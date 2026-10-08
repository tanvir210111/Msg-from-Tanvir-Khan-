const noMessages = [
    "Are you sure?",
    "Really sure??",
    "Think again 😭",
    "Pleaseee 🥺",
    "You can't escape 😭"
];

let noClickCount = 0;
let isPositionFixed = false;

function handleNoClick() {
    const noWrapper = document.getElementById('noWrapper');
    const noMessage = document.getElementById('noMessage');
    const yesButton = document.querySelector('.yes-button');

    // 1. Maintain existing Yes button behavior (grows on each No click)
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    // 2. Message progression on each No click
    noClickCount++;
    const msgIndex = Math.min(noClickCount - 1, noMessages.length - 1);
    noMessage.textContent = noMessages[msgIndex];
    noMessage.style.display = 'block';

    // 3. Switch to fixed positioning if not already fixed, locking starting position for smooth animation
    if (!isPositionFixed) {
        const initialRect = noWrapper.getBoundingClientRect();
        noWrapper.style.position = 'fixed';
        noWrapper.style.left = `${initialRect.left}px`;
        noWrapper.style.top = `${initialRect.top}px`;
        // Force reflow before applying transition
        void noWrapper.offsetHeight;
        isPositionFixed = true;
    }

    // 4. Calculate safe random viewport coordinates using wrapper's actual rendered size
    const wrapperRect = noWrapper.getBoundingClientRect();
    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const margin = 16;
    const minLeft = margin;
    const minTop = margin;
    const maxLeft = Math.max(minLeft, viewportWidth - wrapperWidth - margin);
    const maxTop = Math.max(minTop, viewportHeight - wrapperHeight - margin);

    const currentLeft = parseFloat(noWrapper.style.left) || 0;
    const currentTop = parseFloat(noWrapper.style.top) || 0;

    let newLeft = currentLeft;
    let newTop = currentTop;

    // Pick new coordinates, making sure there is a noticeable jump if space permits
    for (let i = 0; i < 10; i++) {
        const candidateLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        const candidateTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

        const distance = Math.hypot(candidateLeft - currentLeft, candidateTop - currentTop);
        newLeft = candidateLeft;
        newTop = candidateTop;

        if (distance > 80 || (maxLeft - minLeft < 100 && maxTop - minTop < 100)) {
            break;
        }
    }

    noWrapper.style.left = `${newLeft}px`;
    noWrapper.style.top = `${newTop}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}