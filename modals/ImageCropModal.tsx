import { useState, useEffect } from 'react';
import Portal from './Portal';
import styled from '@emotion/styled';

interface ImageCropModalProps {
  imageFile: File;
  isOpen: boolean;
}

const Container = styled.div`{
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

export default function ImageCropModal({ imageFile, isOpen }: ImageCropModalProps) {
  const [file, setFile] = useState(imageFile);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      }
    };
  }, [file]);

  return (
    <>
      {isOpen && (
        <Portal>
          <Container>
            모달 TEST
            <img src={image} width={200} height={200} />
          </Container>
        </Portal>
      )}
    </>
  );
}

