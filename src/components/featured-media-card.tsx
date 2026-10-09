"use client";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Icon } from "./ui/icon";

interface FeaturedMediaCardProps {
  index: number;
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  onOpen: (index: number) => void;
}

export function FeaturedMediaCard({
  index,
  src,
  alt,
  eyebrow,
  title,
  onOpen,
}: FeaturedMediaCardProps) {
  return (
    <Card className="featured-media-card">
      <a
        href={src}
        data-photo-preview={String(index)}
        aria-label={`View ${title} full resolution`}
        onClick={(event) => {
          event.preventDefault();
          onOpen(index);
        }}
      >
        <CardContent className="featured-media-visual">
          <img src={src} alt={alt} loading="lazy" />
          <span className="featured-media-preview">
            VIEW SCREEN <Icon name="arrow-up-right" size={13} />
          </span>
        </CardContent>
        <CardFooter className="featured-media-caption">
          <span>
            <small>{eyebrow}</small>
            <strong>{title}</strong>
          </span>
          <Icon name="arrow-up-right" size={19} />
        </CardFooter>
      </a>
    </Card>
  );
}
