import { JSONSchema6 } from 'json-schema';
import * as React from 'react';
import { randomString } from '../../utils';
import { DataTypeEditProps } from '../Filters';
import Select, { SelectProps } from '../Select';
import { getJsonDescription } from './utils';

export const operators = {
	is: {
		getLabel: (_s: JSONSchema6) => 'is',
	},
	is_not: {
		getLabel: (_s: JSONSchema6) => 'is not',
	},
};

type OperatorSlug = keyof typeof operators;

interface EnumFilter extends JSONSchema6 {
	title: OperatorSlug;
	properties?: {
		[k: string]: {
			const?: any;
			not?: {
				const?: any;
			};
		};
	};
}

export const decodeFilter = (
	filter: EnumFilter,
): {
	field: string;
	operator: OperatorSlug;
	value: any;
} | null => {
	const operator = filter.title;

	if (!filter.properties) {
		return null;
	}

	const keys = Object.keys(filter.properties);
	if (!keys.length) {
		return null;
	}
	let value: string;

	const field = keys[0];

	if (operator === 'is') {
		value = filter.properties[field].const;
	} else if (operator === 'is_not') {
		value = filter.properties[field].not!.const;
	} else {
		return null;
	}

	return {
		field,
		operator,
		value,
	};
};

export const createFilter = (
	field: string,
	operator: OperatorSlug,
	value: any,
	schema: JSONSchema6,
): EnumFilter => {
	const { title } = schema;
	const base: EnumFilter = {
		$id: randomString(),
		title: operator,
		description: getJsonDescription(
			title || field,
			operators[operator].getLabel(schema),
			value,
		),
		type: 'object',
	};

	if (operator === 'is') {
		return Object.assign(base, {
			properties: {
				[field]: {
					const: value,
				},
			},
			required: [field],
		});
	}

	if (operator === 'is_not') {
		return Object.assign(base, {
			properties: {
				[field]: {
					not: {
						const: value,
					},
				},
			},
		});
	}

	return base;
};

export const Edit = ({
	schema,
	value,
	onUpdate,
	...props
}: DataTypeEditProps & SelectProps<string>) => (
	<Select<string>
		{...props}
		options={schema.enum as string[]}
		value={value}
		onChange={({ option }) => onUpdate(option)}
	/>
);
