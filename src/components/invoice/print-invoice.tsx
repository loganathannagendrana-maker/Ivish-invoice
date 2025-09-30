import type { Invoice } from '@/lib/types';
import Logo from '@/components/logo';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

interface PrintInvoiceProps {
  invoice: Invoice;
}

export function PrintInvoice({ invoice }: PrintInvoiceProps) {
  const GST_RATE = 0.12;
  return (
    <div className="bg-white text-black p-8 font-sans">
      <header className="flex justify-between items-start mb-8 border-b-2 border-gray-200 pb-4">
        <div>
          <Logo className="h-12 w-12 text-gray-800" />
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Ivish Spa & MakeOvers</h1>
          <p className="text-gray-600 text-sm">Ramakrishnapuram, Saravanampatti, Coimbatore, Tamil Nadu 641006</p>
          <p className="text-gray-600 text-sm">Phone: 095008 96380</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold uppercase text-gray-500">Invoice</h2>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Date:</span> {format(new Date(invoice.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </header>
      
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Bill To:</h3>
        <p className="font-bold text-lg text-gray-800">{invoice.customerName}</p>
        <p className="text-gray-600">{invoice.customerEmail}</p>
        <p className="text-gray-600 whitespace-pre-line">{invoice.customerAddress}</p>
      </section>

      <section className="mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-700">Description</th>
              <th className="p-3 font-semibold text-gray-700 text-center">Quantity</th>
              <th className="p-3 font-semibold text-gray-700 text-right">Rate</th>
              <th className="p-3 font-semibold text-gray-700 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map(item => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">{formatCurrency(item.rate)}</td>
                <td className="p-3 text-right">{formatCurrency(item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-end mb-8">
        <div className="w-full max-w-xs">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-800">{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">GST ({(GST_RATE * 100).toFixed(0)}%):</span>
            <span className="text-gray-800">{formatCurrency(invoice.gst)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t-2 border-gray-300 pt-2 mt-2">
            <span className="text-gray-800">Total:</span>
            <span className="text-gray-800">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </section>
      
      {invoice.notes && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Notes</h3>
          <p className="text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">{invoice.notes}</p>
        </section>
      )}

      <footer className="text-center text-gray-500 text-xs pt-4 border-t border-gray-200">
        <p>Thank you for your business!</p>
        <p>Generated with Ivish Spa & MakeOvers</p>
      </footer>
    </div>
  );
}
