import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface PropsType {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
}

const ImageCropper = ({ children, aspectRatio, onCrop }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleChildrenClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center" />
          <div className="relative w-full mobile:w-[50vw] bg-white m-auto p-5 space-y-5 rounded-md overflow-auto">
            <h3>이미지 편집하기</h3>
            <div className="max-h-[800px] overflow-auto">
              <div className="cover">
                <Cropper
                  ref={cropperRef}
                  aspectRatio={aspectRatio}
                  src={image}
                  viewMode={1}
                  width={800}
                  height={500}
                  background={false}
                  responsive
                  autoCropArea={1}
                  checkOrientation={false}
                  guides
                />
              </div>
            </div>
            <div className="space-x-4">
              <button onClick={() => setImage(null)} className="hover_btn">취소</button>
              <button onClick={getCropData} className="hover_btn">
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;