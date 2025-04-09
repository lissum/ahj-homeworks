/**
 * @jest-environment jsdom
 */

import Popover from "../Popover";

describe("Popover Component Tests", () => {
  let popoverBtn, myPopover;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="popoverBtn" class="btn">Click to toggle popover</button>
    `;
    popoverBtn = document.getElementById("popoverBtn");

    popoverBtn.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 100,
      height: 30,
    }));

    myPopover = new Popover({
      target: popoverBtn,
      title: "Popover title",
      content: "And here's some amazing content. It's very engaging. Right?",
    });
  });

  afterEach(() => {
    if (myPopover) {
      myPopover.destroy();
    }
  });

  test("Popover should be created with correct options", () => {
    expect(myPopover.title).toBe("Popover title");
    expect(myPopover.content).toBe(
      "And here's some amazing content. It's very engaging. Right?",
    );
    expect(myPopover.target).toBe(popoverBtn);
    expect(myPopover.isVisible).toBe(false);
  });

  test("Popover should show when toggled", () => {
    expect(myPopover.isVisible).toBe(false);
    popoverBtn.dispatchEvent(new Event("click"));
    expect(myPopover.isVisible).toBe(true);
    expect(myPopover.popoverElement.style.display).toBe("block");
  });

  test("Popover should hide when toggled again", () => {
    popoverBtn.dispatchEvent(new Event("click"));
    expect(myPopover.isVisible).toBe(true);
    popoverBtn.dispatchEvent(new Event("click"));
    expect(myPopover.isVisible).toBe(false);
    expect(myPopover.popoverElement.style.display).toBe("none");
  });

  test("Popover should create element with correct content", () => {
    popoverBtn.dispatchEvent(new Event("click"));
    const header = myPopover.popoverElement.querySelector(".popover-header");
    const body = myPopover.popoverElement.querySelector(".popover-body");
    expect(header.textContent).toBe("Popover title");
    expect(body.textContent).toBe(
      "And here's some amazing content. It's very engaging. Right?",
    );
  });

  test("Popover should be destroyed correctly", () => {
    popoverBtn.dispatchEvent(new Event("click"));
    expect(document.querySelector(".popover")).toBeTruthy();
    myPopover.destroy();
    expect(document.querySelector(".popover")).toBe(null);
    expect(myPopover.popoverElement).toBe(null);
    popoverBtn.dispatchEvent(new Event("click"));
    expect(document.querySelector(".popover")).toBe(null);
  });
});
