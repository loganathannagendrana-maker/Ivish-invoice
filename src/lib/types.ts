export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  date: string;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  gst: number;
  total: number;
}

export interface Service {
  name: string;
  rate: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalAppointments: number;
  totalSpent: number;
}

export interface BusinessDetails {
  name: string;
  address: string;
  phone: string;
}
