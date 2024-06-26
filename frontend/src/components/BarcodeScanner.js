import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Quagga from 'quagga';

const BarcodeScanner = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoRef.current,
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment", // Use the device's rear camera
                },
            },
            decoder: {
                readers: ["ean_reader"], // Specify the type of barcode to scan (EAN)
            },
        }, function (err) {
            if (err) {
                console.error("Error initializing Quagga:", err);
                return;
            }
            console.log("Quagga initialized successfully");
            Quagga.start();
        });

        Quagga.onDetected(function (result) {
            const code = result.codeResult.code;
            alert(`Scanned Barcode: ${code}`);
            Quagga.stop();
        });

        return () => {
            Quagga.stop();
        };
    }, [videoRef]); // Added videoRef to the dependency array

    return (
        <div>
            <h1>This is Barcode Scanner!!</h1>
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
        </div>
    );
};

export default BarcodeScanner;
