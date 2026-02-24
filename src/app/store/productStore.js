import { create } from "zustand";

const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  categories: [],
  skip: 0,
  searchQuery: "",
  selectedCategory: "",

  fetchProducts: async (skip = 0, search = "", category = "") => {
    // Caching
    if (
      get().products.length > 0 &&
      get().skip === skip &&
      get().searchQuery === search &&
      get().selectedCategory === category
    ) return;

    let url = `https://dummyjson.com/products?limit=10&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    set({
      products: data.products,
      skip,
      searchQuery: search,
      selectedCategory: category,
    });
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) return;

    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    set({ categories: data });
  },

  fetchProductById: async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    set({ selectedProduct: data });
  },
}));

export default useProductStore;
