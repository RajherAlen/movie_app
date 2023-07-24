import { Label } from 'components/ui/label';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValue,
} from 'components/ui/ui-select';

interface SelectProps {
    placeholder?: string;
    label: string;
    options: any[];
}

const Select = (props: SelectProps) => {
    return (
        <>
            <Label className="mb-1 block text-sm font-normal text-slate-400">
                {props.label}
            </Label>

            <SelectRoot>
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
        </>
    );
};

export default Select;
