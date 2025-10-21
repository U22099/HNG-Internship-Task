# String Analytics API ✨

## Overview
This is a robust Node.js Express API engineered for efficient string management, comprehensive analysis, and advanced filtering capabilities. It leverages an in-memory data store to perform real-time operations, including dynamic property generation, standard filtering, and innovative natural language query processing.

## Features
*   **String Storage & Management**: Securely add, retrieve, and delete string data points within the system.
*   **Comprehensive String Analysis**: Automatically computes key string properties such as length, palindrome status, word count, unique characters, SHA256 hash, and character frequency map upon creation.
*   **Advanced Filtering**: Offers precise control over data retrieval with filters based on palindrome status, string length ranges, word count, and specific character containment.
*   **Natural Language Processing (NLP) Filtering**: Interprets human-like queries to dynamically apply complex filters, enhancing usability and data accessibility.
*   **RESTful Interface**: Provides a clean and intuitive API following REST principles for easy integration and interaction.

## Getting Started

### Installation
To get this project up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/U22099/HNG-Internship-Task.git
    cd HNG-Internship-Task/hng-task-2
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Environment Variables
This project requires specific environment variables to function correctly. Create a `.env` file in the root directory and populate it with the following:

| Variable | Example Value | Description                                 |
| :------- | :------------ | :------------------------------------------ |
| `PORT`   | `3000`        | The port number the Express server will run on. |

## Usage
After completing the installation and setting up your environment variables, you can start the API server.

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    The server will typically start on `http://localhost:3000` (or your specified `PORT`).

2.  **Accessing API Documentation**:
    You can view the basic `Task.md` documentation by navigating to the base URL in your browser: `http://localhost:3000/`.

3.  **Interacting with the API**:
    Refer to the **API Documentation** section below for detailed information on available endpoints, request formats, and response structures.

    Example `curl` command to create a new string:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"value": "hello world"}' http://localhost:3000/strings
    ```

## API Documentation

### Base URL
`http://localhost:[PORT]`

### Endpoints

#### `POST /strings`
Adds a new string to the store and returns its calculated properties.

**Request**:
```json
{
  "value": "string"
}
```
*   `value` (string, required): The string to be added and analyzed.

**Response**:
```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "word_count": 2,
    "unique_characters": 8,
    "sha256_hash": "b94d27b9934d041c52e42517616b2510b6567299a9a835a4d46c269ce0a66d04",
    "character_frequency_map": {
      "h": 1, "e": 1, "l": 3, "o": 2, " ": 1, "w": 1, "r": 1, "d": 1
    }
  },
  "created_at": "2023-10-27T10:00:00.000Z"
}
```

**Errors**:
*   `400 Bad Request`: Missing 'value' field in request body.
*   `422 Unprocessable Entity`: Invalid data type for 'value', must be string.
*   `409 Conflict`: String already exists in the system.
*   `500 Internal Server Error`: Generic server error.

#### `GET /strings/:string_value`
Retrieves the properties of a specific string by its value.

**Request**:
None (string_value is a path parameter)

**Response**:
```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "word_count": 2,
    "unique_characters": 8,
    "sha256_hash": "b94d27b9934d041c52e42517616b2510b6567299a9a835a4d46c269ce0a66d04",
    "character_frequency_map": {
      "h": 1, "e": 1, "l": 3, "o": 2, " ": 1, "w": 1, "r": 1, "d": 1
    }
  },
  "created_at": "2023-10-27T10:00:00.000Z"
}
```

**Errors**:
*   `404 Not Found`: String does not exist in the system.
*   `500 Internal Server Error`: Generic server error.

#### `GET /strings`
Retrieves a list of strings based on specified filter criteria.

**Request**:
Query parameters (all optional):
*   `is_palindrome` (boolean string): `true` or `false` to filter by palindrome status.
*   `min_length` (integer): Minimum length of strings to retrieve.
*   `max_length` (integer): Maximum length of strings to retrieve.
*   `word_count` (integer): Exact word count of strings to retrieve.
*   `contains_character` (string): A single character that strings must contain.

