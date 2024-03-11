import { RiDeleteBinLine } from "react-icons/ri";
import { GoGrabber } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import Toggle from "../Toggle";
import { LinkProps } from "../../constant/types";
import { PrivateApi } from "../../api";
import { useAlertContext } from "../../provider/AlertProvider";
import useUser from "../../hooks/useUser";
import { ChangeEvent } from "react";
import DOMPurify from "dompurify";
import LinkInput from "./LinkInput";
import { useDispatch } from "react-redux";
import { deleteLink, updateLinks } from "../../redux/slice/profileSlice";

const Link = ({ _id, title, url, img, type, display }: LinkProps) => {
  const { showAlert } = useAlertContext();
  const dispatch = useDispatch();

  const handleLinkDelete = async () => {
    try {
      // const { status, data } = await PrivateApi.delete(`/profile/links/${_id}`);
      // if (status === 200) {

      dispatch(deleteLink(_id));
      showAlert({ text: "Link removed", type: "success" });
      // }
    } catch (error) {
      console.log(error);
      showAlert({ text: "Error removing link", type: "danger" });
    }
  };

  const handleLinkUpdate = async (formData: any) => {
    // console.log(url, img, type, _id, display);

    return (obj: any) => {
      console.log(formData);

      formData = { ...formData, ...obj };
      console.log(formData);

      try {
        //   // const { status, data } = await PrivateApi.put(
        //   //   "/profile/updatelink/" + currentUser.email,
        //   //   formData
        //   // );
        //   // if (status === 200) {
        dispatch(updateLinks(formData));
        showAlert({ text: "Link updated", type: "success" });
        //   // }
      } catch (error) {
        console.log(error);
        showAlert({ text: "Error updating link", type: "danger" });
      }
    };
  };
  if (type === "socialLink") {
    return (
      <section className="flex justify-between items-center mb-6 gap-2  rounded-2xl bg-white shadow-2xl p-6">
        <GoGrabber />
        <div className="flex flex-col gap-2 flex-1">
          {/* <h2 /className="flex items-center gap-2"> */}
          <LinkInput
            saveChanges={async (obj) => {
              const updateLink = await handleLinkUpdate({
                url,
                img,
                type,
                _id,
                display,
              });
              updateLink(obj);
            }}
            text={title}
            inputName={"title"}
          />
          {/* </h2> */}
          <LinkInput
            text={url}
            inputName={"url"}
            saveChanges={async (obj) => {
              const updateLink = await handleLinkUpdate({
                url,
                img,
                type,
                _id,
                display,
              });
              updateLink(obj);
            }}
          />
          {/* <div className="flex gap-2 p-2">
            <RiDeleteBinLine fontSize={20} />
            <RiDeleteBinLine fontSize={20} />
            <RiDeleteBinLine fontSize={20} />
            <RiDeleteBinLine fontSize={20} />
          </div> */}
        </div>
        <div className="flex flex-col gap-4 items-end">
          <div className="flex  items-center  gap-2 mb-2">
            <IoShareOutline fontSize={20} />
            <Toggle />
          </div>
          <RiDeleteBinLine
            fontSize={20}
            className="cursor-pointer hover:text-red-600"
            onClick={handleLinkDelete}
          />
        </div>
      </section>
    );
  }
  if (type === "headerLink") {
    return (
      <section className="flex justify-between items-center mb-6 gap-2  rounded-2xl bg-white shadow-2xl p-6">
        <GoGrabber />
        <div className="flex flex-col items-center gap-2 flex-1">
          {/* <h2 className="flex items-center gap-2 justify-center">
          
          </h2> */}
          <LinkInput
            text={title}
            inputName={"title"}
            saveChanges={async (obj) => {
              const updateLink = await handleLinkUpdate({
                url,
                img,
                type,
                _id,
                display,
              });
              updateLink(obj);
            }}
          />
        </div>
        <div className="flex flex-col gap-4 items-end">
          <div className="flex  items-center  gap-2 mb-2">
            <Toggle />
          </div>
          <RiDeleteBinLine
            fontSize={20}
            className="cursor-pointer hover:text-red-600"
            onClick={handleLinkDelete}
          />
        </div>
      </section>
    );
  }
};

export default Link;
