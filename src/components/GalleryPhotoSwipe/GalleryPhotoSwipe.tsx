'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

type Props = {
  images: string[];
  title?: string;
};

type Dim = { w: number; h: number };

const cloudinaryTransform = (url: string, kind: 'thumb' | 'large') => {
  if (!url) return url;
  if (!url.includes('res.cloudinary.com')) return url;

  if (kind === 'thumb') {
    return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_700,dpr_auto/');
  }

  // Big image for pinch-zoom
  return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_2400,dpr_auto/');
};

function GalleryPhotoSwipe({ images, title = 'Gallery image' }: Props) {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // store real dimensions for each "large" url
  const [dims, setDims] = useState<Record<string, Dim>>({});

  const items = useMemo(() => {
    return (images || []).map((src) => {
      const thumb = cloudinaryTransform(src, 'thumb');
      const large = cloudinaryTransform(src, 'large');
      return { src, thumb, large };
    });
  }, [images]);

  // 1) Preload large images to get naturalWidth/naturalHeight (mixed aspect ratios)
  useEffect(() => {
    let cancelled = false;

    const loadOne = (url: string) =>
      new Promise<Dim | null>((resolve) => {
        const img = new window.Image();
        img.decoding = 'async';
        img.onload = () => resolve({ w: img.naturalWidth || 0, h: img.naturalHeight || 0 });
        img.onerror = () => resolve(null);
        img.src = url;
      });

    const run = async () => {
      // load sequentially to avoid hammering mobile network
      for (const it of items) {
        if (cancelled) return;
        if (dims[it.large]) continue;

        const d = await loadOne(it.large);
        if (cancelled) return;

        if (d && d.w > 0 && d.h > 0) {
          setDims((prev) => ({ ...prev, [it.large]: d }));
        }
      }
    };

    if (typeof window !== 'undefined' && items.length) run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // 2) Init PhotoSwipe
  useEffect(() => {
    if (!galleryRef.current) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      wheelToZoom: true,
      bgOpacity: 0.9,
      spacing: 0.12,
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  if (!items.length) return null;

  return (
    <div ref={galleryRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((it, i) => {
        const d = dims[it.large];

        // If dims not ready yet, we still render anchor, but give safe tiny dims.
        // Better UX: show "Loading" hint; user can still open, but zoom will be best after dims loaded.
        const w = d?.w ?? 1200;
        const h = d?.h ?? 800;
        const ready = Boolean(d?.w && d?.h);

        return (
          <a
            key={it.large + i}
            href={it.large}
            data-pswp-width={w}
            data-pswp-height={h}
            className="group relative block overflow-hidden rounded-lg ring-1 ring-slate-200"
            aria-label={`Open image ${i + 1}`}
          >
            <div className="relative h-40 w-full">
              <Image
                src={it.thumb}
                alt={`${title} ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-95"
              />
            </div>

            {/* Mobile hint */}
            <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/45 px-2 py-1 text-xs text-white sm:hidden">
              {ready ? 'Tap to zoom' : 'Loading…'}
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default GalleryPhotoSwipe;
