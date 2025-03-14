import { uploadeFile } from "actions/storage-actions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Spinner } from "@material-tailwind/react";

export default function DropboxFile({ isError, setIsError }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImageMutation = useMutation({
    mutationFn: uploadeFile,

    onSuccess: () => {
      console.log(">>>>>> uploadeFile useMutation onSuccess", isError);
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
      setIsError("");
    },

    onError: (error, variables, context) => {
      // 작업이 실패했을 때 실행되는 콜백
      if (error) {
        console.log(">>>> already exists ", error, " | ");
      }
      setIsError("중복이미지");
      alert("이미지가 이미 존재합니다.");
    },
  });

  const handleSubmit = async (e) => {
    console.log(">>>>>> handleSubmit .. ");
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    // console.log("file", file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // const result = await uploadeFile(formData);
      const result = await uploadImageMutation.mutate(formData);
      console.log(">>>>> result", result);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border-4 border-dotted border-black w-full h-52 flex flex-col gap-2 justify-center items-center"
      >
        <input type="file" ref={fileRef} name="file" accept="image/*" />
        <p>파일을 끌어다 놓거나 클릭해서 파일을 업로드 하세요</p>
        <p>{isError}</p>
        {isError === "" && uploadImageMutation.isPending ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <button className="bg-black text-white p-2 rounded-md ">
            <p>파일 업로드</p>
          </button>
        )}
      </form>
    </div>
  );
}
