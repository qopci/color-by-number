"use strict";

const SIZE = 24;
const PAGE_SIZE = 8;
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
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

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

// --------------------------------------------------
// ARTWORKS
// --------------------------------------------------

function makeCat() {
    const grid = blankGrid();

    paintEllipse(grid, 5, 13, 12, 8, 8);
    paintRect(grid, 5, 5, 5, 8, 8);
    paintRect(grid, 5, 5, 15, 8, 18);
    paintRect(grid, 2, 6, 6, 7, 7);
    paintRect(grid, 2, 6, 16, 7, 17);

    paintEllipse(grid, 1, 13, 12, 5, 6);
    paintRect(grid, 6, 10, 9, 10, 9);
    paintRect(grid, 6, 10, 14, 10, 14);
    paintRect(grid, 2, 14, 11, 14, 12);
    paintRect(grid, 6, 15, 11, 15, 12);
    paintRect(grid, 6, 16, 11, 16, 12);

    paintEllipse(grid, 2, 15, 8, 1, 2);
    paintEllipse(grid, 2, 15, 16, 1, 2);
    paintRect(grid, 3, 18, 8, 19, 15);

    return grid;
}

function makeFlower() {
    const grid = blankGrid();

    paintEllipse(grid, 2, 8, 12, 3, 3);
    paintEllipse(grid, 2, 11, 8, 3, 3);
    paintEllipse(grid, 2, 14, 12, 3, 3);
    paintEllipse(grid, 2, 11, 16, 3, 3);
    paintEllipse(grid, 2, 11, 12, 2, 2);

    paintRect(grid, 3, 13, 11, 21, 12);
    paintEllipse(grid, 3, 17, 9, 2, 3);
    paintEllipse(grid, 3, 18, 15, 2, 3);
    paintRect(grid, 6, 18, 11, 18, 12);
    paintRect(grid, 6, 19, 14, 19, 15);

    return grid;
}

function makeBunny() {
    const grid = blankGrid();

    paintEllipse(grid, 5, 15, 13, 6, 6);
    paintEllipse(grid, 5, 6, 9, 5, 2);
    paintEllipse(grid, 5, 6, 15, 5, 2);
    paintEllipse(grid, 2, 6, 9, 4, 1);
    paintEllipse(grid, 2, 6, 15, 4, 1);

    paintEllipse(grid, 1, 14, 8, 1, 2);
    paintEllipse(grid, 1, 14, 16, 1, 2);
    paintRect(grid, 6, 13, 9, 13, 9);
    paintRect(grid, 6, 13, 15, 13, 15);
    paintRect(grid, 2, 15, 12, 15, 12);
    paintRect(grid, 6, 16, 11, 16, 12);

    return grid;
}

function makeMushroom() {
    const grid = blankGrid();

    paintEllipse(grid, 2, 9, 10, 5, 7);
    paintRect(grid, 2, 8, 7, 10, 14);
    paintRect(grid, 1, 12, 9, 18, 12);
    paintEllipse(grid, 1, 14, 10, 1, 1);
    paintEllipse(grid, 1, 15, 13, 1, 1);
    paintEllipse(grid, 1, 9, 7, 1, 1);
    paintEllipse(grid, 1, 7, 10, 1, 1);
    paintEllipse(grid, 1, 9, 15, 1, 1);
    paintRect(grid, 3, 19, 6, 20, 17);

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

function makeButterfly() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 8, 8, 5, 5);
    paintEllipse(grid, 3, 8, 16, 5, 5);
    paintEllipse(grid, 2, 15, 8, 4, 4);
    paintEllipse(grid, 2, 15, 16, 4, 4);
    paintRect(grid, 5, 7, 11, 16, 12);
    paintRect(grid, 6, 6, 10, 6, 9);
    paintRect(grid, 6, 6, 14, 6, 15);

    paintEllipse(grid, 1, 8, 8, 1, 1);
    paintEllipse(grid, 1, 8, 16, 1, 1);
    paintEllipse(grid, 1, 15, 8, 1, 1);
    paintEllipse(grid, 1, 15, 16, 1, 1);

    return grid;
}


