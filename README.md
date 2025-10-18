# HNG Internship Backend: User Profile and Cat Fact API

## Overview
Welcome to the HNG Internship Backend project! 🎉 This Node.js Express API serves as a robust backend service designed to provide essential user profile details alongside intriguing, dynamic cat facts. It showcases efficient environment variable management with `dotenv`, external API integration, and comprehensive error handling, making it a reliable foundation for any web application.

## Features
*   👤 **User Profile Retrieval**: A dedicated endpoint `/me` securely fetches and displays pre-configured user information (name, email, and stack).
*   💡 **Dynamic Cat Facts**: Seamlessly integrates with an external API (`https://catfact.ninja/fact`) to deliver a new cat fact with each request, adding a touch of delight.
*   🛡️ **Environment Variable Management**: Utilizes `dotenv` for secure and flexible configuration, ensuring sensitive data and API keys are not hardcoded.
*   🌐 **Express.js API**: Built on the fast, unopinionated, and minimalist web framework for Node.js, providing a clear and efficient API structure.
*   ⏰ **Automatic Timestamping**: Each response includes a current ISO-formatted timestamp, offering useful context for when the data was retrieved.
*   ✅ **Robust Error Handling**: Implements graceful error handling for scenarios like missing environment variables or failures in external API calls, providing informative responses.

## Technologies Used
This project leverages the following key technologies:

| Technology   | Description                                                           |
| :----------- | :-------------------------------------------------------------------- |
| Node.js      | An open-source, cross-platform JavaScript runtime environment.        |
| Express.js   | A minimalist and flexible Node.js web application framework.          |
| dotenv       | A zero-dependency module that loads environment variables from a `.env` file. |

## Getting Started

### Installation
To get a local copy of this project up and running, follow these simple steps:

1.  ⬇️ **Clone the Repository**:
    ```bash
    git clone <YOUR_REPOSITORY_URL_HERE>
    cd hng-internship-task
    ```

2.  📦 **Install Dependencies**:
    Navigate into the project directory and install the required Node.js packages using npm:
    ```bash
    npm install
    ```

### Environment Variables
This project relies on environment variables for configuration. Create a file named `.env` in the root directory of your project and populate it with the following variables:

*   `PORT`: The port number on which the Express server will listen.
    *Example*: `PORT=3000`
*   `API_URL`: The URL of the external API used to fetch cat facts.
    *Example*: `API_URL=https://catfact.ninja/fact`
*   `NAME`: Your full name to be displayed in the `/me` endpoint response.
    *Example*: `NAME="Daniel Ugochukwu"`
*   `EMAIL`: Your email address to be displayed in the `/me` endpoint response.
    *Example*: `EMAIL="daniel.ugochukwu@example.com"`
*   `STACK`: Your primary technology stack or role to be displayed in the `/me` endpoint response.
    *Example*: `STACK="Node.js Backend Developer"`

**Example `.env` file:**
```
PORT=3000
API_URL=https://catfact.ninja/fact
NAME="Daniel Ugochukwu"
EMAIL="daniel.ugochukwu@example.com"
STACK="Node.js Backend Developer"
```

## Usage
Once the installation is complete and your environment variables are configured, you can start the development server.

To start the server:
```bash
npm run dev
```
You will see a confirmation message in your console, indicating that the server has started. The API will then be accessible at `http://localhost:<PORT>` (e.g., `http://localhost:3000` if `PORT` is `3000`).

You can now interact with the API endpoints using a web browser for GET requests, or through API testing tools like Postman, Insomnia, or `curl`.

---

# HNG Internship Backend API

## Overview
This Node.js Express API serves as a foundational service, exposing a `/me` endpoint that retrieves configured user profile details (name, email, stack) combined with a dynamic cat fact fetched from an external API, showcasing environment variable integration and robust error handling.

