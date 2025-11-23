import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

it("shows Orientation card", () => {
  render(<Page />);
  expect(screen.getByText(/7 things you should do/i)).toBeInTheDocument();
});
