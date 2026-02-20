// ============================================================
// CRMContext - Global state for leads, deals, and contacts
// ============================================================
import { createContext, useContext, useState } from 'react';
import { initialLeads, initialDeals, initialContacts } from '../data/mockData';

const CRMContext = createContext(null);

export function CRMProvider({ children }) {
    const [leads, setLeads] = useState(initialLeads);
    const [deals, setDeals] = useState(initialDeals);
    const [contacts, setContacts] = useState(initialContacts);

    // ---- Lead Actions ----

    /** Add a new lead with a generated id and today's date */
    const addLead = (leadData) => {
        const newLead = {
            ...leadData,
            id: `l${Date.now()}`,
            date: new Date().toISOString().slice(0, 10),
        };
        setLeads(prev => [newLead, ...prev]);
    };

    /** Update an existing lead by id */
    const updateLead = (id, updatedData) => {
        setLeads(prev => prev.map(l => (l.id === id ? { ...l, ...updatedData } : l)));
    };

    /** Delete a lead by id */
    const deleteLead = (id) => {
        setLeads(prev => prev.filter(l => l.id !== id));
    };

    // ---- Deal Actions ----

    /**
     * Move a deal to a new Kanban stage.
     * Called after a drag-and-drop operation completes.
     */
    const moveDeal = (dealId, newStage) => {
        setDeals(prev =>
            prev.map(d => (d.id === dealId ? { ...d, stage: newStage } : d))
        );
    };

    /** Update an existing deal by id */
    const updateDeal = (id, updatedData) => {
        setDeals(prev => prev.map(d => (d.id === id ? { ...d, ...updatedData } : d)));
    };

    /** Delete a deal by id */
    const deleteDeal = (id) => {
        setDeals(prev => prev.filter(d => d.id !== id));
    };

    // ---- Contact Actions ----

    /** Add a new contact */
    const addContact = (contactData) => {
        const newContact = { ...contactData, id: `c${Date.now()}` };
        setContacts(prev => [newContact, ...prev]);
    };

    // ---- Derived Stats (used by Dashboard) ----
    const stats = {
        totalLeads: leads.length,
        totalDeals: deals.length,
        activeDeals: deals.filter(d => d.stage === 'Negotiation' || d.stage === 'New').length,
        wonDeals: deals.filter(d => d.stage === 'Won').length,
        totalRevenue: deals
            .filter(d => d.stage === 'Won')
            .reduce((sum, d) => sum + d.value, 0),
        conversionRate: leads.length
            ? Math.round((leads.filter(l => l.status === 'Converted').length / leads.length) * 100)
            : 0,
    };

    return (
        <CRMContext.Provider
            value={{ leads, deals, contacts, stats, addLead, updateLead, deleteLead, moveDeal, updateDeal, deleteDeal, addContact }}
        >
            {children}
        </CRMContext.Provider>
    );
}

// Custom hook for consuming CRM context
export function useCRM() {
    const ctx = useContext(CRMContext);
    if (!ctx) throw new Error('useCRM must be used within CRMProvider');
    return ctx;
}
