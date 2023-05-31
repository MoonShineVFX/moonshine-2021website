import { atom } from 'recoil';
import { Movie } from '../types';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const movieState = atom({
  key: 'movieState',
  default: null,
});


export const byCategoryModalState = atom({
  key: 'byCategoryModalState',
  default: false,
});

export const categoryState = atom({
  key: 'categoryState',
  default: null,
});

export const videoModalState = atom({
  key: 'videoModalState',
  default: false,
});
export const videoState = atom({
  key: 'videoState',
  default: null,
});


export const sectionState = atom({
  key: 'sectionState',
  default: 0,
});