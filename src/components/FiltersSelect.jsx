import { useEffect, useState } from "react";

export default function FiltersSelect({ defaultFilters, onFiltersChange }) {
  const [selectedCategory, setSelectedCategory] = useState(
    defaultFilters.category || ""
  );
  const [selectedSize, setSelectedSize] = useState(defaultFilters.size || "");

  // Aggiorna gli stati se cambiano i defaultFilters (ad esempio al caricamento)
  useEffect(() => {
    setSelectedCategory(defaultFilters.category || "");
    setSelectedSize(defaultFilters.size || "");
  }, [defaultFilters]);

  // Quando cambia category o size, chiama il callback per aggiornare i filtri esterni e URL
  useEffect(() => {
    onFiltersChange({ category: selectedCategory, size: selectedSize });
  }, [selectedCategory, selectedSize, onFiltersChange]);

  return (
    <div className="filters-select d-flex gap-3 mb-4">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Tutte le categorie</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="outerwear">Outerwear</option>
        {/* aggiungi altre categorie se vuoi */}
      </select>

      <select
        className="form-select"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="">Tutte le taglie</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        {/* aggiungi altre taglie se vuoi */}
      </select>
    </div>
  );
}
