/**
 * iOS-Inspired Shortcut Dock Widget
 * 
 * A lightweight, dependency-free widget for managing iOS shortcuts with an interactive dock.
 * 
 * Features:
 * - Filter shortcuts by category
 * - Generate Siri commands
 * - Share shortcuts via native API or clipboard
 * - Shuffle random suggestions
 * - Full accessibility support
 * - Responsive design
 * 
 * Usage:
 * 1. Include this file after the HTML elements are loaded
 * 2. Customize the SHORTCUT_DATA array below with your shortcuts
 * 3. The widget will automatically initialize
 * 
 * Browser Support: Modern browsers with ES6+ support
 * Dependencies: None (vanilla TypeScript/JavaScript)
 */

// Types
interface Shortcut {
    id: number;
    name: string;
    icon: string;
    category: string;
    instructions: string[];
    siriPhrase?: string;
}

// Widget interface removed to avoid conflicts

// Preset Shortcut Data - Customize this array with your shortcuts
const SHORTCUT_DATA: Shortcut[] = [
    {
        id: 1,
        name: "Morning Routine",
        icon: "☀️",
        category: "productivity",
        instructions: [
            "Open Shortcuts app",
            "Tap '+' to create new shortcut",
            "Add 'Get Weather' action",
            "Add 'Speak Text' action with weather",
            "Add 'Open App' action for Calendar",
            "Add 'Open App' action for Reminders",
            "Save as 'Morning Routine'"
        ],
        siriPhrase: "Start my morning"
    },
    {
        id: 2,
        name: "Text Home",
        icon: "🏠",
        category: "automation",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Send Message' action",
            "Set recipient to emergency contact",
            "Set message to 'I'm on my way home'",
            "Add 'Get Current Location' action",
            "Attach location to message",
            "Save shortcut"
        ],
        siriPhrase: "Text that I'm coming home"
    },
    {
        id: 3,
        name: "Coffee Timer",
        icon: "☕",
        category: "utility",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Start Timer' action",
            "Set duration to 4 minutes",
            "Add 'Speak Text' action: 'Coffee timer started'",
            "Save as 'Coffee Timer'"
        ],
        siriPhrase: "Start coffee timer"
    },
    {
        id: 4,
        name: "Social Share",
        icon: "📱",
        category: "social",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Take Photo' action",
            "Add 'Resize Image' action to 1080px",
            "Add 'Share' action",
            "Select social media apps",
            "Save shortcut"
        ],
        siriPhrase: "Share to social media"
    },
    {
        id: 5,
        name: "Workout Playlist",
        icon: "🎵",
        category: "entertainment",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Play Playlist' action",
            "Select your workout playlist",
            "Add 'Set Volume' action to 80%",
            "Add 'Start Workout' action",
            "Save shortcut"
        ],
        siriPhrase: "Start workout music"
    },
    {
        id: 6,
        name: "Water Reminder",
        icon: "💧",
        category: "health",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Log Health Sample' action",
            "Set to 'Water' and amount '240ml'",
            "Add 'Speak Text' action: 'Water logged'",
            "Add 'Wait' action for 2 hours",
            "Add 'Show Notification' for next reminder",
            "Save shortcut"
        ],
        siriPhrase: "Log water intake"
    },
    {
        id: 7,
        name: "Focus Mode",
        icon: "🎯",
        category: "productivity",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Set Focus' action",
            "Choose 'Do Not Disturb'",
            "Add 'Set Volume' to silent",
            "Add 'Start Timer' for 25 minutes",
            "Save as 'Focus Mode'"
        ],
        siriPhrase: "Enter focus mode"
    },
    {
        id: 8,
        name: "Find My Car",
        icon: "🚗",
        category: "utility",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Get Current Location' action",
            "Add 'Set Variable' as 'Car Location'",
            "Add 'Save to Photo Album' action",
            "Add screenshot of location",
            "Save shortcut"
        ],
        siriPhrase: "Remember where I parked"
    },
    {
        id: 9,
        name: "Evening Wind Down",
        icon: "🌙",
        category: "health",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Set Focus' to Sleep mode",
            "Add 'Set Brightness' to 30%",
            "Add 'Play Playlist' for sleep sounds",
            "Add 'Start Timer' for 30 minutes",
            "Save shortcut"
        ],
        siriPhrase: "Start bedtime routine"
    },
    {
        id: 10,
        name: "Quick Note",
        icon: "📝",
        category: "productivity",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Dictate Text' action",
            "Add 'Append to Note' action",
            "Select or create 'Quick Notes'",
            "Add timestamp to note",
            "Save shortcut"
        ],
        siriPhrase: "Take a quick note"
    },
    {
        id: 11,
        name: "Battery Alert",
        icon: "🔋",
        category: "automation",
        instructions: [
            "Open Shortcuts app",
            "Create automation",
            "Set trigger to 'Battery Level' below 20%",
            "Add 'Speak Text' action: 'Battery low'",
            "Add 'Set Low Power Mode' to On",
            "Save automation"
        ],
        siriPhrase: "Check battery level"
    },
    {
        id: 12,
        name: "Meeting Notes",
        icon: "📊",
        category: "productivity",
        instructions: [
            "Open Shortcuts app",
            "Create new shortcut",
            "Add 'Ask for Input' for meeting title",
            "Add 'Create Note' action",
            "Add current date and attendees template",
            "Add 'Start Recording' action",
            "Save shortcut"
        ],
        siriPhrase: "Start meeting notes"
    }
];