## Features
- Node.js: Serves as the JavaScript runtime environment for server-side logic.
- Express.js: Provides a minimalistic web framework for defining API routes and handling requests.
- dotenv: Manages environment-specific configurations by loading variables from a `.env` file.
- External API Integration: Facilitates fetching and incorporating data from a third-party service.

## Getting Started
### Installation
1.  Clone the repository:
    ```bash
    git clone <YOUR_REPOSITORY_URL_HERE>
    cd hng-internship-task
    ```
2.  Install project dependencies:
    ```bash
    npm install
    ```

### Environment Variables
The application requires the following environment variables to be defined in a `.env` file located at the root of the project:

- `PORT`: The port number the Express server will listen on.
  *Example*: `PORT=3000`
- `API_URL`: The URL of the external API endpoint used to retrieve cat facts.
  *Example*: `API_URL=https://catfact.ninja/fact`
- `NAME`: The name of the user to be displayed by the `/me` endpoint.
  *Example*: `NAME="Daniel Ugochukwu"`
- `EMAIL`: The email address of the user to be displayed by the `/me` endpoint.
  *Example*: `EMAIL="daniel.ugochukwu@example.com"`
- `STACK`: The technology stack or role of the user to be displayed by the `/me` endpoint.
  *Example*: `STACK="Node.js Backend Developer"`

## API Documentation
### Base URL
`http://localhost:<PORT>` (Replace `<PORT>` with your configured port, e.g., `http://localhost:3000`)

### Endpoints
#### GET /me
Retrieves detailed user profile information, the current timestamp, and a random cat fact.

**Request**:
No request body is required. This endpoint expects no parameters in the URL or body.

**Response**:
*Success Response (HTTP 200 OK)*:
```json
{
  "status": "success",
  "user": {
    "email": "daniel.ugochukwu@example.com",
    "name": "Daniel Ugochukwu",
    "stack": "Node.js Backend Developer"
  },
  "timestamp": "2023-10-27T10:30:00.000Z",
  "fact": "Cats can make over 100 different sounds whereas dogs can only make 10."
}
```

**Errors**:
- `HTTP 500 Internal Server Error`: This status is returned under two main conditions:
  - If any of the essential environment variables (`NAME`, `EMAIL`, `STACK`) are not configured.
  - If the external cat fact API call fails due to network issues, invalid URL, or an error response from the third-party service.

  *Example Response for missing environment variables*:
  ```json
  {
    "status": "error",
    "user": {
      "email": null,
      "name": null,
      "stack": null
    },
    "timestamp": "2023-10-27T10:30:00.000Z",
    "error": "Environment variables not found"
  }
  ```
  *Example Response for external API error*:
  ```json
  {
    "status": "error",
    "user": {
      "email": "daniel.ugochukwu@example.com",
      "name": "Daniel Ugochukwu",
      "stack": "Node.js Backend Developer"
    },
    "timestamp": "2023-10-27T10:30:00.000Z",
    "error": "Error fetching cat fact"
  }
  ```

---

## Contributing
Contributions are welcome! If you have suggestions for improvements or encounter any issues, feel free to open an issue or submit a pull request.

Here's how you can contribute:

1.  🍴 **Fork the Project**:
    Click the "Fork" button at the top right of this repository.

2.  🌿 **Create your Feature Branch**:
    ```bash
    git checkout -b feature/AmazingFeature
    ```

3.  🚀 **Commit your Changes**:
    ```bash
    git commit -m 'feat: Add some AmazingFeature'
    ```

4.  ⬆️ **Push to the Branch**:
    ```bash
    git push origin feature/AmazingFeature
    ```

5.  🤝 **Open a Pull Request**:
    Detail your changes and why they should be merged.

## License
This project is licensed under the ISC License. See the `package.json` file for more details.

## Author Info
**Daniel (u22099)**

Connect with me:
*   LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/yourusername) (placeholder)
*   Twitter: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle) (placeholder)

## Badges
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-blue?logo=express&logoColor=white)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)