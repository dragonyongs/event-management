import { thumbnailOptions } from '../data/eventData';

const ThumbnailSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {thumbnailOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className={`aspect-video rounded-lg ${option.bgColor} flex items-center justify-center text-3xl
              ${selected?.id === option.id ? 'ring-2 ring-blue-500' : ''}`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default ThumbnailSelector;
