let bars = [];

function randomizeArray() {
  bars = [];
  const visualizerContainer = document.getElementById('visualizer-container');
  visualizerContainer.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    bars.push(value);
    const barElement = document.createElement('div');
    barElement.className = 'bar';
    barElement.style.height = `${value}px`;
    visualizerContainer.appendChild(barElement);
  }
}

function initializeBars() {
  randomizeArray();
}

function swapBars(index1, index2) {
  const visualizerContainer = document.getElementById('visualizer-container');
  const barElements = visualizerContainer.children;
  const tempHeight = bars[index1];

  bars[index1] = bars[index2];
  bars[index2] = tempHeight;

  barElements[index1].style.height = `${bars[index1]}px`;
  barElements[index2].style.height = `${tempHeight}px`;
}

function insertionSort() {
  const n = bars.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && bars[j] < bars[j - 1]) {
      swapBars(j, j - 1);
      j--;
    }
  }
}

function selectionSort() {
  const n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j;
      }
    }
    swapBars(i, minIndex);
  }
}

function bubbleSort() {
  const n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        swapBars(j, j + 1);
      }
    }
  }
}

function quickSort() {
  quickSortHelper(0, bars.length - 1);
}

function quickSortHelper(low, high) {
  if (low < high) {
    const pivotIndex = partition(low, high);
    quickSortHelper(low, pivotIndex - 1);
    quickSortHelper(pivotIndex + 1, high);
  }
}

function partition(low, high) {
  const pivot = bars[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (bars[j] < pivot) {
      i++;
      swapBars(i, j);
    }
  }

  swapBars(i + 1, high);
  return i + 1;
}

function mergeSort() {
  mergeSortHelper(0, bars.length - 1);
}

function mergeSortHelper(low, high) {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);
    mergeSortHelper(low, mid);
    mergeSortHelper(mid + 1, high);
    merge(low, mid, high);
  }
}

function merge(low, mid, high) {
  const leftArray = bars.slice(low, mid + 1);
  const rightArray = bars.slice(mid + 1, high + 1);

  let i = 0, j = 0, k = low;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      bars[k] = leftArray[i];
      i++;
    } else {
      bars[k] = rightArray[j];
      j++;
    }
    k++;
  }

  while (i < leftArray.length) {
    bars[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightArray.length) {
    bars[k] = rightArray[j];
    j++;
    k++;
  }

  updateVisualizer();
}

function shellSort() {
  const n = bars.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = bars[i];
      let j = i;

      while (j >= gap && bars[j - gap] > temp) {
        bars[j] = bars[j - gap];
        j -= gap;
      }

      bars[j] = temp;
    }
  }

  updateVisualizer();
}

function updateVisualizer() {
  const visualizerContainer = document.getElementById('visualizer-container');
  const barElements = visualizerContainer.children;

  for (let i = 0; i < bars.length; i++) {
    barElements[i].style.height = `${bars[i]}px`;
  }
}

function changeSize() {
  const visualizerContainer = document.getElementById('visualizer-container');

  bars.forEach((value, index) => {
    const barElement = visualizerContainer.children[index];
    const newSize = Math.floor(Math.random() * 100) + 1;
    bars[index] = newSize;
    barElement.style.height = `${newSize}px`;
  });
}

window.onload = initializeBars;
