import React, { useState, useEffect } from "react";
import { Building2, Plus, Printer, Save, X } from 'lucide-react';
import { useDispatch } from "react-redux";
import { createinvoice } from "../Store/Actions/UserAction";
import { Navigate, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch()
  const naviagte = useNavigate();

  const [customer, setCustomer] = useState({ name: "", address: "", number: "" });
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([{ id: 1, name: "", quantity: "", price: "" }]);
  const invoiceNumber = Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    const savedInvoice = localStorage.getItem("invoice");
    if (savedInvoice) {
      const parsedInvoice = JSON.parse(savedInvoice);
      setCustomer(parsedInvoice.customer);
      setDate(parsedInvoice.date);
      setItems(parsedInvoice.items);
    }
  }, []);
const goToHistory =()=>{
  naviagte("/history")
}
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: "", price: "" }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.1).toFixed(2); // 10% tax
  };

  const calculateDiscount = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.05).toFixed(2); // 5% discount
  };

  const calculateGrandTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    const discount = parseFloat(calculateDiscount());
    return (subtotal + tax - discount).toFixed(2);
  };

  const saveInvoice = () => {
    if (!customer.name.trim() || !customer.address.trim()) {
      alert("Customer Name and Address are required!");
      return;
    }

    for (const item of items) {
      if (!item.name.trim() || item.quantity <= 0 || item.price <= 0) {
        alert("Each item must have a valid name, quantity, and price.");
        return;
      }
    }

    const invoiceData = {
      invoiceNumber,
      date,
      customer,
      items,
      total: calculateGrandTotal(),
    };
   dispatch(createinvoice(invoiceData))
   window.location.reload();
  
    
  };

  const printInvoice = () => {
    if (!customer.name.trim() || !customer.address.trim()) {
      alert("Cannot print! Customer Name and Address are required.");
      return;
    }

    for (const item of items) {
      if (!item.name.trim() || item.quantity <= 0 || item.price <= 0) {
        alert("Each item must have a valid name, quantity, and price.");
        return;
      }
    }

    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice #${invoiceNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 40px;
              color: #333;
              background: #f5f5f5;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #e0e0e0;
              padding: 40px;
              background: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 2px solid #6366f1;
            }
            .company-info {
              flex: 1;
            }
            .invoice-details {
              text-align: right;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 10px;
        
            }
            .logo {
              width: 50px;
              height: 50px;
              background: #6366f1;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
            }
            .business-name {
              font-size: 24px;
              color: #6366f1;
              font-weight: bold;
            }
            .invoice-title {
              color: #6366f1;
              font-size: 32px;
              margin: 0;
            }
            .customer-details {
              margin-bottom: 20px;
              
              background: #f8fafc;
              border-radius: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th {
              background: #6366f1;
              color: white;
              padding: 12px;
              text-align: left;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #e0e0e0;
            }
            .totals {
              width: 500px;
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
            }
            .totals-row {
           
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
            
            }
            .grand-total {
            
             
             
              border-top: 1px solid #6366f1;
              padding-top: 12px;
            }
              .p{
                  font-size: 20px;
              font-weight: bold;
              }
            .footer {
              margin-top: 60px;
              text-align: center;
              color: #666;
              border-top: 1px solid #e0e0e0;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="company-info">
                <div class="logo-section">
                  <div class="logo">B</div>
               
                </div>
                <div>123 Business Street</div>
                <div>City, State 12345</div>
                <div>Phone: (555) 123-4567</div>
                <div>Email: contact@business.com</div>
              </div>
              <div class="invoice-details">
                <h1 class="invoice-title">INVOICE</h1>
                <div>Invoice No: ${invoiceNumber}</div>
                <div>Date: ${date}</div>
              </div>
            </div>

            <div class="customer-details">
              <strong>Bill To:</strong>
              <div> <strong> Name: </strong>${customer.name}</div>
              <div><strong> Address: </strong>${customer.address}</div>
              <div><strong> Number: </strong>${customer.number || "NA"}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Items Description</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals">
            
              <div class="totals-row grand-total">
                  <h3 class="total"><strong class="p">Total:  </strong> ${calculateGrandTotal()}</h3>
             
              </div>
            </div>

            <div class="footer">
              <p>Thank you for your business!</p>
              
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Invoice Generator</h1>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Invoice No.</div>
              <div className="font-semibold">{invoiceNumber}</div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Date and Basic Info */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Customer Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter customer address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customer.number}
                  onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter phone number (optional)"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter item name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Qty"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, "price", Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Price"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={addItem}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%):</span>
                <span className="font-medium">${calculateTax()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount (5%):</span>
                <span className="font-medium">${calculateDiscount()}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total Due:</span>
                  <span className="text-lg font-semibold text-indigo-600">
                    ${calculateGrandTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={saveInvoice}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Invoice
            </button>
            <button
              onClick={printInvoice}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Invoice
            </button>
            <button
              onClick={goToHistory} // Navigate to the invoice history page
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Invoice History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;