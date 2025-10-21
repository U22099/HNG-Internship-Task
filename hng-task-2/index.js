import dotenv from "dotenv";
import express from "express";
import StringStore from "./string_class.js";
const app = express();
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const port = process.env.PORT || 3000;

// For accessing the documentations file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Initialize StringStore
const stringStore = new StringStore([]);

// Serve documentation
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "README.md"));
});

// 1. Create/Analyze String
app.post("/strings", async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: "Missing 'value' field in request body" });
    }

    if (typeof value !== "string") {
      return res.status(422).json({ error: "Invalid data type for 'value', must be string" });
    }

    if (stringStore.getString(value)) {
      return res.status(409).json({ error: "String already exists in the system" });
    }

    stringStore.addString(value);
    const stringData = stringStore.getString(value);

    return res.status(201).json(stringData);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Get Specific String
app.get("/strings/:string_value", async (req, res) => {
  try {
    const { string_value } = req.params;
    
    const stringData = stringStore.getString(string_value);
    
    if (!stringData) {
      return res.status(404).json({ error: "String does not exist in the system" });
    }

    return res.status(200).json(stringData);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 3. Get All Strings with Filtering
app.get("/strings", async (req, res) => {
  try {
    const { is_palindrome, min_length, max_length, word_count, contains_character } = req.query;
    
    const filter = {};
    
    if (is_palindrome) {
      if (is_palindrome !== "true" && is_palindrome !== "false") {
        return res.status(400).json({ error: "Invalid value for is_palindrome, must be true or false" });
      }
      filter.is_palindrome = is_palindrome === "true";
    }

    if (min_length) {
      const minLengthNum = parseInt(min_length);
      if (isNaN(minLengthNum) || minLengthNum < 0) {
        return res.status(400).json({ error: "Invalid min_length, must be a non-negative integer" });
      }
      filter.min_length = minLengthNum;
    }

    if (max_length) {
      const maxLengthNum = parseInt(max_length);
      if (isNaN(maxLengthNum) || maxLengthNum < 0) {
        return res.status(400).json({ error: "Invalid max_length, must be a non-negative integer" });
      }
      filter.max_length = maxLengthNum;
    }

    if (word_count) {
      const wordCountNum = parseInt(word_count);
      if (isNaN(wordCountNum) || wordCountNum < 0) {
        return res.status(400).json({ error: "Invalid word_count, must be a non-negative integer" });
      }
      filter.word_count = wordCountNum;
    }

    if (contains_character) {
      if (contains_character.length !== 1) {
        return res.status(400).json({ error: "Invalid contains_character, must be a single character" });
      }
      filter.contains_character = contains_character;
    }

    const result = stringStore.getFilteredStrings(filter);
    
    if (!result) {
      return res.status(400).json({ error: "No filters provided" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 4. Natural Language Filtering
app.get("/strings/filter-by-natural-language", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const result = stringStore.getByNaturalLanguageFilter(query);
    
    if (result === "422") {
      return res.status(422).json({ error: "Query parsed but resulted in conflicting filters" });
    }

    if (!result) {
      return res.status(400).json({ error: "Unable to parse natural language query" });
    }

    return res.status(200).json({
      data: result.data,
      count: result.count,
      interpreted_query: {
        original: query,
        parsed_filters: result.filters_applied
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 5. Delete String
app.delete("/strings/:string_value", async (req, res) => {
  try {
    const { string_value } = req.params;
    
    const result = stringStore.deleteString(string_value);
    
    if (result === "404") {
      return res.status(404).json({ error: "String does not exist in the system" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});