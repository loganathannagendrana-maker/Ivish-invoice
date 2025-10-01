"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageLayout from "@/components/layout/page-layout";

export default function SupportPage() {
  return (
    <PageLayout>
        <div className="max-w-2xl mx-auto">
        <div className="mb-6">
            <h2 className="text-2xl font-bold font-headline">Support</h2>
            <p className="text-muted-foreground">Get help and find answers.</p>
        </div>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>For any questions or support requests, please reach out to us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                    If you need assistance with the application, have a feature request, or encountered an issue, our team is here to help.
                </p>
                <div>
                    <p className="font-semibold">Email Support:</p>
                    <a href="mailto:support@ivish.com" className="text-primary hover:underline">support@ivish.com</a>
                </div>
                    <div>
                    <p className="font-semibold">Phone Support:</p>
                    <p className="text-muted-foreground">095008 96380</p>
                </div>
            </CardContent>
        </Card>
        </div>
    </PageLayout>
  );
}
