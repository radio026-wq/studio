"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactSection() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you soon.",
        });
        form.reset();
    }

  return (
    <Card className="shadow-lg">
      <div className="grid md:grid-cols-2">
        <div className="p-6">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                <CardDescription>
                    Have a question or a song request? Drop us a line!
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Your message..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                    </Button>
                </form>
            </Form>
        </div>
        <div className="p-6 bg-muted/50 md:rounded-r-lg border-l">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4 text-sm">
                <a href="mailto:contact@radio.com" className="flex items-center gap-3 group">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">contact@radio.com</span>
                </a>
                <a href="tel:1-800-555-RADIO" className="flex items-center gap-3 group">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">1-800-555-RADIO</span>
                </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
                Call us live for shout-outs and to participate in our contests!
            </p>
        </div>
      </div>
    </Card>
  );
}
