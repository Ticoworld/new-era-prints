import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AdminProductManagement = ({serverUrl}) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    // price: "",
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${serverUrl}/product/getproducts`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleAddProduct = async () => {
    const token = localStorage.getItem('AdminToken'); // Get token from localStorage

    if (!token) {
      Swal.fire("Error", "No token found!", "error");
      return;
    }
    try {
      const response = await fetch(`${serverUrl}/product/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire("Success", "Product added successfully!", "success");
        setNewProduct({ name: "",
        //  price: "", 
         image: ""});
        fetchProducts();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error adding product.", "error");
    }
  };

  // Edit product
  const handleEditProduct = async () => {
    const token = localStorage.getItem('AdminToken'); // Get token from localStorage

    if (!token) {
      Swal.fire("Error", "No token found!", "error");
      return;
    }
    try {
      const response = await fetch(
        `${serverUrl}/product/updateproduct/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'x-access-token': token,
          },
          body: JSON.stringify(editingProduct),
        }
      );
      const data = await response.json();
      if (data.success) {
        Swal.fire("Success", "Product updated successfully!", "success");
        fetchProducts();
        setEditingProduct(null);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error updating product.", "error");
    }
  };

  // Delete product with confirmation
  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('AdminToken'); // Get token from localStorage

    if (!token) {
      Swal.fire("Error", "No token found!", "error");
      return;
    }

    // Confirmation before deletion
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${serverUrl}/product/deleteproduct/${productId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                'x-access-token': token,
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            fetchProducts();
          } else {
            Swal.fire("Error", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Error deleting product.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6">
      <div className="bg-white dark:bg-black shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-customBlue">
          Admin Product Management
        </h2>

        {/* Add New Product Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            {/* <input
              type="number"
              className="p-2 border border-gray-300 rounded-lg"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            /> */}
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <button
              onClick={handleAddProduct}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  {/* <p className="text-gray-600">₦{item.price.toFixed(2)}</p> */}

                  <div  className="flex justify-between items-center mt-1 gap-4">
                    <button
                    onClick={() => setEditingProduct(item)}
                    className="mt-2 bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-700 transition flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition flex-1"
                  >
                    Delete
                  </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Product Form */}
        {editingProduct && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Edit Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
              />
              {/* <input
                type="number"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              /> */}
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Image URL"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
              />
              <button
                onClick={handleEditProduct}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition"
              >
                Update Product
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductManagement;