// Widget Class
class ShortcutDockWidget {
    private shortcuts: Shortcut[] = [];
    private filteredShortcuts: Shortcut[] = [];
    private selectedShortcut: Shortcut | null = null;
    private currentFilter: string = '';
    private elements: any = {};

    constructor() {
        this.initializeElements();
        this.loadShortcuts();
        this.bindEvents();
        this.renderShortcuts();
        this.setupAccessibility();
    }

    private initializeElements(): void {
        this.elements = {
            grid: document.getElementById('shortcutsGrid')!,
            filterButton: document.getElementById('filterButton') as HTMLButtonElement,
            siriButton: document.getElementById('siriButton') as HTMLButtonElement,
            shareButton: document.getElementById('shareButton') as HTMLButtonElement,
            shuffleButton: document.getElementById('shuffleButton') as HTMLButtonElement,
            modals: {
                filter: document.getElementById('filterModal')!,
                siri: document.getElementById('siriModal')!,
                share: document.getElementById('shareModal')!
            },
            toast: document.getElementById('toast')!
        };

        // Verify all elements exist
        Object.values(this.elements).forEach(element => {
            if (!element && typeof element !== 'object') {
                console.error('Required element not found:', element);
            }
        });
    }

    private loadShortcuts(): void {
        this.shortcuts = [...SHORTCUT_DATA];
        this.filteredShortcuts = [...this.shortcuts];
    }

    private bindEvents(): void {
        // Dock button events
        this.elements.filterButton?.addEventListener('click', () => this.openFilterModal());
        this.elements.siriButton?.addEventListener('click', () => this.openSiriModal());
        this.elements.shareButton?.addEventListener('click', () => this.openShareModal());
        this.elements.shuffleButton?.addEventListener('click', () => this.shuffleShortcuts());

        // Modal events
        this.bindModalEvents();

        // Keyboard navigation
        this.bindKeyboardEvents();
    }

