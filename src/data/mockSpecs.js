/**
 * mockSpecs.js
 * 
 * Provides mock data for the AI Requirements & Spec Studio.
 * This files contains three baseline specs representing different lifecycles:
 * - Approved (E-Commerce Payment Gateway Integration)
 * - In Review (Real-time Collaboration Canvas)
 * - Draft (AI Autocomplete Copilot)
 * 
 * It also exports a version history registry representing past snapshots.
 */

export const mockSpecs = [
  {
    specId: "spec-1",
    title: "E-Commerce Payment Gateway Integration",
    version: "v3",
    status: "Approved",
    createdBy: "Sarah Chen (Lead PM)",
    createdAt: "2026-07-15T09:00:00Z",
    originalPrompt: "Integrate Stripe and PayPal gateways with automatic currency conversion and failure retries for checkout.",
    content: {
      userStories: [
        {
          id: "US-101",
          title: "Secure Credit Card Checkout via Stripe",
          description: "As a Customer, I want to pay securely using my credit card via Stripe, so that my transaction is safe and my checkout is completed quickly."
        },
        {
          id: "US-102",
          title: "PayPal Option for Checkout",
          description: "As a Customer, I want to check out using PayPal, so that I can leverage my existing PayPal balance and avoid typing card details."
        },
        {
          id: "US-103",
          title: "Real-time Local Currency Display",
          description: "As a Global Shopper, I want to see the product prices converted to my local currency at checkout, so that I know exactly how much I am paying."
        }
      ],
      acceptanceCriteria: [
        "Stripe payment verification must respond with a token in under 2 seconds.",
        "Credit card details must be encrypted using PCI-DSS compliant protocols before transmittal.",
        "PayPal checkout should open a secure popup window and return the user to order-confirmation on success.",
        "Currency exchange rates must be updated every 1 hour via external rates API and cached locally."
      ],
      functionalRequirements: [
        "FR-1.1: System must support Visa, Mastercard, American Express, and Discover cards via Stripe gateway.",
        "FR-1.2: A payment retry routine must attempt execution twice on network timeout with an exponential backoff.",
        "FR-1.3: Transactions must trigger automated confirmation email dispatch with order details upon receiving webhook confirmation."
      ],
      nonFunctionalRequirements: [
        "NFR-1.1: The transaction response time (excluding payment gateway lag) must be under 300ms.",
        "NFR-1.2: Credit card numbers must never be saved or logged in the application database.",
        "NFR-1.3: System checkout service must maintain high availability of 99.99% uptime."
      ]
    }
  },
  {
    specId: "spec-2",
    title: "Real-time Collaboration Canvas",
    version: "v1",
    status: "In Review",
    createdBy: "David Miller (Senior PM)",
    createdAt: "2026-07-20T14:30:00Z",
    originalPrompt: "A shared whiteboard where multiple users can draw shapes and add sticky notes concurrently with under 100ms latency.",
    content: {
      userStories: [
        {
          id: "US-201",
          title: "Double-Click Sticky Note Creation",
          description: "As a Collaborator, I want to double-click on any empty canvas area to spawn a sticky note, so that I can immediately jot down ideas."
        },
        {
          id: "US-202",
          title: "Multi-user Active Cursor Tracking",
          description: "As a Team Member, I want to see cursors of other active users with their name tags, so that I can follow where they are pointing and drawing in real-time."
        }
      ],
      acceptanceCriteria: [
        "Sticky notes should automatically wrap text and adjust font size to keep contents readable.",
        "Collaborator cursors must show a distinct color and username tag.",
        "An offline banner warning must appear immediately if the WebSocket connection is interrupted."
      ],
      functionalRequirements: [
        "FR-2.1: Canvas events must be synchronized using CRDTs (Conflict-free Replicated Data Types) via WebSockets.",
        "FR-2.2: The canvas session must support a maximum of 25 concurrent active users per room.",
        "FR-2.3: Users must be able to export the canvas snapshot to PNG and PDF formats."
      ],
      nonFunctionalRequirements: [
        "NFR-2.1: Real-time update broadcast latency must be less than 80ms for active users.",
        "NFR-2.2: Board rendering frame rate must maintain a stable 60 FPS in standard browser windows."
      ]
    }
  },
  {
    specId: "spec-3",
    title: "AI Autocomplete Copilot",
    version: "v1",
    status: "Draft",
    createdBy: "Sarah Chen (Lead PM)",
    createdAt: "2026-07-27T10:15:00Z",
    originalPrompt: "An inline code and text completion suggestions engine powered by LLMs that integrates into our rich text editor.",
    content: {
      userStories: [
        {
          id: "US-301",
          title: "Inline Ghost Text Suggestions",
          description: "As a Content Writer, I want the editor to suggest the next 3 to 5 words in grey inline 'ghost' text as I type, so that I can draft content faster."
        },
        {
          id: "US-302",
          title: "Single-Key Suggestion Acceptance",
          description: "As a Writer, I want to press the Tab key to accept a suggestion, or the Escape key to hide it, so that the AI assistance fits my normal typing flow."
        }
      ],
      acceptanceCriteria: [
        "Suggestions must trigger automatically when the user stops typing for 400 milliseconds.",
        "Pressing the Tab key must append the grey text to the document and shift the cursor to the end of the text.",
        "Pressing Escape or typing any character other than Tab should immediately hide the current autocomplete preview."
      ],
      functionalRequirements: [
        "FR-3.1: Trigger completion API calls on typing pause, sending up to 1000 characters of surrounding context.",
        "FR-3.2: Cache the last 5 API completion results to allow instant re-triggering if the user hits backspace."
      ],
      nonFunctionalRequirements: [
        "NFR-3.1: Autocomplete network API latency must remain below 300ms to avoid breaking writing flow.",
        "NFR-3.2: Context payloads sent to the completion API must not exceed 50KB."
      ]
    }
  }
];

