import { PiStarFill } from 'react-icons/pi';

export function getRatings(rating: number[]) {
  const totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  const review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}

export function getOnlyRatings(rating: number[]) {
  const totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  const review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}
    </div>
  );
}
