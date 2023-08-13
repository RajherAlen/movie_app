import { Label } from 'components/ui/label';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValue,
} from 'components/ui/ui-select';

import { XIcon } from 'lucide-react';

interface SelectProps {
    placeholder?: string;
    label: string;
    options: any[];
    value: string;
    handleClearValue: () => void;
    onChange: (value: any) => void;
}

const Select = (props: SelectProps) => {
    return (
        <>
            <Label className="mb-1 block text-sm font-normal text-slate-400">
                {props.label}
            </Label>

            <div className="relative inline-block">
                <SelectRoot onValueChange={props.onChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder={props.placeholder}
                            className="text-slate-500"
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {props.options?.map((item) => (
                            <SelectItem value={item.name} key={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>

                {props.value && (
                    <XIcon
                        onClick={props.handleClearValue}
                        width="16"
                        height="16"
                        className="absolute top-[50%] translate-y-[-50%] right-8 cursor-pointer hover:text-slate-400"
                    />
                )}
            </div>
        </>
    );
};

export default Select;
