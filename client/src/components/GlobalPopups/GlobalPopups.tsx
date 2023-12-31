import { CloseIcon } from "../../svgs";
import useGlobalPopups from "./useGlobalPopups";

const GlobalPopups = () => {
  const { popups, POPUP_STYLES, handleRemovePopup } = useGlobalPopups();

  return (
    <>
      {popups.length > 0 ? (
        <ul className="fixed bottom-0 left-0 flex w-full flex-col-reverse items-center gap-4 p-4">
          {popups.map((popup) => {
            return (
              <li
                key={popup.id}
                className={`flex w-max items-center gap-2 rounded-lg ${
                  POPUP_STYLES[popup.type].bg
                } px-6 py-4 text-white shadow max-[800px]:w-auto`}
              >
                {POPUP_STYLES[popup.type].icon}
                {popup.message}
                <button
                  type="button"
                  onClick={() => handleRemovePopup(popup)}
                  aria-label="remove error"
                >
                  <CloseIcon width={21} height={21} />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default GlobalPopups;