function makeCherries() {
    const grid = blankGrid();

    paintEllipse(grid, 3, 7, 5, 2, 3);
    paintRect(grid, 5, 7, 7, 8, 8);

    paintRect(grid, 3, 8, 9, 9, 10);
    paintRect(grid, 3, 9, 10, 10, 11);
    paintRect(grid, 3, 10, 11, 11, 12);

    paintRect(grid, 3, 11, 9, 13, 10);
    paintRect(grid, 3, 13, 8, 15, 9);

    paintRect(grid, 3, 11, 12, 13, 13);
    paintRect(grid, 3, 13, 14, 15, 15);

    paintEllipse(grid, 2, 16, 8, 4, 4);
    paintEllipse(grid, 2, 16, 16, 4, 4);

    paintRect(grid, 1, 15, 6, 15, 7);
    paintRect(grid, 1, 15, 14, 15, 15);

    return grid;
}


function makeMountain() {
    const grid = blankGrid();

    // Main mountain silhouette
    for (let row = 5; row <= 21; row++) {
        const halfWidth = Math.floor((row - 5) * 0.78);
        const left = 12 - halfWidth;
        const right = 12 + halfWidth;

        for (let col = left; col <= right; col++) {
            if (col < 0 || col >= SIZE) {
                continue;
            }

            let color = row >= 18 ? 5 : 3;

            // Dark outline along the mountain's outer edges
            if (col === left || col === right) {
                color = 6;
            }

            grid[row * SIZE + col] = color;
        }
    }

    paintRect(grid, 1, 5, 11, 6, 13);
    paintRect(grid, 1, 7, 10, 8, 14);
    paintRect(grid, 1, 9, 9, 10, 15);
    paintRect(grid, 1, 11, 8, 12, 16);

    paintRect(grid, 6, 7, 10, 7, 10);
    paintRect(grid, 6, 8, 10, 8, 11);
    paintRect(grid, 6, 9, 9, 9, 12);
    paintRect(grid, 6, 10, 9, 10, 13);
    paintRect(grid, 6, 11, 8, 11, 14);
    paintRect(grid, 6, 12, 8, 12, 15);
    paintRect(grid, 6, 13, 8, 13, 15);

    paintRect(grid, 1, 6, 12, 6, 12);
    paintRect(grid, 1, 7, 11, 7, 12);
    paintRect(grid, 1, 8, 11, 8, 13);
    paintRect(grid, 1, 9, 10, 9, 11);

    paintRect(grid, 3, 19, 2, 22, 21);

    return grid;
}

function makeHeart() {
    const grid = blankGrid();
    paintEllipse(grid, 2, 9, 8, 4, 4);
    paintEllipse(grid, 2, 9, 16, 4, 4);
    paintRect(grid, 2, 11, 7, 12, 16);
    paintRect(grid, 2, 13, 9, 14, 14);
    paintRect(grid, 2, 15, 11, 16, 12);
    paintRect(grid, 1, 9, 7, 9, 8);
    return grid;
}

function makeStar() {
    const grid = blankGrid();
    paintRect(grid, 2, 3, 11, 7, 12);
    paintRect(grid, 2, 8, 9, 10, 14);
    paintRect(grid, 2, 11, 6, 13, 17);
    paintRect(grid, 2, 14, 9, 16, 14);
    paintRect(grid, 2, 17, 11, 19, 12);
    paintRect(grid, 1, 10, 11, 11, 12);
    return grid;
}

function makeCloud() {
    const grid = blankGrid();
    paintEllipse(grid, 1, 12, 7, 4, 4);
    paintEllipse(grid, 1, 10, 12, 5, 5);
    paintEllipse(grid, 1, 12, 17, 4, 4);
    paintRect(grid, 1, 12, 7, 15, 17);
    paintRect(grid, 4, 14, 8, 14, 16);
    return grid;
}

function makeApple() {
    const grid = blankGrid();
    paintEllipse(grid, 2, 14, 9, 5, 5);
    paintEllipse(grid, 2, 14, 15, 5, 5);
    paintRect(grid, 2, 15, 7, 16, 17);
    paintRect(grid, 3, 7, 11, 10, 13);
    paintEllipse(grid, 3, 7, 15, 2, 4);
    paintEllipse(grid, 1, 11, 7, 1, 1);
    return grid;
}

function makeFish() {
    const grid = blankGrid();
    paintEllipse(grid, 3, 12, 12, 6, 8);
    paintRect(grid, 3, 10, 19, 14, 21);
    paintRect(grid, 1, 10, 6, 10, 7);
    paintRect(grid, 1, 10, 16, 10, 17);
    paintEllipse(grid, 2, 10, 11, 1, 1);
    paintRect(grid, 6, 13, 10, 13, 14);
    return grid;
}

