import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
const colorMap = {
    save : "success.main",
    modify : "warning",
    delete : "error",
    add : 'primary',
    send : "primary",
    clear : 'info',
    close : 'info',


}
export default function CustomButton({label = "Provide Label" , fullWidth = false , size = 'small', isLoading = false , variant = "outlined" , loadingPosition = "end" , type = "button", purpose = 'save' , onClick  = () => {} , disabled=false}) {
    return (
      <LoadingButton
        fullWidth = {fullWidth}
        // width = {fullWidth ? "100%" : "200px"}
        sx={{width: "auto"}}
        loading = {isLoading}
        loadingPosition={loadingPosition}
        endIcon={purpose==='send' ? <SendIcon/> : <DeleteIcon/>}
        variant={variant}
        size = {size}
        color={colorMap[purpose]}
        onClick={onClick}
        type = {type}
        disabled={disabled}
        // sx={{color : "#ca2424"}}
      >
        {<Typography sx={{ textTransform: 'none' }}>
            {label}
            </Typography>}
      </LoadingButton>
  );
}
CustomButton.propTypes = {
    label : PropTypes.string.isRequired,
    size : PropTypes.oneOf(['small', 'medium', 'large']),
    purpose : PropTypes.oneOf(['send', 'save', 'modify' ,'add' ,'delete' , 'clear' , 'close']),
    type : PropTypes.oneOf(['button', 'submit', 'reset']),
    loadingPosition : PropTypes.oneOf(['start', 'end']),
    isLoading : PropTypes.bool,
    fullWidth : PropTypes.bool,
    disabled : PropTypes.bool,
    onClick : PropTypes.func,
    variant : PropTypes.oneOf(['text', 'outlined', 'contained']),
}