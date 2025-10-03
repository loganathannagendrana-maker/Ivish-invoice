import Logo from '@/components/logo';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { businessDetails } from '@/lib/config';

interface PrintReportProps {
  reportData: {
    totalRevenue: number;
    totalInvoices: number;
    averageInvoiceValue: number;
    salesData: { date: string; revenue: number }[];
    topCustomers: { id: string; name: string; phone: string; totalSpent: number }[];
  };
}

export function PrintReport({ reportData }: PrintReportProps) {
  return (
    <div className="print-container bg-white text-black p-8 font-sans">
      <header className="flex justify-between items-start mb-8 border-b-2 border-gray-200 pb-4">
        <div>
          <Logo className="h-16 w-auto text-gray-800" />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">{businessDetails.name}</h1>
          <p className="text-gray-600 text-sm whitespace-pre-line">{businessDetails.address}</p>
          <p className="text-gray-600 text-sm">Phone: {businessDetails.phone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold uppercase text-gray-500">Performance Report</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Date Generated:</span> {format(new Date(), 'MMMM d, yyyy')}
          </p>
        </div>
      </header>
      
      <section className="mb-8 grid grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.totalRevenue)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Invoices</h3>
            <p className="text-2xl font-bold text-gray-900">{reportData.totalInvoices}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-700">Average Invoice Value</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.averageInvoiceValue)}</p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Top 5 Customers</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-700">Customer Name</th>
              <th className="p-3 font-semibold text-gray-700">Phone</th>
              <th className="p-3 font-semibold text-gray-700 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {reportData.topCustomers.map(customer => (
              <tr key={customer.id} className="border-b border-gray-200">
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3 text-right">{formatCurrency(customer.totalSpent)}</td>
              </tr>
            ))}
             {reportData.topCustomers.length === 0 && (
                <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">No customer data available yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Sales Over Time (Last 30 Days)</h3>
         <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-700">Date</th>
              <th className="p-3 font-semibold text-gray-700 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reportData.salesData.map(data => (
                data.revenue > 0 &&
              <tr key={data.date} className="border-b border-gray-200">
                <td className="p-3">{data.date}</td>
                <td className="p-3 text-right">{formatCurrency(data.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="text-center text-gray-500 text-xs pt-4 border-t border-gray-200">
        <p>This is an automatically generated report.</p>
        <p>Generated with {businessDetails.name}</p>
      </footer>
    </div>
  );
}
