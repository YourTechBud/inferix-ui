import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';
import { Divider } from '@/ui/components/divider';
import { Button } from '@/ui/components/button';
import { Tab, TabList, TabGroup } from '@/ui/components/tabs';
import { LuArrowRightToLine } from 'react-icons/lu';
import { BiSolidEraser } from 'react-icons/bi';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { TbArrowsExchange } from 'react-icons/tb';

type RetrievalOptionsProps = {
  handleClear: () => void;
};

export const RetrievalOptions = ({ handleClear }: RetrievalOptionsProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverButton className="hover:bg-primary-hover flex w-[14rem] flex-row items-center justify-between rounded-lg border-zinc-200 p-2 font-sans text-sm font-medium">
            Graph Retriever
            <ChevronDownIcon className="h-5 w-5 fill-zinc-500 group-hover:fill-black" />
          </PopoverButton>
          <PopoverPanel className="ml-4 flex w-64 flex-col">
            <Divider className="w-full" />
            <div className="flex p-2">
              <Button className="flex-grow">
                <TbArrowsExchange />
                Compare Retrievers
              </Button>
            </div>
          </PopoverPanel>
        </Popover>
        <Button color="light" className="text-sm/6">
          <LuArrowRightToLine />
        </Button>
        <Button color="secondary" className="text-sm/6" onClick={handleClear}>
          <BiSolidEraser />
          Clear
        </Button>
      </div>
      <TabGroup>
        <TabList>
          <Tab index={0} title="Chunks" />
          <Tab index={1} title="Generation" />
        </TabList>
      </TabGroup>
    </>
  );
};
