import { Heading } from './heading';

interface PageHeadingProps {
  text: string;
}

export default function PageHeading({ text }: PageHeadingProps) {
  return (
    <div className="top-0 z-10 bg-white pb-2 pt-2 lg:pt-10">
      <div className="sm:mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <Heading>{text}</Heading>
        </div>
      </div>
    </div>
  );
}
