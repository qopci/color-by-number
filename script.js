





"use strict";

// Pixel Colors — complete game logic
// Supports free coloring, drag painting, erasing, and saved progress.

const SIZE = 24;
const STORAGE_KEY = "pixel-colors-progress-v1";
const FAVORITES_KEY = "pixel-colors-favorites-v1";

const PALETTE = [
    { id: 1, name: "White", color: "#fbfbff" },
    { id: 2, name: "Pink", color: "#f4b4ca" },
    { id: 3, name: "Gray", color: "#a2a4b8" },
    { id: 4, name: "Light Gray", color: "#d0d0ed" },
    { id: 5, name: "Dark Gray", color: "#686b82" },
    { id: 6, name: "Black", color: "#292d40" }
];

const $ = selector => document.querySelector(selector);

function readJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

// --------------------------------------------------
// PIXEL ART GENERATION
// --------------------------------------------------

function blankGrid() {
    return Array(SIZE * SIZE).fill(4);
}

function paintRect(grid, color, row1, col1, row2, col2) {
    for (let row = row1; row <= row2; row++) {
        for (let col = col1; col <= col2; col++) {
            if (row >= 0 && row < SIZE && col >= 0 && col < SIZE) {
                grid[row * SIZE + col] = color;
            }
        }
    }
}

function paintEllipse(grid, color, centerRow, centerCol, radiusRow, radiusCol) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const distance =
                ((row - centerRow) / radiusRow) ** 2 +
                ((col - centerCol) / radiusCol) ** 2;

            if (distance <= 1) {
                grid[row * SIZE + col] = color;
            }
        }
    }
}

function makeCat() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 12, 12, 8, 8);
    paintRect(grid, 3, 4, 5, 7, 8);
    paintRect(grid, 3, 4, 15, 7, 18);
    paintRect(grid, 5, 4, 5, 5, 7);
    paintRect(grid, 5, 4, 16, 5, 18);
    paintRect(grid, 2, 5, 6, 6, 6);
    paintRect(grid, 2, 5, 17, 6, 17);

    paintEllipse(grid, 4, 12, 12, 6, 6);
    paintRect(grid, 5, 7, 10, 8, 10);
    paintRect(grid, 5, 7, 13, 8, 13);
    paintRect(grid, 5, 9, 11, 9, 12);

    paintEllipse(grid, 1, 14, 12, 4, 5);
    paintEllipse(grid, 1, 15, 9, 2, 2);
    paintEllipse(grid, 1, 15, 15, 2, 2);
    paintEllipse(grid, 2, 15, 7, 1.4, 2);
    paintEllipse(grid, 2, 15, 17, 1.4, 2);

    paintRect(grid, 6, 11, 8, 12, 8);
    paintRect(grid, 6, 11, 15, 12, 15);
    paintRect(grid, 2, 14, 11, 14, 12);
    paintRect(grid, 6, 15, 11, 15, 12);
    paintRect(grid, 6, 16, 11, 16, 12);

    paintRect(grid, 5, 14, 5, 14, 8);
    paintRect(grid, 5, 14, 15, 14, 18);
    paintRect(grid, 3, 18, 8, 19, 15);

    return grid;
}

function makeFlower() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 10, 12, 5, 5);
    paintEllipse(grid, 2, 7, 12, 3, 3);
    paintEllipse(grid, 2, 10, 8, 3, 3);
    paintEllipse(grid, 2, 13, 12, 3, 3);
    paintEllipse(grid, 2, 10, 16, 3, 3);
    paintEllipse(grid, 2, 7, 15, 3, 3);
    paintEllipse(grid, 5, 10, 12, 2, 2);

    paintRect(grid, 3, 13, 11, 21, 12);
    paintEllipse(grid, 3, 18, 10, 2, 3);
    paintEllipse(grid, 3, 18, 14, 2, 3);
    paintRect(grid, 6, 19, 11, 19, 12);
    paintRect(grid, 6, 19, 14, 19, 15);

    return grid;
}

