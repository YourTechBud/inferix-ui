import { ReactNode } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from './tabs';

interface RadioButtonsProps {
  option1: string;
  option2: string;
  option1Children?: ReactNode; //content to be displayed when option1 is selected
  option2Children?: ReactNode;
}

export default function RadioButtons({
  option1,
  option2,
  option1Children,
  option2Children,
}: RadioButtonsProps) {
  return (
    <TabGroup>
      <TabList>
        <Tab index={0} title={option1} />
        <Tab index={1} title={option2} />
      </TabList>
      <TabPanels>
        <TabPanel index={0}>{option1Children}</TabPanel>
        <TabPanel index={1}>{option2Children}</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
