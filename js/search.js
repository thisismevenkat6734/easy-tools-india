"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#tool-search-form");
  const searchInput = document.querySelector("#tool-search");
  const toolCards = Array.from(document.querySelectorAll(".tool-card"));
  const noResults = document.querySelector("#no-results");

  if (!searchInput || toolCards.length === 0) {
    return;
  }

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  const getSearchText = (card) => {
    const explicitText = card.dataset.search || "";
    const visibleText = card.textContent || "";
    return normalize(`${explicitText} ${visibleText}`);
  };

  const filterTools = () => {
    const query = normalize(searchInput.value);
    let visibleCount = 0;

    toolCards.forEach((card) => {
      const matches = !query || getSearchText(card).includes(query);

      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  };

  searchInput.addEventListener("input", filterTools);

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      filterTools();
    });
  }

  filterTools();
});
