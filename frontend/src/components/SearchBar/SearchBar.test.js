import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

// Mock the onSearch function
const mockOnSearch = jest.fn();

describe("SearchBar Component", () => {
  test("renders the input field and button correctly", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Check if input field is in the document
    const inputElement = screen.getByLabelText(/select date/i);
    expect(inputElement).toBeInTheDocument();

    // Check if button is in the document
    const buttonElement = screen.getByRole("button", { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("allows user to select a date and submit the form", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Change the input value
    const inputElement = screen.getByLabelText(/select date/i);
    fireEvent.change(inputElement, { target: { value: "2024-01-01" } });
    expect(inputElement.value).toBe("2024-01-01");

    // Click the search button
    const buttonElement = screen.getByRole("button", { name: /search/i });
    fireEvent.click(buttonElement);

    // Check if onSearch was called with the correct date
    expect(mockOnSearch).toHaveBeenCalledWith("2024-01-01");
  });

  test("does not call onSearch if date input is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Clear the input value
    const inputElement = screen.getByLabelText(/select date/i);
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(inputElement.value).toBe("");

    // Click the search button
    const buttonElement = screen.getByRole("button", { name: /search/i });
    fireEvent.click(buttonElement);

    // Ensure that onSearch is not called
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
