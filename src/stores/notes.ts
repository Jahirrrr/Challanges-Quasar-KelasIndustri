import { defineStore } from 'pinia';
import { NotesModel } from './models';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    rows: []
  }),

  getters: {
    getStoreNotes (state) {
      return state.rows;
    }
  },

  actions: {
    addStoreNotes (notes: NotesModel) {
      this.rows.push(notes);
    }
  },
  persist: true,
});
