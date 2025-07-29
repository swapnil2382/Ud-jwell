import React, { useState, useEffect } from "react";
import { Logs, XCircle } from "lucide-react";
import axios from "axios";
import Header from "../component/AdminPanel/Header";
import Messages from "../component/AdminPanel/Messages";
import ProfileSection from "../component/AdminPanel/ProfileSection";
import AddProductSection from "../component/AdminPanel/AddProductSection";
import ManageProductsSection from "../component/AdminPanel/ManageProductsSection";
import ManageCustomersSection from "../component/AdminPanel/ManageCustomersSection";
import ManageNewArrivalsSection from "../component/AdminPanel/ManageNewArrivalsSection";
import NewArrivalModal from "../component/AdminPanel/NewArrivalModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  prodname: "",
  category: "",
  description: "",
  weights: [],
  metal: "",
  metalColour: "",
  gender: "",
  occasion: "",
  purity: "",
  filterLists: [],
  images: [],
  customizable: "",
  materialDescription: "",
  newArrival: "",
};

const initialNewArrivalState = {
  imageUrl: "",
  altText: "",
  description: "",
  title: "",
};

const Admin = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredNewArrivals, setFilteredNewArrivals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [customerFormData, setCustomerFormData] = useState({
    userId: "",
    fullname: "",
    email: "",
    phone: "",
    role: "",
  });
  const [newArrivalFormData, setNewArrivalFormData] = useState(initialNewArrivalState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [isNewArrivalModalOpen, setIsNewArrivalModalOpen] = useState(false);
  const [isEditingNewArrival, setIsEditingNewArrival] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dropdown options based on Mongoose schema
  const categoryOptions = [
    "ring",
    "chain",
    "stud",
    "aaram",
    "bangle",
    "bracelet",
    "coin",
    "pendant",
  ];
  const metalOptions = ["gold", "silver"];
  const genderOptions = ["men", "women", "kids", "unisex"];
  const occasionOptions = ["casual", "engagement", "wedding"];
  const purityOptions = [
    "24k",
    "22k",
    "18k",
    "14k",
    "10k",
    "925silver",
    "999silver",
  ];
  const metalColourOptions = ["yellow", "white", "rose"];

  // Normalize boolean fields to strings
  const normalizeProductData = (product) => ({
    ...product,
    customizable: product.customizable === true ? 'yes' : product.customizable === false ? 'no' : product.customizable || 'no',
    newArrival: product.newArrival === true ? 'yes' : product.newArrival === false ? 'no' : product.newArrival || 'no',
  });

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/jewellery`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.status !== "success") throw new Error(data.message || "Failed to fetch products");
        const normalizedProducts = data.data.map(normalizeProductData);
        setProducts(normalizedProducts || []);
        setFilteredProducts(normalizedProducts || []);
      } catch (err) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch all customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.status !== "success") throw new Error(data.message || "Failed to fetch customers");
        setCustomers(data.data || []);
        setFilteredCustomers(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch all new arrivals on component mount
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/new-arrivals`, {
          withCredentials: true,
        });
        if (response.data.status !== "success") throw new Error(response.data.message || "Failed to fetch new arrivals");
        setNewArrivals(response.data.data.newArrivals || []);
        setFilteredNewArrivals(response.data.data.newArrivals || []);
      } catch (err) {
        setError(err.message || "Failed to fetch new arrivals.");
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm && activeSection === "manage") {
      filtered = filtered.filter(
        (product) =>
          product.prodname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(
        (product) => product.category === filterCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, activeSection]);

  // Filter customers based on search
  useEffect(() => {
    let filtered = customers;

    if (searchTerm && activeSection === "customers") {
      filtered = filtered.filter(
        (customer) =>
          customer.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, activeSection]);

  // Filter new arrivals based on search
  useEffect(() => {
    let filtered = newArrivals;

    if (searchTerm && activeSection === "new-arrivals") {
      filtered = filtered.filter(
        (arrival) =>
          arrival.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          arrival.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNewArrivals(filtered);
  }, [newArrivals, searchTerm, activeSection]);

  // Handle product form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle customer form input changes
  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerFormData({ ...customerFormData, [name]: value });
  };

  // Handle new arrival addition
  const handleAddNewArrival = async (formData) => {
    if (newArrivals.length >= 5) {
      setError("Cannot add new arrival: Maximum of 5 new arrivals allowed.");
      setSuccess(null);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/new-arrivals`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status !== "success") throw new Error(response.data.message || "Failed to add new arrival");

      setNewArrivals([...newArrivals, response.data.data.newArrival]);
      setSuccess("New arrival added successfully!");
      setError(null);
      setNewArrivalFormData(initialNewArrivalState);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add new arrival."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle new arrival editing
  const handleEditNewArrival = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/new-arrivals/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status !== "success") throw new Error(response.data.message || "Failed to update new arrival");

      setNewArrivals(newArrivals.map((arrival) =>
        arrival._id === formData._id ? response.data.data.newArrival : arrival
      ));
      setSuccess("New arrival updated successfully!");
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to update new arrival."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle new arrival deletion
  const handleDeleteNewArrival = async (id) => {
    if (newArrivals.length <= 5) {
      setError("Cannot delete new arrival: Minimum of 5 new arrivals required.");
      setSuccess(null);
      return;
    }
    if (!window.confirm("Are you sure you want to delete this new arrival?"))
      return;

    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/new-arrivals/${id}`, {
        withCredentials: true,
      });

      if (response.data.status !== "success") throw new Error(response.data.message || "Failed to delete new arrival");

      setNewArrivals(newArrivals.filter((arrival) => arrival._id !== id));
      setSuccess("New arrival deleted successfully!");
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete new arrival.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Start editing new arrival
  const startEditingNewArrival = (arrival) => {
    setNewArrivalFormData(arrival);
    setIsEditingNewArrival(true);
    setIsNewArrivalModalOpen(true);
  };

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const productData = {
        ...formData,
        filterLists: [
          formData.metal,
          formData.gender,
          formData.occasion,
          formData.category,
          formData.purity,
          formData.metalColour,
          formData.newArrival === "yes" ? "new arrivals" : null,
        ].filter(Boolean),
      };

      const response = await axios.post(
        `${API_BASE_URL}/jewellery`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.status !== "success") throw new Error(data.message || "Failed to add product");

      const normalizedProduct = normalizeProductData(data.data);
      setProducts([...products, normalizedProduct]);
      setSuccess("Product added successfully!");
      setError(null);
      setFormData(initialState);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add product."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (jewelleryId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/jewellery/${jewelleryId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((product) => product._id !== jewelleryId));
      setSuccess("Product deleted successfully!");
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete product.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle product editing
  const handleEditProduct = async (jewelleryId, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/jewellery/${jewelleryId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.status !== "success") throw new Error(data.message || "Failed to update product");

      const normalizedProduct = normalizeProductData(data.data);
      setProducts(products.map((product) =>
        product._id === jewelleryId ? normalizedProduct : product
      ));
      setSuccess("Product updated successfully!");
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to update product."
      );
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle customer update
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/users/${customerFormData.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullname: customerFormData.fullname,
            email: customerFormData.email,
            phone: customerFormData.phone,
            role: customerFormData.role,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update customer");

      const data = await response.json();
      setCustomers(
        customers.map((c) =>
          c._id === customerFormData.userId ? data.data : c
        )
      );
      setSuccess("Customer updated successfully!");
      setError(null);
      setIsEditingCustomer(false);
      setCustomerFormData({
        userId: "",
        fullname: "",
        email: "",
        phone: "",
        role: "",
      });
    } catch (err) {
      setError(err.message || "Failed to update customer.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete customer");

      setCustomers(customers.filter((c) => c._id !== userId));
      setSuccess("Customer deleted successfully!");
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete customer.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  // Start editing customer
  const startEditingCustomer = (customer) => {
    setCustomerFormData({
      userId: customer._id,
      fullname: customer.fullname,
      email: customer.email,
      phone: customer.phone || "",
      role: customer.role,
    });
    setIsEditingCustomer(true);
  };

  // Handle image change for products
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((newBase64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newBase64Images],
        }));
      })
      .catch((err) => {
        console.error("Error reading image files:", err);
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600">
            Please log in to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Messages success={success} error={error} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "profile" && (
          <ProfileSection
            user={user}
            products={products}
            customers={customers}
            newArrivals={newArrivals}
          />
        )}
        {activeSection === "add" && (
          <AddProductSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleAddProduct={handleAddProduct}
            handleImageChange={handleImageChange}
            loading={loading}
            categoryOptions={categoryOptions}
            metalOptions={metalOptions}
            genderOptions={genderOptions}
            occasionOptions={occasionOptions}
            purityOptions={purityOptions}
            metalColourOptions={metalColourOptions}
          />
        )}
        {activeSection === "manage" && (
          <ManageProductsSection
            filteredProducts={filteredProducts}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            handleDeleteProduct={handleDeleteProduct}
            handleEditProduct={handleEditProduct}
            categoryOptions={categoryOptions}
            metalOptions={metalOptions}
            genderOptions={genderOptions}
            occasionOptions={occasionOptions}
            purityOptions={purityOptions}
            metalColourOptions={metalColourOptions}
          />
        )}
        {activeSection === "customers" && (
          <ManageCustomersSection
            filteredCustomers={filteredCustomers}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isEditingCustomer={isEditingCustomer}
            customerFormData={customerFormData}
            handleCustomerInputChange={handleCustomerInputChange}
            handleUpdateCustomer={handleUpdateCustomer}
            startEditingCustomer={startEditingCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            setIsEditingCustomer={setIsEditingCustomer}
            setCustomerFormData={setCustomerFormData}
          />
        )}
        {activeSection === "new-arrivals" && (
          <div>
            {newArrivals.length < 5 && (
              <button
                onClick={() => {
                  setNewArrivalFormData(initialNewArrivalState);
                  setIsEditingNewArrival(false);
                  setIsNewArrivalModalOpen(true);
                }}
                className="mb-6 px-6 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300 shadow-sm"
              >
                Add New Arrival
              </button>
            )}
            <ManageNewArrivalsSection
              filteredNewArrivals={filteredNewArrivals}
              loading={loading}
              handleDeleteNewArrival={handleDeleteNewArrival}
              startEditingNewArrival={startEditingNewArrival}
              newArrivalsCount={newArrivals.length}
            />
          </div>
        )}
      </main>
      <NewArrivalModal
        isOpen={isNewArrivalModalOpen}
        onClose={() => setIsNewArrivalModalOpen(false)}
        onSubmit={isEditingNewArrival ? handleEditNewArrival : handleAddNewArrival}
        initialData={newArrivalFormData}
      />
    </div>
  );
};

export default Admin;