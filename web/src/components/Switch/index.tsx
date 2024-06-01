import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Switch } from "@mui/material";
import styled from "styled-components";
import Botao from "../Botao";

const RotuloCustomizado = styled('label')({
    color: '#0B3B60',
    lineHeight: '19px',
    fontSize: '19px',
    fontWeight: 700,
    display: 'block',
})

const Container = styled('div')({
    width: '100%',
    justifyContent: 'center',
    display: 'flex'
})



const SwitchCustomizado = ({label, title, helperText, value}: {label?: string, title?: string, helperText?: string, value: boolean}) => {
    return(
        <Container>
            <FormControl component="fieldset" variant="standard" sx={{alignItems: 'center'}}>
                <RotuloCustomizado>{title}</RotuloCustomizado>
                <FormGroup>
                    <FormControlLabel
                        sx={{marginLeft:2}} 
                        control={
                            <Switch checked={value} />
                        }
                        label={label}
                    />
                    
                </FormGroup>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
        </Container>
        
    )
}

export default SwitchCustomizado;