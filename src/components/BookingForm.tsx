import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Send, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  partnerName: z.string().optional(),
  eventDate: z.date({ required_error: "Please select an event date" }),
  venueLocation: z.string().optional(),
  eventType: z.string({ required_error: "Please select an event type" }),
  duration: z.string({ required_error: "Please select approximate duration" }),
  message: z.string().optional(),
  whatsappNumber: z.string().min(10, "Please enter a valid WhatsApp number"),
  email: z.string().email("Please enter a valid email address"),
  agreeToContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  onSuccess?: () => void;
}

const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      partnerName: "",
      venueLocation: "",
      message: "",
      whatsappNumber: "",
      email: "",
      agreeToContact: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: "Inquiry Sent!",
        description: "We usually respond within 24 hours with your personalized quotation.",
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-cream text-charcoal mx-auto flex items-center justify-center mb-8">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-serif font-medium text-cream mb-4">Thank You!</h3>
        <p className="text-cream/70 leading-relaxed max-w-md mx-auto">
          We've received your inquiry and will get back to you within 24 hours with your personalized quotation.
        </p>
      </div>
    );
  }

  const inputStyles = "bg-transparent border-cream/20 text-cream placeholder:text-cream/40 focus:border-cream h-12";
  const labelStyles = "text-cream/80 text-sm tracking-wider uppercase";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyles}>Your Name *</FormLabel>
              <FormControl><Input placeholder="Full name" className={inputStyles} {...field} /></FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
          <FormField control={form.control} name="partnerName" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyles}>Partner's Name</FormLabel>
              <FormControl><Input placeholder="Partner's name" className={inputStyles} {...field} /></FormControl>
            </FormItem>
          )} />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="eventDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className={labelStyles}>Event Date *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("w-full pl-3 text-left font-normal h-12 bg-transparent border-cream/20 text-cream hover:bg-cream/10", !field.value && "text-cream/40")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-charcoal border-cream/20" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
          <FormField control={form.control} name="eventType" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyles}>Event Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-transparent border-cream/20 text-cream h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-charcoal border-cream/20">
                  <SelectItem value="wedding" className="text-cream">Wedding</SelectItem>
                  <SelectItem value="pre-wedding" className="text-cream">Pre-Wedding</SelectItem>
                  <SelectItem value="engagement" className="text-cream">Engagement</SelectItem>
                  <SelectItem value="homecoming" className="text-cream">Homecoming</SelectItem>
                  <SelectItem value="other" className="text-cream">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="venueLocation" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelStyles}>Venue Location</FormLabel>
            <FormControl><Input placeholder="City or venue name" className={inputStyles} {...field} /></FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="duration" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelStyles}>Approximate Duration *</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4 pt-2">
                {[{ value: "under-3", label: "Under 3 hours" }, { value: "3-6", label: "3-6 hours" }, { value: "6-plus", label: "6+ hours" }].map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={opt.value} className="border-cream/40 text-cream" />
                    <label htmlFor={opt.value} className="text-cream/80 text-sm cursor-pointer">{opt.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )} />

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField control={form.control} name="whatsappNumber" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyles}>WhatsApp Number *</FormLabel>
              <FormControl><Input type="tel" placeholder="+94 77 123 4567" className={inputStyles} {...field} /></FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelStyles}>Email Address *</FormLabel>
              <FormControl><Input type="email" placeholder="your@email.com" className={inputStyles} {...field} /></FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelStyles}>Message / Notes</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us about your special day..." className="bg-transparent border-cream/20 text-cream placeholder:text-cream/40 focus:border-cream min-h-[120px] resize-none" {...field} />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="agreeToContact" render={({ field }) => (
          <FormItem className="flex items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-cream/40 data-[state=checked]:bg-cream data-[state=checked]:text-charcoal mt-1" />
            </FormControl>
            <div className="leading-none">
              <FormLabel className="text-cream/60 text-sm font-normal cursor-pointer">I agree to be contacted about my inquiry *</FormLabel>
              <FormMessage className="text-red-400 mt-1" />
            </div>
          </FormItem>
        )} />

        <Button type="submit" disabled={isSubmitting} className="w-full bg-cream text-charcoal hover:bg-cream/90 h-14 text-sm tracking-widest uppercase font-medium">
          {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</> : <><Send className="w-5 h-5 mr-2" />Send Inquiry</>}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