function makeBunny() {
    const grid = blankGrid();

    paintEllipse(grid, 1, 15, 12, 6, 6);
    paintEllipse(grid, 1, 6, 9, 5, 2);
    paintEllipse(grid, 1, 6, 15, 5, 2);
    paintEllipse(grid, 2, 6, 9, 4, 1);
    paintEllipse(grid, 2, 6, 15, 4, 1);

    paintEllipse(grid, 2, 14, 8, 1, 2);
    paintEllipse(grid, 2, 14, 16, 1, 2);
    paintRect(grid, 6, 13, 9, 14, 9);
    paintRect(grid, 6, 13, 14, 14, 14);
    paintRect(grid, 2, 15, 11, 15, 12);
    paintRect(grid, 6, 16, 11, 16, 12);

    return grid;
}

function makeFrog() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 13, 12, 8, 7);
    paintEllipse(grid, 3, 7, 7, 3, 3);
    paintEllipse(grid, 3, 7, 17, 3, 3);
    paintEllipse(grid, 1, 7, 7, 1, 1);
    paintEllipse(grid, 1, 7, 17, 1, 1);

    paintRect(grid, 6, 13, 8, 13, 8);
    paintRect(grid, 6, 13, 15, 13, 15);
    paintRect(grid, 1, 15, 10, 15, 13);
    paintRect(grid, 1, 16, 11, 16, 12);
    paintEllipse(grid, 2, 15, 6, 1, 2);
    paintEllipse(grid, 2, 15, 18, 1, 2);

    return grid;
}

function makeMushroom() {
    const grid = blankGrid();

    paintEllipse(grid, 2, 9, 12, 5, 7);
    paintRect(grid, 2, 8, 7, 10, 16);
    paintRect(grid, 1, 12, 9, 18, 14);

    paintRect(grid, 1, 15, 11, 16, 13);
    paintRect(grid, 6, 13, 11, 14, 11);
    paintRect(grid, 6, 13, 13, 14, 13);

    paintEllipse(grid, 3, 19, 7, 1, 2);
    paintEllipse(grid, 3, 19, 17, 1, 2);
    paintRect(grid, 3, 20, 7, 20, 16);

    return grid;
}

function makeButterfly() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 8, 8, 5, 5);
    paintEllipse(grid, 3, 8, 16, 5, 5);
    paintEllipse(grid, 2, 15, 8, 4, 4);
    paintEllipse(grid, 2, 15, 16, 4, 4);

    paintRect(grid, 5, 7, 11, 16, 12);
    paintRect(grid, 6, 6, 10, 6, 9);
    paintRect(grid, 6, 6, 14, 6, 15);

    paintRect(grid, 1, 7, 7, 8, 8);
    paintRect(grid, 1, 7, 15, 8, 16);
    paintRect(grid, 4, 14, 6, 14, 7);
    paintRect(grid, 4, 14, 16, 14, 17);

    return grid;
}

function makeCherries() {
    const grid = blankGrid();

    paintRect(grid, 3, 5, 10, 7, 12);
    paintRect(grid, 3, 6, 8, 8, 13);
    paintEllipse(grid, 2, 17, 8, 4, 4);
    paintEllipse(grid, 2, 17, 16, 4, 4);

    paintRect(grid, 1, 16, 6, 16, 7);
    paintRect(grid, 1, 16, 15, 16, 16);
    paintEllipse(grid, 3, 7, 5, 2, 3);

    return grid;
}

function makeMountain() {
    const grid = blankGrid();

    for (let row = 5; row < 21; row++) {
        const halfWidth = Math.floor((row - 5) * 0.85);

        for (let col = 12 - halfWidth; col <= 12 + halfWidth; col++) {
            if (col < 0 || col >= SIZE) continue;

            let color = 3;
            if (row < 10) color = 1;
            else if (row < 14) color = 4;
            else if (row > 18) color = 5;

            grid[row * SIZE + col] = color;
        }
    }

    paintRect(grid, 1, 5, 11, 7, 13);
    paintRect(grid, 1, 7, 10, 8, 14);
    paintRect(grid, 4, 8, 9, 9, 15);
    paintRect(grid, 3, 18, 2, 22, 21);

    return grid;
}

