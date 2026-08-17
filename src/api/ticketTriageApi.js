/**
 * ticketTriageApi.js
 *
 * Frontend-only stub. Every function returns a Promise so the components
 * calling them never need to change when real HTTP calls replace the mocks.
 *
 * Wiring to a real backend later = swap the body of each function for a
 * fetch()/axios call to the endpoint noted above it. Nothing else changes.
 */
import { activeTicket, aiSuggestion, triageQueue } from '../data/mockData.js';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/** GET /api/tickets/:id */
export async function fetchTicket(ticketId) {
  await delay(200);
  return { ...activeTicket, id: ticketId || activeTicket.id };
}

/** POST /api/tickets/:id/triage — returns { category, priority, storyPoints, assignee, reasoning, similarTickets } */
export async function runAiTriage(ticketId) {
  await delay(2600); // simulated LLM round-trip; UI shows the step-by-step analyzing state during this window
  return aiSuggestion;
}

/** POST /api/tickets/:id/triage/accept — applies AI suggestion values to the ticket */
export async function acceptAiSuggestion(ticketId, suggestion) {
  await delay(250);
  return {
    ...activeTicket,
    category: suggestion.category.value,
    priority: suggestion.priority.value,
    storyPoints: suggestion.storyPoints.value,
    assignee: suggestion.assignee.value,
  };
}

/** PATCH /api/tickets/:id — manual override of one or more fields */
export async function updateTicketFields(ticketId, fields) {
  await delay(150);
  return { ...activeTicket, ...fields };
}

/** GET /api/tickets/triage-queue */
export async function fetchTriageQueue() {
  await delay(200);
  return triageQueue;
}

/** POST /api/tickets — create a ticket, backend fires async AI triage on save */
export async function createTicket({ title, description }) {
  await delay(300);
  return { id: 'NF-' + Math.floor(200 + Math.random() * 90), title, description, status: 'Open' };
}
