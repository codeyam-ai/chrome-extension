// Overriding configs type because the package doesn't even support the type used in its example... 🤦

declare module 'react-animated-numbers' {
    export interface Props {
        animateToNumber: number;
        fontStyle?: React.CSSProperties;
        includeComma?: boolean;
        configs:
            | SpringConfig[]
            | ((
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  _: any,
                  index: number
              ) => { mass: number; tension: number; friction: number });
    }

    declare const AnimatedNumber: React.FunctionComponent<Props>;

    export default AnimatedNumber;
}
