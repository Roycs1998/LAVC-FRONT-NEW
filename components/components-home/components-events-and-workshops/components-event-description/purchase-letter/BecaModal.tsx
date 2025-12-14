import React, { type FC, useCallback, useRef } from 'react';

import {
  Dialog,
  Box,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface BecaModalProps {
  open: boolean;
  onClose: () => void;
  operationNumber: string;
  onChangeOperation: (value: string) => void;
  paymentAmount: number;
  onChangeAmount: (value: number) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  comprobanteType: 'Boleta' | 'Factura';
  onChangeComprobanteType: (value: 'Boleta' | 'Factura') => void;
  ruc: string;
  onChangeRuc: (value: string) => void;
  razonSocial: string;
  onChangeRazonSocial: (value: string) => void;
  file: File | null;
  onFileUpload: (file: File | null) => void;
  onActivate: () => void;
}

export const BecaModal: FC<BecaModalProps> = ({
  open,
  onClose,
  operationNumber,
  onChangeOperation,
  paymentAmount,
  onChangeAmount,
  currency,
  onChangeCurrency,
  comprobanteType,
  onChangeComprobanteType,
  ruc,
  onChangeRuc,
  razonSocial,
  onChangeRazonSocial,
  file,
  onFileUpload,
  onActivate
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isUnderLimit = file.size <= 10 * 1024 * 1024;
    
    if (!isImage) {
      alert('Solo se permiten imágenes.');
      
      return false;
    }
    
    if (!isUnderLimit) {
      alert('El archivo no debe exceder 10 MB.');
      
      return false;
    }
    

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0] ?? null;
    
    if (uploaded && validateFile(uploaded)) {
      onFileUpload(uploaded);
    }
    
    e.target.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0] ?? null;
    
    if (dropped && validateFile(dropped)) {
      onFileUpload(dropped);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 1, overflow: 'hidden' } }}
    >
      {/* Cabecera personalizada */}
      <Box
        sx={{
          backgroundColor: '#3a3480',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: 6,
          py: 4
        }}
      >
        <Typography
          variant="h5"
          sx={{ flex: 1, textAlign: 'center', fontWeight: 800 , color: '#fff'}}
        >
          Subir Constancia de Pago
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: theme.spacing(1), top: '50%', transform: 'translateY(-50%)', color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 6, px: 6, backgroundColor: theme.palette.background.paper }}>
        <TextField
          margin="dense"
          label="N° de Operación"
          type="text"
          fullWidth
          placeholder="Ingrese el número de operación"
          variant="outlined"
          value={operationNumber}
          onChange={(e) => onChangeOperation(e.target.value)}
        />

        <TextField
          margin="dense"
          label="Monto del Pago"
          type="number"
          fullWidth
          placeholder="Ingrese el monto del pago"
          variant="outlined"
          value={paymentAmount}
          onChange={(e) => onChangeAmount(Number(e.target.value))}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="currency-label">Moneda</InputLabel>
          <Select
            labelId="currency-label"
            label="Moneda"
            value={currency}
            onChange={(e) => onChangeCurrency(e.target.value)}
          >
            <MenuItem value="PEN">Soles (PEN)</MenuItem>
            <MenuItem value="USD">Dólares (USD)</MenuItem>
            <MenuItem value="EUR">Euros (EUR)</MenuItem>
          </Select>
        </FormControl>

        {/* Selección de tipo de comprobante */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Tipo de Comprobante</Typography>
          <RadioGroup
            row
            value={comprobanteType}
            onChange={(e) => onChangeComprobanteType(e.target.value as 'Boleta' | 'Factura')}
          >
            <FormControlLabel value="Boleta" control={<Radio />} label="Boleta" />
            <FormControlLabel value="Factura" control={<Radio />} label="Factura" />
          </RadioGroup>
        </FormControl>

        {/* Solo si es Factura, mostrar RUC y Razón Social */}
        {comprobanteType === 'Factura' && (
          <>
            <TextField
              margin="dense"
              label="RUC"
              type="text"
              fullWidth
              placeholder="Ingrese RUC"
              variant="outlined"
              value={ruc}
              onChange={(e) => onChangeRuc(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Razón Social"
              type="text"
              fullWidth
              placeholder="Ingrese razón social"
              variant="outlined"
              value={razonSocial}
              onChange={(e) => onChangeRazonSocial(e.target.value)}
            />
          </>
        )}

        {/* Área de drop y selección de archivo con icono y padding extra */}
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={triggerFileSelect}
          sx={{
            mt: 3,
            p: 4,
            border: '2px dashed',
            borderColor: theme.palette.grey[400],
            borderRadius: 1,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <CloudUploadIcon sx={{ fontSize: 48, mb: 1, color: theme.palette.grey[500] }} />
          {file ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ mr: 1 }}>{file.name}</Typography>
              <IconButton size="small" onClick={() => onFileUpload(null)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Typography>Arrastra y suelta tu constancia aquí, o haz clic para seleccionar</Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 6, pb: 6, backgroundColor: theme.palette.background.paper }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: 'none', borderColor: '#3a3480', color: '#3a3480', '&:hover': {
            borderColor: theme.palette.primary.dark,
            backgroundColor: theme.palette.action.hover
          } }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onActivate}
          variant="contained"
          sx={{ textTransform: 'none', backgroundColor: '#3a3480', '&:hover': {
            backgroundColor: theme.palette.primary.dark
          } }}
          disabled={
            !operationNumber.trim() ||
            !paymentAmount ||
            !currency ||
            !file ||
            (comprobanteType === 'Factura' && (!ruc.trim() || !razonSocial.trim()))
          }
        >
          Activar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
