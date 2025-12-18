"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);

  useEffect(() => {
    // Get available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // Prefer back camera
          const backCamera = devices.find((device) =>
            device.label.toLowerCase().includes("back")
          );
          setCameraId(backCamera?.id || devices[0].id);
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
        onError?.("No se pudo acceder a la cámara");
      });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!cameraId) {
      onError?.("No hay cámara disponible");
      return;
    }

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
        },
        (errorMessage) => {
          // Ignore scanning errors (happens continuously while scanning)
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      onError?.("Error al iniciar el escáner");
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        id="qr-reader"
        className="w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-primary"
      />

      <div className="flex justify-center">
        {!isScanning ? (
          <Button onClick={startScanning} size="lg">
            <Camera className="mr-2 h-5 w-5" />
            Iniciar Escáner
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="destructive" size="lg">
            <CameraOff className="mr-2 h-5 w-5" />
            Detener Escáner
          </Button>
        )}
      </div>
    </div>
  );
}
