import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import { useRef } from "react";
import Button from "../Button";

export default function SnackbarWrapper(props: SnackbarProviderProps) {
  const notistackRef = useRef(null);
  const onClickDismiss = (key: React.ReactText) => () => {
    const ref = notistackRef as any;
    if (ref && ref.current) {
      ref.current.closeSnackbar(key);
    }
  };
  return (
    <SnackbarProvider
      ref={notistackRef}
      hideIconVariant={false}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={(key) => (
        <Button variant="text" onClick={onClickDismiss(key)}>
          Limpar
        </Button>
      )}
      style={{
        borderRadius: 10,
        pointerEvents: "all",
        marginTop: 20,
      }}
      {...props}
    >
      {props.children}
    </SnackbarProvider>
  );
}