function makeSun() {
    const grid = blankGrid();
    paintEllipse(grid, 2, 12, 12, 5, 5);
    paintRect(grid, 3, 3, 11, 6, 12);
    paintRect(grid, 3, 18, 11, 21, 12);
    paintRect(grid, 3, 10, 2, 13, 5);
    paintRect(grid, 3, 10, 19, 13, 22);
    paintRect(grid, 3, 6, 6, 7, 7);
    paintRect(grid, 3, 6, 16, 7, 17);
    paintRect(grid, 3, 17, 6, 18, 7);
    paintRect(grid, 3, 17, 16, 18, 17);
    paintEllipse(grid, 1, 11, 10, 1, 1);
    paintEllipse(grid, 1, 11, 14, 1, 1);
    return grid;
}

function makeHouse() {
    const grid = blankGrid();
    paintRect(grid, 3, 10, 5, 19, 18);
    paintRect(grid, 2, 5, 10, 9, 14);
    paintRect(grid, 2, 6, 8, 8, 16);
    paintRect(grid, 4, 14, 10, 17, 13);
    paintRect(grid, 1, 12, 6, 14, 8);
    paintRect(grid, 1, 12, 16, 14, 18);
    paintRect(grid, 5, 15, 16, 17, 18);
    return grid;
}

function makeCactus() {
    const grid = blankGrid();
    paintRect(grid, 3, 5, 11, 13, 13);
    paintRect(grid, 3, 10, 7, 12, 10);
    paintRect(grid, 3, 8, 5, 10, 7);
    paintRect(grid, 3, 13, 14, 15, 16);
    paintRect(grid, 3, 11, 16, 13, 18);
    paintRect(grid, 4, 20, 7, 20, 16);
    paintRect(grid, 1, 7, 12, 8, 12);
    return grid;
}

function makeTurtle() {
    const grid = blankGrid();
    paintEllipse(grid, 3, 13, 12, 6, 5);
    paintEllipse(grid, 3, 13, 18, 3, 3);
    paintRect(grid, 4, 17, 10, 18, 10);
    paintRect(grid, 4, 17, 14, 18, 14);
    paintRect(grid, 4, 19, 11, 20, 12);
    paintRect(grid, 4, 19, 14, 20, 15);
    paintRect(grid, 1, 12, 18, 12, 18);
    paintRect(grid, 1, 13, 17, 13, 17);
    return grid;
}

function makeGhost() {
    const grid = blankGrid();
    paintEllipse(grid, 1, 10, 12, 7, 6);
    paintRect(grid, 1, 10, 6, 16, 18);
    paintRect(grid, 1, 17, 7, 17, 9);
    paintRect(grid, 1, 17, 12, 17, 14);
    paintRect(grid, 1, 17, 17, 17, 18);
    paintRect(grid, 6, 9, 10, 9, 10);
    paintRect(grid, 6, 9, 14, 9, 14);
    return grid;
}


function makePineTree() {
    const grid = blankGrid();

    paintRect(grid, 3, 2, 9, 7, 14);
    paintRect(grid, 3, 3, 7, 9, 16);

    paintRect(grid, 3, 6, 5, 12, 18);
    paintRect(grid, 3, 7, 4, 14, 19);

    paintRect(grid, 3, 10, 2, 16, 21);
    paintRect(grid, 3, 11, 1, 18, 22);

    paintRect(grid, 3, 14, 0, 20, 23);
    paintRect(grid, 3, 16, 0, 21, 23);

    paintRect(grid, 3, 4, 8, 4, 15);
    paintRect(grid, 3, 8, 5, 8, 18);
    paintRect(grid, 3, 12, 2, 12, 21);
    paintRect(grid, 3, 16, 1, 16, 22);

    paintRect(grid, 5, 19, 10, 23, 13);

    paintRect(grid, 1, 5, 10, 5, 12);
    paintRect(grid, 1, 9, 7, 9, 10);
    paintRect(grid, 1, 13, 4, 13, 7);
    paintRect(grid, 1, 17, 2, 17, 5);

    return grid;
}


function makeIceCream() {
    const grid = blankGrid();
    paintEllipse(grid, 2, 8, 12, 5, 5);
    paintEllipse(grid, 3, 13, 12, 4, 4);
    paintRect(grid, 3, 16, 10, 17, 14);
    paintRect(grid, 3, 18, 11, 16, 13);
    paintEllipse(grid, 1, 8, 10, 1, 1);
    return grid;
}

