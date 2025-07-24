import React, { useState, useEffect } from "react";
import { Logs, XCircle } from "lucide-react";
import axios from "axios";
import Header from "../component/AdminPanel/Header";
import Messages from "../component/AdminPanel/Messages";
import ProfileSection from "../component/AdminPanel/ProfileSection";
import AddProductSection from "../component/AdminPanel/AddProductSection";
import ManageProductsSection from "../component/AdminPanel/ManageProductsSection";
import ManageCustomersSection from "../component/AdminPanel/ManageCustomersSection";

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
};
const Admin = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

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
  const purityOptions = ["24", "22", "18", "14", "10", "925", "999"];
  const metalColourOptions = ["yellow", "white", "rose"];

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
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
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

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
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
  }, [products, searchTerm, filterCategory]);

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

  // Handle form submission to add a new product
  // const handleAddProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${API_BASE_URL}/jewellery`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         ...formData,
  //         images: formData.image ? [formData.image] : [],
  //         filterLists: [
  //           formData.metal,
  //           formData.gender,
  //           formData.occasion,
  //           formData.category,
  //           formData.purity,
  //           formData.metalColour,
  //         ].filter(Boolean),
  //       }),
  //     });

  //     if (!response.ok) throw new Error("Failed to add product");

  //     const data = await response.json();
  //     setProducts([...products, data.data]);
  //     setSuccess("Product added successfully!");
  //     setError(null);
  //     setFormData(initialState);
  //   } catch (err) {
  //     setError(err.message || "Failed to add product.");
  //     console.log(err);
  //     setSuccess(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const productData = {
        ...formData,
        // images: formData.image ? [formData.image] : [],
        filterLists: [
          formData.metal,
          formData.gender,
          formData.occasion,
          formData.category,
          formData.purity,
          formData.metalColour,
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

      setProducts([...products, data.data]);
      setSuccess("Product added successfully!");
      setError(null);
      setFormData(initialState);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add product."
      );
      console.error(err);
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

  function handleImageChange(e) {
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
  }

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
            categoryOptions={categoryOptions}
            metalOptions={metalOptions}
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
      </main>
    </div>
  );
};

export default Admin;
