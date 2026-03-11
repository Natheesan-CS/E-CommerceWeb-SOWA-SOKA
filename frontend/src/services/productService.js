import axios from "axios";

const API_URL = "http://localhost:8080/api/products";
const API_CAT_URL = "http://localhost:8080/api/categories";
// READ
export const getAllProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const searchProducts = (keyword) => axios.get(`${API_URL}/search?keyword=${keyword}`);

// CREATE
export const createProduct = (product) => axios.post(API_URL, product);

// UPDATE
export const updateProduct = (id, product) =>
  axios.put(`${API_URL}/${id}`, product);

// DELETE
export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`);

// UPLOAD IMAGE
export const uploadImage = (formData) =>
  axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// CATEGORIES API
export const getCategories = () => axios.get(API_CAT_URL);
export const getMainCategories = () => axios.get(`${API_CAT_URL}/main`);
export const getSubCategories = (parentCategory) => axios.get(`${API_CAT_URL}/sub/${parentCategory}`);
export const createCategory = (category) => axios.post(API_CAT_URL, category);
export const updateCategory = (id, category) => axios.put(`${API_CAT_URL}/${id}`, category);
export const deleteCategory = (id) => axios.delete(`${API_CAT_URL}/${id}`);
export const seedCategories = () => axios.post(`${API_CAT_URL}/seed`);

// HERO API
const API_HERO_URL = "http://localhost:8080/api/hero";
export const getHeroSection = () => axios.get(API_HERO_URL);
export const updateHeroSection = (data) => axios.put(API_HERO_URL, data);

// CMS API
const API_PROMO_URL = "http://localhost:8080/api/promos";
const API_REVIEW_URL = "http://localhost:8080/api/reviews";
const API_FOOTER_URL = "http://localhost:8080/api/footer";

export const getNewArrivals = () => axios.get(`${API_URL}/new-arrivals`);

export const getPromoBanners = () => axios.get(API_PROMO_URL);
export const createPromoBanner = (data) => axios.post(API_PROMO_URL, data);
export const updatePromoBanner = (id, data) => axios.put(`${API_PROMO_URL}/${id}`, data);
export const deletePromoBanner = (id) => axios.delete(`${API_PROMO_URL}/${id}`);

export const getCustomerReviews = () => axios.get(API_REVIEW_URL);
export const createCustomerReview = (data) => axios.post(API_REVIEW_URL, data);
export const updateCustomerReview = (id, data) => axios.put(`${API_REVIEW_URL}/${id}`, data);
export const deleteCustomerReview = (id) => axios.delete(`${API_REVIEW_URL}/${id}`);

export const getFooterSettings = () => axios.get(API_FOOTER_URL);
export const updateFooterSettings = (data) => axios.put(API_FOOTER_URL, data);
