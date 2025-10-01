
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { serviceOptions as initialServices } from "@/lib/services";
import { formatCurrency } from "@/lib/utils";
import { AddServiceDialog } from "@/components/services/add-service-dialog";
import { EditServiceDialog } from "@/components/services/edit-service-dialog";
import type { Service } from "@/lib/types";
import PageLayout from "@/components/layout/page-layout";


export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setIsEditDialogOpen(true);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.name === updatedService.name ? updatedService : s));
    setEditingService(null);
  };
  
  const handleDeleteService = (serviceName: string) => {
    setServices(prev => prev.filter(service => service.name !== serviceName));
  };


  return (
    <>
      <AddServiceDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddService={handleAddService}
      />
      {editingService && (
        <EditServiceDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onUpdateService={handleUpdateService}
            service={editingService}
        />
      )}
      <PageLayout>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold font-headline">Services</h2>
                <p className="text-muted-foreground">Manage your salon services and pricing</p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 font-semibold">Service Name</th>
                    <th className="p-4 font-semibold text-right">Price</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.name} className="border-b">
                      <td className="p-4 font-medium">{service.name}</td>
                      <td className="p-4 text-right text-muted-foreground">{formatCurrency(service.rate)}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditClick(service)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.name)}><Trash2 className="h-4 w-4 text-destructive/80" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    </>
  );
}
