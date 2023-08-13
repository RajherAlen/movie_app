const CardListLoader = (props: { list: number }) => {
    return Array.from({ length: props.list }, (_, index) => (
        <div className="w-full rounded-2xl shadow" key={index}>
            <div
                className={`h-52 w-full animate-pulse rounded-2xl bg-slate-800`}
            ></div>
        </div>
    ));
};

export default CardListLoader;
