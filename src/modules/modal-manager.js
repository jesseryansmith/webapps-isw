// Modal Manager - Lazy loaded module for better performance
// Handles all modal functionality with optimized loading

export class ModalManager {
  constructor() {
    this.activeModals = new Set();
    this.setupKeyboardHandlers();
  }

  setupKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeTopModal();
      }
    });
  }

  closeTopModal() {
    // Close the most recently opened modal
    const modals = ['generateModal', 'shareModal', 'filterModal'];
    for (const modalId of modals) {
      const modal = document.getElementById(modalId);
      if (modal && modal.style.display !== 'none') {
        this.closeModal(modalId);
        break;
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      this.activeModals.delete(modalId);
    }
  }

  // Lazy load modal creation functions
  async loadModalCreator() {
    if (!this.modalCreator) {
      const { createModal } = await import('./modal-creator.js');
      this.modalCreator = createModal;
    }
    return this.modalCreator;
  }
}

// Export singleton instance
export const modalManager = new ModalManager();
