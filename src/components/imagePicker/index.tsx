import moment from "moment";
import Dropzone from "react-dropzone";
import { Button, message } from "antd";
import { FiInbox } from "react-icons/fi";
import { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
    onChange: (val: any) => void | any;
    fileURL: string;
    width?: string | number;
    height?: string | number;
    aspectRatio: number;
    disabled?: boolean;
}

const ImagePicker = (props: Props) => {
    const fileInputRef = useRef(null);
    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropperModalOpen, setCropperModalOpen] = useState<boolean>(false);
    const [image, setImage] = useState<any>();

    const handleDrop = (acceptedFiles: any) => {
        try {
            const maxFileSize = 3 * 1024 * 1024;
            var myFile = acceptedFiles[0];
            if (!myFile.type.startsWith("image/")) {
                message.error("Only image files are allowed.");
            } else {
                if (myFile.size > maxFileSize) {
                    message.error("File size exceeded the 3MB limit.");
                } else {
                    let name = moment(new Date()).unix();
                    const myNewFile = new File([myFile], name + "G.png", {
                        type: myFile.type,
                    });
                    const url = URL.createObjectURL(myNewFile);
                    let obj = {
                        file: myNewFile,
                        url: url,
                    };
                    setImage(obj);
                    setCropperModalOpen(true);
                }
            }
        } catch (err) {
            message.error("Error processing file");
        }
    };

    const handleCrop = async () => {
        if (cropperRef.current) {
            const canvas: HTMLCanvasElement | null =
                cropperRef.current.cropper.getCroppedCanvas({ fillColor: "#FFFFFF" });
            if (canvas) {
                const croppedData = canvas.toDataURL("image/jpeg");
                const ImageBlob = await fetch(croppedData).then((r) => r.blob());
                let name = moment(new Date()).unix();
                let file = new File([ImageBlob], name + "N.jpg");
                const url = URL.createObjectURL(file);
                let obj = {
                    file: file,
                    url: url,
                };
                props?.onChange(obj);
                setCropperModalOpen(false);
            }
        }
    };

    const handleSaveWithoutCropping = () => {
        if (image) {
            props?.onChange(image);
            setCropperModalOpen(false);
        }
    };

    return (
        <div
            style={{ width: props?.width || "100%", height: props?.height || "100%" }}
            className="relative"
        >
            {cropperModalOpen ? (
                <div className="space-y-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setImage({
                                    file: selectedFile,
                                    url: URL.createObjectURL(selectedFile),
                                });
                                setCropperModalOpen(true);
                            }
                        }}
                    />
                    <Cropper
                        ref={cropperRef as React.RefObject<ReactCropperElement>}
                        src={image?.url}
                        style={{
                            height: props?.height || 400,
                            width: props?.width || "100%",
                        }}
                        aspectRatio={props?.aspectRatio}
                        guides={true}
                    />
                    <div className="flex justify-center items-center space-x-4 -mt-8">
                        <Button
                            size="small"
                            onClick={() => {
                                if (fileInputRef.current) {
                                    (fileInputRef.current as any).click();
                                }
                            }}
                        >
                            Change
                        </Button>
                        <Button type="primary" onClick={handleCrop} size="small">
                            Crop
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSaveWithoutCropping}
                            size="small"
                        >
                            Save Without Cropping
                        </Button>
                    </div>
                </div>
            ) : (
                <Dropzone onDrop={handleDrop} disabled={props.disabled || false}>
                    {({ getRootProps, getInputProps }: any) => (
                        <section className="w-full h-full">
                            <div
                                {...getRootProps({
                                    className: `w-full h-full border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-color transition-colors duration-200 ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
                                })}
                            >
                                <input {...getInputProps()} disabled={props.disabled || false} />
                                <div className="w-full h-full p-4 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                                    {props?.fileURL ? (
                                        <img
                                            src={props?.fileURL}
                                            className="w-full h-full object-contain"
                                            alt="Selected"
                                        />
                                    ) : (
                                        <>
                                            <FiInbox className="text-3xl text-gray-400 mb-2" />
                                            <div className="text-base text-center text-gray-600">
                                                {props.disabled ? 'File upload disabled' : 'Click or drag Image to this area to upload'}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
            )}
        </div>
    );
};

export default ImagePicker;