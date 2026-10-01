import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Clock3,
  Filter,
  Inbox,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Tag,
  UserRound,
} from "lucide-react";
import "./App.css";

const STORAGE_KEY = "ai-support-triage-console.tickets";

const seedTickets = [
  {
    id: "SUP-1042",
    customer: "Maya Chen",
    subject: "Payment marked successful but order is still pending",
    message: "My card was charged, but the order page still shows pending. I don't want to retry and get charged twice.",
    status: "Open",
    category: "Payments",
    priority: "Urgent",
    sentiment: "Frustrated",
    createdAt: "2026-10-01T11:20:00.000Z",
    aiSummary: "Customer reports a successful card charge while the order remains pending and is concerned about duplicate payment risk.",
    aiSuggestion: "Acknowledge the payment concern, advise against retrying immediately, verify the transaction ID and order state, then reconcile the payment before updating the order.",
  },
  {
    id: "SUP-1038",
    customer: "Daniel Ruiz",
    subject: "Unable to reset account password",
    message: "The reset email never arrives even after multiple attempts.",
    status: "Open",
    category: "Account Access",
    priority: "High",
    sentiment: "Concerned",
    createdAt: "2026-10-01T09:10:00.000Z",
    aiSummary: "Password reset emails are not being delivered after repeated attempts.",
    aiSuggestion: "Confirm the email address, check delivery suppression or bounce status, and offer a secure alternate recovery path if available.",
  },
  {
    id: "SUP-1031",
    customer: "Priya Shah",
    subject: "Need invoice for last month's subscription",
    message: "Can you send me the invoice for September for our finance team?",
    status: "Pending",
    category: "Billing",
    priority: "Medium",
    sentiment: "Neutral",
    createdAt: "2026-09-30T17:45:00.000Z",
    aiSummary: "Customer needs a September subscription invoice for internal finance processing.",
    aiSuggestion: "Confirm the billing account and invoice period, then provide the invoice or direct the customer to the billing portal.",
  },
];

const loadTickets = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : seedTickets;
  } catch {
    return seedTickets;
  }
};