    private bindModalEvents(): void {
        // Filter modal
        const filterModal = this.elements.modals.filter;
        const filterClose = document.getElementById('filterModalClose');
        const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
        const applyFilter = document.getElementById('applyFilter');

        filterClose?.addEventListener('click', () => this.closeModal(filterModal));
        applyFilter?.addEventListener('click', () => {
            this.applyFilter(categorySelect?.value || '');
            this.closeModal(filterModal);
        });

        // Siri modal
        const siriModal = this.elements.modals.siri;
        const siriClose = document.getElementById('siriModalClose');
        const copySiriCommand = document.getElementById('copySiriCommand');

        siriClose?.addEventListener('click', () => this.closeModal(siriModal));
        copySiriCommand?.addEventListener('click', () => this.copySiriCommand());

        // Share modal
        const shareModal = this.elements.modals.share;
        const shareClose = document.getElementById('shareModalClose');
        const nativeShare = document.getElementById('nativeShare');
        const copyShare = document.getElementById('copyShare');

        shareClose?.addEventListener('click', () => this.closeModal(shareModal));
        nativeShare?.addEventListener('click', () => this.shareNatively());
        copyShare?.addEventListener('click', () => this.copyShareContent());

        // Close modals on overlay click
        [filterModal, siriModal, shareModal].forEach(modal => {
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    private bindKeyboardEvents(): void {
        document.addEventListener('keydown', (e) => {
            // ESC key closes modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    this.closeModal(activeModal as HTMLElement);
                }
            }

            // Number keys for dock buttons (1-4)
            if (e.altKey && e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const buttons = [
                    this.elements.filterButton,
                    this.elements.siriButton,
                    this.elements.shareButton,
                    this.elements.shuffleButton
                ];
                const buttonIndex = parseInt(e.key) - 1;
                if (buttons[buttonIndex] && !buttons[buttonIndex].disabled) {
                    buttons[buttonIndex].click();
                }
            }
        });
    }

    private setupAccessibility(): void {
        // Add ARIA labels and keyboard navigation
        this.elements.grid?.setAttribute('role', 'grid');
        
        // Make dock widget keyboard navigable
        const dockButtons = [
            this.elements.filterButton,
            this.elements.siriButton,
            this.elements.shareButton,
            this.elements.shuffleButton
        ];

        dockButtons.forEach((button, index) => {
            if (button) {
                button.setAttribute('tabindex', '0');
                button.setAttribute('aria-keyshortcuts', `Alt+${index + 1}`);
            }
        });
    }

    private renderShortcuts(): void {
        if (!this.elements.grid) return;

        this.elements.grid.innerHTML = '';

        if (this.filteredShortcuts.length === 0) {
            this.elements.grid.innerHTML = `
                <div class="no-shortcuts">
                    <p>No shortcuts found for the selected category.</p>
                    <button onclick="shortcutWidget.clearFilter()" class="apply-button">Show All</button>
                </div>
            `;
            return;
        }

        this.filteredShortcuts.forEach((shortcut, index) => {
            const card = this.createShortcutCard(shortcut, index);
            this.elements.grid.appendChild(card);
        });

        // Update dock button states
        this.updateDockButtonStates();
    }

    private createShortcutCard(shortcut: Shortcut, index: number): HTMLElement {
        const card = document.createElement('div');
        card.className = 'shortcut-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'gridcell');
        card.setAttribute('aria-label', `${shortcut.name} shortcut. Press Enter to flip and see instructions.`);
        card.dataset.shortcutId = shortcut.id.toString();

        card.innerHTML = `
            <div class="shortcut-card-front">
                <div class="shortcut-icon" aria-hidden="true">${shortcut.icon}</div>
                <div>
                    <div class="shortcut-name">${shortcut.name}</div>
                    <div class="shortcut-category">${this.formatCategory(shortcut.category)}</div>
                </div>
            </div>
            <div class="shortcut-card-back">
                <div class="shortcut-instructions">
                    <h3>${shortcut.name}</h3>
                    <ol>
                        ${shortcut.instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;

        // Add click and keyboard event handlers
        const handleFlip = (e: Event) => {
            e.preventDefault();
            this.flipCard(card, shortcut);
        };

        card.addEventListener('click', handleFlip);
        card.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleFlip(e);
            }
        });

        // Add animation delay
        card.style.animationDelay = `${index * 0.1}s`;

        return card;
    }

    private flipCard(card: HTMLElement, shortcut: Shortcut): void {
        const isFlipped = card.classList.contains('flipped');
        
        // Unflip all other cards
        document.querySelectorAll('.shortcut-card.flipped').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('flipped');
            }
        });

        // Toggle this card
        card.classList.toggle('flipped');

        // Update selected shortcut
        if (!isFlipped) {
            this.selectedShortcut = shortcut;
            card.setAttribute('aria-label', `${shortcut.name} instructions visible. Press Enter to flip back.`);
        } else {
            this.selectedShortcut = null;
            card.setAttribute('aria-label', `${shortcut.name} shortcut. Press Enter to flip and see instructions.`);
        }

        this.updateDockButtonStates();
    }

    private updateDockButtonStates(): void {
        const hasFlippedCard = this.selectedShortcut !== null;
        
        if (this.elements.siriButton) {
            this.elements.siriButton.disabled = !hasFlippedCard;
        }
        
        if (this.elements.shareButton) {
            this.elements.shareButton.disabled = !hasFlippedCard;
        }
    }

    private formatCategory(category: string): string {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Filter Modal Methods
    private openFilterModal(): void {
        this.openModal(this.elements.modals.filter);
        
        // Focus on category select
        const categorySelect = document.getElementById('categorySelect');
        setTimeout(() => categorySelect?.focus(), 100);
    }

    private applyFilter(category: string): void {
        this.currentFilter = category;
        
        if (category === '') {
            this.filteredShortcuts = [...this.shortcuts];
        } else {
            this.filteredShortcuts = this.shortcuts.filter(shortcut => 
                shortcut.category === category
            );
        }

        this.renderShortcuts();
        this.showToast(`Filter applied: ${category || 'All categories'}`);
    }

    public clearFilter(): void {
        this.currentFilter = '';
        this.filteredShortcuts = [...this.shortcuts];
        this.renderShortcuts();
        this.showToast('Filter cleared');
    }

    // Siri Modal Methods
    private openSiriModal(): void {
        if (!this.selectedShortcut) return;

        const siriCommandText = document.getElementById('siriCommandText');
        if (siriCommandText) {
            const phrase = this.selectedShortcut.siriPhrase || this.selectedShortcut.name;
            siriCommandText.textContent = `"Hey Siri, ${phrase}"`;
        }

        this.openModal(this.elements.modals.siri);
    }

    private copySiriCommand(): void {
        if (!this.selectedShortcut) return;

        const phrase = this.selectedShortcut.siriPhrase || this.selectedShortcut.name;
        const command = `Hey Siri, ${phrase}`;
        
        this.copyToClipboard(command)
            .then(() => {
                this.showToast('Siri command copied to clipboard');
                this.closeModal(this.elements.modals.siri);
            })
            .catch(() => {
                this.showToast('Failed to copy Siri command');
            });
    }

    // Share Modal Methods
    private openShareModal(): void {
        if (!this.selectedShortcut) return;

        const shareContent = document.getElementById('shareContent');
        const nativeShareButton = document.getElementById('nativeShare');

        if (shareContent) {
            const content = this.generateShareContent(this.selectedShortcut);
            shareContent.textContent = content;
        }

        // Show/hide native share button based on API availability
        if (nativeShareButton) {
            nativeShareButton.style.display = navigator.share ? 'flex' : 'none';
        }

        this.openModal(this.elements.modals.share);
    }

    private generateShareContent(shortcut: Shortcut): string {
        return `🎯 iOS Shortcut: ${shortcut.name}

📱 Instructions:
${shortcut.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

🗣️ Siri Command: "Hey Siri, ${shortcut.siriPhrase || shortcut.name}"

#iOSShortcuts #Automation #Productivity`;
    }

    private async shareNatively(): Promise<void> {
        if (!this.selectedShortcut || !navigator.share) return;

        try {
            await navigator.share({
                title: `iOS Shortcut: ${this.selectedShortcut.name}`,
                text: this.generateShareContent(this.selectedShortcut)
            });
            
            this.showToast('Shortcut shared successfully');
            this.closeModal(this.elements.modals.share);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                this.showToast('Failed to share shortcut');
            }
        }
    }

    private copyShareContent(): void {
        if (!this.selectedShortcut) return;

        const content = this.generateShareContent(this.selectedShortcut);
        
        this.copyToClipboard(content)
            .then(() => {
                this.showToast('Share content copied to clipboard');
                this.closeModal(this.elements.modals.share);
            })
            .catch(() => {
                this.showToast('Failed to copy share content');
            });
    }

    // Shuffle Methods
    private shuffleShortcuts(): void {
        this.elements.shuffleButton?.classList.add('loading');
        
        // Simulate loading time for better UX
        setTimeout(() => {
            const shuffledShortcuts = this.getRandomShortcuts(6);
            this.filteredShortcuts = shuffledShortcuts;
            this.selectedShortcut = null;
            this.renderShortcuts();
            this.showToast('New shortcuts loaded!');
            this.elements.shuffleButton?.classList.remove('loading');
        }, 800);
    }

    private getRandomShortcuts(count: number): Shortcut[] {
        const shuffled = [...this.shortcuts].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    // Utility Methods
    private openModal(modal: HTMLElement): void {
        if (!modal) return;
        
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]');
        if (firstFocusable) {
            (firstFocusable as HTMLElement).focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    private closeModal(modal: HTMLElement): void {
        if (!modal) return;
        
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to triggering button
        const focusTarget = modal.id === 'filterModal' ? this.elements.filterButton :
                           modal.id === 'siriModal' ? this.elements.siriButton :
                           modal.id === 'shareModal' ? this.elements.shareButton : null;
        
        if (focusTarget) {
            focusTarget.focus();
        }
    }

    private async copyToClipboard(text: string): Promise<void> {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
            } finally {
                textArea.remove();
            }
        }
    }

    private showToast(message: string): void {
        const toast = this.elements.toast;
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Public API Methods
    public addShortcut(shortcut: Omit<Shortcut, 'id'>): void {
        const newShortcut: Shortcut = {
            ...shortcut,
            id: Math.max(...this.shortcuts.map(s => s.id), 0) + 1
        };
        
        this.shortcuts.push(newShortcut);
        this.filteredShortcuts.push(newShortcut);
        this.renderShortcuts();
    }

    public removeShortcut(id: number): void {
        this.shortcuts = this.shortcuts.filter(s => s.id !== id);
        this.filteredShortcuts = this.filteredShortcuts.filter(s => s.id !== id);
        this.renderShortcuts();
    }

    public getShortcuts(): Shortcut[] {
        return [...this.shortcuts];
    }

    public getSelectedShortcut(): Shortcut | null {
        return this.selectedShortcut;
    }
}

// Initialize widget when DOM is loaded
let shortcutWidget: ShortcutDockWidget;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        shortcutWidget = new ShortcutDockWidget();
    });
} else {
    shortcutWidget = new ShortcutDockWidget();
}

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShortcutDockWidget, SHORTCUT_DATA };
}

// Global API for external access
(window as any).ShortcutDockWidget = ShortcutDockWidget;
(window as any).shortcutWidget = shortcutWidget;