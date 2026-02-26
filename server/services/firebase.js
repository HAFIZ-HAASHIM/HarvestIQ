// Mock Firebase Service to simulate Firestore for demo safety
// Fallback array since no Firebase DB credentials provided

class MockFirestore {
    constructor() {
        this.alerts = [];
        this.idCounter = 1;
    }

    async addAlert(alertData) {
        const alert = {
            id: `alert_${this.idCounter++}`,
            ...alertData,
            createdAt: new Date().toISOString(),
            triggered: false,
            triggeredAt: null
        };
        this.alerts.push(alert);
        return alert;
    }

    async getActiveAlerts() {
        return this.alerts.filter(a => !a.triggered);
    }

    async markTriggered(id) {
        const alert = this.alerts.find(a => a.id === id);
        if (alert) {
            alert.triggered = true;
            alert.triggeredAt = new Date().toISOString();
            return true;
        }
        return false;
    }
}

// Export a singleton instance
const db = new MockFirestore();
module.exports = { db };
