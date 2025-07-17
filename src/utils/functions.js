export const generateArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 500) + 10);
};

export const delayMs = (ms) => new Promise((res) => setTimeout(res, ms));

const getDelay = (speed) => {
  const minDelay = 1;
  const maxDelay = 100;
  const normalized = 100 - speed;
  return Math.max(minDelay, (normalized / 100) * maxDelay);
};

export const animate = async (animations, speedRef, isSorting) => {
  for (let i = 0; i < animations.length && isSorting.current; i++) {
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOne = document.getElementsByClassName('bar')[barOneIdx];
    const barTwo = document.getElementsByClassName('bar')[barTwoIdx];

    barOne.style.backgroundColor = 'red';
    barTwo.style.backgroundColor = 'red';

    if (swap) {
      const tempHeight = barOne.style.height;
      barOne.style.height = barTwo.style.height;
      barTwo.style.height = tempHeight;
    }

    await delayMs(getDelay(speedRef.current));
    barOne.style.backgroundColor = 'turquoise';
    barTwo.style.backgroundColor = 'turquoise';
  }
};

export const animateMerge = async (animations, speedRef, isSorting) => {
  for (let i = 0; i < animations.length && isSorting.current; i++) {
    const [barIdx, newHeight] = animations[i];
    const bar = document.getElementsByClassName('bar')[barIdx];
    bar.style.height = `${newHeight}px`;
    await delayMs(getDelay(speedRef.current));
  }
};



export const bubbleSortLogic = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([j, j + 1, arr[j] > arr[j + 1]]);
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  return animations;
};

export const selectionSortLogic = (arr) => {
  const animations = [];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([min, j, false]);
      if (arr[j] < arr[min]) min = j;
    }
    animations.push([i, min, true]);
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return animations;
};

export const insertionSortLogic = (arr) => {
  const animations = [];
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      animations.push([j, j - 1, true]);
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
  return animations;
};

export const mergeSortLogic = (arr) => {
  const animations = [];
  const helper = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    helper(start, mid);
    helper(mid + 1, end);

    const temp = [];
    let i = start, j = mid + 1;
    while (i <= mid && j <= end) {
      if (arr[i] < arr[j]) temp.push(arr[i++]);
      else temp.push(arr[j++]);
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= end) temp.push(arr[j++]);

    for (let k = start; k <= end; k++) {
      arr[k] = temp[k - start];
      animations.push([k, arr[k]]);
    }
  };
  helper(0, arr.length - 1);
  return animations;
};

export const quickSortLogic = (arr) => {
  const animations = [];

  const quickSort = (low, high) => {
    if (low < high) {
      const pivot = partition(low, high);
      quickSort(low, pivot - 1);
      quickSort(pivot + 1, high);
    }
  };

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
      animations.push([i, j, arr[j] < pivot]);
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    animations.push([i, high, true]);
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  };

  quickSort(0, arr.length - 1);
  return animations;
};
