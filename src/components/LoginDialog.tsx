
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
        </DialogHeader>
        <div className="text-center py-6">
          <p className="text-charcoal-600 mb-4">
            Please log in to view full vendor details and contact options.
          </p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => {
                onOpenChange(false);
                window.location.href = '/customer-login';
              }}
              className="bg-coral-500 hover:bg-coral-600"
            >
              Login as Customer
            </Button>
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
