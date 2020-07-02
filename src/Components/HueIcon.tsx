import React, { useRef, useEffect, useState } from "react";

export interface HueIconProps {
	iconName: string,
	color?: string,
}

export function HueIcon(props: HueIconProps): JSX.Element {

	const spanRef = useRef<HTMLSpanElement | null>(null);

	// determine color of the icon
	const [color, setColor] = useState<string>(props.color ?? '#FF0000');
	useEffect(() => {
		// set via property
		if (props.color)
			setColor(props.color);
		else if (spanRef.current) {
			// not set, determine via computed style sheet
			// so icon will get color of font
			const color = getComputedStyle(spanRef.current).color;
			if (color)
				setColor(color);
		}
		else
			// failed to determine color, default to green
			// this shows something is wrong
			setColor("#00FF00");
	}, [props.color]);

	return <span ref={spanRef}>
		{renderIcon()}
	</span>;

	function renderIcon() {
		switch (props.iconName) {
			case "Bridge": return <BridgeIcon color={color} />
		}
	}
}

interface IconProps {
	color: string;
}

function BridgeIcon(props: IconProps): JSX.Element {
	return <svg height="100%" viewBox="3 3 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
		<g stroke={props.color} strokeWidth="1.5" fill="none" fill-rule="evenodd">
			<path d="M22,8 C21.447,8 21,7.553 21,7 C21,6.447 21.447,6 22,6 C22.553,6 23,6.447 23,7 C23,7.553 22.553,8 22,8 M16,22 C12.691,22 10,19.309 10,16 C10,12.691 12.691,10 16,10 C19.309,10 22,12.691 22,16 C22,19.309 19.309,22 16,22 M9,7 C9,6.447 9.447,6 10,6 C10.553,6 11,6.447 11,7 C11,7.553 10.553,8 10,8 C9.447,8 9,7.553 9,7 M16,6 C16.553,6 17,6.447 17,7 C17,7.553 16.553,8 16,8 C15.447,8 15,7.553 15,7 C15,6.447 15.447,6 16,6 M24,4 L8,4 C5.8,4 4,5.8 4,8 L4,24 C4,26.2 5.8,28 8,28 L24,28C26.2,28 28,26.2 28,24 L28,8 C28,5.8 26.2,4 24,4"></path>
		</g>
	</svg>;
}
