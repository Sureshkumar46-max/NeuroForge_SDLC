/**
 * useSpecStudio.js
 * 
 * Custom React hook for the AI Requirements & Spec Studio.
 * Manages the top-level state:
 * - activeRole: PM, DEV, QA, CLIENT
 * - selectedSpec: The currently active spec (or a blank template for creation)
 * - specs: The complete master list of specs (Draft, In Review, Approved)
 * - versionHistory: The version logs for the currently selected spec
 * 
 * Implements role-based permissions:
 * - PM: Read/Write/Edit all specs, approve/submit specs, create specs.
 * - DEV, QA, CLIENT: Read-only access to Approved specs ONLY.
 * - QA: Exclusive action to generate mock BDD test cases.
 */

import { useState, useEffect, useCallback } from 'react';
import { mockSpecs, mockVersionHistoryRegistry } from '../data/mockSpecs';

export default function useSpecStudio() {
  // --- 1. Top-Level State Management ---
  const [activeRole, setActiveRole] = useState("PM"); // Default role
  const [specs, setSpecs] = useState(mockSpecs);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);
  
  // Track local runtime modifications to the version registry
  const [historyRegistry, setHistoryRegistry] = useState(mockVersionHistoryRegistry);

  // --- 2. Role-Based Permission Helper Functions ---
  const isPM = useCallback(() => activeRole === "PM", [activeRole]);
  const isDev = useCallback(() => activeRole === "DEV", [activeRole]);
  const isQA = useCallback(() => activeRole === "QA", [activeRole]);
  const isClient = useCallback(() => activeRole === "CLIENT", [activeRole]);

  // --- 3. Filtered Specs List ---
  // PMs see all specs. Non-PMs (DEV, QA, CLIENT) can only see Approved specs.
  const getFilteredSpecs = useCallback(() => {
    if (isPM()) {
      return specs;
    }
    return specs.filter(spec => spec.status === "Approved");
  }, [specs, isPM]);

  // --- 4. Side Effects & Role Guards ---
  // Ensure that if a user switches roles, they don't remain on a spec they aren't allowed to view.
  useEffect(() => {
    if (!isPM() && selectedSpec) {
      // If we are previewing a historical snapshot or it's a draft/in-review spec
      const currentFullSpec = specs.find(s => s.specId === selectedSpec.specId);
      if (!currentFullSpec || currentFullSpec.status !== "Approved") {
        // Reset selected spec because this role does not have permission to view it
        setSelectedSpec(null);
        setVersionHistory([]);
      }
    }
  }, [activeRole, selectedSpec, specs, isPM]);

  // --- 5. Actions & State Modifications ---

  // Switch the active workspace role
  const changeRole = useCallback((newRole) => {
    const validRoles = ["PM", "DEV", "QA", "CLIENT"];
    if (validRoles.includes(newRole)) {
      setActiveRole(newRole);
    }
  }, []);

  // Select a spec and retrieve its version history
  const selectSpec = useCallback((spec) => {
    if (!spec) {
      setSelectedSpec(null);
      setVersionHistory([]);
      return;
    }

    // Access control check: Non-PMs cannot select non-approved specs
    if (!isPM() && spec.status !== "Approved") {
      console.warn("Permission denied: Non-PM roles can only view Approved specs.");
      return;
    }

    setSelectedSpec(spec);

    // Fetch version logs from our local state registry
    const history = historyRegistry[spec.specId] || [];
    setVersionHistory(history);
  }, [isPM, historyRegistry]);

  // PM Action: Instantiate a blank template to create a new spec
  const createNewSpec = useCallback(() => {
    if (!isPM()) {
      console.error("Permission denied: Only PMs can create specs.");
      return;
    }

    const newTemplate = {
      specId: "", // Empty to indicate unsaved new spec
      title: "",
      version: "v1",
      status: "Draft",
      createdBy: "Sarah Chen (Lead PM)",
      createdAt: new Date().toISOString(),
      originalPrompt: "",
      content: {
        userStories: [],
        acceptanceCriteria: [],
        functionalRequirements: [],
        nonFunctionalRequirements: []
      }
    };
    setSelectedSpec(newTemplate);
    setVersionHistory([]);
  }, [isPM]);

  // PM Action: Save changes to a spec (inserts new or updates existing with a version bump)
  const saveSpec = useCallback((updatedSpec) => {
    if (!isPM()) {
      console.error("Permission denied: Only PMs can edit and save specs.");
      return false;
    }

    if (!updatedSpec.title.trim()) {
      alert("Specification Title is required.");
      return false;
    }

    let savedSpec = { ...updatedSpec };
    const timestamp = new Date().toISOString();

    if (!savedSpec.specId) {
      // 1. Create a brand new specification
      const newId = `spec-${Date.now()}`;
      savedSpec.specId = newId;
      savedSpec.createdAt = timestamp;
      savedSpec.createdBy = "Sarah Chen (Lead PM)";
      savedSpec.version = "v1";
      savedSpec.status = "Draft";

      // Append to specs list
      setSpecs(prev => [...prev, savedSpec]);

      // Create initial version history log
      const initialLog = {
        version: "v1",
        timestamp,
        author: savedSpec.createdBy,
        changeSummary: "Created initial specification draft.",
        status: savedSpec.status,
        content: JSON.parse(JSON.stringify(savedSpec.content)) // deep clone content
      };

      setHistoryRegistry(prev => ({
        ...prev,
        [newId]: [initialLog]
      }));
      setVersionHistory([initialLog]);
      setSelectedSpec(savedSpec);
    } else {
      // 2. Edit an existing specification - Version Bump
      const currentVerNum = parseInt(savedSpec.version.replace('v', '')) || 1;
      const nextVer = `v${currentVerNum + 1}`;
      
      savedSpec.version = nextVer;
      savedSpec.createdAt = timestamp; // update modification time

      // Update specs master list
      setSpecs(prev => prev.map(s => s.specId === savedSpec.specId ? savedSpec : s));

      // Append new entry to the version history registry
      const newHistoryEntry = {
        version: nextVer,
        timestamp,
        author: "Sarah Chen (Lead PM)",
        changeSummary: `Updated specification to version ${nextVer}.`,
        status: savedSpec.status,
        content: JSON.parse(JSON.stringify(savedSpec.content))
      };

      setHistoryRegistry(prev => {
        const currentLogs = prev[savedSpec.specId] || [];
        return {
          ...prev,
          [savedSpec.specId]: [newHistoryEntry, ...currentLogs] // prepend latest changes
        };
      });

      setVersionHistory(prev => [newHistoryEntry, ...prev]);
      setSelectedSpec(savedSpec);
    }

    return savedSpec;
  }, [isPM]);

  // PM Action: Transition status to Approved
  const approveSpec = useCallback((specId) => {
    if (!isPM()) {
      console.error("Permission denied: Only PMs can approve specs.");
      return;
    }

    setSpecs(prev => prev.map(s => {
      if (s.specId === specId) {
        const approvedSpec = { 
          ...s, 
          status: "Approved",
          version: `v${(parseInt(s.version.replace('v', '')) || 1) + 1}`,
          createdAt: new Date().toISOString()
        };

        // Log this state transition in version history
        const logEntry = {
          version: approvedSpec.version,
          timestamp: approvedSpec.createdAt,
          author: "Sarah Chen (Lead PM)",
          changeSummary: "Approved the specification.",
          status: "Approved",
          content: JSON.parse(JSON.stringify(approvedSpec.content))
        };

        setHistoryRegistry(prevHist => {
          const currentLogs = prevHist[specId] || [];
          return {
            ...prevHist,
            [specId]: [logEntry, ...currentLogs]
          };
        });

        setVersionHistory(prevHist => [logEntry, ...prevHist]);
        
        if (selectedSpec && selectedSpec.specId === specId) {
          setSelectedSpec(approvedSpec);
        }
        return approvedSpec;
      }
      return s;
    }));
  }, [isPM, selectedSpec]);

  // PM Action: Transition status to In Review
  const submitForReview = useCallback((specId) => {
    if (!isPM()) {
      console.error("Permission denied: Only PMs can submit specs for review.");
      return;
    }

    setSpecs(prev => prev.map(s => {
      if (s.specId === specId) {
        const reviewedSpec = { 
          ...s, 
          status: "In Review",
          version: `v${(parseInt(s.version.replace('v', '')) || 1) + 1}`,
          createdAt: new Date().toISOString()
        };

        // Log transition in history
        const logEntry = {
          version: reviewedSpec.version,
          timestamp: reviewedSpec.createdAt,
          author: "Sarah Chen (Lead PM)",
          changeSummary: "Submitted specification for technical review.",
          status: "In Review",
          content: JSON.parse(JSON.stringify(reviewedSpec.content))
        };

        setHistoryRegistry(prevHist => {
          const currentLogs = prevHist[specId] || [];
          return {
            ...prevHist,
            [specId]: [logEntry, ...currentLogs]
          };
        });

        setVersionHistory(prevHist => [logEntry, ...prevHist]);

        if (selectedSpec && selectedSpec.specId === specId) {
          setSelectedSpec(reviewedSpec);
        }
        return reviewedSpec;
      }
      return s;
    }));
  }, [isPM, selectedSpec]);

  // QA Action: Generate BDD Test Cases based on Selected Spec's content
  const generateTestCases = useCallback((specId) => {
    if (!isQA()) {
      console.error("Permission denied: Only QA can generate test cases.");
      return [];
    }

    const targetSpec = specs.find(s => s.specId === specId);
    if (!targetSpec || targetSpec.status !== "Approved") {
      console.warn("Test cases can only be generated for Approved specifications.");
      return [];
    }

    const { userStories, acceptanceCriteria } = targetSpec.content;
    const testCases = [];

    // Map user stories and acceptance criteria into BDD syntax
    userStories.forEach((story, index) => {
      const relatedAC = acceptanceCriteria[index] || acceptanceCriteria[0] || "Verify default system behavior.";
      testCases.push({
        id: `TC-${story.id}`,
        storyId: story.id,
        title: `Test Scenario: ${story.title}`,
        gherkin: `Feature: ${story.title} (${story.id})
  
  Scenario: Validate compliance with core functional criteria
    Given a user acts under the role of the system actor
    When the system receives the prompt and attempts to invoke action for "${story.title}"
    Then verify system completes action within standard limits
    And confirm acceptance condition is met:
      "${relatedAC}"`
      });
    });

    return testCases;
  }, [isQA, specs]);

  // PM Action: Clone approved spec to create a new editable draft version
  const createNewVersion = useCallback((specId) => {
    if (!isPM()) {
      console.error("Permission denied: Only PMs can create new draft versions.");
      return;
    }

    setSpecs(prev => prev.map(s => {
      if (s.specId === specId) {
        const currentVerNum = parseInt(s.version.replace('v', '')) || 1;
        const nextVer = `v${currentVerNum + 1}`;
        const timestamp = new Date().toISOString();

        const draftClone = {
          ...s,
          version: nextVer,
          status: "Draft",
          createdAt: timestamp
        };

        // Create log entry for the history registry
        const logEntry = {
          version: nextVer,
          timestamp,
          author: "Sarah Chen (Lead PM)",
          changeSummary: `Created new draft version ${nextVer} cloned from version ${s.version}.`,
          status: "Draft",
          content: JSON.parse(JSON.stringify(draftClone.content))
        };

        setHistoryRegistry(prevHist => {
          const currentLogs = prevHist[specId] || [];
          return {
            ...prevHist,
            [specId]: [logEntry, ...currentLogs]
          };
        });

        setVersionHistory(prevHist => [logEntry, ...prevHist]);
        setSelectedSpec(draftClone);
        return draftClone;
      }
      return s;
    }));
  }, [isPM]);

  // --- 6. Return Hook Interface ---
  return {
    activeRole,
    selectedSpec,
    specs,
    filteredSpecs: getFilteredSpecs(),
    versionHistory,
    isPM,
    isDev,
    isQA,
    isClient,
    changeRole,
    selectSpec,
    saveSpec,
    approveSpec,
    submitForReview,
    createNewSpec,
    createNewVersion,
    generateTestCases
  };
}