const ARTWORKS = [
    { id: "cat", name: "Cute Cat", subtitle: "A little pixel friend", make: makeCat, bg: "#eeeaff" },
    { id: "flower", name: "Sunflower", subtitle: "A sunny little bloom", make: makeFlower, bg: "#fff4d9" },
    { id: "bunny", name: "Sweet Bunny", subtitle: "Soft and fluffy", make: makeBunny, bg: "#fbe6f2" },
    { id: "mushroom", name: "Mushroom House", subtitle: "A tiny forest home", make: makeMushroom, bg: "#ffe9e0" },
    { id: "frog", name: "Happy Frog", subtitle: "A pond-side pal", make: makeFrog, bg: "#e0f6df" },
    { id: "butterfly", name: "Butterfly", subtitle: "Fluttering by", make: makeButterfly, bg: "#e4edff" },
    { id: "cherries", name: "Cherries", subtitle: "A sweet pair", make: makeCherries, bg: "#ffe4ec" },
    { id: "mountain", name: "Snowy Mountain", subtitle: "A little adventure", make: makeMountain, bg: "#e4f5ff" }
];

// --------------------------------------------------
// DOM REFERENCES
// --------------------------------------------------

const gallery = $("#gallery");
const gridElement = $("#pixel-grid");
const paletteList = $("#palette-list");
const progressLabel = $("#progress-label");
const progressBar = $("#progress-bar");
const toast = $("#toast");

// --------------------------------------------------
// GAME STATE
// --------------------------------------------------

let currentArtwork = ARTWORKS[0];
let targetGrid = currentArtwork.make();

// Map: pixel index -> the color the player actually used.
let coloredCells = new Map();

let selectedColor = 1;
let activeTool = "color";
let galleryPage = 0;
let galleryFilter = "all";
let toastTimeout;

let favorites = new Set(readJSON(FAVORITES_KEY, []));
let savedProgress = readJSON(STORAGE_KEY, {});

// Drag state: listeners live on the grid, not individual pixels.
let isPainting = false;
let activePointerId = null;
let lastPaintedIndex = null;
let lastDragPoint = null;

// --------------------------------------------------
// SAVE AND LOAD
// --------------------------------------------------

function saveProgress() {
    savedProgress[currentArtwork.id] = [...coloredCells.entries()];

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch (error) {
        console.warn("Progress could not be saved:", error);
    }
}

function loadSavedPixels(artwork) {
    const saved = savedProgress[artwork.id];
    const result = new Map();

    if (!Array.isArray(saved)) return result;

    for (const entry of saved) {
        // New format: [pixelIndex, chosenColorId]
        if (
            Array.isArray(entry) &&
            Number.isInteger(entry[0]) &&
            Number.isInteger(entry[1]) &&
            entry[0] >= 0 &&
            entry[0] < SIZE * SIZE &&
            PALETTE.some(color => color.id === entry[1])
        ) {
            result.set(entry[0], entry[1]);
        } else if (
            // Older format: a list of pixel indices.
            Number.isInteger(entry) &&
            entry >= 0 &&
            entry < SIZE * SIZE
        ) {
            result.set(entry, artwork.make()[entry]);
        }
    }

    return result;
}

function loadArtwork(artwork) {
    stopPainting();

    currentArtwork = artwork;
    targetGrid = artwork.make();
    coloredCells = loadSavedPixels(artwork);

    selectedColor = findFirstUnfinishedColor() ?? 1;
    activeTool = "color";

    $("#puzzle-title").textContent = artwork.name;
    $("#puzzle-subtitle").textContent = artwork.subtitle;
    $("#completion-banner").hidden = true;
    $("#eraser-button").classList.remove("active-tool");
    $("#fill-button").classList.add("primary");

    renderGallery();
    renderPalette();
    renderGrid();
    updateProgress();
    updateCompletion();

    $("#status-message").textContent =
        "Choose any color, then click or drag across the squares!";
}

