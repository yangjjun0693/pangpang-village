import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRoomSpec, getAllRoomSpecs, ROOMS, type RoomSlug } from '@/data/content';
import { SITE } from '@/config/site';
import { ROOM_IMAGES } from '@/data/images';
import { RoomDetailClient } from './RoomDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomSpec(slug as RoomSlug);

  if (!room) {
    return { title: '객실을 찾을 수 없습니다' };
  }

  return {
    title: `${room.nameKo} (${room.nameEn}) | ${SITE.name}`,
    description: room.description,
    openGraph: {
      title: `${room.nameKo} | ${SITE.name}`,
      description: room.description,
      images: ROOM_IMAGES.map((img) => img.src),
    },
  };
}

export async function generateStaticParams() {
  return ROOMS.map((slug) => ({ slug }));
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoomSpec(slug as RoomSlug);

  if (!room) {
    notFound();
  }

  return <RoomDetailClient room={room} />;
}