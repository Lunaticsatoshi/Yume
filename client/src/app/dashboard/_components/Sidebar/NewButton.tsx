'use client';

import { Hint } from '@/components/Hint';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

import CreateOrganization from '../CreateOrganization';

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="aspect-square">
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <div className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </div>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
