const CATEGORY_DEFINITIONS = [
  {
    key: "proximate-analysis",
    label: "Proximate analysis",
    items: [
      { raw: "Dry Matter", display: "Dry Matter", aliases: ["DM"] },
      { raw: "Moisture", display: "Moisture", aliases: ["Humidity"] },
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

const EXCLUDED_NIR_NAME_PARTS = ["Calibrate", "Big Gain", "Plot", "Select24", "Select48", "VFA Screen"];
const BASE_FEE_AMOUNT = 7;
const ALWAYS_INCLUDED_NIR_FIELDS = ["Dry Matter", "Moisture"];
const EXCLUDED_NIR_PACKAGE_NAMES = ["IVSD7-O"];
const EXCLUDED_PACKAGE_DISPLAY_NAMES = ["ND-ICP", "Chemlock minerals", "M8 - Ca/P/K/Mg/S/Na"];
const DEFAULT_EXCLUDED_PACKAGE_NAME_PARTS = ["Poulin", "Protekta", "Swine", "Equine"];
const SWINE_PACKAGE_REQUIREMENT_ID = "__swine-package-required";
const EQUINE_PACKAGE_REQUIREMENT_ID = "__equine-package-required";
const EXCLUDED_FEED_TYPE_NAMES = ["Mixed hay", "Mixed haylage"];
const FEED_TYPE_SEARCH_ALIASES = [
  { term: "maize", match: "corn" },
  { term: "soya", match: "soy" },
  { term: "oaten", match: "oat" },
  { term: "sgs", match: "small grain silage" },
  { term: "sf", match: "steam flaked" },
  { term: "sbm", match: "soybean meal" },
  { term: "linseed", match: "flaxseed" },
  { term: "rape", match: "canola" },
  { term: "balage", match: "haylage" }
];

const CALCULATION_DEFINITIONS = [
  {
    id: "adf-energy",
    label: "ADF (TDN, NEL, NEG, NEM)",
    aliases: [
      "TDN",
      "Total digestible nutrients",
      "NEL",
      "Net energy for Lactation",
      "NEG",
      "Net energy for Gain",
      "NEM",
      "Net energy for Maintenance",
      "Beef/ton"
    ],
    allowedParentIds: ["1", "3", "4", "5", "6", "7", "8", "9", "10", "13"],
    allOf: ["adf"]
  },
  {
    id: "oardc-energy",
    label: "OARDC (TDN, NEL, NEG, NEM)",
    aliases: [
      "TDN",
      "Total digestible nutrients",
      "NEL",
      "Net energy for Lactation",
      "NEG",
      "Net energy for Gain",
      "NEM",
      "Net energy for Maintenance",
      "ME",
      "Metabolizable energy",
      "Beef/ton",
      "NRC"
    ],
    allOf: ["cp", "andfom", "ash"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "swine-de",
    label: "Swine DE",
    aliases: ["DE", "Digestible energy", "Swine energy"],
    allOf: ["cp", "adf", "andfom", "fat-ee", "ash"]
  },
  {
    id: "swine-me",
    label: "Swine ME",
    aliases: ["ME", "Metabolizable energy", "Swine energy"],
    allOf: ["cp", "adf", "andfom", "fat-ee", "ash"]
  },
  {
    id: "equine-tdn",
    label: "Equine TDN",
    aliases: ["TDN", "Total digestible nutrients", "Equine energy"],
    allOf: ["cp", "adf", "fat-ee", "ash", "andfom", "starch", "sugar-wsc"]
  },
  {
    id: "equine-de",
    label: "Equine DE",
    aliases: ["DE", "Digestible energy", "Equine energy"],
    allOf: ["cp", "adf", "fat-ee", "ash", "andfom", "starch", "sugar-wsc"]
  },
  {
    id: "milk2006",
    label: "MILK2006 (TDN, NEL, NEG, NEM, Milk per ton)",
    aliases: [
      "TDN",
      "Total digestible nutrients",
      "NEL",
      "Net energy for Lactation",
      "NEG",
      "Net energy for Gain",
      "NEM",
      "Net energy for Maintenance",
      "Milk/ton"
    ],
    allowedParentIds: ["8"],
    allOf: ["cp", "andf", "andfom", "ash", "starch", "ndfdom30-undfom30"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "milk2013",
    label: "MILK2013 (TDN, NEL, NEG, NEM, Milk per ton)",
    aliases: [
      "TDN",
      "Total digestible nutrients",
      "NEL",
      "Net energy for Lactation",
      "NEG",
      "Net energy for Gain",
      "NEM",
      "Net energy for Maintenance",
      "Milk/ton"
    ],
    allowedParentIds: ["1", "3", "4", "5", "6", "7", "13"],
    allOf: ["cp", "andf", "andfom", "ash", "ndfdom30-undfom30"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "milk2024",
    label: "MILK2024 (NEL, Milk per ton)",
    aliases: [
      "TDN",
      "Total digestible nutrients",
      "NEL",
      "Net energy for Lactation",
      "NEG",
      "Net energy for Gain",
      "NEM",
      "Net energy for Maintenance",
      "Milk/ton"
    ],
    allowedParentIds: ["8"],
    allOf: ["cp", "andf", "andfom", "ash", "starch", "ivsd7", "ndfdom30-undfom30"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "isu-beef",
    label: "ISU Beef (TDN, NEM, NEG, Beef per ton)",
    aliases: [
      "TDN",
      "NEL",
      "NEG",
      "NEM",
      "Beef/ton"
    ],
    allowedParentIds: ["8", "13"],
    allOf: ["cp", "andfom", "ash", "ndfdom30-undfom30"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "rfv",
    label: "RFV",
    allowedParentIds: ["1", "3", "4", "5", "6", "7", "13"],
    allOf: ["adf", "andf"]
  },
  {
    id: "rfq",
    label: "RFQ",
    allowedParentIds: ["1", "3", "4", "5", "6", "7", "13"],
    allOf: ["cp", "andf", "andfom", "ndfdom30-undfom30", "ash"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "ndf-kd-rate-mir-p1",
    label: "NDF kd rate MIR_P1",
    packageNames: ["NDFD 6.5 Forages 30,120,240"],
    nirPatterns: [
      ["ndfdom12-undfom12", "ndfdom30-undfom30", "ndfdom120-undfom120", "ndfdom240-undfom240"],
      ["ndfdom12-undfom12", "ndfdom72-undfom72", "ndfdom120-undfom120"]
    ]
  },
  {
    id: "starch-kd-rate-mir-p1t1",
    label: "Starch kd rate MIR_P1T1",
    allOf: ["starch", "ivsd7"]
  },
  {
    id: "dcad",
    label: "DCAD",
    allOf: ["na", "k", "ca", "s"]
  },
  {
    id: "adjusted-cp",
    label: "Adjusted CP",
    allOf: ["cp", "adicp"]
  },
  {
    id: "nfc",
    label: "NFC",
    allOf: ["cp", "andf", "andfom", "ash"],
    anyOfGroups: [["fat-ee", "total-fatty-acids"]]
  },
  {
    id: "nsc",
    label: "NSC",
    allOf: ["starch", "sugar-wsc"]
  },
  {
    id: "hemicellulose",
    label: "Hemicellulose",
    allOf: ["andf", "andfom", "adf"]
  }
];

const state = {
  categories: [],
  itemMap: new Map(),
  calculationMap: new Map(),
  chemistryPackages: [],
  nirPackages: [],
  products: [],
  productLookup: new Map(),
  selectedItems: new Set(),
  selectedCalculations: new Set(),
  searchTerm: "",
  selectedSpecies: "",
  currentProductId: "",
  feedTypeDropdownOpen: false,
  chemistryOnly: false
};

const elements = {
  speciesSelect: document.getElementById("speciesSelect"),
  feedTypeDropdown: document.getElementById("feedTypeDropdown"),
  feedTypeInput: document.getElementById("feedTypeInput"),
  feedTypeToggle: document.getElementById("feedTypeToggle"),
  feedTypeList: document.getElementById("feedTypeList"),
  chemistryOnlyToggle: document.getElementById("chemistryOnlyToggle"),
  nutrientSearch: document.getElementById("nutrientSearch"),
  clearSelections: document.getElementById("clearSelections"),
  selectionSummary: document.getElementById("selectionSummary"),
  selectedChips: document.getElementById("selectedChips"),
  calculationContainer: document.getElementById("calculationContainer"),
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
  state.calculationMap = dataIndex.calculationMap;
  state.chemistryPackages = dataIndex.chemistryPackages;
  state.nirPackages = dataIndex.nirPackages;
  state.products = dataIndex.products;
  state.productLookup = dataIndex.productLookup;
  state.currentProductId = "";

  bindEvents();
  renderSpeciesOptions();
  renderProductOptions();
  renderSelections();
  renderCalculations();
  renderCategories();
  renderResults();

  elements.loadingState.classList.add("hidden");
  elements.resultsState.classList.remove("hidden");
}

function bindEvents() {
  elements.speciesSelect.addEventListener("change", () => {
    state.selectedSpecies = elements.speciesSelect.value;
    renderResults();
  });

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
    renderCalculations();
    renderCategories();
  });

  elements.chemistryOnlyToggle.addEventListener("change", () => {
    state.chemistryOnly = elements.chemistryOnlyToggle.checked;
    renderResults();
  });

  elements.clearSelections.addEventListener("click", () => {
    state.selectedItems.clear();
    state.selectedCalculations.clear();
    state.currentProductId = "";
    state.selectedSpecies = "";
    elements.feedTypeInput.value = "";
    state.searchTerm = "";
    elements.nutrientSearch.value = "";
    state.feedTypeDropdownOpen = false;
    state.chemistryOnly = false;
    elements.chemistryOnlyToggle.checked = false;
    renderSpeciesOptions();
    renderSelections();
    renderCalculations();
    renderFeedTypeDropdown();
    renderCategories();
    renderResults();
  });
}

function buildDataIndex(packagesRows, packageFieldRows, nirRows, productsRows) {
  const { categories, itemMap, fieldToItemIds } = buildCategoryIndex();
  const calculationMap = new Map(CALCULATION_DEFINITIONS.map((definition) => [definition.id, definition]));
  addAshOrganicMatterCoverage(fieldToItemIds, itemMap);
  const alwaysIncludedNirIds = ALWAYS_INCLUDED_NIR_FIELDS.flatMap((field) => Array.from(fieldToItemIds.get(field) ?? []));

  const rawProducts = productsRows
    .map((row) => ({
      productId: cleanValue(row.product_id),
      parentId: cleanValue(row.parent_id),
      code: cleanValue(row.code),
      name: cleanValue(row.name),
      alternativeNames: cleanValue(row.alternative_names),
      order: Number.parseInt(cleanValue(row.order), 10) || 9999
    }))
    .map((product) => ({
      ...product,
      parentId: product.parentId === "0" ? product.productId : product.parentId
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
    .filter((pkg) => !hasExcludedNirNamePart(pkg.displayName))
    .filter((pkg) => !EXCLUDED_NIR_PACKAGE_NAMES.includes(pkg.displayName))
    .map((pkg) => ({
      ...pkg,
      availabilityByProduct: mergeAlwaysIncludedNirFields(
        nirAvailability.get(pkg.displayName) ?? new Map(),
        alwaysIncludedNirIds
      )
    }))
    .filter((pkg) => pkg.availabilityByProduct.size > 0);

  return { categories, itemMap, calculationMap, chemistryPackages, nirPackages, products: dedupedProducts, productLookup };
}

function addAshOrganicMatterCoverage(fieldToItemIds, itemMap) {
  const ashItemIds = fieldToItemIds.get("Ash");
  const organicMatterItemId = itemMap.get("organic-matter")?.id;
  if (!ashItemIds || !organicMatterItemId) {
    return;
  }

  ashItemIds.add(organicMatterItemId);
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

function hasExcludedPackageNamePart(displayName) {
  const normalizedName = displayName.toLowerCase();
  return DEFAULT_EXCLUDED_PACKAGE_NAME_PARTS.some((part) => normalizedName.includes(part.toLowerCase()));
}

function hasExcludedNirNamePart(displayName) {
  const normalizedName = displayName.toLowerCase();
  return EXCLUDED_NIR_NAME_PARTS.some((part) => normalizedName.includes(part.toLowerCase()));
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

function buildFeedTypeSearchText(product, productLookup) {
  const names = buildProductLookupNames(product, productLookup);
  const searchTerms = new Set();
  const topLevelProductId = getTopLevelProductId(product);
  const alternativeNames = String(product.alternativeNames ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const combinedText = [product.name, ...alternativeNames, ...names].join(" ").toLowerCase();

  searchTerms.add(product.name.toLowerCase());
  names.forEach((name) => searchTerms.add(name.toLowerCase()));
  alternativeNames.forEach((alias) => searchTerms.add(alias.toLowerCase()));

  FEED_TYPE_SEARCH_ALIASES.forEach((alias) => {
    if (combinedText.includes(alias.match)) {
      searchTerms.add(alias.term);
    }
  });

  if (combinedText.includes("small grain silage") || combinedText.includes("sgs")) {
    searchTerms.add("small grain silage");
    searchTerms.add("sgs");
  }

  if (combinedText.includes("steam flaked") || /\bsf\b/.test(combinedText) || product.name.toLowerCase().startsWith("sf ")) {
    searchTerms.add("steam flaked");
    searchTerms.add("sf");
  }

  if (combinedText.includes("soybean meal") || combinedText.includes("sbm")) {
    searchTerms.add("soybean meal");
    searchTerms.add("sbm");
  }

  if (combinedText.includes("flaxseed") || combinedText.includes("linseed")) {
    searchTerms.add("flaxseed");
    searchTerms.add("linseed");
  }

  if (combinedText.includes("canola") || combinedText.includes("rape")) {
    searchTerms.add("canola");
    searchTerms.add("rape");
  }

  if (combinedText.includes("soy")) {
    searchTerms.add("soya");
    searchTerms.add("soy");
    searchTerms.add("sbm");
  }

  if (combinedText.includes("sbm")) {
    searchTerms.add("soya");
    searchTerms.add("soybean meal");
    searchTerms.add("sbm");
  }

  if (combinedText.includes("corn")) {
    searchTerms.add("maize");
  }

  if (combinedText.includes("haylage") || topLevelProductId === "13") {
    searchTerms.add("balage");
    searchTerms.add("haylage");
  }

  return Array.from(searchTerms).join(" ");
}

function getCurrentProduct() {
  return state.products.find((product) => product.productId === state.currentProductId) ?? null;
}

function getTopLevelProductId(product) {
  if (!product) {
    return "";
  }

  let current = product;
  const seenProductIds = new Set();
  while (current && !seenProductIds.has(current.productId)) {
    if (!current.parentId || current.parentId === current.productId) {
      return current.productId;
    }
    seenProductIds.add(current.productId);
    current = state.productLookup.get(current.parentId) ?? null;
  }

  return product.productId;
}

function getCalculationParentId(product) {
  return product?.parentId ?? "";
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

function getPackageCalculationIds(pkg, currentProduct, coveredItemIds) {
  const parentId = getCalculationParentId(currentProduct);
  return CALCULATION_DEFINITIONS
    .filter((definition) => calculationAppliesToPackage(definition, pkg, currentProduct, parentId, coveredItemIds))
    .map((definition) => definition.id);
}

function getSpeciesPackageCoverageIds(pkg) {
  if (state.selectedSpecies === "swine" && packageNameIncludesPart(pkg.displayName, "Swine")) {
    return [SWINE_PACKAGE_REQUIREMENT_ID];
  }

  if (state.selectedSpecies === "equine" && packageNameIncludesPart(pkg.displayName, "Equine")) {
    return [EQUINE_PACKAGE_REQUIREMENT_ID];
  }

  return [];
}

function getSpeciesPackageRequirementIds() {
  if (state.selectedSpecies === "swine") {
    return [SWINE_PACKAGE_REQUIREMENT_ID];
  }

  if (state.selectedSpecies === "equine") {
    return [EQUINE_PACKAGE_REQUIREMENT_ID];
  }

  return [];
}

function hasSpeciesAutoRecommendation() {
  return state.selectedSpecies === "swine" || state.selectedSpecies === "equine";
}

function getExpandedSelectionIds(selectedNutrientIds, selectedCalculationIds, currentProduct = null) {
  const expanded = new Set(selectedNutrientIds);
  const parentId = getCalculationParentId(currentProduct);

  selectedCalculationIds.forEach((calculationId) => {
    const definition = state.calculationMap.get(calculationId);
    if (!definition) {
      return;
    }

    if (definition.allowedParentIds && !definition.allowedParentIds.includes(parentId)) {
      expanded.add(calculationId);
      return;
    }

    const measurementIds = getCalculationMeasurementIds(definition);
    if (!measurementIds.length) {
      expanded.add(calculationId);
      return;
    }

    measurementIds.forEach((itemId) => expanded.add(itemId));
  });

  return Array.from(expanded);
}

function getCalculationMeasurementIds(definition) {
  const measurementIds = [];
  (definition.allOf ?? []).forEach((itemId) => measurementIds.push(itemId));
  (definition.anyOfGroups ?? []).forEach((group) => {
    if (group.length) {
      measurementIds.push(group[0]);
    }
  });
  return measurementIds;
}

function calculationAppliesToPackage(definition, pkg, currentProduct, parentId, coveredItemIds) {
  if (definition.allowedParentIds && !definition.allowedParentIds.includes(parentId)) {
    return false;
  }

  const normalizedCoveredItemIds = normalizeCoverageIds(coveredItemIds);

  if (definition.packageNames?.includes(pkg.displayName)) {
    return true;
  }

  if (pkg.type === "NIR" && definition.nirAllPackages) {
    return true;
  }

  if (pkg.type === "NIR" && definition.nirPatterns?.some((pattern) => pattern.every((itemId) => normalizedCoveredItemIds.includes(itemId)))) {
    return true;
  }

  if (definition.allOf && !definition.allOf.every((itemId) => normalizedCoveredItemIds.includes(itemId))) {
    return false;
  }

  if (definition.anyOfGroups && !definition.anyOfGroups.every((group) => group.some((itemId) => normalizedCoveredItemIds.includes(itemId)))) {
    return false;
  }

  return Boolean(definition.allOf || definition.anyOfGroups);
}

function getSelectedItemIdsWithRules(packages, selectedIds) {
  const augmented = new Set(selectedIds);

  if (augmented.has("scp") || augmented.has("adicp") || augmented.has("ndicpss")) {
    augmented.add("cp");
  }

  if (augmented.has("lignin")) {
    augmented.add("adf");
  }

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

function normalizeCoverageIds(coverageIds) {
  const normalized = new Set(coverageIds);
  if (normalized.has("ivsd7-o")) {
    normalized.add("ivsd7");
  }
  if (normalized.has("total-amino-acid")) {
    normalized.add("total-amino-acids");
  }
  return Array.from(normalized);
}

function getEligibleChemistryPackages(currentProduct, selectedIds) {
  let packages = getSpeciesEligiblePackages(state.chemistryPackages);

  if (currentProduct?.name === "Manure") {
    const allowedNames = new Set(["Fecal Starch", "Apparent Digestibility"]);
    packages = packages.filter((pkg) => allowedNames.has(pkg.displayName));
  }

  if (isOnlyMoistureOrDryMatterSelection(selectedIds)) {
    packages = packages.filter((pkg) => pkg.displayName === "Moisture");
  }

  if (selectedIds.includes("cp") || selectedIds.some((itemId) => ["scp", "adicp", "ndicpss"].includes(itemId))) {
    packages = packages.filter((pkg) => pkg.displayName !== "CP");
  }

  return packages;
}

function getEligibleNirPackages() {
  return getSpeciesEligiblePackages(state.nirPackages);
}

function getSpeciesEligiblePackages(packages) {
  return packages.filter((pkg) => isSpeciesEligiblePackage(pkg));
}

function isSpeciesEligiblePackage(pkg) {
  if (EXCLUDED_PACKAGE_DISPLAY_NAMES.includes(pkg.displayName)) {
    return false;
  }

  if (state.selectedSpecies === "swine") {
    return !packageNameIncludesPart(pkg.displayName, "Equine") && !packageNameIncludesPart(pkg.displayName, "VP Swine");
  }

  if (state.selectedSpecies === "equine") {
    return !packageNameIncludesPart(pkg.displayName, "Swine") && !packageNameIncludesPart(pkg.displayName, "Equine - Poulin");
  }

  return !hasExcludedPackageNamePart(pkg.displayName);
}

function getPackagePreferenceScore(pkg) {
  if (state.selectedSpecies === "swine" && packageNameIncludesPart(pkg.displayName, "Swine")) {
    return 1;
  }

  if (state.selectedSpecies === "equine" && packageNameIncludesPart(pkg.displayName, "Equine")) {
    return 1;
  }

  return 0;
}

function packageNameIncludesPart(displayName, part) {
  return displayName.toLowerCase().includes(part.toLowerCase());
}

function isOnlyMoistureOrDryMatterSelection(selectedIds) {
  return selectedIds.length > 0 && selectedIds.every((itemId) => itemId === "dry-matter" || itemId === "moisture");
}

function isMineralsOnlySelection(selectedIds) {
  const allowedMineralIds = new Set([
    "ca",
    "p",
    "mg",
    "k",
    "s",
    "cl",
    "na",
    "zn",
    "mn",
    "cu",
    "fe",
    "al",
    "boron",
    "salt-cl-as-nacl",
    "mo"
  ]);

  return selectedIds.length > 0 && selectedIds.every((itemId) => allowedMineralIds.has(itemId));
}

function hasSelectedMineralsExcludingAsh(selectedIds) {
  const mineralIdsExcludingAsh = new Set([
    "ca",
    "p",
    "mg",
    "k",
    "s",
    "cl",
    "na",
    "zn",
    "mn",
    "cu",
    "fe",
    "al",
    "boron",
    "salt-cl-as-nacl",
    "mo"
  ]);

  return selectedIds.some((itemId) => mineralIdsExcludingAsh.has(itemId));
}

function hasSelectedNonMinerals(selectedIds) {
  const mineralAndAshIds = new Set([
    "ash",
    "ca",
    "p",
    "mg",
    "k",
    "s",
    "cl",
    "na",
    "zn",
    "mn",
    "cu",
    "fe",
    "al",
    "boron",
    "salt-cl-as-nacl",
    "mo"
  ]);

  return selectedIds.some((itemId) => !mineralAndAshIds.has(itemId));
}

function shouldPreferNirWithChemistryMinerals(selectedIds, nirResult, hybridResult) {
  return hasSelectedMineralsExcludingAsh(selectedIds) &&
    hasSelectedNonMinerals(selectedIds) &&
    !nirResult.solution &&
    Boolean(hybridResult?.solution);
}

function splitSelectedIdsForNirAndChemistry(selectedIds) {
  const mineralIdsExcludingAsh = new Set([
    "ca",
    "p",
    "mg",
    "k",
    "s",
    "cl",
    "na",
    "zn",
    "mn",
    "cu",
    "fe",
    "al",
    "boron",
    "salt-cl-as-nacl",
    "mo"
  ]);

  const hasMixedMineralsRequest =
    hasSelectedMineralsExcludingAsh(selectedIds) && hasSelectedNonMinerals(selectedIds);

  if (!hasMixedMineralsRequest) {
    return {
      nirSelectedIds: selectedIds,
      chemistrySelectedIds: selectedIds
    };
  }

  return {
    nirSelectedIds: selectedIds.filter((itemId) => !mineralIdsExcludingAsh.has(itemId)),
    chemistrySelectedIds: selectedIds
  };
}

function hasMineralsOnlyGap(missingSelectedIds) {
  return missingSelectedIds.length > 0 && isMineralsOnlySelection(missingSelectedIds);
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

function renderSpeciesOptions() {
  elements.speciesSelect.value = state.selectedSpecies;
}

function renderCalculations() {
  elements.calculationContainer.innerHTML = "";
  const searchTerm = state.searchTerm;
  const visibleCalculations = CALCULATION_DEFINITIONS.filter((definition) => {
    if (!searchTerm) {
      return true;
    }
    const searchText = `${definition.label} ${(definition.aliases ?? []).join(" ")}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  const card = document.createElement("section");
  card.className = "category-card";
  card.innerHTML = `
    <div class="category-head">
      <h3>Calculations</h3>
      <span>${visibleCalculations.length} shown</span>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "calculation-grid";

  visibleCalculations.forEach((definition) => {
    const option = document.createElement("div");
    option.className = "nutrient-option";

    const checkbox = document.createElement("input");
    checkbox.className = "nutrient-toggle";
    checkbox.type = "checkbox";
    checkbox.id = `calc-${definition.id}`;
    checkbox.checked = state.selectedCalculations.has(definition.id);

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerHTML = `<span class="nutrient-name">${escapeHtml(definition.label)}</span>`;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.selectedCalculations.add(definition.id);
      } else {
        state.selectedCalculations.delete(definition.id);
      }
      renderSelections();
      renderCalculations();
      renderResults();
    });

    option.appendChild(checkbox);
    option.appendChild(label);
    grid.appendChild(option);
  });

  card.appendChild(grid);
  elements.calculationContainer.appendChild(card);
}

function renderFeedTypeDropdown() {
  elements.feedTypeList.classList.toggle("hidden", !state.feedTypeDropdownOpen);
  renderFeedTypeList();
}

function renderFeedTypeList() {
  const searchTerm = elements.feedTypeInput.value.trim().toLowerCase();
  const visibleProducts = state.products.filter((product) => {
    if (EXCLUDED_FEED_TYPE_NAMES.includes(product.name)) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }
    return buildFeedTypeSearchText(product, state.productLookup).includes(searchTerm);
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
  const selectedNutrients = Array.from(state.selectedItems)
    .map((id) => state.itemMap.get(id))
    .filter(Boolean)
    .sort((a, b) => a.display.localeCompare(b.display));
  const selectedCalculations = Array.from(state.selectedCalculations)
    .map((id) => state.calculationMap.get(id))
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label));
  const totalSelections = selectedNutrients.length + selectedCalculations.length;

  elements.selectionSummary.textContent = `${totalSelections} selection${totalSelections === 1 ? "" : "s"} selected`;
  elements.selectedChips.innerHTML = "";

  if (!totalSelections) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Select nutrients and calculations to calculate the lowest-cost package recommendations.";
    elements.selectedChips.appendChild(empty);
    return;
  }

  selectedNutrients.forEach((item) => {
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

  selectedCalculations.forEach((calculation) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `<span>${escapeHtml(calculation.label)}</span><button type="button" aria-label="Remove ${escapeHtml(calculation.label)}">x</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      state.selectedCalculations.delete(calculation.id);
      renderSelections();
      renderCalculations();
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

  if (!state.selectedItems.size && !state.selectedCalculations.size && !hasSpeciesAutoRecommendation()) {
    elements.resultsState.innerHTML = `<div class="loading-card"><p class="empty-state">Recommendations will appear here after nutrients are selected.</p></div>`;
    return;
  }

  const baseSelectedNutrientIds = Array.from(state.selectedItems);
  const selectedCalculationIds = Array.from(state.selectedCalculations);
  const currentProduct = getCurrentProduct();
  const selectedIds = Array.from(new Set([
    ...getExpandedSelectionIds(baseSelectedNutrientIds, selectedCalculationIds, currentProduct),
    ...getSpeciesPackageRequirementIds()
  ]));
  const { nirSelectedIds, chemistrySelectedIds: chemistryBaseSelectedIds } = splitSelectedIdsForNirAndChemistry(selectedIds);
  const currentFeedTypeLabel = getCurrentFeedTypeLabel();
  const mineralsOnlyRequest = isMineralsOnlySelection(selectedIds);
  const chemistryPackages = getEligibleChemistryPackages(currentProduct, selectedIds);
  const chemistrySelectedIds = getSelectedItemIdsWithRules(chemistryPackages, chemistryBaseSelectedIds);
  const chemistryPackagesWithCalcs = chemistryPackages.map((pkg) => ({
    ...pkg,
    coverageIds: normalizeCoverageIds([
      ...pkg.coveredItemIds,
      ...getPackageCalculationIds(pkg, currentProduct, pkg.coveredItemIds),
      ...getSpeciesPackageCoverageIds(pkg)
    ])
  }));
  const chemistryResult = optimizePackagesCore(chemistryPackagesWithCalcs, chemistrySelectedIds);
  const nirCandidates = getEligibleNirPackages()
    .map((pkg) => {
      const coveredItemIds = getNirCoveredItemIdsForProduct(pkg, currentProduct);
      const speciesCoverageIds = getSpeciesPackageCoverageIds(pkg);
      if (!coveredItemIds.length && !speciesCoverageIds.length) {
        return null;
      }
      return {
        ...pkg,
        coveredItemIds,
        coverageIds: normalizeCoverageIds([
          ...coveredItemIds,
          ...getPackageCalculationIds(pkg, currentProduct, coveredItemIds),
          ...speciesCoverageIds
        ])
      };
    })
    .filter(Boolean);
  const nirOptimizedSelectedIds = getSelectedItemIdsWithRules(nirCandidates, nirSelectedIds);
  const nirResult = optimizePackagesCore(nirCandidates, nirOptimizedSelectedIds);
  const hybridResult = buildHybridResult(nirCandidates, chemistryPackagesWithCalcs, selectedIds, nirOptimizedSelectedIds);
  const nirCardConfig = {
    methodLabel: "NIR",
    title: `NIR for ${currentFeedTypeLabel}`,
    result: nirResult,
    showFullCoverage: true,
    noMatchMessage: "There are no NIR packages available for the currently selected feed type and nutrients.",
    hybridResult,
    hybridSummary: hasSelectedMineralsExcludingAsh(selectedIds) && hasSelectedNonMinerals(selectedIds) && hybridResult?.solution
      ? "One package is enough to cover the currently selected nutrients, but we recommend adding minerals by chemistry."
      : null
  };
  const chemistryCardConfig = {
    methodLabel: "",
    title: `Chemistry for ${currentFeedTypeLabel}`,
    result: chemistryResult,
    showFullCoverage: true
  };
  const nirDisplayedCost = nirResult.solution?.totalCost ?? hybridResult?.solution?.totalCost ?? Number.POSITIVE_INFINITY;
  const chemistryDisplayedCost = chemistryResult.solution?.totalCost ?? Number.POSITIVE_INFINITY;
  const preferNirWithChemistryMinerals = shouldPreferNirWithChemistryMinerals(selectedIds, nirResult, hybridResult);
  const showChemistryFirst =
    state.chemistryOnly ||
    isMineralsOnlySelection(selectedIds) ||
    (!preferNirWithChemistryMinerals && nirResult.coverableCount === 0) ||
    (!preferNirWithChemistryMinerals && chemistryDisplayedCost <= nirDisplayedCost);
  const orderedCards = showChemistryFirst
    ? [chemistryCardConfig, nirCardConfig]
    : [nirCardConfig, chemistryCardConfig];

  orderedCards.forEach((cardConfig) => {
    if ((state.chemistryOnly || mineralsOnlyRequest) && cardConfig.methodLabel === "NIR") {
      return;
    }
    elements.resultsState.appendChild(createResultCard(cardConfig));
  });
}

function createResultCard({ methodLabel, title, result, showFullCoverage = false, noMatchMessage = "None of the currently selected nutrients are available in this method.", hybridResult = null, hybridSummary = null }) {
  const fragment = elements.resultCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".result-card");
  const showHybridWithPrimary = Boolean(result.solution && hybridResult?.solution && hybridSummary);

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
      card.querySelector(".result-summary").textContent = hybridSummary ?? "NIR alone cannot cover every selected nutrient, so this estimate combines NIR and Chemistry packages.";
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
    card.querySelector(".price-pill").textContent = formatMoney(showHybridWithPrimary ? hybridResult.solution.totalCost : result.solution.totalCost);
    card.querySelector(".result-summary").textContent =
      showHybridWithPrimary
        ? hybridSummary
        : result.solution.alternativeSolutions?.length > 0
        ? "Two options available at the same price."
        : result.solution.packages.length === 1
          ? "One package is enough to cover the currently selected nutrients."
          : `${result.solution.packages.length} packages are needed to cover the currently selected nutrients.`;

    const packageList = card.querySelector(".package-list");
    const samePriceSinglePackageAlternatives =
      !showHybridWithPrimary &&
      result.solution.alternativeSolutions?.length > 0 &&
      result.solution.packages.length === 1 &&
      result.solution.alternativeSolutions.every((solution) => solution.packages.length === 1);

    if (showHybridWithPrimary) {
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
    } else if (samePriceSinglePackageAlternatives) {
      const options = [
        {
          packages: result.solution.packages,
          totalCost: result.solution.totalCost,
          allCoveredItemIds: result.solution.allCoveredItemIds
        },
        ...result.solution.alternativeSolutions
      ];

      options.forEach((option, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "alternate-card";
        wrapper.innerHTML = `
          <div class="alternate-card-top">
            <div class="alternate-card-title">Option ${index + 1}: ${escapeHtml(option.packages.map((pkg) => pkg.displayName).join(" + "))}</div>
            <div>${formatMoney(option.totalCost)}</div>
          </div>
          <p class="alternate-card-copy">${escapeHtml(formatAlternateCoverageText(option.allCoveredItemIds))}</p>
        `;
        packageList.appendChild(wrapper);
      });
    } else {
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
    }

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

    if (result.solution.alternativeSolutions?.length && !samePriceSinglePackageAlternatives) {
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
    showFullCoverage && showHybridWithPrimary
      ? hybridResult.solution.allCoveredItemIds
      : showFullCoverage && result.solution
        ? result.solution.allCoveredItemIds
        : result.coveredSelectedIds
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
    .map((id) => state.itemMap.get(id) ?? state.calculationMap.get(id))
    .filter(Boolean)
    .sort((a, b) => (a.display ?? a.label).localeCompare(b.display ?? b.label))
    .forEach((item) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.textContent = item.display ?? item.label;
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
      const coverageSource = pkg.coverageIds ?? pkg.coveredItemIds;
      const coverage = coverageSource.filter((id) => selectedMaskMap.has(id));
      if (!coverage.length) {
        return null;
      }

      let mask = 0n;
      coverage.forEach((id) => {
        mask |= 1n << selectedMaskMap.get(id);
      });

      return { ...pkg, mask, coverage, preferenceScore: getPackagePreferenceScore(pkg) };
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
  states.set("0|0", { mask: 0n, mode: 0, sumPrice: 0, preferenceScore: 0, chosenIndexes: [] });

  reducedPackages.forEach((pkg, packageIndex) => {
    const snapshot = Array.from(states.values());
    snapshot.forEach((stateEntry) => {
      const nextMask = stateEntry.mask | pkg.mask;
      const nextMode = updateMode(stateEntry.mode, pkg.baseFeeFlag);
      const nextKey = `${nextMask.toString()}|${nextMode}`;
      const nextSumPrice = stateEntry.sumPrice + pkg.price;
      const nextPreferenceScore = stateEntry.preferenceScore + pkg.preferenceScore;
      const existing = states.get(nextKey);
      if (existing && isStateAsGoodOrBetter(existing, nextSumPrice, nextPreferenceScore, stateEntry.chosenIndexes.length + 1)) {
        return;
      }

      states.set(nextKey, {
        mask: nextMask,
        mode: nextMode,
        sumPrice: nextSumPrice,
        preferenceScore: nextPreferenceScore,
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
      (totalCost === bestState.totalCost && entry.mode === bestState.mode && entry.preferenceScore > bestState.preferenceScore) ||
      (totalCost === bestState.totalCost && entry.mode === bestState.mode && entry.preferenceScore === bestState.preferenceScore && entry.chosenIndexes.length < bestState.chosenIndexes.length);

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

function buildHybridResult(nirPackages, chemistryPackages, fullSelectedIds, nirSelectedIds = fullSelectedIds) {
  const nirResult = optimizePackagesCore(nirPackages, nirSelectedIds);
  if (!nirResult.coverableCount) {
    return null;
  }

  const nirCoveredIds = nirResult.solution ? nirSelectedIds : nirResult.coveredSelectedIds;
  const missingFromFullSelection = fullSelectedIds.filter((id) => !nirCoveredIds.includes(id));
  if (!missingFromFullSelection.length) {
    return null;
  }

  const nirPartialResult = optimizePackagesCore(nirPackages, nirCoveredIds);
  if (!nirPartialResult.solution) {
    return null;
  }

  const chemistrySelectedIds = getSelectedItemIdsWithRules(chemistryPackages, missingFromFullSelection);
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
      ...nirCoveredIds,
      ...missingFromFullSelection
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

      if (
        candidate.preferenceScore > other.preferenceScore &&
        other.price === candidate.price &&
        other.baseFeeFlag === candidate.baseFeeFlag
      ) {
        return false;
      }

      return other.price < candidate.price || other.baseFeeFlag !== candidate.baseFeeFlag || other.mask !== candidate.mask;
    });
  });
}

function isStateAsGoodOrBetter(existing, nextSumPrice, nextPreferenceScore, nextPackageCount) {
  return (
    existing.sumPrice < nextSumPrice ||
    (existing.sumPrice === nextSumPrice && existing.preferenceScore > nextPreferenceScore) ||
    (existing.sumPrice === nextSumPrice && existing.preferenceScore === nextPreferenceScore && existing.chosenIndexes.length <= nextPackageCount)
  );
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
