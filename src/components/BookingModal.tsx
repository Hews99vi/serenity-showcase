import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-background z-10 p-6 pb-4 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground pr-8">
            Request a Quote
          </h2>
          <p className="text-muted-foreground mt-2">
            We're honoured to be part of your special day. Share your details
            below, and we'll get back to you with availability, pricing, and
            next steps.
          </p>
        </div>
        <div className="p-6 pt-4">
          <BookingForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
