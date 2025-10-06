import { render } from "@testing-library/react";
import { useEffect } from "react";
import { test, expect, vi } from "vitest";
import { useStore } from "./store";
import { useShallow } from "zustand/react/shallow";

// test("sample", () => {
//     expect(1).toEqual(1);
// }); Example of the unit test

vi.mock("zustand");

function TestComponent({ selector, effect, useShallowHook }) {
    const items = useStore(useShallowHook(selector));

    useEffect(() => {
        effect(items);
    }, [items, effect]);

    return null;
}

test("Should return default value at the start", () => {
    const selector = (store) => store.tasks;
    const effect = vi.fn();
    render(
        <TestComponent
            selector={selector}
            effect={effect}
            useShallowHook={useShallow}
        />
    );
    expect(effect).toHaveBeenCalledWith([]);
});

test("Should add an items to the store and rerun the effect", () => {
    const selector = (store) => ({
        tasks: store.tasks,
        addTask: store.addTask,
    });
    const effect = vi.fn().mockImplementation((items) => {
        if (items.tasks.length === 0) {
            items.addTask("test", "PLANNED");
        }
    });

    render(
        <TestComponent
            selector={selector}
            effect={effect}
            useShallowHook={useShallow}
        />
    );

    expect(effect).toHaveBeenCalledTimes(2);
    expect(effect).toHaveBeenCalledWith(
        expect.objectContaining({
            tasks: [{ id: 1, title: "test", state: "PLANNED" }],
            addTask: expect.any(Function),
        })
    );
});

test("Should delete an items from the store and rerun the effect", () => {
    const selector = (store) => ({
        tasks: store.tasks,
        addTask: store.addTask,
        deleteTask: store.deleteTask,
    });
    let createdTask = false;
    let currentItems;
    const effect = vi.fn().mockImplementation((items) => {
        currentItems = items;
        if (!createdTask) {
            items.addTask("test", "PLANNED");
            createdTask = true;
        } else if (items.tasks.length === 1) {
            items.deleteTask(1);
        }
    });

    render(
        <TestComponent
            selector={selector}
            effect={effect}
            useShallowHook={useShallow}
        />
    );

    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.tasks).toEqual([]);
});

//* Examples of tests, which can be create to test the store

/**
 * This file serves as a configuration module for setting up the Vitest testing environment.
 * It automatically runs before all tests in the project.
 * 
 * ===== WHAT HAPPENS IN THIS FILE =====
 * 
 * 1. IMPORTS:
 *    - expect, afterEach — utilities from Vitest for writing tests and lifecycle hooks
 *    - cleanup — function from @testing-library/react for cleaning up DOM after each test
 *    - matchers — set of additional matchers from jest-dom for checking DOM elements
 * 
 * 2. EXTENDING expect (line 5):
 *    expect.extend(matchers) — adds additional matchers to the standard expect object
 *    from the @testing-library/jest-dom library.
 *    
 *    This enables specialized assertions for DOM elements:
 *    - toBeInTheDocument() — checks if element exists in DOM
 *    - toHaveClass() — checks for CSS class presence
 *    - toBeVisible() — checks element visibility
 *    - toHaveTextContent() — checks text content
 *    - toBeDisabled() — checks if element is disabled
 *    And many other convenient matchers for testing React components.
 * 
 * 3. AUTOMATIC CLEANUP (line 7):
 *    afterEach(cleanup) — registers the cleanup function to be called
 *    automatically after each test.
 *    
 *    What cleanup does:
 *    - Removes all React components rendered during the test
 *    - Clears DOM of test elements
 *    - Prevents memory leaks
 *    - Ensures each test starts with a clean slate
 *    - Isolates tests from each other (one test doesn't affect another)
 * 
 * ===== WHY THIS FILE IS NEEDED =====
 * 
 * Without this file, you would have to:
 * 1. Import jest-dom matchers in every test file
 * 2. Manually call cleanup() after each test
 * 3. Duplicate the same setup code across all tests
 * 
 * Thanks to setupTests.js, all configuration is centralized in one place,
 * and all tests automatically get:
 * - Extended DOM element checking capabilities
 * - Automatic cleanup after execution
 * - Clean and isolated environment for each test
 * 
 * ===== HOW IT WORKS =====
 * 
 * 1. When tests run (npm run test), Vitest automatically finds and executes setupTests.js
 * 2. expect.extend() adds new matchers to the global expect object
 * 3. afterEach() registers a hook that will be called after each test()
 * 4. After that, all tests in the project can use the extended matchers
 * 5. After each test, cleanup() is automatically called to clean up the DOM
 * 
 * This is a best practice for setting up test environments in React applications.
 */