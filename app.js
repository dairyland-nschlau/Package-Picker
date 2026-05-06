const CATEGORY_DEFINITIONS = [
  {
    key: "proximate-analysis",
    label: "Proximate analysis",
    items: [
      "Dry Matter",
      "Moisture",
      { raw: "CP", display: "Crude protein" },
      "ADF",
      "aNDF",
      "aNDFom",
      "Fat (EE)",
      { raw: "Total fatty acids", display: "Total fatty acids (TFA)" },
      "Ash",
      "Starch",
      "Sugar (ESC)",
      "Sugar (WSC)",
      "Crude Fiber",
      { raw: "Lactose", display: "Lactose (WSC method)" },
      "Lignin",
      { raw: "Organic Matter", display: "Organic Matter (100 - Ash)" }
    ]
  },
  {
    key: "protein",
    label: "Protein",
    items: [
      { raw: "CP", display: "Crude protein" },
      "ADICP",
      "NDICPss",
      "Ammonia",
      { raw: "SCP", display: "Protein solubility" },
      "NPN",
      "Prolamin",
      { raw: "Total amino acid", display: "Total amino acids" },
      "Lysine",
      "Methionine",
      "Histidine",
      "Leucine",
      "Isoleucine",
      "Valine",
      "Alanine",
      "Arginine",
      "Aspartic Acid",
      "Cysteine",
      "Glutamic Acid",
      "Glycine",
      "Phenylalenine",
      "Proline",
      "Serine",
      "Threonine",
      "Tryptophan",
      "Tyrosine"
    ]
  },
  {
    key: "fiber",
    label: "Fiber",
    items: [
      { raw: "ADF", display: "ADF", aliases: ["Fiber"] },
      { raw: "aNDF", display: "aNDF", aliases: ["Fiber"] },
      { raw: "aNDFom", display: "aNDFom", aliases: ["Fiber"] },
      { raw: "Lignin", display: "Lignin", aliases: ["Fiber"] }
    ]
  },
  {
    key: "fat",
    label: "Fat",
    items: [
      "Fat (EE)",
      "Fat (AH)",
      { raw: "Total fatty acids", display: "Total fatty acids (TFA)" },
      "14:1 Myristoleic",
      "16:0 Palmitic",
      "18:0 Stearic",
      "18:1 Oleic",
      "18:2 Linoleic",
      "18:3 Linolenic",
      "12:0 Lauric",
      "14:0 Myristic",
      "16:1 Palmitoleic",
      "17:0 Margaric",
      "19:0 Nonadecanoic",
      "20:0 Arachidic",
      "20:1 Gadoleic",
      "20:2 Eicosadienoic",
      "20:3 Eicosatrienoic",
      "20:4 Arachidonic",
      "20:5 Eicosapentaenoic",
      "22:0 Behenic",
      "22:1 Erucic",
      "22:6 Docosahexaenoic",
      "24:0 Lignoceric",
      "24:1 Nervonic"
    ]
  },
  {
    key: "minerals",
    label: "Minerals",
    items: [
      "Ash",
      { raw: "Ca", display: "Calcium" },
      { raw: "P", display: "Phosphorus" },
      { raw: "Mg", display: "Magnesium" },
      { raw: "K", display: "Potassium" },
      { raw: "S", display: "Sulfur" },
      { raw: "Cl", display: "Chloride" },
      { raw: "Na", display: "Sodium" },
      { raw: "Zn", display: "Zinc" },
      { raw: "Mn", display: "Manganese" },
      { raw: "Cu", display: "Copper" },
      { raw: "Fe", display: "Iron" },
      { raw: "Al", display: "Aluminum" },
      "Boron",
      "Salt (Cl as %NaCl)",
      { raw: "Mo", display: "Molybdenum" }
    ]
  },
  {
    key: "fermentation-quality",
    label: "Fermentation quality",
    items: [
      "Dry Matter",
      "Moisture",
      "pH",
      "Ammonia",
      "Lactic",
      "Acetic",
      "Propionic",
      "Iso-Butyric Acid",
      "Butyric",
      "1,2 Propanediol",
      "Ethanol",
      "Methanol",
      "Propanol",
      "Butanol"
    ]
  },
  {
    key: "digestibility",
    label: "Digestibility",
    items: [
      { raw: "IVSD7-o", display: "IVSD7", aliases: ["Starch"] },
      pairDigestibility(12),
      pairDigestibility(24),
      pairDigestibility(30),
      pairDigestibility(48),
      pairDigestibility(72),
      pairDigestibility(120),
      pairDigestibility(240),
      { raw: "Ross 16hRUP", display: "Ross 16hRUP", aliases: ["CP", "Crude protein", "Protein"] },
      { raw: "Ross UCP", display: "16h Ross UCP", aliases: ["Crude protein", "Protein"] }
    ]
  }
];

const EXCLUDED_NIR_NAME_PARTS = ["Calibrate", "Big Gain", "Plot", "Select24", "Select48", "Equine", "VFA Screen"];
const BASE_FEE_AMOUNT = 7;
const ALWAYS_INCLUDED_NIR_FIELDS = ["Dry Matter", "Moisture"];
const EXCLUDED_NIR_PACKAGE_NAMES = ["IVSD7-O"];
const FEED_TYPE_SEARCH_ALIASES = [
  { term: "maize", match: "corn" },
  { term: "soya", match: "soy" },
  { term: "oaten", match: "oat" }
];

