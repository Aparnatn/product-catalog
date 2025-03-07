import axios from "axios";

// Fetch all product categories
export const fetchCategories = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products/categories");
  return ["All", ...data]; // Add "All" to include an option for all categories
};