function makePizza() {
    const grid = blankGrid();

    for (let row = 5; row < 20; row++) {
        const width = row - 5;

        for (let col = 12 - width; col <= 12 + width; col++) {
            if (col >= 0 && col < SIZE) {
                grid[row * SIZE + col] = row < 8 ? 3 : 2;
            }
        }
    }

    paintEllipse(grid, 4, 10, 10, 1, 1);
    paintEllipse(grid, 4, 12, 15, 1, 1);
    paintEllipse(grid, 4, 15, 11, 1, 1);
    paintRect(grid, 3, 19, 10, 19, 14);

    return grid;
}

function makeRocket() {
    const grid = blankGrid();
    paintEllipse(grid, 1, 7, 12, 3, 3);
    paintRect(grid, 1, 8, 10, 15, 14);
    paintRect(grid, 3, 15, 8, 17, 10);
    paintRect(grid, 3, 15, 15, 17, 17);
    paintRect(grid, 2, 17, 11, 18, 13);
    paintRect(grid, 4, 19, 11, 19, 13);
    paintEllipse(grid, 3, 8, 12, 1, 1);
    return grid;
}

function makeCupcake() {
    const grid = blankGrid();
    paintEllipse(grid, 2, 8, 12, 4, 5);
    paintRect(grid, 3, 12, 8, 16, 16);
    paintRect(grid, 3, 17, 9, 18, 15);
    paintRect(grid, 4, 13, 11, 13, 11);
    paintRect(grid, 4, 15, 13, 15, 13);
    paintEllipse(grid, 1, 7, 11, 1, 1);
    return grid;
}

function makeMoon() {
    const grid = blankGrid();
    paintEllipse(grid, 3, 12, 12, 8, 7);
    paintEllipse(grid, 4, 9, 15, 7, 6);
    paintEllipse(grid, 2, 7, 7, 1, 1);
    paintEllipse(grid, 2, 17, 6, 1, 1);
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
    { id: "mountain", name: "Snowy Mountain", subtitle: "A little adventure", make: makeMountain, bg: "#e4f5ff" },
    { id: "heart", name: "Pixel Heart", subtitle: "Made with love", make: makeHeart, bg: "#fbe6f2" },
    { id: "star", name: "Shooting Star", subtitle: "A little sparkle", make: makeStar, bg: "#fff4d9" },
    { id: "cloud", name: "Fluffy Cloud", subtitle: "A soft little cloud", make: makeCloud, bg: "#e4f5ff" },
    { id: "apple", name: "Apple", subtitle: "A tasty treat", make: makeApple, bg: "#ffe4ec" },
    { id: "fish", name: "Little Fish", subtitle: "Swimming along", make: makeFish, bg: "#e4edff" },
    { id: "sun", name: "Sunny Day", subtitle: "Let the sun shine", make: makeSun, bg: "#fff4d9" },
    { id: "house", name: "Cozy House", subtitle: "A place to call home", make: makeHouse, bg: "#ffe9e0" },
    { id: "cactus", name: "Cactus", subtitle: "A tiny desert plant", make: makeCactus, bg: "#e0f6df" },
    { id: "turtle", name: "Little Turtle", subtitle: "Take it slow", make: makeTurtle, bg: "#e0f6df" },
    { id: "ghost", name: "Friendly Ghost", subtitle: "A spooky pal", make: makeGhost, bg: "#e4f5ff" },
    { id: "tree", name: "Pine Tree", subtitle: "A forest friend", make: makePineTree, bg: "#e0f6df" },
    { id: "icecream", name: "Ice Cream", subtitle: "A sweet scoop", make: makeIceCream, bg: "#fbe6f2" },
    { id: "pizza", name: "Pizza Slice", subtitle: "Fresh from the oven", make: makePizza, bg: "#fff4d9" },
    { id: "rocket", name: "Rocket Ship", subtitle: "Off to space", make: makeRocket, bg: "#e4edff" },
    { id: "cupcake", name: "Cupcake", subtitle: "A tiny dessert", make: makeCupcake, bg: "#fbe6f2" },
    { id: "moon", name: "Crescent Moon", subtitle: "A quiet night", make: makeMoon, bg: "#e4f5ff" }
];

// --------------------------------------------------
// DOM AND STATE
// --------------------------------------------------

const gallery = $("#gallery");
const gridElement = $("#pixel-grid");
const paletteList = $("#palette-list");
const progressLabel = $("#progress-label");
const progressBar = $("#progress-bar");
const toast = $("#toast");