function App() {
  const [tickets, setTickets] = useState(loadTickets);
  const [selectedId, setSelectedId] = useState(() => loadTickets()[0]?.id || "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [reply, setReply] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const selected = tickets.find((ticket) => ticket.id === selectedId) || tickets[0];

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (filter !== "All" && ticket.status !== filter && ticket.priority !== filter) return false;
      if (!query) return true;

      return [
        ticket.id,
        ticket.customer,
        ticket.subject,
        ticket.message,
        ticket.category,
      ].some((value) => String(value).toLowerCase().includes(query));
    });
  }, [tickets, search, filter]);

  const openCount = tickets.filter((ticket) => ticket.status === "Open").length;
  const urgentCount = tickets.filter((ticket) => ticket.priority === "Urgent").length;
  const resolvedCount = tickets.filter((ticket) => ticket.status === "Resolved").length;

  function updateSelected(patch) {
    if (!selected) return;
    setTickets((current) =>
      current.map((ticket) => (ticket.id === selected.id ? { ...ticket, ...patch } : ticket))
    );
  }

  function useSuggestedReply() {
    if (!selected) return;
    setReply(
      `Hi ${selected.customer.split(" ")[0]}, thanks for flagging this. ${selected.aiSuggestion} I’ll keep you updated as I verify the issue.`
    );
  }

  function sendReply() {
    if (!selected || !reply.trim()) return;
    updateSelected({
      status: "Pending",
      lastReply: reply.trim(),
      updatedAt: new Date().toISOString(),
    });
    setReply("");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Bot size={20} /></div>
          <div>
            <strong>Support Intelligence</strong>
            <span>AI-assisted triage console</span>
          </div>
        </div>

        <div className="header-status">
          <span><span className="status-dot" /> Queue active</span>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> SUPPORT OPERATIONS</span>
          <h1>See the signal.<br /><em>Resolve the issue.</em></h1>
          <p>
            Triage customer conversations with structured summaries, priority signals,
            response guidance, and workflow controls in one support workspace.
          </p>
        </div>

        <div className="summary-strip">
          <div>
            <span>Open</span>
            <strong>{openCount}</strong>
          </div>
          <div>
            <span>Urgent</span>
            <strong>{urgentCount}</strong>
          </div>
          <div>
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="queue-panel">
          <div className="queue-header">
            <div>
              <span className="section-label">QUEUE</span>
              <h2>Customer conversations</h2>
            </div>
            <Inbox size={19} />
          </div>

          <div className="queue-tools">
            <label className="search-box">
              <Search size={15} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tickets"
              />
            </label>

            <label className="filter-box">
              <Filter size={14} />
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                {["All", "Open", "Pending", "Resolved", "Urgent", "High"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="ticket-list">
            {filteredTickets.map((ticket) => (
              <button
                className={ticket.id === selected?.id ? "ticket-card active" : "ticket-card"}
                key={ticket.id}
                onClick={() => setSelectedId(ticket.id)}
              >
                <div className="ticket-topline">
                  <span>{ticket.id}</span>
                  <span className={`priority priority-${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                </div>
                <strong>{ticket.subject}</strong>
                <p>{ticket.message}</p>
                <div className="ticket-footer">
                  <span>{ticket.customer}</span>
                  <span>{ticket.category}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="conversation-panel">
          {selected ? (
            <>
              <div className="conversation-header">
                <div>
                  <span className="section-label">{selected.id}</span>
                  <h2>{selected.subject}</h2>
                </div>

                <select
                  className="status-select"
                  value={selected.status}
                  onChange={(event) => updateSelected({ status: event.target.value })}
                >
                  {["Open", "Pending", "Resolved"].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="customer-card">
                <div className="avatar"><UserRound size={18} /></div>
                <div>
                  <strong>{selected.customer}</strong>
                  <span>{selected.category} · {selected.sentiment}</span>
                </div>
              </div>

              <div className="message-bubble">
                <MessageSquare size={17} />
                <p>{selected.message}</p>
              </div>

              {selected.lastReply && (
                <div className="message-bubble agent">
                  <Bot size={17} />
                  <p>{selected.lastReply}</p>
                </div>
              )}

              <div className="reply-box">
                <textarea
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write a response..."
                />
                <div className="reply-actions">
                  <button className="secondary-button" onClick={useSuggestedReply}>
                    <Sparkles size={15} /> Use AI suggestion
                  </button>
                  <button className="primary-button" onClick={sendReply}>
                    <Send size={15} /> Send reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">No conversation selected.</div>
          )}
        </section>

        <aside className="intelligence-panel">
          {selected && (
            <>
              <div className="intel-card">
                <span className="section-label">AI SUMMARY</span>
                <p>{selected.aiSummary}</p>
              </div>

              <div className="intel-card">
                <span className="section-label">RECOMMENDED RESPONSE</span>
                <p>{selected.aiSuggestion}</p>
              </div>

              <div className="intel-card">
                <span className="section-label">TRIAGE SIGNALS</span>
                <div className="signal-row">
                  <Tag size={15} />
                  <div>
                    <span>Category</span>
                    <strong>{selected.category}</strong>
                  </div>
                </div>
                <div className="signal-row">
                  <AlertTriangle size={15} />
                  <div>
                    <span>Priority</span>
                    <strong>{selected.priority}</strong>
                  </div>
                </div>
                <div className="signal-row">
                  <Clock3 size={15} />
                  <div>
                    <span>Status</span>
                    <strong>{selected.status}</strong>
                  </div>
                </div>
              </div>

              <div className="intel-card outcome-card">
                <CheckCircle2 size={20} />
                <div>
                  <strong>Human in control</strong>
                  <p>AI summarizes and recommends. The agent still owns the customer-facing action.</p>
                </div>
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}

export default App;
