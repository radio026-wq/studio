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
import Link from "next/link";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.06 0C5.4 0 0 5.4 0 12.06c0 3.48 1.44 6.6 3.78 8.76L0 24l3.3-3.66c2.1 1.26 4.56 1.98 7.2 1.98h.06c6.66 0 12.06-5.4 12.06-12.06C24.12 5.4 18.72 0 12.06 0zm0 0c.06 0 .12 0 .12 0h-.12zm0 0c-.06 0-.12 0-.12 0h.12zM19.38 17.52c-.24-.12-.84-.42-1.02-.48-.12-.06-.3-.06-.48.24-.18.3-.66.84-.84 1.02-.12.12-.3.18-.48.06-.9-.36-1.8-.78-2.64-1.38-.9-.66-1.56-1.44-1.8-1.8-.06-.12 0-.18.06-.24.12-.12.24-.3.36-.42.12-.12.18-.24.24-.36.06-.12.06-.24 0-.42-.06-.12-.48-1.14-.66-1.56-.18-.36-.36-.36-.48-.36h-.42c-.18 0-.42.06-.6.3-.18.24-.66.66-.66 1.56s.66 1.8.72 1.92c.06.12 1.32 2.04 3.24 2.82.42.18.78.24 1.02.3.42.12.84.06.96-.06.18-.12.84-.48.96-.96.12-.48.12-.9.06-.96-.06-.06-.18-.12-.42-.24zm0 0" />
    </svg>
  );

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
    
    const whatsappNumber = "18292051606";
    const whatsappMessage = encodeURIComponent("¡Hola! Quiero enviar un saludo y pedir una canción.");


  return (
    <Card className="shadow-lg">
      <div className="grid md:grid-cols-2">
        <div className="p-6">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold">Ponerse en Contacto</CardTitle>
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
            <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
            <div className="space-y-4 text-sm">
                <a href="mailto:dleon14@hotmail.com" className="flex items-center gap-3 group">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">dleon14@hotmail.com</span>
                </a>
                <a href="tel:829-205-1606" className="flex items-center gap-3 group">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">829-205-1606</span>
                </a>
                <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <WhatsAppIcon className="h-5 w-5 text-primary fill-primary" />
                    <span className="text-foreground group-hover:text-primary transition-colors">Enviar WhatsApp</span>
                </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
                ¡Llámanos o escríbenos por WhatsApp en vivo para saludos y para participar en nuestros concursos!
            </p>
        </div>
      </div>
    </Card>
  );
}
