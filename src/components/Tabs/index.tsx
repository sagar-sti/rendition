import styled from 'styled-components';
import {
	TabProps,
	Tab as GrommetTab,
	Tabs as GrommetTabs,
	TabsProps,
} from 'grommet';
export { TabProps, TabsProps } from 'grommet';
import * as React from 'react';
import asRendition from '../../asRendition';

interface InnerTabProps extends TabProps {
	compact?: boolean;
}

interface InnerTabsProps extends TabsProps {
	compact?: boolean;
}

const ScrollWrapper = styled(GrommetTabs)<{
	compact?: boolean;
}>`
	${(props) => {
		if (props.compact) {
			return `
				& > div {
					scroll-snap-type: x mandatory;
					overflow-x: scroll;
					display: flex;
					flex-wrap: nowrap;

					scrollbar-width: none;
					-ms-overflow-style: none;

					&::-webkit-scrollbar {
						width: 0px;
					}
				}
			`;
		}
	}}
`;

const TabTitle = styled.span<{
	compact?: boolean;
}>`
	${(props) => {
		if (props.compact) {
			return `
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			scroll-snap-align: center;
			`;
		}
	}}
`;

export const Tab = ({ compact, title, ...props }: InnerTabProps) => {
	const wrappedTitle = <TabTitle compact={compact}>{title}</TabTitle>;
	return <GrommetTab title={wrappedTitle} {...props} />;
};

const TabsBase = ({ children, ...props }: InnerTabsProps) => {
	return (
		<ScrollWrapper justify="start" {...props}>
			{React.Children.map(
				children,
				(tab: React.ReactElement<InnerTabProps>) => {
					return React.cloneElement(tab, { compact: props.compact });
				},
			)}
		</ScrollWrapper>
	);
};

export const Tabs = (asRendition(
	TabsBase,
) as unknown) as React.FunctionComponent<TabsProps>;
