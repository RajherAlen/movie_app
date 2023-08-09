import { Button } from 'components/ui/Button';

import { Mail, Moon, PlusCircle, Sun, UserPlus } from 'lucide-react';
import { useTheme } from 'next-themes';

import Dropdown, { ItemProps } from './Dropdown';

const ModeToggle = () => {
    const { setTheme } = useTheme();

    const dropdownItems: ItemProps[] = [
        {
            title: 'Light',
            id: Math.random(),
            action: () => setTheme('light'),
        },
        {
            title: 'Dark',
            id: Math.random(),
            action: () => setTheme('dark'),
        },
        {
            title: 'System',
            id: Math.random(),
            action: () => setTheme('system'),
        },
    ];

    return (
        <Dropdown>
            <Dropdown.Trigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content items={dropdownItems}></Dropdown.Content>
        </Dropdown>
    );
};

export default ModeToggle;
