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
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
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
            title: "¡Mensaje Enviado!",
            description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        form.reset();
    }

  return (
    <Card className="shadow-lg">
      <div className="grid md:grid-cols-2">
        <div className="p-6">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold font-headline uppercase">Ponte en Contacto</CardTitle>
                <CardDescription>
                    ¿Tienes alguna pregunta o una petición de canción? ¡Escríbenos!
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Tu Nombre" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input placeholder="tu@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Mensaje</FormLabel><FormControl><Textarea placeholder="Tu mensaje..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                    </Button>
                </form>
            </Form>
        </div>
        <div className="p-6 bg-muted/50 md:rounded-r-lg border-l">
            <h3 className="text-xl font-bold mb-4 font-headline uppercase">Información de Contacto</h3>
            <div className="space-y-4 text-sm">
                <a href="mailto:contacto@lamega.com" className="flex items-center gap-3 group">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">contacto@lamega.com</span>
                </a>
                <a href="tel:1-800-555-MEGA" className="flex items-center gap-3 group">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">1-800-555-MEGA</span>
                </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
                ¡Llámanos en vivo para saludos y para participar en nuestros concursos!
            </p>
        </div>
      </div>
    </Card>
  );
}
