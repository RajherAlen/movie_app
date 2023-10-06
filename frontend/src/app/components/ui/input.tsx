import * as React from 'react';

import { cn } from 'libs/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleShowPassword = () => {
        if (inputType === 'password') {
            setInputType('text');
            setShowPassword(true);
        } else if (inputType === 'text') {
            setInputType('password');
            setShowPassword(false);
        }
    };

    return (
        <div className="relative">
            <input
                type={inputType}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
            {type !== 'password' ? null : !showPassword ? (
                <EyeIcon
                    onClick={handleShowPassword}
                    width={16}
                    className="absolute right-2 top-2/4 translate-y-[-50%] text-gray-500 cursor-pointer hover:text-gray-300 transition-colors duration-200"
                />
            ) : (
                <EyeOffIcon
                    onClick={handleShowPassword}
                    width={16}
                    className="absolute right-2 top-2/4 translate-y-[-50%] text-gray-500 cursor-pointer hover:text-gray-300 transition-colors duration-200"
                />
            )}
        </div>
    );
});
Input.displayName = 'Input';

export { Input };
