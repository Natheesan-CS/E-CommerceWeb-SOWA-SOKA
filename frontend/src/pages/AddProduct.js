import { useState, useEffect } from "react";
import { createProduct, uploadImage, getCategories } from "../services/productService";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "Men",
    type: "",
    sizes: "",
    colors: "",
    price: "",
    quantity: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = {};

    if (!product.name.trim()) tempErrors.name = "Product name is required";
    if (!product.category.trim()) tempErrors.category = "Category is required";
    if (!product.type.trim()) tempErrors.type = "Type is required";
    if (!product.price || product.price <= 0) tempErrors.price = "Price must be greater than 0";
    if (!product.quantity || product.quantity < 0) tempErrors.quantity = "Quantity must be 0 or more";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  const mainCategories = categories.filter(c => !c.parentCategory);
  const currentSubCategories = categories.filter(c => c.parentCategory === product.category);

  const availableSizes = ["S", "M", "L", "XL", "XXL", "3XL"];

  const handleSizeToggle = (size) => {
    let currentSizes = product.sizes ? product.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (currentSizes.includes(size)) {
      currentSizes = currentSizes.filter(s => s !== size);
    } else {
      currentSizes.push(size);
    }
    setProduct({ ...product, sizes: currentSizes.join(', ') });
  };

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      const newCategory = e.target.value;
      const subCats = categories.filter(c => c.parentCategory === newCategory);
      const firstType = subCats.length > 0 ? subCats[0].name : "";

      setProduct({
        ...product,
        category: newCategory,
        type: firstType
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB limit

      if (selectedFile.size > maxSizeInBytes) {
        alert("Image size exceeds 5MB. Please choose a smaller image.");
        e.target.value = ""; // Reset the input
        setImageFile(null);
      } else {
        setImageFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      let finalImageUrl = product.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await uploadImage(formData);
        finalImageUrl = uploadRes.data;
      }

      let finalType = product.type;
      if (!finalType && currentSubCategories.length > 0) {
        finalType = currentSubCategories[0].name;
      }

      const productToSubmit = { ...product, type: finalType, imageUrl: finalImageUrl };

      await createProduct(productToSubmit);

      setSuccessMessage("✅ Product added successfully!");
      setProduct({
        name: "",
        description: "",
        category: "Men",
        type: "T-Shirts",
        sizes: "",
        colors: "",
        price: "",
        quantity: "",
        imageUrl: ""
      });
      setImageFile(null);

      // Reset file input element if needed (usually handled by form reset or React key, but we'll leave it as is for simplicity)
      document.getElementById("imageInput").value = "";

      setErrors({});

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Clothing Item</h2>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Classic Cotton T-Shirt"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
          >
            <option value="">Select a Category</option>
            {mainCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Clothing Type</label>
          <select
            name="type"
            value={product.type}
            onChange={handleChange}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
          >
            {currentSubCategories.length === 0 && <option value="">No Types Found</option>}
            {currentSubCategories.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>

        <div className="form-group">
          <label>Available Sizes</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '5px' }}>
            {availableSizes.map(size => {
              const sizesArray = product.sizes ? product.sizes.split(',').map(s => s.trim()) : [];
              const isSelected = sizesArray.includes(size);
              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1.5px solid ${isSelected ? '#000000' : '#d1d5db'}`,
                    backgroundColor: isSelected ? '#000000' : 'white',
                    color: isSelected ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label>Available Colors (comma separated)</label>
          <input
            name="colors"
            value={product.colors}
            onChange={handleChange}
            placeholder="Red, Blue, Black"
          />
        </div>

        <div className="form-group">
          <label>Price (Rs.)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Soft fabric, perfect fit, breathable material..."
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
