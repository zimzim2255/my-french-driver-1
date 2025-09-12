import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './dialog';
import { Button } from './button';

type InfoCardProps = {
  title?: string;
  description?: string;
  adminHref?: string; // admin route to open
  children?: React.ReactNode;
};

export function InfoCardDialog({ title = 'More info', description = '', adminHref, children }: InfoCardProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div className="flex gap-2 justify-end">
            {adminHref && (
              <a href={adminHref} className="btn btn-sm bg-primary text-white px-3 py-1 rounded">
                Open in Admin
              </a>
            )}
            <DialogClose asChild>
              <Button variant="outline" size="sm">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfoCardDialog;
