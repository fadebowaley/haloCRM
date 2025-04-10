'use client';

import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { ActionIcon, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { useDirection } from '@core/hooks/use-direction';
import { Navigation, Swiper, SwiperSlide } from '@core/ui/carousel/carousel';
import { generateSlug } from '@core/utils/generate-slug';
import { Product } from '@/types';
import ProductModernCard from '@core/components/cards/product-modern-card';
import { routes } from '@/config/routes';

type ProductCarouselProps = {
  title: string;
  data: Product[];
  className?: string;
};

export default function ProductCarousel({
  title,
  data,
  className,
}: ProductCarouselProps) {
  const { direction } = useDirection();

  const prevButtonClassName = `${generateSlug(title)}-prev-button`;
  const nextButtonClassName = `${generateSlug(title)}-next-button`;

  return (
    <div className={cn('pt-12 @5xl:pt-16 @7xl:pt-20', className)}>
      <div className="mb-5 flex items-center justify-between">
        <Title as="h3" className="font-semibold">
          {title}
        </Title>
        <div className="flex items-start gap-4">
          <ActionIcon
            rounded="full"
            variant="outline"
            className={cn(
              'disabled:bg-gray-100 disabled:text-gray-300',
              prevButtonClassName
            )}
          >
            <PiCaretLeftBold className="h-auto w-5 rtl:rotate-180" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            variant="outline"
            className={cn(
              'recently-viewed-next-item disabled:bg-gray-100 disabled:text-gray-300',
              nextButtonClassName
            )}
          >
            <PiCaretRightBold className="h-auto w-5 rtl:rotate-180" />
          </ActionIcon>
        </div>
      </div>
      <Swiper
        key={`recently-viewed-${direction}`}
        dir={direction}
        slidesPerView={1}
        spaceBetween={20}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${nextButtonClassName}`,
          prevEl: `.${prevButtonClassName}`,
        }}
        className="recently-viewed !-mx-1 !p-1"
        breakpoints={{
          375: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
          1616: {
            slidesPerView: 5,
            spaceBetween: 28,
          },
        }}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductModernCard product={product} routes={routes} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
