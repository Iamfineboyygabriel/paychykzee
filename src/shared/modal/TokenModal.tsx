import { useState } from "react";
import { button } from "../../shared/button/button";
import Modal from "../../shared/modal/Modal";
import ReactLoading from "react-loading";

interface TokenModalProps {
  handleTokenChange: (tokenValue: string) => void;
  token: string;
  handleVerifyUser: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  ResendOtp: (event: React.FormEvent) => void;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  handleTokenChange,
  token,
  handleVerifyUser,
  isOpen,
  onClose,
  ResendOtp,
}) => {
  const [loading, setLoading] = useState(false);

  const handleVerifyUserWrapper = async () => {
    setLoading(true);
    try {
      await handleVerifyUser();
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto w-[95%] max-w-4xl rounded-xl bg-dashboard px-6 py-10 text-center font-br-regular text-logintext shadow-lg lg:w-[90%] lg:py-[3em]">
        <div className="m-auto mt-[3em] w-full text-center lg:w-[80%]">
          <div>
            <header>
              <h1 className="font-br-semibold text-2xl text-text lg:text-[2.3em]">
                Verify Your Account
              </h1>
            </header>
            <p className="mt-[1em] font-br-light text-sm text-text">
              Enter the OTP authentication code sent to your email address
            </p>
          </div>
          <div className="mt-[2em]">
            <input
              type="number"
              name="token"
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
              id="token"
              className="focus:border-gradient-border w-full rounded-lg border border-border bg-inherit p-[1.5em] text-center font-br-bold text-sm tracking-[2em] text-text lg:text-[1.5em]"
              maxLength={6}
            />
            <div className="mt-[1em] flex flex-col gap-3">
              <p className="br-font-thin text-purplewhite">
                Didn't Receive OTP Code?
              </p>
              <p
                className="cursor-pointer font-br-semibold text-primary underline"
                onClick={ResendOtp}
              >
                Resend Code
              </p>
            </div>
          </div>
          <div className="mt-[3em]">
            <button.PrimaryButton
              onClick={handleVerifyUserWrapper}
              className={`w-full ${token.length !== 6 ? "cursor-not-allowed bg-disabledPrimary" : "text-text"}`}
              disabled={token.length !== 6 || loading}
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                  className="inline-block"
                />
              ) : (
                "Verify"
              )}
            </button.PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