const state = {
  categories: [],
  itemMap: new Map(),
  chemistryPackages: [],
  nirPackages: [],
  products: [],
  productLookup: new Map(),
  selectedItems: new Set(),
  searchTerm: "",
  currentProductId: "",
  feedTypeDropdownOpen: false,
  chemistryOnly: false
};

const elements = {
  feedTypeDropdown: document.getElementById("feedTypeDropdown"),
  feedTypeInput: document.getElementById("feedTypeInput"),
  feedTypeToggle: document.getElementById("feedTypeToggle"),
  feedTypeList: document.getElementById("feedTypeList"),
  chemistryOnlyToggle: document.getElementById("chemistryOnlyToggle"),
  nutrientSearch: document.getElementById("nutrientSearch"),
  clearSelections: document.getElementById("clearSelections"),
  selectionSummary: document.getElementById("selectionSummary"),
  selectedChips: document.getElementById("selectedChips"),
  categoryContainer: document.getElementById("categoryContainer"),
  loadingState: document.getElementById("loadingState"),
  resultsState: document.getElementById("resultsState"),
  resultCardTemplate: document.getElementById("resultCardTemplate")
};

initialize().catch((error) => {
  elements.loadingState.textContent = `Unable to load package data: ${error.message}`;
});

async function initialize() {
  const [packagesRows, packageFieldRows, nirRows, productsRows] = await Promise.all([
    loadCsv("packages.csv"),
    loadCsv("package_result_fields.csv"),
    loadCsv("NIR_package_product_parameters.csv"),
    loadCsv("products.csv")
  ]);

  const dataIndex = buildDataIndex(packagesRows, packageFieldRows, nirRows, productsRows);
  state.categories = dataIndex.categories;
  state.itemMap = dataIndex.itemMap;
  state.chemistryPackages = dataIndex.chemistryPackages;
  state.nirPackages = dataIndex.nirPackages;
  state.products = dataIndex.products;
  state.productLookup = dataIndex.productLookup;
  state.currentProductId = "";

  bindEvents();
  renderProductOptions();
  renderSelections();
  renderCategories();
  renderResults();

  elements.loadingState.classList.add("hidden");
  elements.resultsState.classList.remove("hidden");
}

