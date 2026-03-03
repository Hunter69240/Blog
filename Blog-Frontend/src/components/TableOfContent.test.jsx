import { fireEvent, render, screen } from "@testing-library/react";
import { expect, vi, describe, it, afterEach } from "vitest";
import TableOfContent from "./TableOfContent";


window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("TableOfContent scroll behavior", () => {

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("scrolls to section when heading is clicked", () => {

    const headings = [
      { id: "intro", text: "Intro", level: 1 }
    ];

    
    const section = document.createElement("div");
    section.id = "intro";
    document.body.appendChild(section);

    render(<TableOfContent isDesktop={true} headings={headings} />);

    fireEvent.click(screen.getByText("Intro"));

    expect(window.HTMLElement.prototype.scrollIntoView)
      .toHaveBeenCalled();
  });

});