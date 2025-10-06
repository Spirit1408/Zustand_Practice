import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(cleanup);

//* Setup for vitest testing library.

/**
 * This file contains tests for verifying the Zustand store (global state management).
 * Tests check the correctness of store operations, its methods, and reactivity.
 * 
 * ===== FILE STRUCTURE =====
 * 
 * 1. IMPORTS (lines 1-5):
 *    - render — utility for rendering React components in test environment
 *    - useEffect — React hook for performing side effects
 *    - test, expect, vi — Vitest utilities for writing tests and mocking
 *    - useStore — our custom Zustand store for managing tasks
 *    - useShallow — hook from Zustand for optimizing renders (shallow comparison)
 * 
 * 2. MOCKING ZUSTAND (line 11):
 *    vi.mock("zustand") — creates a mock (imitation) of the Zustand library.
 *    
 *    Why this is needed:
 *    - Allows testing the store in an isolated environment
 *    - Each test gets a fresh store instance
 *    - Prevents conflicts between tests (one test doesn't affect another)
 *    - Without mocking, store state would persist between tests
 * 
 * 3. TEST COMPONENT TestComponent (lines 13-21):
 *    Special helper component for testing the store.
 *    
 *    Props:
 *    - selector — function that selects needed parts of the store
 *    - effect — function that executes when selected data changes
 *    - useShallowHook — hook for shallow comparison (usually useShallow)
 *    
 *    How it works:
 *    - useStore(useShallowHook(selector)) — connects to store and gets data
 *    - useShallow prevents unnecessary rerenders (compares objects shallowly)
 *    - useEffect calls effect on every change of store data
 *    - return null — component renders nothing (we only need the logic)
 *    
 *    Why this component:
 *    - Simulates real store usage in a React component
 *    - Allows tracking how many times effect was called (= how many times store updated)
 *    - Enables interaction with store from useEffect
 * 
 * ===== TESTS =====
 * 
 * TEST 1: "Should return default value at the start" (lines 23-34)
 * Checks the initial state of the store.
 * 
 * What happens:
 * 1. A selector is created that selects only tasks from the store
 * 2. A mock effect function is created using vi.fn()
 * 3. TestComponent is rendered with these parameters
 * 4. On first render, useEffect calls effect with current tasks value
 * 5. Verify that effect was called with empty array []
 * 
 * What it checks:
 * - Initial value of tasks should be an empty array
 * - Store initializes correctly
 * 
 * ===== TEST 2: "Should add an items to the store and rerun the effect" (lines 36-62) =====
 * Checks adding a task to store and reactivity.
 * 
 * What happens:
 * 1. Selector selects tasks and addTask method from store
 * 2. effect — mock function with custom implementation:
 *    - Checks if tasks array is empty
 *    - If empty — calls addTask("test", "PLANNED")
 * 3. On first render:
 *    - tasks is empty
 *    - effect is called for the first time
 *    - Inside effect, addTask is called
 * 4. addTask modifies store, adding a new task
 * 5. Store change triggers component rerender
 * 6. On second render:
 *    - tasks contains the new task
 *    - effect is called for the second time
 *    - Condition if (tasks.length === 0) is now false, addTask is not called
 * 
 * Checks:
 * - effect called exactly 2 times (before and after adding)
 * - Second call contains object with:
 *   - tasks: array with one task { id: 1, title: "test", state: "PLANNED" }
 *   - addTask: function
 * 
 * What it verifies:
 * - addTask correctly adds task to store
 * - Store is reactive (changes trigger component updates)
 * - Added task structure is correct (id, title, state)
 * 
 * ===== TEST 3: "Should delete an items from the store and rerun the effect" (lines 64-92) =====
 * Checks deleting a task from store.
 * 
 * What happens:
 * 1. Selector selects tasks, addTask, and deleteTask
 * 2. Flags are used:
 *    - createdTask — tracks whether task has been created
 *    - currentItems — stores latest state for final verification
 * 3. effect with logic in 3 stages:
 *    
 *    First render:
 *    - createdTask = false
 *    - tasks is empty
 *    - addTask("test", "PLANNED") is called
 *    - createdTask becomes true
 *    
 *    Second render:
 *    - Store updated after addTask
 *    - createdTask = true, so first condition is skipped
 *    - tasks.length === 1, so second condition executes
 *    - deleteTask(1) is called
 *    
 *    Third render:
 *    - Store updated after deleteTask
 *    - Both conditions are false
 *    - Just save currentItems for verification
 * 
 * Checks:
 * - effect called exactly 3 times (initial state → after add → after delete)
 * - currentItems.tasks equals [] (task successfully deleted)
 * 
 * What it verifies:
 * - deleteTask correctly removes task from store
 * - Store updates after each operation
 * - Can perform sequence of operations (add → delete)
 * - Final state matches expected (empty array)
 * 
 * ===== KEY CONCEPTS =====
 * 
 * 1. REACTIVITY:
 *    When store changes (via addTask, deleteTask, etc.), all subscribed
 *    components automatically rerender with new data. Tests verify that
 *    this mechanism works correctly.
 * 
 * 2. TEST ISOLATION:
 *    vi.mock("zustand") ensures each test works with a clean store.
 *    This is critically important: without mocking, test 2 would leave a task in store,
 *    and test 3 would not start with an empty array.
 * 
 * 3. CALL COUNTING:
 *    effect.toHaveBeenCalledTimes() allows precise tracking of how many times
 *    component updated. This verifies that store doesn't cause unnecessary updates
 *    and updates exactly when needed.
 * 
 * 4. useShallow:
 *    Optimizes store usage — component updates only if its needed data
 *    changed (shallow comparison instead of reference equality).
 * 
 * 5. MOCK IMPLEMENTATION:
 *    vi.fn().mockImplementation() creates a spy function that:
 *    - Executes custom logic
 *    - Tracks all calls
 *    - Allows making assertions (checks)
 * 
 * ===== TESTING PATTERN =====
 * 
 * All three tests follow the same pattern:
 * 1. Arrange (Preparation):
 *    - Create selector to choose needed data
 *    - Create effect with test logic
 * 2. Act (Action):
 *    - Render TestComponent
 *    - Inside effect, perform operations with store
 * 3. Assert (Verification):
 *    - Check number of effect calls
 *    - Check final store state
 * 
 * This is called the AAA pattern (Arrange-Act-Assert) — a best practice in testing.
 * 
 * ===== WHY THESE TESTS ARE NEEDED =====
 * 
 * 1. Guarantee that store works correctly
 * 2. Prevent regressions (accidental breaking of functionality during changes)
 * 3. Document expected store behavior
 * 4. Allow safe code refactoring
 * 5. Provide confidence that basic functionality works properly
 * 
 * These tests cover basic CRUD operations (Create, Read, Delete) for the store.
 */