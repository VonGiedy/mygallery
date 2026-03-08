import Image from 'next/image';

interface PhotoProps {
  photo: {
    id: string; // Database IDs are usually strings (UUIDs)
    image_url: string; // Look for image_url from the database!
    title: string;
    description: string;
  };
}

export default function PhotoCard({ photo }: PhotoProps) {
  return (
    <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
      <Image
        src={photo.image_url} 
        alt={photo.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
        <h3 className="font-semibold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {photo.title}
        </h3>
        <p className="text-sm text-gray-200 mt-2 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {photo.description}
        </p>
      </div>
    </div>
  );
}