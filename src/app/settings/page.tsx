"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BusinessDetails } from "@/lib/types";
import { businessDetails as initialBusinessDetails } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/page-layout";

export default function SettingsPage() {
  const [details, setDetails] = useState<BusinessDetails>(initialBusinessDetails);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({...prev, [name]: value}));
  };

  const handleSaveChanges = () => {
    // Here you would typically save to a persistent store (e.g., database or localStorage)
    console.log("Saving changes:", details);
    toast({
        title: "Settings Saved",
        description: "Your business details have been updated.",
    });
  };

  return (
    <PageLayout>
        <div className="max-w-2xl mx-auto">
        <div className="mb-6">
            <h2 className="text-2xl font-bold font-headline">Settings</h2>
            <p className="text-muted-foreground">Manage your business information and application settings.</p>
        </div>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>This information will appear on your invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Shop Name</Label>
                    <Input id="name" name="name" value={details.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" value={details.address} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={details.phone} onChange={handleInputChange} />
                </div>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardContent>
        </Card>
        </div>
    </PageLayout>
  );
}