let currentArtwork = ARTWORKS[0];
let targetGrid = currentArtwork.make();
let coloredCells = new Map();
let selectedColor = 1;
let activeTool = "color";
let galleryPage = 0;
let galleryFilter = "all";
let toastTimeout;

const favorites = new Set(readJSON(FAVORITES_KEY, []));
const savedProgress = readJSON(STORAGE_KEY, {});

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
        if (
            Array.isArray(entry) &&
            Number.isInteger(entry[0]) &&
            Number.isInteger(entry[1]) &&
            entry[0] >= 0 &&
            entry[0] < SIZE * SIZE &&
            PALETTE.some(color => color.id === entry[1])
        ) {
            result.set(entry[0], entry[1]);
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
}

function findFirstUnfinishedColor() {
    for (const color of PALETTE) {
        if (targetGrid.some(
            (correctColor, index) =>
                correctColor === color.id &&
                coloredCells.get(index) !== correctColor
        )) {
            return color.id;
        }
    }

    return null;
}

// --------------------------------------------------
// GALLERY
// --------------------------------------------------

function getGalleryItems() {
    return galleryFilter === "favorites"
        ? ARTWORKS.filter(artwork => favorites.has(artwork.id))
        : ARTWORKS;
}

function renderGallery() {
    gallery.innerHTML = "";

    const items = getGalleryItems();
    const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

    galleryPage = Math.max(0, Math.min(galleryPage, pageCount - 1));

    const pageItems = items.slice(
        galleryPage * PAGE_SIZE,
        (galleryPage + 1) * PAGE_SIZE
    );

    pageItems.forEach(artwork => {
        const card = document.createElement("button");
        card.type = "button";
        card.className =
            `art-card${artwork.id === currentArtwork.id ? " selected" : ""}`;

        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        drawPreview(canvas, artwork);

        const name = document.createElement("span");
        name.className = "art-name";
        name.textContent = artwork.name;

        const favorite = document.createElement("span");
        favorite.className =
            `favorite-toggle${favorites.has(artwork.id) ? " is-favorite" : ""}`;
        favorite.textContent = favorites.has(artwork.id) ? "♥" : "♡";
        favorite.setAttribute("role", "button");
        favorite.setAttribute("aria-label", "Toggle favorite");

        favorite.addEventListener("click", event => {
            event.stopPropagation();

            if (favorites.has(artwork.id)) {
                favorites.delete(artwork.id);
            } else {
                favorites.add(artwork.id);
            }

            saveProgress();
            renderGallery();
        });

        card.append(canvas, name, favorite);

        card.addEventListener("click", () => {
            loadArtwork(artwork);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        gallery.append(card);
    });

    $("#page-count").textContent = `${galleryPage + 1} / ${pageCount}`;
    $("#prev-page").disabled = galleryPage === 0;
    $("#next-page").disabled = galleryPage >= pageCount - 1;
}

function drawPreview(canvas, artwork) {
    const context = canvas.getContext("2d");
    const data = artwork.make();

    context.imageSmoothingEnabled = false;
    context.fillStyle = artwork.bg;
    context.fillRect(0, 0, SIZE, SIZE);

    data.forEach((colorId, index) => {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        const color = PALETTE.find(item => item.id === colorId);

        if (!color) return;

        context.fillStyle = color.color;
        context.fillRect(col, row, 1, 1);
    });

    context.strokeStyle = "rgba(64, 81, 107, 0.12)";
    context.lineWidth = 0.035;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (data[row * SIZE + col] !== 4) {
                context.strokeRect(col, row, 1, 1);
            }
        }
    }
}

function changeGalleryPage(direction) {
    const pageCount = Math.max(
        1,
        Math.ceil(getGalleryItems().length / PAGE_SIZE)
    );

    galleryPage = Math.max(
        0,
        Math.min(pageCount - 1, galleryPage + direction)
    );

    renderGallery();
}

function showPreviousArtwork() {
    const currentIndex = ARTWORKS.findIndex(
        artwork => artwork.id === currentArtwork.id
    );

    const previousIndex =
        (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;

    loadArtwork(ARTWORKS[previousIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// --------------------------------------------------
// PALETTE
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
        });

        paletteList.append(button);
    });
}

// --------------------------------------------------
// COLORING GRID
// --------------------------------------------------