function findFirstUnfinishedColor() {
    for (const color of PALETTE) {
        const hasRemainingPixel = targetGrid.some(
            (correctColor, index) =>
                correctColor === color.id && coloredCells.get(index) !== correctColor
        );

        if (hasRemainingPixel) return color.id;
    }

    return null;
}

// --------------------------------------------------
// GALLERY AND FAVORITES
// --------------------------------------------------

function renderGallery() {
    gallery.innerHTML = "";

    const items = galleryFilter === "favorites"
        ? ARTWORKS.filter(artwork => favorites.has(artwork.id))
        : ARTWORKS;

    const pageSize = 8;
    const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
    galleryPage = Math.min(galleryPage, pageCount - 1);

    const pageItems = items.slice(
        galleryPage * pageSize,
        (galleryPage + 1) * pageSize
    );

    pageItems.forEach(artwork => {
        const card = document.createElement("button");
        card.type = "button";
        card.className =
            `art-card${artwork.id === currentArtwork.id ? " selected" : ""}`;
        card.setAttribute("aria-label", `Choose ${artwork.name}`);

        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        drawPreview(canvas, artwork);

        const name = document.createElement("span");
        name.className = "art-name";
        name.textContent = artwork.name;

        const favoriteButton = document.createElement("span");
        favoriteButton.className =
            `favorite-toggle${favorites.has(artwork.id) ? " is-favorite" : ""}`;
        favoriteButton.textContent = favorites.has(artwork.id) ? "♥" : "♡";
        favoriteButton.setAttribute("role", "button");
        favoriteButton.setAttribute(
            "aria-label",
            favorites.has(artwork.id) ? "Remove favorite" : "Add favorite"
        );

        favoriteButton.addEventListener("click", event => {
            event.stopPropagation();

            if (favorites.has(artwork.id)) {
                favorites.delete(artwork.id);
            } else {
                favorites.add(artwork.id);
            }

            saveProgress();
            renderGallery();
        });

        card.append(canvas, name, favoriteButton);
        card.addEventListener("click", () => loadArtwork(artwork));
        gallery.append(card);
    });

    $("#page-count").textContent = `${galleryPage + 1} / ${pageCount}`;
    $("#prev-page").disabled = galleryPage === 0;
    $("#next-page").disabled = galleryPage >= pageCount - 1;
}

function drawPreview(canvas, artwork) {
    const context = canvas.getContext("2d");
    const data = artwork.make();

    context.fillStyle = artwork.bg;
    context.fillRect(0, 0, SIZE, SIZE);

    data.forEach((colorId, index) => {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        const color = PALETTE.find(item => item.id === colorId);

        context.fillStyle = color ? color.color : "#ffffff";
        context.fillRect(col, row, 1, 1);
    });
}

// --------------------------------------------------
// COLOR PALETTE
// --------------------------------------------------

function renderPalette() {
    paletteList.innerHTML = "";

    PALETTE.forEach(color => {
        const remaining = targetGrid.reduce((total, correctColor, index) => {
            return total + (
                correctColor === color.id &&
                    coloredCells.get(index) !== correctColor ? 1 : 0
            );
        }, 0);

        const button = document.createElement("button");
        button.type = "button";
        button.className =
            `palette-item${selectedColor === color.id && activeTool === "color" ? " active" : ""}`;
        button.setAttribute(
            "aria-pressed",
            String(selectedColor === color.id && activeTool === "color")
        );

        const number = document.createElement("span");
        number.className = "palette-number";
        number.textContent = color.id;

        const swatch = document.createElement("span");
        swatch.className = "swatch";
        swatch.style.backgroundColor = color.color;

        const details = document.createElement("span");

        const name = document.createElement("span");
        name.className = "palette-name";
        name.textContent = color.name;

        const count = document.createElement("span");
        count.className = "palette-count";
        count.textContent = `${remaining} correct squares left`;

        details.append(name, count);
        button.append(number, swatch, details);

        button.addEventListener("click", () => {
            selectedColor = color.id;
            activeTool = "color";

            $("#eraser-button").classList.remove("active-tool");
            $("#fill-button").classList.add("primary");

            renderPalette();
            $("#status-message").textContent =
                `Color ${color.id}: ${color.name}. Paint any square you like.`;
        });

        paletteList.append(button);
    });
}

