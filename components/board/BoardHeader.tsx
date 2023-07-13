interface BoardHeaderProps {
    title: string,
    imageUrl: string,
}

export default function BoardHeader( { title, imageUrl } : BoardHeaderProps ) {
  return (
    <header
      className="hidden tablet:flex h-[300px] items-center justify-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '2000px',
        backgroundPosition: 'center 20%',
      }}
    >
      <h1 className="text-white font-bold text-5xl text-center">{title}</h1>
    </header>
  );
}
