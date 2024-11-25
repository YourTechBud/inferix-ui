import { useState, useRef } from 'react';
import { Button } from '@/ui/components/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogActions,
} from '@/ui/components/dialog';
import { Field, Label } from '@/ui/components/fieldset';
import { Input } from '@/ui/components/input';

type APIKeyModalProps = {
  hasIcon?: boolean;
  addAPIKey: (description: string) => void;
};

export default function APIKeyModal({ hasIcon, addAPIKey }: APIKeyModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const descriptionInput = useRef<HTMLInputElement | null>(null);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  const handleCreate = () => {
    const description = descriptionInput.current?.value;

    if (typeof description === 'string') {
      // todo: remove mock function
      addAPIKey(description);

      // todo: submit request to API endpoint

      closeDialog();
    }
  };

  return (
    <>
      <Button onClick={openDialog}>
        {hasIcon && <Plus />}
        Create API Key
      </Button>
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>Create a New API Key</DialogTitle>
        <DialogBody className="mt-6">
          <Field>
            <Label>Enter a description for your new API key.</Label>
            <Input name="description" ref={descriptionInput} autoFocus />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button outline onClick={closeDialog}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
