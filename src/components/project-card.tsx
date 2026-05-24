import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  className?: string;
  style?: React.CSSProperties;
  isLight?: boolean;
  onClick?: () => void;
};

export function ProjectCard({
  title,
  description,
  imageUrl,
  className = "",
  style,
  isLight = false,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full md:absolute md:w-[15rem] lg:w-[17rem] xl:w-[19rem] overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-500 ease-out hover:z-50 hover:scale-[1.04] md:hover:-translate-y-6 md:hover:rotate-0 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)] group cursor-pointer ${
        isLight
          ? "border-zinc-200 bg-white text-zinc-900"
          : "border-zinc-800/80 bg-zinc-950/80 text-white"
      } ${className}`}
      style={style}
    >
      {/* Image Container with aspect-4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
        
        {/* Enlarge Icon on Hover */}
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center text-zinc-400 backdrop-blur-sm shadow-md transition-all duration-300 ease-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 hover:text-white hover:border-zinc-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 15v6h-6" />
            <path d="M3 9V3h6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
