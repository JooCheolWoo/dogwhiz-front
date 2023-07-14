import { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Portal } from '@mui/material';

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
    reader.onload = (e) => {
      if (e.target?.readyState == 2) {
        setImage(reader.result as string);
      }
    };
    if (files[0] instanceof Blob) {
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  return (
    <>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <span onClick={handleChildrenClick}>{children}</span>
      <Portal>
        {image && (
          <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-auto z-50">
              <div className="bg-slate-50 p-4 space-y-5 rounded-md">
                <h3 className="text-2xl text-center font-bold gaegu">프로필 이미지 편집</h3>
                <div className="max-h-[600px] max-w-[600px] overflow-hidden">
                  <Cropper
                    ref={cropperRef}
                    aspectRatio={aspectRatio}
                    src={image}
                    viewMode={1}
                    dragMode="move"
                    minContainerWidth={350}
                    minContainerHeight={350}
                    background={false}
                    responsive
                    autoCropArea={0.8}
                    checkOrientation={false}
                    modal={true}
                    highlight={true}
                    guides
                  />
                </div>
                <div className="flex space-x-4 justify-end">
                  <button onClick={() => setImage(null)} className="hover_btn_sky">
                    취소
                  </button>
                  <button onClick={getCropData} className="hover_btn">
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Portal>
    </>
  );
};

export default ImageCropper;
