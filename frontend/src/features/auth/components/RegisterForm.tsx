// src/LoginForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import ActionButton from 'components/buttons/ActionButton';
import FormField from 'components/form/FormField';
import { Button } from 'components/ui/Button';
import { Form } from 'components/ui/form';

import { useAppDispatch } from 'app/auth/hooks';

import { zodResolver } from '@hookform/resolvers/zod';
import { handleError } from 'libs/handleError';
import validationToast from 'utils/validation/validationToast';
import { z } from 'zod';

import { useRegisterMutation } from '../actions/authApiSlice';
import { RegisterFormValues, registerSchema } from './registerSchema';

const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const [errors, setErrors] = useState<Record<string, string>>(initialData);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: initialData,
    });

    const handleSubmit = (values: z.infer<typeof registerSchema>) => {
        const validation = registerSchema.safeParse(values);
        if (validation.success) {
            register(values);

            validationToast({
                status: 'success',
                message: 'User is created',
            });
            navigate('/auth/login');
        } else {
            const newErrors = handleError(validation);
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-2xl mb-10">Create account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:space-y-6 w-80">
                    <div className="w-full">
                        <FormField
                            name="firstName"
                            errorMessage={errors.firstName}
                            placeholder="First name"
                            form={form}
                        />
                    </div>
                    <div className="w-full">
                        <FormField name="lastName" errorMessage={errors.lastName} placeholder="Last name" form={form} />
                    </div>

                    <div className="w-full">
                        <FormField name="email" errorMessage={errors.email} placeholder="Email" form={form} />
                    </div>

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

                    <div className="w-full">
                        <FormField
                            name="confirmPassword"
                            errorMessage={errors.confirmPassword}
                            placeholder="Confirm password"
                            form={form}
                            type="password"
                        />
                    </div>
                    <ActionButton actionLabel="Register" isLoading={isLoading} />
                </form>
            </Form>
            <p className="mt-10 text-sm">
                Already have account?{' '}
                <Link className="text-sky-400" to="/auth/login">
                    Login.
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