function bindEvents() {
  const updateSelectedFeedType = () => {
    const typedValue = elements.feedTypeInput.value.trim();
    const matchedProduct = state.products.find((product) => product.name === typedValue);
    if (matchedProduct) {
      state.currentProductId = matchedProduct.productId;
      elements.feedTypeInput.value = matchedProduct.name;
    } else {
      const fallbackProduct = getOtherFeedTypeProduct();
      state.currentProductId = fallbackProduct?.productId ?? "";
      elements.feedTypeInput.value = fallbackProduct ? "Other" : "";
    }
    state.feedTypeDropdownOpen = false;
    renderFeedTypeDropdown();
    renderResults();
  };

  elements.feedTypeInput.addEventListener("input", () => {
    state.feedTypeDropdownOpen = true;
    renderFeedTypeDropdown();
  });
  elements.feedTypeInput.addEventListener("focus", () => {
    state.feedTypeDropdownOpen = true;
    renderFeedTypeDropdown();
  });
  elements.feedTypeInput.addEventListener("change", updateSelectedFeedType);
  elements.feedTypeToggle.addEventListener("click", () => {
    state.feedTypeDropdownOpen = !state.feedTypeDropdownOpen;
    renderFeedTypeDropdown();
    if (state.feedTypeDropdownOpen) {
      elements.feedTypeInput.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (elements.feedTypeDropdown.contains(event.target)) {
      return;
    }

    if (state.feedTypeDropdownOpen) {
      updateSelectedFeedType();
    }
  });

  elements.nutrientSearch.addEventListener("input", () => {
    state.searchTerm = elements.nutrientSearch.value.trim().toLowerCase();
    renderCategories();
  });

  elements.chemistryOnlyToggle.addEventListener("change", () => {
    state.chemistryOnly = elements.chemistryOnlyToggle.checked;
    renderResults();
  });

  elements.clearSelections.addEventListener("click", () => {
    state.selectedItems.clear();
    state.currentProductId = "";
    elements.feedTypeInput.value = "";
    state.searchTerm = "";
    elements.nutrientSearch.value = "";
    state.feedTypeDropdownOpen = false;
    state.chemistryOnly = false;
    elements.chemistryOnlyToggle.checked = false;
    renderSelections();
    renderFeedTypeDropdown();
    renderCategories();
    renderResults();
  });
}

function buildDataIndex(packagesRows, packageFieldRows, nirRows, productsRows) {
  const { categories, itemMap, fieldToItemIds } = buildCategoryIndex();
  const alwaysIncludedNirIds = ALWAYS_INCLUDED_NIR_FIELDS.flatMap((field) => Array.from(fieldToItemIds.get(field) ?? []));

  const rawProducts = productsRows
    .map((row) => ({
      productId: cleanValue(row.product_id),
      parentId: cleanValue(row.parent_id),
      code: cleanValue(row.code),
      name: cleanValue(row.name),
      order: Number.parseInt(cleanValue(row.order), 10) || 9999
    }))
    .filter((product) => product.productId && product.name);

  const productLookup = new Map(rawProducts.map((product) => [product.productId, product]));
  const productsInNir = new Set(
    nirRows
      .map((row) => cleanValue(row.Product))
      .filter(Boolean)
  );
  const products = rawProducts
    .map((product) => {
      const nirLookupNames = buildProductLookupNames(product, productLookup);
      const hasNirAvailability = nirLookupNames.some((name) => productsInNir.has(name));
      return {
        ...product,
        nirLookupNames,
        hasNirAvailability,
        sortKey: buildProductSortKey(product, productLookup)
      };
    })
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.name.localeCompare(b.name));
  const dedupedProducts = [];
  const seenProductNames = new Set();
  products.forEach((product) => {
    const key = product.name.toLowerCase();
    if (seenProductNames.has(key)) {
      return;
    }
    seenProductNames.add(key);
    dedupedProducts.push(product);
  });

  const fieldMap = new Map();
  packageFieldRows.forEach((row) => {
    const packageId = cleanValue(row.package_id);
    const resultField = cleanValue(row.Result_field);
    if (!packageId || !resultField || !fieldToItemIds.has(resultField)) {
      return;
    }

    if (!fieldMap.has(packageId)) {
      fieldMap.set(packageId, new Set());
    }

    fieldToItemIds.get(resultField).forEach((itemId) => fieldMap.get(packageId).add(itemId));
  });

  const nirAvailability = new Map();
  nirRows.forEach((row) => {
    const packageName = cleanValue(row.Package);
    const productName = cleanValue(row.Product);
    const parameter = cleanValue(row.Parameter);

    if (!packageName || !productName || !parameter || !fieldToItemIds.has(parameter)) {
      return;
    }

    const productSet = nirAvailability.get(packageName) ?? new Map();
    const itemSet = productSet.get(productName) ?? new Set();
    fieldToItemIds.get(parameter).forEach((itemId) => itemSet.add(itemId));
    productSet.set(productName, itemSet);
    nirAvailability.set(packageName, productSet);
  });

  const packages = packagesRows
    .map((row) => ({
      packageId: cleanValue(row.package_id),
      type: cleanValue(row.name),
      displayName: cleanValue(row.display_name) || cleanValue(row.description) || `Package ${cleanValue(row.package_id)}`,
      description: cleanValue(row.description),
      price: Number.parseFloat(cleanValue(row.price)) || 0,
      baseFeeFlag: cleanValue(row.base_fee) === "1"
    }))
    .filter((pkg) => pkg.type === "Chemistry" || pkg.type === "NIR")
    .filter((pkg) => pkg.price > 0)
    .map((pkg) => ({
      ...pkg,
      coveredItemIds: Array.from(fieldMap.get(pkg.packageId) ?? [])
    }))
    .filter((pkg) => pkg.coveredItemIds.length > 0);

  const totalAminoAcidItemId = itemMap.get("total-amino-acid")?.id ?? "total-amino-acid";
  packages.forEach((pkg) => {
    if (pkg.type === "Chemistry" && pkg.displayName === "Complete Amino Acids Profile" && !pkg.coveredItemIds.includes(totalAminoAcidItemId)) {
      pkg.coveredItemIds.push(totalAminoAcidItemId);
    }
  });

  const chemistryPackages = packages
    .filter((pkg) => pkg.type === "Chemistry")
    .filter((pkg) => pkg.coveredItemIds.length > 0);

  const nirPackages = packages
    .filter((pkg) => pkg.type === "NIR")
    .filter((pkg) => !EXCLUDED_NIR_NAME_PARTS.some((part) => pkg.displayName.includes(part)))
    .filter((pkg) => !EXCLUDED_NIR_PACKAGE_NAMES.includes(pkg.displayName))
    .map((pkg) => ({
      ...pkg,
      availabilityByProduct: mergeAlwaysIncludedNirFields(
        nirAvailability.get(pkg.displayName) ?? new Map(),
        alwaysIncludedNirIds
      )
    }))
    .filter((pkg) => pkg.availabilityByProduct.size > 0);

  return { categories, itemMap, chemistryPackages, nirPackages, products: dedupedProducts, productLookup };
}

function mergeAlwaysIncludedNirFields(availabilityByProduct, alwaysIncludedNirIds) {
  const merged = new Map();

  availabilityByProduct.forEach((itemSet, productName) => {
    const nextSet = new Set(itemSet);
    alwaysIncludedNirIds.forEach((itemId) => nextSet.add(itemId));
    merged.set(productName, nextSet);
  });

  return merged;
}

function buildProductLookupNames(product, productLookup) {
  const names = [];
  const seenProductIds = new Set();
  let current = product;

  while (current && !seenProductIds.has(current.productId)) {
    names.push(current.name);
    seenProductIds.add(current.productId);
    current = current.parentId && current.parentId !== "0" ? productLookup.get(current.parentId) : null;
  }

  return names;
}

function buildProductSortKey(product, productLookup) {
  const segments = [];
  const seenProductIds = new Set();
  let current = product;

  while (current && !seenProductIds.has(current.productId)) {
    segments.unshift(String(current.order).padStart(4, "0"));
    seenProductIds.add(current.productId);
    current = current.parentId && current.parentId !== "0" ? productLookup.get(current.parentId) : null;
  }

  return segments.join(".");
}