function renderGrid() {
    gridElement.innerHTML = "";
    gridElement.style.gridTemplateColumns =
        `repeat(${SIZE}, minmax(0, 1fr))`;

    const fragment = document.createDocumentFragment();

    targetGrid.forEach((_, index) => {
        const pixel = document.createElement("button");
        pixel.type = "button";
        pixel.className = "pixel";
        pixel.dataset.index = index;

        updatePixelButton(index, pixel);
        fragment.append(pixel);
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
            ? `Pixel ${index + 1}, ${color?.name || "color"}`
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
        if (oldColor === selectedColor) return;
        coloredCells.set(index, selectedColor);
    }

    updatePixelButton(index);
    afterColorChange();
}

// --------------------------------------------------
// DRAG PAINTING
// --------------------------------------------------

function getPixelFromPoint(x, y) {
    const element = document.elementFromPoint(x, y);
    const pixel = element?.closest(".pixel");

    return pixel && gridElement.contains(pixel) ? pixel : null;
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

gridElement.style.touchAction = "none";

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
    } catch {}

    paintAtPoint(event.clientX, event.clientY);
});

gridElement.addEventListener("pointermove", event => {
    if (!isPainting || event.pointerId !== activePointerId) return;

    event.preventDefault();

    const current = { x: event.clientX, y: event.clientY };

    if (lastDragPoint) {
        const dx = current.x - lastDragPoint.x;
        const dy = current.y - lastDragPoint.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 4));

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

// --------------------------------------------------
// PROGRESS
// --------------------------------------------------

function afterColorChange() {
    saveProgress();
    updateProgress();
    renderPalette();
    updateCompletion();
}

function updateProgress() {
    const colored = coloredCells.size;
    const total = targetGrid.length;

    progressLabel.textContent = `${colored} / ${total}`;
    progressBar.style.width = `${(colored / total) * 100}%`;
}

function updateCompletion() {
    const complete = targetGrid.every(
        (correctColor, index) => coloredCells.get(index) === correctColor
    );

    $("#completion-banner").hidden = !complete;

    $("#status-message").textContent = complete
        ? "You did it! Every pixel matches the picture!"
        : "Keep coloring! Choose any color and paint the squares.";
}

// --------------------------------------------------
// TOOLS
// --------------------------------------------------

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

function fillSelectedColor() {
    let changed = 0;

    targetGrid.forEach((correctColor, index) => {
        if (
            correctColor === selectedColor &&
            coloredCells.get(index) !== selectedColor
        ) {
            coloredCells.set(index, selectedColor);
            changed++;
        }
    });

    if (!changed) {
        showToast("No squares left for this color!");
        return;
    }

    saveProgress();
    renderGrid();
    renderPalette();
    updateProgress();
    updateCompletion();

    showToast(`Filled ${changed} squares.`);
}

function resetArtwork() {
    if (!coloredCells.size) {
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
    updateCompletion();

    showToast("Picture reset!");
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
    showToast(activeTool === "eraser" ? "Eraser selected!" : "Coloring tool selected!");
}

function showHint() {
    let index = targetGrid.findIndex(
        (color, i) =>
            color === selectedColor &&
            coloredCells.get(i) !== color
    );

    if (index === -1) {
        const nextColor = findFirstUnfinishedColor();

        if (nextColor === null) {
            showToast("You finished this picture!");
            return;
        }

        selectedColor = nextColor;
        activeTool = "color";
        renderPalette();

        index = targetGrid.findIndex(
            (color, i) =>
                color === selectedColor &&
                coloredCells.get(i) !== color
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

    showToast(`Look for a square numbered ${selectedColor}.`);
}

// --------------------------------------------------
// BUTTONS
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
    changeGalleryPage(-1);
});

$("#next-page").addEventListener("click", () => {
    changeGalleryPage(1);
});

// Previous picture button wraps around to the final artwork.

$("#back-to-gallery").addEventListener("click", showPreviousArtwork);

document.querySelectorAll(".filter-tab").forEach(button => {
    button.addEventListener("click", () => {
        galleryFilter = button.dataset.filter;
        galleryPage = 0;

        document.querySelectorAll(".filter-tab").forEach(tab => {
            tab.classList.toggle("active", tab === button);
        });

        renderGallery();
    });
});

// --------------------------------------------------
// KEYBOARD SHORTCUTS
// --------------------------------------------------

document.addEventListener("keydown", event => {
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
// INITIALIZE
// --------------------------------------------------

loadArtwork(currentArtwork);