import { useEffect, useState } from 'react';
import { useGetMovieByNameQuery } from 'features/movies/api/movieApiSlice';
import { Movie } from 'features/movies/model/Movie';
import { Button } from 'components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Modal } from 'components/index';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { DialogHeader } from 'components/ui/dialog';

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

function App() {
    // const { data, isLoading } = useGetPlayingNowMoviesQuery();
    const { data, isLoading } = useGetMovieByNameQuery();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsOpen(false);
    };

    useEffect(() => {
        setLoading(isLoading);

        if (data) {
            setMovieList(data.results);
        }
    }, [data, isLoading]);

    const movieImgUrl = 'https://image.tmdb.org/t/p/original';

    return (
        <div className="bg-slate-800 min-h-screen">
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default App;

const FormContent = ({
    form,
    onSubmit,
}: {
    form: any;
    onSubmit: (values: any) => void;
}) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