function getCurrentProduct() {
  return state.products.find((product) => product.productId === state.currentProductId) ?? null;
}

function getCurrentFeedTypeLabel() {
  const typedValue = elements.feedTypeInput.value.trim();
  if (typedValue) {
    return typedValue;
  }
  return getCurrentProduct()?.name ?? "selected feed type";
}

function getOtherFeedTypeProduct() {
  return state.products.find((product) => product.name === "Other Feeds") ?? null;
}

function buildFeedTypeSearchText(name) {
  const loweredName = name.toLowerCase();
  const aliases = FEED_TYPE_SEARCH_ALIASES
    .filter((alias) => loweredName.includes(alias.match))
    .map((alias) => alias.term);
  return [loweredName, ...aliases].join(" ");
}

function getNirCoveredItemIdsForProduct(pkg, product) {
  if (!product) {
    return [];
  }

  const allowedIds = new Set();
  product.nirLookupNames.forEach((lookupName) => {
    const productCoverage = pkg.availabilityByProduct.get(lookupName);
    if (!productCoverage) {
      return;
    }
    productCoverage.forEach((itemId) => allowedIds.add(itemId));
  });

  return pkg.coveredItemIds.filter((itemId) => allowedIds.has(itemId));
}

function getSelectedItemIdsWithRules(packages, selectedIds) {
  const augmented = new Set(selectedIds);
  let changed = true;

  while (changed) {
    changed = false;
    const result = optimizePackagesCore(packages, Array.from(augmented));
    const solutionPackages = result.solution?.packages ?? [];
    const hasNdfd65Package = solutionPackages.some((pkg) => pkg.displayName.includes("NDFD 6.5"));
    const hasChemistryNdfdPackage = solutionPackages.some((pkg) => pkg.type === "Chemistry" && pkg.displayName.includes("NDFD/uNDFom"));
    const hasChemistryIVSD7Package = solutionPackages.some((pkg) => pkg.type === "Chemistry" && pkg.displayName === "IVSD7");

    if (hasChemistryNdfdPackage && !hasNdfd65Package) {
      ["andf", "andfom"].forEach((itemId) => {
        if (!augmented.has(itemId)) {
          augmented.add(itemId);
          changed = true;
        }
      });
    }

    if (hasChemistryIVSD7Package && !augmented.has("starch")) {
      augmented.add("starch");
      changed = true;
    }
  }

  return Array.from(augmented);
}

function buildCategoryIndex() {
  const itemMap = new Map();
  const fieldToItemIds = new Map();
  const categories = CATEGORY_DEFINITIONS.map((category) => ({
    key: category.key,
    label: category.label,
    items: category.items.map((itemDefinition) => {
      const item = normalizeItemDefinition(itemDefinition);
      const existing = itemMap.get(item.id);
      if (!existing) {
        itemMap.set(item.id, item);
        item.fields.forEach((field) => {
          if (!fieldToItemIds.has(field)) {
            fieldToItemIds.set(field, new Set());
          }
          fieldToItemIds.get(field).add(item.id);
        });
      } else {
        existing.fields = Array.from(new Set([...existing.fields, ...item.fields]));
        existing.searchText = Array.from(new Set(`${existing.searchText} ${item.searchText}`.split(" ")))
          .join(" ")
          .trim();
      }
      return itemMap.get(item.id);
    })
  }));

  return { categories, itemMap, fieldToItemIds };
}

function normalizeItemDefinition(definition) {
  if (typeof definition === "string") {
    return createItem(definition, definition, [definition], [definition]);
  }

  if (definition.fields) {
    return createItem(
      definition.display,
      definition.display,
      definition.fields,
      [definition.display, ...definition.fields, ...(definition.aliases ?? [])]
    );
  }

  return createItem(
    definition.raw,
    definition.display,
    [definition.raw],
    [definition.display, definition.raw, ...(definition.aliases ?? [])]
  );
}

function createItem(seed, display, fields, searchTerms) {
  return {
    id: slugify(seed),
    display,
    fields,
    searchText: searchTerms.join(" ").toLowerCase()
  };
}

function pairDigestibility(hours) {
  return {
    display: `NDFDom${hours}/uNDFom${hours}`,
    fields: [`NDFDom${hours}`, `uNDFom${hours}`],
    aliases: ["Fiber", "NDFD", "uNDFom"]
  };
}

function renderProductOptions() {
  const selectedProduct = getCurrentProduct();
  elements.feedTypeInput.value = selectedProduct?.name ?? "";
  renderFeedTypeDropdown();
}

function renderFeedTypeDropdown() {
  elements.feedTypeList.classList.toggle("hidden", !state.feedTypeDropdownOpen);
  renderFeedTypeList();
}

