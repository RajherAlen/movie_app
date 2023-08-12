import { MovieTheaterIcon } from "components/icons";

interface EmptyStateCardProps {
    description?: string;
    title?: string;
}

const EmptyStateCard = (props: EmptyStateCardProps) => {
  return (
    <div className='rounded-xl border bg-card text-card-foreground shadow p-7 text-center'>
        <MovieTheaterIcon stroke="#fff" width={300} height={300} className="m-auto mb-6" />
        <p className='text-3xl font-bold mb-3'>{props.title}</p>
        <p className="mb-7">{props.description}</p>
    </div>
  )
}

export default EmptyStateCard