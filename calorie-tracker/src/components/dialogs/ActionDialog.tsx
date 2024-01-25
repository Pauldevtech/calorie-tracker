import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import { Food } from "@/types/interfaces";
import { Button } from '../ui/button';

interface ActionDialogProps {
 isOpen: boolean;
 onClose: () => void;
 currentFood: Food | null;
 onDelete: (id: string) => void;
 onEdit: (food: Food) => void;
}

const ActionDialog: React.FC<ActionDialogProps> = ({ isOpen, onClose, currentFood, onDelete, onEdit }) => {
 return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-48 flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Actions</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-red-500 text-sm h-8 sm:inline-block w-24"
            onClick={() => {
              onDelete(currentFood?.id || "");
              onClose();
            }}
          >
            Delete
          </Button>
          <Button
            className="bg-blue-500 text-sm h-8 sm:inline-block w-24 mb-2"
            onClick={() => currentFood && onEdit(currentFood)}
          >
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
 );
};

export default ActionDialog;