// --------------------------------------------------
// PIXEL GRID
// --------------------------------------------------

function renderGrid() {
    gridElement.innerHTML = "";
    gridElement.style.gridTemplateColumns =
        `repeat(${SIZE}, minmax(0, 1fr))`;

    const fragment = document.createDocumentFragment();

    targetGrid.forEach((correctColor, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pixel";
        button.setAttribute("role", "gridcell");
        button.dataset.index = index;

        updatePixelButton(index, button);
        fragment.append(button);
    });

    gridElement.append(fragment);
}

function updatePixelButton(index, suppliedButton = null) {
    const button = suppliedButton || gridElement.children[index];
    if (!button) return;

    const chosenColor = coloredCells.get(index);
    const isColored = chosenColor !== undefined;
    const color = PALETTE.find(item => item.id === chosenColor);

    button.classList.toggle("colored", isColored);
    button.classList.toggle(
        "correct-pixel",
        isColored && chosenColor === targetGrid[index]
    );

    button.style.setProperty(
        "--pixel-bg",
        isColored && color ? color.color : "#f1f0ff"
    );

    button.textContent = isColored ? "" : targetGrid[index];

    button.setAttribute(
        "aria-label",
        isColored
            ? `Pixel ${index + 1}, painted ${color?.name || "color"}${chosenColor === targetGrid[index] ? ", correct" : ", incorrect"}`
            : `Pixel ${index + 1}, target color ${targetGrid[index]}`
    );
}

function colorPixel(index) {
    if (!Number.isInteger(index) || index < 0 || index >= targetGrid.length) {
        return;
    }

    const oldColor = coloredCells.get(index);

    if (activeTool === "eraser") {
        if (oldColor === undefined) return;

        coloredCells.delete(index);
    } else {
        // Free coloring: any selected color can be used on any square.
        if (oldColor === selectedColor) return;

        coloredCells.set(index, selectedColor);
    }

    updatePixelButton(index);
    afterColorChange();
}

// --------------------------------------------------
// RELIABLE CLICK-AND-DRAG PAINTING
// --------------------------------------------------

// Use pointer events so mouse, pen, and touch can work.
// Event delegation means re-rendering pixels won't add duplicate listeners.

function getPixelFromPoint(x, y) {
    const element = document.elementFromPoint(x, y);
    const pixel = element?.closest(".pixel");

    if (!pixel || !gridElement.contains(pixel)) return null;
    return pixel;
}

function paintAtPoint(x, y) {
    const pixel = getPixelFromPoint(x, y);
    if (!pixel) return;

    const index = Number(pixel.dataset.index);
    if (index === lastPaintedIndex) return;

    lastPaintedIndex = index;
    colorPixel(index);
}

function stopPainting() {
    isPainting = false;
    activePointerId = null;
    lastPaintedIndex = null;
    lastDragPoint = null;
}

gridElement.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;

    const pixel = event.target.closest(".pixel");
    if (!pixel || !gridElement.contains(pixel)) return;

    event.preventDefault();

    isPainting = true;
    activePointerId = event.pointerId;
    lastPaintedIndex = null;
    lastDragPoint = { x: event.clientX, y: event.clientY };

    try {
        gridElement.setPointerCapture(event.pointerId);
    } catch {
        // Pointer capture may not be available in every browser context.
    }

    paintAtPoint(event.clientX, event.clientY);
});

