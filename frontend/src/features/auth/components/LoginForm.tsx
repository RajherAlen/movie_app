// src/LoginForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import FormField from 'components/form/FormField';
import { Button } from 'components/ui/Button';
import { Form } from 'components/ui/form';

import { useAppDispatch, useAppSelector } from 'app/auth/hooks';

import { zodResolver } from '@hookform/resolvers/zod';
import { handleError } from 'libs/handleError';
import { z } from 'zod';

import { useLoginMutation } from '../actions/authApiSlice';
import { setCredentials } from '../authSlice';
import { LoginFormValues, loginSchema } from './loginSchema';
import ActionButton from 'components/buttons/ActionButton';

const initialData = {
    username: '',
    password: '',
};

const LoginForm = () => {
    const { userToken } = useAppSelector((state) => state.authStore);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [errors, setErrors] = useState<Record<string, string>>(initialData);

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userToken) {
            navigate('/dashboard');
        }
    }, [navigate, userToken]);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: initialData,
    });

    const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
        const validation = loginSchema.safeParse(values);

        if (validation.success) {
            const data = await login(values);
            dispatch(setCredentials(data));
        } else {
            const newErrors = handleError(validation);
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-2xl mb-10">Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:space-y-6 w-80">
                    <div className="w-full">
                        <FormField name="username" errorMessage={errors.username} placeholder="Username" form={form} />
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
                    <ActionButton actionLabel='Login' isLoading={isLoading} />
                </form>
            </Form>
            <p className="mt-10 text-sm">
                Don't have account?{' '}
                <Link className="text-sky-400" to="/auth/register">
                    Create account.
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
