import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

export interface ItemProps {
    title: string | React.ReactNode;
    id: number;
    action?: () => void;
    children?: ItemProps[];
}

interface DropdownProps {
    children: React.ReactNode;
}

const Dropdown = (props: DropdownProps) => {
    return <DropdownMenu>{props.children}</DropdownMenu>;
};

export default Dropdown;

interface DropdownContentProps {
    items: ItemProps[];
    label?: string;
}

const DropdownContent = (props: DropdownContentProps) => {
    return (
        <DropdownMenuContent>
            {props.label && (
                <>
                    <DropdownMenuLabel>{props.label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </>
            )}
            <DropdownMenuGroup>
                {props.items.map((item: ItemProps) => {
                    if (item.children !== undefined) {
                        return (
                            <DropdownMenuSub key={item.id}>
                                <DropdownMenuSubTrigger>
                                    {item.title}
                                </DropdownMenuSubTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {item.children.map((item) => {
                                            return (
                                                <DropdownMenuItem
                                                    key={item.id}
                                                    onClick={item.action}
                                                >
                                                    {item.title}
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        );
                    }

                    return (
                        <DropdownMenuItem key={item.id} onClick={item.action}>
                            {item.title}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
};

Dropdown.Content = DropdownContent;
Dropdown.Trigger = DropdownMenuTrigger;
