import {
    createContext,
    useState,
    useEffect,
    useContext,
    useRef,
    type ReactNode,
    type FunctionComponent,
} from 'react';
import { type StripeOnramp } from '@stripe/crypto';

// Define the structure of the context
interface CryptoElementsContextType {
    onramp: any | null;
}

// Define the structure of the OnrampElement props
interface OnrampElementProps {
    clientSecret: string;
    appearance: any;
    onReady?: (payload: any) => void;
    onChange?: (payload: any) => void;
    [key: string]: any;
}

const CryptoElementsContext = createContext<CryptoElementsContextType | null>(
    null
);
CryptoElementsContext.displayName = 'CryptoElementsContext';

export const CryptoElements: FunctionComponent<{
    stripeOnramp: StripeOnramp;
    children: ReactNode;
}> = ({ stripeOnramp, children }) => {
    const [ctx, setContext] = useState<CryptoElementsContextType>(() => ({
        onramp: null,
    }));

    useEffect(() => {
        let isMounted = true;

        Promise.resolve(stripeOnramp).then((onramp) => {
            if (onramp && isMounted) {
                setContext((ctx) => (ctx.onramp ? ctx : { onramp }));
            }
        });

        return () => {
            isMounted = false;
        };
    }, [stripeOnramp]);

    return (
        <CryptoElementsContext.Provider value={ctx}>
            {children}
        </CryptoElementsContext.Provider>
    );
};

export const useStripeOnramp = (): StripeOnramp | null => {
    const context = useContext(CryptoElementsContext);
    return context?.onramp;
};

const useOnrampSessionListener = (
    type: string,
    session: any,
    callback: ((payload: any) => void) | undefined
) => {
    useEffect(() => {
        if (session && callback) {
            const listener = (e: any) => callback(e.payload);
            session.addEventListener(type, listener);
            return session.removeEventListener(type, listener);
        }
    }, [session, callback, type]);
};

export const OnrampElement: FunctionComponent<OnrampElementProps> = ({
    clientSecret,
    appearance,
    onReady,
    onChange,
    ...props
}) => {
    const stripeOnramp = useStripeOnramp();
    const onrampElementRef = useRef<HTMLDivElement>(null);
    const [session, setSession] = useState<any>();

    const appearanceJSON = JSON.stringify(appearance);
    useEffect(() => {
        const containerRef = onrampElementRef.current;
        if (containerRef) {
            containerRef.innerHTML = '';

            if (clientSecret && stripeOnramp) {
                setSession(
                    stripeOnramp
                        .createSession({
                            clientSecret,
                            appearance: appearanceJSON
                                ? JSON.parse(appearanceJSON)
                                : {},
                        })
                        .mount(containerRef)
                );
            }
        }
    }, [appearanceJSON, clientSecret, stripeOnramp]);

    useOnrampSessionListener('onramp_ui_loaded', session, onReady);
    useOnrampSessionListener('onramp_session_updated', session, onChange);

    return <div {...props} ref={onrampElementRef}></div>;
};