gridElement.addEventListener("pointermove", event => {
    if (!isPainting || event.pointerId !== activePointerId) return;

    event.preventDefault();

    const current = { x: event.clientX, y: event.clientY };

    // Sample between pointer positions so fast drags don't skip small squares.
    if (lastDragPoint) {
        const dx = current.x - lastDragPoint.x;
        const dy = current.y - lastDragPoint.y;
        const distance = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(distance / 4));

        for (let step = 1; step <= steps; step++) {
            const ratio = step / steps;
            paintAtPoint(
                lastDragPoint.x + dx * ratio,
                lastDragPoint.y + dy * ratio
            );
        }
    } else {
        paintAtPoint(current.x, current.y);
    }

    lastDragPoint = current;
});

gridElement.addEventListener("pointerup", event => {
    if (event.pointerId === activePointerId) stopPainting();
});

gridElement.addEventListener("pointercancel", stopPainting);
gridElement.addEventListener("lostpointercapture", stopPainting);

window.addEventListener("pointerup", stopPainting);
window.addEventListener("blur", stopPainting);

// Prevent the browser's default touch scrolling while painting.
gridElement.style.touchAction = "none";

// --------------------------------------------------
// PROGRESS AND COMPLETION
// --------------------------------------------------

function afterColorChange() {
    saveProgress();
    updateProgress();
    renderPalette();
    updateCompletion();
}

function updateProgress() {
    const total = targetGrid.length;
    const colored = coloredCells.size;

    progressLabel.textContent = `${colored} / ${total}`;
    progressBar.style.width = `${(colored / total) * 100}%`;
}

function updateCompletion() {
    const isComplete = targetGrid.every(
        (correctColor, index) => coloredCells.get(index) === correctColor
    );

    $("#completion-banner").hidden = !isComplete;

    if (isComplete) {
        $("#status-message").textContent =
            "You did it! Every pixel matches the picture!";
        showToast("Picture complete! You're a pixel artist!");
    } else {
        const incorrect = [...coloredCells.entries()].filter(
            ([index, chosenColor]) => chosenColor !== targetGrid[index]
        ).length;

        $("#status-message").textContent = incorrect
            ? `${incorrect} square${incorrect === 1 ? "" : "s"} ${incorrect === 1 ? "needs" : "need"} a different color to complete the picture.`
            : "Keep coloring! You can choose any color for any square.";
    }
}

// --------------------------------------------------
// FILL, ERASER, AND RESET
// --------------------------------------------------

function fillSelectedColor() {
    let changed = 0;

    targetGrid.forEach((correctColor, index) => {
        if (correctColor === selectedColor &&
            coloredCells.get(index) !== selectedColor) {
            coloredCells.set(index, selectedColor);
            changed++;
        }
    });

    if (!changed) {
        showToast("All target squares for this color are already filled.");
        return;
    }

    saveProgress();
    renderGrid();
    renderPalette();
    updateProgress();
    updateCompletion();

    showToast(`Filled ${changed} square${changed === 1 ? "" : "s"} with ${PALETTE[selectedColor - 1].name}.`);
}

function resetArtwork() {
    if (coloredCells.size === 0) {
        showToast("This picture is already blank.");
        return;
    }

    stopPainting();
    coloredCells.clear();
    delete savedProgress[currentArtwork.id];

    saveProgress();
    renderGrid();
    renderPalette();
    updateProgress();

    $("#completion-banner").hidden = true;
    $("#status-message").textContent =
        "Fresh canvas! Start coloring whenever you're ready.";

    showToast("Picture reset. A fresh start!");
}