**Response**:
```json
{
  "data": [
    {
      "id": "uuid-1",
      "value": "racecar",
      "properties": {
        "length": 7, "is_palindrome": true, "word_count": 1, "unique_characters": 4,
        "sha256_hash": "...", "character_frequency_map": { "r": 2, "a": 2, "c": 2, "e": 1 }
      },
      "created_at": "2023-10-27T10:00:00.000Z"
    },
    {
      "id": "uuid-2",
      "value": "madam",
      "properties": {
        "length": 5, "is_palindrome": true, "word_count": 1, "unique_characters": 3,
        "sha256_hash": "...", "character_frequency_map": { "m": 2, "a": 2, "d": 1 }
      },
      "created_at": "2023-10-27T10:01:00.000Z"
    }
  ],
  "count": 2,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5
  }
}
```

**Errors**:
*   `400 Bad Request`: Invalid value for filter (e.g., `is_palindrome` not 'true'/'false', `min_length` not a non-negative integer, `contains_character` not a single character).
*   `500 Internal Server Error`: Generic server error.

#### `GET /strings/filter-by-natural-language`
Retrieves a list of strings by interpreting a natural language query.

**Request**:
Query parameters:
*   `query` (string, required): A natural language phrase describing the desired string filters.
    *   Examples: "all single word palindromic strings", "strings longer than 10 characters", "palindromic strings that contain the first vowel", "strings containing the letter z".

**Response**:
```json
{
  "data": [
    {
      "id": "uuid-1",
      "value": "level",
      "properties": {
        "length": 5, "is_palindrome": true, "word_count": 1, "unique_characters": 3,
        "sha256_hash": "...", "character_frequency_map": { "l": 2, "e": 2, "v": 1 }
      },
      "created_at": "2023-10-27T10:00:00.000Z"
    }
  ],
  "count": 1,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}
```

**Errors**:
*   `400 Bad Request`: Missing 'query' parameter or unable to parse natural language query.
*   `422 Unprocessable Entity`: Query parsed but resulted in conflicting filters.
*   `500 Internal Server Error`: Generic server error.

#### `DELETE /strings/:string_value`
Deletes a specific string from the store by its value.

**Request**:
None (string_value is a path parameter)

**Response**:
`204 No Content` (Empty response body upon successful deletion)

**Errors**:
*   `404 Not Found`: String does not exist in the system.
*   `500 Internal Server Error`: Generic server error.

## Technologies Used
| Technology | Description                                        |
| :--------- | :------------------------------------------------- |
| Node.js    | JavaScript runtime for server-side execution.      |
| Express.js | Fast, unopinionated, minimalist web framework for Node.js. |
| dotenv     | Loads environment variables from a `.env` file.    |
| Crypto     | Node.js built-in module for cryptographic functions like hashing. |

## Contributing
We welcome contributions to enhance this project! If you're looking to contribute, please follow these guidelines:

*   👯 **Fork the repository**: Start by forking the project to your GitHub account.
*   🌿 **Create a new branch**: For each new feature or bug fix, create a dedicated branch (e.g., `feature/add-new-filter` or `fix/natural-language-parser`).
*   📝 **Write clear commit messages**: Ensure your commit messages are descriptive and explain the purpose of your changes.
*   🧪 **Add/Update tests**: If you're adding new functionality, please include corresponding tests. If you're fixing a bug, ensure there's a test that exposes it.
*   ⬆️ **Submit a Pull Request**: Once your changes are ready, submit a pull request to the `main` branch. Provide a clear description of your changes and why they are necessary.

## License
This project is licensed under the ISC License. See the `LICENSE` file for more details.

## Author Info
**Daniel (u22099)**

Connect with me:
*   LinkedIn: [Your LinkedIn Profile]
*   Twitter: [Your Twitter Handle]

---
[![Node.js Version](https://img.shields.io/badge/Node.js-18.x-brightgreen)](https://nodejs.org/en/)
[![Express.js Version](https://img.shields.io/badge/Express.js-5.x-blue)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)