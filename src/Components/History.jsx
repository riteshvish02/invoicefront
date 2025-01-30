import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllInvoices } from '../Store/Actions/UserAction';

const History = () => {
  const dispatch = useDispatch();
  const { loading, allinvoice } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetAllInvoices());
  }, [dispatch]);

  const viewInvoice = (invoiceNumber) => {
    alert(`View details for invoice: ${invoiceNumber}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice History</h1>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Invoice Number</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total Amount</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {allinvoice?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">No invoices found.</td>
                </tr>
              ) : (
                allinvoice?.invoices?.map((invoice) => (
                  <tr key={invoice.invoiceNumber} className="border-b">
                    <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                    <td className="py-3 px-4">{invoice.customer?.name}</td>
                    <td className="py-3 px-4">{new Date(invoice.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">${invoice.total}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => viewInvoice(invoice.invoiceNumber)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
