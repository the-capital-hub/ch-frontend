import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import designReducer from "./Store/features/design/designSlice";
import { BrowserRouter } from "react-router-dom";


jest.mock("./pages/ChatPages/Chats/Chats", () => () => <div>Chats Page</div>);
jest.mock("./routes/PublicRoutes", () => () => <div>Public Routes</div>);
jest.mock("./routes/StartUpRoutes", () => () => <div>StartUp Routes</div>);
jest.mock("./pages/Error/NotFound404/NotFound404", () => () => (
  <div>404 Not Found</div>
));

// Create a mock Redux store
const mockStore = configureStore({
  reducer: {
    design: designReducer,
  },
});

describe("App Component", () => {
  test("renders Public Routes", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Public Routes")).toBeInTheDocument();
  });

  test("renders Chats Page when navigating to /chats", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText("Chats Page")).toBeNull(); // Not rendered by default
    window.history.pushState({}, "Chats", "/chats");
    expect(screen.getByText("Chats Page")).toBeInTheDocument();
  });

  test("renders 404 Not Found for invalid route", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    window.history.pushState({}, "Invalid Route", "/some-invalid-route");
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });
});