// Registry of historical versions for each specification
export const mockVersionHistoryRegistry = {
  "spec-1": [
    {
      version: "v3",
      timestamp: "2026-07-15T09:00:00Z",
      author: "Sarah Chen (Lead PM)",
      changeSummary: "Approved final security and PCI-DSS compliance specifications.",
      status: "Approved",
      content: {
        userStories: [
          { id: "US-101", title: "Secure Credit Card Checkout via Stripe", description: "As a Customer, I want to pay securely using my credit card via Stripe, so that my transaction is safe and my checkout is completed quickly." },
          { id: "US-102", title: "PayPal Option for Checkout", description: "As a Customer, I want to check out using PayPal, so that I can leverage my existing PayPal balance." },
          { id: "US-103", title: "Real-time Local Currency Display", description: "As a Global Shopper, I want to see the product prices converted to my local currency at checkout, so that I know exactly how much I am paying." }
        ],
        acceptanceCriteria: [
          "Stripe payment verification must respond with a token in under 2 seconds.",
          "Credit card details must be encrypted using PCI-DSS compliant protocols before transmittal.",
          "PayPal checkout should open a secure popup window and return the user to order-confirmation on success.",
          "Currency exchange rates must be updated every 1 hour via external rates API and cached locally."
        ],
        functionalRequirements: [
          "FR-1.1: System must support Visa, Mastercard, American Express, and Discover cards via Stripe gateway.",
          "FR-1.2: A payment retry routine must attempt execution twice on network timeout with an exponential backoff.",
          "FR-1.3: Transactions must trigger automated confirmation email dispatch with order details upon receiving webhook confirmation."
        ],
        nonFunctionalRequirements: [
          "NFR-1.1: The transaction response time (excluding payment gateway lag) must be under 300ms.",
          "NFR-1.2: Credit card numbers must never be saved or logged in the application database.",
          "NFR-1.3: System checkout service must maintain high availability of 99.99% uptime."
        ]
      }
    },
    {
      version: "v2",
      timestamp: "2026-07-10T11:20:00Z",
      author: "Sarah Chen (Lead PM)",
      changeSummary: "Added PayPal payment gateway option and functional requirements.",
      status: "In Review",
      content: {
        userStories: [
          { id: "US-101", title: "Secure Credit Card Checkout via Stripe", description: "As a Customer, I want to pay securely using my credit card via Stripe, so that my transaction is safe and my checkout is completed quickly." },
          { id: "US-102", title: "PayPal Option for Checkout", description: "As a Customer, I want to check out using PayPal, so that I can leverage my existing PayPal balance." }
        ],
        acceptanceCriteria: [
          "Stripe payment verification must respond with a token in under 2 seconds.",
          "Credit card details must be encrypted using PCI-DSS compliant protocols before transmittal.",
          "PayPal checkout should open a secure popup window."
        ],
        functionalRequirements: [
          "FR-1.1: System must support Visa, Mastercard, American Express, and Discover cards via Stripe gateway.",
          "FR-1.2: A payment retry routine must attempt execution twice on network timeout."
        ],
        nonFunctionalRequirements: [
          "NFR-1.1: The transaction response time must be under 300ms.",
          "NFR-1.2: Credit card numbers must never be saved or logged."
        ]
      }
    },
    {
      version: "v1",
      timestamp: "2026-07-08T15:45:00Z",
      author: "Sarah Chen (Lead PM)",
      changeSummary: "Initial draft with Stripe core integration details.",
      status: "Draft",
      content: {
        userStories: [
          { id: "US-101", title: "Secure Credit Card Checkout via Stripe", description: "As a Customer, I want to pay securely using my credit card via Stripe." }
        ],
        acceptanceCriteria: [
          "Stripe payment verification must respond with a token in under 2 seconds."
        ],
        functionalRequirements: [
          "FR-1.1: System must support credit cards via Stripe gateway."
        ],
        nonFunctionalRequirements: [
          "NFR-1.1: The transaction response time must be under 300ms."
        ]
      }
    }
  ],
  "spec-2": [
    {
      version: "v1",
      timestamp: "2026-07-20T14:30:00Z",
      author: "David Miller (Senior PM)",
      changeSummary: "Initial version created for canvas real-time drawing sync.",
      status: "In Review",
      content: {
        userStories: [
          { id: "US-201", title: "Double-Click Sticky Note Creation", description: "As a Collaborator, I want to double-click on any empty canvas area to spawn a sticky note, so that I can immediately jot down ideas." },
          { id: "US-202", title: "Multi-user Active Cursor Tracking", description: "As a Team Member, I want to see cursors of other active users with their name tags, so that I can follow where they are pointing and drawing in real-time." }
        ],
        acceptanceCriteria: [
          "Sticky notes should automatically wrap text and adjust font size to keep contents readable.",
          "Collaborator cursors must show a distinct color and username tag.",
          "An offline banner warning must appear immediately if the WebSocket connection is interrupted."
        ],
        functionalRequirements: [
          "FR-2.1: Canvas events must be synchronized using CRDTs (Conflict-free Replicated Data Types) via WebSockets.",
          "FR-2.2: The canvas session must support a maximum of 25 concurrent active users per room.",
          "FR-2.3: Users must be able to export the canvas snapshot to PNG and PDF formats."
        ],
        nonFunctionalRequirements: [
          "NFR-2.1: Real-time update broadcast latency must be less than 80ms for active users.",
          "NFR-2.2: Board rendering frame rate must maintain a stable 60 FPS in standard browser windows."
        ]
      }
    }
  ],
  "spec-3": [
    {
      version: "v1",
      timestamp: "2026-07-27T10:15:00Z",
      author: "Sarah Chen (Lead PM)",
      changeSummary: "Initial draft outline for LLM autocomplete integration.",
      status: "Draft",
      content: {
        userStories: [
          { id: "US-301", title: "Inline Ghost Text Suggestions", description: "As a Content Writer, I want the editor to suggest the next 3 to 5 words in grey inline 'ghost' text as I type, so that I can draft content faster." },
          { id: "US-302", title: "Single-Key Suggestion Acceptance", description: "As a Writer, I want to press the Tab key to accept a suggestion, or the Escape key to hide it, so that the AI assistance fits my normal typing flow." }
        ],
        acceptanceCriteria: [
          "Suggestions must trigger automatically when the user stops typing for 400 milliseconds.",
          "Pressing the Tab key must append the grey text to the document and shift the cursor to the end of the text.",
          "Pressing Escape or typing any character other than Tab should immediately hide the current autocomplete preview."
        ],
        functionalRequirements: [
          "FR-3.1: Trigger completion API calls on typing pause, sending up to 1000 characters of surrounding context.",
          "FR-3.2: Cache the last 5 API completion results to allow instant re-triggering if the user hits backspace."
        ],
        nonFunctionalRequirements: [
          "NFR-3.1: Autocomplete network API latency must remain below 300ms to avoid breaking writing flow.",
          "NFR-3.2: Context payloads sent to the completion API must not exceed 50KB."
        ]
      }
    }
  ]
};