function renderFeedTypeList() {
  const searchTerm = elements.feedTypeInput.value.trim().toLowerCase();
  const visibleProducts = state.products.filter((product) => {
    if (!searchTerm) {
      return true;
    }
    return buildFeedTypeSearchText(product.name).includes(searchTerm);
  });

  elements.feedTypeList.innerHTML = "";

  if (!visibleProducts.length) {
    const fallbackProduct = getOtherFeedTypeProduct();
    if (fallbackProduct) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "feed-type-option";
      button.textContent = "Other";
      button.addEventListener("mousedown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.currentProductId = fallbackProduct.productId;
        elements.feedTypeInput.value = "Other";
        state.feedTypeDropdownOpen = false;
        renderFeedTypeDropdown();
        renderResults();
      });
      elements.feedTypeList.appendChild(button);
    }
    return;
  }

  visibleProducts.forEach((product) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "feed-type-option";
    if (product.productId === state.currentProductId) {
      button.classList.add("is-active");
    }
    button.textContent = product.name;
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.currentProductId = product.productId;
      elements.feedTypeInput.value = product.name;
      state.feedTypeDropdownOpen = false;
      renderFeedTypeDropdown();
      renderResults();
    });
    elements.feedTypeList.appendChild(button);
  });
}

function renderSelections() {
  const selectedItems = Array.from(state.selectedItems)
    .map((id) => state.itemMap.get(id))
    .filter(Boolean)
    .sort((a, b) => a.display.localeCompare(b.display));

  elements.selectionSummary.textContent = `${selectedItems.length} nutrient${selectedItems.length === 1 ? "" : "s"} selected`;
  elements.selectedChips.innerHTML = "";

  if (!selectedItems.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Select one or more nutrients to calculate the lowest-cost package recommendations.";
    elements.selectedChips.appendChild(empty);
    return;
  }

  selectedItems.forEach((item) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `<span>${escapeHtml(item.display)}</span><button type="button" aria-label="Remove ${escapeHtml(item.display)}">x</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      state.selectedItems.delete(item.id);
      renderSelections();
      renderCategories();
      renderResults();
    });
    elements.selectedChips.appendChild(chip);
  });
}

function renderCategories() {
  const fragment = document.createDocumentFragment();
  const visibleIds = new Set();

  state.categories.forEach((category) => {
    const matchingItems = category.items.filter((item) => itemMatchesSearch(item));
    if (!matchingItems.length) {
      return;
    }

    const card = document.createElement("section");
    card.className = "category-card";

    const head = document.createElement("div");
    head.className = "category-head";
    head.innerHTML = `<h3>${escapeHtml(category.label)}</h3><span>${matchingItems.length} shown</span>`;
    card.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "nutrient-grid";

    matchingItems.forEach((item) => {
      visibleIds.add(item.id);

      const option = document.createElement("div");
      option.className = "nutrient-option";

      const checkbox = document.createElement("input");
      checkbox.className = "nutrient-toggle";
      checkbox.type = "checkbox";
      checkbox.id = `${category.key}-${item.id}`;
      checkbox.checked = state.selectedItems.has(item.id);

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerHTML = `<span class="nutrient-name">${escapeHtml(item.display)}</span>`;

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          state.selectedItems.add(item.id);
        } else {
          state.selectedItems.delete(item.id);
        }
        renderSelections();
        renderCategories();
        renderResults();
      });

      option.appendChild(checkbox);
      option.appendChild(label);
      grid.appendChild(option);
    });

    card.appendChild(grid);
    fragment.appendChild(card);
  });

  elements.categoryContainer.innerHTML = "";
  elements.categoryContainer.appendChild(fragment);
  elements.categoryContainer.dataset.visibleIds = JSON.stringify(Array.from(visibleIds));

  if (!elements.categoryContainer.children.length) {
    const empty = document.createElement("div");
    empty.className = "category-card";
    empty.innerHTML = `<p class="empty-state">No nutrients match the current search.</p>`;
    elements.categoryContainer.appendChild(empty);
  }
}

function renderResults() {
  elements.resultsState.innerHTML = "";

  if (!state.selectedItems.size) {
    elements.resultsState.innerHTML = `<div class="loading-card"><p class="empty-state">Recommendations will appear here after nutrients are selected.</p></div>`;
    return;
  }

  const selectedIds = Array.from(state.selectedItems);
  const currentProduct = getCurrentProduct();
  const currentFeedTypeLabel = getCurrentFeedTypeLabel();
  const chemistrySelectedIds = getSelectedItemIdsWithRules(state.chemistryPackages, selectedIds);
  const chemistryResult = optimizePackagesCore(state.chemistryPackages, chemistrySelectedIds);
  const nirCandidates = state.nirPackages
    .map((pkg) => {
      const coveredItemIds = getNirCoveredItemIdsForProduct(pkg, currentProduct);
      if (!coveredItemIds.length) {
        return null;
      }
      return { ...pkg, coveredItemIds };
    })
    .filter(Boolean);
  const nirResult = optimizePackagesCore(nirCandidates, selectedIds);
  const hybridResult = buildHybridResult(nirCandidates, state.chemistryPackages, selectedIds);
  const nirCardConfig = {
    methodLabel: "NIR",
    title: `NIR for ${currentFeedTypeLabel}`,
    result: nirResult,
    showFullCoverage: true,
    noMatchMessage: "There are no NIR packages available for the currently selected feed type and nutrients.",
    hybridResult
  };
  const chemistryCardConfig = {
    methodLabel: "",
    title: `Chemistry for ${currentFeedTypeLabel}`,
    result: chemistryResult,
    showFullCoverage: true
  };
  const showNirFirst = !state.chemistryOnly && nirResult.coverableCount > 0;
  const orderedCards = showNirFirst
    ? [nirCardConfig, chemistryCardConfig]
    : [chemistryCardConfig, nirCardConfig];

  orderedCards.forEach((cardConfig) => {
    if (state.chemistryOnly && cardConfig.methodLabel === "NIR") {
      return;
    }
    elements.resultsState.appendChild(createResultCard(cardConfig));
  });
}

function createResultCard({ methodLabel, title, result, showFullCoverage = false, noMatchMessage = "None of the currently selected nutrients are available in this method.", hybridResult = null }) {
  const fragment = elements.resultCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".result-card");

  card.querySelector(".result-label").textContent = methodLabel;
  card.querySelector(".result-label").classList.toggle("hidden", !methodLabel);
  card.querySelector(".result-title").textContent = title;

  if (!result.coverableCount) {
    card.querySelector(".price-pill").textContent = "No match";
    card.querySelector(".result-summary").textContent = noMatchMessage;
    card.querySelector(".package-list").innerHTML = "";
    card.querySelector(".covered-list").innerHTML = "";
    return card;
  }

  if (!result.solution) {
    if (hybridResult?.solution) {
      card.querySelector(".price-pill").textContent = formatMoney(hybridResult.solution.totalCost);
      card.querySelector(".result-summary").textContent = "NIR alone cannot cover every selected nutrient, so this estimate combines NIR and Chemistry packages.";
      const packageList = card.querySelector(".package-list");
      appendPackageGroup(packageList, "NIR package price", hybridResult.solution.nirPackages, hybridResult.solution.nirCost);
      appendPackageGroup(packageList, "Chemistry package price", hybridResult.solution.chemistryPackages, hybridResult.solution.chemistryCost);
      const totalRow = document.createElement("div");
      totalRow.className = "package-item";
      totalRow.innerHTML = `
        <div class="package-item-top">
          <div class="package-item-name">Total</div>
          <div>${formatMoney(hybridResult.solution.totalCost)}</div>
        </div>
      `;
      packageList.appendChild(totalRow);

      fillChipList(
        card.querySelector(".covered-list"),
        showFullCoverage ? hybridResult.solution.allCoveredItemIds : hybridResult.coveredSelectedIds
      );

      if (hybridResult.missingSelectedIds.length) {
        const missingBlock = card.querySelector(".missing-block");
        missingBlock.classList.remove("hidden");
        fillChipList(card.querySelector(".missing-list"), hybridResult.missingSelectedIds);
      }

      return card;
    }

    card.querySelector(".price-pill").textContent = "No full match";
    card.querySelector(".result-summary").textContent = "This method cannot cover every selected nutrient with the currently eligible packages.";
    card.querySelector(".package-list").innerHTML = `<p class="empty-state">Covered nutrients are shown below, but at least one selection is unavailable in this method.</p>`;
  } else {
    card.querySelector(".price-pill").textContent = formatMoney(result.solution.totalCost);
    card.querySelector(".result-summary").textContent =
      result.solution.alternativeSolutions?.length > 0
        ? "Two options available at the same price."
        : result.solution.packages.length === 1
          ? "One package is enough to cover the currently selected nutrients."
          : `${result.solution.packages.length} packages are needed to cover the currently selected nutrients.`;

    const packageList = card.querySelector(".package-list");
    result.solution.packages.forEach((pkg) => {
      const row = document.createElement("div");
      row.className = "package-item";
      row.innerHTML = `
        <div class="package-item-top">
          <div class="package-item-name">${escapeHtml(pkg.displayName)}</div>
          <div>${formatMoney(pkg.price)}</div>
        </div>
      `;
      packageList.appendChild(row);
    });

    if (result.solution.baseFeeApplied) {
      const feeRow = document.createElement("div");
      feeRow.className = "package-item";
      feeRow.innerHTML = `
        <div class="package-item-top">
          <div class="package-item-name">Base fee</div>
          <div>${formatMoney(BASE_FEE_AMOUNT)}</div>
        </div>
      `;
      packageList.appendChild(feeRow);
    }

    if (result.solution.alternativeSolutions?.length) {
      const alternateBlock = card.querySelector(".alternate-block");
      const alternateList = card.querySelector(".alternate-list");
      alternateBlock.classList.remove("hidden");
      result.solution.alternativeSolutions.forEach((alternateSolution) => {
        const altCard = document.createElement("div");
        altCard.className = "alternate-card";
        altCard.innerHTML = `
          <div class="alternate-card-top">
            <div class="alternate-card-title">${escapeHtml(alternateSolution.packages.map((pkg) => pkg.displayName).join(" + "))}</div>
            <div>${formatMoney(alternateSolution.totalCost)}</div>
          </div>
          <p class="alternate-card-copy">${escapeHtml(formatAlternateCoverageText(alternateSolution.allCoveredItemIds))}</p>
        `;
        alternateList.appendChild(altCard);
      });
    }
  }

  fillChipList(
    card.querySelector(".covered-list"),
    showFullCoverage && result.solution ? result.solution.allCoveredItemIds : result.coveredSelectedIds
  );

  if (result.missingSelectedIds.length) {
    const missingBlock = card.querySelector(".missing-block");
    missingBlock.classList.remove("hidden");
    fillChipList(card.querySelector(".missing-list"), result.missingSelectedIds);
  }

  return card;
}

function appendPackageGroup(container, label, packages, subtotal) {
  const subtotalLine = document.createElement("div");
  subtotalLine.className = "package-subtotal";
  subtotalLine.textContent = `${label}: ${formatMoney(subtotal)}`;
  container.appendChild(subtotalLine);

  packages.forEach((pkg) => {
    const row = document.createElement("div");
    row.className = "package-item";
    row.innerHTML = `
      <div class="package-item-top">
        <div class="package-item-name">${escapeHtml(pkg.displayName)}</div>
        <div>${formatMoney(pkg.price)}</div>
      </div>
    `;
    container.appendChild(row);
  });
}

function formatAlternateCoverageText(itemIds) {
  const labels = itemIds
    .map((id) => state.itemMap.get(id))
    .filter(Boolean)
    .map((item) => item.display)
    .sort((a, b) => a.localeCompare(b));
  return `Includes: ${labels.join(", ")}`;
}

function fillChipList(container, itemIds) {
  container.innerHTML = "";
  itemIds
    .map((id) => state.itemMap.get(id))
    .filter(Boolean)
    .sort((a, b) => a.display.localeCompare(b.display))
    .forEach((item) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.textContent = item.display;
      container.appendChild(chip);
    });
}

function optimizePackages(packages, selectedIds) {
  return optimizePackagesCore(packages, selectedIds);
}

function optimizePackagesCore(packages, selectedIds) {
  const selectedMaskMap = new Map(selectedIds.map((id, index) => [id, BigInt(index)]));
  const fullMask = selectedIds.reduce((mask, id, index) => mask | (1n << BigInt(index)), 0n);

  const normalizedPackages = packages
    .map((pkg) => {
      const coverage = pkg.coveredItemIds.filter((id) => selectedMaskMap.has(id));
      if (!coverage.length) {
        return null;
      }

      let mask = 0n;
      coverage.forEach((id) => {
        mask |= 1n << selectedMaskMap.get(id);
      });

      return { ...pkg, mask, coverage };
    })
    .filter(Boolean);

  const coveredMask = normalizedPackages.reduce((mask, pkg) => mask | pkg.mask, 0n);
  const coverableCount = countBits(coveredMask);
  const coveredSelectedIds = selectedIds.filter((id) => {
    const position = selectedMaskMap.get(id);
    return ((coveredMask >> position) & 1n) === 1n;
  });
  const missingSelectedIds = selectedIds.filter((id) => !coveredSelectedIds.includes(id));

  if (!normalizedPackages.length) {
    return { solution: null, coverableCount, coveredSelectedIds, missingSelectedIds };
  }

  const reducedPackages = removeDominatedPackages(normalizedPackages);
  const states = new Map();
  states.set("0|0", { mask: 0n, mode: 0, sumPrice: 0, chosenIndexes: [] });

  reducedPackages.forEach((pkg, packageIndex) => {
    const snapshot = Array.from(states.values());
    snapshot.forEach((stateEntry) => {
      const nextMask = stateEntry.mask | pkg.mask;
      const nextMode = updateMode(stateEntry.mode, pkg.baseFeeFlag);
      const nextKey = `${nextMask.toString()}|${nextMode}`;
      const nextSumPrice = stateEntry.sumPrice + pkg.price;
      const existing = states.get(nextKey);
      if (existing && existing.sumPrice <= nextSumPrice) {
        return;
      }

      states.set(nextKey, {
        mask: nextMask,
        mode: nextMode,
        sumPrice: nextSumPrice,
        chosenIndexes: [...stateEntry.chosenIndexes, packageIndex]
      });
    });
  });

  let bestState = null;
  const tieStates = [];
  states.forEach((entry) => {
    if (entry.mask !== fullMask) {
      return;
    }

    const totalCost = entry.sumPrice + (entry.mode === 1 ? BASE_FEE_AMOUNT : 0);
    const preferThisState =
      !bestState ||
      totalCost < bestState.totalCost ||
      (totalCost === bestState.totalCost && entry.mode > bestState.mode) ||
      (totalCost === bestState.totalCost && entry.mode === bestState.mode && entry.chosenIndexes.length < bestState.chosenIndexes.length);

    if (preferThisState) {
      bestState = { ...entry, totalCost };
    }
  });

  if (bestState) {
    states.forEach((entry) => {
      if (entry.mask !== fullMask) {
        return;
      }
      const totalCost = entry.sumPrice + (entry.mode === 1 ? BASE_FEE_AMOUNT : 0);
      if (totalCost === bestState.totalCost && entry.chosenIndexes.length === bestState.chosenIndexes.length) {
        tieStates.push({ ...entry, totalCost });
      }
    });
  }

  if (!bestState) {
    return { solution: null, coverableCount, coveredSelectedIds, missingSelectedIds };
  }

  const solutionPackages = bestState.chosenIndexes
    .map((index) => reducedPackages[index])
    .sort((a, b) => a.price - b.price || a.displayName.localeCompare(b.displayName));

  const allCoveredItemIds = Array.from(
    solutionPackages.reduce((set, pkg) => {
      pkg.coveredItemIds.forEach((itemId) => set.add(itemId));
      return set;
    }, new Set())
  );

  const bestSignature = solutionPackages.map((pkg) => pkg.displayName).sort().join("|");
  const alternativeSolutions = [];
  const seenAltSignatures = new Set([bestSignature]);

  if (solutionPackages.length === 1) {
    reducedPackages.forEach((pkg) => {
      if (pkg.displayName === solutionPackages[0].displayName) {
        return;
      }
      if (pkg.mask !== fullMask) {
        return;
      }
      const totalCost = pkg.price + (pkg.baseFeeFlag ? BASE_FEE_AMOUNT : 0);
      if (totalCost !== bestState.totalCost) {
        return;
      }
      if (seenAltSignatures.has(pkg.displayName)) {
        return;
      }
      seenAltSignatures.add(pkg.displayName);
      alternativeSolutions.push({
        packages: [pkg],
        totalCost,
        allCoveredItemIds: Array.from(new Set(pkg.coveredItemIds))
      });
    });
  }

  tieStates.forEach((stateEntry) => {
    const candidatePackages = stateEntry.chosenIndexes
      .map((index) => reducedPackages[index])
      .sort((a, b) => a.price - b.price || a.displayName.localeCompare(b.displayName));
    const signature = candidatePackages.map((pkg) => pkg.displayName).sort().join("|");
    if (seenAltSignatures.has(signature)) {
      return;
    }
    seenAltSignatures.add(signature);
    alternativeSolutions.push({
      packages: candidatePackages,
      totalCost: stateEntry.totalCost,
      allCoveredItemIds: Array.from(
        candidatePackages.reduce((set, pkg) => {
          pkg.coveredItemIds.forEach((itemId) => set.add(itemId));
          return set;
        }, new Set())
      )
    });
  });

  return {
    solution: {
      packages: solutionPackages,
      totalCost: bestState.totalCost,
      baseFeeApplied: bestState.mode === 1,
      allCoveredItemIds,
      alternativeSolutions
    },
    coverableCount,
    coveredSelectedIds,
    missingSelectedIds
  };
}

function buildHybridResult(nirPackages, chemistryPackages, selectedIds) {
  const nirResult = optimizePackagesCore(nirPackages, selectedIds);
  if (nirResult.solution || !nirResult.coverableCount) {
    return null;
  }

  const nirPartialResult = optimizePackagesCore(nirPackages, nirResult.coveredSelectedIds);
  if (!nirPartialResult.solution) {
    return null;
  }

  const chemistrySelectedIds = getSelectedItemIdsWithRules(chemistryPackages, nirResult.missingSelectedIds);
  const chemistryResult = optimizePackagesCore(chemistryPackages, chemistrySelectedIds);
  if (!chemistryResult.solution) {
    return null;
  }

  return {
    solution: {
      nirPackages: nirPartialResult.solution.packages,
      nirCost: nirPartialResult.solution.totalCost,
      chemistryPackages: chemistryResult.solution.packages,
      chemistryCost: chemistryResult.solution.totalCost,
      totalCost: nirPartialResult.solution.totalCost + chemistryResult.solution.totalCost,
      allCoveredItemIds: Array.from(new Set([
        ...nirPartialResult.solution.allCoveredItemIds,
        ...chemistryResult.solution.allCoveredItemIds
      ]))
    },
    coveredSelectedIds: Array.from(new Set([
      ...nirResult.coveredSelectedIds,
      ...nirResult.missingSelectedIds
    ])),
    missingSelectedIds: chemistryResult.missingSelectedIds
  };
}

function removeDominatedPackages(packages) {
  return packages.filter((candidate, candidateIndex) => {
    return !packages.some((other, otherIndex) => {
      if (candidateIndex === otherIndex) {
        return false;
      }

      if ((other.mask | candidate.mask) !== other.mask) {
        return false;
      }

      if (other.price > candidate.price) {
        return false;
      }

      if (!isModeAsGoodOrBetter(other.baseFeeFlag, candidate.baseFeeFlag)) {
        return false;
      }

      return other.price < candidate.price || other.baseFeeFlag !== candidate.baseFeeFlag || other.mask !== candidate.mask;
    });
  });
}

function isModeAsGoodOrBetter(otherBaseFeeFlag, candidateBaseFeeFlag) {
  if (candidateBaseFeeFlag && !otherBaseFeeFlag) {
    return true;
  }
  return otherBaseFeeFlag === candidateBaseFeeFlag;
}

function updateMode(currentMode, packageBaseFeeFlag) {
  if (!packageBaseFeeFlag) {
    return 2;
  }
  return currentMode === 2 ? 2 : 1;
}

function getVisibleItemIds() {
  try {
    return JSON.parse(elements.categoryContainer.dataset.visibleIds ?? "[]");
  } catch {
    return [];
  }
}

function itemMatchesSearch(item) {
  if (!state.searchTerm) {
    return true;
  }
  return item.searchText.includes(state.searchTerm);
}

async function loadCsv(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return parseCsv(await response.text());
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === "\"") {
      if (insideQuotes && nextCharacter === "\"") {
        current += "\"";
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (character === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += character;
  }

  if (current.length || row.length) {
    row.push(current);
    rows.push(row);
  }

  const [headerRow, ...dataRows] = rows.filter((entry) => entry.some((value) => value !== ""));
  return dataRows.map((dataRow) => {
    const object = {};
    headerRow.forEach((header, index) => {
      object[header] = dataRow[index] ?? "";
    });
    return object;
  });
}

function cleanValue(value) {
  return String(value ?? "").trim();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function countBits(mask) {
  let count = 0;
  let value = mask;
  while (value > 0n) {
    count += Number(value & 1n);
    value >>= 1n;
  }
  return count;
}
