import { Text, TextProps } from "@mantine/core";
import { Children, PropsWithChildren } from "react";
import { useStoreValue } from "~/store";
export interface FormattedNumberProps extends TextProps {
	value: number | string;
	isMoney?: boolean;
}

const FormattedNumber = (props: FormattedNumberProps) => {
	const { value, isMoney, ...rest } = props;
	const NUMBER_FORMAT = useStoreValue((state) => state.config.numberFormat);
	const MONEY_UNIT = useStoreValue((state) => state.config.moneyUnitLabel);
	const VALUE = typeof value === "number" ? value : parseInt(value, 10);
	return (
		<Text {...rest}>
			{Intl.NumberFormat(NUMBER_FORMAT).format(VALUE)}
			{isMoney && ` ${MONEY_UNIT}`}
		</Text>
	);
};

export default FormattedNumber;
