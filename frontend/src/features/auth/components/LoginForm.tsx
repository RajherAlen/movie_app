// src/LoginForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import FormField from 'components/form/FormField';
import { Button } from 'components/ui/Button';
import { Form } from 'components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { handleError } from 'libs/handleError';
import { z } from 'zod';

import { LoginFormValues, loginSchema } from './loginSchema';
import { loginUser } from '../actions/loginUser';
import { useAppDispatch } from 'app/auth/hooks';

const initialData = {
    username: '',
    password: '',
};

const LoginForm = () => {
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<Record<string, string>>(initialData);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: initialData,
    });


    const handleSubmit = (values: z.infer<typeof loginSchema>) => {
        const validation = loginSchema.safeParse(values);

        if (validation.success) {
			dispatch(loginUser(values));
            console.log('Valid data:', values);
        } else {
            const newErrors = handleError(validation);
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-2xl mb-10">Login</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4 md:space-y-6 w-80"
                >
                    <div className="w-full">
                        <FormField
                            name="username"
                            errorMessage={errors.username}
                            placeholder="Username"
                            form={form}
                        />
                    </div>

                    <div className="w-full">
                        <FormField
                            name="password"
                            errorMessage={errors.password}
                            placeholder="Password"
                            form={form}
                            type="password"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
