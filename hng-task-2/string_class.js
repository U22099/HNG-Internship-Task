import crypto from "crypto";

class StringStore {
  store_array = [];
  constructor(prev_store_array) {
    this.store_array = [...this.store_array, ...prev_store_array];
  }

  getStringProperties(str_value) {
    if (!str_value) return null;

    return {
      id: crypto.randomUUID(),
      value: str_value,
      properties: {
        length: str_value.length,
        is_palindrome: str_value.toLowerCase() === str_value.toLowerCase().split("").reverse().join(""),
        word_count: str_value.split(" ").length,
        unique_characters: [...new Set(str_value.split(""))].length,
        sha256_hash: this.hashString(str_value),
        character_frequency_map: this.getCharacterFrequencyMap(str_value),
      },
      created_at: new Date().toISOString(),
    };
  }

  hashString(str_value) {
    if (!str_value) return null;

    return crypto.createHash("sha256").update(str_value).digest("hex");
  }

  getCharacterFrequencyMap(str_value) {
    if (!str_value) return null;

    return str_value.split("").reduce((map, char) => {
      map[char] = (map[char] || 0) + 1;
      return map;
    }, {});
  }

  addString(string_value) {
    if(typeof string_value !== "string") return "400";
    else if (this.getString(string_value)) return "409";

    const data = this.getStringProperties(string_value);
    this.store_array.push(data);
  }

  getString(str_value) {
    if (!str_value) return null;

    return this.store_array.find((str) => str && str.value === str_value) || null;
  }

  getFilteredStrings(filter) {
    if (!filter || !Object.keys(filter).length) return null;

    const filtered_result = this.store_array.filter((str) => {
      return (filter.is_palindrome !== undefined
        ? str.properties.is_palindrome === filter.is_palindrome
        : true) &&
        (filter.min_length !== undefined && filter.max_length !== undefined
          ? filter.min_length <= str.properties.length && str.properties.length <= filter.max_length
          : filter.min_length !== undefined
          ? filter.min_length <= str.properties.length
          : filter.max_length !== undefined
          ? filter.max_length >= str.properties.length
          : true) &&
        (filter.word_count !== undefined
          ? str.properties.word_count === filter.word_count
          : true) &&
        (filter.contains_character !== undefined
          ? str.properties.character_frequency_map[filter.contains_character]
          : true);
    });

    return {
      data: filtered_result,
      count: filtered_result.length,
      filters_applied: filter,
    };
  }

  getByNaturalLanguageFilter(input) {
    if (!input) return null;

    let filter;

    switch (input) {
      case "all single word palindromic strings":
        filter = {
          word_count: 1,
          is_palindrome: true,
        };
        break;
      case "strings longer than 10 characters":
        filter = {
          min_length: 11,
        };
        break;
      case "palindromic strings that contain the first vowel":
        filter = {
          is_palindrome: true,
          contains_character: "a",
        };
        break;
      case "strings containing the letter z":
        filter = {
          contains_character: "z",
        };
        break;
      default:
        filter = null;
        break;
    }

    return filter ? this.getFilteredStrings(filter) : "422";
  }

  deleteString(str_value) {
    if (!str_value) return null;
    else if (!this.getString(str_value)) return "404";

    this.store_array = this.store_array.filter(
      (str) => str.value !== str_value
    );
  }
}

export default StringStore;
