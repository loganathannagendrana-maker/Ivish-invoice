
"use client"

import { useState, useEffect } from 'react';
import type { Invoice, Customer } from '@/lib/types';
import InvoiceCreator from '@/components/invoice/invoice-creator';
import InvoiceHistory from '@/components/invoice/invoice-history';
import { PrintInvoice } from '@/components/invoice/print-invoice';
import PageLayout from '@/components/layout/page-layout';
import { useAuth } from '@/hooks/use-auth.tsx';
import { useRouter } from 'next/navigation';


const getInitialInvoice = (): Invoice => ({
  id: '',
  invoiceNumber: '',
  customerName: '',
  customerMobile: '',
  customerAddress: '',
  date: new Date().toISOString().split('T')[0],
  items: [
    { id: Date.now(), description: '', quantity: 0, rate: 0 },
  ],
  notes: '',
  subtotal: 0,
  gst: 0,
  total: 0,
});

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(getInitialInvoice());
  const [invoiceToPrint, setInvoiceToPrint] = useState<Invoice | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      router.push('/login');
    }
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      }
      const storedCustomers = localStorage.getItem('customers');
      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, [user, router]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('invoices', JSON.stringify(invoices));
        localStorage.setItem('customers', JSON.stringify(customers));
      } catch (error) {
        console.error("Failed to save to localStorage", error);
      }
    }
  }, [invoices, customers, isMounted]);

  useEffect(() => {
    if (invoiceToPrint) {
      const timer = setTimeout(() => {
        window.print();
        setInvoiceToPrint(null);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [invoiceToPrint]);

  const handleSaveAndPrint = (invoice: Invoice) => {
    const newInvoiceNumber = `INV-${Date.now()}`;
    const newInvoice: Invoice = {
      ...invoice,
      id: newInvoiceNumber,
      invoiceNumber: newInvoiceNumber,
    };
    
    setInvoices(prev => [newInvoice, ...prev]);

    // Add or update customer
    const existingCustomerIndex = customers.findIndex(c => c.phone === invoice.customerMobile && c.phone !== '');
    if (existingCustomerIndex !== -1) {
      const updatedCustomers = [...customers];
      const existingCustomer = updatedCustomers[existingCustomerIndex];
      existingCustomer.totalAppointments += 1;
      existingCustomer.totalSpent += invoice.total;
      setCustomers(updatedCustomers);
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        name: invoice.customerName,
        email: '', // email is not on the invoice form
        phone: invoice.customerMobile,
        totalAppointments: 1,
        totalSpent: invoice.total,
      };
      setCustomers(prev => [...prev, newCustomer]);
    }

    setInvoiceToPrint(newInvoice);
    setCurrentInvoice(getInitialInvoice());
  };
  
  const handleNewInvoice = () => {
    setCurrentInvoice(getInitialInvoice());
  }

  const handleClearHistory = () => {
    const today = new Date().toISOString().split('T')[0];
    setInvoices(prev => prev.filter(inv => inv.date === today));
  };

  if (!isMounted || !user) {
    return null; // Or a loading spinner
  }

  return (
    <>
      {invoiceToPrint && <PrintInvoice invoice={invoiceToPrint} />}
      <div className="no-print">
        <PageLayout>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <InvoiceCreator
                invoice={currentInvoice}
                setInvoice={setCurrentInvoice}
                onSaveAndPrint={handleSaveAndPrint}
              />
            </div>
            <div className="lg:col-span-4">
              <InvoiceHistory invoices={invoices} onClearHistory={handleClearHistory} />
            </div>
          </div>
        </PageLayout>
      </div>
    </>
  );
}