function toggleEraser() {
    stopPainting();

    activeTool = activeTool === "eraser" ? "color" : "eraser";

    $("#eraser-button").classList.toggle(
        "active-tool",
        activeTool === "eraser"
    );
    $("#fill-button").classList.toggle(
        "primary",
        activeTool !== "eraser"
    );

    renderPalette();

    $("#status-message").textContent = activeTool === "eraser"
        ? "Eraser selected. Click or drag over squares to erase them."
        : "Choose a color, then click or drag to paint.";

    showToast(activeTool === "eraser" ? "Eraser ready!" : "Coloring tool ready!");
}

// --------------------------------------------------
// HINTS AND TOASTS
// --------------------------------------------------

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

function showHint() {
    let index = targetGrid.findIndex(
        (correctColor, i) =>
            correctColor === selectedColor &&
            coloredCells.get(i) !== correctColor
    );

    if (index === -1) {
        const nextColor = findFirstUnfinishedColor();

        if (nextColor === null) {
            showToast("You finished this picture!");
            return;
        }

        selectedColor = nextColor;
        activeTool = "color";

        $("#eraser-button").classList.remove("active-tool");
        $("#fill-button").classList.add("primary");
        renderPalette();

        index = targetGrid.findIndex(
            (correctColor, i) =>
                correctColor === selectedColor &&
                coloredCells.get(i) !== correctColor
        );
    }

    const pixel = gridElement.children[index];

    if (pixel) {
        pixel.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
        });

        pixel.classList.remove("correct-flash");
        void pixel.offsetWidth;
        pixel.classList.add("correct-flash");
    }

    showToast(`Hint: look for a square whose target number is ${selectedColor}.`);
}

// --------------------------------------------------
// BUTTON EVENTS
// --------------------------------------------------

$("#fill-button").addEventListener("click", () => {
    activeTool = "color";
    $("#eraser-button").classList.remove("active-tool");
    $("#fill-button").classList.add("primary");
    renderPalette();
    fillSelectedColor();
});

$("#eraser-button").addEventListener("click", toggleEraser);
$("#reset-button").addEventListener("click", resetArtwork);
$("#hint-button").addEventListener("click", showHint);

$("#keep-coloring").addEventListener("click", () => {
    $("#completion-banner").hidden = true;
});

$("#prev-page").addEventListener("click", () => {
    galleryPage = Math.max(0, galleryPage - 1);
    renderGallery();
});

$("#next-page").addEventListener("click", () => {
    const items = galleryFilter === "favorites"
        ? ARTWORKS.filter(artwork => favorites.has(artwork.id))
        : ARTWORKS;

    const lastPage = Math.max(0, Math.ceil(items.length / 8) - 1);
    galleryPage = Math.min(lastPage, galleryPage + 1);
    renderGallery();
});

$("#back-to-gallery").addEventListener("click", () => {
    $(".gallery-panel").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    showToast("Choose another picture from the gallery.");
});

document.querySelectorAll(".filter-tab").forEach(button => {
    button.addEventListener("click", () => {
        galleryFilter = button.dataset.filter;
        galleryPage = 0;

        document.querySelectorAll(".filter-tab").forEach(tab => {
            tab.classList.toggle("active", tab === button);
        });

        renderGallery();

        if (galleryFilter === "favorites" && favorites.size === 0) {
            showToast("Tap the heart on a picture to favorite it.");
        }
    });
});

// --------------------------------------------------
// KEYBOARD SHORTCUTS
// --------------------------------------------------

document.addEventListener("keydown", event => {
    // Ignore shortcuts while typing into an input.
    if (event.target.matches("input, textarea, select")) return;

    if (/^[1-6]$/.test(event.key)) {
        selectedColor = Number(event.key);
        activeTool = "color";

        $("#eraser-button").classList.remove("active-tool");
        $("#fill-button").classList.add("primary");
        renderPalette();
    }

    if (event.key === "Escape" && activeTool === "eraser") {
        activeTool = "color";
        $("#eraser-button").classList.remove("active-tool");
        $("#fill-button").classList.add("primary");
        renderPalette();
    }
});

// --------------------------------------------------
// START GAME
// --------------------------------------------------

loadArtwork(currentArtwork);
