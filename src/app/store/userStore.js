import { create } from "zustand";

const useUserStore = create((set, get) => ({
  users: [],
  skip: 0,
  searchQuery: "",

  fetchUsers: async (skip = 0, search = "") => {
    // Caching: avoid refetch if same query
    if (
      get().users.length > 0 &&
      get().searchQuery === search &&
      get().skip === skip
    ) return;

    let url = `https://dummyjson.com/users?limit=10&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/users/search?q=${search}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    set({
      users: data.users,
      skip,
      searchQuery: search,
    });
  },
}));

export default useUserStore;
