# PostaBlog

This is a simple blog application built using React.js, demonstrating various functionalities such as prop drilling, React Router, custom hooks, and integration with a mock API using Axios and JSON Server.

## Features

- **Listing Posts**: Displaying a list of blog posts fetched from a mock API.
- **Viewing Post Details**: Navigating to view details of a specific post.
- **Editing Posts**: Editing existing posts with a form.
- **Creating New Posts**: Adding new posts via a form.
- **Deleting Posts**: Removing posts from the list.

## Technologies Used

- React.js: Frontend framework for building the user interface.
- React Router: Declarative routing for navigating between pages/components.
- Axios: Promise-based HTTP client for making API requests.
- JSON Server: Mock API server to simulate backend operations.
- HTML/CSS: Basic styling and structure for the frontend.

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blog
   
2. **Important**
    ```
    npx json-server -p 3500 -w data.db/json to run json-server
