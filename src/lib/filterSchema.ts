import type { AttributeFilterKey } from "./types";

export interface FilterFieldConfig {
  key: AttributeFilterKey;
  label: string;
  /** "single" facets store one value per product, "multi" store an array. */
  kind: "single" | "multi";
}

/**
 * Which attribute facets appear in the sidebar, and in what order, per
 * category — mirrors real Amazon (a handbag search shows Color/Material/
 * Closure Type; a phone search shows Storage/Connectivity instead). Only
 * applies once a single category is selected — a mixed "All Departments"
 * result set has no coherent attribute set to facet on, so the sidebar
 * falls back to just Category/Price/Rating/Deals in that case.
 */
export const CATEGORY_FILTER_SCHEMA: Record<string, FilterFieldConfig[]> = {
  Electronics: [
    { key: "brand", label: "Brand", kind: "single" },
    { key: "color", label: "Color", kind: "single" },
    { key: "connectivity", label: "Connectivity", kind: "single" },
    { key: "specialFeatures", label: "Special Features", kind: "multi" },
    { key: "includedComponents", label: "Included Components", kind: "multi" },
  ],
  "Home & Kitchen": [
    { key: "brand", label: "Brand", kind: "single" },
    { key: "material", label: "Material", kind: "single" },
    { key: "color", label: "Color", kind: "single" },
    { key: "specialFeatures", label: "Special Features", kind: "multi" },
    { key: "includedComponents", label: "Included Components", kind: "multi" },
  ],
  Books: [
    { key: "brand", label: "Publisher", kind: "single" },
    { key: "format", label: "Format", kind: "single" },
    { key: "genre", label: "Genre", kind: "single" },
    { key: "language", label: "Language", kind: "single" },
  ],
  "Beauty & Personal Care": [
    { key: "brand", label: "Brand", kind: "single" },
    { key: "itemForm", label: "Item Form", kind: "single" },
    { key: "skinType", label: "Skin Type", kind: "single" },
    { key: "specialFeatures", label: "Special Features", kind: "multi" },
  ],
  "Toys & Games": [
    { key: "brand", label: "Brand", kind: "single" },
    { key: "material", label: "Material", kind: "single" },
    { key: "ageRange", label: "Age Range", kind: "single" },
    { key: "specialFeatures", label: "Special Features", kind: "multi" },
    { key: "includedComponents", label: "Included Components", kind: "multi" },
  ],
  "Sports & Outdoors": [
    { key: "brand", label: "Brand", kind: "single" },
    { key: "material", label: "Material", kind: "single" },
    { key: "color", label: "Color", kind: "single" },
    { key: "specialFeatures", label: "Special Features", kind: "multi" },
    { key: "includedComponents", label: "Included Components", kind: "multi" },
  ],
};
