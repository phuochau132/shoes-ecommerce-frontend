import ButtonComponent from '../button';

interface PaginatorProps {
  className?: string;
  handleShowMore: () => void;
  isLoading: boolean;
}

function PaginatorComponent({ className, handleShowMore, isLoading }: PaginatorProps) {
  return (
    <div className={`paginator-wrapper ${className || ''}`}>
      <ButtonComponent isLoading={isLoading} onClick={handleShowMore} className="m-[auto] max-w-[300px]">
        Show more
      </ButtonComponent>
    </div>
  );
}

export default PaginatorComponent;
