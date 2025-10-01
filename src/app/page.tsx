"use client"

import { useState, useEffect } from 'react';
import type { Invoice } from '@/lib/types';
import InvoiceCreator from '@/components/invoice/invoice-creator';
import InvoiceHistory from '@/components/invoice/invoice-history';
import { PrintInvoice } from '@/components/invoice/print-invoice';
import PageLayout from '@/components/layout/page-layout';

const getInitialInvoice = (): Invoice => ({
  id: '',
  invoiceNumber: '',
  customerName: '',
  customerEmail: '',
  customerAddress: '',
  date: new Date().toISOString().split('T')[0],
  items: [
    { id: Date.now(), description: '', quantity: 1, rate: 0 },
  ],
  notes: '',
  subtotal: 0,
  gst: 0,
  total: 0,
});

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(getInitialInvoice());
  const [invoiceToPrint, setInvoiceToPrint] = useState<Invoice | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      }
    } catch (error) {
      console.error("Failed to parse invoices from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('invoices', JSON.stringify(invoices));
      } catch (error) {
        console.error("Failed to save invoices to localStorage", error);
      }
    }
  }, [invoices, isMounted]);

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
    setInvoiceToPrint(newInvoice);
    setCurrentInvoice(getInitialInvoice());
  };
  
  const handleNewInvoice = () => {
    setCurrentInvoice(getInitialInvoice());
  }

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <div className="print-container hidden">
        {invoiceToPrint && <PrintInvoice invoice={invoiceToPrint} />}
      </div>
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
            <InvoiceHistory invoices={invoices} />
          </div>
        </div>
      </PageLayout>
    </>
  );
}
