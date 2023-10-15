const CardListLoader = (props: { list?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
            {Array.from({ length: props.list ? props.list : 15 }, (_, index) => (
                <div className="w-full rounded-2xl shadow" key={index}>
                    <div className={`h-420 w-full animate-pulse rounded-2xl bg-slate-800`}></div>
                </div>
            ))}
        </div>
    );
};

export default CardListLoader;
