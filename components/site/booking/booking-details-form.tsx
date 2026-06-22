"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSiteStore } from "@/store/use-site-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  brief: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function BookingDetailsForm() {
  const setBookingStep = useSiteStore((s) => s.setBookingStep);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    console.log("Booking details:", data);
    setBookingStep(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-extrabold text-foreground">Your details</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="b-name">Full name</Label>
          <Input id="b-name" placeholder="Full name" {...register("name")} />
          {errors.name ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="b-email">Email</Label>
          <Input id="b-email" placeholder="Email" {...register("email")} />
          {errors.email ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="b-phone">Phone</Label>
          <Input id="b-phone" placeholder="Phone" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="b-location">Shoot location</Label>
          <Input id="b-location" placeholder="Shoot location" {...register("location")} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="b-brief">Mood, people, venue, must-have shots</Label>
          <Textarea
            id="b-brief"
            rows={4}
            placeholder="e.g. intimate wedding, 70 guests, riverside venue, candid style..."
            {...register("brief")}
          />
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Review booking
      </Button>
    </form>
  );
}
