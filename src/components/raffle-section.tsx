"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
});

export default function RaffleSection() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "¡Inscripción Exitosa!",
            description: "Ya estás participando. ¡Mucha suerte!",
        });
        form.reset();
    }

  return (
    <Card className="shadow-lg h-full">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Ticket className="text-primary"/>
                <span>Rifas Semanales</span>
            </CardTitle>
            <CardDescription>
                ¡Participa para ganar premios increíbles cada semana! Solo tienes que registrarte.
            </CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Tu Nombre" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input placeholder="tu@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full">
                    <Ticket className="mr-2 h-4 w-4" />
                    Participar Ahora
                </Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
